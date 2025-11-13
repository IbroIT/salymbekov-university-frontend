import React from 'react';
import { useTranslation } from 'react-i18next';

const InstructionsPage = () => {
  const { t } = useTranslation();

  const documents = [
    { id: 1, name: t('instructions.userManual'), pdf: '/documents/user-manual.pdf' },
    { id: 2, name: t('instructions.safetyRegulations'), pdf: '/documents/safety-regulations.pdf' },
    { id: 3, name: t('instructions.technicalGuide'), pdf: '/documents/technical-guide.pdf' },
    { id: 4, name: t('instructions.operatingProcedures'), pdf: '/documents/operating-procedures.pdf' },
    { id: 5, name: t('instructions.maintenanceGuide'), pdf: '/documents/maintenance-guide.pdf' },
    { id: 6, name: t('instructions.installationManual'), pdf: '/documents/installation-manual.pdf' }
  ];

  const handleViewPDF = (pdfUrl) => {
    // Открываем PDF в новой вкладке для чтения
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadPDF = (pdfUrl, event) => {
    event.stopPropagation();
    // Эмуляция скачивания
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            {t('instructions.title')}
          </h1>
        </div>

        {/* Список документов */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="divide-y divide-gray-200">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => handleViewPDF(doc.pdf)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg 
                        className="w-6 h-6 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="text-lg font-medium text-gray-900 block">
                        {doc.name}
                      </span>
                      {/* Текст 'нажмите для просмотра' удалён по запросу */}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => handleViewPDF(doc.pdf, e)}
                      className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <svg 
                        className="w-4 h-4 mr-2" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                        />
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                        />
                      </svg>
                      {t('instructions.viewPDF')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Информационный блок */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg 
                className="h-5 w-5 text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                {t('instructions.infoTitle')}
              </h3>
              <p className="text-sm text-blue-700 mt-2">
                {t('instructions.infoDescription')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;