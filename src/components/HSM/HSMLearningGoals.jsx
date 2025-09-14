import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getLearningGoals, getLocalizedText } from '../../data/hsmData';

const LearningGoalCard = ({ goal, language }) => {
  const { t } = useTranslation();
  
  const getTitle = () => {
    return getLocalizedText(goal, 'title', language);
  };

  const getDescription = () => {
    return getLocalizedText(goal, 'description', language);
  };

  const getCompetencies = () => {
    return getLocalizedText(goal, 'competencies', language);
  };

  const getCareerProspects = () => {
    return getLocalizedText(goal, 'career_prospects', language);
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {getTitle()}
        </h3>
      </div>

      {/* Description */}
      {getDescription() && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {t('hsm.description', 'Описание')}
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {getDescription()}
          </p>
        </div>
      )}

      {/* Competencies */}
      {getCompetencies() && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t('hsm.competencies', 'Компетенции')}
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {getCompetencies()}
          </p>
        </div>
      )}

      {/* Career Prospects */}
      {getCareerProspects() && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-purple-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
            </svg>
            {t('hsm.career_prospects', 'Карьерные перспективы')}
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {getCareerProspects()}
          </p>
        </div>
      )}

      {/* Related Programs */}
      {goal.programs && goal.programs.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t('hsm.related_programs', 'Связанные программы')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {goal.programs.map((program) => (
              <span
                key={program.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {program.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const HSMLearningGoals = () => {
  const { t, i18n } = useTranslation();
  const [learningGoals, setLearningGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Используем локальные данные
    const data = getLearningGoals();
    setLearningGoals(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('hsm.learning_goals_title', 'Цели и результаты обучения')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hsm.learning_goals_description', 'Узнайте о компетенциях, которые вы получите, и карьерных возможностях после окончания наших программ')}
          </p>
        </motion.div>

        {/* Learning Goals Grid */}
        {learningGoals.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {learningGoals.map((goal) => (
              <LearningGoalCard 
                key={goal.id} 
                goal={goal} 
                language={i18n.language}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_learning_goals', 'Цели обучения не найдены')}
              </h3>
              <p className="text-gray-600">
                {t('hsm.no_learning_goals_description', 'Информация о целях и результатах обучения скоро появится на сайте')}
              </p>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {learningGoals.length > 0 && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">
                {t('hsm.ready_to_start', 'Готовы начать обучение?')}
              </h2>
              <p className="text-xl mb-6 opacity-90">
                {t('hsm.join_us_text', 'Присоединяйтесь к нам и развивайте свои профессиональные навыки')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/hsm/programs"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  {t('hsm.view_programs', 'Посмотреть программы')}
                </a>
                <a
                  href="/admissions"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  {t('hsm.apply_now', 'Подать заявку')}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HSMLearningGoals;
