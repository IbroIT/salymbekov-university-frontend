import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import './About.css';
import PartnersService from '../../services/partnersService';
import API_CONFIG from '../../config/api';
import SEOComponent from '../SEO/SEOComponent';
import { AlertTriangle, BookOpen, Briefcase, Building, GraduationCap, Hospital, Microscope } from 'lucide-react';
import SideMenu from '../common/SideMenu';

// Add custom styles for logo markers
const logoMarkerStyles = `
  .custom-logo-marker {
    background: transparent !important;
    border: none !important;
  }
  .custom-logo-marker div {
    transition: transform 0.2s ease-in-out;
  }
  .custom-logo-marker:hover div {
    transform: scale(1.1);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = logoMarkerStyles;
  document.head.appendChild(styleSheet);
}

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
    ">${type === 'clinical' ? '<Hospital className="w-5 h-5" />' : type === 'university' ? '<GraduationCap className="w-5 h-5" />' : type === 'organization' ? '<Microscope className="w-5 h-5" />' : '<Briefcase className="w-5 h-5" />'}</div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Custom markers with partner logos
const createLogoMarker = (logoUrl) => {
  return new L.DivIcon({
    className: 'custom-logo-marker',
    html: `<div style="
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    ">
      <img 
        src="${logoUrl}" 
        style="
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 50%;
        "
        onerror="this.style.display='none'; this.parentNode.innerHTML='<Building className="w-5 h-5" />';"
      />
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

const Partners = () => {
  const { t, i18n } = useTranslation();

  const hsmItems = [
    { title: t('nav.about_HSM'), link: '/hsm/about' },
    { title: t('nav.management'), link: '/hsm/manage' },
    { title: t('nav.programs'), link: '/hsm/programs' },
    { title: t('nav.academic_stuff'), link: '/hsm/AS' },
    { title: t('nav.partners'), link: '/hsm/partners' },
    { title: t('nav.cmk'), link: '/hsm/cmk' },
  ];
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to create proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/100/100';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_CONFIG.BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
  };

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
            address: partner.address || `${partner.city}, ${partner.country}`,
            logo: getImageUrl(partner.logo),
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
        setError(t('partners.loadingError'));
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
    { value: 'all', label: t('partners.filterTypes.all'), icon: '🤝' },
    { value: 'clinical', label: t('partners.filterTypes.clinical'), Icon: Hospital },
    { value: 'university', label: t('partners.filterTypes.university'), Icon: GraduationCap },
    { value: 'organization', label: t('partners.filterTypes.organization'), Icon: Microscope },
    { value: 'business', label: t('partners.filterTypes.business'), Icon: Briefcase },
    { value: 'academic', label: t('partners.filterTypes.academic'), icon: '<BookOpen className="w-5 h-5" />' }
  ];

  const filteredPartners = partners.filter(partner =>
    (filterType === 'all' || partner.type === filterType) &&
    (partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.country.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeLabel = (type) => {
    return t(`partners.typeLabels.${type}`, t('partners.typeLabels.academic'));
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
                  onError={(e) => {
                    e.target.src = '/api/placeholder/100/100';
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {partner.name}
                  </h2>
                  <div className="flex items-center space-x-3">
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

            {/* Contact */}
            {partner.website && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('partners.contact')}</h3>
                <div className="flex items-center">
                  <span className="text-gray-500 mr-3">🌐</span>
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {partner.website}
                  </a>
                </div>
              </div>
            )}
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
          <div className="text-red-600 text-xl mb-4"><AlertTriangle className="w-5 h-5" /> {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {t('partners.retry')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOComponent />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('partners.title')}
          </h1>
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
                  alt={partner.name}
                  className="w-12 h-12 object-contain mr-4"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/100/100';
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {partner.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {partner.description}
              </p>

              {/* Partnership areas */}
              {partner.cooperation && partner.cooperation.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">{t('partners.partnershipAreas')}</h4>
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
                  icon={createLogoMarker(partner.logo)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[250px]">
                      {/* Partner Header in Popup */}
                      <div className="flex items-center mb-3">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-8 h-8 object-contain mr-2"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/100/100';
                          }}
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {partner.name}
                          </h3>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                        {partner.description}
                      </p>

                      {/* Partnership areas */}
                      {partner.cooperation && partner.cooperation.length > 0 && (
                        <div className="mb-3">
                          <div className="text-xs font-medium text-gray-900 mb-1">{t('partners.cooperation')}:</div>
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
        </div>

        {/* Partner Details Modal */}
        <PartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      </div>

      {/* Боковое меню для навигации по разделу */}
      <SideMenu items={hsmItems} currentPath={window.location.pathname} />
    </>
  );
};

export default Partners;