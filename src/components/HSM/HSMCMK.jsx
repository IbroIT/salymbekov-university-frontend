import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const HSMCMK = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'about', name: t('smk.tabs.about'), icon: '📋' },
    { id: 'principles', name: t('smk.tabs.principles'), icon: '🌟' },
    { id: 'documents', name: t('smk.tabs.documents'), icon: '📁' },
    { id: 'processes', name: t('smk.tabs.processes'), icon: '🔄' },
    { id: 'statistics', name: t('smk.statistics.title'), icon: '📊' }
  ];

  const principles = [
    {
      title: t('smk.principles.customerOrientation.title'),
      description: t('smk.principles.customerOrientation.description'),
      icon: "👥"
    },
    {
      title: t('smk.principles.leadership.title'),
      description: t('smk.principles.leadership.description'),
      icon: "🌟"
    },
    {
      title: t('smk.principles.engagement.title'),
      description: t('smk.principles.engagement.description'),
      icon: "🤝"
    },
    {
      title: t('smk.principles.processApproach.title'),
      description: t('smk.principles.processApproach.description'),
      icon: "🔄"
    },
    {
      title: t('smk.principles.systemApproach.title'),
      description: t('smk.principles.systemApproach.description'),
      icon: "📊"
    },
    {
      title: t('smk.principles.continuousImprovement.title'),
      description: t('smk.principles.continuousImprovement.description'),
      icon: "📈"
    }
  ];

  const advantages = [
    t('smk.advantages.studentSatisfaction'),
    t('smk.advantages.processOptimization'),
    t('smk.advantages.academicResults'),
    t('smk.advantages.internationalRecognition'),
    t('smk.advantages.resourceEfficiency')
  ];

  const documentStructure = [
    { level: t('smk.documents.structure.qualityPolicy'), desc: t('smk.documents.structure.strategicDirections'), step: "1" },
    { level: t('smk.documents.structure.qualityManual'), desc: t('smk.documents.structure.foundationalDocument'), step: "2" },
    { level: t('smk.documents.structure.procedures'), desc: t('smk.documents.structure.keyProcesses'), step: "3" },
    { level: t('smk.documents.structure.workInstructions'), desc: t('smk.documents.structure.detailedGuidance'), step: "4" },
    { level: t('smk.documents.structure.records'), desc: t('smk.documents.structure.resultsDocumentation'), step: "5" }
  ];

  const processGroups = [
    {
      title: t('smk.processes.main.title'),
      processes: [
        t('smk.processes.main.educational'),
        t('smk.processes.main.research'),
        t('smk.processes.main.educationalWork'),
        t('smk.processes.main.international')
      ],
      icon: "🎯"
    },
    {
      title: t('smk.processes.support.title'),
      processes: [
        t('smk.processes.support.hr'),
        t('smk.processes.support.technical'),
        t('smk.processes.support.information'),
        t('smk.processes.support.financial')
      ],
      icon: "⚙️"
    },
    {
      title: t('smk.processes.management.title'),
      processes: [
        t('smk.processes.management.strategic'),
        t('smk.processes.management.monitoring'),
        t('smk.processes.management.audits'),
        t('smk.processes.management.managementReview')
      ],
      icon: "📋"
    },
    {
      title: t('smk.processes.improvement.title'),
      processes: [
        t('smk.processes.improvement.nonConformity'),
        t('smk.processes.improvement.corrective'),
        t('smk.processes.improvement.preventive'),
        t('smk.processes.improvement.continuous')
      ],
      icon: "🚀"
    }
  ];

  const statistics = [
    { number: '24+', label: t('smk.statistics.documents') },
    { number: '16+', label: t('smk.statistics.processes') },
    { number: '6', label: t('smk.statistics.principles') },
    { number: '3+', label: t('smk.statistics.certificates') }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderAboutContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📋</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('smk.about.title')}
        </h2>
      </div>

      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>{t('smk.about.description1')}</p>
        <p>{t('smk.about.description2')}</p>
        <p>{t('smk.about.description3')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t('smk.about.advantages')}</h3>
          <ul className="space-y-3">
            {advantages.map((item, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">ISO 9001:2015</div>
            <div className="text-sm text-gray-600">{t('smk.about.standard')}</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-green-100">
            <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">{t('smk.about.compliance')}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrinciplesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🌟</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('smk.principles.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                {principle.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {principle.title}
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDocumentsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📁</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('smk.documents.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('smk.documents.structure.title')}</h3>
          <div className="space-y-4">
            {documentStructure.map((doc, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {doc.step}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{doc.level}</h4>
                  <p className="text-sm text-gray-600 mt-1">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">{t('smk.documents.downloads')}</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
            {t('smk.documents.list', { returnObjects: true }).map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 hover:shadow-sm transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg ${
                    doc.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500'
                  } flex items-center justify-center text-white font-bold text-sm`}>
                    {doc.type.toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {doc.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>{doc.date}</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {t('smk.documents.download')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcessesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🔄</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('smk.processes.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {processGroups.map((group, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="text-2xl">{group.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {group.title}
              </h3>
            </div>
            <ul className="space-y-3">
              {group.processes.map((process, idx) => (
                <li key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{process}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatisticsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('smk.statistics.title')}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl p-6 border border-blue-100 text-center"
          >
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return renderAboutContent();
      case 'principles':
        return renderPrinciplesContent();
      case 'documents':
        return renderDocumentsContent();
      case 'processes':
        return renderProcessesContent();
      case 'statistics':
        return renderStatisticsContent();
      default:
        return renderAboutContent();
    }
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
            {t('smk.hero.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('smk.hero.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('smk.sections')}
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

export default HSMCMK;