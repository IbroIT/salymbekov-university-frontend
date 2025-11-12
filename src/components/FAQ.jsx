import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [openItems, setOpenItems] = useState({});

  // Fallback данные на случай проблем с i18n
  const fallbackFaqData = [
    {
      question: "How do I apply to the university?",
      answer: "To apply, use the online application form available in the Admissions section. Fill out all required fields and upload your documents."
    },
    {
      question: "Where can I find information about tuition fees?",
      answer: "Tuition fees for citizens and foreign students are listed in the Admissions > Tuition section."
    },
    {
      question: "How can I contact the admissions office?",
      answer: "You can find contact details in the Contacts section or use the email and phone numbers provided there."
    }
  ];

  // Безопасное получение данных
  const getFaqData = () => {
    try {
      const items = t('faq.items', { returnObjects: true, defaultValue: fallbackFaqData });
      return Array.isArray(items) ? items : fallbackFaqData;
    } catch (error) {
      console.error('Error loading FAQ data:', error);
      return fallbackFaqData;
    }
  };

  const faqData = getFaqData();

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section className="faq-section py-16 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            {t('faq.title', 'Frequently Asked Questions')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Аккордеон FAQ */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-lg text-blue-900 pr-4">
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-blue-500 transition-transform duration-300 ${
                    openItems[index] ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <div className="w-12 h-1 bg-blue-200 rounded-full mb-4"></div>
                  <p className="text-blue-800 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full -translate-x-16 -translate-y-16 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-300 rounded-full translate-x-24 translate-y-24 opacity-10"></div>
    </section>
  );
};

export default FAQ;