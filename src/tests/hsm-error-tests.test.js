// Тест для проверки ошибок в компонентах ВШМ
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';

// Импорт компонентов ВШМ
import HSMInfo from '../src/components/HSM/HSMInfo';
import Programs from '../src/components/HSM/Programs';
import Faculty from '../src/components/HSM/Faculty';
import HSMAccreditation from '../src/components/HSM/HSMAccreditation';
import HSMLearningGoals from '../src/components/HSM/HSMLearningGoals';

// Mock API calls
jest.mock('../src/services/hsmService', () => ({
  __esModule: true,
  default: {
    getHSMInfo: jest.fn(),
    getBachelorPrograms: jest.fn(),
    getMasterPrograms: jest.fn(),
    getFacultyByPosition: jest.fn(),
    getAccreditationsByType: jest.fn(),
    getLearningGoals: jest.fn(),
  },
}));

// Helper функция для рендеринга компонентов с провайдерами
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        {component}
      </I18nextProvider>
    </BrowserRouter>
  );
};

describe('HSM Components Error Handling', () => {
  // Тест для HSMInfo компонента
  describe('HSMInfo Component', () => {
    test('should handle API error gracefully', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getHSMInfo.mockRejectedValue(new Error('API Error'));

      renderWithProviders(<HSMInfo />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    test('should show loading state', () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getHSMInfo.mockImplementation(() => new Promise(() => {})); // Never resolves

      renderWithProviders(<HSMInfo />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('should handle empty data', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getHSMInfo.mockResolvedValue([]);

      renderWithProviders(<HSMInfo />);

      await waitFor(() => {
        expect(screen.getByText(/no data/i)).toBeInTheDocument();
      });
    });
  });

  // Тест для Programs компонента
  describe('Programs Component', () => {
    test('should handle network error', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getBachelorPrograms.mockRejectedValue(new Error('Network Error'));
      hsmService.getMasterPrograms.mockRejectedValue(new Error('Network Error'));

      renderWithProviders(<Programs />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    test('should handle empty programs list', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getBachelorPrograms.mockResolvedValue([]);
      hsmService.getMasterPrograms.mockResolvedValue([]);

      renderWithProviders(<Programs />);

      await waitFor(() => {
        expect(screen.getByText(/no programs/i)).toBeInTheDocument();
      });
    });
  });

  // Тест для Faculty компонента
  describe('Faculty Component', () => {
    test('should handle faculty API error', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getFacultyByPosition.mockRejectedValue(new Error('Failed to fetch faculty'));

      renderWithProviders(<Faculty />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });

    test('should handle empty faculty data', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getFacultyByPosition.mockResolvedValue({});

      renderWithProviders(<Faculty />);

      await waitFor(() => {
        expect(screen.getByText(/no faculty/i)).toBeInTheDocument();
      });
    });
  });

  // Тест для HSMAccreditation компонента
  describe('HSMAccreditation Component', () => {
    test('should handle accreditation API error', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getAccreditationsByType.mockRejectedValue(new Error('Failed to fetch accreditations'));

      renderWithProviders(<HSMAccreditation />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });

  // Тест для HSMLearningGoals компонента
  describe('HSMLearningGoals Component', () => {
    test('should handle learning goals API error', async () => {
      const hsmService = require('../src/services/hsmService').default;
      hsmService.getLearningGoals.mockRejectedValue(new Error('Failed to fetch learning goals'));

      renderWithProviders(<HSMLearningGoals />);

      await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
      });
    });
  });
});

// Тест для проверки роутинга
describe('HSM Routing', () => {
  test('should handle invalid routes', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    renderWithProviders(
      <div>
        {/* Попытка рендера несуществующего компонента */}
        <HSMInfo invalidProp="test" />
      </div>
    );

    // Проверяем, что не было критических ошибок
    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});

// Тест для проверки API service
describe('HSM Service Error Handling', () => {
  test('should handle network timeout', async () => {
    const hsmService = require('../src/services/hsmService').default;
    
    // Mock fetch для симуляции таймаута
    global.fetch = jest.fn(() => 
      Promise.reject(new Error('Network timeout'))
    );

    await expect(hsmService.getHSMInfo()).rejects.toThrow('Network timeout');
  });

  test('should handle HTTP 404 error', async () => {
    const hsmService = require('../src/services/hsmService').default;
    
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: false,
        status: 404,
      })
    );

    await expect(hsmService.getPrograms()).rejects.toThrow();
  });

  test('should handle malformed JSON response', async () => {
    const hsmService = require('../src/services/hsmService').default;
    
    global.fetch = jest.fn(() => 
      Promise.resolve({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      })
    );

    await expect(hsmService.getFaculty()).rejects.toThrow();
  });
});

// Интеграционные тесты
describe('HSM Integration Tests', () => {
  test('should handle backend unavailable', async () => {
    const hsmService = require('../src/services/hsmService').default;
    
    global.fetch = jest.fn(() => 
      Promise.reject(new Error('ECONNREFUSED'))
    );

    const result = await hsmService.getHSMInfo().catch(err => err);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain('ECONNREFUSED');
  });

  test('should handle CORS errors', async () => {
    const hsmService = require('../src/services/hsmService').default;
    
    global.fetch = jest.fn(() => 
      Promise.reject(new Error('CORS error'))
    );

    const result = await hsmService.getPrograms().catch(err => err);
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toContain('CORS error');
  });
});
