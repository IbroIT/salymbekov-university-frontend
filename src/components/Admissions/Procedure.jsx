import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AdmissionProcess = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("process");

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sections data
  const sectionsData = {
    process: {
      title: t("admissionProcess.processTitle", "Процесс поступления"),
      description: t("admissionProcess.processDescription", "Пошаговое руководство по поступлению в Высшую медицинскую школу"),
      content: "process"
    },
    documents: {
      title: t("admissionProcess.requiredDocumentsTitle", "Необходимые документы"),
      description: t("admissionProcess.documentsDescription", "Полный список документов для подачи заявления"),
      content: "documents"
    },
    deadlines: {
      title: t("admissionProcess.deadlinesTitle", "Важные сроки"),
      description: t("admissionProcess.deadlinesDescription", "График приемной кампании и важные даты"),
      content: "deadlines"
    },
    contact: {
      title: t("admissionProcess.contactTitle", "Контакты"),
      description: t("admissionProcess.contactDescription", "Контактная информация приемной комиссии"),
      content: "contact"
    }
  };

  // Sections list for navigation
  const sectionsList = [
    { id: "process", name: t("admissionProcess.processNav", "Процесс") },
    { id: "documents", name: t("admissionProcess.documentsNav", "Документы") },
    { id: "deadlines", name: t("admissionProcess.deadlinesNav", "Сроки") },
    { id: "contact", name: t("admissionProcess.contactNav", "Контакты") }
  ];

  // Get current section data
  const getCurrentSectionData = () => {
    return sectionsData[activeSection] || sectionsData.process;
  };

  const currentSectionData = getCurrentSectionData();

  // Admission steps data
  const admissionSteps = [
    {
      id: 1,
      title: t("admissionProcess.step1Title", "Подача документов"),
      description: t("admissionProcess.step1Desc", "Подготовка и подача необходимых документов"),
      icon: "📝",
      details: t("admissionProcess.step1Details", "Заполнение заявления и предоставление всех необходимых документов в установленные сроки"),
      documents: [
        t("admissionProcess.passport", "Паспорт или удостоверение личности"),
        t("admissionProcess.diploma", "Аттестат о среднем образовании"),
        t("admissionProcess.photos", "Фотографии 3x4"),
        t("admissionProcess.medicalCert", "Медицинская справка")
      ]
    },
    {
      id: 2,
      title: t("admissionProcess.step2Title", "Вступительные экзамены"),
      description: t("admissionProcess.step2Desc", "Сдача вступительных испытаний"),
      icon: "🎓",
      details: t("admissionProcess.step2Details", "Тестирование по основным предметам и специализированным дисциплинам"),
      subjects: [
        t("admissionProcess.biology", "Биология"),
        t("admissionProcess.chemistry", "Химия"),
        t("admissionProcess.language", "Язык обучения")
      ]
    },
    {
      id: 3,
      title: t("admissionProcess.step3Title", "Собеседование"),
      description: t("admissionProcess.step3Desc", "Личное собеседование с комиссией"),
      icon: "💬",
      details: t("admissionProcess.step3Details", "Оценка мотивации, коммуникативных навыков и профессиональной пригодности"),
      criteria: [
        t("admissionProcess.motivation", "Мотивация к обучению"),
        t("admissionProcess.communication", "Коммуникативные навыки"),
        t("admissionProcess.aptitude", "Профессиональная пригодность")
      ]
    },
    {
      id: 4,
      title: t("admissionProcess.step4Title", "Рассмотрение заявления"),
      description: t("admissionProcess.step4Desc", "Окончательное рассмотрение документов"),
      icon: "📋",
      details: t("admissionProcess.step4Details", "Проверка всех документов и результатов испытаний"),
      checks: [
        t("admissionProcess.documentsCheck", "Проверка документов"),
        t("admissionProcess.resultsCheck", "Анализ результатов"),
        t("admissionProcess.quotaCheck", "Распределение по квотам")
      ]
    },
    {
      id: 5,
      title: t("admissionProcess.step5Title", "Зачисление"),
      description: t("admissionProcess.step5Desc", "Оформление и зачисление"),
      icon: "🎉",
      details: t("admissionProcess.step5Details", "Окончательное оформление документов и зачисление в учебное заведение"),
      actions: [
        t("admissionProcess.payment", "Оплата обучения"),
        t("admissionProcess.registration", "Регистрация"),
        t("admissionProcess.orientation", "Вводный инструктаж")
      ]
    }
  ];

  // Required documents data
  const requiredDocuments = [
    {
      category: t("admissionProcess.identityDocs", "Документы, удостоверяющие личность"),
      items: [
        t("admissionProcess.passport", "Паспорт или удостоверение личности"),
        t("admissionProcess.birthCertificate", "Свидетельство о рождении"),
        t("admissionProcess.idPhotos", "Фотографии 3x4 см")
      ]
    },
    {
      category: t("admissionProcess.educationDocs", "Образовательные документы"),
      items: [
        t("admissionProcess.highSchoolDiploma", "Аттестат о среднем образовании"),
        t("admissionProcess.transcript", "Академическая справка"),
        t("admissionProcess.universityDiploma", "Диплом о высшем образовании")
      ]
    },
    {
      category: t("admissionProcess.medicalDocs", "Медицинские документы"),
      items: [
        t("admissionProcess.healthCertificate", "Медицинская справка"),
        t("admissionProcess.vaccinationCard", "Прививочный сертификат"),
        t("admissionProcess.fluorography", "Флюорография")
      ]
    },
    {
      category: t("admissionProcess.otherDocs", "Прочие документы"),
      items: [
        t("admissionProcess.militaryCard", "Военный билет"),
        t("admissionProcess.applicationForm", "Заявление на поступление"),
        t("admissionProcess.recommendationLetters", "Рекомендательные письма")
      ]
    }
  ];

  // Deadlines data
  const deadlines = [
    {
      period: t("admissionProcess.june", "Июнь"),
      events: [
        t("admissionProcess.juneEvent1", "Начало приема документов"),
        t("admissionProcess.juneEvent2", "Дедлайн ранней подачи")
      ]
    },
    {
      period: t("admissionProcess.july", "Июль"),
      events: [
        t("admissionProcess.julyEvent1", "Вступительные экзамены"),
        t("admissionProcess.julyEvent2", "Собеседования")
      ]
    },
    {
      period: t("admissionProcess.august", "Август"),
      events: [
        t("admissionProcess.augustEvent1", "Объявление результатов"),
        t("admissionProcess.augustEvent2", "Зачисление")
      ]
    }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: "📞",
      title: t("admissionProcess.phone", "Телефон"),
      details: [
        "+996 (312) 123-456",
        "+996 (312) 123-457"
      ]
    },
    {
      icon: "✉️",
      title: t("admissionProcess.email", "Email"),
      details: [
        "admission@medical.edu",
        "info@medical.edu"
      ]
    },
    {
      icon: "🏢",
      title: t("admissionProcess.address", "Адрес"),
      details: [
        t("admissionProcess.addressValue", "г. Бишкек, ул. Ахунбаева 92")
      ]
    },
    {
      icon: "🕒",
      title: t("admissionProcess.hours", "Часы работы"),
      details: [
        t("admissionProcess.hoursValue", "Пн-Пт: 9:00-18:00")
      ]
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: t("admissionProcess.faq1Question", "Какие документы нужны для поступления?"),
      answer: t("admissionProcess.faq1Answer", "Полный список документов указан в разделе 'Необходимые документы'")
    },
    {
      question: t("admissionProcess.faq2Question", "Когда начинается прием документов?"),
      answer: t("admissionProcess.faq2Answer", "Прием документов начинается в июне, точные даты смотрите в разделе 'Важные сроки'")
    },
    {
      question: t("admissionProcess.faq3Question", "Какие экзамены нужно сдавать?"),
      answer: t("admissionProcess.faq3Answer", "Вступительные экзамены включают биологию, химию и язык обучения")
    },
    {
      question: t("admissionProcess.faq4Question", "Есть ли подготовительные курсы?"),
      answer: t("admissionProcess.faq4Answer", "Да, подготовительные курсы доступны с мая по июнь")
    }
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("admissionProcess.heroTitle", "Поступление в ВМШ")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("admissionProcess.heroSubtitle", "Станьте частью ведущей медицинской школы Кыргызстана")}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg text-center">
            <div className="text-3xl font-bold mb-2">5</div>
            <div className="text-sm">{t("admissionProcess.steps", "Этапов")}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg text-center">
            <div className="text-3xl font-bold mb-2">3</div>
            <div className="text-sm">{t("admissionProcess.months", "Месяца")}</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg text-center">
            <div className="text-3xl font-bold mb-2">100%</div>
            <div className="text-sm">{t("admissionProcess.transparent", "Прозрачность")}</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm">{t("admissionProcess.support", "Поддержка")}</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("admissionProcess.navigation", "Навигация")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sectionsList.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        {section.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentSectionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentSectionData.description}
                </p>
              </div>

              {/* Контент раздела - Процесс */}
              {activeSection === "process" && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {admissionSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="text-3xl mr-4">{step.icon}</div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {step.title}
                              </h3>
                              <p className="text-blue-600 text-sm">
                                {step.description}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-sm mb-4">
                            {step.details}
                          </p>

                          {/* Особенности в зависимости от типа шага */}
                          <div className="space-y-3">
                            {step.documents && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                  {t("admissionProcess.requiredDocuments", "Необходимые документы")}
                                </h4>
                                <ul className="space-y-1">
                                  {step.documents.map((doc, idx) => (
                                    <li key={idx} className="flex items-center text-gray-600 text-xs">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                      {doc}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {step.subjects && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                  {t("admissionProcess.examSubjects", "Предметы экзамена")}
                                </h4>
                                <div className="space-y-1">
                                  {step.subjects.map((subject, idx) => (
                                    <div key={idx} className="bg-white rounded px-2 py-1 text-xs text-gray-600 border">
                                      {subject}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {step.criteria && (
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                                  {t("admissionProcess.interviewCriteria", "Критерии собеседования")}
                                </h4>
                                <div className="space-y-1">
                                  {step.criteria.map((criterion, idx) => (
                                    <div key={idx} className="bg-white rounded px-2 py-1 text-xs text-gray-600 border">
                                      {criterion}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Контент раздела - Документы */}
              {activeSection === "documents" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocuments.map((category, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-md border border-purple-100 p-6"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                          {category.category}
                        </h3>
                        <ul className="space-y-3">
                          {category.items.map((item, idx) => (
                            <li key={idx} className="flex items-start text-gray-700">
                              <span className="text-purple-500 mr-2 mt-1">•</span>
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Контент раздела - Сроки */}
              {activeSection === "deadlines" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deadlines.map((deadline, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-md border border-green-100 p-6 text-center"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="text-xl font-bold text-green-600 mb-4">
                          {deadline.period}
                        </div>
                        <div className="space-y-3">
                          {deadline.events.map((event, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 text-sm text-gray-700 border">
                              {event}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Контент раздела - Контакты */}
              {activeSection === "contact" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactInfo.map((contact, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md border border-blue-100 p-6"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center mb-4">
                          <div className="text-2xl mr-4">{contact.icon}</div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {contact.title}
                          </h3>
                        </div>
                        <div className="space-y-2">
                          {contact.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FAQ Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">
                      {t("admissionProcess.faqTitle", "Часто задаваемые вопросы")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {faqData.map((faq, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-white to-orange-50 rounded-xl p-4 border border-orange-100"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionProcess;