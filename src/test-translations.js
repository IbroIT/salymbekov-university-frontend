// Тест для проверки переводов research компонентов
console.log('Проверка переводов research компонентов');

// Импортируем переводы
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';
import translationKG from './locales/kg/translation.json';

// Проверяем наличие ключей переводов
const checkTranslations = () => {
  const requiredKeys = [
    'research.management.title',
    'research.management.subtitle', 
    'research.management.tabs.positions',
    'research.management.tabs.councils',
    'research.management.tabs.commissions',
    'research.management.loading',
    'research.management.noData',
    'research.journals.title',
    'research.journals.subtitle',
    'research.journals.loading',
    'research.journals.noData',
    'research.journals.archive',
    'research.journals.downloadPdf',
    'research.journals.viewIssue'
  ];

  const translations = {
    ru: translationRU,
    en: translationEN,
    kg: translationKG
  };

  console.log('Проверка переводов:');
  
  requiredKeys.forEach(key => {
    const keyParts = key.split('.');
    
    Object.keys(translations).forEach(lang => {
      let value = translations[lang];
      let found = true;
      
      for (const part of keyParts) {
        if (value && typeof value === 'object' && value[part]) {
          value = value[part];
        } else {
          found = false;
          break;
        }
      }
      
      if (found) {
        console.log(`✅ ${lang}: ${key} = "${value}"`);
      } else {
        console.error(`❌ ${lang}: Ключ ${key} не найден`);
      }
    });
    console.log('---');
  });
};

export { checkTranslations };
