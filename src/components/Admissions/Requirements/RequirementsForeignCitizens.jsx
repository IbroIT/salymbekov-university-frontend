import React from 'react';
import { useTranslation } from 'react-i18next';

const RequirementsForeignCitizens = () => {
  const { t } = useTranslation();

  // Статичные данные для перевода документов
  const documentTranslation = [
    t('reqForeign.docs.diploma'),
    t('reqForeign.docs.transcript'),
    t('reqForeign.docs.passport'),
    t('reqForeign.docs.birthCert'),
    t('reqForeign.docs.photos'),
  ];

  // Статичные данные для языковых требований
  const languageRequirements = [
    { 
      language: t('reqForeign.lang.russian'), 
      level: t('reqForeign.lang.russianLevel'),
      certificates: ['ТРКИ-2', 'TORFL-2']
    },
    { 
      language: t('reqForeign.lang.english'), 
      level: t('reqForeign.lang.englishLevel'),
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('reqForeign.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('reqForeign.subtitle')}
          </p>
        </div>

        {/* Документы */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.translation.title')}
              </h2>
              <p className="text-gray-600 mt-1">
                {t('reqForeign.translation.documents')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-4">
                {documentTranslation.map((doc, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t('reqForeign.nostrification.title')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('reqForeign.nostrification.step1')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('reqForeign.nostrification.step1desc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('reqForeign.nostrification.step2')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('reqForeign.nostrification.step2desc')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{t('reqForeign.nostrification.step3')}</h4>
                    <p className="text-sm text-gray-600 mt-1">{t('reqForeign.nostrification.step3desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Языковые требования */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {t('reqForeign.language.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {languageRequirements.map((req, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{req.language}</h3>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {t('reqForeign.language.level')}: {req.level}
                  </span>
                </div>
                <h4 className="font-medium text-gray-700 mb-2">
                  {t('reqForeign.language.certificates')}
                </h4>
                <ul className="space-y-2">
                  {req.certificates.map((cert, certIndex) => (
                    <li key={certIndex} className="flex items-center">
                      <div className="bg-blue-100 p-1 rounded-full mr-2">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>{t('reqForeign.language.note')}</strong> {' '}
              {t('reqForeign.language.noteText')}
            </p>
          </div>
        </div>

        {/* Визовые требования */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {t('reqForeign.visa.title')}
              </h2>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Документы для визы */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t('reqForeign.visa.documentsTitle')}
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
                {t('reqForeign.visa.timelineTitle')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {t('reqForeign.visa.timeline1')}
                    </p>
                    <p className="text-sm text-gray-600">{t('reqForeign.visa.timeline1days')}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {t('reqForeign.visa.timeline2')}
                    </p>
                    <p className="text-sm text-gray-600">{t('reqForeign.visa.timeline2days')}</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {t('reqForeign.visa.timeline3')}
                    </p>
                    <p className="text-sm text-gray-600">{t('reqForeign.visa.timeline3days')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Поддержка международных студентов */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('reqForeign.support.title')}
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
                {t('reqForeign.support.housing.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('reqForeign.support.housing.desc')}
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('reqForeign.support.curator.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('reqForeign.support.curator.desc')}
              </p>
            </div>

            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('reqForeign.support.consultation.title')}
              </h3>
              <p className="text-gray-600 text-sm">
                {t('reqForeign.support.consultation.desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Контактная информация */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('reqForeign.contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('reqForeign.contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('reqForeign.contact.phone')}
              </h3>
              <p className="text-gray-600">+996 312 625 000</p>
            </div>
            
            <div className="p-4">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">
                {t('reqForeign.contact.email')}
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
                {t('reqForeign.contact.address')}
              </h3>
              <p className="text-gray-600">
                {t('reqForeign.contact.addressText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequirementsForeignCitizens;
