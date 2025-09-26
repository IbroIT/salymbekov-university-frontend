import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ResearchManagement = () => {
  const { t, i18n } = useTranslation();
  const [managementData, setManagementData] = useState([]);
  const [councilsData, setCouncilsData] = useState([]);
  const [commissionsData, setCommissionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('management');

  useEffect(() => {
    fetchData();
  }, []);

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

  const getFieldByLanguage = (obj, field) => {
    const currentLang = i18n.language;
    return obj[`${field}_${currentLang}`] || obj[`${field}_ru`] || obj[field] || '';
  };

  const getTypeDisplayName = (typeDisplay) => {
    const typeMapping = {
      'Руководство': 'leadership',
      'Институт': 'institute', 
      'Центр': 'center',
      'Кафедра': 'department',
      'Этическая комиссия': 'ethics',
      'Квалификационная комиссия': 'qualification',
      'Издательская комиссия': 'publication',
      'Грантовая комиссия': 'grant',
      'Диссертационная комиссия': 'dissertation'
    };
    
    const typeKey = typeMapping[typeDisplay];
    return typeKey ? t(`research.management.types.${typeKey}`) : typeDisplay;
  };

  const renderPersonCard = (person) => (
    <div key={person.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-50">
      <div className="flex flex-col md:flex-row gap-6">
        {person.photo && (
          <div className="flex-shrink-0 relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-blue-100 shadow-md">
              <img
                src={person.photo}
                alt={getFieldByLanguage(person, 'full_name')}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {getFieldByLanguage(person, 'title')}
            </h3>
            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {t('research.management.position')}
            </div>
          </div>
          
          <p className="text-lg font-semibold text-blue-600 mb-4 border-l-4 border-blue-500 pl-3">
            {getFieldByLanguage(person, 'full_name')}
          </p>
          
          {getFieldByLanguage(person, 'bio') && (
            <p className="text-gray-700 mb-4 leading-relaxed bg-blue-50 rounded-lg p-3">
              {getFieldByLanguage(person, 'bio')}
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {getFieldByLanguage(person, 'education') && (
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                  </svg>
                  {t('research.management.qualifications')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {getFieldByLanguage(person, 'education')}
                </p>
              </div>
            )}

            {getFieldByLanguage(person, 'scientific_interests') && (
              <div className="bg-white rounded-lg p-3 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd"/>
                  </svg>
                  {t('research.management.responsibilities')}
                </h4>
                <p className="text-gray-600 text-sm">
                  {getFieldByLanguage(person, 'scientific_interests')}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {person.contact_email && (
              <a 
                href={`mailto:${person.contact_email}`} 
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                Email
              </a>
            )}
            {person.contact_phone && (
              <a 
                href={`tel:${person.contact_phone}`}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                {person.contact_phone}
              </a>
            )}
            {person.office_location && (
              <div className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                {person.office_location}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {person.children && person.children.length > 0 && (
        <div className="mt-6 pl-6 border-l-4 border-blue-200 bg-blue-50 rounded-r-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
            </svg>
            {t('research.management.responsibilities')}
          </h4>
          <div className="grid gap-4">
            {person.children.map(child => renderPersonCard(child))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCouncilCard = (council) => (
    <div key={council.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-50">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex-1">
          {getFieldByLanguage(council, 'name')}
        </h3>
        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {t('research.management.tabs.councils')}
        </div>
      </div>
      
      <div className="space-y-4">
        {getFieldByLanguage(council, 'description') && (
          <p className="text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-4">
            {getFieldByLanguage(council, 'description')}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
              {t('research.management.position')}
            </h4>
            <p className="text-blue-600 font-medium text-lg">
              {getFieldByLanguage(council, 'chairman')}
            </p>
          </div>

          {getFieldByLanguage(council, 'secretary') && (
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                </svg>
                {t('research.management.contact')}
              </h4>
              <p className="text-gray-700">
                {getFieldByLanguage(council, 'secretary')}
              </p>
            </div>
          )}
        </div>

        {council.members_ru && council.members_ru.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              {t('research.management.responsibilities')}
            </h4>
            <ul className="grid md:grid-cols-2 gap-2">
              {getFieldByLanguage(council, 'members').map((member, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  {member}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {council.contact_email && (
            <a 
              href={`mailto:${council.contact_email}`}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              </svg>
              {council.contact_email}
            </a>
          )}
          {council.contact_phone && (
            <a 
              href={`tel:${council.contact_phone}`}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {council.contact_phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommissionCard = (commission) => (
    <div key={commission.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-50">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex-1">
          {getFieldByLanguage(commission, 'name')}
        </h3>
        <div className="bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-medium">
          {t('research.management.tabs.commissions')}
        </div>
      </div>
      
      <div className="space-y-4">
        {getFieldByLanguage(commission, 'description') && (
          <p className="text-gray-700 leading-relaxed bg-blue-50 rounded-lg p-4">
            {getFieldByLanguage(commission, 'description')}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
              </svg>
              {t('research.management.position')}
            </h4>
            <p className="text-blue-600 font-medium text-lg">
              {getFieldByLanguage(commission, 'chairman')}
            </p>
          </div>

          {commission.members_ru && commission.members_ru.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {t('research.management.responsibilities')}
              </h4>
              <div className="text-sm text-gray-600">
                {commission.members_ru.length} {t('research.management.members')}
              </div>
            </div>
          )}
        </div>

        {getFieldByLanguage(commission, 'functions') && (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              {t('research.management.functions')}
            </h4>
            <p className="text-gray-700">
              {getFieldByLanguage(commission, 'functions')}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {commission.contact_email && (
            <a 
              href={`mailto:${commission.contact_email}`}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              </svg>
              {commission.contact_email}
            </a>
          )}
          {commission.contact_phone && (
            <a 
              href={`tel:${commission.contact_phone}`}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              {commission.contact_phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <span className="ml-4 text-lg text-blue-600 font-medium">{t('research.management.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 relative z-10">
              {t('research.management.title')}
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-blue-200 opacity-50 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('research.management.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-2 inline-flex">
            {['management', 'councils', 'commissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 font-medium text-sm rounded-xl transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {t(`research.management.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'management' && (
            <div className="space-y-8">
              {managementData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
                  </div>
                </div>
              ) : (
                managementData.map((positionType, index) => (
                  <div key={positionType.type} className="relative">
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
                      <h2 className="text-3xl font-bold">
                        {getTypeDisplayName(positionType.type_display)}
                      </h2>
                      <div className="w-20 h-1 bg-white mt-2 rounded-full"></div>
                    </div>
                    <div className="space-y-6 ml-4">
                      {positionType.positions.map(person => renderPersonCard(person))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'councils' && (
            <div className="grid gap-8">
              {councilsData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
                  </div>
                </div>
              ) : (
                councilsData.map(council => renderCouncilCard(council))
              )}
            </div>
          )}

          {activeTab === 'commissions' && (
            <div className="space-y-8">
              {commissionsData.length === 0 ? (
                <div className="text-center py-12">
                  <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                    <svg className="w-16 h-16 text-blue-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-gray-500 text-lg">{t('research.management.noData')}</p>
                  </div>
                </div>
              ) : (
                commissionsData.map((commissionType, index) => (
                  <div key={commissionType.type} className="relative">
                    <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-8 mb-8 text-white shadow-lg">
                      <h2 className="text-3xl font-bold">
                        {getTypeDisplayName(commissionType.type_display)}
                      </h2>
                      <div className="w-20 h-1 bg-white mt-2 rounded-full"></div>
                    </div>
                    <div className="grid gap-6 ml-4">
                      {commissionType.commissions.map(commission => renderCommissionCard(commission))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchManagement;