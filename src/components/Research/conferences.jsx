import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Conferences = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('upcoming');
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'upcoming', name: t('research.conferences.tabs.upcoming'), icon: '📅' },
    { id: 'archive', name: t('research.conferences.tabs.archive'), icon: '📚' },
    { id: 'international', name: t('research.conferences.types.international'), icon: '🌍' },
    { id: 'national', name: t('research.conferences.types.national'), icon: '🏛️' }
  ];

  useEffect(() => {
    fetchConferences(activeSection);
  }, []);

  const fetchConferences = async (status = 'upcoming') => {
    try {
      setLoading(true);
      let endpoint = 'conferences';
      
      if (status === 'upcoming') {
        endpoint = 'conferences/upcoming';
      } else if (status === 'archive') {
        endpoint = 'conferences/past';
      }
      
      const response = await fetch(`https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/${endpoint}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const conferencesData = data.results || data;
      setConferences(conferencesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching conferences:', err);
      setError(t('research.conferences.errorLoading') || 'Ошибка загрузки конференций');
      setConferences([]);
    } finally {
      setLoading(false);
    }
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
    fetchConferences(sectionId);
  };

  const getConferenceTitle = (conference) => {
    const currentLang = i18n.language;
    return conference[`title_${currentLang}`] || conference.title_ru;
  };

  const getConferenceDescription = (conference) => {
    const currentLang = i18n.language;
    return conference[`description_${currentLang}`] || conference.description_ru;
  };

  const getConferenceLocation = (conference) => {
    const currentLang = i18n.language;
    return conference[`location_${currentLang}`] || conference.location_ru;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const currentLang = i18n.language;
    return date.toLocaleDateString(currentLang === 'ru' ? 'ru-RU' : currentLang === 'kg' ? 'ky-KG' : 'en-US');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'registration-open': { 
        text: t('research.conferences.statusLabels.registrationOpen') || 'Регистрация открыта', 
        color: 'bg-green-100 text-green-800' 
      },
      'early-bird': { 
        text: t('research.conferences.statusLabels.earlyBird') || 'Early Bird', 
        color: 'bg-blue-100 text-blue-800' 
      },
      'call-for-papers': { 
        text: t('research.conferences.statusLabels.callForPapers') || 'Прием тезисов', 
        color: 'bg-orange-100 text-orange-800' 
      },
      'upcoming': {
        text: t('research.conferences.statusLabels.upcoming') || 'Предстоящая',
        color: 'bg-blue-100 text-blue-800'
      },
      'ongoing': {
        text: t('research.conferences.statusLabels.ongoing') || 'Идет',
        color: 'bg-green-100 text-green-800'
      },
      'completed': {
        text: t('research.conferences.statusLabels.completed') || 'Завершена',
        color: 'bg-gray-100 text-gray-800'
      }
    };
    return statusConfig[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
  };

  const renderUpcomingContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📅</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.conferences.tabs.upcoming')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conferences.map((conference) => {
          const statusBadge = getStatusBadge(conference.status);
          
          return (
            <div 
              key={conference.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">
                  {conference.conference_type === 'international' ? '🌍' : 
                   conference.conference_type === 'national' ? '🏛️' :
                   conference.conference_type === 'workshop' ? '🛠️' :
                   conference.conference_type === 'symposium' ? '🎯' : '📚'}
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                  {statusBadge.text}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {getConferenceTitle(conference)}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Даты:</span>
                  <span>{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Место:</span>
                  <span>{getConferenceLocation(conference)}</span>
                </div>
                {conference.registration_deadline && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium mr-2">Дедлайн:</span>
                    <span className="text-red-600">{formatDate(conference.registration_deadline)}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {getConferenceDescription(conference)?.substring(0, 120)}...
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedConference(conference)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  {t('research.conferences.viewDetails') || 'Подробнее'}
                </button>
                {conference.website && (
                  <button
                    onClick={() => window.open(conference.website, '_blank')}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                  >
                    Сайт
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderArchiveContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📚</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.conferences.tabs.archive')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.map((conference) => (
          <div 
            key={conference.id}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">
                {conference.conference_type === 'international' ? '🌍' : 
                 conference.conference_type === 'national' ? '🏛️' : '📚'}
              </div>
              <span className="text-gray-500 text-sm">
                {new Date(conference.start_date).getFullYear()}
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getConferenceTitle(conference)}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Даты:</span>
                <span>{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Место:</span>
                <span>{getConferenceLocation(conference)}</span>
              </div>
              {conference.participants_count && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium mr-2">Участников:</span>
                  <span>{conference.participants_count}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedConference(conference)}
                className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                {t('research.conferences.viewDetails') || 'Подробнее'}
              </button>
              {conference.proceedings_url && (
                <button
                  onClick={() => window.open(conference.proceedings_url, '_blank')}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                >
                  Материалы
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInternationalContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🌍</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.conferences.types.international')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.filter(conf => conf.conference_type === 'international').map((conference) => (
          <div 
            key={conference.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">🌍</div>
              <span className="text-blue-600 text-sm font-medium">
                Международная
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getConferenceTitle(conference)}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Даты:</span>
                <span>{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Место:</span>
                <span>{getConferenceLocation(conference)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedConference(conference)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              {t('research.conferences.viewDetails') || 'Подробнее'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNationalContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🏛️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('research.conferences.types.national')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conferences.filter(conf => conf.conference_type === 'national').map((conference) => (
          <div 
            key={conference.id}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-4xl">🏛️</div>
              <span className="text-green-600 text-sm font-medium">
                Национальная
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {getConferenceTitle(conference)}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Даты:</span>
                <span>{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Место:</span>
                <span>{getConferenceLocation(conference)}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedConference(conference)}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              {t('research.conferences.viewDetails') || 'Подробнее'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConferenceDetail = (conference) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">
              {conference.conference_type === 'international' ? '🌍' : 
               conference.conference_type === 'national' ? '🏛️' : '📚'}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {getConferenceTitle(conference)}
          </h2>
        </div>
        <button
          onClick={() => setSelectedConference(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {getConferenceDescription(conference)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Даты проведения</h3>
          <p className="text-gray-600">{formatDate(conference.start_date)} - {formatDate(conference.end_date)}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-2">Место проведения</h3>
          <p className="text-gray-600">{getConferenceLocation(conference)}</p>
        </div>

        {conference.registration_deadline && (
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <h3 className="font-semibold text-gray-800 mb-2">Дедлайн регистрации</h3>
            <p className="text-red-600 font-medium">{formatDate(conference.registration_deadline)}</p>
          </div>
        )}
      </div>

      {conference.contact_email && (
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Контакты</h3>
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {conference.contact_email}
          </p>
        </div>
      )}

      {conference.website && (
        <div className="flex justify-end">
          <button
            onClick={() => window.open(conference.website, '_blank')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Перейти на сайт конференции
          </button>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    if (selectedConference) {
      return renderConferenceDetail(selectedConference);
    }

    switch (activeSection) {
      case 'upcoming':
        return renderUpcomingContent();
      case 'archive':
        return renderArchiveContent();
      case 'international':
        return renderInternationalContent();
      case 'national':
        return renderNationalContent();
      default:
        return renderUpcomingContent();
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
            {t('research.conferences.title') || 'Конференции и симпозиумы'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('research.conferences.subtitle') || 'Научные мероприятия и академические события'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('research.conferences.categories')}
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
              {conferences.length > 0 ? (
                renderContent()
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">{t('research.conferences.noConferences') || 'Нет доступных конференций'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conferences;