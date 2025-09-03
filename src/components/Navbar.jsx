import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [closingMenu, setClosingMenu] = useState(null);
  const { t, i18n } = useTranslation();

  const menuTimeoutRef = useRef(null);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  // Языки
  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kg', name: 'Кыргызча', flag: '🇰🇬' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  // Структура меню с подразделами
  const menuData = {
    about: {
      title: t('nav.about'),
      submenu: [
        { title: t('nav.about_university'), link: '/about' },
        { title: t('nav.management'), link: '/about/management' },
        { title: t('nav.documents'), link: '/about/documents' },
        { title: t('nav.vacancies'), link: '/about/vacancies' },
        { title: t('nav.partners'), link: '/about/partners' },
      ]
    },
    academics: {
      title: t('nav.academics'),
      submenu: [
        { title: t('nav.programs'), link: '/academics' },
        { title: t('nav.faculties'), link: '/academics/faculties' },
        { title: t('nav.departments'), link: '/academics/departments' },
        { title: t('nav.calendar'), link: '/academics/calendar' },
        { title: t('nav.resources'), link: '/academics/resources' },
      ]
    },
    admission: {
      title: t('nav.admission'),
      submenu: [
        { title: t('nav.admission_process'), link: '/admission' },
        { title: t('nav.requirements'), link: '/admission/requirements' },
        { title: t('nav.tuition'), link: '/admission/tuition' },
        { title: t('nav.scholarships'), link: '/admission/scholarships' },
        { title: t('nav.apply_online'), link: '/admission/apply' },
      ]
    },
    research: {
      title: t('nav.research'),
      submenu: [
        { title: t('nav.research_areas'), link: '/research' },
        { title: t('nav.research_centers'), link: '/research/centers' },
        { title: t('nav.publications'), link: '/research/publications' },
        { title: t('nav.conferences'), link: '/research/conferences' },
        { title: t('nav.grants'), link: '/research/grants' },
      ]
    },
    campus_life: {
      title: t('nav.campus_life'),
      submenu: [
        { title: t('nav.student_life'), link: '/campus-life' },
        { title: t('nav.events'), link: '/campus-life/events' },
        { title: t('nav.clubs'), link: '/campus-life/clubs' },
        { title: t('nav.gallery'), link: '/campus-life/gallery' },
        { title: t('nav.international'), link: '/campus-life/international' },
      ]
    },
    news: {
      title: t('nav.news'),
      submenu: [
        { title: t('nav.all_news'), link: '/news' },
        { title: t('nav.events'), link: '/news/events' },
        { title: t('nav.announcements'), link: '/news/announcements' },
        { title: t('nav.articles'), link: '/news/articles' },
      ]
    },
    contacts: {
      title: t('nav.contacts'),
      submenu: [
        { title: t('nav.contacts'), link: '/contacts' },
        { title: t('nav.admission_office'), link: '/contacts/admission' },
        { title: t('nav.map'), link: '/contacts/map' },
        { title: t('nav.feedback'), link: '/contacts/feedback' },
      ]
    }
  };

  const handleMenuEnter = (menuKey) => {
    // Очищаем предыдущий таймер закрытия
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    
    // Сбрасываем состояние закрытия
    setClosingMenu(null);
    
    // Устанавливаем активное меню
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    // Устанавливаем состояние закрытия
    setClosingMenu(activeMenu);
    
    // Задержка перед закрытием меню
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setClosingMenu(null);
    }, 300); // 300ms задержка
  };

  const handleSubmenuEnter = () => {
    // Очищаем таймер закрытия при наведении на подменю
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
      menuTimeoutRef.current = null;
    }
    setClosingMenu(null);
  };

  const handleSubmenuLeave = () => {
    handleMenuLeave(); // Используем ту же логику закрытия
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                <span className="text-lg">S</span>
              </div>
              <span className="ml-3 text-xl font-bold text-blue-800 hidden md:block">
                Salymbekov <span className="text-blue-600">University</span>
              </span>
            </a>
          </div>

          {/* Основное меню для десктопа */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {Object.entries(menuData).map(([key, menu]) => (
              <div 
                key={key}
                className="relative"
                onMouseEnter={() => handleMenuEnter(key)}
                onMouseLeave={handleMenuLeave}
              >
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  {menu.title}
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {(activeMenu === key || closingMenu === key) && (
                  <div 
                    className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                    style={{ 
                      top: '100%',
                      opacity: closingMenu === key ? 0 : 1,
                      transform: closingMenu === key ? 'translateY(-10px)' : 'translateY(0)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease'
                    }}
                  >
                    <div className="py-1" role="menu">
                      {menu.submenu.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          role="menuitem"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Правая часть: языки и кнопка подать заявку */}
          <div className="flex items-center">
            {/* Переключатель языков */}
            <div className="relative mr-3">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
              >
                <span className="mr-1 text-lg">{languages.find(lang => lang.code === currentLanguage)?.flag || '🇷🇺'}</span>
                <span className="hidden sm:inline">{currentLanguage.toUpperCase()}</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1" role="menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`block px-4 py-2 text-sm w-full text-left ${
                          currentLanguage === language.code 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        role="menuitem"
                      >
                        <span className="mr-2 text-lg">{language.flag}</span>
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Кнопка Подать заявку */}
            <div className="hidden md:block">
              <a
                href="/admission/apply"
                className="ml-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {t('nav.apply')}
              </a>
            </div>

            {/* Бургер меню для мобильных */}
            <div className="lg:hidden flex items-center ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Открыть меню</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню с аккордеоном */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {Object.entries(menuData).map(([key, menu]) => (
              <div key={key} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className="w-full flex justify-between items-center px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <span>{menu.title}</span>
                  <svg 
                    className={`h-4 w-4 transition-transform ${activeMenu === key ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {activeMenu === key && (
                  <div className="pl-6 pb-2 space-y-1">
                    {menu.submenu.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <a
                href="/admission/apply"
                className="block px-3 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.apply')}
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;