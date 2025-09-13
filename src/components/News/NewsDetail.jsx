import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';

const API_BASE_URL = 'https://su-med-backend-35d3d951c74b.herokuapp.com/api';

const NewsDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id, i18n.language]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const currentLanguage = i18n.language === 'kg' ? 'ky' : i18n.language;
      
      // Всегда используем прямое обращение к объекту (и по ID, и по slug)
      const apiUrl = `${API_BASE_URL}/news/${id}/`;

      console.log('Fetching article from:', apiUrl);
      console.log('Current language:', currentLanguage);
      console.log('ID/slug:', id);

      const response = await fetch(apiUrl, {
        headers: {
          'Accept-Language': currentLanguage,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(t('news.detail.notFound', 'Новость не найдена'));
      }

      const data = await response.json();
      
      console.log('Raw API response:', data);
      console.log('Is array:', Array.isArray(data));
      
      // API должен возвращать объект напрямую, не массив
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error(t('news.detail.notFound', 'Новость не найдена'));
      }
      
      console.log('Setting article:', data);
      setArticle(data);
      
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message);
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Новость не найдена</p>
          <Link to="/news" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Вернуться к новостям
          </Link>
        </div>
      </div>
    );
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
                {formatDate(article.published_at || article.created_at)}
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
            
            {/* Only show image if it exists */}
            {article.image_url && (
              <div className="aspect-w-16 aspect-h-9 mb-8">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8">
            
            {/* Summary if exists */}
            {article.summary && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-lg text-gray-700 font-medium">{article.summary}</p>
              </div>
            )}
            
            {/* Main Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {article.content ? (
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <p>{article.summary || 'Содержимое недоступно'}</p>
              )}
            </div>
            
            {/* Event details if it's an event */}
            {article.event_details && (
              <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Детали мероприятия</h3>
                <div className="space-y-2 text-green-700">
                  {article.event_details.event_date && (
                    <p><strong>Дата:</strong> {formatDate(article.event_details.event_date)}</p>
                  )}
                  {article.event_details.event_time && (
                    <p><strong>Время:</strong> {article.event_details.event_time}</p>
                  )}
                  {article.event_details.end_time && (
                    <p><strong>Окончание:</strong> {article.event_details.end_time}</p>
                  )}
                  {article.event_details.location && (
                    <p><strong>Место:</strong> {article.event_details.location}</p>
                  )}
                </div>
              </div>
            )}
            
            {/* Announcement details if it's an announcement */}
            {article.announcement_details && (
              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-4">Важная информация</h3>
                <div className="space-y-2 text-yellow-700">
                  {article.announcement_details.deadline && (
                    <p><strong>Крайний срок:</strong> {formatDate(article.announcement_details.deadline)}</p>
                  )}
                  {article.announcement_details.contact_info && (
                    <p><strong>Контакты:</strong> {article.announcement_details.contact_info}</p>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
