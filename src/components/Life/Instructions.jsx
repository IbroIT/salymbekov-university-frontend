import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon, 
  CalendarDaysIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  ShareIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { getMultilingualText, adaptMultilingualArray } from '../../utils/multilingualUtils';

// Анимированные компоненты
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Instructions = () => {
  const { t, i18n } = useTranslation();
  const [activeGuide, setActiveGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentGuides, setStudentGuides] = useState([]);
  const [rawStudentGuides, setRawStudentGuides] = useState([]);
  const [guideDetailsLoading, setGuideDetailsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [savedGuides, setSavedGuides] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  // Загрузка сохраненных инструкций из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedGuides');
    if (saved) {
      setSavedGuides(JSON.parse(saved));
    }
  }, []);

  // Сохранение инструкций в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('savedGuides', JSON.stringify(savedGuides));
  }, [savedGuides]);

  // Загрузка списка инструкций при загрузке компонента
  useEffect(() => {
    fetchInstructionsData();
  }, []);

  // Обновление данных при смене языка
  useEffect(() => {
    if (rawStudentGuides.length > 0) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawStudentGuides]);

  // Фильтрация инструкций при изменении поискового запроса или категории
  useEffect(() => {
    if (studentGuides.length === 0) return;
    
    let result = studentGuides;
    
    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(guide => 
        guide.title.toLowerCase().includes(query) || 
        guide.description.toLowerCase().includes(query) ||
        (guide.category && guide.category.toLowerCase().includes(query))
      );
    }
    
    // Фильтрация по категории
    if (activeCategory !== 'all') {
      result = result.filter(guide => guide.category === activeCategory);
    }
    
    setFilteredGuides(result);
  }, [searchQuery, studentGuides, activeCategory]);

  const updateDataForCurrentLanguage = useCallback(() => {
    // Адаптируем данные для текущего языка
    const adaptedGuides = adaptMultilingualArray(rawStudentGuides, [
      'title', 'description', 'estimated_time', 'max_duration', 'contact_info', 'requirements', 'category'
    ]);
    
    // Также адаптируем вложенные структуры
    const fullyAdaptedGuides = adaptedGuides.map(guide => ({
      ...guide,
      steps: guide.steps?.map(step => ({
        ...step,
        title: getMultilingualText(step, 'title', step.title),
        description: getMultilingualText(step, 'description', step.description),
        timeframe: getMultilingualText(step, 'timeframe', step.timeframe),
        details: getMultilingualText(step, 'details', step.details) || []
      })) || []
    }));
    
    setStudentGuides(fullyAdaptedGuides);
    setFilteredGuides(fullyAdaptedGuides);
    
    // Обновляем активный гид, если он есть
    if (activeGuide) {
      const updatedActiveGuide = fullyAdaptedGuides.find(g => g.id === activeGuide.id);
      if (updatedActiveGuide) {
        setActiveGuide(updatedActiveGuide);
      }
    }
  }, [rawStudentGuides, activeGuide]);

  const fetchInstructionsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Имитация задержки для демонстрации анимации загрузки
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await fetch('http://localhost:8000/api/student-life/api/data/instructions_data/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const guides = result.student_guides || [];
      
      // Сохраняем оригинальные данные
      setRawStudentGuides(guides);
      
    } catch (err) {
      console.error('Ошибка загрузки инструкций:', err);
      setError(t('studentLife.instructions.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const fetchGuideDetails = async (guideId) => {
    try {
      setGuideDetailsLoading(true);
      
      // Найти гид в уже загруженных данных
      const guide = studentGuides.find(g => g.id === guideId);
      if (guide) {
        setActiveGuide(guide);
        // Прокрутка к верху страницы
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(t('studentLife.instructions.instructionNotFound'));
      }
    } catch (err) {
      console.error('Ошибка загрузки деталей инструкции:', err);
      alert(t('studentLife.instructions.instructionLoadError'));
    } finally {
      setGuideDetailsLoading(false);
    }
  };

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const toggleSaveGuide = (guideId) => {
    if (savedGuides.includes(guideId)) {
      setSavedGuides(savedGuides.filter(id => id !== guideId));
    } else {
      setSavedGuides([...savedGuides, guideId]);
    }
  };

  const shareGuide = async (guide) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: guide.title,
          text: guide.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Ошибка при использовании Web Share API:', err);
      }
    } else {
      // Fallback: копирование в буфер обмена
      navigator.clipboard.writeText(`${guide.title} - ${window.location.href}`);
      alert(t('studentLife.instructions.linkCopied'));
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'CalendarDaysIcon': CalendarDaysIcon,
      'UserGroupIcon': UserGroupIcon,
      'ClipboardDocumentListIcon': ClipboardDocumentListIcon,
      'DocumentTextIcon': DocumentTextIcon
    };
    return iconMap[iconName] || DocumentTextIcon;
  };

  const getCategories = () => {
    const categories = new Set(studentGuides.map(guide => guide.category).filter(Boolean));
    return ['all', ...categories];
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Загрузка основных данных
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"
          ></motion.div>
          <p className="text-gray-600 font-medium">{t('studentLife.instructions.loading')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('studentLife.instructions.loadingSubtitle')}</p>
        </motion.div>
      </div>
    );
  }

  // Ошибка загрузки
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <motion.div 
          className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('studentLife.instructions.error')}</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchInstructionsData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            {t('studentLife.instructions.tryAgain')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Детальный просмотр инструкции
  const GuideDetail = ({ guide }) => (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {(() => {
              const IconComponent = getIconComponent(guide.icon);
              return <IconComponent className="w-10 h-10 text-blue-600 flex-shrink-0 mt-1" />;
            })()}
            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">{guide.title}</h2>
              <p className="text-blue-700">{guide.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleSaveGuide(guide.id)}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
              aria-label={savedGuides.includes(guide.id) ? t('studentLife.instructions.removeFromSaved') : t('studentLife.instructions.addToSaved')}
            >
              {savedGuides.includes(guide.id) ? (
                <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <BookmarkIcon className="w-5 h-5 text-gray-500" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => shareGuide(guide)}
              className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors"
              aria-label={t('studentLife.instructions.share')}
            >
              <ShareIcon className="w-5 h-5 text-gray-500" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
            {t('studentLife.instructions.requirements')}
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {(guide.requirements || []).map((req, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                <ReactMarkdown>{req}</ReactMarkdown>
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
            {t('studentLife.instructions.timeframe')}
          </h3>
          <p className="text-sm text-gray-600">
            {guide.max_duration || t('studentLife.instructions.notSpecified')}
          </p>
          {guide.estimated_time && (
            <p className="text-xs text-gray-500 mt-2">
              {t('studentLife.instructions.estimatedTime')}: {guide.estimated_time}
            </p>
          )}
        </motion.div>
        
        <motion.div 
          className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <PhoneIcon className="w-5 h-5 text-indigo-500 mr-2" />
            {t('studentLife.instructions.contacts')}
          </h3>
          <p className="text-sm text-gray-600">
            {guide.contact_info || t('studentLife.instructions.defaultContact')}
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">{t('studentLife.instructions.steps')}</h3>
        {(guide.steps || []).map((step, index) => (
          <motion.div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => toggleStep(index)}
              className="w-full p-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {step.step_number || index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                {step.timeframe && (
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full mr-3">
                    {step.timeframe}
                  </span>
                )}
                {expandedSteps[index] ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>
            
            <AnimatePresence>
              {expandedSteps[index] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">
                    <div className="pl-14 border-l-2 border-blue-200 ml-5">
                      <ul className="space-y-3">
                        {(step.details || []).map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                            <ReactMarkdown>{detail}</ReactMarkdown>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t('studentLife.instructions.importantNotes')}</h3>
            <ul className="text-yellow-700 space-y-2 text-sm">
              {t('studentLife.instructions.notes', { returnObjects: true }).map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('studentLife.instructions.title')}</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {t('studentLife.instructions.subtitle')}
          </p>
        </motion.div>

        {!activeGuide ? (
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Поиск и фильтры */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-2xl">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={t('studentLife.instructions.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {getCategories().map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? t('studentLife.instructions.allCategories') : category}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Карточки инструкций */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('studentLife.instructions.availableInstructions')}
                </h2>
              </div>
              
              {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => {
                    const IconComponent = getIconComponent(guide.icon);
                    return (
                      <motion.div 
                        key={guide.id} 
                        className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all overflow-hidden flex flex-col"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.2 }}
                        layout
                      >
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <IconComponent className="w-6 h-6 text-blue-600" />
                              </div>
                              <h3 className="text-xl font-semibold text-gray-900 ml-3">{guide.title}</h3>
                            </div>
                            <button
                              onClick={() => toggleSaveGuide(guide.id)}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                              aria-label={savedGuides.includes(guide.id) ? t('studentLife.instructions.removeFromSaved') : t('studentLife.instructions.addToSaved')}
                            >
                              {savedGuides.includes(guide.id) ? (
                                <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <BookmarkIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-3">{guide.description}</p>
                          <div className="space-y-2 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-2" />
                              <span>{t('studentLife.instructions.estimatedTime')}: {guide.estimated_time || t('studentLife.instructions.notSpecified')}</span>
                            </div>
                            {guide.category && (
                              <div className="flex items-center">
                                <DocumentTextIcon className="w-4 h-4 mr-2" />
                                <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                  {guide.category}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="px-6 pb-6">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => fetchGuideDetails(guide.id)}
                            disabled={guideDetailsLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                          >
                            {guideDetailsLoading ? t('studentLife.instructions.loading') : t('studentLife.instructions.viewInstruction')}
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div 
                  className="text-center py-12 bg-white rounded-2xl shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-500 text-lg">{t('studentLife.instructions.noInstructionsFound')}</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-blue-600 hover:text-blue-800 mt-2 font-medium"
                  >
                    {t('studentLife.instructions.clearFilters')}
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Сохраненные инструкции */}
            {savedGuides.length > 0 && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('studentLife.instructions.savedInstructions')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {studentGuides
                    .filter(guide => savedGuides.includes(guide.id))
                    .map(guide => {
                      const IconComponent = getIconComponent(guide.icon);
                      return (
                        <div key={guide.id} className="bg-gray-50 rounded-xl p-4 flex items-center">
                          <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 truncate">{guide.title}</h3>
                            <p className="text-sm text-gray-500 truncate">{guide.description}</p>
                          </div>
                          <button
                            onClick={() => fetchGuideDetails(guide.id)}
                            className="text-blue-600 hover:text-blue-800 ml-2 font-medium text-sm"
                          >
                            {t('studentLife.instructions.open')}
                          </button>
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            )}

            {/* Общая информация */}
            <motion.div variants={itemVariants} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('studentLife.instructions.generalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t('studentLife.instructions.workingHours')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {t('studentLife.instructions.schedule', { returnObjects: true }).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t('studentLife.instructions.requiredDocuments')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {t('studentLife.instructions.documentTips', { returnObjects: true }).map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Контактная информация */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">{t('studentLife.instructions.needHelp')}</h3>
              <p className="mb-4 opacity-90">
                {t('studentLife.instructions.helpDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-90">
                <div>
                  <p><strong>{t('studentLife.instructions.deanOffice')}</strong></p>
                  <p>{t('studentLife.instructions.mainBuilding')}, {t('studentLife.instructions.room')} 105</p>
                  <p>Тел: +996 312 123-456</p>
                  <p>Email: dean@su.edu.kg</p>
                </div>
                <div>
                  <p><strong>{t('studentLife.instructions.academicOffice')}</strong></p>
                  <p>{t('studentLife.instructions.mainBuilding')}, {t('studentLife.instructions.room')} 110</p>
                  <p>Тел: +996 312 123-458</p>
                  <p>Email: studies@su.edu.kg</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => setActiveGuide(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {t('studentLife.instructions.backToInstructions')}
            </motion.button>
            <GuideDetail guide={activeGuide} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Instructions;