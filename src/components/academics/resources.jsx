import React, { useState, useEffect } from "react";
import { BookOpen, Microscope } from 'lucide-react';
import { useTranslation } from "react-i18next";

const Resources = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [moodleCredentials, setMoodleCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeResource, setActiveResource] = useState(null);
  const [activeSection, setActiveSection] = useState('all');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Resources data organized by sections
  const sectionsData = {
    all: {
      title: t('resources.allTitle', 'Все образовательные ресурсы'),
      description: t('resources.allDesc', 'Полный доступ ко всем доступным образовательным ресурсам'),
      resources: [
        {
          id: 1,
          icon: "BookOpen",
          key: 'library',
          link: 'https://su-library.com/',
          status: 'online',
          section: 'library',
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50 border-blue-200',
          title: t('resources.libTitle', 'Электронная библиотека'),
          description: t('resources.libDesc', 'Доступ к учебной литературе и научным публикациям'),
          features: [
            t('resources.libFeature1', '100+ электронных книг'),
            t('resources.libFeature2', 'Научные журналы'),
            t('resources.libFeature3', 'Учебные пособия')
          ],
          linkText: t('resources.libLink', 'Перейти в библиотеку')
        },
        {
          id: 2,
          icon: "Microscope",
          key: 'databases',
          links: [
            { 
              name: 'pubmed', 
              url: 'https://pubmed.ncbi.nlm.nih.gov/', 
              external: true,
              displayName: t('resources.dbPubMed', 'PubMed')
            },
            { 
              name: 'scopus', 
              url: 'https://www.scopus.com/', 
              external: true,
              displayName: t('resources.dbScopus', 'Scopus')
            },
            { 
              name: 'web_of_science', 
              url: 'https://www.webofscience.com/', 
              external: true,
              displayName: t('resources.dbWebScience', 'Web of Science')
            }
          ],
          status: 'external',
          section: 'databases',
          color: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-50 border-purple-200',
          title: t('resources.dbTitle', 'Научные базы данных'),
          description: t('resources.dbDesc', 'Доступ к международным научным базам данных'),
          features: [
            t('resources.dbFeature1', 'PubMed'),
            t('resources.dbFeature2', 'Scopus'),
            t('resources.dbFeature3', 'Web of Science')
          ],
          linkText: t('resources.dbLink', 'Открыть базу данных')
        },
       
      ]
    },
    library: {
      title: t('resources.sectionLib', 'Электронная библиотека'),
      description: t('resources.sectionLibDesc', 'Электронные книги, учебники и научные публикации'),
      resources: []
    },
    databases: {
      title: t('resources.sectionDb', 'Научные базы данных'),
      description: t('resources.sectionDbDesc', 'Международные индексы и научные публикации'),
      resources: []
    },
    platforms: {
      title: t('resources.sectionPlatforms', 'Образовательные платформы'),
      description: t('resources.sectionPlatformsDesc', 'Системы дистанционного обучения и онлайн-курсы'),
      resources: []
    },
    multimedia: {
      title: t('resources.sectionMedia', 'Мультимедийные ресурсы'),
      description: t('resources.sectionMediaDesc', 'Видео, аудио и интерактивные материалы'),
      resources: []
    },
    research: {
      title: t('resources.sectionResearch', 'Научные ресурсы'),
      description: t('resources.sectionResearchDesc', 'Ресурсы для исследовательской работы'),
      resources: []
    },
    materials: {
      title: t('resources.sectionMaterials', 'Учебные материалы'),
      description: t('resources.sectionMaterialsDesc', 'Методические пособия и учебные материалы'),
      resources: []
    }
  };

  // Filter resources for each section
  Object.keys(sectionsData).forEach(section => {
    if (section !== 'all') {
      sectionsData[section].resources = sectionsData.all.resources.filter(
        resource => resource.section === section
      );
    }
  });

  // Sections list for navigation
  const sectionsList = [
    { id: 'all', name: t('resources.navAll', 'Все ресурсы'), count: sectionsData.all.resources.length },
    { id: 'library', name: t('resources.navLibrary', 'Библиотека'), count: sectionsData.library.resources.length },
    { id: 'databases', name: t('resources.navDatabases', 'Базы данных'), count: sectionsData.databases.resources.length },
    { id: 'platforms', name: t('resources.navPlatforms', 'Платформы'), count: sectionsData.platforms.resources.length },
    { id: 'multimedia', name: t('resources.navMultimedia', 'Мультимедиа'), count: sectionsData.multimedia.resources.length },
    { id: 'research', name: t('resources.navResearch', 'Наука'), count: sectionsData.research.resources.length },
    { id: 'materials', name: t('resources.navMaterials', 'Материалы'), count: sectionsData.materials.resources.length }
  ];

  // Get current section data
  const getCurrentSectionData = () => {
    return sectionsData[activeSection] || sectionsData.all;
  };

  const currentSectionData = getCurrentSectionData();

  const handleMoodleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(t('resources.loginSuccess', 'Вход выполнен успешно!'));
      setMoodleCredentials({ username: '', password: '' });
      setActiveResource(null);
    } catch (error) {
      console.error('Login error:', error);
      alert(t('resources.loginError', 'Ошибка входа. Проверьте данные.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMoodleCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Loading state
  if (false) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("resources.title", "Образовательные Ресурсы")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("resources.subtitle", "Доступ к электронным ресурсам, научным базам данных и учебным материалам")}
          </p>
        </div>

        <div>
          {/* Основной контент */}
          <div className="w-full">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentSectionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentSectionData.description}
                </p>
              </div>

              {/* Ресурсы */}
              <div className="space-y-6">
                {currentSectionData.resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionData.resources.map((resource, index) => (
                      <div
                        key={resource.id}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${resource.color} flex items-center justify-center text-xl mr-4`}>
              
              </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {resource.title}
                              </h3>
                              <p className="text-blue-600 text-sm">
                                {resource.description}
                              </p>
                            </div>
                          </div>

                          {/* Особенности */}
                          <div className="mb-4">
                            <ul className="space-y-2">
                              {resource.features && resource.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-sm text-gray-600">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                                  <span className="break-words">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Действия */}
                          <div className="mt-4">
                            {resource.status === 'online' && resource.link && (
                              <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 w-full font-medium text-sm"
                              >
                                <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                <span className="truncate">{resource.linkText}</span>
                              </a>
                            )}

                            {resource.status === 'login' && (
                              <div>
                                <button
                                  onClick={() => setActiveResource(activeResource === resource.id ? null : resource.id)}
                                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-sm mb-3"
                                >
                                  {resource.linkText}
                                </button>
                                
                                {activeResource === resource.id && (
                                  <form onSubmit={handleMoodleLogin} className="space-y-3">
                                    <div>
                                      <input
                                        type="text"
                                        name="username"
                                        value={moodleCredentials.username}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={t('resources.usernamePlaceholder', 'Имя пользователя')}
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="password"
                                        name="password"
                                        value={moodleCredentials.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={t('resources.passwordPlaceholder', 'Пароль')}
                                      />
                                    </div>
                                    <button
                                      type="submit"
                                      disabled={isLoading}
                                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:shadow-lg disabled:opacity-50 transition-all duration-300 font-medium text-sm"
                                    >
                                      {isLoading ? 
                                        t('resources.loggingIn', 'Вход...') : 
                                        t('resources.loginBtn', 'Войти')
                                      }
                                    </button>
                                  </form>
                                )}
                              </div>
                            )}

                            {resource.status === 'external' && resource.links && (
                              <div className="space-y-2">
                                {resource.links.map((link, idx) => (
                                  <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 text-center font-medium text-sm"
                                  >
                                    {t('resources.goTo', 'Перейти в')} {link.displayName}
                                  </a>
                                ))}
                              </div>
                            )}

                            {resource.status === 'download' && (
                              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 font-medium text-sm">
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                {resource.linkText}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {t("resources.noResources", "Ресурсы не найдены")}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {t("resources.noResourcesDesc", "В этой категории пока нет доступных ресурсов")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;