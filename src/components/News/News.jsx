import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = 'http://localhost:8000/api';

const News = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [newsData, setNewsData] = useState([]);
  const [featuredNews, setFeaturedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
    fetchFeaturedNews();
  }, [i18n.language]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/news/`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(t('news.loadingError'));
      }
      const data = await response.json();
      setNewsData(data.results || data);
    } catch (err) {
      setError(err.message);
      // Fallback данные если API недоступен
      setNewsData([
        {
          id: 1,
          title: t('news.fallbackNews.0.title'),
          summary: t('news.fallbackNews.0.summary'),
          published_at: "2024-12-01",
          category: { name: "news" },
          image_url: "https://images.unsplash.com/photo-1582719471384-894e35a4b48f?w=400&h=250&fit=crop",
          is_featured: true
        },
        {
          id: 2,
          title: t('news.fallbackNews.1.title'),
          summary: t('news.fallbackNews.1.summary'),
          published_at: "2024-11-28",
          category: { name: "events" },
          image_url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
          is_featured: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news/featured/`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setFeaturedNews(data);
      }
    } catch (err) {
      console.error(t('news.featuredError'), err);
    }
  };

  const filteredNews = activeTab === 'all' 
    ? newsData 
    : newsData.filter(item => item.category?.name === activeTab);

  const displayFeaturedNews = featuredNews.length > 0 ? featuredNews : newsData.filter(item => item.is_featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryName = (category) => {
    const categoryKey = category?.name || category;
    return t(`news.categories.${categoryKey}`, categoryKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('news.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t('news.error')}: {error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchNews();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {t('news.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('news.title')}
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {t('news.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured News Section */}
        {displayFeaturedNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {t('news.featured')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {displayFeaturedNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/news/detail/${item.slug || item.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img 
                        src={item.image_url || item.image} 
                        alt={item.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {t('news.important')}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(item.published_at || item.date)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'news', 'events', 'announcements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-blue-50'
              }`}
            >
              {t(`news.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <Link 
              key={item.id} 
              to={`/news/detail/${item.slug || item.id}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={item.image_url || item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {formatDate(item.published_at || item.date)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      (item.category?.name || item.category) === 'news' ? 'bg-blue-100 text-blue-800' :
                      (item.category?.name || item.category) === 'events' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getCategoryName(item.category?.name || item.category)}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
            {t('news.loadMore')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;