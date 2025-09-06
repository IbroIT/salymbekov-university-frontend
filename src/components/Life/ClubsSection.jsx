import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ClubsSection = () => {
  const { t } = useTranslation();
  const [clubs, setClubs] = useState([]);
  const [hoveredClub, setHoveredClub] = useState(null);

  useEffect(() => {
    // Имитация загрузки данных
    const loadedClubs = [
      {
        id: 1,
        name: t('clubs.medical.name'),
        members: 50,
        description: t('clubs.medical.description'),
        icon: "🩺"
      },
      {
        id: 2,
        name: t('clubs.science.name'),
        members: 35,
        description: t('clubs.science.description'),
        icon: "🔬"
      },
      {
        id: 3,
        name: t('clubs.sports.name'),
        members: 120,
        description: t('clubs.sports.description'),
        icon: "⚽"
      },
      {
        id: 4,
        name: t('clubs.cultural.name'),
        members: 45,
        description: t('clubs.cultural.description'),
        icon: "🎭"
      }
    ];
    setClubs(loadedClubs);
  }, [t]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
            {t('clubs.title')}
          </h2>
          <p className="mt-3 text-xl text-blue-700">
            {t('clubs.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <div 
              key={club.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform ${
                hoveredClub === club.id ? 'scale-105 shadow-2xl' : 'hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredClub(club.id)}
              onMouseLeave={() => setHoveredClub(null)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`text-4xl mb-4 transition-transform duration-300 ${
                    hoveredClub === club.id ? 'scale-110' : ''
                  }`}>
                    {club.icon}
                  </div>
                  <div className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {club.members} {t('clubs.members')}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{club.name}</h3>
                <p className="text-gray-600 text-sm">{club.description}</p>
                
                <div className="mt-6">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                      <div
                        style={{ width: `${Math.min(club.members, 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                      ></div>
                    </div>
                  </div>
                  
                  <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
                    {t('clubs.detailsButton')}
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Декоративный элемент */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-all duration-300 ${
                hoveredClub === club.id ? 'h-2' : ''
              }`}></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:-translate-y-1">
            {t('clubs.allClubsButton')}
            <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubsSection;