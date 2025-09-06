import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api';

const NewsEvents = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('upcoming');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [i18n.language]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/events/`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(t('newsanon.loadError'));
      }
      const data = await response.json();
      setEvents(data.results || data);
    } catch (err) {
      setError(err.message);
      // Fallback данные для событий
      setEvents([
        {
          id: 1,
          title: t('newsanon.fallbackEvent1.title'),
          date: "2025-01-25",
          time: "09:00",
          location: t('newsanon.fallbackEvent1.location'),
          category: "conference",
          participants: "200+",
          description: t('newsanon.fallbackEvent1.description'),
          image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
          status: "upcoming"
        },
        {
          id: 2,
          title: t('newsanon.fallbackEvent2.title'),
          date: "2025-02-15",
          time: "10:00",
          location: t('newsanon.fallbackEvent2.location'),
          category: "open-day",
          participants: "500+",
          description: t('newsanon.fallbackEvent2.description'),
          image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=250&fit=crop",
          status: "upcoming"
        }
      ]);
    }
    setLoading(false);
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.status === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryName = (category) => {
    return t(`newsanon.categories.${category}`, { defaultValue: t('newsanon.categories.default') });
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'conference': return 'bg-blue-100 text-blue-800';
      case 'open-day': return 'bg-green-100 text-green-800';
      case 'competition': return 'bg-purple-100 text-purple-800';
      case 'ceremony': return 'bg-yellow-100 text-yellow-800';
      case 'workshop': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('newsanon.title')}
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              {t('newsanon.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'upcoming'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            {t('newsanon.filters.upcoming')}
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'past'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            {t('newsanon.filters.past')}
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            {t('newsanon.filters.all')}
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(event.category)}`}>
                    {getCategoryName(event.category)}
                  </span>
                </div>
                {event.status === 'upcoming' && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      {t('newsanon.soon')}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {t('newsanon.participantsCount', { count: event.participants })}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <Link 
                    to={`/news/detail/${event.id}`}
                    className="text-green-600 hover:text-green-800 font-semibold text-sm transition-colors"
                  >
                    {t('newsanon.readMore')} →
                  </Link>
                  {event.status === 'upcoming' && (
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                      {t('newsanon.participate')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {t('newsanon.noEvents')}
            </div>
          </div>
        )}

        {/* Calendar Integration */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('newsanon.calendar.title')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('newsanon.calendar.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                {t('newsanon.calendar.googleButton')}
              </button>
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                {t('newsanon.calendar.downloadButton')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;