import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bell, Calendar, Download, ExternalLink, Pin } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const NewsAnnouncements = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [i18n.language]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/announcements/`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(t('news.announcements.loadError', 'Ошибка при загрузке объявлений'));
      }
      const data = await response.json();
      setAnnouncements(data.results || data);
    } catch (err) {
      setError(err.message);
      // Fallback данные для объявлений
      setAnnouncements([
    {
      id: 1,
      title: "Объявление о зимней экзаменационной сессии 2024-2025",
      date: "2024-11-25",
      type: "academic",
      priority: "high",
      deadline: "2025-01-15",
      description: "Информация о расписании экзаменов, требованиях к допуску и правилах проведения зимней сессии.",
      content: "Зимняя экзаменационная сессия для студентов всех курсов начнется 20 декабря 2024 года. Подробное расписание будет опубликовано до 15 декабря.",
      attachment: "winter_session_schedule.pdf",
      pinned: true
    },
    {
      id: 2,
      title: "Стипендиальная программа для отличников обучения",
      date: "2024-11-20",
      type: "scholarship",
      priority: "high",
      deadline: "2024-12-10",
      description: "Открыта подача заявлений на получение повышенной стипендии для студентов с высокими академическими показателями.",
      content: "Студенты, имеющие средний балл не ниже 4.5, могут подать заявление на повышенную стипендию. Размер стипендии составляет 15,000 сом.",
      attachment: "scholarship_application_form.pdf",
      pinned: true
    },
    {
      id: 3,
      title: "Изменения в расписании занятий на декабрь",
      date: "2024-11-18",
      type: "schedule",
      priority: "medium",
      deadline: null,
      description: "Уведомление об изменениях в расписании занятий в связи с праздничными днями в декабре.",
      content: "В связи с государственными праздниками, расписание занятий с 30 декабря по 8 января будет изменено. Подробности в прикрепленном файле.",
      attachment: "december_schedule_changes.pdf",
      pinned: false
    },
    {
      id: 4,
      title: "Конкурс научных работ студентов",
      date: "2024-11-15",
      type: "competition",
      priority: "medium",
      deadline: "2025-02-28",
      description: "Объявляется ежегодный конкурс научных работ студентов медицинского факультета.",
      content: "Принимаются научные работы по всем направлениям медицины. Лучшие работы будут представлены на международной студенческой конференции.",
      attachment: "research_competition_rules.pdf",
      pinned: false
    },
    {
      id: 5,
      title: "Вакцинация студентов и сотрудников",
      date: "2024-11-10",
      type: "health",
      priority: "medium",
      deadline: "2024-12-20",
      description: "Информация о плановой вакцинации против гриппа для всех студентов и сотрудников университета.",
      content: "Вакцинация проводится бесплатно в медицинском кабинете университета по предварительной записи.",
      attachment: null,
      pinned: false
    },
    {
      id: 6,
      title: "Обновление системы электронного обучения",
      date: "2024-11-05",
      type: "technical",
      priority: "low",
      deadline: null,
      description: "Плановые технические работы по обновлению платформы дистанционного обучения.",
          content: "Система будет недоступна 15 ноября с 02:00 до 06:00. Все материалы будут сохранены.",
          attachment: null,
          pinned: false
        }
      ]);
    }
    setLoading(false);
  };

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(item => item.type === filter);

  const pinnedAnnouncements = announcements.filter(item => item.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(item => !item.pinned);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getTypeInfo = (type) => {
    const types = {
      academic: { name: 'Учебное', color: 'bg-blue-100 text-blue-800', icon: '📚' },
      scholarship: { name: 'Стипендия', color: 'bg-green-100 text-green-800', icon: '💰' },
      schedule: { name: 'Расписание', color: 'bg-purple-100 text-purple-800', icon: '📅' },
      competition: { name: 'Конкурс', color: 'bg-orange-100 text-orange-800', icon: '🏆' },
      health: { name: 'Здоровье', color: 'bg-red-100 text-red-800', icon: '🏥' },
      technical: { name: 'Техническое', color: 'bg-gray-100 text-gray-800', icon: '⚙️' }
    };
    return types[type] || types.academic;
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const isDeadlineApproaching = (deadline) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Объявления
            </h1>
            <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
              Важная информация для студентов и сотрудников университета
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Pinned Announcements */}
        {pinnedAnnouncements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Pin className="w-6 h-6 mr-2 text-red-500" />
              Закрепленные объявления
            </h2>
            <div className="space-y-4">
              {pinnedAnnouncements.map((item) => {
                const typeInfo = getTypeInfo(item.type);
                return (
                  <div key={item.id} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${getPriorityColor(item.priority)}`}>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{typeInfo.icon}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${typeInfo.color}`}>
                            {typeInfo.name}
                          </span>
                          {isDeadlineApproaching(item.deadline) && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold animate-pulse">
                              Срочно
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4">
                          {item.content}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(item.date)}
                          </div>
                          {item.deadline && (
                            <div className={`flex items-center ${isDeadlineApproaching(item.deadline) ? 'text-red-600 font-semibold' : ''}`}>
                              <Bell className="w-4 h-4 mr-1" />
                              До: {formatDate(item.deadline)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {item.attachment && (
                          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                            <Download className="w-4 h-4 mr-1" />
                            Скачать
                          </button>
                        )}
                        <Link 
                          to={`/news/detail/${item.id}`}
                          className="flex items-center text-gray-600 hover:text-gray-800 text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter('academic')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'academic'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            Учебные
          </button>
          <button
            onClick={() => setFilter('scholarship')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'scholarship'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            Стипендии
          </button>
          <button
            onClick={() => setFilter('competition')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'competition'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-600 hover:bg-yellow-50'
            }`}
          >
            Конкурсы
          </button>
        </div>

        {/* Regular Announcements */}
        <div className="space-y-6">
          {regularAnnouncements.map((item) => {
            const typeInfo = getTypeInfo(item.type);
            return (
              <div key={item.id} className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${getPriorityColor(item.priority)} hover:shadow-md transition-shadow`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg">{typeInfo.icon}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                        {typeInfo.name}
                      </span>
                      {isDeadlineApproaching(item.deadline) && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                          Срочно
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 text-sm">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                      {item.deadline && (
                        <div className={`flex items-center ${isDeadlineApproaching(item.deadline) ? 'text-red-600 font-semibold' : ''}`}>
                          <Bell className="w-4 h-4 mr-1" />
                          До: {formatDate(item.deadline)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {item.attachment && (
                      <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors">
                        <Download className="w-4 h-4 mr-1" />
                        {item.attachment}
                      </button>
                    )}
                    <Link 
                      to={`/news/detail/${item.id}`}
                      className="flex items-center text-gray-600 hover:text-gray-800 text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Подробнее
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              В данной категории объявлений пока нет
            </div>
          </div>
        )}

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Не пропустите важные объявления
            </h2>
            <p className="mb-6">
              Подпишитесь на уведомления, чтобы получать важные объявления на email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Ваш email адрес"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <button className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Подписаться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAnnouncements;
