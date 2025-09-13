import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Conferences = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language; // 'ru', 'en', или 'kg'
  
  // State для данных из API
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedConference, setSelectedConference] = useState(null);

  // Функция для получения конференций из API
  const fetchConferences = async (status = 'upcoming') => {
    try {
      setLoading(true);
      let endpoint = 'conferences';
      
      if (status === 'upcoming') {
        endpoint = 'conferences/upcoming';
      } else if (status === 'archive') {
        endpoint = 'conferences/past';
      }
      
      const response = await fetch(`https://su-back.onrender.com/research/api/${endpoint}/`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // API может возвращать paginated результаты
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

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchConferences(activeTab);
  }, []);

  // Функция для получения названия конференции на текущем языке
  const getConferenceTitle = (conference) => {
    return conference[`title_${currentLang}`] || conference.title_ru;
  };

  // Функция для получения описания конференции на текущем языке
  const getConferenceDescription = (conference) => {
    return conference[`description_${currentLang}`] || conference.description_ru;
  };

  // Функция для получения местоположения на текущем языке
  const getConferenceLocation = (conference) => {
    return conference[`location_${currentLang}`] || conference.location_ru;
  };

  // Обработчик смены вкладки с загрузкой соответствующих данных
  const handleTabChange = async (tab) => {
    setActiveTab(tab);
    await fetchConferences(tab);
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  // Показать индикатор загрузки
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">{t('research.conferences.loading') || 'Загрузка...'}</span>
      </div>
    );
  }

  // Показать ошибку
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-lg mb-4">{error}</div>
        <button 
          onClick={() => fetchConferences(activeTab)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {t('research.conferences.retry') || 'Попробовать снова'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('research.conferences.title') || 'Конференции и симпозиумы'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('research.conferences.subtitle') || 'Научные мероприятия и академические события'}
          </p>
        </div>

        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-1 inline-flex">
            <button
              className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 {t('research.conferences.tabs.upcoming') || 'Предстоящие'}
            </button>
          </div>
        </div>

        {/* Сетка конференций */}
        {conferences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('research.conferences.noConferences') || 'Нет доступных конференций'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {conferences.map((conference) => {
              const statusBadge = getStatusBadge(conference.status);
              
              return (
                <div
                  key={conference.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
                  onClick={() => setSelectedConference(conference)}
                >
                  {/* Верхняя часть с изображением и статусом */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                    <div className="text-6xl mb-4 text-center">
                      {conference.conference_type === 'international' ? '🌍' : 
                       conference.conference_type === 'national' ? '🏛️' :
                       conference.conference_type === 'workshop' ? '🛠️' :
                       conference.conference_type === 'symposium' ? '🎯' : '📚'}
                    </div>
                    {conference.status && (
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${statusBadge.color}`}>
                        {statusBadge.text}
                      </div>
                    )}
                  </div>

                  {/* Контент карточки */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {getConferenceTitle(conference)}
                    </h3>

                    {/* Даты */}
                    <div className="flex items-center mb-3">
                      <span className="text-gray-500 mr-3">📅</span>
                      <span className="text-sm text-gray-600">
                        {formatDate(conference.start_date)} - {formatDate(conference.end_date)}
                      </span>
                    </div>

                    {/* Место проведения */}
                    <div className="flex items-center mb-3">
                      <span className="text-gray-500 mr-3">📍</span>
                      <span className="text-sm text-gray-600">{getConferenceLocation(conference)}</span>
                    </div>

                    {/* Дедлайн */}
                    {conference.registration_deadline && (
                      <div className="flex items-center mb-4">
                        <span className="text-gray-500 mr-3">⏰</span>
                        <div>
                          <span className="text-sm text-gray-600">{t('research.conferences.deadline') || 'Дедлайн'}: </span>
                          <span className="text-sm font-semibold text-red-600">
                            {formatDate(conference.registration_deadline)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Описание */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {getConferenceDescription(conference)}
                    </p>

                    {/* Для архивных конференций */}
                    {activeTab === 'archive' && conference.participants_count && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{t('research.conferences.participants') || 'Участников'}: <strong>{conference.participants_count}</strong></span>
                          <span>{t('research.conferences.year') || 'Год'}: <strong>{new Date(conference.start_date).getFullYear()}</strong></span>
                        </div>
                      </div>
                    )}

                    {/* Кнопка */}
                    <div className="flex justify-between items-center">
                      {conference.website ? (
                        <a
                          href={conference.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                        >
                          🌐 {t('research.conferences.visitWebsite') || 'Посетить сайт'}
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">{t('research.conferences.noWebsite') || 'Сайт недоступен'}</span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600 group-hover:text-blue-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Модальное окно с деталями */}
        {selectedConference && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Заголовок */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{getConferenceTitle(selectedConference)}</h2>
                    <div className="text-6xl mb-4">
                      {selectedConference.conference_type === 'international' ? '🌍' : 
                       selectedConference.conference_type === 'national' ? '🏛️' :
                       selectedConference.conference_type === 'workshop' ? '🛠️' :
                       selectedConference.conference_type === 'symposium' ? '🎯' : '📚'}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConference(null)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* Контент */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Основная информация */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {t('research.conferences.basicInfo') || 'Основная информация'}
                    </h3>
                    
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3 text-xl">📅</span>
                      <div>
                        <p className="text-sm text-gray-600">{t('research.conferences.dates') || 'Даты проведения'}</p>
                        <p className="font-semibold">
                          {formatDate(selectedConference.start_date)} - {formatDate(selectedConference.end_date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3 text-xl">📍</span>
                      <div>
                        <p className="text-sm text-gray-600">{t('research.conferences.location') || 'Место проведения'}</p>
                        <p className="font-semibold">{getConferenceLocation(selectedConference)}</p>
                      </div>
                    </div>

                    {selectedConference.registration_deadline && (
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-3 text-xl">⏰</span>
                        <div>
                          <p className="text-sm text-gray-600">{t('research.conferences.registrationDeadline') || 'Дедлайн регистрации'}</p>
                          <p className="font-semibold text-red-600">
                            {formatDate(selectedConference.registration_deadline)}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedConference.registration_fee && (
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-3 text-xl">💰</span>
                        <div>
                          <p className="text-sm text-gray-600">{t('research.conferences.registrationFee') || 'Регистрационный взнос'}</p>
                          <p className="font-semibold">{selectedConference.registration_fee}</p>
                        </div>
                      </div>
                    )}

                    {selectedConference.contact_email && (
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-3 text-xl">📧</span>
                        <div>
                          <p className="text-sm text-gray-600">{t('research.conferences.contact') || 'Контакт'}</p>
                          <a href={`mailto:${selectedConference.contact_email}`} className="font-semibold text-blue-600 hover:text-blue-800">
                            {selectedConference.contact_email}
                          </a>
                        </div>
                      </div>
                    )}

                    {activeTab === 'archive' && selectedConference.participants_count && (
                      <>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-3 text-xl">👥</span>
                          <div>
                            <p className="text-sm text-gray-600">{t('research.conferences.participants') || 'Участников'}</p>
                            <p className="font-semibold">{selectedConference.participants_count}</p>
                          </div>
                        </div>
                        {selectedConference.proceedings_url && (
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-3 text-xl">📁</span>
                            <div>
                              <p className="text-sm text-gray-600">{t('research.conferences.proceedings') || 'Материалы конференции'}</p>
                              <a href={selectedConference.proceedings_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                                {t('research.conferences.downloadProceedings') || 'Скачать proceedings'}
                              </a>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Дополнительная информация */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {t('research.conferences.description') || 'Описание'}
                    </h3>
                    <p className="text-gray-600 mb-6">{getConferenceDescription(selectedConference)}</p>

                    {selectedConference.topics && selectedConference.topics.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          {t('research.conferences.topics') || 'Основные темы'}:
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {selectedConference.topics.split(',').map((topic, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {topic.trim()}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedConference.keynote_speakers && selectedConference.keynote_speakers.length > 0 && (
                      <>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          {t('research.conferences.keynoteSpeakers') || 'Ключевые спикеры'}:
                        </h4>
                        <ul className="space-y-2">
                          {selectedConference.keynote_speakers.split(',').map((speaker, index) => (
                            <li key={index} className="text-gray-600">• {speaker.trim()}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  {selectedConference.website && (
                    <a
                      href={selectedConference.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
                    >
                      🌐 {t('research.conferences.visitOfficialSite') || 'Перейти на официальный сайт'}
                    </a>
                  )}
                  
                  {activeTab === 'upcoming' && (
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                      📝 {t('research.conferences.submitAbstract') || 'Подать тезисы'}
                    </button>
                  )}
                  
                  <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                    📅 {t('research.conferences.addToCalendar') || 'Добавить в календарь'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Conferences;