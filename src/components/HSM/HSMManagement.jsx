import React from 'react';
import { useTranslation } from 'react-i18next';

const LeadershipPage = () => {
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('leadership.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('leadership.subtitle')}
          </p>
        </div>

        {/* Директор */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('leadership.directorate')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {directors.map((director) => (
              <div 
                key={director.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4">
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
                    <p className="text-gray-500 text-sm mb-4">
                      {t('leadership.experience')}: {director.experience}
                    </p>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                      <span className="mr-2">📧</span>
                      {director.email}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold mb-2">{t('leadership.achievements')}:</p>
                      <ul className="space-y-1">
                        {director.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                            <span className="text-xs">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Заведующие кафедрами */}
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('leadership.departmentHeads')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentHeads.map((head) => (
              <div 
                key={head.id}
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100"
              >
                <div className="p-5">
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-3">
                      <img
                        src={head.image}
                        alt={head.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {head.name}
                    </h3>
                    <p className="text-blue-600 font-semibold text-sm mb-1">
                      {head.position}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {head.department}
                    </p>
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
                    <p className="text-xs text-gray-700 font-semibold mb-1">{t('leadership.specialization')}:</p>
                    <p className="text-xs text-gray-600 leading-tight">
                      {head.specialization}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <span className="mr-2">📧</span>
                        <span className="truncate">{head.email}</span>
                      </div>    
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default LeadershipPage;