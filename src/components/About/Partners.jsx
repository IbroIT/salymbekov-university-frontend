import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './About.css';
import PartnersService from '../../services/partnersService';

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
  const { t, i18n } = useTranslation();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch partners data from API
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const partnersData = await PartnersService.getAllPartners(i18n.language);
        const formattedPartners = partnersData.map(partner => {
          return {
            id: partner.id,
            name: partner.name,
            type: partner.partner_type || 'academic',
            country: partner.country || 'Кыргызстан',
            city: partner.city || 'Бишкек',
            description: partner.description || '',
            website: partner.website || '',
            email: partner.email || '',
            phone: partner.phone || '',
            address: partner.address || `${partner.city || 'Бишкек'}, ${partner.country || 'Кыргызстан'}`,
            logo: partner.logo ? `https://su-med-backend-35d3d951c74b.herokuapp.com/${partner.logo}` : '/api/placeholder/100/100',
            coordinates: [
              partner.latitude || 42.8746,
              partner.longitude || 74.5698
            ],
            stats: {
              students: '',  // Remove fake numbers
              exchanges: '',
              projects: ''
            },
            established: partner.established_year || '',
            cooperation_since: partner.cooperation_since || '',
            cooperation: partner.partnership_areas ?
              partner.partnership_areas.split(',').map(area => area.trim()) :
              [],
            contact: {
              email: partner.email || '',
              phone: partner.phone || ''
            }
          };
        });
        setPartners(formattedPartners);
      } catch (err) {
        setError('Failed to load partners data');
        console.error('Error fetching partners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, [i18n.language]); // Re-fetch when language changes

  // Fallback partners data (backup)
  const fallbackPartners = [
    {
      id: 1,
      name: t('partners.list.1.name'),
      type: 'clinical',
      country: t('partners.list.1.country'),
      city: t('partners.list.1.city'),
      logo: '/src/assets/partners/rkb-logo.svg',
      coordinates: [42.8546, 74.5875],
      website: 'https://rkb.kg',
      established: '2015',
      students: 245,
      exchanges: 12,
      projects: 8,
      description: t('partners.list.1.description'),
      cooperation: t('partners.list.1.cooperation', { returnObjects: true }),
      achievements: t('partners.list.1.achievements', { returnObjects: true }),
      contact: {
        email: 'info@rkb.kg',
        phone: '+996 312 666-000'
      }
    },
  ];

  const partnerTypes = [
    { value: 'all', label: 'Все партнеры', icon: '🤝' },
    { value: 'clinical', label: 'Клинические базы', icon: '🏥' },
    { value: 'university', label: 'Университеты', icon: '🎓' },
    { value: 'organization', label: 'Организации', icon: '🔬' },
    { value: 'business', label: 'Бизнес-партнеры', icon: '💼' },
    { value: 'academic', label: 'Академические', icon: '�' }
  ];

  const filteredPartners = partners.filter(partner =>
    (filterType === 'all' || partner.type === filterType) &&
    (partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeLabel = (type) => {
    const typeLabels = {
      'clinical': 'Клиническая база',
      'university': 'Университет',
      'organization': 'Организация',
      'business': 'Бизнес-партнер',
      'academic': 'Академический партнер'
    };
    return typeLabels[type] || 'Партнер';
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
                    <span className="text-gray-500">{t('partners.established')} {partner.established}</span>
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

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.about')}</h3>
              <p className="text-gray-600 leading-relaxed">{partner.description}</p>
            </div>

            {/* Cooperation */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.cooperation')}</h3>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.achievements')}</h3>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.contact')}</h3>
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

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('partners.retry', 'Повторить попытку')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-blue-50 rounded-lg p-3 mb-6">
          <nav className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">{t('breadcrumbs.home')}</a>
            <span className="mx-2">→</span>
            <a href="/about" className="hover:text-blue-600">{t('breadcrumbs.about')}</a>
            <span className="mx-2">→</span>
            <span className="text-blue-600">{t('breadcrumbs.partners')}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('partners.subtitle')}
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${filterType === type.value
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
              placeholder={t('partners.search')}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {t('partners.showing')} <span className="font-semibold">{filteredPartners.length}</span>
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

              {/* Partnership areas */}
              {partner.cooperation && partner.cooperation.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Направления сотрудничества:</h4>
                  <div className="flex flex-wrap gap-1">
                    {partner.cooperation.map((area, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedPartner(partner)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('partners.details')}
                </button>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('partners.website')}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('partners.map.title')}</h2>
            <p className="text-gray-600">{t('partners.map.subtitle')}</p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={[42.8742887, 74.5972753]} // Bishkek coordinates
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

                      {/* Partnership areas */}
                      {partner.cooperation && partner.cooperation.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs font-medium text-gray-900 mb-1">Сотрудничество:</div>
                          <div className="flex flex-wrap gap-1">
                            {partner.cooperation.slice(0, 2).map((area, index) => (
                              <span
                                key={index}
                                className="px-1 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                              >
                                {area}
                              </span>
                            ))}
                            {partner.cooperation.length > 2 && (
                              <span className="text-xs text-gray-500">+{partner.cooperation.length - 2}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedPartner(partner)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors"
                        >
                          {t('partners.details')}
                        </button>
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 border border-gray-300 rounded text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {t('partners.website')}
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

        {/* Simple Partners Count */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {partners.length}
            </div>
            <div className="text-gray-600">Активных партнеров</div>
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