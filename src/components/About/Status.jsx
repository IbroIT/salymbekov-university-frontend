import React, { useState, useEffect } from 'react';

const Status = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Данные для аккредитаций
  const accreditationData = [
    {
      id: 1,
      title: "Министерство образования и науки Кыргызской Республики",
      description: "Государственная аккредитация всех образовательных программ университета",
      fullDescription: "Сальмбеков университет успешно прошел государственную аккредитацию, подтвердив соответствие высшим стандартам качества образования в Кыргызстане.",
      logo: "🏛️",
      year: "1998",
      status: "Активный",
      validity: "Бессрочно",
      level: "Государственный",
      type: "government",
      benefits: ["Государственное признание", "Финансирование", "Участие в госпрограммах"],
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-100",
      badgeColor: "bg-blue-500"
    },
    {
      id: 2,
      title: "Всемирная федерация медицинского образования",
      description: "Международное признание медицинских программ университета",
      fullDescription: "Медицинские программы университета соответствуют международным стандартам WFME, что обеспечивает признание дипломов за рубежом.",
      logo: "🌍",
      year: "2005",
      status: "Активный",
      validity: "До 2028 года",
      level: "Международный",
      type: "international",
      benefits: ["Международное признание", "Возможность стажировок", "Трудоустройство за рубежом"],
      color: "from-green-500 to-green-600",
      iconColor: "text-green-100",
      badgeColor: "bg-green-500"
    },
    {
      id: 3,
      title: "Ассоциация медицинских вузов Центральной Азии",
      description: "Членство в ведущей региональной ассоциации медицинских учебных заведений",
      fullDescription: "Университет активно участвует в разработке образовательных стандартов для медицинских вузов Центральной Азии.",
      logo: "⚕️",
      year: "2010",
      status: "Активный",
      validity: "Бессрочно",
      level: "Региональный",
      type: "regional",
      benefits: ["Обмен опытом", "Совместные исследования", "Академическая мобильность"],
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-100",
      badgeColor: "bg-purple-500"
    },
    {
      id: 4,
      title: "Фонд развития медицинского образования",
      description: "Аккредитация программ последипломного медицинского образования",
      fullDescription: "Программы ординатуры и повышения квалификации аккредитованы по международным стандартам.",
      logo: "📚",
      year: "2015",
      status: "Активный",
      validity: "До 2026 года",
      level: "Профессиональный",
      type: "professional",
      benefits: ["Повышение квалификации", "Профессиональный рост", "Сертификация"],
      color: "from-orange-500 to-orange-600",
      iconColor: "text-orange-100",
      badgeColor: "bg-orange-500"
    },
    {
      id: 5,
      title: "Европейская ассоциация университетов",
      description: "Ассоциированное членство в престижной европейской организации",
      fullDescription: "Сотрудничество с ведущими медицинскими университетами Европы по программам обмена и совместным исследованиям.",
      logo: "🇪🇺",
      year: "2018",
      status: "Активный",
      validity: "До 2025 года",
      level: "Международный",
      type: "international",
      benefits: ["Европейские стандарты", "Студенческие обмены", "Совместные проекты"],
      color: "from-teal-500 to-teal-600",
      iconColor: "text-teal-100",
      badgeColor: "bg-teal-500"
    },
    {
      id: 6,
      title: "Ассоциация стоматологического образования",
      description: "Аккредитация стоматологических программ по международным стандартам",
      fullDescription: "Стоматологическая программа университета соответствует требованиям ADEE и готовит специалистов мирового уровня.",
      logo: "🦷",
      year: "2020",
      status: "Активный",
      validity: "До 2027 года",
      level: "Профессиональный",
      type: "professional",
      benefits: ["Международные стандарты", "Современное оборудование", "Практическая подготовка"],
      color: "from-indigo-500 to-indigo-600",
      iconColor: "text-indigo-100",
      badgeColor: "bg-indigo-500"
    }
  ];

  const filteredData = activeFilter === 'all' 
    ? accreditationData 
    : accreditationData.filter(item => item.type === activeFilter);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Современный Hero Section */}
        <div className="text-center mb-16">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white py-20 px-8 rounded-3xl shadow-2xl overflow-hidden">
            {/* Анимированный фон */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>
              
              {/* Плавающие элементы */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 right-16 w-16 h-16 bg-cyan-400/10 rounded-full blur-lg animate-float-delayed"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-lg font-semibold text-cyan-100">Аккредитации и лицензии</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                Салымбеков Университет
              </h1>
              
              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                Ведущий медицинский университет Кыргызстана с международным признанием и аккредитацией
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                <div className="w-4 h-1 bg-cyan-400 rounded-full"></div>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка аккредитаций */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredData.map((item, index) => (
            <div 
              key={item.id}
              className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Анимированный фон при наведении */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Верхняя часть с градиентом */}
              <div className={`relative bg-gradient-to-r ${item.color} p-6 text-white overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`text-3xl bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center ${item.iconColor} backdrop-blur-sm`}>
                      {item.logo}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm ${
                      item.status === 'Активный' 
                        ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                        : 'bg-red-500/20 text-red-100 border border-red-400/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight mb-2">{item.title}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <span>{item.year}</span>
                    <span className="mx-2">•</span>
                    <span>{item.level}</span>
                  </div>
                </div>
              </div>

              {/* Содержание карточки */}
              <div className="relative p-6">
                <p className="text-gray-700 mb-4 leading-relaxed font-medium">{item.description}</p>
                
                {/* Детальная информация */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Срок действия</div>
                    <div className="text-sm font-semibold text-gray-800">{item.validity}</div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Уровень</div>
                    <div className="text-sm font-semibold text-gray-800">{item.level}</div>
                  </div>
                </div>

                {/* Преимущества */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Преимущества:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.benefits.map((benefit, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100 hover:border-blue-300 transition-colors duration-300"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Кнопка подробнее */}
                <button className="w-full py-3 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-xl font-semibold hover:from-blue-50 hover:to-cyan-50 hover:text-blue-600 transition-all duration-300 border border-gray-200 hover:border-blue-200 group-hover:shadow-md">
                  Подробнее об аккредитации
                </button>
              </div>

              {/* Индикатор при наведении */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 ${item.badgeColor} transition-all duration-500 group-hover:w-full`}></div>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">29+</div>
            <div className="text-sm text-gray-600 font-medium">Лет успешной работы</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-green-600 mb-2">6</div>
            <div className="text-sm text-gray-600 font-medium">Аккредитаций</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">3500+</div>
            <div className="text-sm text-gray-600 font-medium">Студентов</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
            <div className="text-sm text-gray-600 font-medium">Преподавателей</div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 border border-white/60 shadow-xl backdrop-blur-sm">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Качество образования — наш главный приоритет
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Все аккредитации Салымбеков университета подтверждают соответствие международным стандартам 
              медицинского образования и обеспечивают высокое качество подготовки специалистов, 
              востребованных как в Кыргызстане, так и за рубежом.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                "Международные стандарты",
                "Современные методики", 
                "Практическая подготовка",
                "Трудоустройство выпускников"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center text-gray-700 bg-white/50 px-4 py-2 rounded-full border border-white">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Добавляем стили для анимаций */}
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};

export default Status;