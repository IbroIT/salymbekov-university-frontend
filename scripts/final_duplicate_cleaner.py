#!/usr/bin/env python3
"""
ФИНАЛЬНЫЙ СКРИПТ: Безопасное удаление всех дублирующихся разделов.
Этот скрипт найдет и удалит дублирующиеся разделы в JSON файлах переводов,
сохраняя только первое вхождение каждого ключа.
"""

import re
import json
import shutil
from pathlib import Path
from collections import defaultdict
import sys

def find_json_sections_in_text(text):
    """
    Находит все разделы (ключи первого уровня) в тексте JSON
    """
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
                'text': line.strip(),
                'original_line': line
            })
    
    return sections

def find_duplicates(sections):
    """
    Находит дублирующиеся разделы
    """
    key_counts = defaultdict(list)
    
    for section in sections:
        key_counts[section['key']].append(section)
    
    duplicates = {}
    for key, occurrences in key_counts.items():
        if len(occurrences) > 1:
            duplicates[key] = occurrences
    
    return duplicates

def remove_duplicates_from_text(text, duplicates):
    """
    Удаляет дублирующиеся разделы из текста, оставляя только первое вхождение
    """
    lines = text.split('\n')
    lines_to_remove = set()
    
    # Определяем строки для удаления
    for key, occurrences in duplicates.items():
        # Оставляем первое вхождение, удаляем остальные
        keep_first = occurrences[0]
        remove_sections = occurrences[1:]
        
        print(f"  🔄 Ключ '{key}':")
        print(f"     ✅ Сохраняем: строка {keep_first['line']}")
        
        for section in remove_sections:
            print(f"     ❌ Удаляем: строка {section['line']}")
            # Находим начало и конец раздела для удаления
            start_line = section['line'] - 1  # -1 потому что нумерация с 1
            end_line = find_section_end(lines, start_line)
            
            # Добавляем все строки раздела в список для удаления
            for i in range(start_line, end_line + 1):
                lines_to_remove.add(i)
    
    # Удаляем строки
    cleaned_lines = []
    for i, line in enumerate(lines):
        if i not in lines_to_remove:
            cleaned_lines.append(line)
    
    return '\n'.join(cleaned_lines)

def find_section_end(lines, start_line):
    """
    Находит конец JSON раздела, начинающегося с start_line
    """
    if start_line >= len(lines):
        return start_line
    
    # Считаем уровень вложенности скобок
    brace_count = 0
    in_section = False
    
    for i in range(start_line, len(lines)):
        line = lines[i]
        
        # Начинаем считать скобки после первой открывающей скобки раздела
        if '{' in line and not in_section:
            in_section = True
        
        if in_section:
            # Считаем открывающие и закрывающие скобки
            brace_count += line.count('{')
            brace_count -= line.count('}')
            
            # Если скобки сбалансированы, значит раздел закончился
            if brace_count == 0:
                return i
    
    # Если не нашли конец, возвращаем последнюю строку
    return len(lines) - 1

def validate_json_text(text):
    """
    Проверяет, что текст является валидным JSON
    """
    try:
        json.loads(text)
        return True, "OK"
    except json.JSONDecodeError as e:
        return False, f"JSON Error: {e}"
    except Exception as e:
        return False, f"Error: {e}"

def process_file(file_path, dry_run=False):
    """
    Обрабатывает один файл переводов
    """
    print(f"\n📁 Обрабатываем файл: {file_path}")
    
    # Читаем файл
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original_text = f.read()
    except Exception as e:
        print(f"❌ Ошибка чтения файла: {e}")
        return False
    
    # Находим разделы
    sections = find_json_sections_in_text(original_text)
    print(f"📊 Найдено разделов: {len(sections)}")
    
    # Находим дубликаты
    duplicates = find_duplicates(sections)
    
    if not duplicates:
        print("✅ Дублирующихся разделов не найдено!")
        return True
    
    # Подсчитываем статистику
    total_duplicates = sum(len(occurrences) - 1 for occurrences in duplicates.values())
    print(f"⚠️  Найдено {len(duplicates)} дублирующихся ключей")
    print(f"⚠️  Всего дубликатов для удаления: {total_duplicates}")
    
    if dry_run:
        print("\n🔍 РЕЖИМ ПРОСМОТРА:")
        for key, occurrences in duplicates.items():
            keep = occurrences[0]
            remove = occurrences[1:]
            print(f"  🔄 '{key}': сохранить строку {keep['line']}, удалить строки {[s['line'] for s in remove]}")
        return True
    
    # Запрашиваем подтверждение
    print(f"\n⚠️  ВНИМАНИЕ! Будет удалено {total_duplicates} дублирующихся разделов из {len(duplicates)} ключей.")
    response = input("❓ Продолжить удаление? (y/N): ").lower().strip()
    if response not in ['y', 'yes', 'да', 'д']:
        print("❌ Операция отменена пользователем")
        return False
    
    # Создаем резервную копию
    backup_path = f"{file_path}.backup.{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}"
    try:
        shutil.copy2(file_path, backup_path)
        print(f"💾 Создана резервная копия: {backup_path}")
    except Exception as e:
        print(f"❌ Не удалось создать резервную копию: {e}")
        return False
    
    # Удаляем дубликаты
    print("\n🧹 Удаляем дубликаты:")
    try:
        cleaned_text = remove_duplicates_from_text(original_text, duplicates)
    except Exception as e:
        print(f"❌ Ошибка при удалении дубликатов: {e}")
        return False
    
    # Проверяем валидность JSON
    is_valid, validation_error = validate_json_text(cleaned_text)
    if not is_valid:
        print(f"❌ Получен невалидный JSON: {validation_error}")
        print("❌ Операция прервана для безопасности")
        return False
    
    # Сохраняем файл
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(cleaned_text)
        print(f"✅ Файл успешно сохранен")
        
        # Дополнительная проверка - пытаемся загрузить JSON
        test_data = json.loads(cleaned_text)
        new_section_count = len(test_data)
        original_section_count = len(sections)
        
        print(f"📊 Результат:")
        print(f"   - Было разделов: {original_section_count}")
        print(f"   - Стало разделов: {new_section_count}")
        print(f"   - Удалено дубликатов: {original_section_count - new_section_count}")
        
        return True
        
    except Exception as e:
        print(f"❌ Ошибка сохранения файла: {e}")
        # Пытаемся восстановить из резервной копии
        try:
            shutil.copy2(backup_path, file_path)
            print("🔄 Файл восстановлен из резервной копии")
        except:
            print("💥 Не удалось восстановить файл!")
        return False

def main():
    """Основная функция"""
    print("🧹 ФИНАЛЬНАЯ ОЧИСТКА ДУБЛИРУЮЩИХСЯ РАЗДЕЛОВ")
    print("=" * 60)
    
    # Проверяем аргументы
    dry_run = "--dry-run" in sys.argv or "-d" in sys.argv
    if dry_run:
        print("🔍 РЕЖИМ ПРОСМОТРА - изменения не применяются")
        print("=" * 60)
    
    # Находим папку с переводами
    locales_dir = Path("../src/locales")
    if not locales_dir.exists():
        locales_dir = Path("src/locales")
    
    if not locales_dir.exists():
        print("❌ Папка с переводами не найдена!")
        return 1
    
    # Находим файлы переводов
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
    for f in translation_files:
        print(f"   - {f}")
    
    if not dry_run:
        print(f"\n💡 Совет: сначала запустите с флагом --dry-run для просмотра")
        response = input("❓ Продолжить обработку файлов? (y/N): ").lower().strip()
        if response not in ['y', 'yes', 'да', 'д']:
            print("❌ Операция отменена")
            return 0
    
    # Обрабатываем файлы
    success_count = 0
    for file_path in translation_files:
        if process_file(file_path, dry_run):
            success_count += 1
    
    # Итоговый отчет
    print("\n" + "=" * 60)
    print("📊 ИТОГОВЫЙ ОТЧЕТ")
    print("=" * 60)
    
    if success_count == len(translation_files):
        print("✅ Все файлы успешно обработаны!")
        if not dry_run:
            print("💾 Резервные копии сохранены")
            print("🔥 Дубликаты удалены!")
            print("\n💡 Рекомендации:")
            print("   1. Проверьте работу фронтенда")  
            print("   2. Запустите тесты")
            print("   3. Если что-то сломалось, восстановите из .backup файлов")
    else:
        print(f"⚠️  Обработано: {success_count}/{len(translation_files)}")
    
    return 0 if success_count == len(translation_files) else 1

# Добавляем импорт pandas только если он доступен
try:
    import pandas as pd
except ImportError:
    # Создаем заглушку для timestamp
    class pd:
        class Timestamp:
            @staticmethod
            def now():
                from datetime import datetime
                return datetime.now()

if __name__ == "__main__":
    exit(main())
