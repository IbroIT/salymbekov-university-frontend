import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PermitDocuments = () => {
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  // Моковые данные для примера
  const mockDocuments = [
    {
      id: 1,
      title: 'Лицензия на образовательную деятельность',
      category: 'licenses',
      number: 'ЛЦ-001-2024',
      date: '2024-01-15',
      validUntil: '2029-01-15',
      issuedBy: 'Министерство образования и науки Кыргызской Республики',
      fileUrl: '#',
      description: 'Лицензия на право ведения образовательной деятельности по программам высшего медицинского образования'
    },
    {
      id: 2,
      title: 'Государственная аккредитация',
      category: 'accreditations',
      number: 'АК-045-2023',
      date: '2023-06-20',
      validUntil: '2028-06-20',
      issuedBy: 'Национальное агентство аккредитации КР',
      fileUrl: '#',
      description: 'Свидетельство о государственной аккредитации образовательных программ'
    },
    {
      id: 3,
      title: 'Сертификат ISO 9001:2015',
      category: 'certificates',
      number: 'ISO-9001-2024',
      date: '2024-03-10',
      validUntil: '2027-03-10',
      issuedBy: 'Международная организация по сертификации',
      fileUrl: '#',
      description: 'Сертификат соответствия системы менеджмента качества международному стандарту'
    },
    {
      id: 4,
      title: 'Соглашение с Министерством здравоохранения',
      category: 'agreements',
      number: 'СГ-234-2024',
      date: '2024-02-01',
      validUntil: '2029-02-01',
      issuedBy: 'Министерство здравоохранения Кыргызской Республики',
      fileUrl: '#',
      description: 'Соглашение о сотрудничестве в области подготовки медицинских кадров'
    },
    {
      id: 5,
      title: 'Лицензия на медицинскую деятельность',
      category: 'licenses',
      number: 'МД-078-2023',
      date: '2023-09-15',
      validUntil: '2028-09-15',
      issuedBy: 'Министерство здравоохранения Кыргызской Республики',
      fileUrl: '#',
      description: 'Лицензия на осуществление медицинской деятельности в учебных целях'
    },
    {
      id: 6,
      title: 'Международная аккредитация WFME',
      category: 'accreditations',
      number: 'WFME-2024-KG',
      date: '2024-05-01',
      validUntil: '2029-05-01',
      issuedBy: 'World Federation for Medical Education',
      fileUrl: '#',
      description: 'Международная аккредитация образовательных программ по стандартам WFME'
    }
  ];

  const categories = [
    { key: 'all', label: 'Все документы' },
    { key: 'licenses', label: t('permitDocuments.categories.licenses') },
    { key: 'accreditations', label: t('permitDocuments.categories.accreditations') },
    { key: 'certificates', label: t('permitDocuments.categories.certificates') },
    { key: 'agreements', label: t('permitDocuments.categories.agreements') }
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        // Здесь будет запрос к API
        // const response = await axios.get('/api/permit-documents/');
        // setDocuments(response.data);
        
        // Временно используем моковые данные
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
      } catch (error) {
        console.error('Error fetching permit documents:', error);
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredDocuments(documents);
    } else {
      setFilteredDocuments(documents.filter(doc => doc.category === activeCategory));
    }
  }, [activeCategory, documents]);

  const getCategoryIcon = (category) => {
    const icons = {
      licenses: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      accreditations: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      certificates: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      agreements: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    };
    return icons[category] || icons.licenses;
  };

  const getCategoryColor = (category) => {
    const colors = {
      licenses: 'from-blue-500 to-blue-600',
      accreditations: 'from-green-500 to-green-600',
      certificates: 'from-purple-500 to-purple-600',
      agreements: 'from-orange-500 to-orange-600'
    };
    return colors[category] || colors.licenses;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('permitDocuments.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
            {t('permitDocuments.subtitle')}
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            {t('permitDocuments.description')}
          </p>
        </div>

        {/* Фильтры по категориям */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.key
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Сетка документов */}
        {filteredDocuments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {t('permitDocuments.noDocuments')}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(doc => (
              <div
                key={doc.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Цветной заголовок */}
                <div className={`bg-gradient-to-r ${getCategoryColor(doc.category)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    {getCategoryIcon(doc.category)}
                    <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                      {categories.find(c => c.key === doc.category)?.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">{doc.title}</h3>
                </div>

                {/* Содержимое карточки */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {doc.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t('permitDocuments.document.number')}:</span>
                      <span className="font-semibold text-gray-800">{doc.number}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t('permitDocuments.document.date')}:</span>
                      <span className="font-semibold text-gray-800">{formatDate(doc.date)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t('permitDocuments.document.validUntil')}:</span>
                      <span className="font-semibold text-green-600">{formatDate(doc.validUntil)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">{t('permitDocuments.document.issuedBy')}:</p>
                    <p className="text-sm text-gray-700 font-medium">{doc.issuedBy}</p>
                  </div>

                  {/* Кнопки действий */}
                  <div className="flex gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center font-semibold text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {t('permitDocuments.document.view')}
                    </a>
                    <a
                      href={doc.fileUrl}
                      download
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 text-center font-semibold text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t('permitDocuments.document.download')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitDocuments;
