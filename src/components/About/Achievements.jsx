// components/AchievementsPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AchievementsPage = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleStats, setVisibleStats] = useState(false);

  // Данные достижений из переводов
  const achievements = [
    {
      id: 1,
      title: t('achievement.achievements.achievement1.title'),
      description: t('achievement.achievements.achievement1.description'),
      year: "2024",
      category: "education",
      icon: "🏆",
      iconColor: "bg-yellow-500"
    },
    {
      id: 2,
      title: t('achievement.achievements.achievement2.title'),
      description: t('achievement.achievements.achievement2.description'),
      year: "2023",
      category: "science",
      icon: "❤️",
      iconColor: "bg-red-500"
    },
    {
      id: 3,
      title: t('achievement.achievements.achievement3.title'),
      description: t('achievement.achievements.achievement3.description'),
      year: "2024",
      category: "international",
      icon: "🌍",
      iconColor: "bg-blue-500"
    },
    {
      id: 4,
      title: t('achievement.achievements.achievement4.title'),
      description: t('achievement.achievements.achievement4.description'),
      year: "2023",
      category: "science",
      icon: "📚",
      iconColor: "bg-purple-500"
    },
    {
      id: 5,
      title: t('achievement.achievements.achievement5.title'),
      description: t('achievement.achievements.achievement5.description'),
      year: "2024",
      category: "infrastructure",
      icon: "🏥",
      iconColor: "bg-green-500"
    },
    {
      id: 6,
      title: t('achievement.achievements.achievement6.title'),
      description: t('achievement.achievements.achievement6.description'),
      year: "2023",
      category: "science",
      icon: "💰",
      iconColor: "bg-emerald-500"
    }
  ];

  // Статистика из переводов
  const stats = [
    { number: 150, label: t('achievement.stats.publications'), suffix: "+" },
    { number: 25, label: t('achievement.stats.partners'), suffix: "+" },
    { number: 95, label: t('achievement.stats.employment'), suffix: "%" },
    { number: 50, label: t('achievement.stats.clinicalBases'), suffix: "+" }
  ];

  // Фильтрация достижений
  const filteredAchievements = activeFilter === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeFilter);

  // Анимация появления при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleStats(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsElement = document.getElementById('stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => observer.disconnect();
  }, []);

  // Компонент карточки достижения
  const AchievementCard = ({ achievement, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, index * 150);
      
      return () => clearTimeout(timer);
    }, [index]);
    
    return (
      <div 
        className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } hover:scale-105 hover:shadow-xl border-l-4 ${getBorderColor(achievement.category)}`}
      >
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className={`p-3 rounded-full ${achievement.iconColor} text-white mr-4 flex-shrink-0`}>
              <span className="text-xl">{achievement.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
              <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {achievement.year}
            </span>
            <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
              {t(`achievement.categories.${achievement.category}`)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Компонент статистики
  const StatItem = ({ number, label, suffix, index }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (visibleStats) {
        const duration = 2000;
        const steps = 60;
        const stepValue = number / steps;
        let currentStep = 0;
        
        const timer = setInterval(() => {
          currentStep++;
          setCount(Math.min(Math.floor(stepValue * currentStep), number));
          
          if (currentStep >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }
    }, [visibleStats, number]);
    
    return (
      <div 
        className="text-center p-6 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        style={{ animationDelay: `${index * 200}ms` }}
      >
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {count}{suffix}
        </div>
        <div className="text-gray-600 font-medium">{label}</div>
      </div>
    );
  };

  // Функция для получения цвета границы по категории
  const getBorderColor = (category) => {
    const colors = {
      education: 'border-yellow-400',
      science: 'border-red-400',
      international: 'border-blue-400',
      infrastructure: 'border-green-400'
    };
    return colors[category] || 'border-gray-400';
  };

  // Категории для фильтров из переводов
  const categories = [
    { id: 'all', name: t('achievement.filters.all') },
    { id: 'education', name: t('achievement.filters.education') },
    { id: 'science', name: t('achievement.filters.science') },
    { id: 'international', name: t('achievement.filters.international') },
    { id: 'infrastructure', name: t('achievement.filters.infrastructure') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            {t('achievement.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('achievement.subtitle')}
          </p>
        </div>

        {/* Статистика */}
        <section id="stats-section" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                number={stat.number}
                label={stat.label}
                suffix={stat.suffix}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Фильтры */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Сетка достижений */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((achievement, index) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Призыв к действию */}
        <section className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('achievement.cta.title')}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {t('achievement.cta.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
              {t('achievement.cta.applyButton')}
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105">
              {t('achievement.cta.learnMoreButton')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AchievementsPage;