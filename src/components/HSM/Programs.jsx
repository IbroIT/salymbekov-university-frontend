import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import hsmService from '../../services/hsmService';

const ProgramCard = ({ program, language }) => {
  const { t } = useTranslation();
  
  const getName = () => {
    switch (language) {
      case 'kg':
        return program.name_kg || program.name;
      case 'en':
        return program.name_en || program.name;
      default:
        return program.name;
    }
  };

  const getDescription = () => {
    switch (language) {
      case 'kg':
        return program.description_kg || program.description;
      case 'en':
        return program.description_en || program.description;
      default:
        return program.description;
    }
  };

  const getCompetencies = () => {
    switch (language) {
      case 'kg':
        return program.competencies_kg || program.competencies;
      case 'en':
        return program.competencies_en || program.competencies;
      default:
        return program.competencies;
    }
  };

  const getCareerProspects = () => {
    switch (language) {
      case 'kg':
        return program.career_prospects_kg || program.career_prospects;
      case 'en':
        return program.career_prospects_en || program.career_prospects;
      default:
        return program.career_prospects;
    }
  };

  const getProgramTypeColor = () => {
    switch (program.program_type) {
      case 'bachelor':
        return 'bg-blue-100 text-blue-800';
      case 'master':
        return 'bg-green-100 text-green-800';
      case 'phd':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProgramTypeColor()}`}>
            {program.program_type_display}
          </span>
          <div className="text-right text-sm text-gray-600">
            <div>{program.duration_years} {t('hsm.years', 'лет')}</div>
            <div>{program.study_form_display}</div>
          </div>
        </div>

        {/* Program Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {getName()}
        </h3>

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
      </div>
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
  const [error, setError] = useState(null);

  // Fallback данные для медицинских программ
  const fallbackBachelorPrograms = [
    {
      id: 1,
      name: 'Лечебное дело',
      name_en: 'General Medicine',
      name_kg: 'Дарылоо иши',
      description: 'Фундаментальная подготовка врачей общей практики с глубокими знаниями в области диагностики, лечения и профилактики заболеваний.',
      description_en: 'Fundamental training of general practitioners with deep knowledge in the field of diagnosis, treatment and disease prevention.',
      description_kg: 'Диагностика, дарылоо жана ооруларды алдын алуу тармагында терең билимдери бар жалпы практика дарыгерлерин негизги даярдоо.',
      competencies: 'Клиническое мышление, диагностические навыки, навыки оказания неотложной помощи, работа с пациентами',
      competencies_en: 'Clinical thinking, diagnostic skills, emergency care skills, patient care',
      competencies_kg: 'Клиникалык ой жүгүртүү, диагностикалык көндүмдөр, шашылыш жардам көрсөтүү көндүмдөрү, бейтаптар менен иштөө',
      career_prospects: 'Врач-терапевт, семейный врач, специализация в узких областях медицины',
      career_prospects_en: 'General practitioner, family doctor, specialization in narrow fields of medicine',
      career_prospects_kg: 'Дарыгер-терапевт, үй-бүлө дарыгери, медицинанын тар чөйрөлөрүндө адистешүү',
      program_type: 'bachelor',
      program_type_display: 'Бакалавриат',
      duration_years: 6,
      study_form_display: 'Очная форма'
    },
    {
      id: 2,
      name: 'Педиатрия',
      name_en: 'Pediatrics',
      name_kg: 'Педиатрия',
      description: 'Специализированная подготовка врачей для работы с детьми от рождения до совершеннолетия.',
      description_en: 'Specialized training of doctors to work with children from birth to adulthood.',
      description_kg: 'Балдарды төрөлгөндөн баштап жетилүү курагына чейин дарылоо үчүн дарыгерлерди адистештирилген даярдоо.',
      competencies: 'Детская анатомия и физиология, педиатрическая фармакология, вакцинация, развитие ребенка',
      competencies_en: 'Pediatric anatomy and physiology, pediatric pharmacology, vaccination, child development',
      competencies_kg: 'Балдар анатомиясы жана физиологиясы, педиатриялык фармакология, эмдөө, баланын өнүгүүсү',
      career_prospects: 'Врач-педиатр, детский специалист, научная деятельность в области педиатрии',
      career_prospects_en: 'Pediatrician, pediatric specialist, research in pediatrics',
      career_prospects_kg: 'Дарыгер-педиатр, балдар адиси, педиатрия тармагындагы илимий ишмердик',
      program_type: 'bachelor',
      program_type_display: 'Бакалавриат',
      duration_years: 6,
      study_form_display: 'Очная форма'
    }
  ];

  const fallbackMasterPrograms = [
    {
      id: 3,
      name: 'Общественное здравоохранение',
      name_en: 'Public Health',
      name_kg: 'Коомдук саламаттык сактоо',
      description: 'Подготовка специалистов для работы в системе общественного здравоохранения, эпидемиологии и управления здравоохранением.',
      description_en: 'Training specialists to work in public health, epidemiology and health management.',
      description_kg: 'Коомдук саламаттык сактоо, эпидемиология жана саламаттык сактоону башкаруу системасында иштөө үчүн адистерди даярдоо.',
      competencies: 'Эпидемиологический анализ, управление системами здравоохранения, профилактическая медицина',
      competencies_en: 'Epidemiological analysis, healthcare systems management, preventive medicine',
      competencies_kg: 'Эпидемиологиялык талдоо, саламаттык сактоо системаларын башкаруу, алдын алуу медицинасы',
      career_prospects: 'Эпидемиолог, руководитель медицинских учреждений, консультант по общественному здоровью',
      career_prospects_en: 'Epidemiologist, medical institution manager, public health consultant',
      career_prospects_kg: 'Эпидемиолог, медициналык мекемелердин жетекчиси, коомдук саламаттык боюнча консультант',
      program_type: 'master',
      program_type_display: 'Магистратура',
      duration_years: 2,
      study_form_display: 'Очная форма'
    },
    {
      id: 4,
      name: 'Клиническая медицина',
      name_en: 'Clinical Medicine',
      name_kg: 'Клиникалык медицина',
      description: 'Углубленная подготовка врачей-клиницистов для работы в специализированных отделениях.',
      description_en: 'Advanced training of clinical doctors to work in specialized departments.',
      description_kg: 'Адистештирилген бөлүмдөрдө иштөө үчүн дарыгер-клиницисттерди тереңдетилген даярдоо.',
      competencies: 'Продвинутая диагностика, современные методы лечения, научно-исследовательская деятельность',
      competencies_en: 'Advanced diagnostics, modern treatment methods, research activities',
      competencies_kg: 'Өнүккөн диагностика, заманбап дарылоо ыкмалары, илимий-изилдөө ишмердиги',
      career_prospects: 'Врач-специалист, научный сотрудник, преподаватель медицинского вуза',
      career_prospects_en: 'Medical specialist, researcher, medical university teacher',
      career_prospects_kg: 'Дарыгер-адис, илимий кызматкер, медициналык жогорку окуу жайынын мугалими',
      program_type: 'master',
      program_type_display: 'Магистратура',
      duration_years: 2,
      study_form_display: 'Очная форма'
    }
  ];

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        
        // Fetch bachelor and master programs using the service
        const [bachelorData, masterData] = await Promise.all([
          hsmService.getBachelorPrograms(),
          hsmService.getMasterPrograms()
        ]);
        
        // Используем fallback если нет данных
        setBachelorPrograms(bachelorData?.length ? bachelorData : fallbackBachelorPrograms);
        setMasterPrograms(masterData?.length ? masterData : fallbackMasterPrograms);
      } catch (err) {
        console.error('Error fetching programs:', err);
        // При ошибке используем fallback данные
        setBachelorPrograms(fallbackBachelorPrograms);
        setMasterPrograms(fallbackMasterPrograms);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('hsm.error')}</h2>
            <p className="text-gray-600">{error}</p>
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
            {t('hsm.programs_title', 'Образовательные программы')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hsm.programs_description', 'Современные образовательные программы Высшей медицинской школы для подготовки квалифицированных медицинских специалистов')}
          </p>
        </motion.div>

        {/* Bachelor Programs */}
        <ProgramSection
          title={t('hsm.bachelor_programs', 'Программы бакалавриата')}
          programs={bachelorPrograms}
          language={i18n.language}
        />

        {/* Master Programs */}
        <ProgramSection
          title={t('hsm.master_programs', 'Программы магистратуры')}
          programs={masterPrograms}
          language={i18n.language}
        />

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
