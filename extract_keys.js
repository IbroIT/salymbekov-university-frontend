import fs from 'fs';

// Function to extract all keys from nested object
function extractKeys(obj, prefix = '') {
  let keys = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }

  return keys;
}

// Read translation files
const enTranslations = JSON.parse(fs.readFileSync('./src/locales/en/translation.json', 'utf8'));
const ruTranslations = JSON.parse(fs.readFileSync('./src/locales/ru/translation.json', 'utf8'));
const kgTranslations = JSON.parse(fs.readFileSync('./src/locales/kg/translation.json', 'utf8'));

// Extract keys
const enKeys = extractKeys(enTranslations);
const ruKeys = extractKeys(ruTranslations);
const kgKeys = extractKeys(kgTranslations);

// Find common keys across all languages
const allKeys = new Set([...enKeys, ...ruKeys, ...kgKeys]);

console.log('All translation keys:');
console.log(Array.from(allKeys).sort());

// Also check for keys that exist in one but not others
const enOnly = enKeys.filter(key => !ruKeys.includes(key) || !kgKeys.includes(key));
const ruOnly = ruKeys.filter(key => !enKeys.includes(key) || !kgKeys.includes(key));
const kgOnly = kgKeys.filter(key => !enKeys.includes(key) || !ruKeys.includes(key));

console.log('\nKeys only in EN:', enOnly);
console.log('\nKeys only in RU:', ruOnly);
console.log('\nKeys only in KG:', kgOnly);