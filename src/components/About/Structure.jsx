import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newAboutAPI } from '../../services/newAboutAPI';
import { getManagement } from '../../services/teachers';

const StructurePage = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('leadership');
  const [expandedFaculties, setExpandedFaculties] = useState([]);
  const [managementData, setManagementData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загружаем данные руководства с API
  useEffect(() => {
    const fetchManagementData = async () => {
      setLoading(true);
      try {
        const data = await getManagement();
        if (data && data.length > 0) {
          setManagementData(data[0]);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных руководства:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchManagementData();
  }, []);

  const sections = [
    { id: 'leadership', name: t('structure.leadership.title'), icon: '👑' },
    { id: 'faculties', name: t('structure.faculties.title'), icon: '🎓' },
    { id: 'administrative', name: t('structure.administrative.title'), icon: '🏢' }
  ];

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };

  const structureData = {
    leadership: {
      title: t('structure.leadership.title'),
      icon: "👑",
      items: [
        {
          name: t('structure.leadership.items.rector.name'),
          head: t('structure.leadership.items.rector.head'),
        },
        {
          name: t('structure.leadership.items.academicViceRector.name'),
          head: t('structure.leadership.items.academicViceRector.head'),
        },
        {
          name: t('structure.leadership.items.researchViceRector.name'),
          head: t('structure.leadership.items.researchViceRector.head'),
        },
        {
          name: t('structure.leadership.items.clinicalViceRector.name'),
          head: t('structure.leadership.items.clinicalViceRector.head'),
        }
      ]
    },
    faculties: {
      title: t('structure.faculties.title'),
      icon: "🎓",
      items: [
        {
          name: t('structure.faculties.items.medical.name'),
          head: t('structure.faculties.items.medical.head'),
          departments: [
            t('structure.faculties.items.medical.departments.therapy'),
            t('structure.faculties.items.medical.departments.surgery'),
            t('structure.faculties.items.medical.departments.pediatrics'),
            t('structure.faculties.items.medical.departments.obstetrics')
          ]
        },
        {
          name: t('structure.faculties.items.pediatric.name'),
          head: t('structure.faculties.items.pediatric.head'),
          departments: [
            t('structure.faculties.items.pediatric.departments.childrenDiseases'),
            t('structure.faculties.items.pediatric.departments.neonatology'),
            t('structure.faculties.items.pediatric.departments.childrenSurgery')
          ]
        },
        {
          name: t('structure.faculties.items.dental.name'),
          head: t('structure.faculties.items.dental.head'),
          departments: [
            t('structure.faculties.items.dental.departments.therapeuticDentistry'),
            t('structure.faculties.items.dental.departments.orthopedicDentistry'),
            t('structure.faculties.items.dental.departments.surgicalDentistry')
          ]
        },
        {
          name: t('structure.faculties.items.pharmaceutical.name'),
          head: t('structure.faculties.items.pharmaceutical.head'),
          departments: [
            t('structure.faculties.items.pharmaceutical.departments.pharmaceuticalChemistry'),
            t('structure.faculties.items.pharmaceutical.departments.pharmacognosy'),
            t('structure.faculties.items.pharmaceutical.departments.drugTechnology')
          ]
        }
      ]
    },
    administrative: {
      title: t('structure.administrative.title'),
      icon: "🏢",
      items: [
        {
          name: t('structure.administrative.items.academicOffice.name'),
          head: t('structure.administrative.items.academicOffice.head'),
          phone: t('structure.administrative.items.academicOffice.phone')
        },
        {
          name: t('structure.administrative.items.researchOffice.name'),
          head: t('structure.administrative.items.researchOffice.head'),
          phone: t('structure.administrative.items.researchOffice.phone')
        },
        {
          name: t('structure.administrative.items.hrDepartment.name'),
          head: t('structure.administrative.items.hrDepartment.head'),
          phone: t('structure.administrative.items.hrDepartment.phone')
        },
        {
          name: t('structure.administrative.items.accounting.name'),
          head: t('structure.administrative.items.accounting.head'),
          phone: t('structure.administrative.items.accounting.phone')
        }
      ]
    }
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const toggleFaculty = (facultyName) => {
    setExpandedFaculties(prev =>
      prev.includes(facultyName)
        ? prev.filter(name => name !== facultyName)
        : [...prev, facultyName]
    );
  };

  const renderLeadershipContent = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          <p className="mt-6 text-gray-600 text-lg">Загрузка структуры руководства...</p>
        </div>
      );
    }

    if (!managementData) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">Данные о руководстве не найдены</p>
        </div>
      );
    }

    // Собираем всех сотрудников в плоский список (без иерархии)
    const collectAllMembers = (node) => {
      const members = [node];
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          members.push(...collectAllMembers(child));
        });
      }
      return members;
    };

    const allMembers = collectAllMembers(managementData);

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">👑</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {t('structure.leadership.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {getLocalizedText(member, 'position')}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-medium mr-2">Руководитель:</span>
                      <span className="text-blue-600">{getLocalizedText(member, 'full_name')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderFacultiesContent = () => {
    const currentData = structureData.faculties;

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">🎓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {currentData.title}
          </h2>
        </div>

        <div className="space-y-6">
          {currentData.items.map((faculty, index) => {
            const isExpanded = expandedFaculties.includes(faculty.name);

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start flex-1">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {faculty.name}
                        </h3>
                        <p className="text-gray-600">
                          <span className="font-medium">Декан:</span> {faculty.head}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFaculty(faculty.name)}
                      className="ml-4 p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-all duration-300"
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-6 pl-16">
                      <h4 className="font-semibold text-gray-800 mb-4">
                        Кафедры факультета:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {faculty.departments.map((department, deptIndex) => (
                          <div
                            key={deptIndex}
                            className="bg-blue-50 rounded-lg p-3 border border-blue-200"
                          >
                            <div className="flex items-center">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                                {deptIndex + 1}
                              </div>
                              <span className="text-blue-800">{department}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAdministrativeContent = () => {
    const currentData = structureData.administrative;

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-100 rounded-xl mr-4">
            <span className="text-2xl">🏢</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {currentData.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.items.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600 flex items-center">
                      <span className="font-medium mr-2">Руководитель:</span>
                      <span className="text-purple-600">{item.head}</span>
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <span className="font-medium mr-2">Телефон:</span>
                      <span className="text-purple-500">{item.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'leadership':
        return renderLeadershipContent();
      case 'faculties':
        return renderFacultiesContent();
      case 'administrative':
        return renderAdministrativeContent();
      default:
        return renderLeadershipContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('structure.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('structure.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t('structure.sections')}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${activeSection === section.id
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

export default StructurePage;