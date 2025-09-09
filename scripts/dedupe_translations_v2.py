import json

SRC = r"c:\Users\Ибро\Desktop\Projects\SU-M\front_su_m\src\locales\en\translation.json"


def parse_top_level(path):
    s = open(path, 'r', encoding='utf-8').read()
    i = 0
    n = len(s)
    # find first '{'
    while i < n and s[i] != '{':
        i += 1
    if i >= n:
        raise ValueError('No opening brace found')
    i += 1  # move past '{'
    result = {}

    def skip_whitespace(j):
        while j < n and s[j].isspace():
            j += 1
        return j

    while True:
        i = skip_whitespace(i)
        if i >= n:
            break
        if s[i] == '}':
            break
        if s[i] != '"':
            # unexpected, try to find next '"' or break
            i = s.find('"', i)
            if i == -1:
                break
        # parse key string
        j = i + 1
        key_chars = []
        while j < n:
            ch = s[j]
            if ch == '\\':
                # escape
                key_chars.append(s[j:j+2])
                j += 2
                continue
            if ch == '"':
                break
            key_chars.append(ch)
            j += 1
        key = ''.join(key_chars)
        j += 1  # past closing quote
        j = skip_whitespace(j)
        if j >= n or s[j] != ':':
            # malformed
            raise ValueError('Expected colon after key at pos {}'.format(j))
        j += 1
        j = skip_whitespace(j)
        # parse value starting at j
        start = j
        if s[j] in '{[':
            # need to find matching bracket
            open_ch = s[j]
            close_ch = '}' if open_ch == '{' else ']'
            depth = 0
            k = j
            in_string = False
            while k < n:
                ch = s[k]
                if ch == '"':
                    # toggle in_string unless escaped
                    # count backslashes
                    bs = 0
                    t = k - 1
                    while t >= 0 and s[t] == '\\':
                        bs += 1
                        t -= 1
                    if bs % 2 == 0:
                        in_string = not in_string
                    k += 1
                    continue
                if in_string:
                    k += 1
                    continue
                if ch == open_ch:
                    depth += 1
                elif ch == close_ch:
                    depth -= 1
                    if depth == 0:
                        k += 1
                        break
                k += 1
            end = k
        elif s[j] == '"':
            # string literal
            k = j + 1
            while k < n:
                if s[k] == '\\':
                    k += 2
                    continue
                if s[k] == '"':
                    k += 1
                    break
                k += 1
            end = k
        else:
            # literal (number, true, false, null)
            k = j
            while k < n and s[k] not in ',}':
                k += 1
            end = k
        value_text = s[start:end]
        # advance i to after end
        i = end
        # skip trailing commas/spaces
        # try to parse the key-value
        try:
            obj = json.loads('{"%s":%s}' % (key.replace('"','\\"'), value_text))
            result[key] = obj[key]
        except Exception as e:
            print('Warning: failed to parse key %s: %s' % (key, e))
        # move to next comma or end
        i = skip_whitespace(i)
        if i < n and s[i] == ',':
            i += 1
            continue
        if i < n and s[i] == '}':
            break
        # else continue loop
    return result


if __name__ == '__main__':
    data = parse_top_level(SRC)
    # write pretty
    with open(SRC, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print('Cleaned and wrote', SRC)
