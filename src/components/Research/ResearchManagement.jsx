import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ResearchManagement = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('management');
  const [managementData, setManagementData] = useState([]);
  const [councilsData, setCouncilsData] = useState([]);
  const [commissionsData, setCommissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const sections = [
    { id: 'management', name: t('research.management.tabs.management'), icon: '👑' },
    { id: 'councils', name: t('research.management.tabs.councils'), icon: '🏛️' },
    { id: 'commissions', name: t('research.management.tabs.commissions'), icon: '⚖️' }
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      const [managementResponse, councilsResponse, commissionsResponse] = await Promise.all([
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/management/by_type/'),
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/councils/'),
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/commissions/by_type/')
      ]);

      if (!managementResponse.ok || !councilsResponse.ok || !commissionsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const managementData = await managementResponse.json();
      const councilsData = await councilsResponse.json();
      const commissionsData = await commissionsResponse.json();

      setManagementData(managementData);
      setCouncilsData(councilsData.results || councilsData);
      setCommissionsData(commissionsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching management data:', err);
      setError(t('research.management.noData'));
    } finally {
      setLoading(false);
    }
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const getFieldByLanguage = (obj, field) => {
    const currentLang = i18n.language;
    return obj[`${field}_${currentLang}`] || obj[`${field}_ru`] || obj[field] || '';
  };

  const renderManagementContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">👑</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.management.tabs.management')}
        </h2>
      </div>

      {managementData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
          <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {managementData.map((positionType, index) => (
            <div key={positionType.type} className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold">
                  {positionType.type_display}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {positionType.positions.map((person) => (
                  <div key={person.id} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start mb-4">
                      {person.photo && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 border-2 border-blue-200">
                          <img
                            src={person.photo}
                            alt={getFieldByLanguage(person, 'full_name')}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {getFieldByLanguage(person, 'title')}
                        </h4>
                        <p className="text-blue-600 font-medium">
                          {getFieldByLanguage(person, 'full_name')}
                        </p>
                      </div>
                    </div>

                    {getFieldByLanguage(person, 'bio') && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {getFieldByLanguage(person, 'bio')}
                      </p>
                    )}

                    <div className="space-y-2 text-sm text-gray-600">
                      {getFieldByLanguage(person, 'education') && (
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Образование:</span>
                          <span>{getFieldByLanguage(person, 'education')}</span>
                        </div>
                      )}
                      {getFieldByLanguage(person, 'scientific_interests') && (
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Обязанности:</span>
                          <span>{getFieldByLanguage(person, 'scientific_interests')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {person.contact_email && (
                        <a 
                          href={`mailto:${person.contact_email}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          📧 {person.contact_email}
                        </a>
                      )}
                      {person.contact_phone && (
                        <a 
                          href={`tel:${person.contact_phone}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          📞 {person.contact_phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCouncilsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🏛️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.management.tabs.councils')}
        </h2>
      </div>

      {councilsData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
          <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {councilsData.map((council) => (
            <div key={council.id} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {getFieldByLanguage(council, 'name')}
              </h3>

              {getFieldByLanguage(council, 'description') && (
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {getFieldByLanguage(council, 'description')}
                </p>
              )}

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Председатель:</span>
                  <span>{getFieldByLanguage(council, 'chairman')}</span>
                </div>
                {getFieldByLanguage(council, 'secretary') && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Секретарь:</span>
                    <span>{getFieldByLanguage(council, 'secretary')}</span>
                  </div>
                )}
              </div>

              {getFieldByLanguage(council, 'members') && getFieldByLanguage(council, 'members').length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Члены совета:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {getFieldByLanguage(council, 'members').map((member, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {council.contact_email && (
                  <a 
                    href={`mailto:${council.contact_email}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    📧 {council.contact_email}
                  </a>
                )}
                {council.contact_phone && (
                  <a 
                    href={`tel:${council.contact_phone}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    📞 {council.contact_phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCommissionsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">⚖️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.management.tabs.commissions')}
        </h2>
      </div>

      {commissionsData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
          <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {commissionsData.map((commissionType, index) => (
            <div key={commissionType.type} className="space-y-6">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold">
                  {commissionType.type_display}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commissionType.commissions.map((commission) => (
                  <div key={commission.id} className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">
                      {getFieldByLanguage(commission, 'name')}
                    </h4>

                    {getFieldByLanguage(commission, 'description') && (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {getFieldByLanguage(commission, 'description')}
                      </p>
                    )}

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium mr-2">Председатель:</span>
                        <span>{getFieldByLanguage(commission, 'chairman')}</span>
                      </div>
                      {getFieldByLanguage(commission, 'functions') && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Функции: </span>
                          {getFieldByLanguage(commission, 'functions')}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {commission.contact_email && (
                        <a 
                          href={`mailto:${commission.contact_email}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          📧 {commission.contact_email}
                        </a>
                      )}
                      {commission.contact_phone && (
                        <a 
                          href={`tel:${commission.contact_phone}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          📞 {commission.contact_phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'management':
        return renderManagementContent();
      case 'councils':
        return renderCouncilsContent();
      case 'commissions':
        return renderCommissionsContent();
      default:
        return renderManagementContent();
    }
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('research.management.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('research.management.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('research.management.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        <span className="text-lg mr-3">{section.icon}</span>
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchManagement;