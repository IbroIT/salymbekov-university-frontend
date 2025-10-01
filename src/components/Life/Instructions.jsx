import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon, 
  CalendarDaysIcon,
  UserGroupIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  ShareIcon,
  ClockIcon,
  PhoneIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const Instructions = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [savedGuides, setSavedGuides] = useState([]);
  const [expandedSteps, setExpandedSteps] = useState({});

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загрузка сохраненных инструкций из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedGuides');
    if (saved) {
      setSavedGuides(JSON.parse(saved));
    }
  }, []);

  // Сохранение инструкций в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('savedGuides', JSON.stringify(savedGuides));
  }, [savedGuides]);

  const sections = [
    { id: 'all', name: t('studentLife.instructions.allInstructions'), icon: '📋' },
    { id: 'academic', name: t('studentLife.instructions.academic'), icon: '🎓' },
    { id: 'administrative', name: t('studentLife.instructions.administrative'), icon: '🏢' },
    { id: 'studentServices', name: t('studentLife.instructions.studentServices'), icon: '👥' },
    { id: 'saved', name: t('studentLife.instructions.savedInstructions'), icon: '⭐' }
  ];

  // Mock data for instructions
  const instructionsData = [
    {
      id: 1,
      title: t('studentLife.instructions.enrollment.title'),
      description: t('studentLife.instructions.enrollment.description'),
      category: 'academic',
      icon: 'DocumentTextIcon',
      requirements: [
        t('studentLife.instructions.enrollment.requirements.0'),
        t('studentLife.instructions.enrollment.requirements.1'),
        t('studentLife.instructions.enrollment.requirements.2')
      ],
      estimated_time: t('studentLife.instructions.enrollment.estimatedTime'),
      contact_info: t('studentLife.instructions.enrollment.contactInfo'),
      steps: [
        {
          step_number: 1,
          title: t('studentLife.instructions.enrollment.steps.0.title'),
          description: t('studentLife.instructions.enrollment.steps.0.description'),
          timeframe: t('studentLife.instructions.enrollment.steps.0.timeframe'),
          details: [
            t('studentLife.instructions.enrollment.steps.0.details.0'),
            t('studentLife.instructions.enrollment.steps.0.details.1')
          ]
        },
        {
          step_number: 2,
          title: t('studentLife.instructions.enrollment.steps.1.title'),
          description: t('studentLife.instructions.enrollment.steps.1.description'),
          timeframe: t('studentLife.instructions.enrollment.steps.1.timeframe'),
          details: [
            t('studentLife.instructions.enrollment.steps.1.details.0'),
            t('studentLife.instructions.enrollment.steps.1.details.1')
          ]
        }
      ]
    },
    {
      id: 2,
      title: t('studentLife.instructions.dormitory.title'),
      description: t('studentLife.instructions.dormitory.description'),
      category: 'studentServices',
      icon: 'UserGroupIcon',
      requirements: [
        t('studentLife.instructions.dormitory.requirements.0'),
        t('studentLife.instructions.dormitory.requirements.1')
      ],
      estimated_time: t('studentLife.instructions.dormitory.estimatedTime'),
      contact_info: t('studentLife.instructions.dormitory.contactInfo'),
      steps: [
        {
          step_number: 1,
          title: t('studentLife.instructions.dormitory.steps.0.title'),
          description: t('studentLife.instructions.dormitory.steps.0.description'),
          timeframe: t('studentLife.instructions.dormitory.steps.0.timeframe'),
          details: [
            t('studentLife.instructions.dormitory.steps.0.details.0'),
            t('studentLife.instructions.dormitory.steps.0.details.1')
          ]
        }
      ]
    },
    {
      id: 3,
      title: t('studentLife.instructions.scholarship.title'),
      description: t('studentLife.instructions.scholarship.description'),
      category: 'administrative',
      icon: 'ClipboardDocumentListIcon',
      requirements: [
        t('studentLife.instructions.scholarship.requirements.0'),
        t('studentLife.instructions.scholarship.requirements.1'),
        t('studentLife.instructions.scholarship.requirements.2')
      ],
      estimated_time: t('studentLife.instructions.scholarship.estimatedTime'),
      contact_info: t('studentLife.instructions.scholarship.contactInfo'),
      steps: [
        {
          step_number: 1,
          title: t('studentLife.instructions.scholarship.steps.0.title'),
          description: t('studentLife.instructions.scholarship.steps.0.description'),
          timeframe: t('studentLife.instructions.scholarship.steps.0.timeframe'),
          details: [
            t('studentLife.instructions.scholarship.steps.0.details.0'),
            t('studentLife.instructions.scholarship.steps.0.details.1')
          ]
        }
      ]
    },
    {
      id: 4,
      title: t('studentLife.instructions.academicLeave.title'),
      description: t('studentLife.instructions.academicLeave.description'),
      category: 'academic',
      icon: 'CalendarDaysIcon',
      requirements: [
        t('studentLife.instructions.academicLeave.requirements.0'),
        t('studentLife.instructions.academicLeave.requirements.1')
      ],
      estimated_time: t('studentLife.instructions.academicLeave.estimatedTime'),
      contact_info: t('studentLife.instructions.academicLeave.contactInfo'),
      steps: [
        {
          step_number: 1,
          title: t('studentLife.instructions.academicLeave.steps.0.title'),
          description: t('studentLife.instructions.academicLeave.steps.0.description'),
          timeframe: t('studentLife.instructions.academicLeave.steps.0.timeframe'),
          details: [
            t('studentLife.instructions.academicLeave.steps.0.details.0'),
            t('studentLife.instructions.academicLeave.steps.0.details.1')
          ]
        }
      ]
    }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const toggleSaveGuide = (guideId) => {
    if (savedGuides.includes(guideId)) {
      setSavedGuides(savedGuides.filter(id => id !== guideId));
    } else {
      setSavedGuides([...savedGuides, guideId]);
    }
  };

  const toggleStep = (stepIndex) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepIndex]: !prev[stepIndex]
    }));
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'CalendarDaysIcon': CalendarDaysIcon,
      'UserGroupIcon': UserGroupIcon,
      'ClipboardDocumentListIcon': ClipboardDocumentListIcon,
      'DocumentTextIcon': DocumentTextIcon
    };
    return iconMap[iconName] || DocumentTextIcon;
  };

  const filteredInstructions = activeSection === 'saved' 
    ? instructionsData.filter(guide => savedGuides.includes(guide.id))
    : activeSection === 'all' 
    ? instructionsData 
    : instructionsData.filter(guide => guide.category === activeSection);

  const renderAllInstructionsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📋</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('studentLife.instructions.allInstructions')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInstructions.map((instruction) => {
          const IconComponent = getIconComponent(instruction.icon);
          return (
            <div 
              key={instruction.id}
              className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {instruction.title}
                    </h3>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <span className="bg-blue-100 px-2 py-1 rounded-full">
                        {instruction.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSaveGuide(instruction.id)}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  {savedGuides.includes(instruction.id) ? (
                    <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <BookmarkIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {instruction.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{t('studentLife.instructions.estimatedTime')}: {instruction.estimated_time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  <span>{instruction.contact_info}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 text-sm">
                  {t('studentLife.instructions.requirements')}:
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {instruction.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 space-y-3">
                {instruction.steps.slice(0, 2).map((step, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                          {step.step_number}
                        </div>
                        <span className="text-sm font-medium text-gray-800">{step.title}</span>
                      </div>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {step.timeframe}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderInstructionDetail = (instruction) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            {(() => {
              const IconComponent = getIconComponent(instruction.icon);
              return <IconComponent className="w-6 h-6 text-blue-600" />;
            })()}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {instruction.title}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => toggleSaveGuide(instruction.id)}
            className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            {savedGuides.includes(instruction.id) ? (
              <BookmarkSlashIcon className="w-5 h-5 text-yellow-500" />
            ) : (
              <BookmarkIcon className="w-5 h-5 text-blue-600" />
            )}
          </button>
          <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
            <ShareIcon className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <p className="text-gray-700 leading-relaxed">
          {instruction.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
            {t('studentLife.instructions.requirements')}
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            {instruction.requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <ClockIcon className="w-5 h-5 text-blue-500 mr-2" />
            {t('studentLife.instructions.timeframe')}
          </h3>
          <p className="text-sm text-gray-600">
            {instruction.estimated_time}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <PhoneIcon className="w-5 h-5 text-indigo-500 mr-2" />
            {t('studentLife.instructions.contacts')}
          </h3>
          <p className="text-sm text-gray-600">
            {instruction.contact_info}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">
          {t('studentLife.instructions.steps')}
        </h3>
        {instruction.steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl p-5 border border-blue-100">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">
                  {step.step_number}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
              <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                {step.timeframe}
              </span>
            </div>

            {step.details && step.details.length > 0 && (
              <div className="pl-12">
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
        <div className="flex items-start">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              {t('studentLife.instructions.importantNotes')}
            </h3>
            <ul className="text-yellow-700 space-y-2 text-sm">
              <li>• {t('studentLife.instructions.notes.0')}</li>
              <li>• {t('studentLife.instructions.notes.1')}</li>
              <li>• {t('studentLife.instructions.notes.2')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    // For simplicity, showing first instruction as detail view
    // In real app, you would manage selected instruction state
    const selectedInstruction = filteredInstructions[0];
    
    if (selectedInstruction && activeSection !== 'saved') {
      return renderInstructionDetail(selectedInstruction);
    }

    return renderAllInstructionsContent();
  };

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
            {t('studentLife.instructions.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('studentLife.instructions.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('studentLife.instructions.categories')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => changeActiveSection(section.id)}
                      >
                        <span className="text-lg mr-3">{section.icon}</span>
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
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
