// Тест переводов для Research компонентов
// Вставьте этот код в консоль браузера на страницах /research/management или /research/journals

console.log('🧪 Тест переводов Research компонентов');

// Функция для тестирования переводов
function testTranslations() {
  // Проверяем есть ли i18next
  if (typeof window !== 'undefined' && window.i18next) {
    const i18n = window.i18next;
    
    console.log('🌍 Текущий язык:', i18n.language);
    
    // Тестовые ключи
    const testKeys = [
      'research.management.title',
      'research.management.subtitle',
      'research.management.tabs.positions',
      'research.journals.title',
      'research.journals.subtitle',
      'research.journals.downloadPdf'
    ];
    
    const languages = ['ru', 'en', 'kg'];
    
    languages.forEach(lang => {
      console.log(`\n📝 Тестирование ${lang.toUpperCase()}:`);
      
      testKeys.forEach(key => {
        const translation = i18n.t(key, { lng: lang });
        const status = translation.includes(key) ? '❌' : '✅';
        console.log(`${status} ${key}: "${translation}"`);
      });
    });
    
    // Функция переключения языка для тестирования
    window.switchLanguage = function(lang) {
      i18n.changeLanguage(lang);
      console.log(`🔄 Язык изменен на: ${lang}`);
      console.log('🔄 Обновите страницу для применения изменений');
    };
    
    console.log('\n🎮 Для переключения языка используйте:');
    console.log('switchLanguage("ru") - Русский');
    console.log('switchLanguage("en") - English'); 
    console.log('switchLanguage("kg") - Кыргызча');
    
  } else {
    console.error('❌ i18next не найден');
  }
}

// Запускаем тест
testTranslations();
