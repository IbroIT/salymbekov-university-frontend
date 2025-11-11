import React, { useState } from 'react';
import { BookOpen, Calendar, File, Handshake, Hospital, Monitor, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SEOComponent from '../SEO/SEOComponent';

const MedicalProgramPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const accordionItems = [

    
    {
      title: t('mededu.clinicalTraining'),
      icon: "Hospital",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.clinical.bases')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('mededu.clinical.basesList.hospital')}</li>
              <li>{t('mededu.clinical.basesList.children')}</li>
              <li>{t('mededu.clinical.basesList.cardiology')}</li>
              <li>{t('mededu.clinical.basesList.maternity')}</li>
              <li>{t('mededu.clinical.basesList.ambulance')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.clinical.stages')}</h4>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{t('mededu.clinical.practiceStages.thirdYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.fourthYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.fifthYear')}</strong></li>
              <li><strong>{t('mededu.clinical.practiceStages.sixthYear')}</strong></li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: t('partnerships.title'),
      icon: "Handshake",
      content: (
        <div className="text-center py-8">
          <button
            onClick={() => navigate('/hsm/partners')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center mx-auto"
          >
            <Handshake className="w-4 h-4" />
            {t('partnerships.viewPartners')}
            <span className="ml-3">→</span>
          </button>
        </div>
      )
    },
    {
      title: t('mededu.faq'),
      icon: "❓",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.faqContent.general')}</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.duration')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.duration')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.internship')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.internship')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.specializations')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.specializations')}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-3">{t('mededu.faqContent.admission')}</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.exams')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.exams')}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">{t('mededu.faqContent.questions.budget')}</p>
                <p className="mt-1">{t('mededu.faqContent.answers.budget')}</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      {/* SEO Component */}
      <SEOComponent pageType="hsm" />
      
      <div className="max-w-6xl mx-auto">
        {/* Заголовок блока */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">{t('mededu.title')}</h1>
          <p className="text-blue-600 text-lg">{t('mededu.code')}</p>
        </div>

        {/* Основная информация в блоках */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3"><Clock className="w-5 h-5" /></span>
              <h3 className="text-xl font-semibold">{t('mededu.duration')}</h3>
            </div>
            <p className="text-lg">{t('mededu.fullTime')}</p>
            <p className="text-lg">{t('mededu.partTime')}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-3">
              <Calendar className="w-4 h-4" />
              <h3 className="text-xl font-semibold">{t('mededu.intakes')}</h3>
            </div>
            <p className="text-lg">{t('mededu.intakeMonths')}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-3">
              <File className="w-4 h-4" />
              <h3 className="text-xl font-semibold">{t('mededu.brochure')}</h3>
            </div>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              {t('mededu.download')}
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6 transform transition-transform hover:scale-105">
            <div className="flex items-center mb-3">
              <Monitor className="w-4 h-4" />
              <h3 className="text-xl font-semibold">{t('mededu.online')}</h3>
            </div>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              {t('mededu.application')}
            </button>
          </div>
        </div>

        {/* Описание программы */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">{t('mededu.overview')}</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>{t('mededu.overviewText')}</p>
            
            {/* Цели программы */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">{t('mededu.programAim')}</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                    <Target className="w-4 h-4" />
                    {t('mededu.aims.mainGoals')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>{t('mededu.aims.goalsList.quality')}</li>
                    <li>{t('mededu.aims.goalsList.standards')}</li>
                    <li>{t('mededu.aims.goalsList.thinking')}</li>
                    <li>{t('mededu.aims.goalsList.ethics')}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                    <BookOpen className="w-4 h-4" />
                    {t('mededu.aims.learningObjectives')}
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-6">
                    <li>{t('mededu.aims.objectivesList.knowledge')}</li>
                    <li>{t('mededu.aims.objectivesList.communication')}</li>
                    <li>{t('mededu.aims.objectivesList.research')}</li>
                    <li>{t('mededu.aims.objectivesList.continuous')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Аккордеон с дополнительной информацией */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">{t('mededu.details')}</h2>
          <div className="space-y-4">
            {accordionItems.map((item, index) => (
              <div key={index} className="border border-blue-200 rounded-lg overflow-hidden">
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-blue-50 hover:bg-blue-100 transition-colors"
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">
              </span>
                    <span className="text-xl font-semibold text-blue-800">{item.title}</span>
                  </div>
                  <span className={`transform transition-transform text-blue-600 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-screen p-6' : 'max-h-0'}`}>
                  <div className="text-gray-700 leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalProgramPage;