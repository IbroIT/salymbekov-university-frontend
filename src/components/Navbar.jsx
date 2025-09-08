import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logo-salymbekov-university-site.png';
import './Navbar.css';
import RuIcon from "../assets/Ru_icon.svg";
import KgIcon from "../assets/Kg_icon.svg";
import EnIcon from "../assets/En_icon.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [closingMenu, setClosingMenu] = useState(null);
  const { t, i18n } = useTranslation();

  const menuTimeoutRef = useRef(null);
  const navbarRef = useRef(null);
  const currentLanguage = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Обработка клика вне элементов навигации
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setIsLangOpen(false);
        setActiveMenu(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Очищаем таймер при размонтировании
  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) {
        clearTimeout(menuTimeoutRef.current);
      }
    };
  }, []);

  // Языки с иконками
  const languages = [
    { code: 'ru', name: 'Русский', icon: RuIcon },
    { code: 'kg', name: 'Кыргызча', icon: KgIcon },
    { code: 'en', name: 'English', icon: EnIcon },
  ];

  // Получение текущей иконки языка
  const getCurrentLanguageIcon = () => {
    const currentLang = languages.find(lang => lang.code === currentLanguage);
    return currentLang ? currentLang.icon : RuIcon;
  };

  // Структура меню с подразделами
  const menuData = {
    about: {
      title: t('nav.about'),
      submenu: [
        { title: t('nav.about_university'), link: '/about' },
        { title: t('nav.management'), link: '/about/management' },
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
        { title: t('nav.admission_process'), link: '/admissions' },
        { title: t('nav.requirements'), link: '/admissions/requirements' },
        { title: t('nav.tuition'), link: '/admissions/tuition' },
        { title: t('nav.faq'), link: '/admissions/faq' },
        { title: t('nav.apply_online'), link: '/admissions/apply' },
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
      ]
    },
    contacts: {
      title: t('nav.contacts'),
      submenu: [
        { title: t('nav.contacts'), link: '/contacts' }
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

  // Закрытие меню при выборе пункта
  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setActiveMenu(null);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? 'bg-white shadow-lg py-0' : 'bg-white/95 backdrop-blur-sm pt-1'
      }`}
    >
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center transition-transform hover:scale-105">
              <img src={Logo} alt="Salymbekov University" className='navbar-logo h-8 w-auto sm:h-9 md:h-10 xl:w-[150px] xl:h-[35px]'/>
            </a>
          </div>

          {/* Основное меню для десктопа */}
          <div className="navbar-desktop-menu hidden xl:flex xl:items-center xl:space-x-1 flex-1 justify-end ml-8">
            {Object.entries(menuData).map(([key, menu]) => (
              <div 
                key={key}
                className="relative group"
                onMouseEnter={() => handleMenuEnter(key)}
                onMouseLeave={handleMenuLeave}
              >
                <button className="navbar-menu-item px-4 py-2 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors flex items-center whitespace-nowrap group-hover:text-blue-600">
                  {menu.title}
                  <svg className="ml-1 h-4 w-4 flex-shrink-0 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {(activeMenu === key || closingMenu === key) && (
                  <div 
                    className="navbar-menu-dropdown absolute left-0 mt-0 w-56 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                    style={{ 
                      top: '100%',
                      opacity: closingMenu === key ? 0 : 1,
                      transform: closingMenu === key ? 'translateY(-10px)' : 'translateY(0)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease'
                    }}
                  >
                    <div className="py-2" role="menu">
                      {menu.submenu.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
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
          <div className="flex ml-5 items-center space-x-3 flex-shrink-0">
            {/* Переключатель языков */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="navbar-lang-button flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 focus:outline-none rounded-md px-3 py-2 transition-all hover:bg-gray-100"
              >
                <img 
                  src={getCurrentLanguageIcon()} 
                  alt={currentLanguage} 
                  className="w-5 h-5 mr-1 object-contain"
                />
                <span className="navbar-lang-text hidden sm:inline">{currentLanguage.toUpperCase()}</span>
                <svg 
                  className={`ml-1 h-4 w-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {isLangOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                  <div className="py-2" role="menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`flex items-center px-4 py-3 text-sm w-full text-left transition-colors ${
                          currentLanguage === language.code 
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        role="menuitem"
                      >
                        <img 
                          src={language.icon} 
                          alt={language.code} 
                          className="w-5 h-5 mr-3 object-contain"
                        />
                        {language.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Кнопка Подать заявку */}
            <div className="hidden lg:block">
              <a
                href="/admissions/apply"
                className="navbar-apply-button px-5 py-2.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 duration-150 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                {t('nav.apply')}
              </a>
            </div>

            {/* Бургер меню для мобильных и планшетов */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Открыть меню</span>
                <svg
                  className="h-6 w-6 transition-transform duration-300"
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
        <div className="xl:hidden bg-white shadow-lg w-full border-t border-gray-100 animate-slideInDown">
          <div className="px-4 pt-2 pb-3 space-y-1 max-h-[75vh] overflow-y-auto">
            {Object.entries(menuData).map(([key, menu]) => (
              <div key={key} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                  className="w-full flex justify-between items-center px-3 py-4 rounded-md text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-gray-50 transition-colors"
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
                  <div className="pl-6 pb-3 space-y-2 animate-fadeIn">
                    {menu.submenu.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        onClick={handleMenuItemClick}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <a
                href="/admissions/apply"
                className="block w-full px-4 py-3 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center transition-colors shadow-md"
                onClick={handleMenuItemClick}
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