import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VacancyCard = ({ vacancy }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(t('locale'), {
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

  const getCategoryLabel = (category) => {
    return t(`vacancies.categories.${category}`);
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
              {t('vacancies.urgent')}
            </span>
          )}
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(vacancy.category)}`}>
            {getCategoryLabel(vacancy.category)}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {vacancy.shortDescription || vacancy.description}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-green-600 mr-2">💰</span>
            <span className="font-medium">{vacancy.salary}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="text-blue-600 mr-2">📍</span>
            <span>{vacancy.location}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="text-purple-600 mr-2">⏰</span>
            <span>{vacancy.type}</span>
          </div>

          {vacancy.experience && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-orange-600 mr-2">💼</span>
              <span>{t('vacancies.experience')}: {vacancy.experience}</span>
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


        {/* Deadline */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('vacancies.published')}: {formatDate(vacancy.postedDate)}
            </span>
            <span className={`font-medium ${isDeadlineSoon(vacancy.deadline) ? 'text-red-600' : 'text-gray-600'}`}>
              {t('vacancies.until')}: {formatDate(vacancy.deadline)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;