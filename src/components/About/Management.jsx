import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getManagement, getTeachers } from '../../services/teachers';

const Management = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('management');
  const [managementData, setManagementData] = useState(null);
  const [teachersData, setTeachersData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Загружаем данные с API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Загружаем данные руководства
      const managementData = await getManagement();
      if (managementData && managementData.length > 0) {
        setManagementData(managementData[0]);
      }
      
      // Загружаем данные учителей
      const teachersData = await getTeachers();
      setTeachersData(teachersData);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  const sections = [
    { id: 'management', name: t('management.organizationTitle'), icon: '👑' },
    { id: 'teachers', name: 'Преподаватели', icon: '🎓' },
    { id: 'statistics', name: t('management.statistics'), icon: '📊' }
  ];

  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'ky' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };

  const changeActiveSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const renderManagementContent = () => {
    if (!managementData) {
      return (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          <p className="mt-6 text-gray-600 text-lg">Загрузка структуры...</p>
        </div>
      );
    }

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

    const organizationData = transformApiData(managementData);

    // Строим уровни иерархии (BFS)
    const buildLevels = (root) => {
      const levels = [];
      let queue = [{ node: root, level: 0 }];
      while (queue.length) {
        const { node, level } = queue.shift();
        if (!levels[level]) levels[level] = [];
        levels[level].push(node);
        if (node.children && node.children.length) {
          node.children.forEach((child) => queue.push({ node: child, level: level + 1 }));
        }
      }
      return levels;
    };

    const levels = buildLevels(organizationData);

    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('management.organizationTitle')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('management.organizationSubtitle')}</p>
        </div>

        <div className="space-y-10">
          {levels.map((nodes, levelIndex) => (
            <div key={levelIndex} className="flex justify-center">
              <div className="max-w-6xl w-full flex flex-wrap justify-center gap-6">
                {nodes.map((member) => (
                  <div 
                    key={member.id}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-80"
                  >
                    <div className="text-center">
                      <div className="relative mb-4">
                        <img
                          src={member.avatar}
                          alt={member.head}
                          className="w-24 h-24 rounded-full mx-auto border-4 border-white/80 shadow-lg object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white text-blue-600 px-2 py-1 rounded-full text-xs font-bold shadow-md">
                          {levelIndex === 0 ? '👑' : '💼'}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{member.head}</h3>
                      <p className="text-blue-100 text-sm mb-3">{member.position}</p>
                      <div className="text-xs text-blue-200 space-y-1">
                        <p>📧 {member.email}</p>
                        <p>📞 {member.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTeachersContent = () => {
    const renderTeacherCard = (teacher) => {
      const teacherData = {
        id: teacher.id.toString(),
        head: getLocalizedText(teacher, 'full_name'),
        position: getLocalizedText(teacher, 'position'),
        avatar: teacher.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(getLocalizedText(teacher, 'full_name'))}&size=400&background=16a085&color=fff&rounded=true`,
        type: 'teacher'
      };

      return (
        <div 
          key={teacher.id} 
          className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="relative mb-4">
              <img
                src={teacherData.avatar}
                alt={teacherData.head}
                className="w-20 h-20 rounded-full mx-auto border-4 border-white/80 shadow-md object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{teacherData.head}</h3>
            <p className="text-green-100 text-sm">{teacherData.position}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Преподаватели</h2>
          <p className="text-gray-600">Наши квалифицированные преподаватели</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 rounded-full bg-green-200/60 animate-pulse"></div>
            <p className="mt-4 text-gray-600">Загрузка преподавателей...</p>
          </div>
        ) : teachersData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachersData.map(teacher => renderTeacherCard(teacher))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Данные о преподавателях не найдены</p>
          </div>
        )}
      </div>
    );
  };

  const renderStatisticsContent = () => {
    const statistics = [
      { number: '150+', label: t('management.teachersCount'), icon: '👨‍🏫', color: 'from-blue-500 to-blue-600' },
      { number: '15', label: t('management.departmentsCount'), icon: '🏛️', color: 'from-purple-500 to-purple-600' },
      { number: '5', label: t('management.facultiesCount'), icon: '🎓', color: 'from-green-500 to-green-600' },
      { number: '2000+', label: t('management.studentsCount'), icon: '👥', color: 'from-orange-500 to-orange-600' }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('management.statistics')}</h2>
          <p className="text-gray-600">Ключевые показатели университета</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg text-center`}
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-white/90 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">О университете</h3>
            <p className="text-gray-600 leading-relaxed">
              {t('management.description')}
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Наша миссия</h3>
            <p className="text-gray-600 leading-relaxed">
              Подготовка высококвалифицированных специалистов в области медицины и здравоохранения
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'management':
        return renderManagementContent();
      case 'teachers':
        return renderTeachersContent();
      case 'statistics':
        return renderStatisticsContent();
      default:
        return renderManagementContent();
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('management.title')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('management.description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                Разделы
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center ${
                          activeSection === section.id
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

export default Management;