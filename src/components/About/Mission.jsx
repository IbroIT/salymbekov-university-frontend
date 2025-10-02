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
import { fetchMissionData } from '../../utils/missionApi';

const Mission = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('mission');
  const [missionData, setMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log('Mission component state:', { loading, error, missionData: !!missionData });

  // Icon mapping for values
  const valueIcons = {
    education: AcademicCapIcon,
    science: BeakerIcon,
    medicine: HeartIcon,
    studentCare: UserGroupIcon
  };

  // Icon mapping for history milestones
  const historyIconsMap = {
    BuildingLibraryIcon: BuildingLibraryIcon,
    UsersIcon: UsersIcon,
    RocketLaunchIcon: RocketLaunchIcon,
    MapPinIcon: MapPinIcon,
    CalendarIcon: CalendarIcon
  };

  // Icon mapping for priorities
  const priorityIconsMap = {
    RocketLaunchIcon: RocketLaunchIcon,
    LightBulbIcon: LightBulbIcon,
    ArrowPathIcon: ArrowPathIcon,
    ChartBarIcon: ChartBarIcon
  };

  // Load mission data
  useEffect(() => {
    const loadMissionData = async () => {
      try {
        console.log('Starting to load mission data...');
        setLoading(true);

        const data = await fetchMissionData();
        console.log('Mission data loaded successfully:', data);
        setMissionData(data);
        setError(null);
      } catch (err) {
        console.error('Error loading mission data:', err);
        setError('Failed to load mission data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMissionData();
  }, []);

  // Reload data when language changes
  useEffect(() => {
    if (missionData) {
      const loadMissionData = async () => {
        try {
          const data = await fetchMissionData();
          setMissionData(data);
        } catch (err) {
          console.error('Error reloading mission data:', err);
        }
      };

      loadMissionData();
    }
  }, [i18n.language]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Ошибка загрузки</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!missionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Нет данных</h2>
          <p className="text-gray-600">Данные миссии недоступны</p>
        </div>
      </div>
    );
  }

  const { mission, history, values, priorities, achievements } = missionData;

  const sections = [
    { id: 'mission', name: 'Миссия', icon: RocketLaunchIcon },
    { id: 'history', name: 'Наша история', icon: BuildingLibraryIcon },
    { id: 'values', name: 'Ценности', icon: HeartIcon },
    { id: 'priorities', name: 'Приоритеты', icon: LightBulbIcon },
    { id: 'achievements', name: 'Достижения', icon: ChartBarIcon }
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
          {mission?.title || 'Миссия'}
        </h2>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-lg text-gray-700 leading-relaxed">
          {mission?.mission_text || 'Описание миссии недоступно'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <AcademicCapIcon className="h-6 w-6 text-blue-600 mr-2" />
            {mission?.vision_title || 'Наше видение'}
          </h3>
          <p className="text-gray-600">
            {mission?.vision_text || 'Описание видения недоступно'}
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-blue-100 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <UsersIcon className="h-6 w-6 text-blue-600 mr-2" />
            {mission?.approach_title || 'Наш подход'}
          </h3>
          <p className="text-gray-600">
            {mission?.approach_text || 'Описание подхода недоступно'}
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
          Наша история
        </h2>
      </div>

      <div className="space-y-8">
        {history && history.length > 0 ? history.map((milestone, index) => {
          const IconComponent = historyIconsMap[milestone.icon_class] || CalendarIcon;
          return (
            <div
              key={milestone.id}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {milestone.title}
                  </h3>
                  <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {milestone.year}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        }) : (
          <p className="text-gray-500 text-center">История не найдена</p>
        )}
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
          Ценности
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values && values.length > 0 ? values.map((value) => {
          const IconComponent = valueIcons[value.type] || HeartIcon;
          return (
            <div
              key={value.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          );
        }) : (
          <p className="text-gray-500 text-center col-span-2">Ценности не найдены</p>
        )}
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
          Приоритеты
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {priorities && priorities.length > 0 ? priorities.map((priority) => {
          const IconComponent = priorityIconsMap[priority.icon_class] || LightBulbIcon;
          return (
            <div
              key={priority.id}
              className="flex items-start space-x-4 p-6 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <IconComponent className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {priority.text}
              </p>
            </div>
          );
        }) : (
          <p className="text-gray-500 text-center">Приоритеты не найдены</p>
        )}
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
          Наши достижения
        </h2>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
        <p className="text-center text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          {mission?.achievements_subtitle || 'За годы работы мы достигли значительных результатов'}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {achievements && achievements.length > 0 ? achievements.map((achievement) => (
            <div key={achievement.id} className="text-center p-4">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {achievement.number}
              </div>
              <div className="text-blue-100 text-sm md:text-base">
                {achievement.label}
              </div>
            </div>
          )) : (
            <div className="col-span-4 text-center text-blue-100">
              Достижения не найдены
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {mission?.impact_title || 'Наш вклад'}
          </h3>
          <p className="text-gray-600">
            {mission?.impact_text || 'Мы активно участвуем в развитии медицинской науки и образования'}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {mission?.future_title || 'Перспективы развития'}
          </h3>
          <p className="text-gray-600">
            {mission?.future_text || 'Планируем расширять международное сотрудничество и внедрять инновации'}
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
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {mission?.title || 'О нашей миссии'}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {mission?.subtitle || 'Стремимся к совершенству в медицинском образовании и научных исследованиях'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                Секции
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <li key={section.id}>
                        <button
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeSection === section.id
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