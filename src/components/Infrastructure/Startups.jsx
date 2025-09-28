import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Startups = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  const startupCategories = [
    {
      id: 'all',
      name: t('startups.allStartups'),
      icon: '🚀',
      count: 8
    },
    {
      id: 'medtech',
      name: t('startups.medtech'),
      icon: '🩺',
      count: 4
    },
    {
      id: 'biotech',
      name: t('startups.biotech'),
      icon: '🧬',
      count: 2
    },
    {
      id: 'digital',
      name: t('startups.digitalHealth'),
      icon: '💻',
      count: 2
    }
  ];

  const startups = [
    {
      id: 1,
      name: t('startups.medAppName'),
      category: 'digital',
      stage: t('startups.seedStage'),
      description: t('startups.medAppDesc'),
      fullDescription: t('startups.medAppFullDesc'),
      image: '📱',
      team: ['startups.drSmith', 'startups.profJohnson', 'startups.engineerKim'],
      achievements: ['startups.achievement1', 'startups.achievement2', 'startups.achievement3'],
      funding: '$500K',
      investors: ['startups.universityFund', 'startups.angelGroup'],
      status: t('startups.active'),
      year: '2023'
    },
    {
      id: 2,
      name: t('startups.bioSensorName'),
      category: 'medtech',
      stage: t('startups.seriesA'),
      description: t('startups.bioSensorDesc'),
      fullDescription: t('startups.bioSensorFullDesc'),
      image: '📟',
      team: ['startups.profBrown', 'startups.drWilson', 'startups.researcherLee'],
      achievements: ['startups.achievement4', 'startups.achievement5', 'startups.achievement6'],
      funding: '$1.2M',
      investors: ['startups.ventureCapital', 'startups.techFund'],
      status: t('startups.scaling'),
      year: '2022'
    },
    {
      id: 3,
      name: t('startups.drugDiscoveryName'),
      category: 'biotech',
      stage: t('startups.research'),
      description: t('startups.drugDiscoveryDesc'),
      fullDescription: t('startups.drugDiscoveryFullDesc'),
      image: '💊',
      team: ['startups.drGarcia', 'startups.profChen', 'startups.scientistPatel'],
      achievements: ['startups.achievement7', 'startups.achievement8'],
      funding: '$300K',
      investors: ['startups.researchGrant', 'startups.universityFund'],
      status: t('startups.development'),
      year: '2024'
    },
    {
      id: 4,
      name: t('startups.telemedName'),
      category: 'digital',
      stage: t('startups.growth'),
      description: t('startups.telemedDesc'),
      fullDescription: t('startups.telemedFullDesc'),
      image: '🖥️',
      team: ['startups.drMiller', 'startups.engineerDavis', 'startups.designerTaylor'],
      achievements: ['startups.achievement9', 'startups.achievement10', 'startups.achievement11'],
      funding: '$800K',
      investors: ['startups.healthFund', 'startups.angelGroup'],
      status: t('startups.active'),
      year: '2023'
    },
    {
      id: 5,
      name: t('startups.prostheticName'),
      category: 'medtech',
      stage: t('startups.seedStage'),
      description: t('startups.prostheticDesc'),
      fullDescription: t('startups.prostheticFullDesc'),
      image: '🦾',
      team: ['startups.profAnderson', 'startups.drWhite', 'startups.bioengineerSingh'],
      achievements: ['startups.achievement12', 'startups.achievement13'],
      funding: '$400K',
      investors: ['startups.innovationGrant', 'startups.universityFund'],
      status: t('startups.prototype'),
      year: '2024'
    },
    {
      id: 6,
      name: t('startups.geneTherapyName'),
      category: 'biotech',
      stage: t('startups.research'),
      description: t('startups.geneTherapyDesc'),
      fullDescription: t('startups.geneTherapyFullDesc'),
      image: '🧬',
      team: ['startups.drRoberts', 'startups.profMartinez', 'startups.geneticistWang'],
      achievements: ['startups.achievement14', 'startups.achievement15'],
      funding: '$600K',
      investors: ['startups.researchGrant', 'startups.bioFund'],
      status: t('startups.research'),
      year: '2023'
    }
  ];

  const filteredStartups = activeCategory === 'all' 
    ? startups 
    : startups.filter(startup => startup.category === activeCategory);

  const statistics = [
    { number: '15+', label: t('startups.activeStartups') },
    { number: '$5M+', label: t('startups.totalFunding') },
    { number: '50+', label: t('startups.teamMembers') },
    { number: '10+', label: t('startups.patents') }
  ];

  const successStories = [
    {
      name: t('startups.story1Name'),
      quote: t('startups.story1Quote'),
      role: t('startups.story1Role')
    },
    {
      name: t('startups.story2Name'),
      quote: t('startups.story2Quote'),
      role: t('startups.story2Role')
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('startups.heroTitle')}
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {t('startups.heroSubtitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
            {t('startups.categories')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {startupCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-bold text-lg">{category.name}</div>
                <div className="text-sm opacity-80 mt-1">{category.count} {t('startups.projects')}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('startups.ourStartups')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStartups.map((startup) => (
              <div
                key={startup.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedStartup(startup)}
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-8 text-center text-white">
                  <div className="text-6xl mb-4">{startup.image}</div>
                  <h3 className="text-2xl font-bold mb-2">{startup.name}</h3>
                  <div className="flex justify-center items-center space-x-2">
                    <span className="bg-blue-400 px-3 py-1 rounded-full text-sm">
                      {t(`startups.${startup.category}`)}
                    </span>
                    <span className="bg-green-400 px-3 py-1 rounded-full text-sm">
                      {startup.stage}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {startup.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-500">
                      {t('startups.funding')}: <span className="font-bold text-green-600">{startup.funding}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      startup.status === t('startups.active') ? 'bg-green-100 text-green-800' :
                      startup.status === t('startups.scaling') ? 'bg-blue-100 text-blue-800' :
                      startup.status === t('startups.development') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {startup.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{startup.year}</span>
                    <button className="text-blue-600 font-semibold hover:text-blue-800">
                      {t('startups.learnMore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Startup Details Modal */}
      {selectedStartup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedStartup.name}</h2>
                  <div className="flex items-center space-x-4 flex-wrap">
                    <span className="bg-blue-500 px-3 py-1 rounded-full">
                      {t(`startups.${selectedStartup.category}`)}
                    </span>
                    <span className="bg-green-500 px-3 py-1 rounded-full">
                      {selectedStartup.stage}
                    </span>
                    <span className="bg-purple-500 px-3 py-1 rounded-full">
                      {selectedStartup.year}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStartup(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="text-center bg-blue-50 rounded-2xl p-8 mb-6">
                    <div className="text-8xl mb-4">{selectedStartup.image}</div>
                    <div className="text-2xl font-bold text-blue-800">{selectedStartup.name}</div>
                    <div className="text-lg text-blue-600 mt-2">{selectedStartup.stage}</div>
                  </div>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('startups.description')}
                  </h3>
                  <p className="text-gray-700 mb-6">{selectedStartup.fullDescription}</p>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('startups.achievements')}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {selectedStartup.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-700">{t(achievement)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4">
                      {t('startups.fundingInfo')}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('startups.totalFunding')}:</span>
                        <span className="font-bold text-green-600 text-lg">{selectedStartup.funding}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('startups.currentStage')}:</span>
                        <span className="font-bold">{selectedStartup.stage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{t('startups.status')}:</span>
                        <span className={`font-bold ${
                          selectedStartup.status === t('startups.active') ? 'text-green-600' :
                          selectedStartup.status === t('startups.scaling') ? 'text-blue-600' :
                          selectedStartup.status === t('startups.development') ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {selectedStartup.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('startups.team')}
                  </h3>
                  <div className="space-y-3 mb-6">
                    {selectedStartup.team.map((member, index) => (
                      <div
                        key={index}
                        className="bg-white border border-blue-200 rounded-lg p-3"
                      >
                        {t(member)}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {t('startups.investors')}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedStartup.investors.map((investor, index) => (
                      <div
                        key={index}
                        className="bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-center text-sm"
                      >
                        {t(investor)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedStartup(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  {t('startups.close')}
                </button>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {t('startups.contactTeam')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            {t('startups.successStories')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-blue-50 rounded-2xl p-8">
                <div className="text-4xl mb-4">🌟</div>
                <p className="text-gray-700 text-lg italic mb-4">"{story.quote}"</p>
                <div className="text-right">
                  <div className="font-bold text-blue-800">{story.name}</div>
                  <div className="text-blue-600">{story.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Programs */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t('startups.supportPrograms')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">{t('startups.fundingSupport')}</h3>
              <p className="opacity-90">
                {t('startups.fundingSupportDesc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-3">{t('startups.mentorship')}</h3>
              <p className="opacity-90">
                {t('startups.mentorshipDesc')}
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3">{t('startups.labAccess')}</h3>
              <p className="opacity-90">
                {t('startups.labAccessDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            {t('startups.ctaTitle')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('startups.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all duration-300">
              {t('startups.submitProject')}
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300">
              {t('startups.contactUs')}
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Startups;