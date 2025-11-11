import React from 'react';
import { DollarSign, File, FileText, Globe, GraduationCap, Handshake, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ForForeignCitizens = () => {
  const { t } = useTranslation();

  // Статичные данные для алгоритма поступления
  const admissionSteps = [
    {
      step: 1,
      title: t('forForeignCitizens.steps.step1.title', 'Подготовка документов'),
      description: t('forForeignCitizens.steps.step1.desc', 'Сбор, перевод и нострификация образовательных документов'),
      documents: [
        t('forForeignCitizens.steps.step1.doc1', 'Диплом/аттестат с нотариальным переводом'),
        t('forForeignCitizens.steps.step1.doc2', 'Паспорт и его перевод'),
        t('forForeignCitizens.steps.step1.doc3', 'Медицинская справка'),
        t('forForeignCitizens.steps.step1.doc4', 'Языковой сертификат (при наличии)')
      ],
      timing: t('forForeignCitizens.steps.step1.timing', '2-4 недели'),
      icon: "File"
    },
    {
      step: 2,
      title: t('forForeignCitizens.steps.step2.title', 'Подача заявления'),
      description: t('forForeignCitizens.steps.step2.desc', 'Отправка документов и получение приглашения от университета'),
      documents: [
        t('forForeignCitizens.steps.step2.doc1', 'Заполнение анкеты абитуриента'),
        t('forForeignCitizens.steps.step2.doc2', 'Отправка документов онлайн или почтой'),
        t('forForeignCitizens.steps.step2.doc3', 'Получение приглашения'),
      ],
      timing: t('forForeignCitizens.steps.step2.timing', '1-2 недели'),
      icon: '📮'
    },
    {
      step: 3,
      title: t('forForeignCitizens.steps.step3.title', 'Визовое оформление'),
      description: t('forForeignCitizens.steps.step3.desc', 'Получение студенческой визы в консульстве КР'),
      documents: [
        t('forForeignCitizens.steps.step3.doc1', 'Подача документов в консульство'),
        t('forForeignCitizens.steps.step3.doc2', 'Медицинская страховка'),
        t('forForeignCitizens.steps.step3.doc3', 'Получение студенческой визы'),
      ],
      timing: t('forForeignCitizens.steps.step3.timing', '2-3 недели'),
      icon: '🛂'
    },
    {
      step: 4,
      title: t('forForeignCitizens.steps.step4.title', 'Прибытие и зачисление'),
      description: t('forForeignCitizens.steps.step4.desc', 'Прибытие в Кыргызстан и окончательное оформление'),
      documents: [
        t('forForeignCitizens.steps.step4.doc1', 'Регистрация в МВД'),
        t('forForeignCitizens.steps.step4.doc2', 'Оформление в университете'),
        t('forForeignCitizens.steps.step4.doc3', 'Получение студенческого билета'),
      ],
      timing: t('forForeignCitizens.steps.step4.timing', '1 неделя'),
      icon: "GraduationCap"
    }
  ];

  // Статичные данные для быстрых ссылок
  const quickLinks = [
    {
      title: t('forForeignCitizens.links.requirements.title', 'Требования'),
      description: t('forForeignCitizens.links.requirements.desc', 'Документы, языковые и визовые требования'),
      link: '/admissions/requirements/foreign-citizens',
      icon: "FileText",
      color: 'green'
    },
    {
      title: t('forForeignCitizens.links.apply.title', 'Подать заявку'),
      description: t('forForeignCitizens.links.apply.desc', 'Подробный алгоритм поступления'),
      link: '/admissions/apply/foreign-citizens',
      icon: '📮',
      color: 'blue'
    },
    {
      title: t('forForeignCitizens.links.tuition.title', 'Стоимость'),
      description: t('forForeignCitizens.links.tuition.desc', 'Стоимость обучения и дополнительные расходы'),
      link: '/admissions/tuition/foreign-citizens',
      icon: "DollarSign",
      color: 'purple'
    }
  ];

  // Статичные данные для преимуществ обучения
  const advantages = [
    {
      title: t('forForeignCitizens.advantages.quality.title', 'Качественное образование'),
      description: t('forForeignCitizens.advantages.quality.desc', 'Аккредитованные программы международного уровня'),
      icon: "Trophy"
    },
    {
      title: t('forForeignCitizens.advantages.cost.title', 'Доступная стоимость'),
      description: t('forForeignCitizens.advantages.cost.desc', 'Конкурентные цены на обучение и проживание'),
      icon: "DollarSign"
    },
    {
      title: t('forForeignCitizens.advantages.recognition.title', 'Признание диплома'),
      description: t('forForeignCitizens.advantages.recognition.desc', 'Дипломы признаются в странах СНГ и ЕС'),
      icon: "Globe"
    },
    {
      title: t('forForeignCitizens.advantages.support.title', 'Полная поддержка'),
      description: t('forForeignCitizens.advantages.support.desc', 'Помощь с визой, жильем и адаптацией'),
      icon: "Handshake"
    },
    {
      title: t('forForeignCitizens.advantages.language.title', 'Языки обучения'),
      description: t('forForeignCitizens.advantages.language.desc', 'Программы на русском и английском языках'),
      icon: '🗣️'
    },
    {
      title: t('forForeignCitizens.advantages.culture.title', 'Богатая культура'),
      description: t('forForeignCitizens.advantages.culture.desc', 'Уникальная культура и гостеприимство'),
      icon: '🏔️'
    }
  ];

  // Статичные данные для стран-партнеров
  const partnerCountries = [
    { name: t('forForeignCitizens.countries.russia', 'Россия'), count: '120+', flag: '🇷🇺' },
    { name: t('forForeignCitizens.countries.kazakhstan', 'Казахстан'), count: '85+', flag: '🇰🇿' },
    { name: t('forForeignCitizens.countries.uzbekistan', 'Узбекистан'), count: '75+', flag: '🇺🇿' },
    { name: t('forForeignCitizens.countries.tajikistan', 'Таджикистан'), count: '45+', flag: '🇹🇯' },
    { name: t('forForeignCitizens.countries.india', 'Индия'), count: '35+', flag: '🇮🇳' },
    { name: t('forForeignCitizens.countries.turkey', 'Турция'), count: '20+', flag: '🇹🇷' },
    { name: t('forForeignCitizens.countries.pakistan', 'Пакистан'), count: '15+', flag: '🇵🇰' },
    { name: t('forForeignCitizens.countries.other', 'Другие'), count: '30+', flag: '<Globe className="w-5 h-5" />' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('forForeignCitizens.title', 'Поступление для иностранных граждан')}
          </h1>
          <p className="text-xl opacity-90">
            {t('forForeignCitizens.subtitle', 'Добро пожаловать в Медицинский университет! Мы рады приветствовать студентов со всего мира')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Быстрые ссылки */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('forForeignCitizens.quickLinks.title', 'Быстрый переход')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className={`block border-2 rounded-lg p-6 transition-all transform hover:scale-105 ${getColorClasses(link.color)}`}
              >
                <div className="text-center">
                  <span className="text-4xl mb-3 block">
              </span>
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-sm opacity-80">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Алгоритм поступления */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forForeignCitizens.algorithmTitle', 'Алгоритм поступления для иностранцев')}
          </h2>

          <div className="space-y-8">
            {admissionSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Линия соединения */}
                {index < admissionSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-32 bg-gray-300 hidden md:block"></div>
                )}

                <div className="flex flex-col md:flex-row items-start">
                  {/* Номер шага */}
                  <div className="flex items-center justify-center w-12 h-12 bg-green-600 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    {step.step}
                  </div>

                  {/* Содержимое шага */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">
              </span>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <span className="ml-auto bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {step.timing}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{step.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">
                            {t('forForeignCitizens.steps.documents', 'Документы/Действия:')}
                          </h4>
                          <ul className="space-y-1">
                            {step.documents.map((doc, docIndex) => (
                              <li key={docIndex} className="flex items-start text-sm text-gray-700">
                                <span className="text-green-600 mr-2 mt-0.5">•</span>
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Преимущества обучения */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forForeignCitizens.advantagesTitle', 'Почему выбирают нас')}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <span className="text-4xl mb-3 block">
              </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Поддержка иностранных студентов */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('forForeignCitizens.support.title', 'Поддержка иностранных студентов')}
            </h2>
            <p className="text-gray-600">
              {t('forForeignCitizens.support.subtitle', 'Мы поможем вам адаптироваться к жизни в Кыргызстане')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Помощь с жильём */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('forForeignCitizens.support.housing.title', 'Помощь с жильём')}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.housing.dormitory', 'Места в общежитии университета')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.housing.rental', 'Помощь в поиске съемного жилья')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.housing.temporary', 'Временное размещение при прибытии')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.housing.safe', 'Безопасные районы для студентов')}
                </li>
              </ul>
            </div>

            {/* Назначение куратора */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('forForeignCitizens.support.curator.title', 'Персональный куратор')}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.curator.assignment', 'Назначение в первый день')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.curator.help', 'Помощь в адаптации')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.curator.academic', 'Академическая поддержка')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.curator.cultural', 'Культурная адаптация')}
                </li>
              </ul>
            </div>

            {/* Документооборот */}
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('forForeignCitizens.support.documents.title', 'Помощь с документами')}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.documents.registration', 'Регистрация в МВД')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.documents.visa', 'Продление визы')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.documents.permits', 'Разрешения на работу')}
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-0.5">•</span>
                  {t('forForeignCitizens.support.documents.medical', 'Медицинские справки')}
                </li>
              </ul>
            </div>
          </div>

          {/* Контакты международного отдела */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {t('forForeignCitizens.support.international.title', 'Международный отдел')}
              </h3>
              <p className="text-gray-600">
                {t('forForeignCitizens.support.international.subtitle', 'Ваша поддержка 24/7')}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">WhatsApp</h4>
                <p className="text-sm text-gray-600">+996 700 123 456</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                <p className="text-sm text-gray-600">international@su.edu.kg</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {t('forForeignCitizens.support.international.office', 'Офис')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('forForeignCitizens.support.international.room', 'Главное здание, 205')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Международное сообщество */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forForeignCitizens.communityTitle', 'Наше международное сообщество')}
          </h2>

          <div className="grid md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
            {partnerCountries.map((country, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <span className="text-3xl mb-2 block">{country.flag}</span>
                <h4 className="font-medium text-gray-800 text-sm mb-1">{country.name}</h4>
                <span className="text-green-600 font-bold text-sm">{country.count}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
              <Globe className="w-4 h-4" />
              <span className="font-semibold">
                {t('forForeignCitizens.totalStudents', 'Более 450 международных студентов из 25+ стран')}
              </span>
            </div>
          </div>
        </div>

        {/* Контакты международного отдела */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('forForeignCitizens.contact.title', 'Международный отдел')}
            </h2>
            <p className="text-gray-600">
              {t('forForeignCitizens.contact.subtitle', 'Наша команда говорит на разных языках и готова помочь 24/7')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mb-8">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forForeignCitizens.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 545 001</p>
              <p className="text-gray-600 text-sm">+996 555 123 456</p>
            </div>

            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forForeignCitizens.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600 text-sm">international@su.edu.kg</p>
              <p className="text-gray-600 text-sm">admissions@su.edu.kg</p>
            </div>

            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forForeignCitizens.contact.messenger', 'Мессенджеры')}
              </h3>
              <p className="text-gray-600 text-sm">WhatsApp: +996 555 123 456</p>
              <p className="text-gray-600 text-sm">Telegram: @su_intl</p>
            </div>

            <div className="p-4">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forForeignCitizens.contact.hours', 'Поддержка')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('forForeignCitizens.contact.support24', '24/7 онлайн')}
              </p>
            </div>
          </div>

          {/* Языки поддержки */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 mb-3">
              {t('forForeignCitizens.contact.languages', 'Мы говорим на языках:')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { lang: 'Русский', flag: '🇷🇺' },
                { lang: 'English', flag: '🇺🇸' },
                { lang: 'Кыргызча', flag: '🇰🇬' },
                { lang: 'اردو', flag: '🇵🇰' },
                { lang: 'हिन्दी', flag: '🇮🇳' },
                { lang: 'Türkçe', flag: '🇹🇷' }
              ].map((item, index) => (
                <span key={index} className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">{item.flag}</span>
                  {item.lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForForeignCitizens;