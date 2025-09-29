import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newAboutAPI } from '../../services/newAboutAPI';

const Founders = () => {
  const [activeFounder, setActiveFounder] = useState(0);
  const [foundersData, setFoundersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  // Fetch founders data from API
  useEffect(() => {
    const fetchFounders = async () => {
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

        const response = await newAboutAPI.getFounders(apiLang);

        if (response.data && response.data.success && response.data.results && response.data.results.length > 0) {
          // Data is already in the correct format from backend
          setFoundersData(response.data.results);
          setActiveFounder(0);
        } else {
          // Set empty data if no API data
          setFoundersData([]);
        }
      } catch (err) {
        console.error('Error fetching founders data:', err);
        setError(err.message);
        // Set empty data on error
        setFoundersData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, [i18n.language]);

  // Display loading state
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading', 'Загрузка...')}</p>
        </div>
      </section>
    );
  }

  // Display error state
  if (error && foundersData.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-red-500 mb-4">❌</div>
          <p className="text-gray-600">{t('common.error', 'Произошла ошибка при загрузке данных')}</p>
        </div>
      </section>
    );
  }

  const nextFounder = () => {
    setActiveFounder((prev) => (prev + 1) % foundersData.length);
  };

  const prevFounder = () => {
    setActiveFounder((prev) => (prev - 1 + foundersData.length) % foundersData.length);
  };

  const selectFounder = (index) => {
    setActiveFounder(index);
  };

  return (
    <section id="founders" className="py-16 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('founders.title')}
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('founders.subtitle')}
          </p>
        </div>

        {/* Основной контент */}
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Левая часть - информация о основателе */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center mb-6">
              <div className="relative mb-4 sm:mb-0 sm:mr-6">
                <img
                  src={foundersData[activeFounder].image}
                  alt={foundersData[activeFounder].name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-lg">👑</span>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-gray-800">{foundersData[activeFounder].name}</h3>
                <p className="text-blue-600 font-semibold">{foundersData[activeFounder].position}</p>
                <p className="text-gray-500 text-sm">{foundersData[activeFounder].years}</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed border-l-4 border-blue-200 pl-4">
              {foundersData[activeFounder].description}
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">✓</span>
                {t('founders.achievementsTitle')}
              </h4>
              <ul className="space-y-3">
                {foundersData[activeFounder].achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start bg-white rounded-lg p-3 shadow-sm">
                    <span className="text-blue-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Правая часть - галерея основателей */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {foundersData.map((founder, index) => (
                <div
                  key={founder.id}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 ${index === activeFounder
                    ? 'ring-4 ring-blue-500 scale-105 relative'
                    : 'hover:scale-102 hover:shadow-xl opacity-90 hover:opacity-100'
                    }`}
                  onClick={() => selectFounder(index)}
                >
                  {index === activeFounder && (
                    <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      ✓
                    </div>
                  )}
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className={`w-20 h-20 rounded-full object-cover mb-3 border-4 ${index === activeFounder ? 'border-blue-500' : 'border-gray-200'
                        }`}
                    />
                    <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                      {founder.name.split(' ')[1]}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 leading-tight">
                      {founder.position.split(',')[0]}
                    </p>
                    <p className="text-xs text-blue-500 font-medium mt-2">
                      {founder.years}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Навигационные кнопки для мобильных устройств */}
            <div className="flex justify-center mt-8 space-x-4 lg:hidden">
              <button
                onClick={prevFounder}
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-12 h-12"
              >
                ←
              </button>
              <button
                onClick={nextFounder}
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center w-12 h-12"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Индикаторы прогресса */}
        <div className="flex justify-center space-x-3 mb-8">
          {foundersData.map((_, index) => (
            <button
              key={index}
              onClick={() => selectFounder(index)}
              className={`flex items-center justify-center rounded-full transition-all duration-300 ${index === activeFounder
                ? 'bg-blue-500 text-white scale-110'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } w-10 h-10`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Навигационные кнопки для десктопа */}
        <div className="hidden lg:flex justify-center space-x-4 mb-8">
          <button
            onClick={prevFounder}
            className="bg-white text-blue-500 px-6 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors flex items-center space-x-2 border border-blue-200"
          >
            <span>←</span>
            <span>{t('founders.previousButton')}</span>
          </button>
          <button
            onClick={nextFounder}
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <span>{t('founders.nextButton')}</span>
            <span>→</span>
          </button>
        </div>

        {/* Цитата */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-20"></div>
          <div className="relative z-10">
            <div className="text-6xl absolute top-2 left-4 opacity-20">❝</div>
            <blockquote className="text-xl italic mb-4 relative z-10 px-8">
              {t('founders.quote.text')}
            </blockquote>
            <cite className="font-semibold text-blue-100">
              {t('founders.quote.author')}
            </cite>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mb-16 -mr-16"></div>
        </div>
      </div>
    </section>
  );
};

export default Founders;