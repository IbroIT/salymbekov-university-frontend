import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Faculties = () => {
  const [activeAccordion, setActiveAccordion] = useState('description');
  const [language, setLanguage] = useState('ru');
  const [isSticky, setIsSticky] = useState(false);

  // Моковые данные программы
  const program = {
    id: 1,
    title: {
      ru: 'Лечебное дело',
      kg: 'Дарылоо иши',
      en: 'General Medicine'
    },
    faculty: {
      ru: 'Медицинский факультет',
      kg: 'Медицина факультети',
      en: 'Medical Faculty'
    },
    educationLevel: {
      ru: 'Бакалавриат',
      kg: 'Бакалавриат',
      en: 'Bachelor'
    },
    duration: {
      ru: '5-6 лет',
      kg: '5-6 жыл',
      en: '5-6 years'
    },
    languages: ['Русский', 'Английский', 'Кыргызский'],
    studyForm: {
      ru: 'Очная',
      kg: 'Күнүмдүк',
      en: 'Full-time'
    },
    price: {
      ru: '85,000 сом/семестр',
      kg: '85,000 сом/семестр',
      en: '85,000 KGS/semester'
    },
    image: '/images/medicine-hero.jpg',
    brochure: '/brochures/medicine.pdf',
    
    description: {
      ru: `Программа "Лечебное дело" готовит высококвалифицированных врачей общей практики. 
      Студенты получают фундаментальные знания в области медицины, клинические навыки и практический опыт. 
      Программа аккредитована международными медицинскими организациями и соответствует мировым стандартам.`,
      kg: `"Дарылоо иши" программасы жогорку квалификациялуу жалпы практика дарыгерлерин даярдайт. 
      Студенттер медицина тармагында негизги билимдерди, клиникалык көндүмдөрдү жана практикалык тажрыйбаны алышат. 
      Программа эларалык медициналык уюмдар тарабынан аккредитацияланган жана дүйнөлүк стандарттарга туура келет.`,
      en: `The "General Medicine" program trains highly qualified general practitioners. 
      Students gain fundamental knowledge in the field of medicine, clinical skills and practical experience. 
      The program is accredited by international medical organizations and meets world standards.`
    },
    
    curriculum: [
      { semester: 1, credits: 30, subjects: ['Анатомия', 'Биология', 'Химия', 'Латинский язык'] },
      { semester: 2, credits: 32, subjects: ['Гистология', 'Биохимия', 'Физика', 'Философия'] },
      { semester: 3, credits: 34, subjects: ['Физиология', 'Микробиология', 'Патологическая анатомия'] },
      { semester: 4, credits: 36, subjects: ['Фармакология', 'Пропедевтика', 'Иммунология'] },
      { semester: 5, credits: 38, subjects: ['Внутренние болезни', 'Хирургия', 'Педиатрия'] },
      { semester: 6, credits: 40, subjects: ['Акушерство', 'Гинекология', 'Неврология'] }
    ],
    
    careers: [
      { icon: '🏥', title: {
        ru: 'Врач-терапевт', 
        kg: 'Терапевт дарыгер',
        en: 'Therapist'
      }, description: {
        ru: 'Работа в поликлиниках и больницах', 
        kg: 'Поликлиникаларда жана ооруканаларда иштөө',
        en: 'Work in clinics and hospitals'
      }},
      { icon: '🚑', title: {
        ru: 'Скорая помощь', 
        kg: 'Тезик жардам',
        en: 'Emergency medicine'
      }, description: {
        ru: 'Экстренная медицинская помощь', 
        kg: 'Оор абалдагы медициналык жардам',
        en: 'Emergency medical care'
      }},
      { icon: '🔬', title: {
        ru: 'Исследователь', 
        kg: 'Изилдөөчү',
        en: 'Researcher'
      }, description: {
        ru: 'Научная работа в медицинских институтах', 
        kg: 'Медициналык институттарда илимий иш',
        en: 'Research work in medical institutes'
      }},
      { icon: '👨‍⚕️', title: {
        ru: 'Хирург', 
        kg: 'Хирург',
        en: 'Surgeon'
      }, description: {
        ru: 'Операционная деятельность', 
        kg: 'Операциялык ишмердик',
        en: 'Operating activities'
      }},
      { icon: '🌡️', title: {
        ru: 'Семейный врач', 
        kg: 'Үй-бүлөлүк дарыгер',
        en: 'Family doctor'
      }, description: {
        ru: 'Первичная медицинская помощь', 
        kg: 'Биринчи медициналык жардам',
        en: 'Primary health care'
      }},
      { icon: '📊', title: {
        ru: 'Медменеджер', 
        kg: 'Медициналык менеджер',
        en: 'Medical manager'
      }, description: {
        ru: 'Управление медицинскими учреждениями', 
        kg: 'Медициналык мекемелерди башкаруу',
        en: 'Management of medical institutions'
      }}
    ],
    
    stats: [
      { value: '95%', label: {
        ru: 'Трудоустройство выпускников', 
        kg: 'Бүтүрүүчүлөрдү ишке орношу',
        en: 'Graduate employment'
      }},
      { value: '1500+', label: {
        ru: 'Клинических часов', 
        kg: 'Клиникалык сааттар',
        en: 'Clinical hours'
      }},
      { value: '85%', label: {
        ru: 'Студентов с стипендией', 
        kg: 'Стипендиялуу студенттер',
        en: 'Students with scholarships'
      }},
      { value: '12', label: {
        ru: 'Международных партнеров', 
        kg: 'Эларалык өнөктөштөр',
        en: 'International partners'
      }}
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleApply = () => {
    // Логика подачи заявки
    console.log('Подача заявки на программу');
  };

  const handleDownloadBrochure = () => {
    // Логика скачивания брошюры
    const link = document.createElement('a');
    link.href = program.brochure;
    link.download = 'Брошюра_Лечебное_дело.pdf';
    link.click();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - (window.innerWidth < 768 ? 70 : 100),
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 pt-4 md:pt-8">
        <nav className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-1 md:mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-1 md:mx-2">→</span>
          <span className="text-gray-800">Факультеты</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-8 md:pb-16">
        {/* Герой-блок */}
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-12 shadow-lg md:shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70 z-10"></div>
          <img 
            src={program.image} 
            alt={program.title[language]}
            className="w-full h-64 md:h-96 object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=';
              e.target.className = "w-full h-64 md:h-96 object-cover bg-gradient-to-r from-blue-400 to-indigo-600";
            }}
          />
          <div className="absolute inset-0 z-20 flex items-center p-4 md:p-8">
            <div className="text-white max-w-4xl">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{program.title[language]}</h1>
              <p className="text-base md:text-xl lg:text-2xl mb-1 md:mb-2 opacity-90">{program.faculty[language]}</p>
              <p className="text-sm md:text-lg mb-4 md:mb-8 opacity-80">{program.educationLevel[language]}</p>
              
              <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
                <button
                  onClick={handleApply}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {language === 'ru' ? 'Подать заявку' : language === 'kg' ? 'Өтүнүч берүү' : 'Apply now'}
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="border border-white md:border-2 text-white hover:bg-white hover:text-blue-600 px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-colors flex items-center justify-center text-sm md:text-base"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {language === 'ru' ? 'Брошюра' : language === 'kg' ? 'Брошюра' : 'Brochure'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Переключатель языков */}
        <div className="flex justify-end mb-4 md:mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['ru', 'kg', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm font-medium transition-colors ${
                  language === lang 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-12">
          {program.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg md:rounded-xl p-3 md:p-6 text-center shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-lg transition-shadow">
              <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">{stat.label[language]}</div>
            </div>
          ))}
        </div>

        {/* Основная информация в таблице */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-6 mb-6 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            {language === 'ru' ? 'Основная информация' : language === 'kg' ? 'Негизги маалымат' : 'Basic Information'}
          </h2>
          <div className="grid grid-cols-1 gap-2 md:gap-4">
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Уровень' : language === 'kg' ? 'Деңгээл' : 'Level'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.educationLevel[language]}</span>
            </div>
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Длительность' : language === 'kg' ? 'Узактыгы' : 'Duration'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.duration[language]}</span>
            </div>
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Язык обучения' : language === 'kg' ? 'Окутуу тили' : 'Language of instruction'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.languages.join(', ')}</span>
            </div>
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Стоимость' : language === 'kg' ? 'Баасы' : 'Tuition fee'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.price[language]}</span>
            </div>
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Форма обучения' : language === 'kg' ? 'Окутуу формасы' : 'Study form'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.studyForm[language]}</span>
            </div>
            <div className="flex justify-between py-2 md:py-3 border-b">
              <span className="font-semibold text-gray-700 text-sm md:text-base">
                {language === 'ru' ? 'Факультет' : language === 'kg' ? 'Факультет' : 'Faculty'}
              </span>
              <span className="text-gray-600 text-sm md:text-base">{program.faculty[language]}</span>
            </div>
          </div>
        </div>

        {/* Навигация по блокам */}
        <div className={`flex flex-wrap gap-2 mb-4 md:mb-8 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm md:shadow-md ${isSticky && 'sticky top-0 md:top-4 z-10 transition-all duration-300'}`}>
          {[
            { id: 'description', label: {
              ru: 'Описание', 
              kg: 'Сүрөттөлүш',
              en: 'Description'
            }},
            { id: 'curriculum', label: {
              ru: 'Учебный план', 
              kg: 'Окуу планы',
              en: 'Curriculum'
            }},
            { id: 'careers', label: {
              ru: 'Карьера', 
              kg: 'Карьера',
              en: 'Careers'
            }}
          ].map((item) => (
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
              {item.label[language]}
            </button>
          ))}
        </div>

        {/* Блоки контента */}
        <div className="space-y-4 md:space-y-8">
          {/* Описание программы */}
          <div id="description" className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              {language === 'ru' ? 'Описание программы' : language === 'kg' ? 'Программанын сүрөттөлүшү' : 'Program description'}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-lg whitespace-pre-line">
              {program.description[language]}
            </p>
          </div>

          {/* Учебный план */}
          <div id="curriculum" className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-md p-4 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
              {language === 'ru' ? 'Учебный план' : language === 'kg' ? 'Окуу планы' : 'Curriculum'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left rounded-lg overflow-hidden text-sm md:text-base">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {language === 'ru' ? 'Семестр' : language === 'kg' ? 'Семестр' : 'Semester'}
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {language === 'ru' ? 'Кредиты' : language === 'kg' ? 'Кредиттер' : 'Credits'}
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-4 font-semibold">
                      {language === 'ru' ? 'Дисциплины' : language === 'kg' ? 'Дисциплиналар' : 'Subjects'}
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
              {language === 'ru' ? 'Карьерные перспективы' : language === 'kg' ? 'Карьералык перспективалар' : 'Career prospects'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {program.careers.map((career, index) => (
                <div key={index} className="text-center p-4 md:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg md:rounded-xl hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-4">{career.icon}</div>
                  <h4 className="font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">{career.title[language]}</h4>
                  <p className="text-gray-600 text-xs md:text-sm">{career.description[language]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Призыв к действию */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl md:rounded-2xl p-4 md:p-8 text-center text-white mt-6 md:mt-12 shadow-lg md:shadow-xl">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4">
            {language === 'ru' ? 'Готовы начать свой путь в медицине?' : language === 'kg' ? 'Медицина жолун баштоого дайынысызбы?' : 'Ready to start your journey in medicine?'}
          </h2>
          <p className="text-sm md:text-lg mb-4 md:mb-6 opacity-90 max-w-2xl mx-auto">
            {language === 'ru' ? 'Присоединяйтесь к нашим студентам и станьте частью сообщества будущих медицинских professionals' : 
             language === 'kg' ? 'Студенттерибизге кошулуп, келечектеги медициналык адистер коомунун бир бөлүгү болуңуз' : 
             'Join our students and become part of the community of future medical professionals'}
          </p>
          <button
            onClick={handleApply}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center text-sm md:text-base"
          >
            {language === 'ru' ? 'Подать заявку' : language === 'kg' ? 'Өтүнүч берүү' : 'Apply now'}
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