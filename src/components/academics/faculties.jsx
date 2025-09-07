import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Faculties = () => {
  const { t, i18n } = useTranslation();
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [isSticky, setIsSticky] = useState(false);

  // Константные данные программы
  const program = useMemo(() => ({
    id: 1,
    image: '/images/medicine-hero.jpg',
    brochure: '/brochures/medicine.pdf',
    
    curriculum: [
      { semester: 1, credits: 30, subjects: ['Анатомия', 'Биология', 'Химия', 'Латинский язык'] },
      { semester: 2, credits: 32, subjects: ['Гистология', 'Биохимия', 'Физика', 'Философия'] },
      { semester: 3, credits: 34, subjects: ['Физиология', 'Микробиология', 'Патологическая анатомия'] },
      { semester: 4, credits: 36, subjects: ['Фармакология', 'Пропедевтика', 'Иммунология'] },
      { semester: 5, credits: 38, subjects: ['Внутренние болезни', 'Хирургия', 'Педиатрия'] },
      { semester: 6, credits: 40, subjects: ['Акушерство', 'Гинекология', 'Неврология'] }
    ],
    
    careers: [
      { icon: '🏥', key: 'therapist' },
      { icon: '🚑', key: 'emergency' },
      { icon: '🔬', key: 'researcher' },
      { icon: '👨‍⚕️', key: 'surgeon' },
      { icon: '🌡️', key: 'family_doctor' },
      { icon: '📊', key: 'medical_manager' }
    ],
    
    stats: [
      { value: '95%', key: 'employment' },
      { value: '1500+', key: 'clinical_hours' },
      { value: '85%', key: 'scholarship_students' },
      { value: '12', key: 'partners' }
    ]
  }), []);

  const navigationItems = useMemo(() => [
    { id: 'description', key: 'program_description' },
    { id: 'curriculum', key: 'curriculum' },
    { id: 'careers', key: 'career_prospects' }
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleApply = useCallback(() => {
    console.log('Подача заявки на программу');
  }, []);

  const handleDownloadBrochure = useCallback(() => {
    const link = document.createElement('a');
    link.href = program.brochure;
    link.download = 'Брошюра_Лечебное_дело.pdf';
    link.click();
  }, [program.brochure]);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - (window.innerWidth < 768 ? 70 : 100),
        behavior: 'smooth'
      });
    }
  }, []);

  const handleLanguageChange = useCallback((lang) => {
    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 pt-4 md:pt-8">
        <nav className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
          <Link to="/" className="hover:text-blue-600">{t('faculties.breadcrumbs.home')}</Link>
          <span className="mx-1 md:mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">{t('faculties.breadcrumbs.academics')}</Link>
          <span className="mx-1 md:mx-2">→</span>
          <span className="text-gray-800">{t('faculties.breadcrumbs.faculties')}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        {/* Герой-блок */}
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-12 shadow-lg md:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70 z-10"></div>
          <img 
            src={program.image} 
            alt={t('faculties.program.general_medicine')}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
              e.target.className = "w-full h-64 md:h-96 object-cover bg-gradient-to-r from-blue-400 to-indigo-600";
            }}
          />
          <div className="absolute inset-0 z-20 flex items-center p-4 md:p-8">
            <div className="text-white max-w-4xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
                {t('faculties.program.general_medicine')}
              </h1>
              <p className="text-base md:text-xl lg:text-2xl mb-1 md:mb-2 opacity-90">
                {t('faculties.program.medical_faculty')}
              </p>
              <p className="text-sm md:text-lg mb-4 md:mb-8 opacity-80">
                {t('faculties.program.bachelor')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                <button
                  onClick={handleApply}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('faculties.program.apply')}
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="border border-white md:border-2 text-white hover:bg-white hover:text-blue-600 px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('faculties.program.brochure')}
                </button>
              </div>
            </div>
          </div>
        </div>

        

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-12">
          {program.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 text-center shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-lg transition-shadow">
              <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{t(`faculties.stats.${stat.key}`)}</div>
            </div>
          ))}
        </div>

        {/* Основная информация */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-6 mb-6 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            {t('faculties.program.basic_info')}
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4">
            {[
              { key: 'level', value: t('faculties.program.bachelor') },
              { key: 'study_duration', value: t('faculties.program.duration') },
              { key: 'language_of_instruction', value: t('faculties.program.languages') },
              { key: 'tuition_fee', value: t('faculties.program.price') },
              { key: 'study_form', value: t('faculties.program.full_time') },
              { key: 'faculty', value: t('faculties.program.medical_faculty') }
            ].map((item, index) => (
              <div key={index} className="flex justify-between py-2 md:py-3 border-b">
                <span className="font-semibold text-gray-700 text-sm md:text-base">
                  {t(`faculties.program.${item.key}`)}
                </span>
                <span className="text-gray-600 text-sm md:text-base">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Навигация по блокам */}
        <div className={`flex flex-wrap gap-2 mb-4 md:mb-8 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm md:shadow-md ${isSticky && 'sticky top-0 md:top-4 z-10 transition-all duration-300'}`}>
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveAccordion(item.id);
                scrollToSection(item.id);
              }}
              className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg font-semibold transition-all text-xs md:text-sm ${
                activeAccordion === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`faculties.program.${item.key}`)}
            </button>
          ))}
        </div>

        {/* Блоки контента */}
        <div className="space-y-4 md:space-y-8">
          {/* Описание программы */}
          <div id="description" className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              {t('faculties.program.program_description')}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {t('faculties.program.description')}
            </p>
          </div>

          {/* Учебный план */}
          <div id="curriculum" className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              {t('faculties.program.curriculum')}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-lg overflow-hidden text-sm md:text-base">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {t('faculties.program.semester')}
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {t('faculties.program.credits')}
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {t('faculties.program.subjects')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {program.curriculum.map((semester, index) => (
                    <tr key={semester.semester} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-3 py-2 md:px-6 md:py-4 font-medium text-gray-700">{semester.semester}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 text-gray-600">{semester.credits}</td>
                      <td className="px-3 py-2 md:px-6 md:py-4 text-gray-600">
                        <ul className="list-disc list-inside">
                          {semester.subjects.map((subject, idx) => (
                            <li key={idx} className="text-xs md:text-sm">{subject}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Карьерные перспективы */}
          <div id="careers" className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              {t('faculties.program.career_prospects')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {program.careers.map((career, index) => (
                <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-4">{career.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                    {t(`faculties.careers.${career.key}`)}
                  </h4>
                  <p className="text-gray-600 text-xs md:text-sm">
                    {t(`faculties.careers.${career.key}_desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl p-4 md:p-8 text-center text-white mt-6 md:mt-12 shadow-lg md:shadow-xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
            {t('faculties.program.ready_to_start')}
          </h2>
          <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90 max-w-2xl mx-auto">
            {t('faculties.program.join_community')}
          </p>
          <button
            onClick={handleApply}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm md:text-base"
          >
            {t('faculties.program.apply')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-1 md:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Faculties;