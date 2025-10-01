import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { researchAPI } from '../../services/researchService';

const Grants = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGrant, setSelectedGrant] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'all', name: t('research.grants.tabs.all'), icon: '🌟' },
    { id: 'active', name: t('research.grants.tabs.active'), icon: '🎯' },
    { id: 'upcoming', name: t('research.grants.tabs.upcoming'), icon: '📅' },
    { id: 'closed', name: t('research.grants.tabs.closed'), icon: '✅' }
  ];

  useEffect(() => {
    fetchGrants();
  }, []);

  const fetchGrants = async (endpoint = 'grants') => {
    try {
      console.log('🔍 Grants: Starting to fetch grants with endpoint:', endpoint);
      setLoading(true);
      let data;

      if (endpoint === 'grants/active') {
        console.log('📊 Grants: Fetching active grants...');
        data = await researchAPI.getActiveGrants();
      } else if (endpoint === 'grants/upcoming') {
        console.log('📊 Grants: Fetching upcoming grants...');
        data = await researchAPI.getUpcomingGrants();
      } else {
        console.log('📊 Grants: Fetching all grants...');
        data = await researchAPI.getGrants();
      }

      console.log('✅ Grants: Received data:', data);
      console.log('📊 Grants: Data type:', typeof data, 'Array?', Array.isArray(data));

      if (data && data.results) {
        console.log('📊 Grants: Using data.results:', data.results.length, 'items');
        setGrants(data.results);
      } else if (Array.isArray(data)) {
        console.log('📊 Grants: Using data directly:', data.length, 'items');
        setGrants(data);
      } else {
        console.log('📊 Grants: Data format unexpected, setting empty array');
        setGrants([]);
      }

      setError(null);
    } catch (err) {
      console.error('❌ Grants: Error fetching grants:', err);
      setError(t('research.grants.errorLoading') || 'Ошибка загрузки');
      setGrants([]);
    } finally {
      setLoading(false);
    }
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);

    // Загружаем данные в зависимости от секции
    if (sectionId === 'active') {
      fetchGrants('grants/active');
    } else if (sectionId === 'upcoming') {
      fetchGrants('grants/upcoming');
    } else {
      fetchGrants('grants');
    }
  };

  const getGrantTitle = (grant) => {
    const currentLang = i18n.language;
    return grant[`title_${currentLang}`] || grant.title_ru;
  };

  const getGrantDescription = (grant) => {
    const currentLang = i18n.language;
    return grant[`description_${currentLang}`] || grant.description_ru;
  };

  const getGrantOrganization = (grant) => {
    const currentLang = i18n.language;
    return grant[`organization_${currentLang}`] || grant.organization_ru;
  };

  // Helper function for consistent multilingual field access
  const getFieldByLanguage = (obj, field) => {
    if (!obj) return '';

    const currentLang = i18n.language;

    // Handle different language codes
    let langSuffix = '';
    if (currentLang === 'en') {
      langSuffix = '_en';
    } else if (currentLang === 'ky' || currentLang === 'kg') {
      langSuffix = '_kg';
    } else {
      langSuffix = '_ru';
    }

    // Try to get localized field
    const localizedField = obj[`${field}${langSuffix}`];
    if (localizedField) return localizedField;

    // Fallback to Russian field
    const russianField = obj[`${field}_ru`];
    if (russianField) return russianField;

    // Fallback to base field
    return obj[field] || '';
  };

  const filteredGrants = grants.filter(grant => {
    if (activeSection === 'all') return true;
    if (activeSection === 'active') return grant.status === 'active';
    if (activeSection === 'upcoming') return grant.status === 'upcoming';
    if (activeSection === 'closed') return grant.status === 'closed';
    return true;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { text: t('research.grants.statusLabels.active') || 'Активный', color: 'bg-green-100 text-green-800' },
      'upcoming': { text: t('research.grants.statusLabels.upcoming') || 'Предстоящий', color: 'bg-blue-100 text-blue-800' },
      'closed': { text: t('research.grants.statusLabels.closed') || 'Закрытый', color: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentLang = i18n.language;
    return date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : currentLang === 'kg' ? 'ky-KG' : 'en-US');
  };

  const renderAllGrantsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🌟</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.grants.tabs.all')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGrants.map((grant) => {
          const statusBadge = getStatusBadge(grant.status);

          return (
            <div
              key={grant.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                  {statusBadge.text}
                </span>
                <span className="text-blue-600 font-medium">
                  {grant.amount}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {getFieldByLanguage(grant, 'title')}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {getFieldByLanguage(grant, 'organization')}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Дедлайн:</span>
                  <span>{formatDate(grant.deadline)}</span>
                </div>
                {grant.duration && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Длительность:</span>
                    <span>{grant.duration}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedGrant(grant)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  {t('research.grants.viewDetails') || 'Подробнее'}
                </button>
                {grant.status === 'active' && (
                  <button
                    onClick={() => {
                      if (grant.application_url) {
                        window.open(grant.application_url, '_blank');
                      }
                    }}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    {t('research.grants.apply') || 'Подать заявку'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderActiveGrantsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.grants.tabs.active')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGrants.map((grant) => (
          <div
            key={grant.id}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {t('research.grants.statusLabels.active') || 'Активный'}
              </span>
              <span className="text-green-600 font-bold text-lg">
                {grant.amount}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getFieldByLanguage(grant, 'title')}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {getFieldByLanguage(grant, 'description')?.substring(0, 150)}...
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Организация:</span>
                <span>{getFieldByLanguage(grant, 'organization')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Дедлайн:</span>
                <span className="text-red-600 font-medium">{formatDate(grant.deadline)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedGrant(grant)}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                {t('research.grants.viewDetails') || 'Подробнее'}
              </button>
              <button
                onClick={() => {
                  if (grant.application_url) {
                    window.open(grant.application_url, '_blank');
                  }
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                {t('research.grants.apply') || 'Подать заявку'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUpcomingGrantsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📅</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.grants.tabs.upcoming')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGrants.map((grant) => (
          <div
            key={grant.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {t('research.grants.statusLabels.upcoming') || 'Предстоящий'}
              </span>
              <span className="text-blue-600 font-bold text-lg">
                {grant.amount}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getFieldByLanguage(grant, 'title')}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {getFieldByLanguage(grant, 'organization')}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Ожидаемая дата открытия:</span>
                <span>{formatDate(grant.deadline)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedGrant(grant)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              {t('research.grants.viewDetails') || 'Подробнее'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClosedGrantsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.grants.tabs.closed')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGrants.map((grant) => (
          <div
            key={grant.id}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {t('research.grants.statusLabels.closed') || 'Закрытый'}
              </span>
              <span className="text-gray-600 font-bold text-lg">
                {grant.amount}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getFieldByLanguage(grant, 'title')}
            </h3>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {getFieldByLanguage(grant, 'organization')}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Дата закрытия:</span>
                <span>{formatDate(grant.deadline)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedGrant(grant)}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              {t('research.grants.viewDetails') || 'Подробнее'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGrantDetail = (grant) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">📋</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {getFieldByLanguage(grant, 'title')}
          </h2>
        </div>
        <button
          onClick={() => setSelectedGrant(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {getFieldByLanguage(grant, 'description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Организация</h3>
          <p className="text-gray-600">{getFieldByLanguage(grant, 'organization')}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Сумма</h3>
          <p className="text-gray-600">{grant.amount}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Дедлайн</h3>
          <p className="text-gray-600">{formatDate(grant.deadline)}</p>
        </div>
      </div>

      {grant.contact && (
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Контакты</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {grant.contact}
            </p>
            {grant.website && (
              <p className="text-gray-600">
                <span className="font-medium">Сайт:</span> {grant.website}
              </p>
            )}
          </div>
        </div>
      )}

      {grant.status === 'active' && (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (grant.application_url) {
                window.open(grant.application_url, '_blank');
              }
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            {t('research.grants.apply') || 'Подать заявку'}
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (selectedGrant) {
      return renderGrantDetail(selectedGrant);
    }

    switch (activeSection) {
      case 'all':
        return renderAllGrantsContent();
      case 'active':
        return renderActiveGrantsContent();
      case 'upcoming':
        return renderUpcomingGrantsContent();
      case 'closed':
        return renderClosedGrantsContent();
      default:
        return renderAllGrantsContent();
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('research.grants.title') || 'Исследовательские гранты'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('research.grants.subtitle') || 'Возможности финансирования научных исследований'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('research.grants.categories')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => {
                    let sectionCount = 0;

                    if (section.id === 'all') {
                      sectionCount = grants.length;
                    } else if (section.id === 'active') {
                      sectionCount = grants.filter(grant => grant.status === 'active').length;
                    } else if (section.id === 'upcoming') {
                      sectionCount = grants.filter(grant => grant.status === 'upcoming').length;
                    } else if (section.id === 'closed') {
                      sectionCount = grants.filter(grant => grant.status === 'closed').length;
                    }

                    return (
                      <li key={section.id}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${activeSection === section.id
                              ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                              : "text-gray-700 hover:bg-gray-100"
                            }`}
                          onClick={() => changeActiveSection(section.id)}
                        >
                          <div className="flex items-center">
                            <span className="text-lg mr-3">{section.icon}</span>
                            {section.name}
                          </div>
                          <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                            {sectionCount}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {filteredGrants.length > 0 ? (
                renderContent()
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('research.grants.noGrants') || 'Нет доступных грантов'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grants;