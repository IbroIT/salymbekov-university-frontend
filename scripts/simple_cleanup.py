#!/usr/bin/env python3
"""
Простой и надежный скрипт для удаления дубликатов
"""

import json
import shutil
from pathlib import Path
from collections import OrderedDict
import sys

def remove_duplicates_from_dict(data):
    """
    Удаляет дублирующиеся ключи из словаря
    Python автоматически сохраняет только последнее значение при дублирующихся ключах
    Эта функция перестраивает словарь, оставляя только первое вхождение каждого ключа
    """
    if not isinstance(data, dict):
        return data
    
    # Используем OrderedDict для сохранения порядка
    result = OrderedDict()
    
    for key, value in data.items():
        if key not in result:
            # Рекурсивно обрабатываем вложенные словари
            if isinstance(value, dict):
                result[key] = remove_duplicates_from_dict(value)
            elif isinstance(value, list):
                # Обрабатываем списки, которые могут содержать словари
                result[key] = [remove_duplicates_from_dict(item) if isinstance(item, dict) else item for item in value]
            else:
                result[key] = value
    
    return dict(result)

def process_file(file_path):
    """Обрабатывает файл переводов"""
    print(f"📁 Обрабатываем: {file_path}")
    
    # Создаем резервную копию
    backup_path = f"{file_path}.backup"
    try:
        shutil.copy2(file_path, backup_path)
        print(f"💾 Резервная копия: {backup_path}")
    except Exception as e:
        print(f"❌ Ошибка создания резервной копии: {e}")
        return False
    
    # Читаем и парсим JSON
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения JSON: {e}")
        return False
    
    original_keys = len(data)
    print(f"📊 Исходное количество разделов: {original_keys}")
    
    # Удаляем дубликаты (на самом деле они уже удалены при парсинге JSON)
    cleaned_data = remove_duplicates_from_dict(data)
    
    final_keys = len(cleaned_data)
    print(f"📊 Итоговое количество разделов: {final_keys}")
    
    if original_keys == final_keys:
        print("✅ Дубликатов на уровне JSON объекта не найдено (они удалились при парсинге)")
    else:
        print(f"🧹 Удалено {original_keys - final_keys} дублирующихся разделов")
    
    # Сохраняем очищенный файл
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(cleaned_data, f, ensure_ascii=False, indent=2)
        print("✅ Файл успешно сохранен")
        return True
    except Exception as e:
        print(f"❌ Ошибка сохранения: {e}")
        # Восстанавливаем из резервной копии
        shutil.copy2(backup_path, file_path)
        print("🔄 Файл восстановлен из резервной копии")
        return False

def main():
    """Основная функция"""
    print("🧹 ПРОСТАЯ ОЧИСТКА ДУБЛИРУЮЩИХСЯ РАЗДЕЛОВ")
    print("=" * 50)
    
    # Находим файлы переводов
    locales_dir = Path("../src/locales")
    if not locales_dir.exists():
        locales_dir = Path("src/locales")
    
    if not locales_dir.exists():
        print("❌ Папка с переводами не найдена!")
        return 1
    
    translation_files = []
    for lang_dir in locales_dir.iterdir():
        if lang_dir.is_dir():
            translation_file = lang_dir / "translation.json"
            if translation_file.exists():
                translation_files.append(translation_file)
    
    if not translation_files:
        print("❌ Файлы переводов не найдены!")
        return 1
    
    print(f"📄 Найдено файлов: {len(translation_files)}")
    
    # Обрабатываем каждый файл
    success_count = 0
    for file_path in translation_files:
        if process_file(file_path):
            success_count += 1
        print()
    
    # Итоги
    print("=" * 50)
    print("📊 РЕЗУЛЬТАТ")
    print("=" * 50)
    
    if success_count == len(translation_files):
        print("✅ Все файлы успешно обработаны!")
        print("💡 Дубликаты на уровне ключей JSON были удалены автоматически при парсинге")
        print("💾 Резервные копии сохранены с расширением .backup")
    else:
        print(f"⚠️  Успешно обработано: {success_count}/{len(translation_files)}")
    
    return 0 if success_count == len(translation_files) else 1

if __name__ == "__main__":
    exit(main())
