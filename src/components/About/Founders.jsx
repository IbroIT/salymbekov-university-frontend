import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newAboutAPI } from '../../services/newAboutAPI';
import SEOComponent from '../SEO/SEOComponent';

const Founders = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFounder, setActiveFounder] = useState(0);
  const [foundersData, setFoundersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch founders data from API
  useEffect(() => {
    const fetchFounders = async () => {
      try {
        setLoading(true);
        const response = await newAboutAPI.getUniversityFounders();

        if (response.data && response.data.results) {
          setFoundersData(response.data.results);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching founders:', err);
        setError(err.message || 'Failed to load founders data');
        // Fallback to empty array if API fails
        setFoundersData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFounders();
  }, [i18n.language]); // Re-fetch when language changes

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Reset active founder when founders data changes
  useEffect(() => {
    if (foundersData.length > 0) {
      setActiveFounder(0);
    }
  }, [foundersData]);

  const changeActiveFounder = (index) => {
    setActiveFounder(index);
  };

  const getCurrentFounderData = () => {
    return foundersData[activeFounder] || {};
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('common.loading', 'Loading...')}</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{t('common.error', 'Error loading data')}</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!foundersData.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-2xl mb-4">📋</div>
          <p className="text-gray-600">{t('founders.noData', 'No founders data available')}</p>
        </div>
      </div>
    );
  }

  const currentFounder = getCurrentFounderData();

  return (
    <>
      <SEOComponent />
      <div
        className={`min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('founders.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('founders.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('founders.our_founders')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {foundersData.map((founder, index) => (
                    <li key={founder.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${activeFounder === index
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => changeActiveFounder(index)}
                      >
                        <div className="flex items-center">
                          <img
                            src={founder.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"}
                            alt={founder.name}
                            className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-gray-200"
                          />
                          <div className="text-left">
                            <div className="font-medium text-sm">
                              {founder.name ? founder.name.split(' ')[0] : ''}
                            </div>
                            <div className="text-xs text-gray-500">
                              {founder.position ? founder.position.split(',')[0] : ''}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок и основная информация */}
              <div className="flex flex-col md:flex-row items-start mb-6 pb-6 border-b border-gray-200">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="relative">
                    <img
                      src={currentFounder.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"}
                      alt={currentFounder.name || ''}
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
                      <span className="text-sm">👑</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {currentFounder.name || ''}
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg mt-1">
                    {currentFounder.position || ''}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {currentFounder.years || ''}
                  </p>
                  <p className="text-gray-700 mt-4 leading-relaxed">
                    {currentFounder.description || ''}
                  </p>
                </div>
              </div>

              {/* Достижения */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 text-sm">✓</span>
                  {t('founders.achievementsTitle')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(currentFounder.achievements || []).map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Founders;