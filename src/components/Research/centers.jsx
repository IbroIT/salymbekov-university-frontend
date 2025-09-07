import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Centers = () => {
  const { t } = useTranslation();
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const researchCenters = [
    {
      id: 1,
      name: t('research.centers.molecularMedicine.name'),
      logo: "🧬",
      director: {
        name: t('research.centers.directors.aliyev'),
        photo: "👨‍⚕️",
        position: t('research.centers.positions.professor')
      },
      staffCount: 25,
      equipment: [
        t('research.centers.equipment.pcrAnalyzer'),
        t('research.centers.equipment.spectrophotometer'),
        t('research.centers.equipment.electronMicroscope'),
        t('research.centers.equipment.cryostat')
      ],
      publicationsLink: "/publications/center-1",
      description: t('research.centers.molecularMedicine.description')
    },
    {
      id: 2,
      name: t('research.centers.neurosciences.name'),
      logo: "🧠",
      director: {
        name: t('research.centers.directors.smagulova'),
        photo: "👩‍⚕️",
        position: t('research.centers.positions.professorPhD')
      },
      staffCount: 18,
      equipment: [
        t('research.centers.equipment.eegSystem'),
        t('research.centers.equipment.mri3T'),
        t('research.centers.equipment.transcranialStimulator'),
        t('research.centers.equipment.optogeneticSetup')
      ],
      publicationsLink: "/publications/center-2",
      description: t('research.centers.neurosciences.description')
    },
    {
      id: 3,
      name: t('research.centers.biomedicalTech.name'),
      logo: "🔬",
      director: {
        name: t('research.centers.directors.zhanuzakov'),
        photo: "👨‍🔬",
        position: t('research.centers.positions.associateProfessor')
      },
      staffCount: 32,
      equipment: [
        t('research.centers.equipment.bioprinter3D'),
        t('research.centers.equipment.cellSorter'),
        t('research.centers.equipment.massSpectrometer'),
        t('research.centers.equipment.bioreactors')
      ],
      publicationsLink: "/publications/center-3",
      description: t('research.centers.biomedicalTech.description')
    },
    {
      id: 4,
      name: t('research.centers.clinicalResearch.name'),
      logo: "⚕️",
      director: {
        name: t('research.centers.directors.toktogulov'),
        photo: "👨‍⚕️",
        position: t('research.centers.positions.professor')
      },
      staffCount: 28,
      equipment: [
        t('research.centers.equipment.randomizationSystem'),
        t('research.centers.equipment.ecrfPlatform'),
        t('research.centers.equipment.statisticalSoftware'),
        t('research.centers.equipment.monitoringEquipment')
      ],
      publicationsLink: "/publications/center-4",
      description: t('research.centers.clinicalResearch.description')
    },
    {
      id: 5,
      name: t('research.centers.publicHealth.name'),
      logo: "🏥",
      director: {
        name: t('research.centers.directors.mambetova'),
        photo: "👩‍⚕️",
        position: t('research.centers.positions.professorPhD')
      },
      staffCount: 22,
      equipment: [
        t('research.centers.equipment.epidemiologicalDatabase'),
        t('research.centers.equipment.gisSystem'),
        t('research.centers.equipment.surveyPlatforms'),
        t('research.centers.equipment.analyticalTools')
      ],
      publicationsLink: "/publications/center-5",
      description: t('research.centers.publicHealth.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {t('research.centers.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('research.centers.subtitle')}
          </p>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchCenters.map((center) => (
            <div
              key={center.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
                hoveredCard === center.id 
                  ? 'scale-105 shadow-2xl' 
                  : 'scale-100 hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredCard(center.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Верхняя часть с логотипом и названием */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{center.logo}</div>
                  <div className="text-right">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      {center.staffCount} {t('research.centers.staffCount')}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">{center.name}</h3>
                <p className="text-sm opacity-90 mt-2">{center.description}</p>
              </div>

              {/* Контент карточки */}
              <div className="p-6">
                {/* Руководитель */}
                <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mr-4">{center.director.photo}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{center.director.name}</h4>
                    <p className="text-sm text-gray-600">{center.director.position}</p>
                  </div>
                </div>

                {/* Оборудование */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="mr-2">⚙️</span>
                    {t('research.centers.equipmentTitle')}
                  </h4>
                  <div className="space-y-2">
                    {center.equipment.slice(0, 3).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded-lg"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        {item}
                      </div>
                    ))}
                    {center.equipment.length > 3 && (
                      <div className="text-sm text-blue-600 font-medium">
                        +{center.equipment.length - 3} {t('research.centers.moreItems')}
                      </div>
                    )}
                  </div>
                </div>

                {/* Кнопка публикаций */}
                <button
                  onClick={() => setSelectedCenter(center)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  📚 {t('research.centers.viewPublications')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно с деталями */}
        {selectedCenter && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCenter.name}</h2>
                    <p className="opacity-90">{selectedCenter.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCenter(null)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Руководитель */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">
                      {t('research.centers.director')}
                    </h3>
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{selectedCenter.director.photo}</div>
                      <div>
                        <p className="font-semibold">{selectedCenter.director.name}</p>
                        <p className="text-sm text-gray-600">{selectedCenter.director.position}</p>
                      </div>
                    </div>
                  </div>

                  {/* Сотрудники */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-3">
                      {t('research.centers.team')}
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">{selectedCenter.staffCount}</p>
                    <p className="text-sm text-gray-600">
                      {t('research.centers.researchers')}
                    </p>
                  </div>
                </div>

                {/* Оборудование */}
                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-3">
                    {t('research.centers.equipmentTitle')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCenter.equipment.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-blue-50 px-4 py-3 rounded-lg"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ссылка на публикации */}
                <div className="mt-8 text-center">
                  <a
                    href={selectedCenter.publicationsLink}
                    className="inline-block bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    📖 {t('research.centers.goToPublications')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Centers;