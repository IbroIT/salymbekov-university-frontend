import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const SocOp = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRef = useRef(null);

  // Получение данных из переводов
  const socialData = {
    events: t('socop.events.list', { returnObjects: true }),
    clubs: t('socop.clubs.list', { returnObjects: true }),
    projects: t('socop.projects.list', { returnObjects: true })
  };

  const categories = t('socop.categories.list', { returnObjects: true });

  // Фильтрация данных
  const getFilteredData = () => {
    let data = [];
    if (activeTab === 'all') {
      data = Object.values(socialData).flat();
    } else {
      data = socialData[activeTab];
    }

    if (searchTerm) {
      return data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return data;
  };

  // Автопереключение событий
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % socialData.events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [socialData.events.length]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Статистика
  const stats = {
    totalMembers: 1500,
    activeProjects: socialData.projects.length,
    upcomingEvents: socialData.events.length,
    clubsCount: socialData.clubs.length
  };

  const statistics = [
    { 
      label: t('socop.statistics.members'), 
      value: `${stats.totalMembers}+`, 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      label: t('socop.statistics.projects'), 
      value: stats.activeProjects, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      label: t('socop.statistics.events'), 
      value: stats.upcomingEvents, 
      color: 'from-green-500 to-green-600' 
    },
    { 
      label: t('socop.statistics.clubs'), 
      value: stats.clubsCount, 
      color: 'from-orange-500 to-orange-600' 
    }
  ];

  const getEventTypeLabel = (type) => {
    const types = {
      forum: t('socop.events.types.forum'),
      conference: t('socop.events.types.conference'),
      career: t('socop.events.types.career')
    };
    return types[type] || type;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      upcoming: t('socop.status.upcoming'),
      active: t('socop.status.active'),
      paused: t('socop.status.paused')
    };
    return statuses[status] || status;
  };

  const getRegistrationLabel = (registration) => {
    return registration === 'open' 
      ? t('socop.events.registration.open')
      : t('socop.events.registration.closed');
  };

  const getActionButtonText = (category) => {
    const actions = {
      events: t('socop.actions.participate'),
      clubs: t('socop.actions.joinClub'),
      projects: t('socop.actions.joinProject')
    };
    return actions[category] || t('socop.actions.participate');
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-white/80 text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            {t('socop.hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('socop.hero.title')} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('socop.hero.highlight')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('socop.hero.description')}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Поиск и фильтры */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Поиск */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder={t('socop.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Слайдер главных событий */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">{t('socop.featuredEvents.title')}</h2>
            <div className="flex gap-2">
              {socialData.events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentEventIndex === index ? 'bg-cyan-400 scale-125' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
            {socialData.events.map((event, index) => (
              <div
                key={event.id}
                className={`p-8 transition-all duration-500 ${
                  currentEventIndex === index ? 'block' : 'hidden'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className={`text-6xl bg-gradient-to-r ${event.color} rounded-2xl w-32 h-32 flex items-center justify-center text-white shadow-lg`}>
                    {event.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4 flex-wrap">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-400/30">
                        {getEventTypeLabel(event.type)}
                      </span>
                      <span className="text-gray-300">{event.date}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-300">{event.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                    <p className="text-gray-300 mb-4 text-lg leading-relaxed">{event.description}</p>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-6 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                          </svg>
                          {event.participants}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {event.organizer}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.registration === 'open' ? 'bg-green-500/20 text-green-400 border border-green-400/30' : 'bg-gray-500/20 text-gray-400 border border-gray-400/30'
                        }`}>
                          {getRegistrationLabel(event.registration)}
                        </span>
                      </div>
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 whitespace-nowrap">
                        {t('socop.actions.participate')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Сетка возможностей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredData().map((item, index) => (
            <div
              key={item.id}
              className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredCard === item.id ? 'scale-105 shadow-3xl' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Бейдж популярности */}
              {item.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  {t('socop.popularBadge')}
                </div>
              )}

              {/* Статус */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  item.status === 'upcoming' || item.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-white/80 font-medium">
                  {getStatusLabel(item.status)}
                </span>
              </div>

              {/* Заголовок карточки */}
              <div className={`bg-gradient-to-r ${item.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4 bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <div className="flex items-center text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="text-sm">
                          {'members' in item ? t('socop.membersCount', { count: item.members }) : 
                           'team' in item ? t('socop.teamSize', { size: item.team }) : 
                           t('socop.participantsCount', { count: item.participants })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Содержание */}
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                {/* Детальная информация */}
                <div className="space-y-3 mb-6">
                  {'meetings' in item && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium">{item.meetings}</span>
                    </div>
                  )}
                  {'duration' in item && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium">{t('socop.duration')}: {item.duration}</span>
                    </div>
                  )}
                  {'leader' in item && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium">{t('socop.leader')}: {item.leader}</span>
                    </div>
                  )}
                  {'organizer' in item && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      <span className="font-medium">{t('socop.organizer')}: {item.organizer}</span>
                    </div>
                  )}
                </div>

                {/* Достижения или потребности */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item.achievements ? t('socop.achievements') : t('socop.requirements')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(item.achievements || item.needs || []).map((text, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs font-medium border border-white/20"
                      >
                        {text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Прогресс-бар для проектов */}
                {item.progress && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>{t('socop.progress.title')}</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Кнопка действия */}
                <button className={`w-full bg-gradient-to-r ${item.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center group relative overflow-hidden`}>
                  <span className="relative z-10 flex items-center">
                    {getActionButtonText(item.category)}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {getFilteredData().length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('socop.noResults.title')}</h3>
            <p className="text-gray-400">{t('socop.noResults.description')}</p>
          </div>
        )}
      </div>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default SocOp;