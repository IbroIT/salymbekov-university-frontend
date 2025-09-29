import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const FacultyCard = ({ faculty, language }) => {
  const { t } = useTranslation();

  const getName = () => {
    switch (language) {
      case 'kg':
        return `${faculty.last_name_kg || faculty.last_name || ''} ${faculty.first_name_kg || faculty.first_name || ''} ${faculty.middle_name_kg || faculty.middle_name || ''}`.trim();
      case 'en':
        return `${faculty.first_name_en || faculty.first_name || ''} ${faculty.last_name_en || faculty.last_name || ''}`.trim();
      default:
        return faculty.full_name || `${faculty.last_name || ''} ${faculty.first_name || ''} ${faculty.middle_name || ''}`.trim();
    }
  };

  const getPosition = () => {
    switch (language) {
      case 'kg':
        return faculty.position_kg || faculty.position_display || faculty.position;
      case 'en':
        return faculty.position_en || faculty.position_display || faculty.position;
      default:
        return faculty.position_display || faculty.position;
    }
  };

  const getAcademicDegree = () => {
    switch (language) {
      case 'kg':
        return faculty.academic_degree_kg || faculty.academic_degree_display || faculty.academic_degree;
      case 'en':
        return faculty.academic_degree_en || faculty.academic_degree_display || faculty.academic_degree;
      default:
        return faculty.academic_degree_display || faculty.academic_degree;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <SafeImage 
            src={faculty.photo_url || faculty.photo} 
            alt={getName()} 
            className="w-16 h-16 rounded-full object-cover mr-4"
            fallback={
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4">
                <UserGroupIcon className="w-8 h-8 text-blue-500" />
              </div>
            } 
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900">
              {getName()}
            </h3>
            <p className="text-blue-600 text-sm">
              {getPosition()}
            </p>
          </div>
        </div>
        
        {getAcademicDegree() && (
          <div className="mb-3">
            <span className="text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center w-fit">
              <AcademicCapIcon className="w-3 h-3 mr-1" />
              {getAcademicDegree()}
            </span>
          </div>
        )}

        {faculty.interests && (
          <p className="text-gray-700 text-sm">{faculty.interests}</p>
        )}
      </div>
    </div>
  );
};

const HSMAcademicStuff = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [facultyByPosition, setFacultyByPosition] = useState({});
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activePosition, setActivePosition] = useState('all');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [byPosition, list] = await Promise.all([
          hsmService.getFacultyByPosition(), 
          hsmService.getFaculty()
        ]);
        setFacultyByPosition(byPosition || {});
        setAllFaculty(list || []);
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get positions list for navigation
  const positionsList = Object.keys(facultyByPosition).map(code => {
    const group = facultyByPosition[code];
    const getName = () => {
      switch (i18n.language) {
        case 'kg':
          return group.name_kg || group.name;
        case 'en':
          return group.name_en || group.name;
        default:
          return group.name;
      }
    };

    return {
      id: code,
      name: getName(),
      count: group.faculty?.length || 0
    };
  });

  // Add "All" option
  const allPositionsList = [
    { id: 'all', name: t('hsm.all_positions', 'Все должности'), count: allFaculty.length },
    ...positionsList
  ];

  // Get current position data
  const getCurrentPositionData = () => {
    if (activePosition === 'all') {
      return {
        title: t('hsm.all_faculty', 'Весь преподавательский состав'),
        description: t('hsm.all_faculty_description', 'Все преподаватели Высшей медицинской школы'),
        faculty: allFaculty
      };
    }
    
    const group = facultyByPosition[activePosition];
    if (!group) return { title: '', description: '', faculty: [] };

    const getTitle = () => {
      switch (i18n.language) {
        case 'kg':
          return group.name_kg || group.name;
        case 'en':
          return group.name_en || group.name;
        default:
          return group.name;
      }
    };

    return {
      title: getTitle(),
      description: t('hsm.position_description', 'Преподаватели данной категории'),
      faculty: group.faculty || []
    };
  };

  const currentPositionData = getCurrentPositionData();

  // Filter faculty based on search
  const filteredFaculty = currentPositionData.faculty.filter(faculty => {
    if (!search) return true;

    const getName = () => {
      switch (i18n.language) {
        case 'kg':
          return `${faculty.last_name_kg || faculty.last_name || ''} ${faculty.first_name_kg || faculty.first_name || ''} ${faculty.middle_name_kg || faculty.middle_name || ''}`.trim();
        case 'en':
          return `${faculty.first_name_en || faculty.first_name || ''} ${faculty.last_name_en || faculty.last_name || ''}`.trim();
        default:
          return faculty.full_name || `${faculty.last_name || ''} ${faculty.first_name || ''} ${faculty.middle_name || ''}`.trim();
      }
    };

    const name = getName().toLowerCase();
    const query = search.toLowerCase();
    
    return name.includes(query);
  });

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("hsm.loading_error", "Ошибка загрузки данных")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("hsm.refresh_page", "Обновить страницу")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {t("hsm.faculty_title", "Профессорско-преподавательский состав")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("hsm.faculty_description", "Высококвалифицированные преподаватели и исследователи Высшей медицинской школы")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("hsm.positions", "Должности")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {allPositionsList.map((position) => (
                    <li key={position.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center ${
                          activePosition === position.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setActivePosition(position.id);
                          setSearch('');
                        }}
                      >
                        <span>{position.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {position.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentPositionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentPositionData.description}
                </p>
              </div>

              {/* Поиск */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder={t('hsm.search_faculty', 'Поиск преподавателей...')} 
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {search && (
                    <button 
                      onClick={() => setSearch('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              {/* Результаты */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.faculty_members", "Преподаватели")}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {t("hsm.results_count", "Найдено {{count}} преподавателей", { count: filteredFaculty.length })}
                  </span>
                </div>

                {filteredFaculty.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                      {filteredFaculty.map((faculty, index) => (
                        <motion.div
                          key={faculty.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <FacultyCard 
                            faculty={faculty} 
                            language={i18n.language} 
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {t("hsm.no_faculty_found", "Преподаватели не найдены")}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {search 
                        ? t("hsm.try_different_search", "Попробуйте изменить поисковый запрос")
                        : t("hsm.no_faculty_in_category", "В этой категории пока нет преподавателей")
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HSMAcademicStuff;