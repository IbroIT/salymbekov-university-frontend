import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AcademicBuildings = () => {
  const { t, i18n } = useTranslation();
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Fetch academic buildings from Django API
    const fetchBuildings = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/infrastructure/academic-buildings/');
        if (response.ok) {
          const data = await response.json();
          const buildingsData = data.results || data;
          setBuildings(buildingsData);
        } else {
          console.error('Failed to fetch academic buildings:', response.statusText);
          // Fallback to mock data if API fails
          setBuildings(getMockBuildings());
        }
      } catch (error) {
        console.error('Error fetching academic buildings:', error);
        // Fallback to mock data if API fails
        setBuildings(getMockBuildings());
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  const getMockBuildings = () => {
    return [
      {
        id: 1,
        name: {
          ru: "Главный учебный корпус",
          kg: "Негизги окуу корпусу",
          en: "Main Academic Building"
        },
        address: {
          ru: "г. Бишкек, ул. Ахунбаева, 92",
          kg: "Бишкек шаары, Ахунбаев көчөсү, 92",
          en: "Bishkek, Akhunbaev Street, 92"
        },
        description: {
          ru: "Основное здание университета с лекционными залами и административными офисами",
          kg: "Университеттин негизги имараты лекциялык залдар жана административдик кеңселер менен",
          en: "Main university building with lecture halls and administrative offices"
        },
        floors: 5,
        facilities: [
          {
            name: { ru: "Лекционные залы", kg: "Лекциялык залдар", en: "Lecture halls" },
            count: 12,
            capacity: "50-200 человек"
          },
          {
            name: { ru: "Аудитории", kg: "Аудиториялар", en: "Classrooms" },
            count: 25,
            capacity: "20-40 человек"
          },
          {
            name: { ru: "Компьютерные классы", kg: "Компьютердик класстар", en: "Computer labs" },
            count: 4,
            capacity: "20-30 человек"
          },
          {
            name: { ru: "Библиотека", kg: "Китепкана", en: "Library" },
            count: 1,
            capacity: "100 мест для чтения"
          }
        ],
        photos: [
          { type: "facade", url: "/images/main_building_facade.jpg" },
          { type: "lobby", url: "/images/main_building_lobby.jpg" },
          { type: "lecture_hall", url: "/images/main_lecture_hall.jpg" },
          { type: "library", url: "/images/main_library.jpg" }
        ],
        coordinates: { lat: 42.8746, lng: 74.5698 }
      },
      {
        id: 2,
        name: {
          ru: "Медицинский корпус",
          kg: "Медициналык корпус",
          en: "Medical Building"
        },
        address: {
          ru: "г. Бишкек, ул. Медицинская, 15",
          kg: "Бишкек шаары, Медициналык көчөсү, 15",
          en: "Bishkek, Medical Street, 15"
        },
        description: {
          ru: "Специализированное здание для медицинских факультетов с лабораториями",
          kg: "Лабораториялары бар медициналык факультеттер үчүн адистештирилген имарат",
          en: "Specialized building for medical faculties with laboratories"
        },
        floors: 4,
        facilities: [
          {
            name: { ru: "Анатомические залы", kg: "Анатомиялык залдар", en: "Anatomy halls" },
            count: 3,
            capacity: "30-40 человек"
          },
          {
            name: { ru: "Лаборатории", kg: "Лабораториялар", en: "Laboratories" },
            count: 8,
            capacity: "15-25 человек"
          },
          {
            name: { ru: "Симуляционный центр", kg: "Симуляциялык борбор", en: "Simulation center" },
            count: 1,
            capacity: "20 человек"
          }
        ],
        photos: [
          { type: "facade", url: "/images/medical_building_facade.jpg" },
          { type: "lab", url: "/images/medical_lab.jpg" },
          { type: "anatomy", url: "/images/anatomy_hall.jpg" },
          { type: "simulation", url: "/images/simulation_center.jpg" }
        ],
        coordinates: { lat: 42.8756, lng: 74.5708 }
      },
      {
        id: 3,
        name: {
          ru: "Научно-исследовательский корпус",
          kg: "Илимий-изилдөө корпусу",
          en: "Research Building"
        },
        address: {
          ru: "г. Бишкек, ул. Исследовательская, 7",
          kg: "Бишкек шаары, Изилдөө көчөсү, 7",
          en: "Bishkek, Research Street, 7"
        },
        description: {
          ru: "Современное здание для научных исследований и инновационных проектов",
          kg: "Илимий изилдөөлөр жана инновациялык долбоорлор үчүн заманбап имарат",
          en: "Modern building for scientific research and innovative projects"
        },
        floors: 6,
        facilities: [
          {
            name: { ru: "Исследовательские лаборатории", kg: "Изилдөө лабораториялары", en: "Research laboratories" },
            count: 15,
            capacity: "10-20 человек"
          },
          {
            name: { ru: "Конференц-залы", kg: "Конференц-залдар", en: "Conference halls" },
            count: 3,
            capacity: "50-150 человек"
          },
          {
            name: { ru: "Офисы для исследователей", kg: "Изилдөөчүлөр үчүн кеңселер", en: "Research offices" },
            count: 20,
            capacity: "2-6 человек"
          }
        ],
        photos: [
          { type: "facade", url: "/images/research_building_facade.jpg" },
          { type: "lab", url: "/images/research_lab.jpg" },
          { type: "conference", url: "/images/conference_hall.jpg" },
          { type: "office", url: "/images/research_office.jpg" }
        ],
        coordinates: { lat: 42.8766, lng: 74.5688 }
      },
      {
        id: 4,
        name: {
          ru: "Студенческий центр",
          kg: "Студенттик борбор",
          en: "Student Center"
        },
        address: {
          ru: "г. Бишкек, ул. Студенческая, 25",
          kg: "Бишкек шаары, Студенттик көчө, 25",
          en: "Bishkek, Student Street, 25"
        },
        description: {
          ru: "Многофункциональное здание для студенческих активностей и мероприятий",
          kg: "Студенттик активдүүлүк жана иш-чаралар үчүн көп функциялуу имарат",
          en: "Multifunctional building for student activities and events"
        },
        floors: 3,
        facilities: [
          {
            name: { ru: "Актовый зал", kg: "Актылык зал", en: "Assembly hall" },
            count: 1,
            capacity: "500 человек"
          },
          {
            name: { ru: "Столовая", kg: "Ашкана", en: "Cafeteria" },
            count: 1,
            capacity: "300 человек"
          },
          {
            name: { ru: "Комнаты для клубов", kg: "Клубдар үчүн бөлмөлөр", en: "Club rooms" },
            count: 8,
            capacity: "15-30 человек"
          },
          {
            name: { ru: "Спортивный зал", kg: "Спорт зал", en: "Gymnasium" },
            count: 1,
            capacity: "100 человек"
          }
        ],
        photos: [
          { type: "facade", url: "/images/student_center_facade.jpg" },
          { type: "assembly", url: "/images/assembly_hall.jpg" },
          { type: "cafeteria", url: "/images/cafeteria.jpg" },
          { type: "gym", url: "/images/gymnasium.jpg" }
        ],
        coordinates: { lat: 42.8736, lng: 74.5718 }
      }
    ];
  };

  const getCurrentLanguage = () => {
    return ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  };

  // Helper function to get translated field value
  const getTranslatedField = (obj, fieldPrefix) => {
    const lang = getCurrentLanguage();
    return obj[`${fieldPrefix}_${lang}`] || obj[`${fieldPrefix}_ru`] || '';
  };

  const photoTypeNames = {
    facade: { ru: "Фасад", kg: "Фасад", en: "Facade" },
    lobby: { ru: "Холл", kg: "Холл", en: "Lobby" },
    lecture_hall: { ru: "Лекционный зал", kg: "Лекциялык зал", en: "Lecture Hall" },
    library: { ru: "Библиотека", kg: "Китепкана", en: "Library" },
    lab: { ru: "Лаборатория", kg: "Лаборатория", en: "Laboratory" },
    anatomy: { ru: "Анатомический зал", kg: "Анатомиялык зал", en: "Anatomy Hall" },
    simulation: { ru: "Симуляционный центр", kg: "Симуляциялык борбор", en: "Simulation Center" },
    conference: { ru: "Конференц-зал", kg: "Конференц-зал", en: "Conference Hall" },
    office: { ru: "Офис", kg: "Кеңсе", en: "Office" },
    assembly: { ru: "Актовый зал", kg: "Актылык зал", en: "Assembly Hall" },
    cafeteria: { ru: "Столовая", kg: "Ашкана", en: "Cafeteria" },
    gym: { ru: "Спортзал", kg: "Спорт зал", en: "Gymnasium" }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('academicBuildings.title', 'Учебные корпуса университета')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            {t('academicBuildings.subtitle', 'Современная инфраструктура для качественного образования')}
          </p>
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {showMap ? t('academicBuildings.hideMap', 'Скрыть карту') : t('academicBuildings.showMap', 'Показать карту кампуса')}
          </button>
        </div>

        {/* Campus Map */}
        {showMap && (
          <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t('academicBuildings.campusMap', 'Карта кампуса')}
            </h2>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {buildings.map((building, index) => (
                  <div key={building.id} className="bg-white p-4 rounded-lg shadow border-2 border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{index + 1}</div>
                    <div className="text-sm font-medium text-gray-800">
                      {building.name[getCurrentLanguage()]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                {t('academicBuildings.mapNote', 'Интерактивная карта в разработке. Используйте адреса для навигации.')}
              </p>
            </div>
          </div>
        )}

        {/* Buildings List */}
        <div className="space-y-8">
          {buildings.map((building) => (
            <div key={building.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={building.photo || building.photo_url ||
                      (building.photos && building.photos.find(p => p.type === 'facade')?.url) ||
                      `https://via.placeholder.com/400x300?text=${encodeURIComponent(getTranslatedField(building, 'name'))}`}
                    alt={getTranslatedField(building, 'name')}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Building+Photo';
                    }}
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {getTranslatedField(building, 'name')}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {building.floors || 3} {t('academicBuildings.floors', 'этажа')}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {getTranslatedField(building, 'description')}
                  </p>

                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {t('academicBuildings.address', 'Адрес')}:
                    </h3>
                    <p className="text-gray-600">{getTranslatedField(building, 'address')}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {t('academicBuildings.facilities', 'Помещения')}:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {(building.facilities || []).slice(0, 3).map((facility, index) => (
                          <li key={index}>
                            {getTranslatedField(facility, 'name') || facility.name}: {facility.count || 1}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {t('academicBuildings.totalCapacity', 'Общая вместимость')}:
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(building.facilities || []).reduce((total, facility) => total + (facility.count || 1), 0)} {t('academicBuildings.rooms', 'помещений')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedBuilding(selectedBuilding === building.id ? null : building.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {selectedBuilding === building.id
                      ? t('academicBuildings.hideDetails', 'Скрыть детали')
                      : t('academicBuildings.showDetails', 'Показать детали')
                    }
                  </button>
                </div>
              </div>

              {selectedBuilding === building.id && (
                <div className="bg-gray-50 p-6 border-t">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Detailed Facilities */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('academicBuildings.detailedFacilities', 'Подробное описание помещений')}
                      </h3>
                      <div className="space-y-3">
                        {building.facilities.map((facility, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-800">
                                {facility.name[getCurrentLanguage()]}
                              </h4>
                              <span className="text-blue-600 font-medium">{facility.count}</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {t('academicBuildings.capacity', 'Вместимость')}: {facility.capacity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Photo Gallery */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('academicBuildings.photoGallery', 'Фотогалерея')}
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {building.photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={photo.url}
                              alt={photoTypeNames[photo.type]?.[getCurrentLanguage()] || photo.type}
                              className="w-full h-32 object-cover rounded-lg"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/200x150?text=Photo';
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {photoTypeNames[photo.type]?.[getCurrentLanguage()] || photo.type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation and Contact Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t('academicBuildings.navigationInfo', 'Навигация и контакты')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t('academicBuildings.howToReach', 'Как добраться')}
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('academicBuildings.transport1', 'Автобусы: №10, №15, №22 до остановки "Университет"')}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('academicBuildings.transport2', 'Маршрутки: №105, №120, №130')}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('academicBuildings.parking', 'Парковка для студентов и преподавателей')}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {t('academicBuildings.contactInfo', 'Контактная информация')}
              </h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <strong>{t('academicBuildings.security', 'Служба безопасности')}:</strong>
                  <p>Тел: +996 312 123-000</p>
                </div>
                <div>
                  <strong>{t('academicBuildings.maintenance', 'Служба эксплуатации')}:</strong>
                  <p>Тел: +996 312 123-111</p>
                </div>
                <div>
                  <strong>{t('academicBuildings.reception', 'Общая информация')}:</strong>
                  <p>Тел: +996 312 123-456</p>
                  <p>Email: info@salymbekov.edu.kg</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicBuildings;