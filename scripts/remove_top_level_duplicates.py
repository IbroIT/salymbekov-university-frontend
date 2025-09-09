#!/usr/bin/env python3
"""
Умное удаление дублирующихся разделов верхнего уровня.
Ищет и удаляет дублирующиеся разделы (ключи первого уровня) в JSON.
"""

import json
import os
from pathlib import Path
from collections import defaultdict
import shutil
import sys

def find_top_level_duplicates(json_data):
    """
    Находит дублирующиеся разделы верхнего уровня
    """
    if not isinstance(json_data, dict):
        return []
    
    # Считаем количество каждого ключа
    key_counts = defaultdict(int)
    key_positions = defaultdict(list)
    
    # Создаем список для отслеживания порядка ключей
    keys_order = []
    position = 0
    
    for key in json_data.keys():
        key_counts[key] += 1
        key_positions[key].append(position)
        keys_order.append(key)
        position += 1
    
    # Находим дубликаты
    duplicates = []
    for key, count in key_counts.items():
        if count > 1:
            duplicates.append({
                'key': key,
                'count': count,
                'positions': key_positions[key],
                'values': [json_data[key] for _ in range(count)]  # Для анализа
            })
    
    return duplicates

def analyze_duplicates(duplicates, data):
    """
    Анализирует дубликаты и определяет, какие нужно удалить
    """
    removal_plan = []
    
    for dup in duplicates:
        key = dup['key']
        count = dup['count']
        
        print(f"\n🔄 Найден дублированный раздел '{key}' ({count} раз)")
        
        # В Python словарь сохраняет порядок вставки
        # Нам нужно удалить все вхождения кроме первого
        removal_plan.append({
            'key': key,
            'keep_first': True,
            'remove_count': count - 1
        })
        
        print(f"   ✅ Будем сохранять: первое вхождение")
        print(f"   ❌ Будем удалять: {count - 1} дубликатов")
    
    return removal_plan

def remove_duplicate_keys(data, removal_plan):
    """
    Удаляет дублирующиеся ключи, оставляя только первое вхождение
    """
    if not removal_plan:
        return data
    
    # Создаем новый словарь с уникальными ключами
    new_data = {}
    seen_keys = set()
    
    for key, value in data.items():
        if key not in seen_keys:
            new_data[key] = value
            seen_keys.add(key)
            print(f"  ✅ Сохранен раздел: {key}")
        else:
            print(f"  ❌ Удален дубликат: {key}")
    
    return new_data

def validate_json_structure(data):
    """
    Проверяет, что JSON структура валидна после изменений
    """
    try:
        json.dumps(data, ensure_ascii=False)
        return True, "OK"
    except Exception as e:
        return False, str(e)

def process_file(file_path, dry_run=False):
    """
    Обрабатывает один файл переводов
    """
    print(f"\n📁 Анализируем файл: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения файла {file_path}: {e}")
        return False
    
    # Находим дубликаты верхнего уровня
    duplicates = find_top_level_duplicates(original_data)
    
    if not duplicates:
        print("✅ Дублирующихся разделов верхнего уровня не найдено!")
        return True
    
    print(f"⚠️  Найдено дублирующихся разделов: {len(duplicates)}")
    
    # Анализируем дубликаты
    removal_plan = analyze_duplicates(duplicates, original_data)
    
    if dry_run:
        print("\n🔍 РЕЖИМ ПРОСМОТРА - изменения не применяются")
        return True
    
    # Подтверждение от пользователя
    print(f"\n⚠️  ВНИМАНИЕ! Будет удалено {sum(plan['remove_count'] for plan in removal_plan)} дублирующихся разделов.")
    response = input("Продолжить? (y/N): ").lower().strip()
    if response not in ['y', 'yes', 'да']:
        print("❌ Операция отменена пользователем")
        return False
    
    # Создаем резервную копию
    backup_path = f"{file_path}.backup"
    shutil.copy2(file_path, backup_path)
    print(f"💾 Создана резервная копия: {backup_path}")
    
    # Удаляем дубликаты
    print("\n🧹 Удаляем дублирующиеся разделы:")
    cleaned_data = remove_duplicate_keys(original_data, removal_plan)
    
    # Проверяем валидность
    is_valid, validation_message = validate_json_structure(cleaned_data)
    if not is_valid:
        print(f"❌ Ошибка валидации JSON: {validation_message}")
        return False
    
    # Сохраняем файл
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ Файл успешно обновлен: {file_path}")
        
        # Проверяем, что файл можно прочитать обратно
        with open(file_path, 'r', encoding='utf-8') as f:
            test_data = json.load(f)
        
        original_sections = len(original_data)
        new_sections = len(cleaned_data)
        removed_sections = original_sections - new_sections
        
        print(f"📊 Статистика:")
        print(f"   - Было разделов: {original_sections}")
        print(f"   - Стало разделов: {new_sections}")
        print(f"   - Удалено дубликатов: {removed_sections}")
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка записи файла {file_path}: {e}")
        # Восстанавливаем из резервной копии
        shutil.copy2(backup_path, file_path)
        print("🔄 Файл восстановлен из резервной копии")
        return False

def main():
    """Основная функция"""
    print("🧹 УДАЛЕНИЕ ДУБЛИРУЮЩИХСЯ РАЗДЕЛОВ ВЕРХНЕГО УРОВНЯ")
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
            print("✅ Все файлы проанализированы.")
            print("💡 Для применения изменений запустите без --dry-run")
        else:
            print("✅ Все файлы успешно обработаны!")
            print("💾 Резервные копии сохранены с расширением .backup")
    else:
        print(f"⚠️  Обработано успешно: {success_count}/{len(translation_files)}")
    
    return 0 if success_count == len(translation_files) else 1

if __name__ == "__main__":
    exit(main())
