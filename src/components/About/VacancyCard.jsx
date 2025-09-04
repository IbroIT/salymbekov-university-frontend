import React from 'react';
import { Link } from 'react-router-dom';

const VacancyCard = ({ vacancy }) => {
  const categories = [
    { value: 'all', label: 'Все вакансии' },
    { value: 'academic', label: 'Преподавательские' },
    { value: 'administrative', label: 'Административные' },
    { value: 'technical', label: 'Технические' },
    { value: 'service', label: 'Обслуживающие' }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return '🏫';
      case 'administrative': return '💼';
      case 'technical': return '🖥️';
      case 'service': return '📚';
      default: return '💼';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'administrative': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{getCategoryIcon(vacancy.category)}</span>
            <div>
              <h3 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                {vacancy.title}
              </h3>
              <p className="text-blue-600 font-medium">{vacancy.department}</p>
            </div>
          </div>
          {isDeadlineSoon(vacancy.deadline) && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Срочно
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(vacancy.category)}`}>
            {categories.find(cat => cat.value === vacancy.category)?.label || 'Общие'}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {vacancy.shortDescription || vacancy.description}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-medium">{vacancy.salary}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{vacancy.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{vacancy.type}</span>
          </div>

          {vacancy.experience && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Опыт: {vacancy.experience}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {vacancy.tags && vacancy.tags.slice(1).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex space-x-3">
          <Link
            to={`/about/vacancies/${vacancy.id}`}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
          >
            Подробнее
          </Link>
        </div>

        {/* Deadline */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Опубликовано: {formatDate(vacancy.postedDate)}
            </span>
            <span className={`font-medium ${isDeadlineSoon(vacancy.deadline) ? 'text-red-600' : 'text-gray-600'}`}>
              До: {formatDate(vacancy.deadline)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
