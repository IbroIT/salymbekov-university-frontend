#!/usr/bin/env python3
"""
Поиск дублирующихся разделов в JSON файле как в тексте.
Ищет дублирующиеся ключи до парсинга JSON.
"""

import re
import json
from pathlib import Path
from collections import defaultdict

def find_json_sections_in_text(text):
    """
    Находит все разделы (ключи первого уровня) в тексте JSON
    """
    # Паттерн для поиска ключей первого уровня
    # Ищем "ключ": { в начале строки (с учетом пробелов)
    pattern = r'^\s*"([^"]+)"\s*:\s*\{'
    
    sections = []
    lines = text.split('\n')
    
    for line_num, line in enumerate(lines, 1):
        match = re.match(pattern, line)
        if match:
            key = match.group(1)
            sections.append({
                'key': key,
                'line': line_num,
                'text': line.strip()
            })
    
    return sections

def analyze_text_duplicates(sections):
    """
    Анализирует найденные разделы на дубликаты
    """
    key_counts = defaultdict(list)
    
    for section in sections:
        key_counts[section['key']].append(section)
    
    duplicates = {}
    for key, occurrences in key_counts.items():
        if len(occurrences) > 1:
            duplicates[key] = occurrences
    
    return duplicates

def analyze_file(file_path):
    """
    Анализирует файл на предмет дубликатов
    """
    print(f"\n📁 Анализируем файл: {file_path}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Ошибка чтения файла: {e}")
        return False
    
    # Находим разделы в тексте
    sections = find_json_sections_in_text(content)
    print(f"📊 Найдено разделов: {len(sections)}")
    
    # Ищем дубликаты
    duplicates = analyze_text_duplicates(sections)
    
    if not duplicates:
        print("✅ Дублирующихся разделов не найдено!")
        return True
    
    print(f"⚠️  Найдено дублирующихся ключей: {len(duplicates)}")
    
    for key, occurrences in duplicates.items():
        print(f"\n🔄 Ключ '{key}' встречается {len(occurrences)} раз:")
        for i, occurrence in enumerate(occurrences, 1):
            print(f"   {i}. Строка {occurrence['line']}: {occurrence['text']}")
    
    # Проверяем, что происходит при загрузке JSON
    try:
        parsed_data = json.loads(content)
        print(f"\n📊 После парсинга JSON осталось разделов: {len(parsed_data)}")
        print("💡 Python автоматически удаляет дубликаты при парсинге, оставляя последнее значение")
    except Exception as e:
        print(f"❌ Ошибка парсинга JSON: {e}")
    
    return duplicates

def main():
    """Основная функция"""
    print("🔍 ПОИСК ДУБЛИКАТОВ В ТЕКСТЕ JSON")
    print("=" * 50)
    
    # Путь к папке с переводами
    locales_dir = Path("../src/locales")
    if not locales_dir.exists():
        locales_dir = Path("src/locales")
    
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
    
    # Анализируем каждый файл
    total_duplicates = {}
    for file_path in translation_files:
        duplicates = analyze_file(file_path)
        if duplicates:
            total_duplicates[str(file_path)] = duplicates
    
    print("\n" + "=" * 50)
    print("📊 ИТОГОВЫЙ ОТЧЕТ")
    print("=" * 50)
    
    if total_duplicates:
        print(f"⚠️  Файлов с дубликатами: {len(total_duplicates)}")
        for file_path, duplicates in total_duplicates.items():
            print(f"\n📁 {file_path}:")
            for key, occurrences in duplicates.items():
                lines = [str(occ['line']) for occ in occurrences]
                print(f"   🔄 '{key}' на строках: {', '.join(lines)}")
    else:
        print("✅ Дубликаты не найдены!")

if __name__ == "__main__":
    main()
