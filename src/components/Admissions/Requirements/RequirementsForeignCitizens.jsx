import React from 'react';
import { useTranslation } from 'react-i18next';

const RequirementsForeignCitizens = () => {
  const { t } = useTranslation();

  // Статичные данные для перевода документов
  const documentTranslation = [
    t('reqForeign.docs.diploma', 'Диплом/аттестат об образовании'),
    t('reqForeign.docs.transcript', 'Академическая справка (транскрипт)'),
    t('reqForeign.docs.passport', 'Паспорт или документ, удостоверяющий личность'),
    t('reqForeign.docs.birthCert', 'Свидетельство о рождении'),
    t('reqForeign.docs.photos', 'Фотографии 3x4 см (6 штук)'),
  ];

  // Статичные данные для языковых требований
  const languageRequirements = [
    { 
      language: t('reqForeign.lang.russian'), 
      level: t('reqForeign.lang.russianLevel'),
      certificates: ['ТРКИ-2', 'TORFL-2']
    },
    { 
      language: t('reqForeign.lang.english', 'Английский язык'), 
      level: t('reqForeign.lang.englishLevel', 'B2 и выше'),
      certificates: ['IELTS 6.0+', 'TOEFL 80+', 'Cambridge FCE']
    },
  ];

  // Статичные данные для визовых требований
  const visaRequirements = [
    t('reqForeign.visa.invitation'),
    t('reqForeign.visa.passport'),
    t('reqForeign.visa.medical'),
    t('reqForeign.visa.insurance'),
    t('reqForeign.visa.photos'),
    t('reqForeign.visa.fee'),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            {t('reqForeign.title', 'Требования для иностранных граждан')}
          </h1>
          <p className="text-xl opacity-90">
            {t('reqForeign.subtitle', 'Академические требования, визовое оформление и поддержка для международных студентов')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8">
          
          {/* Перевод и нострификация документов */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.translation.title', 'Перевод и нострификация документов')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Документы для перевода */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('reqForeign.translation.documents', 'Документы для нотариального перевода:')}
                </h3>
                <div className="space-y-3">
                  {documentTranslation.map((doc, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{doc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Процесс нострификации */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('reqForeign.nostrification.title', 'Нострификация документов:')}
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">
                      {t('reqForeign.nostrification.step1', 'Шаг 1: Подача заявления')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('reqForeign.nostrification.step1desc', 'В Министерство образования и науки КР')}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">
                      {t('reqForeign.nostrification.step2', 'Шаг 2: Экспертиза')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('reqForeign.nostrification.step2desc', 'Рассмотрение документов (30-45 дней)')}
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">
                      {t('reqForeign.nostrification.step3', 'Шаг 3: Получение свидетельства')}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {t('reqForeign.nostrification.step3desc', 'Выдача свидетельства о признании')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Языковые требования */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.language.title', 'Языковые требования')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {languageRequirements.map((req, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{req.language}</h3>
                  <div className="mb-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {t('reqForeign.language.level', 'Уровень')}: {req.level}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    {t('reqForeign.language.certificates', 'Принимаемые сертификаты:')}
                  </h4>
                  <ul className="space-y-1">
                    {req.certificates.map((cert, certIndex) => (
                      <li key={certIndex} className="flex items-center text-gray-600">
                        <span className="text-green-600 mr-2">•</span>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                <strong>{t('reqForeign.language.note', 'Примечание:')}</strong> {' '}
                {t('reqForeign.language.noteText', 'Студенты без языковых сертификатов могут пройти языковой тест в университете или пройти подготовительные курсы.')}
              </p>
            </div>
          </div>

          {/* Визовые требования */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.visa.title', 'Визовые требования')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Документы для визы */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('reqForeign.visa.documentsTitle', 'Необходимые документы:')}
                </h3>
                <div className="space-y-3">
                  {visaRequirements.map((req, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded-full mr-3 mt-1">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-gray-700">{req}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Сроки оформления */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {t('reqForeign.visa.timelineTitle', 'Сроки оформления:')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {t('reqForeign.visa.timeline1', 'Приглашение от университета')}
                      </p>
                      <p className="text-sm text-gray-600">{t('reqForeign.numbers.invitation')}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {t('reqForeign.visa.timeline2', 'Подача в консульство')}
                      </p>
                      <p className="text-sm text-gray-600">{t('reqForeign.numbers.application')}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {t('reqForeign.visa.timeline3', 'Получение визы')}
                      </p>
                      <p className="text-sm text-gray-600">{t('reqForeign.numbers.visa')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Поддержка международных студентов */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.support.title', 'Поддержка международных студентов')}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('reqForeign.support.housing.title', 'Помощь с жильем')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('reqForeign.support.housing.desc', 'Содействие в поиске общежития или квартиры')}
                </p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('reqForeign.support.curator.title', 'Назначение куратора')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('reqForeign.support.curator.desc', 'Персональный куратор для адаптации')}
                </p>
              </div>

              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {t('reqForeign.support.consultation.title', 'Консультации 24/7')}
                </h3>
                <p className="text-gray-600 text-sm">
                  {t('reqForeign.support.consultation.desc', 'Круглосуточная поддержка по любым вопросам')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('reqForeign.contact.title', 'Международный отдел')}
            </h2>
            <p className="text-gray-600">
              {t('reqForeign.contact.subtitle', 'Свяжитесь с нами для получения подробной информации')}
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
                {t('reqForeign.contact.phone', 'Телефон')}
              </h3>
              <p className="text-gray-600">+996 312 545 001</p>
            </div>
            
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('reqForeign.contact.email', 'Email')}
              </h3>
              <p className="text-gray-600">international@su.edu.kg</p>
            </div>
            
            <div className="p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('reqForeign.contact.address', 'Адрес')}
              </h3>
              <p className="text-gray-600">
                {t('reqForeign.contact.addressText', 'г. Бишкек, ул. Интергельпо 720000')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsForeignCitizens;
