import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = 'https://su-med-backend-35d3d951c74b.herokuapp.com/api';

const HomeNews = () => {
  const { t, i18n } = useTranslation();
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, [i18n.language]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/news/?limit=6`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(t('news.fetchError'));
      }
      
      const data = await response.json();
      setNewsData(data.results || data);
    } catch (err) {
      setError(err.message);
      // Fallback данные если API недоступен
      setNewsData([
        {
          id: 1,
          title: {
            ru: "Открытие нового симуляционного центра",
            en: "Opening of a new simulation center",
            kg: "Жаңы симуляциялык борбордун ачылышы"
          },
          summary: {
            ru: "В университете открылся современный симуляционный центр с передовым медицинским оборудованием",
            en: "A modern simulation center with advanced medical equipment has opened at the university",
            kg: "Университетте заманбап медициналык жабдыктар менен жабдылган симуляциялык борбор ачылды"
          },
          published_at: "2024-12-01",
          category: { name: "news" },
          image_url: "https://images.unsplash.com/photo-1582719471384-894e35a4b48f?w=400&h=250&fit=crop",
          slug: "simulation-center-opening"
        },
        {
          id: 2,
          title: {
            ru: "Международная конференция по кардиологии",
            en: "International Cardiology Conference",
            kg: "Кардиология боюнча эл аралык конференция"
          },
          summary: {
            ru: "25-26 января состоится международная конференция с участием ведущих специалистов",
            en: "An international conference with leading specialists will be held on January 25-26",
            kg: "25-26 январьда ири адистердин катышуусунда эл аралык конференция өткөрүлөт"
          },
          published_at: "2024-11-28",
          category: { name: "events" },
          image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
          slug: "cardiology-conference"
        },
        {
          id: 3,
          title: {
            ru: "Новые программы обучения",
            en: "New Educational Programs",
            kg: "Жаңы окуу программалары"
          },
          summary: {
            ru: "Университет запускает новые образовательные программы для студентов",
            en: "The university is launching new educational programs for students",
            kg: "Университет студенттер үчүн жаңы билим берүү программаларын ишке киргизүүдө"
          },
          published_at: "2024-11-25",
          category: { name: "announcements" },
          image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
          slug: "new-educational-programs"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getLocalizedContent = (item, field) => {
    if (!item || !item[field]) return '';
    
    if (typeof item[field] === 'object' && item[field] !== null) {
      // Если поле является объектом с переводами
      return item[field][i18n.language] || item[field].ru || item[field].en || item[field].kg || '';
    }
    
    return item[field];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, options);
  };

  const getCategoryLabel = (category) => {
    const categoryName = category?.name || category;
    return t(`news.categories.${categoryName}`, { defaultValue: categoryName });
  };

  const getCategoryColor = (category) => {
    const categoryName = category?.name || category;
    switch (categoryName) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'events': return 'bg-green-100 text-green-800';
      case 'announcements': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('news.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('news.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        {/* Сетка новостей */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsData.map((item) => (
            <Link 
              key={item.id} 
              to={`/news/detail/${item.slug || item.id}`}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Изображение */}
                <div className="aspect-w-16 aspect-h-10 relative">
                  <img 
                    src={getLocalizedContent(item, 'image_url') || getLocalizedContent(item, 'image')} 
                    alt={getLocalizedContent(item, 'title')}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Категория */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                      {getCategoryLabel(item.category)}
                    </span>
                  </div>
                </div>
                
                {/* Контент */}
                <div className="p-6">
                  {/* Дата */}
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(item.published_at || item.date)}
                  </div>
                  
                  {/* Заголовок */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {getLocalizedContent(item, 'title')}
                  </h3>
                  
                  {/* Краткое описание */}
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {getLocalizedContent(item, 'summary')}
                  </p>
                  
                  {/* Ссылка для чтения */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                    <span>{t('news.readMore')}</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Кнопка "Все новости" */}
        <div className="text-center">
          <Link 
            to="/news" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <span>{t('news.allNews')}</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Сообщение об ошибке */}
        {error && (
          <div className="mt-6 text-center">
            <p className="text-red-600 text-sm">{t('news.errorMessage')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeNews;