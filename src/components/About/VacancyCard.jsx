import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const VacancyCard = ({ vacancy }) => {
  const { t, i18n } = useTranslation();

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
    return t(`careers.categories.${category}`);
  };

  // Get current language for translations
  const currentLanguage = i18n.language === 'ru' ? 'ru' : i18n.language === 'en' ? 'en' : 'kg';
  
  // Extract translated fields based on current language
  const getTranslatedField = (field) => {
    if (typeof field === 'object' && field !== null) {
      return field[currentLanguage] || field['ru'] || field['en'] || field['kg'] || '';
    }
    return field || '';
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
                {getTranslatedField(vacancy.title)}
              </h3>
              <p className="text-blue-600 font-medium">{getTranslatedField(vacancy.department_name)}</p>
            </div>
          </div>
          {isDeadlineSoon(vacancy.application_deadline) && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {t('careers.urgent')}
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
          {getTranslatedField(vacancy.description)}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          {vacancy.salary && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-green-600 mr-2">💰</span>
              <span className="font-medium">{getTranslatedField(vacancy.salary)}</span>
            </div>
          )}
          
          {vacancy.location && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-blue-600 mr-2">📍</span>
              <span>{getTranslatedField(vacancy.location)}</span>
            </div>
          )}

          {vacancy.employment_type && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-purple-600 mr-2">⏰</span>
              <span>{t(`careers.employment_types.${vacancy.employment_type}`)}</span>
            </div>
          )}

          {vacancy.experience_required && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="text-orange-600 mr-2">💼</span>
              <span>{t('careers.experience')}: {getTranslatedField(vacancy.experience_required)}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <span className="text-red-600 mr-2">⏳</span>
            <span>{t('careers.deadline')}: {formatDate(vacancy.application_deadline)}</span>
          </div>
        </div>

        {/* Requirements */}
        {vacancy.requirements && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-xs text-gray-500 mb-2">{t('careers.key_requirements')}:</span>
            {getTranslatedField(vacancy.requirements).split(',').slice(0, 3).map((requirement, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                {requirement.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="flex space-x-3">
          <Link
            to={`/about/careers/${vacancy.id}`}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
          >
            {t('careers.view_details')}
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('careers.published')}: {formatDate(vacancy.created_at)}
            </span>
            {vacancy.views_count && (
              <span className="text-gray-400">
                👁 {vacancy.views_count} {t('careers.views')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;