import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Admissions.css';

const AdmissionsOverview = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const timelineSteps = [
    {
      id: 1,
      icon: '📋',
      title: 'Выбор программы',
      description: 'Изучите доступные программы и выберите подходящую',
      details: 'Ознакомьтесь с требованиями, стоимостью и особенностями каждой программы',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      icon: '📄',
      title: 'Подача документов',
      description: 'Подготовьте и подайте необходимые документы',
      details: 'Аттестат, паспорт, медсправка, фотографии и сертификат ОРТ',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      icon: '✍️',
      title: 'Вступительные испытания',
      description: 'Пройдите тестирование и собеседование',
      details: 'Экзамены по профильным предметам: биология, химия',
      color: 'from-pink-500 to-red-600'
    },
    {
      id: 4,
      icon: '✅',
      title: 'Зачисление',
      description: 'Получите уведомление о зачислении',
      details: 'Публикация списков зачисленных и подписание договора',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 5,
      icon: '🎓',
      title: 'Начало обучения',
      description: 'Приступите к обучению в университете',
      details: 'Торжественное начало учебного года и первые занятия',
      color: 'from-orange-500 to-yellow-600'
    }
  ];

  const importantDates = [
    {
      event: 'Начало приёма документов',
      date: '1 июня',
      dateNum: '01',
      month: 'ИЮН',
      highlight: true,
      icon: '📅',
      color: 'bg-gradient-to-br from-green-400 to-green-600'
    },
    {
      event: 'Крайний срок подачи документов',
      date: '15 августа',
      dateNum: '15',
      month: 'АВГ',
      highlight: true,
      icon: '⏰',
      color: 'bg-gradient-to-br from-red-400 to-red-600'
    },
    {
      event: 'Вступительные экзамены',
      date: '20-25 августа',
      dateNum: '20-25',
      month: 'АВГ',
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
              Процесс поступления
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Узнайте, как поступить в Салымбеков Университет
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Roadmap Introduction */}
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🗺️ Дорожная карта поступающего
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Ваш путь к успеху в медицине
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Следуйте нашему пошаговому руководству для успешного поступления в Салымбеков Университет
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
                  title={isAutoPlay ? 'Остановить автопрогресс' : 'Запустить автопрогресс'}
                >
                  {isAutoPlay ? '⏸️' : '▶️'}
                </button>
                <div className="text-sm text-gray-600 px-2">
                  Шаг {activeStep + 1} из {timelineSteps.length}
                </div>
                <button
                  onClick={() => setActiveStep((prev) => (prev - 1 + timelineSteps.length) % timelineSteps.length)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title="Предыдущий шаг"
                >
                  ⬅️
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % timelineSteps.length)}
                  className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  title="Следующий шаг"
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
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 max-w-xs">
                        {index === activeStep ? step.details : step.description}
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
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                  {index === activeStep && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      {step.details}
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
              📅 Календарь поступления
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Важные даты
            </h2>
            <p className="text-gray-600">
              Не пропустите ключевые сроки подачи документов
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {importantDates.map((item, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${item.color}`}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative p-8 text-white text-center">
                  {/* Date Icon */}
                  <div className="text-4xl mb-4">
                    {item.icon}
                  </div>
                  
                  {/* Calendar Style Date */}
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4 backdrop-blur-sm">
                    <div className="text-sm font-medium opacity-90 mb-1">
                      {item.month}
                    </div>
                    <div className="text-3xl font-bold">
                      {item.dateNum}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">
                    {item.event}
                  </h3>
                  
                  {/* Countdown or Status */}
                  <div className="text-sm bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block backdrop-blur-sm">
                    {index === 0 && '⏳ Подача открыта'}
                    {index === 1 && '🚨 Последний шанс'}
                    {index === 2 && '📝 Время экзаменов'}
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                  <div className="w-full h-full bg-white opacity-10 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Timeline connector for dates */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
            <div className="flex justify-between">
              {importantDates.map((_, index) => (
                <div key={index} className="w-4 h-4 bg-gray-400 rounded-full"></div>
              ))}
            </div>
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
                Готовы начать свой путь в медицине?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Присоединяйтесь к новому поколению врачей и станьте частью медицинского сообщества Салымбеков Университета
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a 
                  href="/admissions/apply"
                  className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center justify-center">
                    🚀 Подать заявку онлайн
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </a>
                <a 
                  href="/contacts/admission"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    📞 Связаться с нами
                  </span>
                </a>
              </div>
              
              {/* Quick stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm opacity-80">Выпускников</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm opacity-80">Трудоустройство</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-80">Лет опыта</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">📚</div>
            <h4 className="font-bold text-gray-800 mb-1">Программы</h4>
            <p className="text-sm text-gray-600">4 направления обучения</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="font-bold text-gray-800 mb-1">Качество</h4>
            <p className="text-sm text-gray-600">Аккредитованные программы</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <h4 className="font-bold text-gray-800 mb-1">Преподаватели</h4>
            <p className="text-sm text-gray-600">Опытные специалисты</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="font-bold text-gray-800 mb-1">Практика</h4>
            <p className="text-sm text-gray-600">Современные лаборатории</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsOverview;
