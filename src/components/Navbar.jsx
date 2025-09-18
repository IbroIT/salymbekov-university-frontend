import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/logo-salymbekov-university-site.jpg';
import './Navbar.css';
import RuIcon from "../assets/Ru_icon.svg";
import KgIcon from "../assets/Kg_icon.svg";
import EnIcon from "../assets/En_icon.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopBurgerOpen, setIsDesktopBurgerOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation();
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

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setIsLangOpen(false);
        setIsDesktopBurgerOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
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
        { title: t('nav.mission'), link: '/about/mission' },
        { title: t('nav.regulations'), link: '/about/regulations' },
      ]
    },
    HSM: {
      title: t('nav.HSM'),
      submenu: [
        { title: t('nav.about_HSM'), link: '/hsm/about' },
        { title: t('nav.programs'), link: '/hsm/programs' },
        { title: t('nav.faculties'), link: '/hsm/faculties' },
        { title: t('nav.academic_stuff'), link: '/hsm/AS' },
        { title: t('nav.accreditation'), link: '/hsm/accreditation' },
        { title: t('nav.learning_goals'), link: '/hsm/learning-goals' },
        { title: t('nav.faculties'), link: '/hsm/faculties' },
        { title: t('nav.departments'), link: '/hsm/departments' },
        { title: t('nav.calendar'), link: '/hsm/calendar' },
        { title: t('nav.resources'), link: '/hsm/resources' },
      ]
    },
    admission: {
      title: t('nav.admission'),
      submenu: [
        { 
          title: t('nav.for_applicants'), 
          link: '/admissions/applicants',
          subitems: [
            { title: t('nav.for_citizens_kg'), link: '/admissions/applicants/citizens-kg' },
            { title: t('nav.for_foreign_citizens'), link: '/admissions/applicants/foreign-citizens' },
          ]
        },
        { 
          title: t('nav.requirements'), 
          link: '/admissions/requirements',
          subitems: [
            { title: t('nav.for_citizens_kg'), link: '/admissions/requirements/citizens-kg' },
            { title: t('nav.for_foreign_citizens'), link: '/admissions/requirements/foreign-citizens' },
          ]
        },
        { 
          title: t('nav.apply_online'), 
          link: '/admissions/apply',
          subitems: [
            { title: t('nav.for_citizens_kg'), link: '/admissions/apply/citizens-kg' },
            { title: t('nav.for_foreign_citizens'), link: '/admissions/apply/foreign-citizens' },
          ]
        },
        { 
          title: t('nav.tuition'), 
          link: '/admissions/tuition',
          subitems: [
            { title: t('nav.for_citizens_kg'), link: '/admissions/tuition/citizens-kg' },
            { title: t('nav.for_foreign_citizens'), link: '/admissions/tuition/foreign-citizens' },
          ]
        },
        { title: t('nav.admission_process'), link: '/admissions/process' },
        { title: t('nav.faq'), link: '/admissions/faq' },
      ]
    },
    infrastructure: {
      title: t('nav.infrastructure'),
      submenu: [
        { title: t('nav.hospitals'), link: '/infrastructure/hospitals' },
        { title: t('nav.laboratories'), link: '/infrastructure/laboratories' },
        { title: t('nav.academic_buildings'), link: '/infrastructure/academic-buildings' },
        { title: t('nav.dormitories'), link: '/infrastructure/dormitories' },
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
        { title: t('nav.management_body'), link: '/research/management' },
        { title: t('nav.scientific_journals'), link: '/research/journals' },
      ]
    },
    student: {
      title: t('nav.student'),
      submenu: [
        { title: t('nav.student_life'), link: '/student' },
        { title: t('nav.clubs'), link: '/student/clubs' },
        { title: t('nav.gallery'), link: '/student/gallery' },
        { title: t('nav.international'), link: '/student/international' },
        { title: t('nav.internships'), link: '/student/internships' },
        { title: t('nav.academic_mobility'), link: '/student/academic-mobility' },
        { title: t('nav.regulations'), link: '/student/regulations' },
        { title: t('nav.instructions'), link: '/student/instructions' },
        { title: t('nav.appeal_form'), link: '/student/appeal' },
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

  const handleDropdownToggle = (menuKey) => {
    if (activeDropdown === menuKey) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    } else {
      setActiveDropdown(menuKey);
      setActiveSubDropdown(null);
    }
  };

  const handleSubDropdownToggle = (submenuIndex, event) => {
    event.stopPropagation();
    if (activeSubDropdown === submenuIndex) {
      setActiveSubDropdown(null);
    } else {
      setActiveSubDropdown(submenuIndex);
    }
  };

  const handleMenuItemClick = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
    setIsMobileMenuOpen(false);
    setIsDesktopBurgerOpen(false);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled ? 'bg-white shadow-lg py-0' : 'bg-white/95 backdrop-blur-sm py-2'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <div className="flex items-center flex-shrink-0">
            <a href="/" className="flex items-center transition-transform hover:scale-105">
              <img src={Logo} alt="Salymbekov University" className='navbar-logo h-8 w-auto sm:h-9 md:h-10 xl:w-[150px] xl:h-[35px]'/>
            </a>
          </div>

          {/* Правая часть: языки, кнопка подать заявку и бургер меню */}
          <div className="flex items-center space-x-3 sm:space-x-4">
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

            {/* Кнопка Подать заявку - видна на всех устройствах */}
            <div className="hidden sm:block">
              <a
                href="/admissions/apply"
                className="navbar-apply-button px-4 py-2 sm:px-5 sm:py-2.5 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 duration-150 whitespace-nowrap shadow-md hover:shadow-lg"
              >
                {t('nav.apply')}
              </a>
            </div>

            {/* Бургер меню для десктопа - теперь справа */}
            <div className="hidden lg:block">
              <button
                onClick={() => setIsDesktopBurgerOpen(!isDesktopBurgerOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
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
                    d={isDesktopBurgerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>

              {/* Горизонтальное выпадающее меню для десктопа */}
              {isDesktopBurgerOpen && (
                <div className="absolute right-4 mt-2 w-screen max-w-6xl rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden animate-fadeIn desktop-burger-menu">
                  <div className="py-4 px-6 grid grid-cols-4 gap-6">
                    {Object.entries(menuData).map(([key, menu]) => (
                      <div key={key} className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2 pb-1 border-b border-gray-200">{menu.title}</h3>
                        <ul className="space-y-1">
                          {menu.submenu.map((item, index) => (
                            <li key={index}>
                              {item.subitems ? (
                                <div className="relative group">
                                  <button
                                    onClick={(e) => handleSubDropdownToggle(index, e)}
                                    className="w-full text-left text-xs text-gray-700 hover:text-blue-600 transition-colors flex items-center justify-between py-1"
                                  >
                                    <span>{item.title}</span>
                                    <svg 
                                      className="h-3 w-3 ml-1" 
                                      fill="currentColor" 
                                      viewBox="0 0 20 20"
                                    >
                                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </button>
                                  
                                  {/* Вложенное подменю */}
                                  <div className="absolute left-full top-0 ml-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                                    {item.subitems.map((subitem, subIndex) => (
                                      <a
                                        key={subIndex}
                                        href={subitem.link}
                                        className="block px-3 py-2 text-xs text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                        onClick={handleMenuItemClick}
                                      >
                                        {subitem.title}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <a
                                  href={item.link}
                                  className="block text-xs text-gray-700 hover:text-blue-600 transition-colors py-1"
                                  onClick={handleMenuItemClick}
                                >
                                  {item.title}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Футер меню с кнопкой подачи заявки */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center">
                    <a
                      href="/admissions/apply"
                      className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105 duration-150 whitespace-nowrap shadow-md hover:shadow-lg"
                      onClick={handleMenuItemClick}
                    >
                      {t('nav.apply')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Бургер меню для мобильных устройств */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Заголовок меню */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Меню</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Контент меню */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                {Object.entries(menuData).map(([key, menu]) => (
                  <div key={key} className="mb-2 border-b border-gray-100 last:border-b-0">
                    <button
                      onClick={() => handleDropdownToggle(key)}
                      className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <span>{menu.title}</span>
                      <svg 
                        className={`h-5 w-5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {activeDropdown === key && (
                      <div className="pl-2 py-2 space-y-1 animate-fadeIn">
                        {menu.submenu.map((item, index) => (
                          <div key={index}>
                            {item.subitems ? (
                              <>
                                <button
                                  onClick={() => handleSubDropdownToggle(index)}
                                  className="w-full flex justify-between items-center px-4 py-2 rounded-lg text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                  <span>{item.title}</span>
                                  <svg 
                                    className={`h-4 w-4 transition-transform ${activeSubDropdown === index ? 'rotate-90' : ''}`} 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                  >
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                {activeSubDropdown === index && (
                                  <div className="pl-4 py-1 space-y-1 animate-fadeIn">
                                    {item.subitems.map((subitem, subIndex) => (
                                      <a
                                        key={subIndex}
                                        href={subitem.link}
                                        className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                        onClick={handleMenuItemClick}
                                      >
                                        {subitem.title}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <a
                                href={item.link}
                                className="block px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                onClick={handleMenuItemClick}
                              >
                                {item.title}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Футер меню */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <a
                  href="/admissions/apply"
                  className="block w-full px-4 py-3 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center transition-colors shadow-md mb-3"
                  onClick={handleMenuItemClick}
                >
                  {t('nav.apply')}
                </a>
                
                <div className="flex justify-center space-x-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.040 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 极2.239-5 5v14c0 2.761 2.239 5 5 5极h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.极75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;