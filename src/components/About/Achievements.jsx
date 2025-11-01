// components/AchievementsPage.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newAboutAPI } from '../../services/newAboutAPI';

// Компонент модального окна для полного описания
const AchievementModal = ({ achievement, isOpen, onClose, getBorderColor, t }) => {
  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform animate-scaleIn">
        <div className={`border-t-4 ${getBorderColor(achievement.category)}`}>
          <div className="p-6">
            {/* Заголовок модального окна */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${achievement.iconColor} text-white mr-4`}>
                  <span className="text-xl">{achievement.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{achievement.title}</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Полное описание */}
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {achievement.description}
              </p>
            </div>

            {/* Дополнительная информация */}
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {achievement.year}
              </span>
            </div>

            {/* Кнопка закрытия */}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {t('achievement.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент карточки достижения
const AchievementCard = ({ achievement, index, getBorderColor, t, onLearnMore }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [index]);

  // Обрезаем текст до 120 символов
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } hover:scale-105 hover:shadow-xl border-l-4 ${getBorderColor(achievement.category)}`}
    >
      <div className="p-6 h-full flex flex-col">
        {/* Заголовок и иконка */}
        <div className="flex items-start mb-4">
          <div className={`p-3 rounded-full ${achievement.iconColor} text-white mr-4 flex-shrink-0`}>
            <span className="text-xl">{achievement.icon}</span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 leading-tight">
            {achievement.title}
          </h3>
        </div>

        {/* Обрезанное описание */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {truncateText(achievement.description)}
        </p>

        {/* Нижняя часть с метками и кнопкой */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {achievement.year}
            </span>
          </div>
          
          {/* Кнопка "Подробнее" */}
          <button
            onClick={() => onLearnMore(achievement)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center"
          >
            {t('achievement.learnMore')}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Компонент статистики
const StatItem = ({ number, label, suffix, index, visibleStats }) => {
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

const AchievementsPage = () => {
  const { t, i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleStats, setVisibleStats] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch achievements and statistics from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Map language codes for API
        const langMapping = {
          'ru': 'ru',
          'kg': 'kg',
          'en': 'en'
        };
        const apiLang = langMapping[i18n.language] || 'ru';

        // Fetch achievements and statistics in parallel
        const [achievementsResponse, statisticsResponse] = await Promise.all([
          newAboutAPI.getAchievements(apiLang),
          newAboutAPI.getStatistics(apiLang)
        ]);

        if (achievementsResponse.data && achievementsResponse.data.success && achievementsResponse.data.data && achievementsResponse.data.data.length > 0) {
          setAchievements(achievementsResponse.data.data);
        } else {
          setAchievements([]);
        }

        if (statisticsResponse.data && statisticsResponse.data.success && statisticsResponse.data.data && statisticsResponse.data.data.length > 0) {
          setStatistics(statisticsResponse.data.data);
        } else {
          setStatistics([]);
        }

      } catch (err) {
        console.error('Error fetching achievements data:', err);
        setError(err.message);
        setAchievements([]);
        setStatistics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

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

  // Обработчик для кнопки "Подробнее"
  const handleLearnMore = (achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  // For backward compatibility, convert statistics to old format
  const stats = statistics.map(stat => ({
    number: parseInt(stat.value) || 0,
    label: stat.name,
    suffix: stat.unit || ""
  }));

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

  // Фильтрация достижений
  const filteredAchievements = activeFilter === 'all'
    ? achievements
    : achievements.filter(achievement => achievement.category === activeFilter);

  // Категории для фильтров из переводов
  const categories = [
    { id: 'all', name: t('achievement.filters.all') },
    { id: 'education', name: t('achievement.filters.education') },
    { id: 'science', name: t('achievement.filters.science') },
    { id: 'international', name: t('achievement.filters.international') },
    { id: 'infrastructure', name: t('achievement.filters.infrastructure') }
  ];

  // Display loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </section>
    );
  }

  // Display error state
  if (error && achievements.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">❌</div>
        </div>
      </section>
    );
  }

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
                visibleStats={visibleStats}
              />
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
                getBorderColor={getBorderColor}
                t={t}
                onLearnMore={handleLearnMore}
              />
            ))}
          </div>
        </section>

        {/* Модальное окно */}
        <AchievementModal
          achievement={selectedAchievement}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          getBorderColor={getBorderColor}
          t={t}
        />
      </div>
    </div>
  );
};

export default AchievementsPage;