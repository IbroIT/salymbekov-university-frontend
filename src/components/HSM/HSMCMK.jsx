// import icons removed
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, BarChart, ClipboardList, Star } from 'lucide-react';
import {
  getQualityManagementSystem,
  incrementDocumentDownload,
  getLocalizedField
} from '../../services/qualityApi';
import SideMenu from '../common/SideMenu';

const HSMCMK = () => {
  const { t, i18n } = useTranslation();

  const hsmItems = [
    { title: t('nav.about_HSM'), link: '/hsm/about' },
    { title: t('nav.management'), link: '/hsm/manage' },
    { title: t('nav.programs'), link: '/hsm/programs' },
    { title: t('nav.academic_stuff'), link: '/hsm/AS' },
    { title: t('nav.partners'), link: '/hsm/partners' },
    { title: t('nav.cmk'), link: '/hsm/cmk' },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [qualityData, setQualityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загрузка данных с API
  useEffect(() => {
    const fetchQualityData = async () => {
      try {
        setLoading(true);
        const data = await getQualityManagementSystem();
        setQualityData(data);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки данных системы качества:', err);
        setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
      } finally {
        setLoading(false);
      }
    };

    fetchQualityData();
  }, []);

  // Получить текущий язык
  const getCurrentLanguage = () => {
    const lang = i18n.language;

    // Проверяем различные варианты кода языка
    if (lang === 'kg' || lang.startsWith('kg')) {
      return 'kg'; // Кыргызский язык
    }
    if (lang === 'en' || lang.startsWith('en')) {
      return 'en';
    }
    return 'ru';
  };

  const sections = [
  { id: 'about', name: t('smk.tabs.about') },
  { id: 'documents', name: t('smk.tabs.documents') }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleDocumentDownload = async (document) => {
    try {
      await incrementDocumentDownload(document.id);
      // Если есть файл или внешняя ссылка, открываем его
      if (document.file_url || document.external_url) {
        window.open(document.file_url || document.external_url, '_blank');
      } else {
        alert(t('smk.documents.noFile') || 'Файл недоступен для скачивания');
      }
    } catch (error) {
      console.error('Ошибка при скачивании документа:', error);
      alert('Ошибка при скачивании документа. Попробуйте позже.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-red-500 mb-4"><AlertTriangle className="w-5 h-5" /></div>
          <p className="text-lg text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  const renderAboutContent = () => {
    const settings = qualityData?.settings;
    const advantages = qualityData?.advantages || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {settings && (
            <p>{getLocalizedField(settings, 'about_text', currentLang)}</p>
          )}
        </div>
      </div>
    );
  };

  const renderPrinciplesContent = () => {
    const principles = qualityData?.principles || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div
              key={principle.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {getLocalizedField(principle, 'title', currentLang)}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {getLocalizedField(principle, 'description', currentLang)}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderDocumentsContent = () => {
    const documents = qualityData?.documents || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {documents.map((document) => (
            <div
              key={document.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  <ClipboardList className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {getLocalizedField(document, 'title', currentLang)}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                {getLocalizedField(document, 'description', currentLang)}
              </p>
              <button
                onClick={() => handleDocumentDownload(document)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                {t('smk.documents.download')}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProcessesContent = () => {
    const processGroups = qualityData?.process_groups || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {processGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {getLocalizedField(group, 'title', currentLang)}
                </h3>
              </div>
              <ul className="space-y-3">
                {group.processes?.map((process) => (
                  <li key={process.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">
                      {getLocalizedField(process, 'title', currentLang)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStatisticsContent = () => {
    const statistics = qualityData?.statistics || [];
    const currentLang = getCurrentLanguage();

    return (
      <div className="space-y-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statistics.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 border border-blue-100 text-center"
            >
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">
                {getLocalizedField(stat, 'title', currentLang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return renderAboutContent();
      case 'principles':
        return renderPrinciplesContent();
      case 'documents':
        return renderDocumentsContent();
      case 'processes':
        return renderProcessesContent();
      case 'statistics':
        return renderStatisticsContent();
      default:
        return renderAboutContent();
    }
  };

  const settings = qualityData?.settings;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {settings ?
              getLocalizedField(settings, 'title', getCurrentLanguage()) :
              t('smk.hero.title')
            }
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${activeSection === section.id
                          ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Боковое меню для навигации по разделу */}
      <SideMenu items={hsmItems} currentPath={window.location.pathname} />
    </div>
  );
};

export default HSMCMK;