import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hospitals = () => {
  const { t, i18n } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('departments');
  const [viewMode, setViewMode] = useState('grid');
  const [expandedHospital, setExpandedHospital] = useState(null);

  useEffect(() => {
    // Используем моковые данные напрямую для простоты
    setHospitals(getMockHospitals());
    setLoading(false);
  }, []);

  const getMockHospitals = () => {
    return [
      {
        id: 1,
        name: {
          ru: "Клиника Салымбеков Университета",
          kg: "Салымбеков университетинин клиникасы",
          en: "Salymbekov University Clinic"
        },
        photo: "/images/hospital1.jpg",
        description: {
          ru: "Главная клиническая база университета для подготовки медицинских кадров",
          kg: "Медициналык кадрларды даярдоо үчүн университеттин негизги клиникалык базасы",
          en: "Main clinical base of the university for medical training"
        },
        departments: [
          {
            name: { ru: "Терапевтическое отделение", kg: "Терапевтикалык бөлүм", en: "Therapeutic Department" },
            description: { ru: "Практика в общей терапии", kg: "Жалпы терапиядагы практика", en: "General therapy practice" },
            icon: "🩺",
            beds: 40,
            doctors: 15
          },
          {
            name: { ru: "Хирургическое отделение", kg: "Хирургиялык бөлүм", en: "Surgical Department" },
            description: { ru: "Работа в операционных", kg: "Операция бөлмөсүндө иштөө", en: "Operating room work" },
            icon: "🔪",
            beds: 30,
            doctors: 12
          },
          {
            name: { ru: "Педиатрическое отделение", kg: "Педиатриялык бөлүм", en: "Pediatric Department" },
            description: { ru: "Работа с детьми", kg: "Балдар менен иштөө", en: "Working with children" },
            icon: "👶",
            beds: 35,
            doctors: 10
          }
        ],
        practiceOpportunities: {
          ru: "Студенты могут участвовать в обходах врачей, наблюдать операции, работать с пациентами под контролем преподавателей",
          kg: "Студенттер дарыгерлердин айланышына катыша алышат, операцияларды көрө алышат, мугалимдердин көзөмөлү астында пациенттер менен иштей алышат",
          en: "Students can participate in medical rounds, observe surgeries, work with patients under supervision"
        },
        address: {
          ru: "г. Бишкек, ул. Медицинская, 1",
          kg: "Бишкек шаары, Медициналык көчөсү, 1",
          en: "Bishkek, Medical Street, 1"
        },
        contact: "+996 312 123-456",
        workingHours: {
          ru: "Круглосуточно, практика: 8:00-16:00",
          kg: "Кун бою, практика: 8:00-16:00",
          en: "24/7, practice: 8:00-16:00"
        },
        totalBeds: 130,
        totalDoctors: 45,
        specialties: ["Терапия", "Хирургия", "Педиатрия", "Кардиология", "Неврология"]
      },
      {
        id: 2,
        name: {
          ru: "Детская клиническая больница",
          kg: "Балдар клиникалык ооруканасы",
          en: "Children's Clinical Hospital"
        },
        photo: "/images/hospital2.jpg",
        description: {
          ru: "Специализированная детская больница для педиатрической практики",
          kg: "Педиатриялык практика үчүн адистештирилген балдар ооруканасы",
          en: "Specialized children's hospital for pediatric practice"
        },
        departments: [
          {
            name: { ru: "Неонатология", kg: "Неонатология", en: "Neonatology" },
            description: { ru: "Работа с новорожденными", kg: "Жаңы төрөлгөн балдар менен иштөө", en: "Working with newborns" },
            icon: "🍼",
            beds: 20,
            doctors: 6
          },
          {
            name: { ru: "Детская хирургия", kg: "Балдар хирургиясы", en: "Pediatric Surgery" },
            description: { ru: "Хирургические вмешательства у детей", kg: "Балдарда хирургиялык кийлигишүүлөр", en: "Surgical interventions in children" },
            icon: "👨‍⚕️",
            beds: 25,
            doctors: 8
          }
        ],
        practiceOpportunities: {
          ru: "Практика по детской медицине, участие в лечении детей различных возрастов",
          kg: "Балдар медицинасы боюнча практика, ар түрдүү курактагы балдарды дарылоого катышуу",
          en: "Pediatric medicine practice, participation in treating children of various ages"
        },
        address: {
          ru: "г. Бишкек, ул. Детская, 15",
          kg: "Бишкек шаары, Балдар көчөсү, 15",
          en: "Bishkek, Children's Street, 15"
        },
        contact: "+996 312 654-321",
        workingHours: {
          ru: "Круглосуточно, практика: 9:00-17:00",
          kg: "Кун бою, практика: 9:00-17:00",
          en: "24/7, practice: 9:00-17:00"
        },
        totalBeds: 85,
        totalDoctors: 26,
        specialties: ["Педиатрия", "Неонатология", "Детская хирургия", "Детская терапия"]
      },
      {
        id: 3,
        name: {
          ru: "Городская клиническая больница №1",
          kg: "Биринчи шаардык клиникалык оорукана",
          en: "City Clinical Hospital No. 1"
        },
        photo: "/images/hospital3.jpg",
        description: {
          ru: "Крупнейшая многопрофильная больница города для комплексной практики",
          kg: "Комплекстүү практика үчүн шаардын эң ири көп тармактуу ооруканасы",
          en: "The largest multidisciplinary city hospital for comprehensive practice"
        },
        departments: [
          {
            name: { ru: "Неврология", kg: "Неврология", en: "Neurology" },
            description: { ru: "Диагностика и лечение заболеваний нервной системы", kg: "Нерв системасынын ооруларын диагноздоо жана дарылоо", en: "Diagnosis and treatment of nervous system diseases" },
            icon: "🧠",
            beds: 35,
            doctors: 10
          },
          {
            name: { ru: "Травматология", kg: "Травматология", en: "Traumatology" },
            description: { ru: "Лечение травм и повреждений опорно-двигательного аппарата", kg: "Сөөк-булчуң системасынын травмаларын жана зыяндарын дарылоо", en: "Treatment of injuries and damage to the musculoskeletal system" },
            icon: "🦴",
            beds: 40,
            doctors: 12
          },
          {
            name: { ru: "Гинекология", kg: "Гинекология", en: "Gynecology" },
            description: { ru: "Лечение заболеваний женской репродуктивной системы", kg: "Аялдардын репродуктивдик системасынын ооруларын дарылоо", en: "Treatment of diseases of the female reproductive system" },
            icon: "🌸",
            beds: 30,
            doctors: 9
          }
        ],
        practiceOpportunities: {
          ru: "Широкая практика по различным медицинским специальностям, работа в отделениях интенсивной терапии",
          kg: "Ар түрдүү медициналык адистиктер боюнча кеңири практика, интенсивдик дарылоо бөлүмдөрүндө иштөө",
          en: "Extensive practice in various medical specialties, work in intensive care units"
        },
        address: {
          ru: "г. Бишкек, ул. Центральная, 25",
          kg: "Бишкек шаары, Борбордук көчө, 25",
          en: "Bishkek, Central Street, 25"
        },
        contact: "+996 312 789-012",
        workingHours: {
          ru: "Круглосуточно, практика: 8:00-18:00",
          kg: "Кун бою, практика: 8:00-18:00",
          en: "24/7, practice: 8:00-18:00"
        },
        totalBeds: 250,
        totalDoctors: 85,
        specialties: ["Неврология", "Травматология", "Гинекология", "Терапия", "Хирургия", "Кардиология"]
      }
    ];
  };

  const getCurrentLanguage = () => {
    return ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  };

  // Helper function to get translated field value
  const getTranslatedField = (obj, fieldPrefix) => {
    const lang = getCurrentLanguage();
    if (obj[`${fieldPrefix}_${lang}`]) return obj[`${fieldPrefix}_${lang}`];
    if (obj[fieldPrefix] && typeof obj[fieldPrefix] === 'object' && obj[fieldPrefix][lang]) {
      return obj[fieldPrefix][lang];
    }
    if (obj[fieldPrefix] && typeof obj[fieldPrefix] === 'object' && obj[fieldPrefix]['ru']) {
      return obj[fieldPrefix]['ru'];
    }
    return obj[fieldPrefix] || '';
  };

  const toggleHospitalDetails = (hospitalId) => {
    if (expandedHospital === hospitalId) {
      setExpandedHospital(null);
      setSelectedHospital(null);
    } else {
      setExpandedHospital(hospitalId);
      setSelectedHospital(hospitalId);
      setActiveTab('departments');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('hospitals.title', 'Больницы и клиники')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('hospitals.subtitle', 'Клинические базы для практической подготовки студентов-медиков')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="bg-white rounded-lg p-1 shadow-md flex">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.length}</div>
              <div className="text-sm opacity-90">{t('hospitals.hospitals', 'Больниц')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.reduce((sum, h) => sum + (h.totalBeds || 0), 0)}</div>
              <div className="text-sm opacity-90">{t('hospitals.beds', 'Коечных мест')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.reduce((sum, h) => sum + (h.totalDoctors || 0), 0)}</div>
              <div className="text-sm opacity-90">{t('hospitals.doctors', 'Врачей')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{hospitals.reduce((sum, h) => sum + (h.departments?.length || 0), 0)}</div>
              <div className="text-sm opacity-90">{t('hospitals.departments', 'Отделений')}</div>
            </div>
          </div>
        </div>

        {/* Hospitals Grid/List View */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 gap-6' : 'space-y-6'}>
          {hospitals.map((hospital) => (
            <div 
              key={hospital.id} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${expandedHospital === hospital.id ? 'ring-2 ring-blue-500' : ''}`}
            >
              <div className={viewMode === 'list' ? 'flex' : ''}>
                <div className={viewMode === 'list' ? 'w-1/3' : ''}>
                  <div className="relative">
                    <img
                      src={hospital.photo || `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(getTranslatedField(hospital, 'name'))}`}
                      alt={getTranslatedField(hospital, 'name')}
                      className={`w-full ${viewMode === 'list' ? 'h-48' : 'h-48'} object-cover`}
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                      {hospital.totalBeds || 0} {t('hospitals.bedsShort', 'коек')}
                    </div>
                  </div>
                </div>
                
                <div className={viewMode === 'list' ? 'w-2/3 p-5' : 'p-5'}>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {getTranslatedField(hospital, 'name')}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {getTranslatedField(hospital, 'description')}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="truncate">{getTranslatedField(hospital, 'address')}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleHospitalDetails(hospital.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      {expandedHospital === hospital.id
                        ? t('hospitals.hideDetails', 'Скрыть детали')
                        : t('hospitals.showDetails', 'Подробнее')
                      }
                      <svg className={`w-4 h-4 ml-1 transform ${expandedHospital === hospital.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <a 
                      href={`tel:${hospital.contact}`}
                      className="text-gray-500 hover:text-blue-600 flex items-center"
                      title={t('hospitals.call', 'Позвонить')}
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {hospital.contact}
                    </a>
                  </div>
                </div>
              </div>

              {/* Expanded Details - Fixed to properly display */}
              {expandedHospital === hospital.id && (
                <div className="border-t border-gray-100 p-5 animate-fadeIn">
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'departments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('departments')}
                    >
                      {t('hospitals.departments', 'Отделения')}
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'practice' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('practice')}
                    >
                      {t('hospitals.practice', 'Практика')}
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'info' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
                      onClick={() => setActiveTab('info')}
                    >
                      {t('hospitals.info', 'Информация')}
                    </button>
                  </div>

                  {activeTab === 'departments' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      {hospital.departments.map((dept, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start">
                          <span className="text-2xl mr-3">{dept.icon || '🏥'}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {getTranslatedField(dept, 'name')}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {getTranslatedField(dept, 'description')}
                            </p>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                              <span>{dept.beds} {t('hospitals.bedsShort', 'коек')}</span>
                              <span>{dept.doctors} {t('hospitals.doctorsShort', 'врачей')}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'practice' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.practiceOpportunities', 'Возможности для практики')}
                        </h3>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-gray-700">
                            {getTranslatedField(hospital, 'practice_opportunities') ||
                              (hospital.practiceOpportunities && hospital.practiceOpportunities[getCurrentLanguage()]) ||
                              t('hospitals.defaultPractice', 'Возможности для практики в данной больнице')}
                          </p>
                        </div>

                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            {t('hospitals.practiceFeatures', 'Особенности практики')}
                          </h4>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature1', 'Работа с реальными пациентами')}
                            </li>
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature2', 'Наблюдение операций')}
                            </li>
                            <li className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {t('hospitals.feature3', 'Супервизия опытных врачей')}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.specialties', 'Специализации')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {hospital.specialties?.map((specialty, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'info' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.contactInfo', 'Контактная информация')}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{getTranslatedField(hospital, 'address')}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{hospital.contact}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{getTranslatedField(hospital, 'workingHours')}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                          {t('hospitals.statistics', 'Статистика')}
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-blue-600">{hospital.totalBeds || 0}</div>
                            <div className="text-sm text-gray-600">{t('hospitals.beds', 'Коечных мест')}</div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg text-center">
                            <div className="text-xl font-bold text-green-600">{hospital.totalDoctors || 0}</div>
                            <div className="text-sm text-gray-600">{t('hospitals.doctors', 'Врачей')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Practice Information */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">
              {t('hospitals.practiceInfo', 'Информация о практике')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('hospitals.schedule', 'График практики')}
                </h3>
                <p>{t('hospitals.scheduleText', 'Практика проводится согласно учебному плану, обычно 4-6 часов в день')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t('hospitals.requirements', 'Требования')}
                </h3>
                <p>{t('hospitals.requirementsText', 'Медицинская книжка, белый халат, сменная обувь, студенческий билет')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('hospitals.duration', 'Продолжительность')}
                </h3>
                <p>{t('hospitals.durationText', 'От 2 недель до 2 месяцев в зависимости от курса и специализации')}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {t('hospitals.coordination', 'Координация')}
                </h3>
                <p>{t('hospitals.coordinationText', 'Практика организуется деканатом совместно с администрацией больниц')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Hospitals;