#!/usr/bin/env python3
"""
Детальный анализ структуры файлов переводов
для поиска потенциальных дубликатов разделов
"""

import json
import os
from pathlib import Path
from collections import defaultdict, Counter

def get_all_section_names(json_data, parent_path=""):
    """
    Получает все имена разделов (ключи верхнего уровня) из JSON
    """
    sections = []
    
    if isinstance(json_data, dict):
        for key, value in json_data.items():
            current_path = f"{parent_path}.{key}" if parent_path else key
            sections.append((key, current_path, type(value).__name__))
            
            # Если значение - это словарь, рекурсивно ищем вложенные разделы
            if isinstance(value, dict):
                nested_sections = get_all_section_names(value, current_path)
                sections.extend(nested_sections)
    
    return sections

def analyze_structure(file_path):
    """Анализирует структуру файла"""
    print(f"\n📁 Файл: {file_path}")
    print("=" * 50)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"❌ Ошибка чтения файла: {e}")
        return
    
    # Получаем все секции
    sections = get_all_section_names(data)
    
    # Считаем количество каждой секции
    section_counter = Counter(section[0] for section in sections)
    
    # Группируем по типу значения
    sections_by_type = defaultdict(list)
    for name, path, value_type in sections:
        sections_by_type[value_type].append((name, path))
    
    print(f"📊 Всего разделов: {len(sections)}")
    print(f"📊 Уникальных названий разделов: {len(section_counter)}")
    
    # Показываем разделы-словари (основные разделы)
    dict_sections = sections_by_type.get('dict', [])
    print(f"\n📁 Разделы-словари ({len(dict_sections)}):")
    for name, path in sorted(dict_sections):
        count = section_counter[name]
        if count > 1:
            print(f"   🔄 {name} (путь: {path}) - встречается {count} раз ⚠️")
        else:
            print(f"   📂 {name} (путь: {path})")
    
    # Показываем дубликаты
    duplicates = {name: count for name, count in section_counter.items() if count > 1}
    if duplicates:
        print(f"\n⚠️  НАЙДЕНЫ ДУБЛИКАТЫ ({len(duplicates)}):")
        for name, count in sorted(duplicates.items()):
            print(f"   🔄 '{name}' встречается {count} раз")
            # Показываем все пути где встречается этот раздел
            matching_paths = [path for section_name, path, _ in sections if section_name == name]
            for i, path in enumerate(matching_paths, 1):
                print(f"      {i}. {path}")
    else:
        print("\n✅ Дубликатов не найдено")

def main():
    print("🔍 ДЕТАЛЬНЫЙ АНАЛИЗ СТРУКТУРЫ ФАЙЛОВ ПЕРЕВОДОВ")
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
    
    # Анализируем каждый файл
    for file_path in translation_files:
        analyze_structure(file_path)

if __name__ == "__main__":
    main()
