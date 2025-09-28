import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { 
  AcademicCapIcon, 
  BeakerIcon, 
  HeartIcon, 
  UserGroupIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  ArrowPathIcon,
  ChartBarIcon,
  SparklesIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const Mission = () => {
  const { t } = useTranslation();
  const [activeValue, setActiveValue] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

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

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Анимированный фон с частицами */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Параллакс слои */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-200/20 to-transparent z-0"
        style={{ y }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Главный заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20 mt-12"
        >
          <div className="relative inline-block">
            <motion.div 
              className="absolute -inset-3 bg-blue-200/40 blur-3xl rounded-full"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 relative">
              {t('mission.title')}
            </h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-blue-700 max-w-3xl mx-auto mt-8 leading-relaxed"
          >
            {t('mission.subtitle')}
          </motion.p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
          className="relative mb-28"
        >
          <motion.div 
            className="absolute -inset-5 bg-gradient-to-r from-blue-200 to-blue-100 rounded-3xl blur-3xl opacity-60"
            animate={{
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
            }}
          />
          
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-12 border border-blue-100 shadow-xl">
            <div className="text-center">
              <motion.div 
                className="inline-flex items-center justify-center p-5 bg-blue-100 rounded-2xl mb-8 border border-blue-200"
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                }}
              >
                <RocketLaunchIcon className="h-12 w-12 text-blue-600" />
              </motion.div>
              <h2 className="text-4xl font-bold text-blue-900 mb-8">
                {t('mission.missionTitle')}
              </h2>
              <p className="text-xl text-blue-700 leading-relaxed max-w-4xl mx-auto">
                {t('mission.missionText')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* История развития */}
        <motion.div 
          className="mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-900 mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('mission.historyTitle', 'Наша история')}
          </motion.h2>
          
          <div className="max-w-6xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Линия таймлайна */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              
              {/* Вехи истории */}
              <div className="space-y-12">
                {[0, 1, 2, 3, 4].map((milestone, index) => {
                  const IconComponent = historyIcons[index] || CalendarIcon;
                  const isLeft = index % 2 === 0;
                  
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      viewport={{ once: true, amount: 0.5 }}
                      className={`relative flex items-center ${
                        isLeft ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      {/* Контент */}
                      <div className={`w-1/2 ${isLeft ? 'pr-12' : 'pl-12'}`}>
                        <motion.div 
                          className={`bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group ${
                            activeMilestone === index 
                              ? 'ring-2 ring-blue-500 shadow-xl' 
                              : ''
                          }`}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setActiveMilestone(index)}
                        >
                          <div className="flex items-start space-x-4">
                            <motion.div 
                              className="flex-shrink-0 p-3 bg-blue-100 rounded-xl"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.7 }}
                            >
                              <IconComponent className="h-6 w-6 text-blue-600" />
                            </motion.div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                                {t(`mission.history.milestone${index + 1}.title`, `Веха ${index + 1}`)}
                              </h3>
                              <p className="text-blue-700 leading-relaxed text-sm">
                                {t(`mission.history.milestone${index + 1}.description`, `Описание вехи ${index + 1}`)}
                              </p>
                              <div className="flex items-center mt-3 text-blue-600 text-sm">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>
                                  {t(`mission.history.milestone${index + 1}.year`, `${2000 + index * 5}`)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Точка на линии */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Достижения */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white"
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  {t('mission.achievementsTitle', 'Наши достижения')}
                </h3>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  {t('mission.achievementsSubtitle', 'За годы работы мы достигли значительных результатов')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: '50+', label: t('mission.achievements.programs', 'Образовательных программ') },
                  { number: '1000+', label: t('mission.achievements.students', 'Выпускников') },
                  { number: '200+', label: t('mission.achievements.projects', 'Исследовательских проектов') },
                  { number: '15+', label: t('mission.achievements.partners', 'Партнерских организаций') }
                ].map((achievement, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4"
                  >
                    <motion.div 
                      className="text-3xl md:text-4xl font-bold mb-2"
                      initial={{ y: 20 }}
                      whileInView={{ y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                    >
                      {achievement.number}
                    </motion.div>
                    <div className="text-blue-100 text-sm md:text-base">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          className="mb-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-900 mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('mission.valuesTitle')}
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['education', 'science', 'medicine', 'studentCare'].map((valueKey, index) => {
              const IconComponent = valueIcons[valueKey];
              return (
                <motion.div 
                  key={valueKey}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -15,
                    transition: { duration: 0.3 }
                  }}
                  className={`relative rounded-2xl p-8 text-center cursor-pointer overflow-hidden group ${
                    activeValue === index 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl' 
                      : 'bg-white border border-blue-100 shadow-lg hover:shadow-xl'
                  }`}
                  onClick={() => setActiveValue(index)}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`flex justify-center mb-6 p-4 rounded-2xl inline-block ${
                        activeValue === index 
                          ? 'bg-white/20' 
                          : 'bg-blue-100'
                      }`}
                      whileHover={{ 
                        rotate: 360,
                        transition: { duration: 0.7 }
                      }}
                    >
                      <IconComponent className={`h-10 w-10 ${
                        activeValue === index 
                          ? 'text-white' 
                          : 'text-blue-600'
                      }`} />
                    </motion.div>
                    
                    <h3 className={`text-xl font-semibold mb-4 ${
                      activeValue === index 
                        ? 'text-white' 
                        : 'text-blue-900'
                    }`}>
                      {t(`mission.values.${valueKey}.title`)}
                    </h3>
                    
                    <p className={`leading-relaxed text-sm ${
                      activeValue === index 
                        ? 'text-blue-100' 
                        : 'text-blue-700'
                    }`}>
                      {t(`mission.values.${valueKey}.description`)}
                    </p>
                  </div>
                  
                  {activeValue === index && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Development Priorities */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-10 border border-blue-100 mb-20"
        >
          <motion.h2 
            className="text-4xl font-bold text-center text-blue-900 mb-16"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {t('mission.prioritiesTitle')}
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {t('mission.priorities', { returnObjects: true }).map((priority, index) => {
                const IconComponent = prioritiesIcons[index] || LightBulbIcon;
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                  >
                    <motion.div 
                      className="flex-shrink-0 p-3 bg-blue-100 rounded-xl"
                      whileHover={{ 
                        rotate: 360,
                        transition: { duration: 0.7 }
                      }}
                    >
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <p className="text-blue-800 leading-relaxed group-hover:text-blue-900 transition-colors">
                      {priority}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Mission;