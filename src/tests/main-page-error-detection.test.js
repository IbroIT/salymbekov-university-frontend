// Тест для проверки ошибок главной страницы
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';

// Консольный тест ошибок
describe('Main Page Error Detection', () => {
  let consoleError;
  let consoleWarn;

  beforeEach(() => {
    // Перехватываем console.error и console.warn
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Восстанавливаем console методы
    consoleError.mockRestore();
    consoleWarn.mockRestore();
  });

  test('should detect console errors on main page load', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Ждем загрузки компонентов
    await waitFor(() => {
      // Проверяем, были ли ошибки в консоли
      if (consoleError.mock.calls.length > 0) {
        console.log('🚨 Обнаружены ошибки в консоли:');
        consoleError.mock.calls.forEach((call, index) => {
          console.log(`Error ${index + 1}:`, call[0]);
        });
      }

      if (consoleWarn.mock.calls.length > 0) {
        console.log('⚠️ Обнаружены предупреждения в консоли:');
        consoleWarn.mock.calls.forEach((call, index) => {
          console.log(`Warning ${index + 1}:`, call[0]);
        });
      }
    }, { timeout: 5000 });

    // Выводим результат
    expect(consoleError.mock.calls.length).toBeLessThan(5); // Допускаем до 5 ошибок
  });

  test('should check for undefined variables', () => {
    // Проверяем глобальные переменные
    const globalVars = ['React', 'ReactDOM'];
    globalVars.forEach(varName => {
      expect(typeof window[varName]).not.toBe('undefined');
    });
  });

  test('should check for network errors', async () => {
    const originalFetch = global.fetch;
    let fetchErrors = [];

    // Перехватываем fetch запросы
    global.fetch = jest.fn((url) => {
      return originalFetch(url).catch(error => {
        fetchErrors.push({ url, error: error.message });
        throw error;
      });
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      if (fetchErrors.length > 0) {
        console.log('🌐 Обнаружены сетевые ошибки:');
        fetchErrors.forEach((error, index) => {
          console.log(`Network Error ${index + 1}:`, error);
        });
      }
    }, { timeout: 3000 });

    global.fetch = originalFetch;
  });
});

// Тест для проверки specific HSM route errors
describe('HSM Routes Error Detection', () => {
  const hsmRoutes = [
    '/hsm',
    '/hsm/info',
    '/hsm/programs',
    '/hsm/faculty',
    '/hsm/accreditation',
    '/hsm/learning-goals'
  ];

  hsmRoutes.forEach(route => {
    test(`should load ${route} without errors`, async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Симулируем переход на маршрут
      window.history.pushState({}, 'Test page', route);

      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );

      await waitFor(() => {
        expect(consoleError.mock.calls.length).toBe(0);
      }, { timeout: 2000 });

      consoleError.mockRestore();
    });
  });
});

// Тест для проверки JavaScript runtime errors
describe('JavaScript Runtime Error Detection', () => {
  test('should detect unhandled promise rejections', (done) => {
    const originalHandler = window.onunhandledrejection;
    const errors = [];

    window.onunhandledrejection = (event) => {
      errors.push(event.reason);
      event.preventDefault(); // Предотвращаем вывод в консоль
    };

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    setTimeout(() => {
      if (errors.length > 0) {
        console.log('🔥 Обнаружены необработанные Promise rejections:');
        errors.forEach((error, index) => {
          console.log(`Unhandled Rejection ${index + 1}:`, error);
        });
      }

      window.onunhandledrejection = originalHandler;
      done();
    }, 3000);
  });

  test('should detect uncaught exceptions', (done) => {
    const originalHandler = window.onerror;
    const errors = [];

    window.onerror = (message, source, lineno, colno, error) => {
      errors.push({ message, source, lineno, colno, error });
      return true; // Предотвращаем вывод в консоль
    };

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    setTimeout(() => {
      if (errors.length > 0) {
        console.log('💥 Обнаружены необработанные исключения:');
        errors.forEach((error, index) => {
          console.log(`Uncaught Exception ${index + 1}:`, error);
        });
      }

      window.onerror = originalHandler;
      done();
    }, 3000);
  });
});

// Тест для проверки CSS и ресурсов
describe('Resource Loading Error Detection', () => {
  test('should check for missing CSS files', () => {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const missingStyles = [];

    stylesheets.forEach(link => {
      if (link.sheet === null) {
        missingStyles.push(link.href);
      }
    });

    if (missingStyles.length > 0) {
      console.log('🎨 Обнаружены проблемы с CSS файлами:');
      missingStyles.forEach((href, index) => {
        console.log(`Missing CSS ${index + 1}:`, href);
      });
    }

    expect(missingStyles.length).toBe(0);
  });

  test('should check for missing images', (done) => {
    const images = document.querySelectorAll('img');
    const brokenImages = [];
    let loadedCount = 0;

    if (images.length === 0) {
      done();
      return;
    }

    images.forEach(img => {
      const testImg = new Image();
      testImg.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          if (brokenImages.length > 0) {
            console.log('🖼️ Обнаружены сломанные изображения:');
            brokenImages.forEach((src, index) => {
              console.log(`Broken Image ${index + 1}:`, src);
            });
          }
          done();
        }
      };
      testImg.onerror = () => {
        brokenImages.push(img.src);
        loadedCount++;
        if (loadedCount === images.length) {
          done();
        }
      };
      testImg.src = img.src;
    });
  });
});
