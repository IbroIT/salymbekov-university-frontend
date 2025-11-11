import React, { useState } from 'react';
import { Calendar, Check, File, GraduationCap, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ApplyForeignCitizens = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);

  // Статичные данные для алгоритма поступления
  const admissionSteps = [
    {
      id: 1,
      title: t('applyForeign.step1.title', 'Подготовка документов'),
      description: t('applyForeign.step1.desc', 'Сбор и перевод необходимых документов'),
      duration: t('applyForeign.step1.duration', '2-4 недели'),
      Icon: File
    },
    {
      id: 2,
      title: t('applyForeign.step2.title', 'Подача заявления'),
      description: t('applyForeign.step2.desc', 'Отправка документов и получение приглашения'),
      duration: t('applyForeign.step2.duration', '1-2 недели'),
      icon: '📮'
    },
    {
      id: 3,
      title: t('applyForeign.step3.title', 'Визовое оформление'),
      description: t('applyForeign.step3.desc', 'Получение студенческой визы'),
      duration: t('applyForeign.step3.duration', '2-3 недели'),
      icon: '🛂'
    },
    {
      id: 4,
      title: t('applyForeign.step4.title', 'Прибытие и зачисление'),
      description: t('applyForeign.step4.desc', 'Оформление документов в университете'),
      duration: t('applyForeign.step4.duration', '1 неделя'),
      Icon: GraduationCap
    }
  ];

  // Статичные данные для визовых требований
  const visaDocuments = [
    {
      name: t('applyForeign.visa.invitation', 'Приглашение от университета'),
      description: t('applyForeign.visa.invitationDesc', 'Официальное приглашение на обучение'),
      required: true
    },
    {
      name: t('applyForeign.visa.passport', 'Действующий загранпаспорт'),
      description: t('applyForeign.visa.passportDesc', 'Срок действия не менее 1 года'),
      required: true
    },
    {
      name: t('applyForeign.visa.medical', 'Медицинская справка'),
      description: t('applyForeign.visa.medicalDesc', 'С нотариальным переводом'),
      required: true
    },
    {
      name: t('applyForeign.visa.insurance', 'Медицинская страховка'),
      description: t('applyForeign.visa.insuranceDesc', 'На весь период обучения'),
      required: true
    },
    {
      name: t('applyForeign.visa.photos', 'Фотографии'),
      description: t('applyForeign.visa.photosDesc', '4 штуки 3x4 см'),
      required: true
    },
    {
      name: t('applyForeign.visa.fee', 'Квитанция об оплате'),
      description: t('applyForeign.visa.feeDesc', 'Консульский сбор'),
      required: true
    }
  ];

  // Статичные данные для поддержки
  const supportServices = [
    {
      title: t('applyForeign.support.housing.title', 'Помощь с жильем'),
      description: t('applyForeign.support.housing.desc', 'Содействие в поиске общежития или квартиры'),
      features: [
        t('applyForeign.support.housing.feature1', 'Бронирование места в общежитии'),
        t('applyForeign.support.housing.feature2', 'Помощь в аренде квартиры'),
        t('applyForeign.support.housing.feature3', 'Консультации по районам города')
      ],
      icon: '🏠',
      color: 'blue'
    },
    {
      title: t('applyForeign.support.curator.title', 'Персональный куратор'),
      description: t('applyForeign.support.curator.desc', 'Индивидуальное сопровождение в адаптации'),
      features: [
        t('applyForeign.support.curator.feature1', 'Встреча в аэропорту'),
        t('applyForeign.support.curator.feature2', 'Помощь в оформлении документов'),
        t('applyForeign.support.curator.feature3', 'Адаптация к учебному процессу')
      ],
      icon: '<UserCircle className="w-5 h-5" />',
      color: 'green'
    },
    {
      title: t('applyForeign.support.legal.title', 'Юридическая поддержка'),
      description: t('applyForeign.support.legal.desc', 'Помощь в оформлении всех необходимых документов'),
      features: [
        t('applyForeign.support.legal.feature1', 'Регистрация по месту жительства'),
        t('applyForeign.support.legal.feature2', 'Оформление студенческого билета'),
        t('applyForeign.support.legal.feature3', 'Консультации по законодательству')
      ],
      icon: '<Scale className="w-5 h-5" />',
      color: 'purple'
    }
  ];

  // Статичные данные для временной шкалы
  const timeline = [
    {
      month: t('applyForeign.timeline.jan', 'Январь'),
      action: t('applyForeign.timeline.janAction', 'Начало приема заявлений'),
      status: 'completed'
    },
    {
      month: t('applyForeign.timeline.mar', 'Март'),
      action: t('applyForeign.timeline.marAction', 'Подача документов для весеннего семестра'),
      status: 'active'
    },
    {
      month: t('applyForeign.timeline.jun', 'Июнь'),
      action: t('applyForeign.timeline.junAction', 'Основной прием на осенний семестр'),
      status: 'upcoming'
    },
    {
      month: t('applyForeign.timeline.aug', 'Август'),
      action: t('applyForeign.timeline.augAction', 'Заключительный этап приема'),
      status: 'upcoming'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('applyForeign.title', 'Подача заявки для иностранных граждан')}
          </h1>
          <p className="text-xl opacity-90">
            {t('applyForeign.subtitle', 'Полное руководство по поступлению для международных студентов')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Алгоритм поступления */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('applyForeign.algorithm.title', 'Алгоритм поступления для иностранцев')}
          </h2>
          
          {/* Шаги поступления */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {admissionSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  activeStep === step.id 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">
                <step.Icon className="w-6 h-6" />
              </div>
                  <h3 className="font-semibold text-gray-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                  <span className="text-xs text-green-600 font-medium">{step.duration}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Детали активного шага */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {admissionSteps.find(s => s.id === activeStep)?.title}
            </h3>
            
            {activeStep === 1 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step1.documents', 'Необходимые документы:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {t('applyForeign.step1.doc1', 'Диплом/аттестат (с нотариальным переводом)')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {t('applyForeign.step1.doc2', 'Паспорт и его перевод')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {t('applyForeign.step1.doc3', 'Медицинская справка')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {t('applyForeign.step1.doc4', 'Языковой сертификат (при наличии)')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step1.tips', 'Важные моменты:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4" />
                      {t('applyForeign.step1.tip1', 'Все переводы должны быть нотариальными')}
                    </li>
                    <li className="flex items-start">
                      <Lightbulb className="w-4 h-4" />
                      {t('applyForeign.step1.tip2', 'Документы действительны 6 месяцев')}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step2.process', 'Процесс подачи:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">1.</span>
                      {t('applyForeign.step2.process1', 'Подача документов онлайн или почтой')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">2.</span>
                      {t('applyForeign.step2.process2', 'Рассмотрение заявления (5-10 дней)')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">3.</span>
                      {t('applyForeign.step2.process3', 'Получение приглашения')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step2.invitation', 'Приглашение включает:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyForeign.step2.inv1', 'Официальное письмо университета')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyForeign.step2.inv2', 'Информацию о программе обучения')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {t('applyForeign.step2.inv3', 'Данные для получения визы')}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step3.visa', 'Оформление визы:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">1.</span>
                      {t('applyForeign.step3.visa1', 'Запись в консульство КР')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">2.</span>
                      {t('applyForeign.step3.visa2', 'Подача документов')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">3.</span>
                      {t('applyForeign.step3.visa3', 'Получение студенческой визы')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step3.timing', 'Сроки оформления:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <Calendar className="w-4 h-4" />
                      {t('applyForeign.step3.time1', 'Обычное оформление: 15-20 дней')}
                    </li>
                    <li className="flex items-start">
                      <Calendar className="w-4 h-4" />
                      {t('applyForeign.step3.time2', 'Срочное оформление: 5-7 дней')}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step4.arrival', 'По прибытии:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">1.</span>
                      {t('applyForeign.step4.arrival1', 'Встреча в аэропорту (по запросу)')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">2.</span>
                      {t('applyForeign.step4.arrival2', 'Регистрация в МВД')}
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">3.</span>
                      {t('applyForeign.step4.arrival3', 'Оформление в университете')}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {t('applyForeign.step4.documents', 'Финальные документы:')}
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <GraduationCap className="w-4 h-4" />
                      {t('applyForeign.step4.doc1', 'Студенческий билет')}
                    </li>
                    <li className="flex items-start">
                      <GraduationCap className="w-4 h-4" />
                      {t('applyForeign.step4.doc2', 'Справка для продления визы')}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Визовые требования */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('applyForeign.visaReqs.title', 'Документы для визы')}
              </h2>
            </div>
            
            <div className="space-y-3">
              {visaDocuments.map((doc, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{doc.name}</h3>
                      <p className="text-gray-600 text-sm">{doc.description}</p>
                    </div>
                    {doc.required && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold ml-2">
                        {t('applyForeign.visaReqs.required', 'Обязательно')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>{t('applyForeign.visaReqs.note', 'Важно:')}</strong> {' '}
                {t('applyForeign.visaReqs.noteText', 'Все документы должны быть переведены на кыргызский или русский язык и нотариально заверены.')}
              </p>
            </div>
          </div>

          {/* Временная шкала */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('applyForeign.timeline.title', 'Календарь поступления')}
              </h2>
            </div>
            
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{item.month}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.status === 'completed' ? t('applyForeign.timeline.completed', 'Завершено') :
                         item.status === 'active' ? t('applyForeign.timeline.active', 'Активно') : 
                         t('applyForeign.timeline.upcoming', 'Предстоящее')}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Поддержка */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('applyForeign.support.title', 'Поддержка международных студентов')}
            </h2>
            <p className="text-gray-600">
              {t('applyForeign.support.subtitle', 'Мы обеспечиваем полную поддержку на всех этапах обучения')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {supportServices.map((service, index) => (
              <div key={index} className={`border-2 rounded-lg p-6 ${getColorClasses(service.color)}`}>
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">
                <service.Icon className="w-6 h-6" />
              </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm opacity-80 mb-4">{service.description}</p>
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <Check className="w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Контактная информация */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('applyForeign.contact.title', 'Международный отдел')}
            </h2>
            <p className="text-gray-600">
              {t('applyForeign.contact.subtitle', 'Наша команда готова помочь вам 24/7')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyForeign.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600">+996 312 545 001</p>
              <p className="text-gray-600">+996 555 123 456</p>
            </div>
            
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyForeign.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600">international@su.edu.kg</p>
              <p className="text-gray-600">admissions@su.edu.kg</p>
            </div>
            
            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('applyForeign.contact.messenger', 'Мессенджеры')}
              </h3>
              <p className="text-gray-600">WhatsApp: +996 555 123 456</p>
              <p className="text-gray-600">Telegram: @su_intl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForeignCitizens;
