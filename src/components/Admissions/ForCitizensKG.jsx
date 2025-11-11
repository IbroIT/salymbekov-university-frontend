import React from 'react';
import { AlertTriangle, Calendar, DollarSign, FileEdit, FileText, GraduationCap, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ForCitizensKG = () => {
  const { t } = useTranslation();

  // Статичные данные для пошаговой инструкции
  const admissionSteps = [
    {
      step: 1,
      title: t('forCitizensKG.steps.step1.title', 'Подача документов'),
      description: t('forCitizensKG.steps.step1.desc', 'Сбор и подача необходимых документов в приемную комиссию'),
      documents: [
        t('forCitizensKG.steps.step1.doc1', 'Паспорт гражданина КР'),
        t('forCitizensKG.steps.step1.doc2', 'Аттестат о среднем образовании'),
        t('forCitizensKG.steps.step1.doc3', 'Медицинская справка (086/у)'),
        t('forCitizensKG.steps.step1.doc4', 'Фотографии 3x4 см (6 штук)')
      ],
      timing: t('forCitizensKG.steps.step1.timing', 'Июнь - Июль'),
      icon: "FileText"
    },
    {
      step: 2,
      title: t('forCitizensKG.steps.step2.title', 'Сдача экзаменов'),
      description: t('forCitizensKG.steps.step2.desc', 'Прохождение ОРТ и дополнительных вступительных испытаний'),
      documents: [
        t('forCitizensKG.steps.step2.doc1', 'ОРТ (Общереспубликанское тестирование)'),
        t('forCitizensKG.steps.step2.doc2', 'Собеседование (для некоторых специальностей)'),
        t('forCitizensKG.steps.step2.doc3', 'Медицинский осмотр'),
      ],
      timing: t('forCitizensKG.steps.step2.timing', 'Июль - Август'),
      icon: "FileEdit"
    },
    {
      step: 3,
      title: t('forCitizensKG.steps.step3.title', 'Зачисление'),
      description: t('forCitizensKG.steps.step3.desc', 'Получение результатов и зачисление на выбранную программу'),
      documents: [
        t('forCitizensKG.steps.step3.doc1', 'Получение результатов ОРТ'),
        t('forCitizensKG.steps.step3.doc2', 'Подтверждение зачисления'),
        t('forCitizensKG.steps.step3.doc3', 'Оплата обучения (для контракта)'),
      ],
      timing: t('forCitizensKG.steps.step3.timing', 'Август - Сентябрь'),
      icon: "GraduationCap"
    }
  ];

  // Статичные данные для быстрых ссылок
  const quickLinks = [
    {
      title: t('forCitizensKG.links.requirements.title', 'Требования'),
      description: t('forCitizensKG.links.requirements.desc', 'Академические и медицинские требования'),
      link: '/admissions/requirements/citizens-kg',
      icon: "FileText",
      color: 'blue'
    },
    {
      title: t('forCitizensKG.links.apply.title', 'Подать заявку'),
      description: t('forCitizensKG.links.apply.desc', 'Подробная инструкция по подаче документов'),
      link: '/admissions/apply/citizens-kg',
      icon: '📮',
      color: 'green'
    },
    {
      title: t('forCitizensKG.links.tuition.title', 'Стоимость'),
      description: t('forCitizensKG.links.tuition.desc', 'Стоимость обучения и способы оплаты'),
      link: '/admissions/tuition/citizens-kg',
      icon: "DollarSign",
      color: 'purple'
    }
  ];

  // Статичные данные для важной информации
  const importantInfo = [
    {
      title: t('forCitizensKG.info.ort.title', 'ОРТ - обязательно'),
      description: t('forCitizensKG.info.ort.desc', 'Все абитуриенты должны сдать Общереспубликанское тестирование'),
      icon: "AlertTriangle"
    },
    {
      title: t('forCitizensKG.info.budget.title', 'Бюджетные места'),
      description: t('forCitizensKG.info.budget.desc', 'Доступны бюджетные места по конкурсу'),
      icon: "Trophy"
    },
    {
      title: t('forCitizensKG.info.deadline.title', 'Сроки подачи'),
      description: t('forCitizensKG.info.deadline.desc', 'Не пропустите сроки подачи документов'),
      icon: '<Clock className="w-5 h-5" />'
    }
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('forCitizensKG.title', 'Поступление для граждан КР')}
          </h1>
          <p className="text-xl opacity-90">
            {t('forCitizensKG.subtitle', 'Полная информация о поступлении в Медицинский университет для граждан Кыргызской Республики')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Быстрые ссылки */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t('forCitizensKG.quickLinks.title', 'Быстрый переход')}
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

        {/* Пошаговая инструкция */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forCitizensKG.stepsTitle', 'Пошаговая инструкция поступления')}
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
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                    {step.step}
                  </div>

                  {/* Содержимое шага */}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <span className="text-2xl mr-3">
              </span>
                        <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                        <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {step.timing}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-4">{step.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">
                            {t('forCitizensKG.steps.documents', 'Документы/Действия:')}
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

        {/* Важная информация */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forCitizensKG.importantTitle', 'Важно знать')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {importantInfo.map((info, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <span className="text-4xl mb-3 block">
              </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Минимальные баллы */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forCitizensKG.minScores.title', 'Минимальные проходные баллы ОРТ')}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                    {t('forCitizensKG.minScores.specialty', 'Специальность')}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {t('forCitizensKG.minScores.budget', 'Бюджет')}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {t('forCitizensKG.minScores.contract', 'Контракт')}
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    {t('forCitizensKG.minScores.duration', 'Срок обучения')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-800">
                    {t('forCitizensKG.minScores.generalMedicine', 'Лечебное дело')}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">140+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">120+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                    {t('forCitizensKG.minScores.duration6', '6 лет')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-800">
                    {t('forCitizensKG.minScores.dentistry', 'Стоматология')}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">135+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">115+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                    {t('forCitizensKG.minScores.duration5', '5 лет')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-800">
                    {t('forCitizensKG.minScores.pharmacy', 'Фармация')}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">130+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">110+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                    {t('forCitizensKG.minScores.duration5', '5 лет')}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 text-gray-800">
                    {t('forCitizensKG.minScores.nursing', 'Сестринское дело')}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">120+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">100+</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                    {t('forCitizensKG.minScores.duration4', '4 года')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <p className="text-sm text-yellow-800">
              <strong>{t('forCitizensKG.minScores.note', 'Примечание:')}</strong> {' '}
              {t('forCitizensKG.minScores.noteText', 'Проходные баллы могут изменяться в зависимости от конкурса и года поступления.')}
            </p>
          </div>
        </div>

        {/* Календарь сроков подачи */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('forCitizensKG.calendar.title', 'Календарь поступления')}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
              <div className="text-center mb-3">
                <Calendar className="w-4 h-4" />
                <h3 className="text-lg font-semibold text-green-800 mt-2">
                  {t('forCitizensKG.calendar.phase1', 'Подача документов')}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.start', 'Начало:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase1Start', '15 июня')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.end', 'Окончание:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase1End', '25 июля')}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="text-center mb-3">
                <FileEdit className="w-4 h-4" />
                <h3 className="text-lg font-semibold text-blue-800 mt-2">
                  {t('forCitizensKG.calendar.phase2', 'ОРТ и экзамены')}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.start', 'Начало:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase2Start', '1 августа')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.end', 'Окончание:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase2End', '15 августа')}</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-purple-200 rounded-lg p-4 bg-purple-50">
              <div className="text-center mb-3">
                <GraduationCap className="w-4 h-4" />
                <h3 className="text-lg font-semibold text-purple-800 mt-2">
                  {t('forCitizensKG.calendar.phase3', 'Зачисление')}
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.start', 'Начало:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase3Start', '20 августа')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('forCitizensKG.calendar.end', 'Окончание:')}</span>
                  <span className="font-semibold">{t('forCitizensKG.calendar.phase3End', '5 сентября')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.768 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-sm text-yellow-800 font-semibold mb-1">
                  {t('forCitizensKG.calendar.warning', 'Внимание!')}
                </p>
                <p className="text-sm text-yellow-800">
                  {t('forCitizensKG.calendar.warningText', 'Сроки могут изменяться. Следите за обновлениями на официальном сайте и в социальных сетях университета.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('forCitizensKG.contact.title', 'Приемная комиссия')}
            </h2>
            <p className="text-gray-600">
              {t('forCitizensKG.contact.subtitle', 'Мы готовы ответить на все ваши вопросы')}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center mb-8">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forCitizensKG.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600 text-sm">+996 312 545 000</p>
            </div>

            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forCitizensKG.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600 text-sm">admissions@su.edu.kg</p>
            </div>

            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forCitizensKG.contact.hours', 'Часы работы')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('forCitizensKG.contact.schedule', 'Пн-Пт: 9:00-18:00')}
              </p>
            </div>

            <div className="p-4">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('forCitizensKG.contact.address', 'Адрес')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('forCitizensKG.contact.addressText', 'г. Бишкек, ул. Интергельпо')}
              </p>
            </div>
          </div>


            
            </div>
          </div>
        </div>

  );
};

export default ForCitizensKG;