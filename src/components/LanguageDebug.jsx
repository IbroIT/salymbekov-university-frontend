import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDebug = () => {
  const { i18n } = useTranslation();
  const savedLng = localStorage.getItem('i18nextLng');

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>Current Language: {i18n.language}</div>
      <div>Saved in localStorage: {savedLng}</div>
    </div>
  );
};

export default LanguageDebug;
