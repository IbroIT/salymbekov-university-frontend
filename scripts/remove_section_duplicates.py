#!/usr/bin/env python3
"""
Безопасное удаление дублирующихся разделов в файлах переводов.
Удаляет дублирующиеся разделы, сохраняя только один экземпляр каждого.
"""

import json
import os
from pathlib import Path
from collections import defaultdict
import shutil
import sys

def find_duplicate_sections(json_data, path=""):
    """
    Находит дублирующиеся разделы в JSON данных
    """
    duplicates = []
    section_paths = defaultdict(list)
    
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            current_path = f"{path}.{key}" if path else key
            
            if isinstance(value, dict):
                # Сохраняем путь к этому разделу
                section_content = json.dumps(value, sort_keys=True)
                section_paths[f"{key}:{section_content}"].append(current_path)
                
                # Рекурсивно ищем вложенные дубликаты
                nested_duplicates = find_duplicate_sections(value, current_path)
                duplicates.extend(nested_duplicates)
    
    # Находим разделы с одинаковым содержимым
    for section_key, paths in section_paths.items():
        if len(paths) > 1:
            section_name = section_key.split(':')[0]
            duplicates.append({
                'section_name': section_name,
                'paths': paths,
                'content_hash': section_key.split(':', 1)[1]
            })
    
    return duplicates

def identify_major_duplicates(duplicates):
    """
    Определяет основные дублирующиеся разделы для удаления
    """
    major_duplicates = []
    
    for dup in duplicates:
        paths = dup['paths']
        section_name = dup['section_name']
        
        # Определяем какой путь оставить, а какие удалить
        keep_path = None
        remove_paths = []
        
        # Приоритет: более короткие пути оставляем
        paths_sorted = sorted(paths, key=len)
        keep_path = paths_sorted[0]
        remove_paths = paths_sorted[1:]
        
        if remove_paths:
            major_duplicates.append({
                'section_name': section_name,
                'keep': keep_path,
                'remove': remove_paths
            })
    
    return major_duplicates

def remove_duplicates_from_data(data, duplicates_to_remove):
    """
    Удаляет дублирующиеся разделы из данных
    """
    for dup in duplicates_to_remove:
        for remove_path in dup['remove']:
            # Разбиваем путь на компоненты
            path_parts = remove_path.split('.')
            
            # Находим родительский объект
            current = data
            parent = None
            last_key = None
            
            try:
                for i, part in enumerate(path_parts):
                    if i == len(path_parts) - 1:
                        last_key = part
                        parent = current
                        break
                    else:
                        current = current[part]
                
                # Удаляем раздел
                if parent is not None and last_key in parent:
                    print(f"  ❌ Удаляем дублированный раздел: {remove_path}")
                    del parent[last_key]
                
            except (KeyError, TypeError) as e:
                print(f"  ⚠️  Не удалось удалить раздел {remove_path}: {e}")
    
    return data

def process_file(file_path, dry_run=False):
    """
    Обрабатывает один файл переводов
    """
    print(f"\n📁 Обрабатываем файл: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения файла {file_path}: {e}")
        return False
    
    # Создаем копию данных
    data = json.loads(json.dumps(original_data))
    
    # Находим дубликаты
    duplicates = find_duplicate_sections(data)
    major_duplicates = identify_major_duplicates(duplicates)
    
    if not major_duplicates:
        print("✅ Основных дублирующихся разделов не найдено!")
        return True
    
    print(f"⚠️  Найдено {len(major_duplicates)} основных дублирующихся разделов:")
    for dup in major_duplicates:
        print(f"  🔄 Раздел '{dup['section_name']}':")
        print(f"     ✅ Оставляем: {dup['keep']}")
        for remove_path in dup['remove']:
            print(f"     ❌ Удаляем: {remove_path}")
    
    if dry_run:
        print("🔍 Режим просмотра - изменения не применяются")
        return True
    
    # Создаем резервную копию
    backup_path = f"{file_path}.backup"
    shutil.copy2(file_path, backup_path)
    print(f"💾 Создана резервная копия: {backup_path}")
    
    # Удаляем дубликаты
    print("🧹 Удаляем дублирующиеся разделы:")
    cleaned_data = remove_duplicates_from_data(data, major_duplicates)
    
    # Сохраняем файл
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
        print(f"✅ Файл успешно обновлен: {file_path}")
        return True
    except Exception as e:
        print(f"❌ Ошибка записи файла {file_path}: {e}")
        # Восстанавливаем из резервной копии
        shutil.copy2(backup_path, file_path)
        print("🔄 Файл восстановлен из резервной копии")
        return False

def main():
    """Основная функция"""
    print("🧹 БЕЗОПАСНОЕ УДАЛЕНИЕ ДУБЛИРУЮЩИХСЯ РАЗДЕЛОВ")
    print("=" * 60)
    
    # Проверяем аргументы
    dry_run = "--dry-run" in sys.argv or "-d" in sys.argv
    if dry_run:
        print("🔍 РЕЖИМ ПРОСМОТРА - никаких изменений не будет сделано")
        print("=" * 60)
    
    # Путь к папке с переводами
    locales_dir = Path("../src/locales")
    if not locales_dir.exists():
        locales_dir = Path("src/locales")
    if not locales_dir.exists():
        locales_dir = Path("locales")
    
    if not locales_dir.exists():
        print("❌ Папка с переводами не найдена!")
        return 1
    
    # Находим все файлы переводов
    translation_files = []
    for lang_dir in locales_dir.iterdir():
        if lang_dir.is_dir():
            translation_file = lang_dir / "translation.json"
            if translation_file.exists():
                translation_files.append(translation_file)
    
    if not translation_files:
        print("❌ Файлы переводов не найдены!")
        return 1
    
    print(f"📄 Найдено файлов переводов: {len(translation_files)}")
    
    # Обрабатываем каждый файл
    success_count = 0
    for file_path in translation_files:
        if process_file(file_path, dry_run):
            success_count += 1
    
    # Итоговый отчет
    print("\n" + "=" * 60)
    print("📊 ИТОГОВЫЙ ОТЧЕТ")
    print("=" * 60)
    
    if success_count == len(translation_files):
        if dry_run:
            print("✅ Все файлы проанализированы. Запустите без --dry-run для применения изменений.")
        else:
            print("✅ Все файлы успешно обработаны!")
            print("💾 Резервные копии сохранены с расширением .backup")
    else:
        print(f"⚠️  Обработано успешно: {success_count}/{len(translation_files)}")
        if not dry_run:
            print("🔄 Поврежденные файлы восстановлены из резервных копий")
    
    return 0 if success_count == len(translation_files) else 1

if __name__ == "__main__":
    exit(main())
