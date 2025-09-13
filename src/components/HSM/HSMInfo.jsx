import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import hsmService from '../../services/hsmService';

const HSMInfo = () => {
  const { t, i18n } = useTranslation();
  const [hsmInfo, setHsmInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback данные для Высшей медицинской школы
  const fallbackData = {
    title: 'Высшая медицинская школа',
    title_en: 'High School of Medicine',
    title_kg: 'Жогорку медициналык мектеп',
    description: `Высшая медицинская школа Салымбекова является ведущим центром подготовки высококвалифицированных медицинских кадров в Кыргызстане. Мы готовим профессиональных врачей, способных эффективно работать в современной медицине.

Наша школа предлагает инновационные образовательные программы, современное оборудование и практическую подготовку в лучших клиниках страны.`,
    description_en: `The High School of Medicine of Salymbekov University is a leading center for training highly qualified medical personnel in Kyrgyzstan. We prepare professional doctors capable of working effectively in modern medicine.

Our school offers innovative educational programs, modern equipment and practical training in the best clinics of the country.`,
    description_kg: `Салымбеков университетинин Жогорку медициналык мектеби Кыргызстанда жогорку квалификациялуу медициналык кадрларды даярдоодо алдыңкы орунда турат. Биз заманбап медицинада натыйжалуу иштей ала турган кесипкөй дарыгерлерди даярдайбыз.

Биздин мектеп инновациялык билим берүү программаларын, заманбап жабдууларды жана өлкөнүн эң мыкты клиникаларында практикалык даярдыкты сунуштайт.`,
    history: `Высшая медицинская школа была основана в 2010 году как специализированное подразделение Салымбекова университета. За годы работы школа подготовила более 500 специалистов в области медицины, многие из которых занимают ведущие позиции в крупных медицинских центрах и государственных учреждениях здравоохранения.`,
    history_en: `The High School of Medicine was established in 2010 as a specialized division of Salymbekov University. Over the years, the school has graduated more than 500 specialists in medicine, many of whom hold leading positions in major medical centers and government healthcare institutions.`,
    history_kg: `Жогорку медициналык мектеп 2010-жылы Салымбеков университетинин адистешкен бөлүмү катары түзүлгөн. Иштеген жылдары мектеп медицина тармагында 500дөн ашык адисти даярдаган, алардын көбү ири медициналык борборлордо жана мамлекеттик саламаттыкты сактоо мекемелеринде жетекчи орундарды ээлешет.`,
    main_directions: `Основные направления деятельности:

• Лечебное дело
• Стоматология  
• Фармация
• Сестринское дело
• Общественное здравоохранение
• Медицинская реабилитация
• Клиническая лабораторная диагностика`,
    main_directions_en: `Main directions of activity:

• General Medicine
• Dentistry
• Pharmacy
• Nursing
• Public Health
• Medical Rehabilitation
• Clinical Laboratory Diagnostics`,
    main_directions_kg: `Ишмердүүлүктүн негизги багыттары:

• Дарылоо иши
• Тиш дарылоо
• Дарылык иш
• Медайым иш
• Коомдук саламаттыкты сактоо
• Медициналык реабилитация
• Клиникалык лабораториялык диагностика`
  };

  useEffect(() => {
    const fetchHSMInfo = async () => {
      try {
        setLoading(true);
        const data = await hsmService.getHSMInfo();
        if (data && data.length > 0) {
          // Если данные из API содержат информацию о менеджменте, используем fallback
          const apiData = data[0];
          if (apiData.title && (apiData.title.includes('менеджмент') || apiData.title.includes('Management'))) {
            setHsmInfo(fallbackData);
          } else {
            setHsmInfo(apiData);
          }
        } else {
          setHsmInfo(fallbackData);
        }
      } catch (err) {
        console.error('Error fetching HSM info:', err);
        // При ошибке API используем fallback данные
        setHsmInfo(fallbackData);
        setError(null); // Не показываем ошибку, так как у нас есть fallback
      } finally {
        setLoading(false);
      }
    };

    fetchHSMInfo();
  }, []);

  // Обновляем заголовок страницы
  useEffect(() => {
    if (hsmInfo) {
      const title = getLocalizedText('title');
      document.title = `${title} - Салымбеков Университет`;
    }
  }, [hsmInfo, i18n.language]);

  const getLocalizedText = (field) => {
    if (!hsmInfo) return '';
    
    switch (i18n.language) {
      case 'kg':
        return hsmInfo[`${field}_kg`] || hsmInfo[field];
      case 'en':
        return hsmInfo[`${field}_en`] || hsmInfo[field];
      default:
        return hsmInfo[field];
    }
  };

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

  if (error || !hsmInfo) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('hsm.error')}</h2>
            <p className="text-gray-600">{error || t('hsm.no_data')}</p>
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
            {getLocalizedText('title')}
          </h1>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Description Section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              {t('hsm.about_hsm', 'О Высшей медицинской школе')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {getLocalizedText('description').split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </motion.div>

          {/* History Section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              {t('hsm.history', 'История')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {getLocalizedText('history').split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </motion.div>

          {/* Main Directions Section */}
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
              {t('hsm.main_directions', 'Основные направления')}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {getLocalizedText('main_directions').split('\n').map((line, index) => {
                if (line.trim().startsWith('•')) {
                  return (
                    <div key={index} className="flex items-start mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>{line.replace('•', '').trim()}</span>
                    </div>
                  );
                } else if (line.trim()) {
                  return (
                    <p key={index} className="mb-4 font-semibold">
                      {line}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="/hsm/programs"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('hsm.programs', 'Программы')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('hsm.view_programs', 'Ознакомьтесь с нашими образовательными программами')}
              </p>
            </a>

            <a
              href="/hsm/AS"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('hsm.faculty', 'Преподаватели')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('hsm.meet_faculty', 'Познакомьтесь с нашими преподавателями')}
              </p>
            </a>

            <a
              href="/hsm/accreditation"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('hsm.accreditation', 'Аккредитация')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('hsm.view_accreditation', 'Наши аккредитации и сертификаты')}
              </p>
            </a>

            <a
              href="/hsm/learning-goals"
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('hsm.learning_goals', 'Цели обучения')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('hsm.view_goals', 'Цели и результаты обучения')}
              </p>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HSMInfo;
