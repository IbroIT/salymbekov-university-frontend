import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';
import { getManagement } from '../../services/teachers';

const Management = () => {
  const { t, i18n } = useTranslation();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [managementData, setManagementData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загружаем данные с API
  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching management data...');
      setLoading(true);
      const data = await getManagement();
      console.log('Management data received:', data);
      if (data && data.length > 0) {
        setManagementData(data[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'ky' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };

  // Трансформируем данные из API для использования в компоненте
  const transformApiData = (apiNode) => {
    if (!apiNode) return null;
    
    return {
      id: apiNode.id.toString(),
      name: getLocalizedText(apiNode, 'position'),
      type: 'administration',
      head: getLocalizedText(apiNode, 'full_name'),
      position: getLocalizedText(apiNode, 'position'),
      email: `${getLocalizedText(apiNode, 'full_name').toLowerCase().replace(/\s+/g, '.')}@salymbekov.kg`,
      phone: '+996 312 625-100',
      experience: '15+ лет',
      education: 'Высшее образование',
      bio: getLocalizedText(apiNode, 'bio') || 'Опытный руководитель',
      avatar: apiNode.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(getLocalizedText(apiNode, 'full_name'))}&size=400&background=3b82f6&color=fff&rounded=true`,
      children: apiNode.children ? apiNode.children.map(transformApiData) : []
    };
  };

  // Используем данные из API или fallback
  const organizationData = managementData ? transformApiData(managementData) : {
    id: 'loading',
    name: loading ? 'Загрузка...' : 'Университет',
    type: 'administration',
    head: loading ? 'Загрузка...' : 'Ректор',
    position: loading ? 'Загрузка...' : 'Ректор',
    email: 'rector@salymbekov.kg',
    phone: '+996 312 625-100',
    experience: '25 лет',
    education: 'Доктор медицинских наук',
    bio: loading ? 'Загрузка данных...' : 'Ректор университета',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    children: []
  };

  const renderMemberCard = (member, level = 0) => {
    const levelClasses = {
      0: 'text-center w-full md:w-80 mx-auto',
      1: 'text-center w-full md:w-72 mx-auto',
      2: 'text-center w-full md:w-64 mx-auto',
      3: 'text-center w-full md:w-56 mx-auto'
    };

    const levelStyles = {
      0: 'bg-gradient-to-br from-blue-600 to-blue-800 text-white',
      1: 'bg-gradient-to-br from-blue-500 to-blue-700 text-white',
      2: 'bg-gradient-to-br from-blue-400 to-blue-600 text-white',
      3: 'bg-gradient-to-br from-blue-300 to-blue-500 text-white'
    };

    return (
      <div className="flex flex-col items-center mb-8" key={member.id}>
        <div className={`${levelClasses[level] || levelClasses[3]} ${levelStyles[level] || levelStyles[3]} rounded-xl shadow-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className="relative mb-4">
            <img
              src={member.avatar}
              alt={member.head}
              className="w-20 h-20 rounded-full mx-auto border-4 border-white/20 shadow-lg object-cover"
            />
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              {member.type === 'administration' ? '👑' : member.type === 'faculty' ? '🎓' : '📚'}
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">{member.head}</h3>
          <p className="text-sm opacity-90 mb-3">{member.position}</p>
          <div className="text-xs space-y-1 opacity-75">
            <p>📧 {member.email}</p>
            <p>📞 {member.phone}</p>
            <p>⏰ {member.experience}</p>
          </div>
          
          {/* Дополнительная информация для деканов и заведующих */}
          {(member.studentCount || member.teacherCount) && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex justify-center space-x-4 text-xs">
                {member.studentCount && (
                  <span className="flex items-center">
                    👨‍🎓 {member.studentCount}
                  </span>
                )}
                {member.teacherCount && (
                  <span className="flex items-center">
                    👨‍🏫 {member.teacherCount}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Отображение детей */}
        {member.children && member.children.length > 0 && (
          <div className="mt-8 w-full">
            <div className="flex flex-col lg:flex-row lg:justify-center lg:flex-wrap gap-6">
              {member.children.map(child => renderMemberCard(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPyramidStructure = () => {
    if (!organizationData) {
      return (
        <div className="text-center py-12">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"></div>
          <p className="mt-4 text-gray-600">Загрузка структуры...</p>
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto">
        {renderMemberCard(organizationData)}
      </div>
    );
  };

  const PersonModal = ({ person, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onClose]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div ref={modalRef} className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
            <h2 className="text-2xl font-bold text-gray-900">{person.head}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {renderMemberDetails(person)}
          </div>
        </div>
      </div>
    );
  };

  const renderMemberDetails = (member) => {
    return (
      <div className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Фото и основные данные */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center">
              <img
                src={member.avatar}
                alt={member.head}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.head}</h3>
              <p className="text-blue-600 font-medium mb-1">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.name}</p>
            </div>
          </div>

          {/* Контактная информация */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📞</span>
              {t('management.contactInfo')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">📧</span>
                <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">📞</span>
                <a href={`tel:${member.phone}`} className="text-blue-600 hover:underline">
                  {member.phone}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="w-6 text-center mr-3">⏰</span>
                <span>{member.experience}</span>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🎓</span>
              {t('management.additionalInfo')}
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600 text-sm font-medium">{t('management.education')}:</span>
                <p className="text-gray-800">{member.education}</p>
              </div>
              {member.studentCount && (
                <div>
                  <span className="text-gray-600 text-sm font-medium">{t('management.studentsCount')}:</span>
                  <p className="text-gray-800">{member.studentCount}</p>
                </div>
              )}
              {member.teacherCount && (
                <div>
                  <span className="text-gray-600 text-sm font-medium">{t('management.teachersCount')}:</span>
                  <p className="text-gray-800">{member.teacherCount}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Биография */}
        {member.bio && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📖</span>
              {t('management.biography')}
            </h4>
            <p className="text-gray-600 leading-relaxed">{member.bio}</p>
          </div>
        )}

        {/* Достижения */}
        {member.achievements && member.achievements.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              {t('management.achievements')}
            </h4>
            <ul className="space-y-2">
              {member.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-500 mr-2 mt-1">⭐</span>
                  <span className="text-gray-600">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Сотрудники отдела */}
        {member.staff && member.staff.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👥</span>
              {t('management.staff')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {member.staff.map((staffMember, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-800 mb-2">{staffMember.name}</h5>
                  <p className="text-sm text-blue-600 mb-1">{staffMember.position}</p>
                  <p className="text-sm text-gray-600 mb-2">{staffMember.specialization}</p>
                  <div className="text-xs text-gray-500">
                    <p>⏰ {staffMember.experience}</p>
                    <p>🎓 {staffMember.education}</p>
                    <p>📧 <a href={`mailto:${staffMember.email}`} className="text-blue-600 hover:underline">{staffMember.email}</a></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm text-blue-200 mb-8">
            <a href="/" className="hover:text-white transition-colors">{t('management.breadcrumbHome')}</a>
            <span className="mx-2">→</span>
            <a href="/about" className="hover:text-white transition-colors">{t('management.breadcrumbAbout')}</a>
            <span className="mx-2">→</span>
            <span className="text-white">{t('management.title')}</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              {t('management.title')}
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              {t('management.description')}
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-blue-300">150+</div>
                <div className="text-sm text-blue-200">{t('management.teachersCount')}</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-green-300">15</div>
                <div className="text-sm text-blue-200">{t('management.departmentsCount')}</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-yellow-300">5</div>
                <div className="text-sm text-blue-200">{t('management.facultiesCount')}</div>
              </div>
              <div className="text-center animate-fade-in stats-counter">
                <div className="text-3xl font-bold text-purple-300">2000+</div>
                <div className="text-sm text-blue-200">{t('management.studentsCount')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Pyramid View */}
        <div className="bg-white rounded-2xl shadow-xl p-8" id="org-chart">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">{t('management.organizationTitle')}</h2>
            <p className="text-gray-600 text-lg">{t('management.organizationSubtitle')}</p>
          </div>
          
          {renderPyramidStructure()}
        </div>
      </div>

      {/* Person Details Modal */}
      {isModalOpen && selectedPerson && (
        <PersonModal 
          person={selectedPerson} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPerson(null);
          }} 
        />
      )}
    </div>
  );
};

export default Management;
