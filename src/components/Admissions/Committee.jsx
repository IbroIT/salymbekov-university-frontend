import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdmissionCommittee = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const admissionRequirements = [
    {
      id: 1,
      title: t('admission.documents'),
      description: t('admission.documentsDesc'),
      icon: '📄'
    },
    {
      id: 2,
      title: t('admission.exams'),
      description: t('admission.examsDesc'),
      icon: '📝'
    },
    {
      id: 3,
      title: t('admission.deadlines'),
      description: t('admission.deadlinesDesc'),
      icon: '⏰'
    },
    {
      id: 4,
      title: t('admission.consultation'),
      description: t('admission.consultationDesc'),
      icon: '👨‍⚕️'
    }
  ];

  const contactInfo = [
    {
      id: 1,
      type: t('admission.phone'),
      value: '+996 (312) 123-456',
      icon: '📞'
    },
    {
      id: 2,
      type: t('admission.email'),
      value: 'admission@medical.edu',
      icon: '✉️'
    },
    {
      id: 3,
      type: t('admission.address'),
      value: t('admission.addressValue'),
      icon: '📍'
    },
    {
      id: 4,
      type: t('admission.hours'),
      value: t('admission.hoursValue'),
      icon: '🕒'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-blue-800">
              {t('admission.title')}
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('admission.heroTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('admission.heroSubtitle')}
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
            {t('admission.applyNow')}
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Introduction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              {t('admission.welcome')}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('admission.introduction')}
            </p>
          </div>
        </section>

        {/* Requirements Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            {t('admission.requirements')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionRequirements.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-blue-500"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            {t('admission.contact')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">
                {t('admission.contactInfo')}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="text-2xl text-blue-600">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-blue-800">{item.type}</p>
                      <p className="text-gray-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form Preview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">
                {t('admission.startApplication')}
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    {t('admission.step1')}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    {t('admission.step2')}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    {t('admission.step3')}
                  </p>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300">
                  {t('admission.startNow')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="bg-blue-600 text-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('admission.importantDates')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-500 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {t('admission.date1Title')}
              </div>
              <div className="text-lg">{t('admission.date1Desc')}</div>
            </div>
            <div className="text-center p-4 bg-blue-500 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {t('admission.date2Title')}
              </div>
              <div className="text-lg">{t('admission.date2Desc')}</div>
            </div>
            <div className="text-center p-4 bg-blue-500 rounded-lg">
              <div className="text-2xl font-bold mb-2">
                {t('admission.date3Title')}
              </div>
              <div className="text-lg">{t('admission.date3Desc')}</div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            {t('admission.faq')}
          </h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {t('admission.faq1Question')}
              </h3>
              <p className="text-gray-600">{t('admission.faq1Answer')}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {t('admission.faq2Question')}
              </h3>
              <p className="text-gray-600">{t('admission.faq2Answer')}</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {t('admission.faq3Question')}
              </h3>
              <p className="text-gray-600">{t('admission.faq3Answer')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdmissionCommittee;