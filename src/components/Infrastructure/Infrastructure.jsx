import { useTranslation } from 'react-i18next';
import { Hospital, Microscope, School } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOComponent from '../SEO/SEOComponent';

const Infrastructure = () => {
  const { t, i18n } = useTranslation();

  const getCurrentLanguage = () => {
    return ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  };

  const infrastructureItems = [
    {
      id: 'hospitals',
      title: {
        ru: 'Больницы и клиники',
        kg: 'Ооруканалар жана клиникалар',
        en: 'Hospitals and Clinics'
      },
      description: {
        ru: 'Университетские клиники для практики студентов с современным оборудованием и опытными врачами',
        kg: 'Заманбап жабдыктары жана тажрыйбалуу дарыгерлери бар студенттердин практикасы үчүн университет клиникалары',
        en: 'University clinics for student practice with modern equipment and experienced doctors'
      },
      link: '/infrastructure/hospitals',
      icon: "Hospital",
      stats: { ru: '2 больницы', kg: '2 ооруканалар', en: '2 hospitals' }
    },
    {
      id: 'laboratories',
      title: {
        ru: 'Лаборатории',
        kg: 'Лабораториялар',
        en: 'Laboratories'
      },
      description: {
        ru: 'Современные лаборатории для изучения биохимии, анатомии, фармацевтики и микробиологии',
        kg: 'Биохимия, анатомия, фармацевтика жана микробиологияны изилдөө үчүн заманбап лабораториялар',
        en: 'Modern laboratories for studying biochemistry, anatomy, pharmacy and microbiology'
      },
      link: '/infrastructure/laboratories',
      icon: "Microscope",
      stats: { ru: '4 лаборатории', kg: '4 лабораториялар', en: '4 laboratories' }
    },
    {
      id: 'academic-buildings',
      title: {
        ru: 'Учебные корпуса',
        kg: 'Окуу корпустары',
        en: 'Academic Buildings'
      },
      description: {
        ru: 'Современные учебные корпуса с лекционными залами, аудиториями и библиотеками',
        kg: 'Лекциялык залдары, аудиториялары жана китепканалары бар заманбап окуу корпустары',
        en: 'Modern academic buildings with lecture halls, classrooms and libraries'
      },
      link: '/infrastructure/academic-buildings',
      icon: "School",
      stats: { ru: '4 корпуса', kg: '4 корпус', en: '4 buildings' }
    },
    {
      id: 'dormitories',
      title: {
        ru: 'Общежития',
        kg: 'Жатаканалар',
        en: 'Dormitories'
      },
      description: {
        ru: 'Комфортабельные общежития для студентов с современными удобствами и доступными ценами',
        kg: 'Заманбап ыңгайлуулуктары жана жеткиликтүү баалары бар студенттер үчүн ыңгайлуу жатаканалар',
        en: 'Comfortable dormitories for students with modern amenities and affordable prices'
      },
      link: '/infrastructure/dormitories',
      icon: '🏠',
      stats: { ru: '3 общежития', kg: '3 жатакана', en: '3 dormitories' }
    }
  ];

  const features = [
    {
      title: { ru: 'Современное оборудование', kg: 'Заманбап жабдык', en: 'Modern Equipment' },
      description: { ru: 'Все лаборатории оснащены передовым медицинским оборудованием', kg: 'Бардык лабораториялар передовой медициналык жабдыктар менен жабдылган', en: 'All laboratories equipped with advanced medical equipment' }
    },
    {
      title: { ru: 'Практическое обучение', kg: 'Практикалык окутуу', en: 'Practical Training' },
      description: { ru: 'Возможность работы с реальными пациентами под руководством опытных врачей', kg: 'Тажрыйбалуу дарыгерлердин жетекчилиги астында чыныгы пациенттер менен иштөө мүмкүнчүлүгү', en: 'Opportunity to work with real patients under experienced doctors supervision' }
    },
    {
      title: { ru: 'Доступное проживание', kg: 'Жеткиликтүү жашоо', en: 'Affordable Housing' },
      description: { ru: 'Комфортабельные общежития по доступным ценам для всех студентов', kg: 'Бардык студенттер үчүн жеткиликтүү баада ыңгайлуу жатаканалар', en: 'Comfortable dormitories at affordable prices for all students' }
    }
  ];

  return (
    <>
      <SEOComponent />
      <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('infrastructure.title', 'Инфраструктура университета')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('infrastructure.subtitle', 'Современная образовательная среда для качественной подготовки медицинских специалистов')}
          </p>
        </div>

        {/* Infrastructure Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {infrastructureItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">
              </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title[getCurrentLanguage()]}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description[getCurrentLanguage()]}
                </p>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.stats[getCurrentLanguage()]}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {t('infrastructure.features.title', 'Преимущества нашей инфраструктуры')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {feature.title[getCurrentLanguage()]}
                </h3>
                <p className="text-gray-600">
                  {feature.description[getCurrentLanguage()]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">4</div>
            <div className="text-blue-100">{t('infrastructure.stats.buildings', 'Учебных корпуса')}</div>
          </div>
          <div className="bg-green-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">4</div>
            <div className="text-green-100">{t('infrastructure.stats.laboratories', 'Лаборатории')}</div>
          </div>
          <div className="bg-red-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">2</div>
            <div className="text-red-100">{t('infrastructure.stats.hospitals', 'Больницы')}</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">430</div>
            <div className="text-purple-100">{t('infrastructure.stats.capacity', 'Мест в общежитиях')}</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('infrastructure.contact.title', 'Информация и контакты')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('infrastructure.contact.hospitals', 'Больницы и клиники')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 123-456</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('infrastructure.contact.laboratories', 'Лаборатории')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 123-789</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('infrastructure.contact.buildings', 'Учебные корпуса')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 123-000</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                {t('infrastructure.contact.dormitories', 'Общежития')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 123-456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Infrastructure;