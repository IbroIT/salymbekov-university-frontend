import React from 'react';
import { useTranslation } from 'react-i18next';

const SideMenu = ({ items, currentPath }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed right-4 top-24 w-64 bg-white/95 backdrop-blur-md shadow-xl rounded-xl p-4 z-40 border border-gray-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">{t('nav.quick_nav')}</h3>
      <nav className="space-y-2">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              currentPath === item.link
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
            }`}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideMenu;