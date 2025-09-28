import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AdmissionProcess = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const admissionSteps = [
    {
      id: 1,
      title: t('admissionProcess.step1Title'),
      description: t('admissionProcess.step1Desc'),
      icon: '📝',
      details: t('admissionProcess.step1Details'),
      documents: ['admissionProcess.passport', 'admissionProcess.diploma', 'admissionProcess.photos', 'admissionProcess.medicalCert']
    },
    {
      id: 2,
      title: t('admissionProcess.step2Title'),
      description: t('admissionProcess.step2Desc'),
      icon: '🎓',
      details: t('admissionProcess.step2Details'),
      subjects: ['admissionProcess.biology', 'admissionProcess.chemistry', 'admissionProcess.language']
    },
    {
      id: 3,
      title: t('admissionProcess.step3Title'),
      description: t('admissionProcess.step3Desc'),
      icon: '💬',
      details: t('admissionProcess.step3Details'),
      criteria: ['admissionProcess.motivation', 'admissionProcess.communication', 'admissionProcess.aptitude']
    },
    {
      id: 4,
      title: t('admissionProcess.step4Title'),
      description: t('admissionProcess.step4Desc'),
      icon: '📋',
      details: t('admissionProcess.step4Details'),
      checks: ['admissionProcess.documentsCheck', 'admissionProcess.resultsCheck', 'admissionProcess.quotaCheck']
    },
    {
      id: 5,
      title: t('admissionProcess.step5Title'),
      description: t('admissionProcess.step5Desc'),
      icon: '🎉',
      details: t('admissionProcess.step5Details'),
      actions: ['admissionProcess.payment', 'admissionProcess.registration', 'admissionProcess.orientation']
    }
  ];

  const deadlines = [
    {
      period: t('admissionProcess.june'),
      events: [
        t('admissionProcess.juneEvent1'),
        t('admissionProcess.juneEvent2')
      ]
    },
    {
      period: t('admissionProcess.july'),
      events: [
        t('admissionProcess.julyEvent1'),
        t('admissionProcess.julyEvent2')
      ]
    },
    {
      period: t('admissionProcess.august'),
      events: [
        t('admissionProcess.augustEvent1'),
        t('admissionProcess.augustEvent2')
      ]
    }
  ];

  const requiredDocuments = [
    {
      category: t('admissionProcess.identityDocs'),
      items: [
        t('admissionProcess.passport'),
        t('admissionProcess.birthCertificate'),
        t('admissionProcess.idPhotos')
      ]
    },
    {
      category: t('admissionProcess.educationDocs'),
      items: [
        t('admissionProcess.highSchoolDiploma'),
        t('admissionProcess.transcript'),
        t('admissionProcess.universityDiploma')
      ]
    },
    {
      category: t('admissionProcess.medicalDocs'),
      items: [
        t('admissionProcess.healthCertificate'),
        t('admissionProcess.vaccinationCard'),
        t('admissionProcess.fluorography')
      ]
    },
    {
      category: t('admissionProcess.otherDocs'),
      items: [
        t('admissionProcess.militaryCard'),
        t('admissionProcess.applicationForm'),
        t('admissionProcess.recommendationLetters')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('admissionProcess.heroTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('admissionProcess.heroSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-500 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">5</div>
              <div>{t('admissionProcess.steps')}</div>
            </div>
            <div className="bg-blue-500 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">3</div>
              <div>{t('admissionProcess.months')}</div>
            </div>
            <div className="bg-blue-500 p-6 rounded-lg">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div>{t('admissionProcess.transparent')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('admissionProcess.processTitle')}
          </h2>
          
          {/* Desktop Steps */}
          <div className="hidden lg:block">
            <div className="flex justify-between items-start mb-12">
              {admissionSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center w-1/5">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 cursor-pointer ${
                      activeStep === index 
                        ? 'bg-blue-600 text-white scale-110 shadow-lg' 
                        : 'bg-white text-blue-600 shadow-md'
                    }`}
                    onClick={() => setActiveStep(index)}
                  >
                    {step.icon}
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="font-bold text-blue-800">{step.title}</h3>
                  </div>
                  <div className="w-full h-1 bg-blue-200 mt-8 relative">
                    {index < admissionSteps.length - 1 && (
                      <div className="absolute top-0 left-0 h-full bg-blue-500"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start mb-6">
                <div className="text-4xl mr-6">{admissionSteps[activeStep].icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2">
                    {admissionSteps[activeStep].title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {admissionSteps[activeStep].description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-blue-700 mb-4">
                    {t('admissionProcess.details')}
                  </h4>
                  <p className="text-gray-700 mb-6">
                    {admissionSteps[activeStep].details}
                  </p>
                  
                  {admissionSteps[activeStep].documents && (
                    <>
                      <h4 className="text-xl font-bold text-blue-700 mb-4">
                        {t('admissionProcess.requiredDocuments')}
                      </h4>
                      <ul className="space-y-2">
                        {admissionSteps[activeStep].documents.map((doc, idx) => (
                          <li key={idx} className="flex items-center text-gray-700">
                            <span className="text-blue-500 mr-2">•</span>
                            {t(doc)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  {admissionSteps[activeStep].subjects && (
                    <>
                      <h4 className="text-xl font-bold text-blue-700 mb-4">
                        {t('admissionProcess.examSubjects')}
                      </h4>
                      <div className="space-y-3">
                        {admissionSteps[activeStep].subjects.map((subject, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                            {t(subject)}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {admissionSteps[activeStep].criteria && (
                    <>
                      <h4 className="text-xl font-bold text-blue-700 mb-4">
                        {t('admissionProcess.interviewCriteria')}
                      </h4>
                      <div className="space-y-3">
                        {admissionSteps[activeStep].criteria.map((criterion, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
                            {t(criterion)}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Steps */}
          <div className="lg:hidden space-y-6">
            {admissionSteps.map((step, index) => (
              <div 
                key={step.id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-blue-800">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-gray-700">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('admissionProcess.requiredDocumentsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {requiredDocuments.map((category, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Deadlines */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('admissionProcess.deadlinesTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deadlines.map((deadline, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {deadline.period}
                </div>
                <div className="space-y-3">
                  {deadline.events.map((event, idx) => (
                    <div key={idx} className="bg-blue-50 rounded-lg p-3">
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('admissionProcess.contactTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-2">{t('admissionProcess.phone')}</h3>
              <p>+996 (312) 123-456</p>
              <p>+996 (312) 123-457</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">✉️</div>
              <h3 className="text-xl font-bold mb-2">{t('admissionProcess.email')}</h3>
              <p>admission@medical.edu</p>
              <p>info@medical.edu</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-2">{t('admissionProcess.address')}</h3>
              <p>{t('admissionProcess.addressValue')}</p>
            </div>
            <div className="text-center p-6">
              <div className="text-3xl mb-4">🕒</div>
              <h3 className="text-xl font-bold mb-2">{t('admissionProcess.hours')}</h3>
              <p>{t('admissionProcess.hoursValue')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('admissionProcess.faqTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {t('admissionProcess.faq1Question')}
                </h3>
                <p className="text-gray-700">{t('admissionProcess.faq1Answer')}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {t('admissionProcess.faq2Question')}
                </h3>
                <p className="text-gray-700">{t('admissionProcess.faq2Answer')}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {t('admissionProcess.faq3Question')}
                </h3>
                <p className="text-gray-700">{t('admissionProcess.faq3Answer')}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-2">
                  {t('admissionProcess.faq4Question')}
                </h3>
                <p className="text-gray-700">{t('admissionProcess.faq4Answer')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default AdmissionProcess;