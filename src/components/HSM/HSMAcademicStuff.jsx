import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  StarIcon,
  ShieldCheckIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const PPSCard = () => {
  const { t, i18n } = useTranslation();

  const statsData = {
    total: 47,
    fullTime: 33,
    fullTimePercentage: 70,
    advancedDegree: 22,
    advancedDegreePercentage: 47,
    doctors: 8,
    candidates: 13,
    phd: 1,
    professors: 5,
    associateProfessors: 8
  };

  const stats = [
    { 
      icon: <UserGroupIcon className="w-8 h-8" />, 
      value: statsData.total, 
      label: t('pps.total', 'Всего ППС'),
      description: t('pps.total_desc', 'Преподавателей и сотрудников')
    },
    { 
      icon: <ShieldCheckIcon className="w-8 h-8" />, 
      value: statsData.fullTime, 
      label: t('pps.full_time', 'Штатные'),
      description: t('pps.full_time_desc', 'Основной состав')
    },
    { 
      icon: <AcademicCapIcon className="w-8 h-8" />, 
      value: statsData.advancedDegree, 
      label: t('pps.advanced_degree', 'С ученой степенью'),
      description: t('pps.advanced_degree_desc', 'Высшая квалификация')
    },
    { 
      icon: <StarIcon className="w-8 h-8" />, 
      value: statsData.doctors, 
      label: t('pps.doctors', 'Докторов наук'),
      description: t('pps.doctors_desc', 'Высшая научная степень')
    }
  ];

  const additionalStats = [
    { value: statsData.candidates, label: t('pps.candidates', 'Кандидатов наук') },
    { value: statsData.phd, label: t('pps.phd', 'PhD') },
    { value: statsData.professors, label: t('pps.professors', 'Профессоров') },
    { value: statsData.associateProfessors, label: t('pps.associate_professors', 'Доцентов') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-white opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t('pps.title', 'Профессорско-преподавательский состав')}
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 1 }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* Основная статистика */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="text-blue-600 mb-4 flex justify-center">
              </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Дополнительная статистика */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              {t('pps.detailed_stats', 'Детальная статистика')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {additionalStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-blue-50 rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-2xl font-bold text-blue-700 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-700">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Описание и цели */}
        <motion.section
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            >
              <p
                className="mb-6"
                style={{ textIndent: '2em' }}
              >
                {t(
                  'pps.mission_text',
                  'ставит перед собой три ключевые цели: соответствовать потребностям рынка образовательных услуг, способствовать экспорту знаний и успешно внедрять многоязычное образование в Кыргызстане.'
                )}
              </p>
                            
              <p className="mb-6"
                style={{ textIndent: '2em' }}>
                {t('pps.faculty_text', 'Для достижения этих целей к учебному процессу привлекаются лучшие отечественные педагоги и эксперты. Преподавательский состав отличается высокой квалификацией, включая более 20 докторов и кандидатов наук. Образовательные программы разрабатываются согласно государственным стандартам.')}
              </p>

              <div className="my-8">
                <p className="mb-4">
                  <strong>{t('pps.notable_professors', 'Ведущие профессора медицинской школы')}:</strong>
                </p>
                <p className="mb-3"
                style={{ textIndent: '2em' }}>
                  {t('pps.professor_list', 'Доктора медицинских наук из числа ППС: Абдылдаев Рысбек Алдагандаевич – профессор, онколог, вице-президент по перспективным исследованиям, Тулекеев Токтогазы Молдалиевич – профессор, хирург, анатом, проректор по научной работе, Узакбаев Камчыбек Аскарбекович – профессор, детский хирург, руководитель департамента науки, Иманкулова Асель Сансызбаевна – хирург, проректор по последипломному образованию, Атыканов Арыстанбек Орозалиевич – акушер-гинеколог, заведующий кафедрой МФД и др.')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default PPSCard;