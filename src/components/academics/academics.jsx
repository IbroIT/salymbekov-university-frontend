import React, { useState } from 'react';
import { BookOpen, Calendar, File, GraduationCap, Stethoscope, Users, Award, Clock, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEOComponent from '../SEO/SEOComponent';

const MedicalEducationPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const { t } = useTranslation();

  const educationPrograms = [
    {
      id: 'therapeutic-5',
      title: t('mededu.programs.therapeutic5.title'),
      duration: t('mededu.programs.therapeutic5.duration'),
      degree: t('mededu.programs.therapeutic5.degree'),
  icon: "Stethoscope",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.therapeutic5.description'),
      details: {
        overview: t('mededu.programs.therapeutic5.details.overview'),
        structure: t('mededu.programs.therapeutic5.details.structure', { returnObjects: true }),
        requirements: t('mededu.programs.therapeutic5.details.requirements', { returnObjects: true }),
        career: t('mededu.programs.therapeutic5.details.career', { returnObjects: true })
      }
    },
    {
      id: 'therapeutic-6',
      title: t('mededu.programs.therapeutic6.title'),
      duration: t('mededu.programs.therapeutic6.duration'),
      degree: t('mededu.programs.therapeutic6.degree'),
  icon: "Stethoscope",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.therapeutic6.description'),
      details: {
        overview: t('mededu.programs.therapeutic6.details.overview'),
        structure: t('mededu.programs.therapeutic6.details.structure', { returnObjects: true }),
        requirements: t('mededu.programs.therapeutic6.details.requirements', { returnObjects: true }),
        career: t('mededu.programs.therapeutic6.details.career', { returnObjects: true })
      }
    },
    {
      id: 'residency',
      title: t('mededu.programs.residency.title'),
      duration: t('mededu.programs.residency.duration'),
      degree: t('mededu.programs.residency.degree'),
      icon: "GraduationCap",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.residency.description'),
      details: {
        overview: t('mededu.programs.residency.details.overview'),
        specialties: t('mededu.programs.residency.details.specialties', { returnObjects: true }),
        requirements: t('mededu.programs.residency.details.requirements', { returnObjects: true }),
        career: t('mededu.programs.residency.details.career', { returnObjects: true })
      }
    },
    {
      id: 'phd',
      title: t('mededu.programs.phd.title'),
      duration: t('mededu.programs.phd.duration'),
      degree: t('mededu.programs.phd.degree'),
      icon: "Award",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.phd.description'),
      details: {
        overview: t('mededu.programs.phd.details.overview'),
        research: t('mededu.programs.phd.details.research', { returnObjects: true }),
        requirements: t('mededu.programs.phd.details.requirements', { returnObjects: true }),
        career: t('mededu.programs.phd.details.career', { returnObjects: true })
      }
    },
    {
      id: 'postgraduate',
      title: t('mededu.programs.postgraduate.title'),
      duration: t('mededu.programs.postgraduate.duration'),
      degree: t('mededu.programs.postgraduate.degree'),
      icon: "BookOpen",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.postgraduate.description'),
      details: {
        overview: t('mededu.programs.postgraduate.details.overview'),
        programs: t('mededu.programs.postgraduate.details.programs', { returnObjects: true }),
        requirements: t('mededu.programs.postgraduate.details.requirements', { returnObjects: true }),
        career: t('mededu.programs.postgraduate.details.career', { returnObjects: true })
      }
    },
    {
      id: 'additional',
      title: t('mededu.programs.additional.title'),
      duration: t('mededu.programs.additional.duration'),
      degree: t('mededu.programs.additional.degree'),
      icon: "Users",
  color: "from-blue-600 to-blue-700",
      description: t('mededu.programs.additional.description'),
      details: {
        overview: t('mededu.programs.additional.details.overview'),
        courses: t('mededu.programs.additional.details.courses', { returnObjects: true }),
        requirements: t('mededu.programs.additional.details.requirements', { returnObjects: true }),
        certificates: t('mededu.programs.additional.details.certificates', { returnObjects: true })
      }
    }
  ];

  const getIconComponent = (iconName) => {
    const icons = {
      Stethoscope,
      GraduationCap,
      Award,
      BookOpen,
      Users
    };
    return icons[iconName] || Stethoscope;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <SEOComponent pageType="medical-education" />
      
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-blue-600">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">{t('mededu.pageTitle')}</h1>
        </div>

        {/* Карточки программ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {educationPrograms.map((program) => {
            const IconComponent = getIconComponent(program.icon);
            return (
              <div 
                key={program.id}
                className={`bg-gradient-to-r ${program.color} text-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl`}
              >
                <div className="flex items-center mb-4">
                  <IconComponent className="w-8 h-8 mr-3" />
                  <h3 className="text-xl font-bold">{program.title}</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{program.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    <span>{program.degree}</span>
                  </div>
                </div>

                <p className="text-white/90 text-sm mb-6 leading-relaxed">
                  {program.description}
                </p>

                <button
                  onClick={() => setSelectedProgram(program)}
                  className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  {t('mededu.detailsButton')}
                  <BookOpen className="w-4 h-4 ml-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${selectedProgram.color} text-white p-6 rounded-t-2xl`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {React.createElement(getIconComponent(selectedProgram.icon), { className: "w-8 h-8 mr-3" })}
                  <h2 className="text-2xl font-bold">{selectedProgram.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{selectedProgram.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>{selectedProgram.degree}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {Object.entries(selectedProgram.details)
                .filter(([key]) => key !== 'structure' && key !== 'requirements' && key !== 'career')
                .map(([key, value]) => (
                  <div key={key}>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
                      {key === 'overview' && t('mededu.modal.overview')}
                      {key === 'specialties' && t('mededu.modal.specialties')}
                      {key === 'research' && t('mededu.modal.research')}
                      {key === 'programs' && t('mededu.modal.programs')}
                      {key === 'courses' && t('mededu.modal.courses')}
                      {key === 'certificates' && t('mededu.modal.certificates')}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                      {typeof value === 'string' ? (
                        <p>{value}</p>
                      ) : Array.isArray(value) ? (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>{String(value)}</li>
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="border-t p-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t('mededu.modal.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalEducationPage;