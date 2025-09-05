import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const NewsDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id, i18n.language]); // Перезагружаем при смене языка

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const currentLanguage = i18n.language === 'kg' ? 'ky' : i18n.language;
      
      // Определяем, это ID (число) или slug (строка)
      const isNumericId = /^\d+$/.test(id);
      let apiUrl;
      
      if (isNumericId) {
        // Если это число, используем прямой ID
        apiUrl = `${API_BASE_URL}/news/${id}/`;
      } else {
        // Если это строка, ищем по slug
        apiUrl = `${API_BASE_URL}/news/?slug=${id}`;
      }

      const response = await fetch(apiUrl, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(t('news.detail.notFound', 'Новость не найдена'));
      }

      const data = await response.json();
      
      // Если поиск по slug вернул массив, берем первый элемент
      const newsItem = Array.isArray(data) ? data[0] : data;
      
      if (!newsItem) {
        throw new Error(t('news.detail.notFound', 'Новость не найдена'));
      }
      
      setArticle(newsItem);
      
    } catch (err) {
      setError(err.message);
      // Fallback данные
      setArticle({
        title: t('news.detail.notFound', "Новость не найдена"),
        published_at: new Date().toISOString(),
        category: { name: "news" },
        author: "Неизвестно",
        image_url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&h=400&fit=crop",
        content: "<p>К сожалению, запрашиваемая новость не найдена.</p>"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryName = (category) => {
    const categoryName = category?.name || category;
    switch(categoryName) {
      case 'news': return 'Новости';
      case 'events': return 'События';
      case 'announcements': return 'Объявления';
      default: return 'Новости';
    }
  };

  const getCategoryColor = (category) => {
    const categoryName = category?.name || category;
    switch(categoryName) {
      case 'news': return 'bg-blue-100 text-blue-800';
      case 'events': return 'bg-green-100 text-green-800';
      case 'announcements': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка новости...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Ошибка: {error}</p>
          <Link to="/news" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Вернуться к новостям
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/news" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Вернуться к новостям
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(article.category)}`}>
                {getCategoryName(article.category)}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {formatDate(article.published_at || article.date)}
              </div>
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                {article.author}
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                Поделиться
              </button>
            </div>
            
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <img 
                src={article.image_url || article.image} 
                alt={article.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
