import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon, DocumentArrowDownIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { getMultilingualText, adaptMultilingualArray } from '../../utils/multilingualUtils';

const Internships = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('partners');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    partner_organizations: [],
    requirements: {},
    report_templates: []
  });
  const [rawData, setRawData] = useState({
    partner_organizations: [],
    requirements: {},
    report_templates: []
  });

  // Загрузка данных с API
  useEffect(() => {
    fetchInternshipsData();
  }, []);

  // Обновление данных при смене языка
  useEffect(() => {
    if (rawData.partner_organizations.length > 0) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawData]);

  const updateDataForCurrentLanguage = () => {
    // Адаптируем partner_organizations
    const adaptedPartnerOrganizations = rawData.partner_organizations.map(org => ({
      ...org,
      name: getMultilingualText(org, 'name', org.name),
      description: getMultilingualText(org, 'description', org.description)
    }));

    setData({
      ...rawData,
      partner_organizations: adaptedPartnerOrganizations
    });
  };

  const fetchInternshipsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/api/student-life/api/data/internships_data/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Сохраняем оригинальные данные
      setRawData(result);
      
    } catch (err) {
      console.error('Ошибка загрузки данных практики:', err);
      setError('Не удалось загрузить данные. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (url, filename) => {
    if (url && url.startsWith('http')) {
      // Если это полный URL из API
      window.open(url, '_blank');
    } else {
      // Fallback для демо
      console.log(`Downloading: ${filename} from ${url}`);
      alert(`Загрузка файла: ${filename}`);
    }
  };

  // Показать загрузку
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('studentLife.internships.loading')}</p>
        </div>
      </div>
    );
  }

  // Показать ошибку
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('studentLife.internships.error')}</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchInternshipsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('studentLife.internships.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('studentLife.internships.title')}</h1>
          <p className="text-lg text-gray-600">
            {t('studentLife.internships.subtitle')}
          </p>
        </div>

        {/* Табы */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('partners')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'partners'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.internships.tabs.partners')}
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requirements'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.internships.tabs.requirements')}
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.internships.tabs.documents')}
              </button>
            </nav>
          </div>
        </div>

        {/* Контент табов */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.partner_organizations?.map((org) => (
                <div key={org.id} className="bg-white rounded-lg shadow-md p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{org.name}</h3>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPinIcon className="w-4 h-4 mr-2" />
                      <span>{org.location} • {org.type}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('common.specializations')}:</h4>
                    <div className="flex flex-wrap gap-2">
                      {org.specializations?.map((spec, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {spec.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">{t('studentLife.internships.contact')}:</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>{t('common.contactPerson')}:</strong> {org.contact_person}</p>
                      <p><strong>{t('studentLife.internships.phone')}:</strong> {org.phone}</p>
                      <p><strong>{t('studentLife.internships.email')}:</strong> {org.email}</p>
                      {org.website && (
                        <p><strong>{t('common.website')}:</strong> <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{org.website}</a></p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {data.partner_organizations?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('studentLife.internships.noPartners')}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            {Object.entries(data.requirements || {}).map(([category, requirements]) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
                  {requirements[0]?.title || category}
                </h3>
                <ul className="space-y-2">
                  {requirements[0]?.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t('studentLife.internships.importantInfo')}</h3>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• {t('studentLife.internships.docDeadline')}</li>
                <li>• {t('studentLife.internships.medExamValidity')}</li>
                <li>• {t('studentLife.internships.rulesCompliance')}</li>
                <li>• {t('studentLife.internships.reportDeadline')}</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{t('studentLife.internships.reportRequirements')}</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• {t('studentLife.internships.reportFormat')}</li>
                <li>• {t('studentLife.internships.reportLength')}</li>
                <li>• {t('studentLife.internships.reportFont')}</li>
                <li>• {t('studentLife.internships.reportSignatures')}</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.report_templates?.map((template, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span>Формат: {template.format}</span>
                        <span>Размер: {template.file_size}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(template.file, template.title)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                    {t('studentLife.internships.downloadDocument')}
                  </button>
                </div>
              ))}
            </div>

            {data.report_templates?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('studentLife.internships.noDocuments')}</p>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('common.additionalInfo')}</h3>
              <div className="text-gray-700 space-y-2 text-sm">
                <p>• {t('studentLife.internships.templatesInfo')}</p>
                <p>• {t('studentLife.internships.contactCoordinator')}</p>
                <p>• {t('studentLife.internships.submissionFormat')}</p>
                <p>• {t('studentLife.internships.practiceCoordinator')}: <a href="mailto:practice@su.edu.kg" className="text-blue-600 hover:underline">practice@su.edu.kg</a></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;