import React, { useState, useEffect, useRef } from 'react';

const EResources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  // Данные электронных ресурсов
  const resourcesData = [
    {
      id: 1,
      title: "Электронная библиотека",
      description: "Доступ к более чем 50,000 научных публикаций, учебников и журналов",
      category: "library",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      status: "online",
      users: "2,500+",
      features: ["Поиск по каталогу", "Электронный заказ", "Удаленный доступ", "Мобильное приложение"],
      link: "#",
      popular: true
    },
    {
      id: 2,
      title: "Система дистанционного обучения",
      description: "Платформа для онлайн-курсов, вебинаров и виртуальных классов",
      category: "education",
      icon: "🎓",
      color: "from-blue-500 to-blue-600",
      status: "online",
      users: "3,200+",
      features: ["Видеолекции", "Интерактивные тесты", "Форум обсуждений", "Прогресс обучения"],
      link: "#",
      popular: true
    },
    {
      id: 3,
      title: "Научная база данных",
      description: "Доступ к международным научным базам данных и журналам",
      category: "research",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      status: "online",
      users: "1,800+",
      features: ["PubMed", "Scopus", "Web of Science", "Google Scholar"],
      link: "#",
      popular: false
    },
    {
      id: 4,
      title: "Виртуальные лаборатории",
      description: "3D-симуляторы медицинских процедур и диагностики",
      category: "labs",
      icon: "🧪",
      color: "from-orange-500 to-orange-600",
      status: "online",
      users: "900+",
      features: ["Анатомические атласы", "Хирургические симуляторы", "Диагностические кейсы", "VR-тренажеры"],
      link: "#",
      popular: true
    },
    {
      id: 5,
      title: "Система тестирования",
      description: "Платформа для проведения экзаменов и тестирования знаний",
      category: "testing",
      icon: "📝",
      color: "from-red-500 to-red-600",
      status: "maintenance",
      users: "2,100+",
      features: ["Автоматическая проверка", "Тайминг экзаменов", "Аналитика результатов", "Защита от списывания"],
      link: "#",
      popular: false
    },
    {
      id: 6,
      title: "Мобильное приложение",
      description: "Доступ ко всем ресурсам университета с мобильных устройств",
      category: "mobile",
      icon: "📱",
      color: "from-indigo-500 to-indigo-600",
      status: "online",
      users: "4,500+",
      features: ["Push-уведомления", "Оффлайн доступ", "Персональный кабинет", "Расписание"],
      link: "#",
      popular: true
    },
    {
      id: 7,
      title: "Облачное хранилище",
      description: "Безопасное хранение и обмен учебными материалами",
      category: "storage",
      icon: "☁️",
      color: "from-teal-500 to-teal-600",
      status: "online",
      users: "3,800+",
      features: ["1 ТБ памяти", "Совместная работа", "Версионность", "Шифрование"],
      link: "#",
      popular: false
    },
    {
      id: 8,
      title: "Видеоконференции",
      description: "Платформа для онлайн-занятий и совещаний",
      category: "conference",
      icon: "🎥",
      color: "from-pink-500 to-pink-600",
      status: "online",
      users: "2,700+",
      features: ["HD-видео", "Запись сессий", "Интерактивная доска", "До 100 участников"],
      link: "#",
      popular: true
    }
  ];

  // Категории
  const categories = [
    { id: 'all', name: 'Все ресурсы', count: resourcesData.length, icon: '🔄' },
    { id: 'library', name: 'Библиотека', count: resourcesData.filter(r => r.category === 'library').length, icon: '📚' },
    { id: 'education', name: 'Обучение', count: resourcesData.filter(r => r.category === 'education').length, icon: '🎓' },
    { id: 'research', name: 'Наука', count: resourcesData.filter(r => r.category === 'research').length, icon: '🔬' },
    { id: 'labs', name: 'Лаборатории', count: resourcesData.filter(r => r.category === 'labs').length, icon: '🧪' },
    { id: 'mobile', name: 'Мобильные', count: resourcesData.filter(r => r.category === 'mobile').length, icon: '📱' }
  ];

  // Фильтрация данных
  const filteredData = resourcesData.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Анимация появления
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Статистика
  const stats = {
    total: resourcesData.length,
    online: resourcesData.filter(r => r.status === 'online').length,
    users: resourcesData.reduce((sum, r) => sum + parseInt(r.users.replace('+', '')), 0),
    popular: resourcesData.filter(r => r.popular).length
  };

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-white/80 text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            ДИНАМИЧНЫЕ РЕСУРСЫ
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Электронные <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">ресурсы</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Современная цифровая экосистема для эффективного обучения, исследований 
            и академического развития
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Всего ресурсов', value: stats.total, color: 'from-purple-500 to-purple-600' },
            { label: 'Онлайн', value: stats.online, color: 'from-green-500 to-green-600' },
            { label: 'Активных пользователей', value: `${stats.users}+`, color: 'from-blue-500 to-blue-600' },
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
                placeholder="Поиск ресурсов..."
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

        {/* Сетка ресурсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((resource, index) => (
            <div
              key={resource.id}
              className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${hoveredCard === resource.id ? 'scale-105 shadow-3xl' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(resource.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Бейдж популярности */}
              {resource.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              {/* Статус */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  resource.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                }`}></div>
                <span className="text-xs text-white/80 font-medium">
                  {resource.status === 'online' ? 'ОНЛАЙН' : 'ОБСЛУЖИВАНИЕ'}
                </span>
              </div>

              {/* Заголовок карточки */}
              <div className={`bg-gradient-to-r ${resource.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4 bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg">
                      {resource.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{resource.title}</h3>
                      <div className="flex items-center text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{resource.users} пользователей</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Содержание */}
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">{resource.description}</p>

                {/* Особенности */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Основные возможности:
                  </h4>
                  <div className="space-y-2">
                    {resource.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-gray-300 text-sm">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Кнопка доступа */}
                <button className={`w-full bg-gradient-to-r ${resource.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center group relative overflow-hidden`}>
                  <span className="relative z-10 flex items-center">
                    Перейти к ресурсу
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
            <h3 className="text-2xl font-bold text-white mb-2">Ресурсы не найдены</h3>
            <p className="text-gray-400">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
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

export default EResources