import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getLearningGoals, getLocalizedText } from '../../data/hsmData';

// Новые компоненты для улучшенного UI
const AnimatedSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const IconWrapper = ({ children, color }) => (
  <div className={`p-2 rounded-full bg-${color}-100`}>
    {React.cloneElement(children, { 
      className: `w-5 h-5 text-${color}-600 ${children.props.className || ''}` 
    })}
  </div>
);

const LearningGoalCard = ({ goal, language, index }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Мемоизируем значения для производительности
  const title = useMemo(() => getLocalizedText(goal, 'title', language), [goal, language]);
  const description = useMemo(() => getLocalizedText(goal, 'description', language), [goal, language]);
  const competencies = useMemo(() => getLocalizedText(goal, 'competencies', language), [goal, language]);
  const careerProspects = useMemo(() => getLocalizedText(goal, 'career_prospects', language), [goal, language]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
      whileHover={{ y: -8, scale: 1.01 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      layout
    >
      {/* Header с возможностью развернуть/свернуть */}
      <motion.div 
        className="flex justify-between items-start cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
        layout
      >
        <h3 className="text-xl font-bold text-gray-900 pr-4">
          {title}
        </h3>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
          aria-label={isExpanded ? t('common.collapse') : t('common.expand')}
        >
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Description */}
            {description && (
              <AnimatedSection delay={0.1}>
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <IconWrapper color="blue">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </IconWrapper>
                    {t('hsm.description', 'Описание')}
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-9">
                    {description}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Competencies */}
            {competencies && (
              <AnimatedSection delay={0.2}>
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <IconWrapper color="green">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </IconWrapper>
                    {t('hsm.competencies', 'Компетенции')}
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-9">
                    {competencies}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Career Prospects */}
            {careerProspects && (
              <AnimatedSection delay={0.3}>
                <div className="mb-5">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <IconWrapper color="purple">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </IconWrapper>
                    {t('hsm.career_prospects', 'Карьерные перспективы')}
                  </h4>
                  <p className="text-gray-600 leading-relaxed pl-9">
                    {careerProspects}
                  </p>
                </div>
              </AnimatedSection>
            )}

            {/* Related Programs */}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Кнопка для развертывания/свертывания внизу карточки */}
      <motion.div 
        className="flex justify-center mt-4 pt-3 border-t border-gray-100"
        layout
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? t('common.show_less') : t('common.show_more')}
          <motion.svg
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Новый компонент для фильтрации
const LearningGoalsFilter = ({ filters, setFilters, t }) => {
  const filterOptions = [
    { id: 'all', label: t('hsm.filters.all', 'Все') },
    { id: 'technical', label: t('hsm.filters.technical', 'Технические') },
    { id: 'management', label: t('hsm.filters.management', 'Управленческие') },
    { id: 'design', label: t('hsm.filters.design', 'Дизайн') },
  ];

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 mb-10"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {filterOptions.map((option) => (
        <motion.button
          key={option.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters(option.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filters === option.id
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {option.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

const HSMLearningGoals = () => {
  const { t, i18n } = useTranslation();
  const [learningGoals, setLearningGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Имитация загрузки данных с небольшей задержкой
    const loadData = async () => {
      setLoading(true);
      try {
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 800));
        const data = getLearningGoals();
        setLearningGoals(data);
      } catch (error) {
        console.error('Error loading learning goals:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Фильтрация и поиск
  const filteredGoals = useMemo(() => {
  return learningGoals.filter(goal => {
    return searchQuery === '' || 
      getLocalizedText(goal, 'title', i18n.language).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalizedText(goal, 'description', i18n.language).toLowerCase().includes(searchQuery.toLowerCase());
  });
}, [learningGoals, searchQuery, i18n.language]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-12 w-12 border-b-2 border-blue-600"
            ></motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header с анимацией */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hsm.learning_goals_title', 'Цели и результаты обучения')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {t('hsm.learning_goals_description', 'Узнайте о компетенциях, которые вы получите, и карьерных возможностях после окончания наших программ')}
          </motion.p>
        </motion.div>

        {/* Поиск и фильтры */}
        <motion.div
          className="max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder={t('hsm.search_placeholder', 'Поиск целей обучения...')}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Learning Goals Grid */}
        {filteredGoals.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            layout
          >
            <AnimatePresence>
              {filteredGoals.map((goal, index) => (
                <LearningGoalCard 
                  key={goal.id} 
                  goal={goal} 
                  language={i18n.language}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_learning_goals', 'Цели обучения не найдены')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('hsm.no_learning_goals_description', 'Попробуйте изменить параметры поиска или фильтры')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('hsm.clear_filters', 'Сбросить фильтры')}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        {filteredGoals.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {t('hsm.ready_to_start', 'Готовы начать обучение?')}
              </h2>
              <p className="text-xl mb-6 opacity-90">
                {t('hsm.join_us_text', 'Присоединяйтесь к нам и развивайте свои профессиональные навыки')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/hsm/programs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-md"
                >
                  {t('hsm.view_programs', 'Посмотреть программы')}
                </motion.a>
                <motion.a
                  href="/admissions"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  {t('hsm.apply_now', 'Подать заявку')}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HSMLearningGoals;