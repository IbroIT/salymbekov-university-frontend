import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Моковые данные конференций
const conferencesData = {
  upcoming: [
    {
      id: 1,
      title: "Международная конференция по биомедицине и генетике",
      dates: "15-17 мая 2024",
      location: "Алматы, Казахстан",
      deadline: "20 марта 2024",
      website: "https://biomed-conf.kz",
      description: "Ведущая конференция в области современных биомедицинских технологий и генетических исследований",
      topics: ["Генная терапия", "Биоматериалы", "Нейронауки", "Молекулярная диагностика"],
      speakers: ["Проф. Джон Смит (Стэнфорд)", "Др. Мария Гарсия (Институт Макса Планка)"],
      image: "🧬",
      status: "registration-open"
    },
    {
      id: 2,
      title: "Центрально-Азиатский симпозиум по нейронаукам",
      dates: "10-12 июня 2024",
      location: "Нур-Султан, Казахстан",
      deadline: "15 апреля 2024",
      website: "https://neuro-symposium.kz",
      description: "Обсуждение последних достижений в области нейробиологии и когнитивных наук",
      topics: ["Нейродегенеративные заболевания", "Искусственный интеллект в медицине", "Нейроимпланты"],
      speakers: ["Проф. Алиев А.К.", "Др. Смагулова Г.М."],
      image: "🧠",
      status: "early-bird"
    },
    {
      id: 3,
      title: "Конференция по цифровой трансформации в медицине",
      dates: "5-7 июля 2024",
      location: "Онлайн",
      deadline: "1 июня 2024",
      website: "https://digital-medicine.kz",
      description: "Инновационные подходы к цифровизации здравоохранения и телемедицины",
      topics: ["Телемедицина", "Медицинские AI системы", "Big Data в здравоохранении"],
      speakers: ["Эксперты ВОЗ", "Представители Минздрава РК", "IT-специалисты"],
      image: "💻",
      status: "call-for-papers"
    }
  ],
  archive: [
    {
      id: 4,
      title: "Ежегодная научная конференция Университета Салымбекова",
      dates: "12-14 декабря 2023",
      location: "Алматы, Казахстан",
      deadline: "15 ноября 2023",
      website: "https://salyzbekov-conf-2023.kz",
      description: "Итоговая конференция с представлением результатов научных исследований года",
      topics: ["Клинические исследования", "Фундаментальная медицина", "Общественное здоровье"],
      speakers: ["Все ведущие researchers университета"],
      image: "🎓",
      year: 2023,
      participants: 250,
      proceedings: "https://proceedings.salyzbekov.kz/2023"
    },
    {
      id: 5,
      title: "Международный конгресс по кардиологии",
      dates: "20-22 сентября 2023",
      location: "Астана, Казахстан",
      deadline: "1 августа 2023",
      website: "https://cardio-congress-2023.kz",
      description: "Современные подходы к диагностике и лечению сердечно-сосудистых заболеваний",
      topics: ["Интервенционная кардиология", "Кардиохирургия", "Реабилитация"],
      speakers: ["Проф. Robert Smith (Mayo Clinic)", "Др. Sarah Johnson (Johns Hopkins)"],
      image: "❤️",
      year: 2023,
      participants: 180,
      proceedings: "https://proceedings.cardio.kz/2023"
    },
    {
      id: 6,
      title: "Симпозиум по молекулярной биологии",
      dates: "5-7 мая 2023",
      location: "Онлайн",
      deadline: "10 апреля 2023",
      website: "https://molbio-2023.kz",
      description: "Передовые исследования в области молекулярной биологии и биохимии",
      topics: ["Протеомика", "Геномика", "Крио-ЭМ"],
      speakers: ["Нобелевские лауреаты", "Ведущие международные эксперты"],
      image: "🔬",
      year: 2023,
      participants: 300,
      proceedings: "https://proceedings.molbio.kz/2023"
    }
  ]
};

const Conferences = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedConference, setSelectedConference] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      'registration-open': { text: 'Регистрация открыта', color: 'bg-green-100 text-green-800' },
      'early-bird': { text: 'Early Bird', color: 'bg-blue-100 text-blue-800' },
      'call-for-papers': { text: 'Прием тезисов', color: 'bg-orange-100 text-orange-800' }
    };
    return statusConfig[status] || { text: '', color: '' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('research.conferences.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('research.conferences.subtitle')}
          </p>
        </div>

        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                activeTab === 'upcoming'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📅 Предстоящие
            </button>
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                activeTab === 'archive'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🗄️ Архив
            </button>
          </div>
        </div>

        {/* Сетка конференций */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {conferencesData[activeTab].map((conference) => (
            <div
              key={conference.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer"
              onClick={() => setSelectedConference(conference)}
            >
              {/* Верхняя часть с изображением и статусом */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <div className="text-6xl mb-4 text-center">{conference.image}</div>
                {activeTab === 'upcoming' && conference.status && (
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(conference.status).color}`}>
                    {getStatusBadge(conference.status).text}
                  </div>
                )}
              </div>

              {/* Контент карточки */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {conference.title}
                </h3>

                {/* Даты */}
                <div className="flex items-center mb-3">
                  <span className="text-gray-500 mr-3">📅</span>
                  <span className="text-sm text-gray-600">{conference.dates}</span>
                </div>

                {/* Место проведения */}
                <div className="flex items-center mb-3">
                  <span className="text-gray-500 mr-3">📍</span>
                  <span className="text-sm text-gray-600">{conference.location}</span>
                </div>

                {/* Дедлайн */}
                <div className="flex items-center mb-4">
                  <span className="text-gray-500 mr-3">⏰</span>
                  <div>
                    <span className="text-sm text-gray-600">Дедлайн: </span>
                    <span className="text-sm font-semibold text-red-600">{conference.deadline}</span>
                  </div>
                </div>

                {/* Описание */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {conference.description}
                </p>

                {/* Для архивных конференций */}
                {activeTab === 'archive' && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Участников: <strong>{conference.participants}</strong></span>
                      <span>Год: <strong>{conference.year}</strong></span>
                    </div>
                  </div>
                )}

                {/* Кнопка */}
                <div className="flex justify-between items-center">
                  <a
                    href={conference.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
                  >
                    🌐 Посетить сайт
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button className="text-gray-400 hover:text-gray-600 group-hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно с деталями */}
        {selectedConference && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Заголовок */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedConference.title}</h2>
                    <div className="text-6xl mb-4">{selectedConference.image}</div>
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
                    <h3 className="text-xl font-semibold text-gray-800">Основная информация</h3>
                    
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3 text-xl">📅</span>
                      <div>
                        <p className="text-sm text-gray-600">Даты проведения</p>
                        <p className="font-semibold">{selectedConference.dates}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3 text-xl">📍</span>
                      <div>
                        <p className="text-sm text-gray-600">Место проведения</p>
                        <p className="font-semibold">{selectedConference.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-500 mr-3 text-xl">⏰</span>
                      <div>
                        <p className="text-sm text-gray-600">Дедлайн подачи тезисов</p>
                        <p className="font-semibold text-red-600">{selectedConference.deadline}</p>
                      </div>
                    </div>

                    {activeTab === 'archive' && (
                      <>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-3 text-xl">👥</span>
                          <div>
                            <p className="text-sm text-gray-600">Участников</p>
                            <p className="font-semibold">{selectedConference.participants}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-3 text-xl">📁</span>
                          <div>
                            <p className="text-sm text-gray-600">Материалы конференции</p>
                            <a href={selectedConference.proceedings} className="font-semibold text-blue-600 hover:underline">
                              Скачать proceedings
                            </a>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Дополнительная информация */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Описание</h3>
                    <p className="text-gray-600 mb-6">{selectedConference.description}</p>

                    <h4 className="font-semibold text-gray-800 mb-3">Основные темы:</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedConference.topics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {selectedConference.speakers && (
                      <>
                        <h4 className="font-semibold text-gray-800 mb-3">Ключевые спикеры:</h4>
                        <ul className="space-y-2">
                          {selectedConference.speakers.map((speaker, index) => (
                            <li key={index} className="text-gray-600">• {speaker}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                  <a
                    href={selectedConference.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
                  >
                    🌐 Перейти на официальный сайт
                  </a>
                  
                  {activeTab === 'upcoming' && (
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                      📝 Подать тезисы
                    </button>
                  )}
                  
                  <button className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                    📅 Добавить в календарь
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