// StructurePage.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const StructurePage = () => {
  const { t } = useTranslation();
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [expandedFaculties, setExpandedFaculties] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  const structureData = {
    руководство: {
      title: t('structure.leadership.title'),
      icon: "👑",
      items: [
        { 
          name: t('structure.leadership.items.rector.name'), 
          head: t('structure.leadership.items.rector.head'), 
          phone: t('structure.leadership.items.rector.phone') 
        },
        { 
          name: t('structure.leadership.items.academicViceRector.name'), 
          head: t('structure.leadership.items.academicViceRector.head'), 
          phone: t('structure.leadership.items.academicViceRector.phone') 
        },
        { 
          name: t('structure.leadership.items.researchViceRector.name'), 
          head: t('structure.leadership.items.researchViceRector.head'), 
          phone: t('structure.leadership.items.researchViceRector.phone') 
        },
        { 
          name: t('structure.leadership.items.clinicalViceRector.name'), 
          head: t('structure.leadership.items.clinicalViceRector.head'), 
          phone: t('structure.leadership.items.clinicalViceRector.phone') 
        }
      ]
    },
    факультеты: {
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
    административные: {
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

  const toggleFaculty = (facultyName) => {
    setExpandedFaculties(prev =>
      prev.includes(facultyName)
        ? prev.filter(name => name !== facultyName)
        : [...prev, facultyName]
    );
  };

  const DepartmentCard = ({ department, category, index }) => {
    const isFaculty = category === 'факультеты';
    const isExpanded = isFaculty && expandedFaculties.includes(department.name);
    const isHovered = hoveredCard === `${category}-${index}`;

    return (
      <div 
        className={`relative bg-white rounded-2xl p-6 mb-6 transition-all duration-500 transform hover:scale-[1.02] ${
          activeDepartment === department.name 
            ? 'ring-4 ring-blue-400 shadow-2xl' 
            : 'shadow-lg hover:shadow-xl'
        } ${
          isHovered ? 'bg-gradient-to-br from-white to-blue-50' : ''
        }`}
        onMouseEnter={() => setHoveredCard(`${category}-${index}`)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{department.name}</h3>
              </div>
              
              <div className="ml-16 space-y-2">
                <p className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  <span className="font-semibold">{t('structure.head')}</span> 
                  <span className="ml-2 text-blue-600 font-medium">{department.head}</span>
                </p>
                {department.phone && (
                  <p className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    <span className="font-semibold">{t('structure.phone')}</span> 
                    <span className="ml-2 text-blue-500">{department.phone}</span>
                  </p>
                )}
              </div>
            </div>
            
            {isFaculty && (
              <button
                onClick={() => toggleFaculty(department.name)}
                className="ml-4 p-3 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all duration-300 hover:scale-110 shadow-md"
                aria-label={isExpanded ? t('structure.collapse') : t('structure.expand')}
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
            )}
          </div>

          {isFaculty && isExpanded && (
            <div className="mt-6 ml-16 pl-6 border-l-4 border-blue-300 animate-fadeIn">
              <h4 className="font-bold text-gray-700 mb-4 flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                {t('structure.facultyDepartments')}
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {department.departments.map((dept, deptIndex) => (
                  <div 
                    key={deptIndex}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 transition-all duration-300 hover:shadow-md hover:border-blue-300"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-bold text-sm">{deptIndex + 1}</span>
                      </div>
                      <span className="text-blue-800 font-medium">{dept}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Анимированный заголовок */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute -inset-4 opacity-20 animate-pulse"></div>
            <h1 className="relative text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">
              {t('structure.title')}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('structure.description')}
          </p>
        </div>

        {/* Содержимое структуры */}
        <div className="space-y-16">
          {Object.entries(structureData).map(([category, data]) => (
            <section 
              key={category} 
              id={category} 
              className="scroll-mt-24 animate-fadeInUp"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50">
                <div className="flex items-center mb-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mr-6">
                    <span className="text-2xl text-white">{data.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-gray-800">
                      {data.title}
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-3"></div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {data.items.map((department, index) => (
                    <DepartmentCard
                      key={index}
                      department={department}
                      category={category}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StructurePage;