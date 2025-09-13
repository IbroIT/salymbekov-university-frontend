#!/bin/bash

echo "🔍 Запуск тестов для обнаружения ошибок..."

# Проверяем, установлены ли зависимости для тестирования
echo "📦 Проверка зависимостей..."
cd /Users/adminbaike/medicine/SU_med_front

# Устанавливаем зависимости для тестирования если их нет
if [ ! -d "node_modules/@testing-library" ]; then
    echo "⬇️ Установка зависимостей для тестирования..."
    npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom identity-obj-proxy jest-transform-stub babel-jest
fi

# Создаем babel config если его нет
if [ ! -f ".babelrc" ] && [ ! -f "babel.config.js" ]; then
    echo "⚙️ Создание Babel конфигурации..."
    cat > babel.config.js << EOF
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
};
EOF
fi

# Запускаем тесты для обнаружения ошибок
echo "🧪 Запуск тестов обнаружения ошибок главной страницы..."
npx jest src/tests/main-page-error-detection.test.js --verbose

echo "🔬 Запуск тестов ошибок HSM компонентов..."
npx jest src/tests/hsm-error-tests.test.js --verbose

# Проверяем лог файлы на ошибки
echo "📋 Проверка логов..."
if [ -f "npm-debug.log" ]; then
    echo "❌ Найден npm-debug.log файл - возможны ошибки установки"
    tail -20 npm-debug.log
fi

# Проверяем консоль браузера на ошибки через headless browser
echo "🌐 Запуск проверки в headless браузере..."
node -e "
const puppeteer = require('puppeteer');
(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Собираем ошибки консоли
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    // Переходим на главную страницу
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
    
    // Ждем загрузки
    await page.waitForTimeout(3000);
    
    if (errors.length > 0) {
      console.log('🚨 Обнаружены ошибки на главной странице:');
      errors.forEach((error, index) => {
        console.log(\`\${index + 1}. \${error}\`);
      });
    } else {
      console.log('✅ Ошибок в консоли не обнаружено');
    }
    
    await browser.close();
  } catch (err) {
    console.log('⚠️ Не удалось запустить проверку браузера:', err.message);
    console.log('💡 Убедитесь что dev server запущен на порту 5173');
  }
})();
" 2>/dev/null || echo "⚠️ Puppeteer не установлен - пропускаем проверку браузера"

echo "✅ Тестирование завершено!"
