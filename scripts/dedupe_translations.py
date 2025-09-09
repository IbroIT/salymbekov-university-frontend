import json
from collections import OrderedDict

"""
Simple dedupe: read the JSON file, parse it with a streaming approach, and build an OrderedDict
that preserves last value for duplicate top-level keys by re-parsing and updating.
This script will keep the last-seen value for duplicate top-level keys.
"""

SRC = r"c:\Users\Ибро\Desktop\Projects\SU-M\front_su_m\src\locales\en\translation.json"
OUT = SRC


def load_json_keep_last(path):
    # We'll load raw text and use a naive approach: parse full JSON multiple times
    # to collect the top-level keys in order they appear. Python's json does not
    # preserve duplicate keys, so we implement a custom parser to detect key positions.
    text = open(path, 'r', encoding='utf-8').read()

    # Find top-level keys by scanning for quoted keys at the top level.
    # This is a heuristic that works for well-formed JSON where top-level keys are quoted and followed by :
    import re
    pattern = re.compile(r'"([^"]+)"\s*:\s*', re.M)

    # Build list of matches with their index
    matches = [(m.group(1), m.start()) for m in pattern.finditer(text)]

    # Filter only top-level keys by simple brace depth tracking
    top_keys = []
    depth = 0
    key_positions = []
    for m in pattern.finditer(text):
        start = m.start()
        # compute depth at this position
        seg = text[:start]
        depth = seg.count('{') - seg.count('}')
        if depth == 1:  # directly inside outer object
            key_positions.append((m.group(1), start))

    # To keep last-seen, we'll iterate key_positions and capture the substring for each key value
    result = OrderedDict()
    for i, (key, pos) in enumerate(key_positions):
        # find the start of the value after the ':'
        colon_index = text.find(':', pos)
        # value starts after colon
        value_start = colon_index + 1
        # determine end by next top-level key or the last closing brace
        if i + 1 < len(key_positions):
            next_pos = key_positions[i + 1][1]
            value_text = text[value_start:next_pos]
        else:
            # until the final closing brace
            value_text = text[value_start:text.rfind('}')]

        # reconstruct a small JSON for this key
        snippet = '{' + f'"{key}":' + value_text + '}'
        try:
            parsed = json.loads(snippet)
            result[key] = parsed[key]
        except Exception as e:
            # fallback: skip on parse error
            print(f"Warning: failed to parse value for key {key}: {e}")

    return result


def write_pretty(obj, path):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


if __name__ == '__main__':
    combined = load_json_keep_last(SRC)
    write_pretty(combined, OUT)
    print('Wrote cleaned translation JSON to', OUT)
