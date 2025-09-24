import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import hsmService from '../../services/hsmService';
import SafeImage from '../common/SafeImage';
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  TrophyIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';

const FacultyCard = ({ faculty, language, index }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);

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
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      layout
    >
      <div className="relative group">
        <SafeImage 
          src={faculty.photo_url || faculty.photo} 
          alt={getName()} 
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500" 
          fallback={
            <div className="w-full h-72 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
          } 
        />
       
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{getName()}</h3>
        <p className="text-blue-600 font-medium mb-2">{getPosition()}</p>
        
        {getAcademicDegree() && (
          <p className="text-gray-700 mb-3 flex items-start">
            <AcademicCapIcon className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
            <span><strong>{t('hsm.academic_degree', 'Ученая степень')}: </strong>{getAcademicDegree()}</span>
          </p>
        )}
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-100 mt-3 space-y-2">
                {faculty.interests && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-2 mt-1">🔬</span>
                    <span><strong>{t('hsm.research_interests', 'Научные интересы')}:</strong> {faculty.interests}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const HSMAcademicStuff = () => {
  const { t, i18n } = useTranslation();
  const [facultyByPosition, setFacultyByPosition] = useState({});
  const [allFaculty, setAllFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    position: '',
    degree: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique positions and degrees for filtering with proper translations
  const filterOptions = useMemo(() => {
    const getPositionForLanguage = (faculty) => {
      switch (i18n.language) {
        case 'kg':
          return faculty.position_kg || faculty.position_display || faculty.position;
        case 'en':
          return faculty.position_en || faculty.position_display || faculty.position;
        default:
          return faculty.position_display || faculty.position;
      }
    };

    const getDegreeForLanguage = (faculty) => {
      switch (i18n.language) {
        case 'kg':
          return faculty.academic_degree_kg || faculty.academic_degree_display || faculty.academic_degree;
        case 'en':
          return faculty.academic_degree_en || faculty.academic_degree_display || faculty.academic_degree;
        default:
          return faculty.academic_degree_display || faculty.academic_degree;
      }
    };

    const positions = [...new Set(allFaculty.map(getPositionForLanguage).filter(Boolean))];
    const degrees = [...new Set(allFaculty.map(getDegreeForLanguage).filter(Boolean))];
    
    return { positions, degrees };
  }, [allFaculty, i18n.language]);

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
        setFiltered(list || []);
      } catch (err) {
        console.error('Error fetching faculty:', err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!search && !activeFilters.position && !activeFilters.degree) {
      setFiltered(allFaculty);
      return;
    }
    
    const q = search.toLowerCase();
    const res = allFaculty.filter(f => {
      // Helper functions to get translated values
      const getPositionForLanguage = (faculty) => {
        switch (i18n.language) {
          case 'kg':
            return faculty.position_kg || faculty.position_display || faculty.position;
          case 'en':
            return faculty.position_en || faculty.position_display || faculty.position;
          default:
            return faculty.position_display || faculty.position;
        }
      };

      const getDegreeForLanguage = (faculty) => {
        switch (i18n.language) {
          case 'kg':
            return faculty.academic_degree_kg || faculty.academic_degree_display || faculty.academic_degree;
          case 'en':
            return faculty.academic_degree_en || faculty.academic_degree_display || faculty.academic_degree;
          default:
            return faculty.academic_degree_display || faculty.academic_degree;
        }
      };

      // Search filter
      const name = (f.full_name || `${f.first_name || ''} ${f.last_name || ''}`).toLowerCase();
      const pos = getPositionForLanguage(f).toLowerCase();
      const deg = getDegreeForLanguage(f).toLowerCase();
      const matchesSearch = !search || name.includes(q) || pos.includes(q) || deg.includes(q);
      
      // Position filter
      const matchesPosition = !activeFilters.position || 
        getPositionForLanguage(f) === activeFilters.position;
      
      // Degree filter
      const matchesDegree = !activeFilters.degree || 
        getDegreeForLanguage(f) === activeFilters.degree;
      
      return matchesSearch && matchesPosition && matchesDegree;
    });
    
    setFiltered(res);
  }, [search, allFaculty, activeFilters, i18n.language]);

  const clearFilters = () => {
    setSearch('');
    setActiveFilters({ position: '', degree: '' });
  };

  const hasActiveFilters = search || activeFilters.position || activeFilters.degree;

  // Loading state with enhanced animation
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">{t('hsm.loading_faculty', 'Загрузка преподавателей...')}</p>
        </motion.div>
      </div>
    );
  }

  // Error state with enhanced design
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24 flex flex-col items-center justify-center p-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('hsm.error_loading', 'Ошибка загрузки данных')}</h2>
          <p className="text-gray-600 mb-6">{t('hsm.try_again', 'Попробуйте перезагрузить страницу или повторить позже.')}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none transition-colors font-medium"
          >
            {t('hsm.retry', 'Повторить')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('hsm.faculty_title', 'Профессорско-преподавательский состав')}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('hsm.faculty_description', 'Высококвалифицированные преподаватели и исследователи Высшей медицинской школы')}
          </p>
        </motion.div>

        {/* Search and Filters Section */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder={t('hsm.search_faculty', 'Поиск преподавателей...')} 
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>{t('hsm.filters', 'Фильтры')}</span>
              {showFilters ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-white p-4 rounded-xl shadow-md border border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('hsm.filter_by_position', 'Должность')}
                    </label>
                    <select 
                      value={activeFilters.position}
                      onChange={(e) => setActiveFilters({...activeFilters, position: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{t('hsm.all_positions', 'Все должности')}</option>
                      {filterOptions.positions.map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('hsm.filter_by_degree', 'Ученая степень')}
                    </label>
                    <select 
                      value={activeFilters.degree}
                      onChange={(e) => setActiveFilters({...activeFilters, degree: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">{t('hsm.all_degrees', 'Все степени')}</option>
                      {filterOptions.degrees.map(degree => (
                        <option key={degree} value={degree}>{degree}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <XMarkIcon className="h-4 w-4 mr-1" />
                      {t('hsm.clear_filters', 'Очистить фильтры')}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filters indicator */}
          {hasActiveFilters && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center flex-wrap gap-2"
            >
              <span className="text-sm text-gray-600">{t('hsm.active_filters', 'Активные фильтры')}:</span>
              {search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {t('hsm.search', 'Поиск')}: "{search}"
                  <button onClick={() => setSearch('')} className="ml-1">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeFilters.position && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {activeFilters.position}
                  <button onClick={() => setActiveFilters({...activeFilters, position: ''})} className="ml-1">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeFilters.degree && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {activeFilters.degree}
                  <button onClick={() => setActiveFilters({...activeFilters, degree: ''})} className="ml-1">
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        {hasActiveFilters && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <p className="text-gray-600">
              {filtered.length === 0 
                ? t('hsm.no_results', 'Нет результатов, соответствующих вашим критериям')
                : t('hsm.results_count', 'Найдено {{count}} преподавателей', { count: filtered.length })
              }
            </p>
          </motion.div>
        )}

        {/* Faculty List */}
        {search || hasActiveFilters ? (
          <AnimatePresence mode="wait">
            <motion.div 
              key="search-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map((f, index) => (
                <FacultyCard key={f.id} faculty={f} language={i18n.language} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        ) : (
          Object.keys(facultyByPosition).length > 0 ? (
            Object.entries(facultyByPosition).map(([code, group]) => {
              // Получаем название группы в зависимости от языка
              const getGroupName = () => {
                switch (i18n.language) {
                  case 'kg':
                    return group.name_kg || group.name;
                  case 'en':
                    return group.name_en || group.name;
                  default:
                    return group.name;
                }
              };

              return (
                <motion.div 
                  key={code} 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200 flex items-center">
                    <BookOpenIcon className="w-6 h-6 text-blue-600 mr-2" />
                    {getGroupName()}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {group.faculty.map((f, index) => (
                      <FacultyCard key={f.id} faculty={f} language={i18n.language} index={index} />
                    ))}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('hsm.no_faculty', 'Преподаватели не найдены')}</h3>
                <p className="text-gray-600">{t('hsm.no_faculty_description', 'Информация о преподавателях скоро появится на сайте')}</p>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default HSMAcademicStuff;