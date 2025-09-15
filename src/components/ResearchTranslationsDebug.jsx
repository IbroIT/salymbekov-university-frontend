import React from 'react';
import { useTranslation } from 'react-i18next';

const ResearchTranslationsDebug = () => {
  const { t, i18n } = useTranslation();

  const testKeys = [
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

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'en', name: 'English' },
    { code: 'kg', name: 'Кыргызча' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 9999,
      fontSize: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', fontWeight: 'bold' }}>
        Research Translations Debug
      </h3>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Current Language: {i18n.language}</strong>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>Language Switch:</strong>
        <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                background: i18n.language === lang.code ? '#007bff' : 'white',
                color: i18n.language === lang.code ? 'white' : 'black',
                cursor: 'pointer',
                fontSize: '10px'
              }}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <strong>Translation Test:</strong>
        <div style={{ marginTop: '10px' }}>
          {testKeys.map(key => {
            const translation = t(key, `MISSING: ${key}`);
            const isMissing = translation.startsWith('MISSING:');
            
            return (
              <div 
                key={key} 
                style={{ 
                  marginBottom: '8px',
                  padding: '4px',
                  background: isMissing ? '#ffe6e6' : '#e6ffe6',
                  borderRadius: '3px'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '10px', color: '#666' }}>
                  {key}
                </div>
                <div style={{ 
                  fontSize: '11px',
                  color: isMissing ? 'red' : 'green',
                  wordBreak: 'break-word'
                }}>
                  {translation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <button
        onClick={() => document.body.removeChild(document.getElementById('debug-translations'))}
        style={{
          marginTop: '15px',
          padding: '5px 10px',
          background: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '11px'
        }}
      >
        Close Debug
      </button>
    </div>
  );
};

export default ResearchTranslationsDebug;
