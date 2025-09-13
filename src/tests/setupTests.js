import '@testing-library/jest-dom';

// Mock для i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
  I18nextProvider: ({ children }) => children,
}));

// Mock для React Router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
}));

// Mock для Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    img: ({ children, ...props }) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Global error handler для тестов
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock для fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock для IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};
