import React from 'react';
import { Briefcase, DollarSign, MapPin } from 'lucide-react';
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
    // Use icon from API if available
    if (typeof category === 'object' && category.icon) {
      return category.icon;
    }
    
    // Fallback to hardcoded icons only if no API icon
    if (typeof category === 'object' && category.name) {
      category = category.name;
    }
    switch (category) {
      case 'academic': return '🏫';
      case 'administrative': return '<Briefcase className="w-5 h-5" />';
      case 'technical': return '<Monitor className="w-5 h-5" />';
      case 'service': return '<BookOpen className="w-5 h-5" />';
      default: return '<Briefcase className="w-5 h-5" />';
    }
  };

  const getCategoryColor = (categoryName) => {
    if (typeof categoryName === 'object' && categoryName.name) {
      categoryName = categoryName.name;
    }
    switch (categoryName) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'administrative': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category) => {
    if (typeof category === 'object' && category.display_name) {
      return getFieldValue(category.display_name);
    }
    return t(`careers.categories.${category}`);
  };

  // API now returns localized strings directly, no need for translation extraction
  const getFieldValue = (field, fallback = '') => {
    return (field && field !== 'not given') ? field : fallback;
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
                {getFieldValue(vacancy.title, t('careers.title_not_available'))}
              </h3>
              <p className="text-blue-600 font-medium">
                {vacancy.department && typeof vacancy.department === 'object' 
                  ? getFieldValue(vacancy.department.name || vacancy.department.short_name)
                  : getFieldValue(vacancy.department)
                }
              </p>
            </div>
          </div>
          {vacancy.is_deadline_soon && (
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
          {getFieldValue(vacancy.short_description, t('careers.no_description'))}
        </p>

        {/* Key Info */}
        <div className="space-y-2 mb-6">
          {vacancy.salary_display && (
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="font-medium">{vacancy.salary_display}</span>
            </div>
          )}

          {vacancy.experience_years && (
            <div className="flex items-center text-sm text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{t('careers.experience')}: {vacancy.experience_years}</span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <span className="text-red-600 mr-2">⏳</span>
            <span>{t('careers.deadline')}: {formatDate(vacancy.deadline)}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex space-x-3">
          <Link
            to={`/about/careers/${vacancy.slug}`}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
          >
            {t('careers.view_details')}
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {t('careers.published')}: {formatDate(vacancy.posted_date)}
            </span>
            {vacancy.views_count !== undefined && (
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