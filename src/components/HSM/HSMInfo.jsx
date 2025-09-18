import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { getHSMInfo, getLocalizedText } from '../../data/hsmData';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  DocumentCheckIcon, 
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  BuildingLibraryIcon,
  ClockIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const HSMInfo = () => {
  const { t, i18n } = useTranslation();
  const [hsmInfo, setHsmInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const loadData = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const data = getHSMInfo();
        
        if (!data) {
          throw new Error('Failed to load HSM data');
        }
        
        setHsmInfo(data);
        setLoading(false);
      };
      
      loadData();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const localizedData = useMemo(() => {
    if (!hsmInfo) return null;
    
    return {
      title: getLocalizedText(hsmInfo, 'title', i18n.language),
      description: getLocalizedText(hsmInfo, 'description', i18n.language),
      history: getLocalizedText(hsmInfo, 'history', i18n.language),
      mainDirections: getLocalizedText(hsmInfo, 'main_directions', i18n.language)
    };
  }, [hsmInfo, i18n.language]);

  useEffect(() => {
    if (localizedData?.title) {
      document.title = `${localizedData.title} - Салымбеков Университет`;
    }
  }, [localizedData?.title]);

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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const quickLinks = [
    {
      URL: "https://storage.yandexcloud.net/mdschool1/a1706028859740-picture",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      title: t('hsm.programs', 'Программы'),
      description: t('hsm.view_programs', 'Ознакомьтесь с нашими образовательными программами'),
      color: "blue"
    },
    {
      href: "/hsm/AS",
      icon: <UserGroupIcon className="w-6 h-6" />,
      title: t('hsm.faculty', 'Преподаватели'),
      description: t('hsm.meet_faculty', 'Познакомьтесь с нашими преподавателями'),
      color: "green"
    },
    {
      href: "/hsm/accreditation",
      icon: <DocumentCheckIcon className="w-6 h-6" />,
      title: t('hsm.accreditation', 'Аккредитация'),
      description: t('hsm.view_accreditation', 'Наши аккредитации и сертификаты'),
      color: "purple"
    },
    {
      href: "/hsm/learning-goals",
      icon: <ChartBarIcon className="w-6 h-6" />,
      title: t('hsm.learning_goals', 'Цели обучения'),
      description: t('hsm.view_goals', 'Цели и результаты обучения'),
      color: "orange"
    }
  ];

  const renderFormattedText = (text) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      if (paragraph.trim().startsWith('•')) {
        return (
          <div key={index} className="flex items-start mb-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">{paragraph.replace('•', '').trim()}</span>
          </div>
        );
      }
      
      if (paragraph.trim().endsWith(':')) {
        return (
          <p key={index} className="mb-4 font-semibold text-gray-900 text-lg">
            {paragraph}
          </p>
        );
      }
      
      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-96">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">{t('common.loading', 'Загрузка...')}</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !hsmInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('hsm.error', 'Ошибка')}</h2>
              <p className="text-gray-600 mb-6">{t('hsm.no_data', 'Не удалось загрузить информацию')}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('common.try_again', 'Попробовать снова')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header с фоновым изображением */}
        <motion.div
          className="text-center mb-16 relative overflow-hidden rounded-2xl bg-blue-900 py-16 px-4 shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-600 opacity-90"></div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10">
            <motion.h1 
              className="text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {localizedData.title}
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-white mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-16">
          {/* Description Section с изображением */}
          <motion.section
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-blue-600 rounded-full mr-4"></div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t('hsm.about_hsm', 'О Высшей медицинской школе')}
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {renderFormattedText(localizedData.description)}
                </div>
              </div>
              <div className="md:w-1/3 p-6 flex items-center justify-center bg-blue-50">
              <img src="https://storage.yandexcloud.net/mdschool1/a1706028859740-picture" alt="" />
              </div>
            </div>
          </motion.section>

          {/* History Section с изображением */}
          <motion.section
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <div className="md:flex flex-row-reverse">
              <div className="md:w-2/3 p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-green-600 rounded-full mr-4"></div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t('hsm.history', 'История')}
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {renderFormattedText(localizedData.history)}
                </div>
              </div>
              <div className="md:w-1/3 p-6 flex items-center justify-center bg-green-50">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rembrandt_Harmensz._van_Rijn_007.jpg/250px-Rembrandt_Harmensz._van_Rijn_007.jpg" alt="" />
              </div>
            </div>
          </motion.section>

          {/* Main Directions Section с изображением */}
          <motion.section
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8 md:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-purple-600 rounded-full mr-4"></div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {t('hsm.main_directions', 'Основные направления')}
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {renderFormattedText(localizedData.mainDirections)}
                </div>
              </div>
              <div className="md:w-1/3 p-6 flex items-center justify-center bg-purple-50">
                <img src="https://cf2.ppt-online.org/files2/slide/5/5uVIEeArX2cWFtsiyOSq9hNGfCxK0zMB7gYwDoRZPQ/slide-25.jpg" alt="" />
              </div>
            </div>
          </motion.section>

          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {quickLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 bg-${link.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-${link.color}-200 transition-colors`}>
                  {link.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  {link.title}
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 text-sm">
                  {link.description}
                </p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Стили для фонового паттерна */}
      <style jsx>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default HSMInfo;