import { useState } from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [moodleCredentials, setMoodleCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Данные ресурсов
  const resources = [
    {
      id: 1,
      icon: '📚',
      title: 'Электронная библиотека',
      description: 'Доступ к учебной литературе, научным статьям и электронным версиям учебников. Более 10 000 материалов по медицине и смежным дисциплинам.',
      link: 'https://su-e-library.vercel.app/',
      linkText: 'Перейти в библиотеку',
      features: ['Поиск по каталогу', 'Электронные учебники', 'Научные статьи', 'Аудиокниги'],
      status: 'online',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      icon: '🖥️',
      title: 'LMS Moodle',
      description: 'Система дистанционного обучения. Доступ к курсам, заданиям, тестам и материалам преподавателей.',
      features: ['Онлайн-курсы', 'Видеолекции', 'Тесты и задания', 'Общение с преподавателями'],
      status: 'login',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 3,
      icon: '🔬',
      title: 'Научные базы данных',
      description: 'Доступ к международным научным базам данных для исследований и научной работы.',
      features: ['PubMed', 'Scopus', 'Web of Science', 'Google Scholar'],
      links: [
        {
          name: 'PubMed',
          url: 'https://pubmed.ncbi.nlm.nih.gov/',
          external: true
        },
        {
          name: 'Scopus',
          url: 'https://www.scopus.com/',
          external: true
        },
        {
          name: 'Web of Science',
          url: 'https://www.webofscience.com/',
          external: true
        }
      ],
      status: 'external',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 4,
      icon: '📊',
      title: 'Методические материалы',
      description: 'Методические указания, пособия, руководства и рабочие программы по всем дисциплинам.',
      features: ['Методички', 'Рабочие программы', 'Практикумы', 'Лабораторные работы'],
      status: 'download',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 5,
      icon: '🎥',
      title: 'Видеотека',
      description: 'Видеолекции, записи операций, демонстрационные материалы и обучающие видео.',
      features: ['Записи лекций', 'Хирургические операции', 'Анатомические атласы', 'Демонстрации'],
      status: 'online',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 6,
      icon: '📱',
      title: 'Мобильные приложения',
      description: 'Официальные мобильные приложения университета для студентов и преподавателей.',
      features: ['Расписание', 'Уведомления', 'Электронный дневник', 'Чат с преподавателями'],
      status: 'download',
      color: 'bg-teal-50 border-teal-200'
    }
  ];

  const handleMoodleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Имитация запроса к API
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Login attempt:', moodleCredentials);
      // Здесь будет реальный запрос к API Moodle
      alert('Вход в Moodle выполнен успешно!');
      setMoodleCredentials({ username: '', password: '' });
    } catch (error) {
      console.error('Login error:', error);
      alert('Ошибка входа. Проверьте логин и пароль.');
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

  const renderResourceCard = (resource) => {
    return (
      <div key={resource.id} className={`border-2 rounded-2xl p-6 ${resource.color} hover:shadow-lg transition-shadow`}>
        <div className="flex items-start mb-4">
          <span className="text-3xl mr-4">{resource.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h3>
            <p className="text-gray-600 mb-4">{resource.description}</p>
          </div>
        </div>

        {/* Особенности */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 mb-2">Доступно:</h4>
          <ul className="space-y-1">
            {resource.features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                {feature}
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
            className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {resource.linkText || 'Перейти к ресурсу'}
          </a>
        )}

        {resource.status === 'login' && (
          <form onSubmit={handleMoodleLogin} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Логин</label>
              <input
                type="text"
                name="username"
                value={moodleCredentials.username}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Введите ваш логин"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                name="password"
                value={moodleCredentials.password}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Введите ваш пароль"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Вход...' : 'Войти в Moodle'}
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
                className="block w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Перейти в {link.name}
              </a>
            ))}
          </div>
        )}

        {resource.status === 'download' && (
          <div className="space-y-2">
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors">
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Скачать материалы
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800">Образовательные ресурсы</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Образовательные ресурсы</h1>
        <p className="text-gray-600 mb-8">Доступ к электронным ресурсам, библиотекам и обучающим платформам университета</p>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">10,000+</div>
            <div className="text-sm text-gray-600">Электронных книг</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">500+</div>
            <div className="text-sm text-gray-600">Онлайн-курсов</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">Доступ к ресурсам</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">100+</div>
            <div className="text-sm text-gray-600">Научных баз</div>
          </div>
        </div>

        {/* Сетка ресурсов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {resources.map(renderResourceCard)}
        </div>

        {/* Дополнительная информация */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Техническая поддержка</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Контакты поддержки</h3>
              <p className="text-gray-600 mb-2">📧 Email: support@salymbekov.kg</p>
              <p className="text-gray-600 mb-2">📞 Телефон: +996 (312) 123-456</p>
              <p className="text-gray-600">🕒 Время работы: 9:00 - 18:00 (Пн-Пт)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Частые вопросы</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Как получить доступ к электронной библиотеке?</li>
                <li>• Что делать, если забыл пароль от Moodle?</li>
                <li>• Как скачать методические материалы?</li>
                <li>• Доступ к научным базам с домашнего компьютера</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;