import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const HSMCMK = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [animatedCounters, setAnimatedCounters] = useState({
    documents: 0,
    processes: 0,
    principles: 0,
    certificates: 0
  });
  
  const sectionRefs = useRef({});
  const observerRef = useRef(null);

  // Анимация появления при загрузке
  useEffect(() => {
    setIsVisible(true);
    
    // Анимация счетчиков
    const counters = {
      documents: 24,
      processes: 16,
      principles: 6,
      certificates: 3
    };

    Object.keys(counters).forEach(key => {
      animateCounter(0, counters[key], 2000, value => {
        setAnimatedCounters(prev => ({ ...prev, [key]: value }));
      });
    });

    // Intersection Observer для анимации при скролле
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const animateCounter = (start, end, duration, callback) => {
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const value = Math.floor(start + progress * (end - start));
      callback(value);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };

  const setSectionRef = (element, key) => {
    if (element && observerRef.current) {
      sectionRefs.current[key] = element;
      observerRef.current.observe(element);
    }
  };

  const statistics = [
    { number: animatedCounters.documents, label: t('smk.statistics.documents'), suffix: '+' },
    { number: animatedCounters.processes, label: t('smk.statistics.processes'), suffix: '+' },
    { number: animatedCounters.principles, label: t('smk.statistics.principles'), suffix: '' },
    { number: animatedCounters.certificates, label: t('smk.statistics.certificates'), suffix: '+' }
  ];

  const principles = [
    {
      title: t('smk.principles.customerOrientation.title'),
      description: t('smk.principles.customerOrientation.description'),
      icon: "👥",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: t('smk.principles.leadership.title'),
      description: t('smk.principles.leadership.description'),
      icon: "🌟",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: t('smk.principles.engagement.title'),
      description: t('smk.principles.engagement.description'),
      icon: "🤝",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: t('smk.principles.processApproach.title'),
      description: t('smk.principles.processApproach.description'),
      icon: "🔄",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: t('smk.principles.systemApproach.title'),
      description: t('smk.principles.systemApproach.description'),
      icon: "📊",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      title: t('smk.principles.continuousImprovement.title'),
      description: t('smk.principles.continuousImprovement.description'),
      icon: "📈",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  const tabs = [
    { id: 'about', label: t('smk.tabs.about') },
    { id: 'principles', label: t('smk.tabs.principles') },
    { id: 'documents', label: t('smk.tabs.documents') },
    { id: 'processes', label: t('smk.tabs.processes') },
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
      color: "blue",
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
      color: "green",
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
      color: "purple",
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
      color: "orange",
      icon: "🚀"
    }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-blue-100 mb-6">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">{t('smk.hero.certified')}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('smk.hero.title')}
          </h1>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {t('smk.hero.description')}
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <div 
              key={index}
              ref={el => setSectionRef(el, `stat-${index}`)}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 transform transition-all duration-500 opacity-0 translate-y-8"
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          
          {/* About Section */}
          {activeTab === 'about' && (
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    {t('smk.about.title')}
                  </h2>
                  <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                    <p>{t('smk.about.description1')}</p>
                    <p>{t('smk.about.description2')}</p>
                    <p>{t('smk.about.description3')}</p>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600 mb-2">ISO 9001:2015</div>
                      <div className="text-sm text-gray-600">{t('smk.about.standard')}</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                      <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
                      <div className="text-sm text-gray-600">{t('smk.about.compliance')}</div>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-4">{t('smk.about.advantages')}</h3>
                    <ul className="space-y-3">
                      {advantages.map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Principles Section */}
          {activeTab === 'principles' && (
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                {t('smk.principles.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {principles.map((principle, index) => (
                  <div
                    key={index}
                    ref={el => setSectionRef(el, `principle-${index}`)}
                    className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 translate-y-8"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${principle.gradient} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {principle.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {principle.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          {activeTab === 'documents' && (
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">
                {t('smk.documents.title')}
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('smk.documents.structure.title')}</h3>
                  <div className="space-y-4">
                    {documentStructure.map((doc, index) => (
                      <div 
                        key={index}
                        ref={el => setSectionRef(el, `doc-structure-${index}`)}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 opacity-0 translate-x-8 transition-all duration-500"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {doc.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{doc.level}</h4>
                          <p className="text-sm text-gray-600">{doc.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('smk.documents.downloads')}</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-4">
                    {t('smk.documents.list', { returnObjects: true }).map((doc, index) => (
                      <div
                        key={index}
                        ref={el => setSectionRef(el, `doc-item-${index}`)}
                        className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group opacity-0 translate-x-8"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                            doc.type === 'pdf' ? 'from-red-500 to-pink-500' : 'from-blue-500 to-cyan-500'
                          } flex items-center justify-center text-white font-bold text-sm`}>
                            {doc.type.toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                              {doc.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{doc.date}</span>
                              <span>{doc.size}</span>
                              <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                                {doc.category}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
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
          )}

          {/* Processes Section */}
          {activeTab === 'processes' && (
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                {t('smk.processes.title')}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {processGroups.map((group, index) => (
                  <div
                    key={index}
                    ref={el => setSectionRef(el, `process-${index}`)}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 opacity-0 translate-y-8"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-3xl">{group.icon}</div>
                      <h3 className={`text-2xl font-bold text-${group.color}-600`}>
                        {group.title}
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {group.processes.map((process, idx) => (
                        <li key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                          <div className={`w-3 h-3 bg-${group.color}-500 rounded-full`}></div>
                          <span className="text-gray-700">{process}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HSMCMK;