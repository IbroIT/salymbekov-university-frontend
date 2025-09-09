#!/usr/bin/env python3
"""
Скрипт для поиска дублирующихся разделов в файлах переводов.
Дубликаты - это одинаковые разделы (главы) с одинаковыми ключами,
а НЕ одинаковые значения в разных разделах.
"""

import json
import os
from pathlib import Path
from collections import defaultdict, Counter
import sys

def find_duplicate_sections(json_data, path=""):
    """
    Находит дублирующиеся разделы в JSON данных.
    Возвращает словарь: {section_name: [(path, content), (path, content), ...]}
    """
    duplicates = defaultdict(list)
    section_contents = defaultdict(list)
    
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            current_path = f"{path}.{key}" if path else key
            
            if isinstance(value, dict):
                # Это раздел - сохраняем его содержимое
                section_contents[key].append((current_path, value))
                
                # Рекурсивно ищем вложенные дубликаты
                nested_duplicates = find_duplicate_sections(value, current_path)
                for dup_key, dup_list in nested_duplicates.items():
                    duplicates[dup_key].extend(dup_list)
    
    # Находим разделы с одинаковыми именами
    for section_name, occurrences in section_contents.items():
        if len(occurrences) > 1:
            # Проверяем, действительно ли это дубликаты (одинаковое содержимое)
            contents = [occ[1] for occ in occurrences]
            if len(set(json.dumps(content, sort_keys=True) for content in contents)) > 1:
                # Разное содержимое - это не дубликаты
                continue
            elif len(set(json.dumps(content, sort_keys=True) for content in contents)) == 1:
                # Одинаковое содержимое - это дубликаты
                duplicates[section_name] = occurrences
    
    return duplicates

def analyze_file(file_path):
    """Анализирует один файл переводов"""
    print(f"\n📁 Анализируем файл: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения файла {file_path}: {e}")
        return None
    
    # Находим дублирующиеся разделы
    duplicates = find_duplicate_sections(data)
    
    if not duplicates:
        print("✅ Дублирующихся разделов не найдено!")
        return None
    
    print(f"⚠️  Найдено {len(duplicates)} дублирующихся разделов:")
    
    for section_name, occurrences in duplicates.items():
        print(f"\n🔄 Раздел '{section_name}' дублируется {len(occurrences)} раз:")
        for i, (path, content) in enumerate(occurrences, 1):
            print(f"   {i}. Путь: {path}")
            print(f"      Ключей в разделе: {len(content) if isinstance(content, dict) else 'не словарь'}")
            if isinstance(content, dict) and len(content) <= 5:
                print(f"      Ключи: {list(content.keys())}")
            elif isinstance(content, dict):
                print(f"      Первые 5 ключей: {list(content.keys())[:5]}...")
    
    return duplicates

def main():
    """Основная функция"""
    print("🔍 Поиск дублирующихся разделов в файлах переводов")
    print("=" * 60)
    
    # Путь к папке с переводами
    locales_dir = Path("../src/locales")
    if not locales_dir.exists():
        locales_dir = Path("src/locales")
    if not locales_dir.exists():
        locales_dir = Path("locales")
    
    if not locales_dir.exists():
        print("❌ Папка с переводами не найдена!")
        return
    
    print(f"📂 Папка с переводами: {locales_dir.absolute()}")
    
    # Находим все файлы переводов
    translation_files = []
    for lang_dir in locales_dir.iterdir():
        if lang_dir.is_dir():
            translation_file = lang_dir / "translation.json"
            if translation_file.exists():
                translation_files.append(translation_file)
    
    if not translation_files:
        print("❌ Файлы переводов не найдены!")
        return
    
    print(f"📄 Найдено файлов переводов: {len(translation_files)}")
    for file in translation_files:
        print(f"   - {file}")
    
    # Анализируем каждый файл
    all_duplicates = {}
    for file_path in translation_files:
        duplicates = analyze_file(file_path)
        if duplicates:
            all_duplicates[str(file_path)] = duplicates
    
    # Итоговый отчет
    print("\n" + "=" * 60)
    print("📊 ИТОГОВЫЙ ОТЧЕТ")
    print("=" * 60)
    
    if not all_duplicates:
        print("✅ Дублирующихся разделов не найдено ни в одном файле!")
    else:
        print(f"⚠️  Файлов с дубликатами: {len(all_duplicates)}")
        for file_path, duplicates in all_duplicates.items():
            print(f"\n📁 {file_path}:")
            for section_name, occurrences in duplicates.items():
                print(f"   🔄 '{section_name}' - {len(occurrences)} дубликатов")
    
    return all_duplicates

if __name__ == "__main__":
    main()
