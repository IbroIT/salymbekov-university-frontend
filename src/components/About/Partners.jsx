import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './About.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom markers for different partner types
const createCustomMarker = (type) => {
  const colors = {
    clinical: '#dc2626', // red
    university: '#2563eb', // blue
    organization: '#16a34a', // green
    business: '#9333ea' // purple
  };
  
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${colors[type] || '#6b7280'};
      width: 25px;
      height: 25px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
    ">${type === 'clinical' ? '🏥' : type === 'university' ? '🎓' : type === 'organization' ? '🔬' : '💼'}</div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const Partners = () => {
  const { t } = useTranslation();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState(''); // Added searchTerm state

  const partners = [
    {
      id: 1,
      name: 'Республиканская клиническая больница',
      type: 'clinical',
      country: 'Кыргызстан',
      city: 'Бишкек',
      logo: '/src/assets/partners/rkb-logo.svg',
      coordinates: [42.8746, 74.5975], // [lat, lng] format for Leaflet
      website: 'https://rkb.kg',
      established: '2015',
      students: 245,
      exchanges: 12,
      projects: 8,
      description: 'Основная клиническая база для практики студентов медицинского факультета. Сотрудничество включает проведение клинических занятий, стажировок и научных исследований.',
      cooperation: [
        'Клинические занятия для студентов 4-6 курсов',
        'Ординатура и интернатура',
        'Совместные научные исследования',
        'Обмен специалистами',
        'Повышение квалификации преподавателей'
      ],
      achievements: [
        'Подготовлено более 1000 специалистов',
        'Реализовано 15 совместных проектов',
        'Получены 3 гранта на исследования'
      ],
      contact: {
        email: 'info@rkb.kg',
        phone: '+996 312 666-000'
      }
    },
    {
      id: 2,
      name: 'Харьковский национальный медицинский университет',
      type: 'university',
      country: 'Украина',
      city: 'Харьков',
      logo: '/src/assets/partners/kharkiv-medical-logo.svg',
      coordinates: [49.9935, 36.2310],
      website: 'https://knmu.edu.ua',
      established: '2018',
      students: 89,
      exchanges: 25,
      projects: 12,
      achievements: [
        'Реализована программа двойных дипломов',
        'Обучено 150+ студентов по обмену',
        'Опубликованы 45 совместных научных работ'
      ],
      description: 'Стратегическое партнерство в области медицинского образования и научных исследований. Обмен студентами и преподавателями.',
      cooperation: [
        'Программы академической мобильности',
        'Двойные дипломы',
        'Совместные образовательные программы',
        'Научно-исследовательские проекты',
        'Обмен методическими материалами'
      ],
      contact: {
        email: 'international@knmu.edu.ua',
        phone: '+380 57 707-7000'
      }
    },
    {
      id: 3,
      name: 'Ташкентская медицинская академия',
      type: 'university',
      country: 'Узбекистан',
      city: 'Ташкент',
      logo: '/src/assets/partners/tashkent-medical-logo.svg',
      coordinates: [41.2995, 69.2401],
      website: 'https://tma.uz',
      established: '2019',
      students: 67,
      exchanges: 18,
      projects: 6,
      description: 'Партнерство в области подготовки медицинских кадров и проведения совместных исследований.',
      cooperation: [
        'Обмен студентами и преподавателями',
        'Совместные научные конференции',
        'Методическое сотрудничество',
        'Стажировки специалистов',
        'Разработка учебных программ'
      ],
      contact: {
        email: 'rector@tma.uz',
        phone: '+998 71 150-7890'
      }
    },
    {
      id: 4,
      name: 'Национальный центр кардиологии',
      type: 'clinical',
      country: 'Кыргызстан',
      city: 'Бишкек',
      logo: '/src/assets/partners/cardio-center-logo.svg',
      coordinates: [42.8700, 74.6100],
      website: 'https://cardio.kg',
      established: '2016',
      students: 89,
      exchanges: 8,
      projects: 5,
      description: 'Специализированная клиническая база для подготовки кардиологов и кардиохирургов.',
      cooperation: [
        'Специализированная практика студентов',
        'Подготовка кардиологов',
        'Научные исследования в кардиологии',
        'Мастер-классы ведущих специалистов',
        'Внедрение новых методов лечения'
      ],
      contact: {
        email: 'info@cardio.kg',
        phone: '+996 312 625-000'
      }
    },
    {
      id: 5,
      name: 'Всемирная организация здравоохранения',
      type: 'organization',
      country: 'Швейцария',
      city: 'Женева',
      logo: '/src/assets/partners/who-logo.svg',
      coordinates: [46.2044, 6.1432],
      website: 'https://who.int',
      established: '2020',
      students: 45,
      exchanges: 15,
      projects: 10,
      description: 'Сотрудничество в рамках глобальных программ здравоохранения и медицинского образования.',
      cooperation: [
        'Участие в глобальных программах ВОЗ',
        'Обучение по стандартам ВОЗ',
        'Исследования общественного здравоохранения',
        'Подготовка экспертов ВОЗ',
        'Международные стажировки'
      ],
      contact: {
        email: 'info@who.int',
        phone: '+41 22 791-2111'
      }
    },
    {
      id: 6,
      name: 'Евразийский медицинский колледж',
      type: 'business',
      country: 'Кыргызстан',
      city: 'Бишкек',
      logo: '/src/assets/partners/eurasia-medical-college-logo.svg',
      coordinates: [42.8500, 74.5800],
      website: 'https://eurasia-med.kg',
      established: '2017',
      students: 123,
      exchanges: 20,
      projects: 7,
      description: 'Партнерство в области среднего медицинского образования и профессиональной подготовки.',
      cooperation: [
        'Подготовка среднего медперсонала',
        'Совместные образовательные программы',
        'Практическое обучение студентов',
        'Повышение квалификации',
        'Методическое сотрудничество'
      ],
      contact: {
        email: 'education@eurasia-med.kg',
        phone: '+996 312 900-500'
      }
    },
    {
      id: 7,
      name: 'Берлинский медицинский институт',
      type: 'university',
      country: 'Германия',
      city: 'Берлин',
      logo: '/src/assets/partners/charite-berlin-logo.svg',
      coordinates: [52.5200, 13.4050],
      website: 'https://charite.de',
      established: '2021',
      students: 32,
      exchanges: 8,
      projects: 4,
      description: 'Международное сотрудничество в области медицинских исследований и образования.',
      cooperation: [
        'Программы стажировок в Европе',
        'Совместные исследовательские проекты',
        'Обмен научными публикациями',
        'Участие в европейских грантах',
        'Летние школы для студентов'
      ],
      contact: {
        email: 'international@charite.de',
        phone: '+49 30 450-50'
      }
    },
    {
      id: 8,
      name: 'Медицинский центр "Ала-Тоо"',
      type: 'clinical',
      country: 'Кыргызстан',
      city: 'Бишкек',
      logo: '/src/assets/partners/alatoo-medical-logo.svg',
      coordinates: [42.8800, 74.6200],
      website: 'https://alatoo-med.kg',
      established: '2019',
      students: 156,
      exchanges: 15,
      projects: 6,
      description: 'Современная клиническая база с высокотехнологичным оборудованием для практики студентов.',
      cooperation: [
        'Клинические занятия и практики',
        'Использование современного оборудования',
        'Стажировки по новым технологиям',
        'Совместные клинические исследования',
        'Повышение квалификации врачей'
      ],
      contact: {
        email: 'education@alatoo-med.kg',
        phone: '+996 312 800-900'
      }
    }
  ];

  const partnerTypes = [
    { value: 'all', label: 'Все партнеры', icon: '🤝' },
    { value: 'clinical', label: 'Клинические базы', icon: '🏥' },
    { value: 'university', label: 'Международные университеты', icon: '🎓' },
    { value: 'organization', label: 'Научные организации', icon: '🔬' },
    { value: 'business', label: 'Бизнес-партнеры', icon: '💼' }
  ];

  const filteredPartners = partners.filter(partner =>
    (filterType === 'all' || partner.type === filterType) &&
    (partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
     partner.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeLabel = (type) => {
    const typeMap = {
      clinical: 'Клиническая база',
      university: 'Университет',
      organization: 'Организация',
      business: 'Бизнес-партнер'
    };
    return typeMap[type] || 'Партнер';
  };

  const getTypeBadgeColor = (type) => {
    const colors = {
      clinical: 'bg-red-100 text-red-800',
      university: 'bg-blue-100 text-blue-800',
      organization: 'bg-green-100 text-green-800',
      business: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const PartnerModal = ({ partner, onClose }) => {
    if (!partner) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(partner.type)}`}>
                      {getTypeLabel(partner.type)}
                    </span>
                    <span className="text-gray-500">{partner.city}, {partner.country}</span>
                    <span className="text-gray-500">с {partner.established} года</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{partner.students}</div>
                <div className="text-sm text-gray-600">Студентов в программах</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{partner.exchanges}</div>
                <div className="text-sm text-gray-600">Обменов в год</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{partner.projects}</div>
                <div className="text-sm text-gray-600">Совместных проектов</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">О партнерстве</h3>
              <p className="text-gray-600 leading-relaxed">{partner.description}</p>
            </div>

            {/* Cooperation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Направления сотрудничества</h3>
              <ul className="space-y-2">
                {partner.cooperation.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Achievements */}
            {partner.achievements && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Достижения</h3>
                <ul className="space-y-2">
                  {partner.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-3 mt-1">✓</span>
                      <span className="text-gray-600">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Контактная информация</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">📧</span>
                  <a href={`mailto:${partner.contact.email}`} className="text-blue-600 hover:underline">
                    {partner.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">📞</span>
                  <a href={`tel:${partner.contact.phone}`} className="text-blue-600 hover:underline">
                    {partner.contact.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">🌐</span>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {partner.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Custom Styles for Map */}
      <style jsx>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
        }
        
        .leaflet-popup-tip {
          box-shadow: none !important;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .z-0 {
          z-index: 0;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="bg-blue-50 rounded-lg p-3 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Главная</a>
          <span className="mx-2">→</span>
          <a href="/about" className="hover:text-blue-600">О нас</a>
          <span className="mx-2">→</span>
          <span className="text-blue-600">Партнеры</span>
        </nav>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Наши партнеры
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Университет имени Салымбекова активно развивает международное сотрудничество
          с ведущими медицинскими учреждениями и образовательными организациями
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {partnerTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                  filterType === type.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Поиск партнеров..."
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />



        </div>
        <div className="mt-4 text-sm text-gray-600">
          Показано партнеров: <span className="font-semibold">{filteredPartners.length}</span>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredPartners.map(partner => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6"
          >
            {/* Partner Header */}
            <div className="flex items-center mb-4">
              <img
                src={partner.logo}
                className="w-12 h-12 object-contain mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {partner.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(partner.type)}`}>
                    {getTypeLabel(partner.type)}
                  </span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <span className="mr-2">📍</span>
              <span>{partner.city}, {partner.country}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {partner.description}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">{partner.students}</div>
                <div className="text-xs text-gray-500">Студентов</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{partner.exchanges}</div>
                <div className="text-xs text-gray-500">Обменов</div>
              </div>
              <div>
                <div className="text-lg font-bold text-purple-600">{partner.projects}</div>
                <div className="text-xs text-gray-500">Проектов</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedPartner(partner)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Подробнее
              </button>
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Сайт
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">География партнерства</h2>
          <p className="text-gray-600">Интерактивная карта наших партнеров по всему миру</p>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <MapContainer
            center={[42.8746, 74.5975]} // Bishkek coordinates
            zoom={2}
            style={{ height: '500px', width: '100%' }}
            className="z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredPartners.map(partner => (
              <Marker
                key={partner.id}
                position={partner.coordinates}
                icon={createCustomMarker(partner.type)}
              >
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[250px]">
                    {/* Partner Header in Popup */}
                    <div className="flex items-center mb-3">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-8 h-8 object-contain mr-2"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {partner.name}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(partner.type)}`}>
                          {getTypeLabel(partner.type)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-2">📍</span>
                      <span>{partner.city}, {partner.country}</span>
                    </div>
                    
                    {/* Short Description */}
                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                      {partner.description}
                    </p>
                    
                    {/* Statistics */}
                    <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
                      <div>
                        <div className="font-bold text-blue-600">{partner.students}</div>
                        <div className="text-gray-500">Студентов</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">{partner.exchanges}</div>
                        <div className="text-gray-500">Обменов</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-600">{partner.projects}</div>
                        <div className="text-gray-500">Проектов</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedPartner(partner)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        Подробнее
                      </button>
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Сайт
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* Map Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {partnerTypes.slice(1).map(type => (
            <div key={type.value} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow flex items-center justify-center text-xs"
                style={{ 
                  backgroundColor: type.value === 'clinical' ? '#dc2626' : 
                                 type.value === 'university' ? '#2563eb' : 
                                 type.value === 'organization' ? '#16a34a' : '#9333ea'
                }}
              >
                {type.icon}
              </div>
              <span className="text-gray-600">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {partners.length}
          </div>
          <div className="text-gray-600">Партнеров</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {partners.reduce((sum, p) => sum + (p.students || 0), 0)}
          </div>
          <div className="text-gray-600">Студентов в программах</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {partners.reduce((sum, p) => sum + (p.exchanges || 0), 0)}
          </div>
          <div className="text-gray-600">Обменов в год</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {partners.reduce((sum, p) => sum + (p.projects || 0), 0)}
          </div>
          <div className="text-gray-600">Совместных проектов</div>
        </div>
      </div>

      {/* Partner Details Modal */}
      <PartnerModal 
        partner={selectedPartner} 
        onClose={() => setSelectedPartner(null)} 
      />
      </div>
    </>
  );
};

export default Partners;
