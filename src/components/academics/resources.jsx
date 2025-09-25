import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Resources = () => {
  const { t } = useTranslation();
  const [moodleCredentials, setMoodleCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Данные ресурсов с использованием ключей переводов
  const resources = useMemo(() => [
    {
      id: 1,
      icon: '📚',
      key: 'library',
      link: 'https://su-e-library.vercel.app/',
      status: 'online',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      icon: '🔬',
      key: 'databases',
      links: [
        { name: 'pubmed', url: 'https://pubmed.ncbi.nlm.nih.gov/', external: true },
        { name: 'scopus', url: 'https://www.scopus.com/', external: true },
        { name: 'web_of_science', url: 'https://www.webofscience.com/', external: true }
      ],
      status: 'external',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 3,
      icon: '📊',
      key: 'materials',
      status: 'download',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 4,
      icon: '🎥',
      key: 'video',
      status: 'online',
      color: 'bg-red-50 border-red-200'
    }
  ], []);

  const stats = useMemo(() => [
    { value: '10,000+', key: 'ebooks', color: 'text-blue-600' },
    { value: '500+', key: 'courses', color: 'text-green-600' },
    { value: '24/7', key: 'access', color: 'text-purple-600' },
    { value: '100+', key: 'databases', color: 'text-orange-600' }
  ], []);

  const handleMoodleLogin = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(t('resources.forms.login_success'));
      setMoodleCredentials({ username: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
      alert(t('resources.forms.login_error'));
    } finally {
      setIsLoading(false);
    }
  }, [moodleCredentials, t]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setMoodleCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const renderResourceCard = useCallback((resource) => {
    const resourceData = t(`resources.resources.${resource.key}`, { returnObjects: true });
    
    return (
      <div key={resource.id} className={`border-2 rounded-2xl p-4 md:p-6 ${resource.color} hover:shadow-lg transition-shadow`}>
        <div className="flex items-start mb-3 md:mb-4">
          <span className="text-2xl md:text-3xl mr-3 md:mr-4">{resource.icon}</span>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1 md:mb-2">
              {resourceData.title}
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
              {resourceData.description}
            </p>
          </div>
        </div>

        {/* Особенности */}
        <div className="mb-3 md:mb-4">
          <h4 className="font-semibold text-gray-700 mb-1 md:mb-2 text-sm md:text-base">
            {t('resources.features_title')}
          </h4>
          <ul className="space-y-1">
            {resourceData.features.map((feature, index) => (
              <li key={index} className="flex items-center text-xs md:text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                <span className="break-words">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Действия в зависимости от статуса */}
        {resource.status === 'online' && resource.link && (
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-blue-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base w-full justify-center"
          >
            <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="truncate">{resourceData.linkText || t('resources.forms.go_to_resource')}</span>
          </a>
        )}

        {resource.status === 'login' && (
          <form onSubmit={handleMoodleLogin} className="space-y-2 md:space-y-3">
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                {t('resources.forms.username')}
              </label>
              <input
                type="text"
                name="username"
                value={moodleCredentials.username}
                onChange={handleInputChange}
                required
                className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder={t('resources.forms.username_placeholder')}
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                {t('resources.forms.password')}
              </label>
              <input
                type="password"
                name="password"
                value={moodleCredentials.password}
                onChange={handleInputChange}
                required
                className="w-full p-2 text-sm md:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder={t('resources.forms.password_placeholder')}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm md:text-base"
            >
              {isLoading ? t('resources.forms.logging_in') : t('resources.forms.login')}
            </button>
          </form>
        )}

        {resource.status === 'external' && resource.links && (
          <div className="space-y-2">
            {resource.links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-purple-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-purple-700 transition-colors text-xs md:text-sm text-center truncate"
                title={`${t('resources.forms.go_to')} ${t(`resources.external_links.${link.name}`)}`}
              >
                {t('resources.forms.go_to')} {t(`resources.external_links.${link.name}`)}
              </a>
            ))}
          </div>
        )}

        {resource.status === 'download' && (
          <div className="space-y-2">
            <button className="w-full bg-orange-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-orange-700 transition-colors text-sm md:text-base">
              <svg className="w-3 h-3 md:w-4 md:h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {t('resources.forms.download')}
            </button>
          </div>
        )}
      </div>
    );
  }, [handleMoodleLogin, handleInputChange, isLoading, t]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        {/* Хлебные крошки */}
        <nav className="text-xs md:text-sm text-gray-600 mb-4 md:mb-8">
          <Link to="/" className="hover:text-blue-600">{t('resources.breadcrumbs.home')}</Link>
          <span className="mx-1 md:mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">{t('resources.breadcrumbs.academics')}</Link>
          <span className="mx-1 md:mx-2">→</span>
          <span className="text-gray-800">{t('resources.breadcrumbs.resources')}</span>
        </nav>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          {t('resources.title')}
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
          {t('resources.subtitle')}
        </p>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl md:rounded-2xl p-3 md:p-4 text-center shadow-sm">
              <div className={`text-lg md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-600">
                {t(`resources.stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </div>

        {/* Сетка ресурсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {resources.map(renderResourceCard)}
        </div>

        {/* Дополнительная информация для мобильных */}
        <div className="md:hidden bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
          <h3 className="font-semibold text-blue-800 mb-2 text-sm">
            {t('resources.tooltip.title')}
          </h3>
          <p className="text-blue-700 text-xs">
            {t('resources.tooltip.text')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;