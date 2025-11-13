import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VacancyCard from './VacancyCard';
import careersAPI from '../../services/careersAPI';
import './About.css';

const CareersMain = () => {
  const { t, i18n } = useTranslation();
  const [vacancies, setVacancies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Добавляем небольшую задержку для обновления языка
    const timer = setTimeout(() => {
      loadInitialData();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [i18n.language]); // Добавляем зависимость от языка

  useEffect(() => {
    // Загружаем вакансии только после того, как категории загружены
    if (categories.length > 0) {
      loadVacancies();
    }
  }, [filterCategory, i18n.language]); // Добавляем зависимость от языка

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      const [categoriesData, vacanciesData] = await Promise.all([
        careersAPI.getCategories(),
        careersAPI.getVacancies()
      ]);
      
      // Handle categories data - ensure it's an array
      const categories = Array.isArray(categoriesData) 
        ? categoriesData 
        : (categoriesData?.results || []);
      
      // Add fallback for empty translations
      const processedCategories = categories.map(category => ({
        ...category,
        display_name: category.display_name || category.name || 'Unknown Category'
      }));
      
      setCategories([
        { name: 'all', display_name: t('careers.categories.all') },
        ...processedCategories
      ]);
      
      // Handle vacancies data
      const vacancies = Array.isArray(vacanciesData) 
        ? vacanciesData 
        : (vacanciesData?.results || []);
      
      setVacancies(vacancies);
    } catch (err) {
      console.error('Error loading initial data:', err);
      setError(err.message);
      // No fallback data - show error instead
      setCategories([
        { name: 'all', display_name: t('careers.categories.all') }
      ]);
      setVacancies([]);
    } finally {
      setLoading(false);
    }
  };

  const loadVacancies = async () => {
    try {
      const params = filterCategory === 'all' ? {} : { category: filterCategory };
      const data = await careersAPI.getVacancies(params);
      
      // Handle vacancies data - ensure it's an array
      const vacancies = Array.isArray(data) 
        ? data 
        : (data?.results || []);
      
      setVacancies(vacancies);
    } catch (err) {
      console.error('Error loading vacancies:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('careers.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('careers.error')}</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={loadInitialData}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {t('careers.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            {t('careers.title')}
          </h1>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">{t('careers.filters.title')}</span>
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setFilterCategory(category.name)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  filterCategory === category.name
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.display_name}
              </button>
            ))}
            <div className="ml-auto text-sm text-gray-600">
              {t('careers.filters.found')} <span className="font-semibold">{vacancies.length}</span>
            </div>
          </div>
        </div>

        {/* Vacancies Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {vacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>

        {/* No Results */}
        {vacancies.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center mb-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('careers.no_results.title')}</h3>
            <p className="text-gray-500">{t('careers.no_results.description')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersMain;
