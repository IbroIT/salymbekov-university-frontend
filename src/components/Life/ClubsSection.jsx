import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ClubsSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('all');
  const [clubs, setClubs] = useState([]);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Имитация загрузки данных
    const loadedClubs = [
      {
        id: 1,
        name: t('clubs.medical.name'),
        members: 50,
        description: t('clubs.medical.description'),
        icon: "🩺",
        category: 'academic',
        leader: t('clubs.medical.leader'),
        schedule: t('clubs.medical.schedule'),
        location: t('clubs.medical.location')
      },
      {
        id: 2,
        name: t('clubs.science.name'),
        members: 35,
        description: t('clubs.science.description'),
        icon: "🔬",
        category: 'academic',
        leader: t('clubs.science.leader'),
        schedule: t('clubs.science.schedule'),
        location: t('clubs.science.location')
      },
      {
        id: 3,
        name: t('clubs.sports.name'),
        members: 120,
        description: t('clubs.sports.description'),
        icon: "⚽",
        category: 'sports',
        leader: t('clubs.sports.leader'),
        schedule: t('clubs.sports.schedule'),
        location: t('clubs.sports.location')
      },
      {
        id: 4,
        name: t('clubs.cultural.name'),
        members: 45,
        description: t('clubs.cultural.description'),
        icon: "🎭",
        category: 'cultural',
        leader: t('clubs.cultural.leader'),
        schedule: t('clubs.cultural.schedule'),
        location: t('clubs.cultural.location')
      },
      {
        id: 5,
        name: t('clubs.volunteer.name'),
        members: 60,
        description: t('clubs.volunteer.description'),
        icon: "🤝",
        category: 'social',
        leader: t('clubs.volunteer.leader'),
        schedule: t('clubs.volunteer.schedule'),
        location: t('clubs.volunteer.location')
      },
      {
        id: 6,
        name: t('clubs.art.name'),
        members: 30,
        description: t('clubs.art.description'),
        icon: "🎨",
        category: 'cultural',
        leader: t('clubs.art.leader'),
        schedule: t('clubs.art.schedule'),
        location: t('clubs.art.location')
      }
    ];
    setClubs(loadedClubs);
  }, [t]);

  const sections = [
    { id: 'all', name: t('clubs.categories.all'), icon: '🌟' },
    { id: 'academic', name: t('clubs.categories.academic'), icon: '🎓' },
    { id: 'sports', name: t('clubs.categories.sports'), icon: '⚽' },
    { id: 'cultural', name: t('clubs.categories.cultural'), icon: '🎭' },
    { id: 'social', name: t('clubs.categories.social'), icon: '🤝' }
  ];

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const filteredClubs = activeSection === 'all' 
    ? clubs 
    : clubs.filter(club => club.category === activeSection);

  const renderAllClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🌟</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.all')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => (
          <div 
            key={club.id}
            className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                  {club.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {club.name}
                  </h3>
                  <div className="flex items-center text-sm text-blue-600">
                    <span className="bg-blue-100 px-2 py-1 rounded-full">
                      {club.members} {t('clubs.members')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.leader')}:</span>
                <span>{club.leader}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.schedule')}:</span>
                <span>{club.schedule}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">{t('clubs.location')}:</span>
                <span>{club.location}</span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium">
              {t('clubs.detailsButton')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAcademicClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🎓</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.academic')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div 
            key={club.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4">
                {club.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                <div className="flex items-center text-sm text-blue-600">
                  <span className="bg-blue-100 px-2 py-1 rounded-full">
                    {club.members} {t('clubs.members')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{t('clubs.leader')}:</span> {club.leader}
              </div>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium">
                {t('clubs.joinButton')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSportsClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">⚽</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.sports')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div 
            key={club.id}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4">
                {club.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                <div className="flex items-center text-sm text-green-600">
                  <span className="bg-green-100 px-2 py-1 rounded-full">
                    {club.members} {t('clubs.members')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{t('clubs.schedule')}:</span>
                <span className="font-medium">{club.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('clubs.location')}:</span>
                <span className="font-medium">{club.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCulturalClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🎭</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.cultural')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div 
            key={club.id}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4">
                {club.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                <div className="flex items-center text-sm text-purple-600">
                  <span className="bg-purple-100 px-2 py-1 rounded-full">
                    {club.members} {t('clubs.members')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{t('clubs.leader')}:</span> {club.leader}
              </div>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 text-sm font-medium">
                {t('clubs.detailsButton')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialClubsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🤝</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('clubs.categories.social')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredClubs.map((club) => (
          <div 
            key={club.id}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-2xl text-white mr-4">
                {club.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {club.name}
                </h3>
                <div className="flex items-center text-sm text-orange-600">
                  <span className="bg-orange-100 px-2 py-1 rounded-full">
                    {club.members} {t('clubs.members')}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {club.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>{t('clubs.schedule')}:</span>
                <span className="font-medium">{club.schedule}</span>
              </div>
              <div className="flex justify-between">
                <span>{t('clubs.location')}:</span>
                <span className="font-medium">{club.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'all':
        return renderAllClubsContent();
      case 'academic':
        return renderAcademicClubsContent();
      case 'sports':
        return renderSportsClubsContent();
      case 'cultural':
        return renderCulturalClubsContent();
      case 'social':
        return renderSocialClubsContent();
      default:
        return renderAllClubsContent();
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
            {t('clubs.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('clubs.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('clubs.categories.title')}
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

export default ClubsSection;