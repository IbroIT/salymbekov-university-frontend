import React, { useState, useEffect, useRef } from 'react';

const AcadOp = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Данные академических возможностей
  const opportunitiesData = [
    {
      id: 1,
      title: "Двойные дипломы",
      description: "Получите дипломы двух университетов одновременно с международными партнерами",
      category: "education",
      icon: "🎓",
      color: "from-purple-500 to-purple-600",
      status: "available",
      students: "350+",
      features: ["Международное признание", "Два диплома", "Интернациональный опыт", "Карьерные преимущества"],
      link: "#",
      popular: true
    },
    {
      id: 2,
      title: "Стажировки за рубежом",
      description: "Прохождение практики в ведущих международных компаниях и исследовательских центрах",
      category: "international",
      icon: "✈️",
      color: "from-blue-500 to-blue-600",
      status: "available",
      students: "280+",
      features: ["Опыт работы", "Международные контакты", "Языковая практика", "Профессиональный рост"],
      link: "#",
      popular: true
    },
    {
      id: 3,
      title: "Научные гранты",
      description: "Финансирование исследовательских проектов и научных инициатив студентов",
      category: "research",
      icon: "💰",
      color: "from-green-500 to-green-600",
      status: "available",
      students: "150+",
      features: ["Финансовая поддержка", "Научные публикации", "Оборудование", "Конференции"],
      link: "#",
      popular: false
    },
    {
      id: 4,
      title: "Карьерный центр",
      description: "Комплексная поддержка в трудоустройстве и построении профессиональной карьеры",
      category: "career",
      icon: "🎯",
      color: "from-orange-500 to-orange-600",
      status: "available",
      students: "1,200+",
      features: ["Трудоустройство", "Карьерные консультации", "Ярмарки вакансий", "Партнерские компании"],
      link: "#",
      popular: true
    },
    {
      id: 5,
      title: "Современные лаборатории",
      description: "Доступ к передовому исследовательскому оборудованию и технологиям",
      category: "innovation",
      icon: "🔬",
      color: "from-cyan-500 to-cyan-600",
      status: "available",
      students: "900+",
      features: ["High-tech оборудование", "Исследования", "Эксперименты", "Инновационные проекты"],
      link: "#",
      popular: true
    },
    {
      id: 6,
      title: "Онлайн-курсы",
      description: "Дистанционное обучение по современным программам и методикам",
      category: "education",
      icon: "💻",
      color: "from-indigo-500 to-indigo-600",
      status: "available",
      students: "2,500+",
      features: ["Гибкий график", "Доступность", "Современные технологии", "Интерактивность"],
      link: "#",
      popular: false
    },
    {
      id: 7,
      title: "Международные конференции",
      description: "Участие в научных мероприятиях и симпозиумах мирового уровня",
      category: "research",
      icon: "🎤",
      color: "from-pink-500 to-pink-600",
      status: "available",
      students: "180+",
      features: ["Международный опыт", "Научные связи", "Публикации", "Профессиональное сообщество"],
      link: "#",
      popular: false
    },
    {
      id: 8,
      title: "Стартап-инкубатор",
      description: "Поддержка студенческих бизнес-проектов и инновационных инициатив",
      category: "innovation",
      icon: "💡",
      color: "from-teal-500 to-teal-600",
      status: "available",
      students: "75+",
      features: ["Финансирование", "Менторство", "Бизнес-ангелы", "Питч-сессии"],
      link: "#",
      popular: true
    },
    {
      id: 9,
      title: "Языковые программы",
      description: "Изучение иностранных языков на профессиональном уровне с носителями",
      category: "international",
      icon: "🗣️",
      color: "from-amber-500 to-amber-600",
      status: "available",
      students: "1,800+",
      features: ["Международные сертификаты", "Носители языка", "Практика", "Культурный обмен"],
      link: "#",
      popular: false
    }
  ];

  // Категории
  const categories = [
    { id: 'all', name: 'Все возможности', count: opportunitiesData.length, icon: '🔄' },
    { id: 'education', name: 'Образование', count: opportunitiesData.filter(r => r.category === 'education').length, icon: '🎓' },
    { id: 'international', name: 'Международные', count: opportunitiesData.filter(r => r.category === 'international').length, icon: '🌍' },
    { id: 'research', name: 'Наука', count: opportunitiesData.filter(r => r.category === 'research').length, icon: '🔬' },
    { id: 'career', name: 'Карьера', count: opportunitiesData.filter(r => r.category === 'career').length, icon: '💼' },
    { id: 'innovation', name: 'Инновации', count: opportunitiesData.filter(r => r.category === 'innovation').length, icon: '🚀' }
  ];

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

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-white/80 text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            АКАДЕМИЧЕСКИЕ ПЕРСПЕКТИВЫ
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Академические <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">возможности</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Откройте мир уникальных возможностей для вашего академического роста, 
            профессионального развития и международного признания
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Всего программ', value: stats.total, color: 'from-purple-500 to-purple-600' },
            { label: 'Доступно сейчас', value: stats.available, color: 'from-green-500 to-green-600' },
            { label: 'Участников', value: `${stats.students}+`, color: 'from-blue-500 to-blue-600' },
            { label: 'Популярных', value: stats.popular, color: 'from-orange-500 to-orange-600' }
          ].map((stat, index) => (
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
                placeholder="Поиск возможностей..."
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
                  ПОПУЛЯРНО
                </div>
              )}

              {/* Статус */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  opportunity.status === 'available' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-white/80 font-medium">
                  {opportunity.status === 'available' ? 'ДОСТУПНО' : 'СКОРО'}
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
                        <span className="text-sm">{opportunity.students} студентов</span>
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
                    Ключевые преимущества:
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
                    Узнать подробнее
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
            <h3 className="text-2xl font-bold text-white mb-2">Возможности не найдены</h3>
            <p className="text-gray-400">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
          </div>
        )}

        {/* Истории успеха */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Истории <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">успеха</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Наши студенты достигают выдающихся результатов благодаря академическим возможностям университета
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Анна Петрова",
                program: "Международный бизнес",
                achievement: "Стажировка в Google, США",
                image: "👩‍💼",
                quote: "Благодаря программе двойных дипломов я получила уникальный международный опыт"
              },
              {
                name: "Максим Иванов",
                program: "Компьютерные науки",
                achievement: "Основатель IT-стартапа",
                image: "👨‍💻",
                quote: "Стартап-инкубатор университета помог превратить идею в успешный бизнес"
              },
              {
                name: "Елена Сидорова",
                program: "Биотехнологии",
                achievement: "Научная работа в Германии",
                image: "👩‍🔬",
                quote: "Научные гранты позволили провести исследования мирового уровня"
              }
            ].map((story, index) => (
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

export default AcadOp