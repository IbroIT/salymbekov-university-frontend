import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { emailConfig, openGmailCompose, createMailtoLink } from '../../config/emailConfig';
import './Admissions.css';

const AdmissionsOverview = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Функция для быстрой заявки через Gmail
  const handleQuickApplication = () => {
    const subject = 'Заявка на поступление в Салымбеков Университет';
    const body = `
Здравствуйте!

Хочу подать заявку на поступление в Салымбеков Университет.

КОНТАКТНАЯ ИНФОРМАЦИЯ:
ФИО: [Введите ваше полное ФИО]
Телефон: [Введите ваш телефон]
Email: [Введите ваш email]
Дата рождения: [дд.мм.гггг]
Адрес: [Ваш адрес проживания]

ЖЕЛАЕМАЯ ПРОГРАММА ОБУЧЕНИЯ:
☐ Лечебное дело (6 лет, 170,000 сом/год)
☐ Стоматология (5 лет, 190,000 сом/год)
☐ Фармация (5 лет, 150,000 сом/год)
☐ Сестринское дело (4 года, 130,000 сом/год)

ОБРАЗОВАНИЕ:
Школа/лицей: [Название учебного заведения]
Год окончания: [Год]
Средний балл аттестата: [Балл]
Балл ОРТ: [Если есть]

ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ:
[Укажите любую дополнительную информацию]

Пожалуйста, вышлите мне:
✓ Подробную информацию о выбранной программе
✓ Требования к поступлению  
✓ Список необходимых документов
✓ Расписание вступительных экзаменов
✓ Информацию о стипендиях и льготах

С уважением,
[Ваше имя]

Дата: ${new Date().toLocaleDateString('ru-RU')}
    `.trim();
    
    try {
      openGmailCompose(emailConfig.admissions, subject, body);
    } catch (error) {
      // Резервный вариант
      const mailtoLink = createMailtoLink(emailConfig.admissions, subject, body);
      window.location.href = mailtoLink;
    }
  };

  // Функция для быстрого вопроса
  const handleQuickQuestion = () => {
    const subject = 'Вопрос по поступлению - Салымбеков Университет';
    const body = `
Здравствуйте!

У меня есть вопрос по поступлению в Салымбеков Университет.

Мой вопрос: [Опишите ваш вопрос]

Контакты для связи:
Имя: [Ваше имя]
Телефон: [Ваш телефон]
Email: [Ваш email]

С уважением,
[Ваше имя]
    `.trim();
    
    try {
      openGmailCompose(emailConfig.info, subject, body);
    } catch (error) {
      // Резервный вариант
      const mailtoLink = createMailtoLink(emailConfig.info, subject, body);
      window.location.href = mailtoLink;
    }
  };

  const timelineSteps = [
    {
      id: 1,
      icon: '📋',
      titleKey: 'admissions.timeline.step1.title',
      descriptionKey: 'admissions.timeline.step1.description',
      detailsKey: 'admissions.timeline.step1.details',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      icon: '📄',
      titleKey: 'admissions.timeline.step2.title',
      descriptionKey: 'admissions.timeline.step2.description',
      detailsKey: 'admissions.timeline.step2.details',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      icon: '✍️',
      titleKey: 'admissions.timeline.step3.title',
      descriptionKey: 'admissions.timeline.step3.description',
      detailsKey: 'admissions.timeline.step3.details',
      color: 'from-pink-500 to-red-600'
    },
    {
      id: 4,
      icon: '✅',
      titleKey: 'admissions.timeline.step4.title',
      descriptionKey: 'admissions.timeline.step4.description',
      detailsKey: 'admissions.timeline.step4.details',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 5,
      icon: '🎓',
      titleKey: 'admissions.timeline.step5.title',
      descriptionKey: 'admissions.timeline.step5.description',
      detailsKey: 'admissions.timeline.step5.details',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const importantDates = [
    {
      eventKey: 'admissions.dates.start',
      date: '1 июня',
      dateNum: '01',
      monthKey: 'common.months.jun',
      highlight: true,
      icon: '📅',
      color: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      eventKey: 'admissions.dates.deadline',
      date: '15 августа',
      dateNum: '15',
      monthKey: 'common.months.aug',
      highlight: true,
      icon: '⏰',
      color: 'bg-gradient-to-br from-red-400 to-red-600'
    },
    {
      eventKey: 'admissions.dates.exams',
      date: '20-25 августа',
      dateNum: '20-25',
      monthKey: 'common.months.aug',
      highlight: true,
      icon: '📝',
      color: 'bg-gradient-to-br from-purple-400 to-purple-600'
    }
  ];

  // Автоматическая анимация шагов
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % timelineSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [timelineSteps.length, isAutoPlay]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('admissions.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              {t('admissions.hero.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Roadmap Introduction */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🗺️ {t('admissions.roadmap.title')}
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            {t('admissions.roadmap.heading')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('admissions.roadmap.description')}
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="mb-20">
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            {/* Timeline Controls */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-full p-2 shadow-lg flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`p-2 rounded-full transition-colors ${
                    isAutoPlay ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}
                  title={isAutoPlay ? t('common.pause') : t('common.play')}
                >
                  {isAutoPlay ? '⏸️' : '▶️'}
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title={t('common.previous')}
                >
                  ⬅️
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % timelineSteps.length)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title={t('common.next')}
                >
                  ➡️
                </button>
              </div>
            </div>

            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2"></div>
              <div 
                className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform -translate-y-1/2 transition-all duration-1000"
                style={{ width: `${((activeStep + 1) / timelineSteps.length) * 100}%` }}
              ></div>
              
              {/* Timeline Steps */}
              <div className="relative flex justify-between items-center">
                {timelineSteps.map((step, index) => (
                  <div 
                    key={step.id} 
                    className="flex flex-col items-center cursor-pointer group"
                    onClick={() => {
                      setActiveStep(index);
                      setIsAutoPlay(false);
                    }}
                  >
                    {/* Step Circle */}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl transition-all duration-500 transform group-hover:scale-110 ${
                      index <= activeStep 
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg` 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.icon}
                      {index <= activeStep && (
                        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Step Content */}
                    <div className={`mt-4 text-center transition-all duration-300 ${
                      index === activeStep ? 'transform scale-105' : ''
                    }`}>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {t(step.titleKey)}
                      </h3>
                      <p className="text-sm text-gray-600 max-w-xs">
                        {index === activeStep ? t(step.detailsKey) : t(step.descriptionKey)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-6">
            {timelineSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`relative flex items-start space-x-4 p-6 rounded-xl transition-all duration-300 ${
                  index <= activeStep 
                    ? 'bg-white shadow-lg border-l-4 border-blue-500' 
                    : 'bg-gray-50'
                }`}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg ${
                  index <= activeStep 
                    ? `bg-gradient-to-br ${step.color} text-white` 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-gray-600">
                    {t(step.descriptionKey)}
                  </p>
                  {index === activeStep && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      {t(step.detailsKey)}
                    </p>
                  )}
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-6 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates Calendar */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              📅 {t('admissions.dates.title')}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('admissions.dates.heading')}
            </h2>
            <p className="text-gray-600">
              {t('admissions.dates.description')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {importantDates.map((item, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${item.color}`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative p-8 text-gray-700 text-center">
                  {/* Date Icon */}
                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>
                  
                  {/* Calendar Style Date */}
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4 backdrop-blur-sm">
                    <div className="text-sm font-medium opacity-90 mb-1">
                      {t(item.monthKey)}
                    </div>
                    <div className="text-3xl font-bold">
                      {item.dateNum}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">
                    {t(item.eventKey)}
                  </h3>
                  
                  {/* Countdown or Status */}
                  <div className="text-sm bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block backdrop-blur-sm">
                    {index === 0 && t('admissions.dates.status.open')}
                    {index === 1 && t('admissions.dates.status.deadline')}
                    {index === 2 && t('admissions.dates.status.exams')}
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                  <div className="w-full h-full bg-white opacity-10 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-6">🏥</div>
              <h3 className="text-3xl font-bold mb-4">
                {t('admissions.cta.title')}
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {t('admissions.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/admissions/apply"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    🚀 {t('admissions.cta.applyOnline')}
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
                <button 
                  onClick={handleQuickApplication}
                  className="group bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  title="Отправить заявку через Gmail"
                >
                  <span className="flex items-center justify-center">
                    📧 {t('admissions.cta.sendEmail')}
                  </span>
                </button>
                <a 
                  href="/contacts/admission"
                  className="group border-2 border-white text-white px-6 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    📞 {t('admissions.cta.contactUs')}
                  </span>
                </a>
                <button 
                  onClick={handleQuickQuestion}
                  className="group bg-orange-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  title="Задать быстрый вопрос через Gmail"
                >
                  <span className="flex items-center justify-center">
                    ❓ {t('admissions.cta.askQuestion')}
                  </span>
                </button>
              </div>
              
              {/* Quick stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">{t('admissions.stats.graduates')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-80">{t('admissions.stats.employment')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-80">{t('admissions.stats.experience')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-bold text-gray-800 mb-1">{t('admissions.info.programs')}</h4>
            <p className="text-sm text-gray-600">{t('admissions.info.programsDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-gray-800 mb-1">{t('admissions.info.quality')}</h4>
            <p className="text-sm text-gray-600">{t('admissions.info.qualityDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <h4 className="font-bold text-gray-800 mb-1">{t('admissions.info.teachers')}</h4>
            <p className="text-sm text-gray-600">{t('admissions.info.teachersDesc')}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-bold text-gray-800 mb-1">{t('admissions.info.practice')}</h4>
            <p className="text-sm text-gray-600">{t('admissions.info.practiceDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsOverview;