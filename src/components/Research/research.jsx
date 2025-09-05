import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, Users, Award, ArrowRight, Clock, MapPin, ChevronRight, ExternalLink, BookOpen, Mic2 } from 'lucide-react';

const Research = () => {
  const [activeTab, setActiveTab] = useState('publications');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Ключевые направления исследований
  const researchAreas = [
    {
      id: 1,
      icon: '🫀',
      title: 'Кардиология',
      projects: 15,
      publications: 45,
      researchers: 28,
      color: 'bg-red-100 text-red-800',
      gradient: 'from-red-500 to-orange-500',
      description: 'Исследования в области сердечно-сосудистых заболеваний и инновационных методов лечения'
    },
    {
      id: 2,
      icon: '🧠',
      title: 'Нейронауки',
      projects: 8,
      publications: 22,
      researchers: 18,
      color: 'bg-blue-100 text-blue-800',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Изучение работы мозга и нервной системы, разработка новых нейротехнологий'
    },
    {
      id: 3,
      icon: '🦠',
      title: 'Общественное здоровье',
      projects: 12,
      publications: 38,
      researchers: 32,
      color: 'bg-green-100 text-green-800',
      gradient: 'from-green-500 to-teal-600',
      description: 'Анализ популяционного здоровья и разработка стратегий профилактики заболеваний'
    },
    {
      id: 4,
      icon: '🧬',
      title: 'Генетика',
      projects: 9,
      publications: 31,
      researchers: 21,
      color: 'bg-purple-100 text-purple-800',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Молекулярно-генетические исследования и персонализированная медицина'
    },
    {
      id: 5,
      icon: '🦴',
      title: 'Ортопедия',
      projects: 6,
      publications: 19,
      researchers: 15,
      color: 'bg-orange-100 text-orange-800',
      gradient: 'from-amber-500 to-orange-600',
      description: 'Инновационные методы лечения опорно-двигательного аппарата'
    },
    {
      id: 6,
      icon: '👁️',
      title: 'Офтальмология',
      projects: 7,
      publications: 24,
      researchers: 16,
      color: 'bg-indigo-100 text-indigo-800',
      gradient: 'from-indigo-500 to-blue-600',
      description: 'Исследования в области заболеваний глаз и новых методов коррекции зрения'
    }
  ];

  // Последние публикации
  const recentPublications = [
    {
      id: 1,
      title: 'Инновационные подходы к лечению ишемической болезни сердца',
      authors: 'Петров А.В., Сидорова М.К., Иванов С.П.',
      journal: 'Кардиология сегодня',
      date: '2024-01-15',
      impactFactor: 4.2,
      link: '#',
      area: 'Кардиология'
    },
    {
      id: 2,
      title: 'Нейровизуализация при болезни Альцгеймера: новые горизонты',
      authors: 'Козлова Е.И., Смирнов Д.А., Орлова Т.М.',
      journal: 'Нейронауки и клиническая практика',
      date: '2024-01-10',
      impactFactor: 3.8,
      link: '#',
      area: 'Нейронауки'
    },
    {
      id: 3,
      title: 'Эпидемиология сердечно-сосудистых заболеваний в Кыргызстане',
      authors: 'Ибраимов К.Ж., Алиева М.Р., Токтосунов Б.К.',
      journal: 'Общественное здоровье Центральной Азии',
      date: '2024-01-08',
      impactFactor: 2.9,
      link: '#',
      area: 'Общественное здоровье'
    },
    {
      id: 4,
      title: 'Генетические маркеры предрасположенности к диабету 2 типа',
      authors: 'Волкова С.П., Николаев А.Б., Захарова И.В.',
      journal: 'Молекулярная медицина',
      date: '2024-01-05',
      impactFactor: 3.5,
      link: '#',
      area: 'Генетика'
    },
    {
      id: 5,
      title: 'Современные подходы к эндопротезированию тазобедренного сустава',
      authors: 'Абдыкадыров М.К., Омурзаков Б.Т., Садыкова А.Р.',
      journal: 'Ортопедия и травматология',
      date: '2024-01-03',
      impactFactor: 2.7,
      link: '#',
      area: 'Ортопедия'
    }
  ];

  // Ближайшие конференции
  const upcomingConferences = [
    {
      id: 1,
      title: 'Международная конференция по кардиологии',
      date: '2024-02-15',
      time: '09:00 - 18:00',
      location: 'Бишкек, Главный корпус Университета',
      speakers: 12,
      registrationLink: '#',
      deadline: '2024-02-10'
    },
    {
      id: 2,
      title: 'Семинар по нейронаукам и искусственному интеллекту',
      date: '2024-03-01',
      time: '10:00 - 16:00',
      location: 'Онлайн',
      speakers: 8,
      registrationLink: '#',
      deadline: '2024-02-25'
    },
    {
      id: 3,
      title: 'Конференция по общественному здоровью Центральной Азии',
      date: '2024-03-20',
      time: '09:30 - 17:00',
      location: 'Алматы, Казахстан',
      speakers: 15,
      registrationLink: '#',
      deadline: '2024-03-10'
    }
  ];

  // Статистика исследований
  const researchStats = [
    { value: '65+', label: 'Исследовательских проектов', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-100' },
    { value: '180+', label: 'Научных публикаций', icon: Award, color: 'text-green-600', bg: 'bg-green-100' },
    { value: '120+', label: 'Исследователей', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { value: '15+', label: 'Международных коллабораций', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Анимированный счетчик для статистики
  const Counter = ({ value, label }) => {
    const [count, setCount] = useState(0);
    const valueNum = parseInt(value);

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const end = valueNum;
        const duration = 2000; // ms
        const incrementTime = 30; // ms
        const steps = duration / incrementTime;
        const increment = end / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, incrementTime);

        return () => clearInterval(timer);
      }
    }, [isVisible, valueNum]);

    return (
      <div className="text-center">
        <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          {count}+
        </div>
        <div className="text-gray-600 mt-2">{label}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8 flex items-center">
          <Link to="/" className="hover:text-blue-600 transition-colors flex items-center">
            Главная
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-800 font-medium">Научные исследования</span>
        </nav>

        {/* Заголовок с анимацией */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Научные <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">исследования</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Передовые исследования в области медицины и здравоохранения, направленные на улучшение качества жизни
          </p>
        </div>

        {/* Статистика с анимированными счетчиками */}
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {researchStats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 ${stat.bg} rounded-xl mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                {isVisible && <Counter value={stat.value} label={stat.label} />}
              </div>
            </div>
          ))}
        </div>

        {/* Ключевые направления */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Ключевые направления</h2>
            <Link to="/research/areas" className="text-blue-600 hover:text-blue-800 flex items-center group">
              Все направления <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchAreas.map((area) => (
              <div 
                key={area.id} 
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl transform group-hover:scale-110 transition-transform duration-300">{area.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${area.color}`}>
                      {area.projects} проектов
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">{area.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{area.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <BookOpen className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xl font-bold text-gray-800">{area.publications}</div>
                        <div className="text-sm text-gray-600">Публикаций</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-2" />
                      <div>
                        <div className="text-xl font-bold text-gray-800">{area.researchers}</div>
                        <div className="text-sm text-gray-600">Исследователей</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Последние публикации */}
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                Последние публикации
              </h2>
              <Link to="/research/publications" className="text-blue-600 hover:text-blue-800 flex items-center text-sm group">
                Все публикации <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentPublications.map((pub) => (
                <div 
                  key={pub.id} 
                  className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {pub.area}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(pub.date)}</span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{pub.authors}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{pub.journal}</span>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full mr-2">
                        IF: {pub.impactFactor}
                      </span>
                      <a href={pub.link} className="text-blue-500 hover:text-blue-700">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Ближайшие конференции */}
          <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Mic2 className="w-6 h-6 mr-2 text-orange-600" />
                Ближайшие конференции
              </h2>
              <Link to="/research/conferences" className="text-blue-600 hover:text-blue-800 flex items-center text-sm group">
                Все события <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingConferences.map((conf) => {
                const daysUntil = getDaysUntil(conf.date);
                return (
                  <div 
                    key={conf.id} 
                    className="p-4 border border-gray-100 rounded-xl hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-800 flex-1 mr-4 group-hover:text-orange-700 transition-colors">
                        {conf.title}
                      </h3>
                      {daysUntil > 0 && (
                        <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full whitespace-nowrap">
                          Через {daysUntil} дн.
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {formatDate(conf.date)}, {conf.time}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-red-500" />
                        {conf.location}
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-purple-500" />
                        {conf.speakers} спикеров
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Регистрация до: {formatDate(conf.deadline)}
                      </span>
                      <a
                        href={conf.registrationLink}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center group/link"
                      >
                        Зарегистрироваться <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Призыв к действию */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white shadow-xl overflow-hidden mb-12">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Присоединяйтесь к нашим исследованиям</h2>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Станьте частью научного сообщества и внесите вклад в развитие медицины
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/research/join"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg flex items-center justify-center"
              >
                Участвовать в исследованиях
              </Link>
              <Link
                to="/research/grants"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Гранты и финансирование
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Глобальные стили для анимаций */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .bg-grid-pattern {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </div>
  );
};

export default Research;