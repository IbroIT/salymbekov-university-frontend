import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getHSMPrograms, getLocalizedText } from '../../data/hsmData';

const ProgramCard = ({ program, language }) => {
  const { t } = useTranslation();
  
  const getName = () => {
    return getLocalizedText(program, 'name', language);
  };

  const getDescription = () => {
    return getLocalizedText(program, 'description', language);
  };

  const getCompetencies = () => {
    return getLocalizedText(program, 'competencies', language);
  };

  const getCareerProspects = () => {
    return getLocalizedText(program, 'career_prospects', language);
  };

  const getTypeDisplay = () => {
    switch (program.program_type) {
      case 'bachelor':
        return t('hsm.bachelor', 'Бакалавриат');
      case 'master':
        return t('hsm.master', 'Магистратура');
      case 'phd':
        return t('hsm.phd', 'Докторантура');
      default:
        return program.program_type;
    }
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 flex-1">
            {getName()}
          </h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full ml-2 flex-shrink-0">
            {getTypeDisplay()}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {program.duration_years} {t('hsm.years', 'года')}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            {t('hsm.full_time', 'Очная форма')}
          </span>
        </div>
      </div>

      {/* Description */}
      {getDescription() && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">{t('hsm.description', 'Описание')}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {getDescription()}
          </p>
        </div>
      )}

      {/* Competencies */}
      {getCompetencies() && (
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">{t('hsm.competencies', 'Компетенции')}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {getCompetencies()}
          </p>
        </div>
      )}

      {/* Career Prospects */}
      {getCareerProspects() && (
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">{t('hsm.career_prospects', 'Карьерные перспективы')}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {getCareerProspects()}
          </p>
        </div>
      )}
    </motion.div>
  );
};

const ProgramSection = ({ title, programs, language }) => {
  if (!programs || programs.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program) => (
          <ProgramCard 
            key={program.id} 
            program={program} 
            language={language}
          />
        ))}
      </div>
    </div>
  );
};

const Programs = () => {
  const { t, i18n } = useTranslation();
  const [bachelorPrograms, setBachelorPrograms] = useState([]);
  const [masterPrograms, setMasterPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Используем локальные данные
    const allPrograms = getHSMPrograms();
    
    // Разделяем программы по типам
    const bachelor = allPrograms.filter(program => program.program_type === 'bachelor');
    const master = allPrograms.filter(program => program.program_type === 'master');
    
    setBachelorPrograms(bachelor);
    setMasterPrograms(master);
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
            {t('hsm.educational_programs', 'Образовательные программы')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hsm.programs_description', 'Ознакомьтесь с нашими образовательными программами в области медицины')}
          </p>
        </motion.div>

        {/* Bachelor Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <ProgramSection 
            title={t('hsm.bachelor_programs', 'Программы бакалавриата')} 
            programs={bachelorPrograms}
            language={i18n.language}
          />
        </motion.div>

        {/* Master Programs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProgramSection 
            title={t('hsm.master_programs', 'Программы магистратуры')} 
            programs={masterPrograms}
            language={i18n.language}
          />
        </motion.div>

        {/* Empty State */}
        {bachelorPrograms.length === 0 && masterPrograms.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t('hsm.no_programs', 'Программы не найдены')}
              </h3>
              <p className="text-gray-600">
                {t('hsm.no_programs_description', 'Информация об образовательных программах скоро появится на сайте')}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Programs;
