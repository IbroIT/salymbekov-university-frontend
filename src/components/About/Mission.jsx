import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AcademicCapIcon, 
  BeakerIcon, 
  HeartIcon, 
  UserGroupIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

const Mission = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'mission', name: t('mission.missionTitle'), icon: RocketLaunchIcon },
    { id: 'history', name: t('mission.historyTitle', 'Наша история'), icon: BuildingLibraryIcon },
    { id: 'values', name: t('mission.valuesTitle'), icon: HeartIcon },
    { id: 'priorities', name: t('mission.prioritiesTitle'), icon: LightBulbIcon },
    { id: 'achievements', name: t('mission.achievementsTitle', 'Наши достижения'), icon: ChartBarIcon }
  ];

  const valueIcons = {
    education: AcademicCapIcon,
    science: BeakerIcon,
    medicine: HeartIcon,
    studentCare: UserGroupIcon
  };

  const prioritiesIcons = [
    RocketLaunchIcon,
    LightBulbIcon,
    ArrowPathIcon,
    ChartBarIcon
  ];

  const historyIcons = [
    BuildingLibraryIcon,
    UsersIcon,
    RocketLaunchIcon,
    MapPinIcon,
    CalendarIcon
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderMissionContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <RocketLaunchIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('mission.missionTitle')}
        </h2>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-lg text-gray-700 leading-relaxed">
          {t('mission.missionText')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <AcademicCapIcon className="h-6 w-6 text-blue-600 mr-2" />
            {t('mission.visionTitle', 'Наше видение')}
          </h3>
          <p className="text-gray-600">
            {t('mission.visionText', 'Стремимся быть лидерами в области медицинского образования и инноваций')}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <UsersIcon className="h-6 w-6 text-blue-600 mr-2" />
            {t('mission.approachTitle', 'Наш подход')}
          </h3>
          <p className="text-gray-600">
            {t('mission.approachText', 'Сочетание традиционных ценностей и современных технологий')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderHistoryContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <BuildingLibraryIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('mission.historyTitle', 'Наша история')}
        </h2>
      </div>

      <div className="space-y-8">
        {[0, 1, 2, 3, 4].map((milestone, index) => {
          const IconComponent = historyIcons[index] || CalendarIcon;
          return (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {t(`mission.history.milestone${index + 1}.title`, `Веха ${index + 1}`)}
                  </h3>
                  <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {t(`mission.history.milestone${index + 1}.year`, `${2000 + index * 5}`)}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {t(`mission.history.milestone${index + 1}.description`, `Описание вехи ${index + 1}`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderValuesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <HeartIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('mission.valuesTitle')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['education', 'science', 'medicine', 'studentCare'].map((valueKey, index) => {
          const IconComponent = valueIcons[valueKey];
          return (
            <div 
              key={valueKey}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {t(`mission.values.${valueKey}.title`)}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t(`mission.values.${valueKey}.description`)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderPrioritiesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <LightBulbIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('mission.prioritiesTitle')}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {t('mission.priorities', { returnObjects: true }).map((priority, index) => {
          const IconComponent = prioritiesIcons[index] || LightBulbIcon;
          return (
            <div 
              key={index}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {priority}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAchievementsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <ChartBarIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('mission.achievementsTitle', 'Наши достижения')}
        </h2>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <p className="text-center text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          {t('mission.achievementsSubtitle', 'За годы работы мы достигли значительных результатов')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '50+', label: t('mission.achievements.programs', 'Образовательных программ') },
            { number: '1000+', label: t('mission.achievements.students', 'Выпускников') },
            { number: '200+', label: t('mission.achievements.projects', 'Исследовательских проектов') },
            { number: '15+', label: t('mission.achievements.partners', 'Партнерских организаций') }
          ].map((achievement, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {achievement.number}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('mission.impactTitle', 'Наш вклад')}
          </h3>
          <p className="text-gray-600">
            {t('mission.impactText', 'Мы активно участвуем в развитии медицинской науки и образования')}
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {t('mission.futureTitle', 'Перспективы развития')}
          </h3>
          <p className="text-gray-600">
            {t('mission.futureText', 'Планируем расширять международное сотрудничество и внедрять инновации')}
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'mission':
        return renderMissionContent();
      case 'history':
        return renderHistoryContent();
      case 'values':
        return renderValuesContent();
      case 'priorities':
        return renderPrioritiesContent();
      case 'achievements':
        return renderAchievementsContent();
      default:
        return renderMissionContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('mission.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('mission.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('mission.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <li key={section.id}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                            activeSection === section.id
                              ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => changeActiveSection(section.id)}
                        >
                          <IconComponent className="h-5 w-5 mr-3" />
                          {section.name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;