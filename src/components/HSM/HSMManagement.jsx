import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LeadershipPage = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('directorate');

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    { id: 'directorate', name: t('leadership.directorate'), icon: '👑' },
    { id: 'departmentHeads', name: t('leadership.departmentHeads'), icon: '🎓' },
    { id: 'administration', name: t('leadership.administration'), icon: '🏢' }
  ];

  // Данные руководства
  const leadershipData = [
    {
      id: 1,
      name: t('leadership.ivanov.name'),
      position: t('leadership.ivanov.position'),
      degree: t('leadership.ivanov.degree'),
      experience: t('leadership.ivanov.experience'),
      email: "director@meduniversity.ru",
      phone: "+7 (495) 123-45-67",
      image: "/api/placeholder/300/300",
      bio: t('leadership.ivanov.bio'),
      achievements: t('leadership.ivanov.achievements', { returnObjects: true }),
      department: t('departments.directorate'),
      isDirector: true
    },
    {
      id: 2,
      name: t('leadership.petrova.name'),
      position: t('leadership.petrova.position'),
      degree: t('leadership.petrova.degree'),
      experience: t('leadership.petrova.experience'),
      email: "study@meduniversity.ru",
      phone: "+7 (495) 123-45-68",
      image: "/api/placeholder/300/300",
      bio: t('leadership.petrova.bio'),
      achievements: t('leadership.petrova.achievements', { returnObjects: true }),
      department: t('departments.studyDepartment'),
      isDirector: true
    },
    {
      id: 3,
      name: t('leadership.sidorov.name'),
      position: t('leadership.sidorov.position'),
      degree: t('leadership.sidorov.degree'),
      experience: t('leadership.sidorov.experience'),
      email: "science@meduniversity.ru",
      phone: "+7 (495) 123-45-69",
      image: "/api/placeholder/300/300",
      bio: t('leadership.sidorov.bio'),
      achievements: t('leadership.sidorov.achievements', { returnObjects: true }),
      department: t('departments.scienceDepartment'),
      isDirector: true
    },
    {
      id: 4,
      name: t('leadership.kozlova.name'),
      position: t('leadership.kozlova.position'),
      degree: t('leadership.kozlova.degree'),
      experience: t('leadership.kozlova.experience'),
      email: "therapy@meduniversity.ru",
      phone: "+7 (495) 123-45-70",
      image: "/api/placeholder/300/300",
      bio: t('leadership.kozlova.bio'),
      achievements: t('leadership.kozlova.achievements', { returnObjects: true }),
      department: t('departments.therapy'),
      staff: t('leadership.kozlova.staff'),
      specialization: t('leadership.kozlova.specialization')
    },
    {
      id: 5,
      name: t('leadership.nikolaev.name'),
      position: t('leadership.nikolaev.position'),
      degree: t('leadership.nikolaev.degree'),
      experience: t('leadership.nikolaev.experience'),
      email: "surgery@meduniversity.ru",
      phone: "+7 (495) 123-45-71",
      image: "/api/placeholder/300/300",
      bio: t('leadership.nikolaev.bio'),
      achievements: t('leadership.nikolaev.achievements', { returnObjects: true }),
      department: t('departments.surgery'),
      staff: t('leadership.nikolaev.staff'),
      specialization: t('leadership.nikolaev.specialization')
    },
    {
      id: 6,
      name: t('leadership.orlova.name'),
      position: t('leadership.orlova.position'),
      degree: t('leadership.orlova.degree'),
      experience: t('leadership.orlova.experience'),
      email: "pediatrics@meduniversity.ru",
      phone: "+7 (495) 123-45-72",
      image: "/api/placeholder/300/300",
      bio: t('leadership.orlova.bio'),
      achievements: t('leadership.orlova.achievements', { returnObjects: true }),
      department: t('departments.pediatrics'),
      staff: t('leadership.orlova.staff'),
      specialization: t('leadership.orlova.specialization')
    },
    {
      id: 7,
      name: t('leadership.vasiliev.name'),
      position: t('leadership.vasiliev.position'),
      degree: t('leadership.vasiliev.degree'),
      experience: t('leadership.vasiliev.experience'),
      email: "neurology@meduniversity.ru",
      phone: "+7 (495) 123-45-73",
      image: "/api/placeholder/300/300",
      bio: t('leadership.vasiliev.bio'),
      achievements: t('leadership.vasiliev.achievements', { returnObjects: true }),
      department: t('departments.neurology'),
      staff: t('leadership.vasiliev.staff'),
      specialization: t('leadership.vasiliev.specialization')
    },
    {
      id: 8,
      name: t('leadership.smirnova.name'),
      position: t('leadership.smirnova.position'),
      degree: t('leadership.smirnova.degree'),
      experience: t('leadership.smirnova.experience'),
      email: "dentistry@meduniversity.ru",
      phone: "+7 (495) 123-45-74",
      image: "/api/placeholder/300/300",
      bio: t('leadership.smirnova.bio'),
      achievements: t('leadership.smirnova.achievements', { returnObjects: true }),
      department: t('departments.dentistry'),
      staff: t('leadership.smirnova.staff'),
      specialization: t('leadership.smirnova.specialization')
    }
  ];

  const directors = leadershipData.filter(person => person.isDirector);
  const departmentHeads = leadershipData.filter(person => !person.isDirector);

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderDirectorateContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">👑</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('leadership.directorate')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {directors.map((director) => (
          <div 
            key={director.id}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-md">
                <img
                  src={director.image}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {director.name}
              </h3>
              <p className="text-blue-600 font-semibold mb-2">
                {director.position}
              </p>
              <p className="text-gray-600 text-sm mb-3">
                {director.degree}
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📅</span>
                <span>{t('leadership.experience')}: {director.experience}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📧</span>
                <span>{director.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">📞</span>
                <span>{director.phone}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                {t('leadership.achievements')}:
              </h4>
              <ul className="space-y-2">
                {director.achievements.slice(0, 3).map((achievement, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDepartmentHeadsContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🎓</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('leadership.departmentHeads')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentHeads.map((head) => (
          <div 
            key={head.id}
            className="bg-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-blue-200">
                <img
                  src={head.image}
                  alt={head.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {head.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm mb-1">
                  {head.position}
                </p>
                <p className="text-gray-600 text-xs">
                  {head.department}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-gray-600">
                <span className="mr-2">🎓</span>
                <span>{head.degree}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <span className="mr-2">📅</span>
                <span>{t('leadership.experience')}: {head.experience}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <span className="mr-2">👥</span>
                <span>{head.staff}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-700 font-semibold mb-1">
                {t('leadership.specialization')}:
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                {head.specialization}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <div className="flex items-center text-xs text-gray-600">
                <span className="mr-2">📧</span>
                <span className="truncate">{head.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdministrationContent = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-xl mr-4">
          <span className="text-2xl">🏢</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {t('leadership.administration')}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Административный состав
            </h3>
            <p className="text-gray-600 mb-4">
              Наша административная команда обеспечивает эффективное функционирование 
              университета и поддержку учебного процесса.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-700">Учебный отдел</span>
              <span className="text-blue-600 font-semibold">8 сотрудников</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-700">Научный отдел</span>
              <span className="text-blue-600 font-semibold">6 сотрудников</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-100">
              <span className="text-gray-700">Международный отдел</span>
              <span className="text-blue-600 font-semibold">4 сотрудника</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'directorate':
        return renderDirectorateContent();
      case 'departmentHeads':
        return renderDepartmentHeadsContent();
      case 'administration':
        return renderAdministrationContent();
      default:
        return renderDirectorateContent();
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
            {t('leadership.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('leadership.sections')}
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

export default LeadershipPage;