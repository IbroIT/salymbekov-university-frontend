import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DocumentTextIcon, DocumentArrowDownIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getMultilingualText, adaptMultilingualArray } from '../../utils/multilingualUtils';

const StudentRegulations = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('rules');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    internal_rules: [],
    academic_regulations: [],
    downloadable_files: []
  });
  const [rawData, setRawData] = useState({
    internal_rules: [],
    academic_regulations: [],
    downloadable_files: []
  });

  // Загрузка данных с API
  useEffect(() => {
    fetchRegulationsData();
  }, []);

  // Обновление данных при смене языка
  useEffect(() => {
    if (rawData.internal_rules.length > 0 || rawData.academic_regulations.length > 0 || rawData.downloadable_files.length > 0) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawData]);

  const updateDataForCurrentLanguage = () => {
    // Адаптируем internal_rules
    const adaptedInternalRules = rawData.internal_rules.map(rule => ({
      ...rule,
      title: getMultilingualText(rule, 'title', rule.title),
      content: rule.content?.map(item => ({
        ...item,
        text: getMultilingualText(item, 'text', item.text)
      })) || []
    }));

    // Адаптируем academic_regulations  
    const adaptedAcademicRegulations = rawData.academic_regulations.map(regulation => ({
      ...regulation,
      title: getMultilingualText(regulation, 'title', regulation.title),
      sections: regulation.sections?.map(section => ({
        ...section,
        subtitle: getMultilingualText(section, 'subtitle', section.subtitle),
        rules: section.rules?.map(rule => ({
          ...rule,
          text: getMultilingualText(rule, 'text', rule.text)
        })) || []
      })) || []
    }));

    // Адаптируем downloadable_files
    const adaptedDownloadableFiles = rawData.downloadable_files.map(file => ({
      ...file,
      title: getMultilingualText(file, 'title', file.title),
      description: getMultilingualText(file, 'description', file.description)
    }));

    setData({
      internal_rules: adaptedInternalRules,
      academic_regulations: adaptedAcademicRegulations,
      downloadable_files: adaptedDownloadableFiles
    });
  };

  const fetchRegulationsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/api/student-life/api/data/regulations_data/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Сохраняем оригинальные данные
      setRawData(result);
      
      // Первоначальная адаптация будет выполнена через useEffect
    } catch (err) {
      console.error('Ошибка загрузки данных НПА:', err);
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
          <p className="text-gray-600">Загрузка данных...</p>
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ошибка загрузки</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRegulationsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('studentLife.regulations.title')}</h1>
          <p className="text-lg text-gray-600">
            {t('studentLife.regulations.subtitle')}
          </p>
        </div>

        {/* Табы */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('rules')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'rules'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.regulations.tabs.rules')}
              </button>
              <button
                onClick={() => setActiveTab('academic')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'academic'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.regulations.tabs.academic')}
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.regulations.tabs.documents')}
              </button>
            </nav>
          </div>
        </div>

        {/* Контент табов */}
        {activeTab === 'rules' && (
          <div className="space-y-6">
            {data.internal_rules?.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.content?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {data.internal_rules?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Нет доступных правил</p>
              </div>
            )}

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <div className="flex items-start">
                <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Важно знать!</h3>
                  <ul className="text-yellow-700 space-y-1 text-sm">
                    <li>• Незнание правил не освобождает от ответственности</li>
                    <li>• За нарушения предусмотрены дисциплинарные меры</li>
                    <li>• В случае сомнений обращайтесь в деканат</li>
                    <li>• Правила могут быть изменены администрацией университета</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="space-y-6">
            {data.academic_regulations?.map((regulation, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{regulation.title}</h3>
                
                {regulation.sections?.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">{section.subtitle}</h4>
                    <ul className="space-y-2">
                      {section.rules?.map((rule, ruleIndex) => (
                        <li key={ruleIndex} className="flex items-start">
                          <ClockIcon className="w-4 h-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{rule.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {data.academic_regulations?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Нет доступных регламентов</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Контактная информация</h3>
              <div className="text-blue-800 space-y-2">
                <p><strong>Деканат:</strong> Главный корпус, 1 этаж, каб. 105</p>
                <p><strong>Телефон:</strong> +996 312 123-456 (доб. 105)</p>
                <p><strong>Email:</strong> <a href="mailto:dean@su.edu.kg" className="underline">dean@su.edu.kg</a></p>
                <p><strong>Часы работы:</strong> Пн-Пт, 9:00-17:00</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Информация о документах</h3>
              <div className="text-gray-700 space-y-2 text-sm">
                <p>• Все документы представлены в актуальной версии</p>
                <p>• Для открытия файлов требуется Adobe Reader или аналогичная программа</p>
                <p>• При возникновении проблем с загрузкой обращайтесь в IT-поддержку</p>
                <p>• Некоторые документы могут быть обновлены без предварительного уведомления</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.downloadable_files?.map((file, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{file.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex-shrink-0">
                        {file.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{file.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="space-x-4">
                        <span>Формат: {file.format}</span>
                        <span>Размер: {file.file_size}</span>
                      </div>
                      <span>Обновлено: {file.last_updated}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(file.download_url, file.title)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                    Скачать документ
                  </button>
                </div>
              ))}
            </div>

            {data.downloadable_files?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Нет доступных документов</p>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Полезные ссылки</h3>
              <div className="space-y-2 text-green-700">
                <p>• <a href="#" className="underline hover:no-underline">Официальный сайт Министерства образования КР</a></p>
                <p>• <a href="#" className="underline hover:no-underline">Национальное агентство аккредитации</a></p>
                <p>• <a href="#" className="underline hover:no-underline">Центр тестирования при МОиН КР</a></p>
                <p>• <a href="#" className="underline hover:no-underline">Студенческий портал</a></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRegulations;