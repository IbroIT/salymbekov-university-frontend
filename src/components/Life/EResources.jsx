import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchEResourcesStatistics,
  fetchEResourcesCategories,
  fetchEResources
} from '../../services/eResourcesAPI';
import { getLocalizedField } from '../../utils/i18nHelpers';

const EResources = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Данные из API
  const [resourcesData, setResourcesData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statisticsData, setStatisticsData] = useState({});

  const sectionRef = useRef(null);
  const currentLanguage = i18n.language;

  // Загрузка данных из API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Параллельная загрузка всех данных
        const [categoriesResult, resourcesResult, statisticsResult] = await Promise.all([
          fetchEResourcesCategories(),
          fetchEResources(),
          fetchEResourcesStatistics()
        ]);

        // Извлекаем данные из результатов API
        const categoriesData = categoriesResult.results || [];
        const resourcesData = resourcesResult.results || [];

        // Подготавливаем категории с добавлением "все"
        const allCategory = {
          id: 'all',
          name: t('eresources.categories.all') || 'Все',
          icon: '📚',
          count: resourcesData.length
        };

        const categoriesWithAll = [allCategory, ...categoriesData.map(cat => ({
          id: cat.id,
          name: getLocalizedField(cat, 'name', currentLanguage),
          icon: cat.icon,
          color: cat.color,
          count: cat.count || 0
        }))];

        setCategories(categoriesWithAll);
        setResourcesData(resourcesData);
        setStatisticsData(statisticsResult);

      } catch (err) {
        console.error('Error loading EResources data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [t, i18n.language]);

  // Обновление ресурсов при изменении фильтров
  useEffect(() => {
    const loadFilteredResources = async () => {
      try {
        const params = {};

        if (activeCategory !== 'all') {
          params.category = activeCategory;
        }

        if (searchTerm) {
          params.search = searchTerm;
        }

        const resources = await fetchEResources(params);
        setResourcesData(resources.results || []);
      } catch (err) {
        console.error('Error loading filtered resources:', err);
      }
    };

    // Добавляем небольшую задержку для поиска, чтобы не делать много запросов
    const timeoutId = setTimeout(loadFilteredResources, 300);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, searchTerm]);

  // Фильтрация данных (дублирование фильтрации на клиенте для лучшего UX)
  const filteredData = resourcesData.filter(resource => {
    const title = getLocalizedField(resource, 'title', currentLanguage);
    const description = getLocalizedField(resource, 'description', currentLanguage);

    const matchesCategory = activeCategory === 'all' || resource.category === parseInt(activeCategory);
    const matchesSearch = !searchTerm ||
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Анимация появления
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Подготовка статистики для отображения
  const stats = {
    total: statisticsData.total || 0,
    online: statisticsData.online || 0,
    users: statisticsData.total_users || 0,
    popular: statisticsData.popular || 0
  };

  const statisticsDisplay = [
    {
      label: t('eresources.statistics.total') || 'Всего ресурсов',
      value: stats.total,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: t('eresources.statistics.online') || 'Онлайн',
      value: stats.online,
      color: 'from-green-500 to-green-600'
    },
    {
      label: t('eresources.statistics.users') || 'Пользователей',
      value: `${stats.users}+`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: t('eresources.statistics.popular') || 'Популярных',
      value: stats.popular,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Показать индикатор загрузки
  if (loading) {
    return (
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-16">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-cyan-400 border-r-transparent rounded-full mb-4"></div>
            <p className="text-xl text-white">{t('common.loading') || 'Загрузка...'}</p>
          </div>
        </div>
      </section>
    );
  }

  // Показать ошибку
  if (error) {
    return (
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('common.error') || 'Ошибка'}</h3>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">

      <div className="container mx-auto px-4 relative z-10">
        {/* Заголовок */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 text-white/80 text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            {t('eresources.hero.badge') || 'Цифровые ресурсы'}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t('eresources.hero.title') || 'Электронные'} <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('eresources.hero.highlight') || 'Ресурсы'}</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('eresources.hero.description') || 'Доступ к обширной коллекции цифровых ресурсов для обучения и исследований'}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {statisticsDisplay.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-2xl transform hover:scale-105 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
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
                placeholder={t('eresources.search.placeholder') || 'Поиск ресурсов...'}
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
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${activeCategory === category.id
                  ? 'bg-cyan-500 text-white shadow-lg'
                  : 'bg-white/10 backdrop-blur-lg text-gray-300 hover:bg-white/20 border border-white/20'
                  }`}
              >
                <span className="mr-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${activeCategory === category.id ? 'bg-white/20' : 'bg-black/20'
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
              className={`group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 transform hover:-translate-y-3 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${hoveredCard === resource.id ? 'scale-105 shadow-3xl' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(resource.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Бейдж популярности */}
              {resource.is_popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                  {t('eresources.resources.popularBadge') || 'Популярный'}
                </div>
              )}

              {/* Статус */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${resource.status === 'online' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                  }`}></div>
                <span className="text-xs text-white/80 font-medium">
                  {resource.status === 'online'
                    ? (t('eresources.resources.status.online') || 'Онлайн')
                    : (t('eresources.resources.status.maintenance') || 'Обслуживание')
                  }
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
                      <h3 className="text-xl font-bold mb-1">{getLocalizedField(resource, 'title', currentLanguage)}</h3>
                      <div className="flex items-center text-white/80">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{resource.users_display} {t('eresources.resources.users') || 'пользователей'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Содержание */}
              <div className="p-6">
                <p className="text-gray-300 mb-4 leading-relaxed">{getLocalizedField(resource, 'description', currentLanguage)}</p>

                {/* Особенности */}
                {resource.features && resource.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {t('eresources.resources.featuresTitle') || 'Особенности'}
                    </h4>
                    <div className="space-y-2">
                      {resource.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-gray-300 text-sm">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                          {getLocalizedField(feature, 'text', currentLanguage)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Кнопка доступа */}
                <a
                  href={resource.url || '#'}
                  target={resource.url ? '_blank' : '_self'}
                  rel={resource.url ? 'noopener noreferrer' : ''}
                  className={`block w-full bg-gradient-to-r ${resource.color} text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105 text-center group relative overflow-hidden ${!resource.url ? 'cursor-not-allowed opacity-75' : ''}`}
                  onClick={!resource.url ? (e) => e.preventDefault() : undefined}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {t('eresources.resources.accessButton') || 'Перейти к ресурсу'}
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Сообщение если нет результатов */}
        {filteredData.length === 0 && (
          <div className="text-center py-16 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('eresources.noResults.title') || 'Ничего не найдено'}</h3>
            <p className="text-gray-400">{t('eresources.noResults.description') || 'Попробуйте изменить критерии поиска'}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EResources;