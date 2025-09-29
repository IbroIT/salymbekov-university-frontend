import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const AcadOp = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Получение данных из переводов
  const opportunitiesData = t('acadop.opportunities.list', { returnObjects: true });
  const categories = t('acadop.categories.list', { returnObjects: true });
  const successStories = t('acadop.successStories.list', { returnObjects: true });

  // Фильтрация данных
  const filteredData = opportunitiesData.filter(opportunity => {
    const matchesCategory = activeCategory === 'all' || opportunity.category === activeCategory;
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Анимация появления
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Статистика
  const stats = {
    total: opportunitiesData.length,
    available: opportunitiesData.filter(r => r.status === 'available').length,
    students: opportunitiesData.reduce((sum, r) => sum + parseInt(r.students.replace('+', '')), 0),
    popular: opportunitiesData.filter(r => r.popular).length
  };

  const statistics = [
    { 
      label: t('acadop.statistics.total'), 
      value: stats.total, 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      label: t('acadop.statistics.available'), 
      value: stats.available, 
      color: 'from-green-500 to-green-600' 
    },
    { 
      label: t('acadop.statistics.students'), 
      value: `${stats.students}+`, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      label: t('acadop.statistics.popular'), 
      value: stats.popular, 
      color: 'from-orange-500 to-orange-600' 
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-white/80 text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            {t('acadop.hero.badge')}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('acadop.hero.title')} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('acadop.hero.highlight')}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('acadop.hero.description')}
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
                placeholder={t('acadop.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-4 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Категории */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-cyan-500 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-black/20'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Сетка возможностей */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((opportunity, index) => (
            <div
              key={opportunity.id}
              className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredCard === opportunity.id ? 'scale-105 shadow-3xl' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(opportunity.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Бейдж популярности */}
              {opportunity.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  {t('acadop.opportunities.popularBadge')}
                </div>
              )}

              {/* Статус */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  opportunity.status === 'available' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-white/80 font-medium">
                  {opportunity.status === 'available' 
                    ? t('acadop.opportunities.status.available') 
                    : t('acadop.opportunities.status.comingSoon')
                  }
                </span>
              </div>

              {/* Заголовок карточки */}
              <div className={`bg-gradient-to-r ${opportunity.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4 bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                      {opportunity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{opportunity.title}</h3>
                      <div className="flex items-center text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="text-sm">{opportunity.students} {t('acadop.opportunities.students')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Содержание */}
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">{opportunity.description}</p>

                {/* Особенности */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {t('acadop.opportunities.featuresTitle')}
                  </h4>
                  <div className="space-y-2">
                    {opportunity.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка доступа */}
                <button className={`w-full bg-gradient-to-r ${opportunity.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center group relative overflow-hidden`}>
                  <span className="relative z-10 flex items-center">
                    {t('acadop.opportunities.detailsButton')}
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
        {filteredData.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('acadop.noResults.title')}</h3>
            <p className="text-gray-400">{t('acadop.noResults.description')}</p>
          </div>
        )}

        {/* Истории успеха */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {t('acadop.successStories.title')} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('acadop.successStories.highlight')}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('acadop.successStories.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 text-center transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-6xl mb-4">{story.image}</div>
                <h3 className="text-xl font-bold text-white mb-2">{story.name}</h3>
                <p className="text-cyan-400 font-medium mb-2">{story.program}</p>
                <p className="text-green-400 text-sm font-medium mb-4">{story.achievement}</p>
                <p className="text-gray-300 italic">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
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

export default AcadOp;