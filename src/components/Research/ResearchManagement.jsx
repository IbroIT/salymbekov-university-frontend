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
    console.log('ResearchManagement component loaded');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('Fetching management data...');
      setLoading(true);
      const [managementResponse, councilsResponse, commissionsResponse] = await Promise.all([
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/management/by_type/'),
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/councils/'),
        fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/commissions/by_type/')
      ]);

      console.log('Response statuses:', {
        management: managementResponse.status,
        councils: councilsResponse.status,
        commissions: commissionsResponse.status
      });

      if (!managementResponse.ok || !councilsResponse.ok || !commissionsResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const managementData = await managementResponse.json();
      const councilsData = await councilsResponse.json();
      const commissionsData = await commissionsResponse.json();

      console.log('Fetched data:', { managementData, councilsData, commissionsData });

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
    // Маппинг русских названий к ключам переводов
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
    <div key={person.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row gap-4">
        {person.photo && (
          <div className="flex-shrink-0">
            <img
              src={person.photo}
              alt={getFieldByLanguage(person, 'full_name')}
              className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {getFieldByLanguage(person, 'title')}
          </h3>
          <p className="text-lg font-semibold text-blue-600 mb-3">
            {getFieldByLanguage(person, 'full_name')}
          </p>
          
          {getFieldByLanguage(person, 'bio') && (
            <p className="text-gray-700 mb-3 line-clamp-3">
              {getFieldByLanguage(person, 'bio')}
            </p>
          )}

          {getFieldByLanguage(person, 'education') && (
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1">{t('research.management.qualifications')}:</h4>
              <p className="text-gray-600 text-sm">
                {getFieldByLanguage(person, 'education')}
              </p>
            </div>
          )}

          {getFieldByLanguage(person, 'scientific_interests') && (
            <div className="mb-3">
              <h4 className="font-semibold text-gray-800 mb-1">{t('research.management.responsibilities')}:</h4>
              <p className="text-gray-600 text-sm">
                {getFieldByLanguage(person, 'scientific_interests')}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {person.contact_email && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <a href={`mailto:${person.contact_email}`} className="text-blue-600 hover:underline">
                  {person.contact_email}
                </a>
              </div>
            )}
            {person.contact_phone && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span>{person.contact_phone}</span>
              </div>
            )}
            {person.office_location && (
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span>{person.office_location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Подчиненные */}
      {person.children && person.children.length > 0 && (
        <div className="mt-6 pl-4 border-l-2 border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-3">{t('research.management.responsibilities')}:</h4>
          <div className="space-y-3">
            {person.children.map(child => renderPersonCard(child))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCouncilCard = (council) => (
    <div key={council.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {getFieldByLanguage(council, 'name')}
      </h3>
      
      <div className="space-y-4">
        {getFieldByLanguage(council, 'description') && (
          <p className="text-gray-700">
            {getFieldByLanguage(council, 'description')}
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.position')}:</h4>
            <p className="text-blue-600 font-medium">
              {getFieldByLanguage(council, 'chairman')}
            </p>
          </div>

          {getFieldByLanguage(council, 'secretary') && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.contact')}:</h4>
              <p className="text-gray-700">
                {getFieldByLanguage(council, 'secretary')}
              </p>
            </div>
          )}
        </div>

        {council.members_ru && council.members_ru.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.responsibilities')}:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {getFieldByLanguage(council, 'members').map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}

        {getFieldByLanguage(council, 'responsibilities') && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.responsibilities')}:</h4>
            <p className="text-gray-700">
              {getFieldByLanguage(council, 'responsibilities')}
            </p>
          </div>
        )}

        {getFieldByLanguage(council, 'meeting_schedule') && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.description')}:</h4>
            <p className="text-gray-700">
              {getFieldByLanguage(council, 'meeting_schedule')}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {council.contact_email && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href={`mailto:${council.contact_email}`} className="text-blue-600 hover:underline">
                {council.contact_email}
              </a>
            </div>
          )}
          {council.contact_phone && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>{council.contact_phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCommissionCard = (commission) => (
    <div key={commission.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {getFieldByLanguage(commission, 'name')}
      </h3>
      
      <div className="space-y-4">
        {getFieldByLanguage(commission, 'description') && (
          <p className="text-gray-700">
            {getFieldByLanguage(commission, 'description')}
          </p>
        )}

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.position')}:</h4>
          <p className="text-blue-600 font-medium">
            {getFieldByLanguage(commission, 'chairman')}
          </p>
        </div>

        {commission.members_ru && commission.members_ru.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.responsibilities')}:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {getFieldByLanguage(commission, 'members').map((member, index) => (
                <li key={index}>{member}</li>
              ))}
            </ul>
          </div>
        )}

        {getFieldByLanguage(commission, 'functions') && (
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.management.responsibilities')}:</h4>
            <p className="text-gray-700">
              {getFieldByLanguage(commission, 'functions')}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {commission.contact_email && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <a href={`mailto:${commission.contact_email}`} className="text-blue-600 hover:underline">
                {commission.contact_email}
              </a>
            </div>
          )}
          {commission.contact_phone && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              <span>{commission.contact_phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg">{t('research.management.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('research.management.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('research.management.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b">
          <button
            onClick={() => setActiveTab('management')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'management'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('research.management.tabs.positions')}
          </button>
          <button
            onClick={() => setActiveTab('councils')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'councils'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('research.management.tabs.councils')}
          </button>
          <button
            onClick={() => setActiveTab('commissions')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'commissions'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t('research.management.tabs.commissions')}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'management' && (
          <div className="space-y-8">
            {managementData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('research.management.noData')}</p>
              </div>
            ) : (
              managementData.map(positionType => (
                <div key={positionType.type} className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {getTypeDisplayName(positionType.type_display)}
                  </h2>
                  <div className="space-y-6">
                    {positionType.positions.map(person => renderPersonCard(person))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'councils' && (
          <div className="grid gap-6">
            {councilsData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('research.management.noData')}</p>
              </div>
            ) : (
              councilsData.map(council => renderCouncilCard(council))
            )}
          </div>
        )}

        {activeTab === 'commissions' && (
          <div className="space-y-8">
            {commissionsData.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('research.management.noData')}</p>
              </div>
            ) : (
              commissionsData.map(commissionType => (
                <div key={commissionType.type} className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {getTypeDisplayName(commissionType.type_display)}
                  </h2>
                  <div className="grid gap-6">
                    {commissionType.commissions.map(commission => renderCommissionCard(commission))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResearchManagement;