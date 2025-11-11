import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getManagement } from '../../services/teachers';
import SEOComponent from '../SEO/SEOComponent';

const Management = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [managementData, setManagementData] = useState(null);
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

      setLoading(false);
    };
    fetchData();
  }, []);



  // Функция для получения локализованного текста
  const getLocalizedText = (obj, field) => {
    if (!obj) return '';
    const lang = i18n.language === 'kg' ? 'kg' : i18n.language;
    return obj[`${field}_${lang}`] || obj[`${field}_ru`] || obj[`${field}_en`] || '';
  };



  const renderManagementContent = () => {
    if (!managementData) {
      return (
        <div className="text-center py-12">
          <div className="inline-block w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 animate-pulse"></div>
          <p className="mt-6 text-gray-600 text-lg">{t('management.loadingStructure')}</p>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('management.organizationTitle')}
          </h2>
        </div>

        <div className="space-y-10">
          {levels.map((nodes, levelIndex) => (
            <div key={levelIndex} className="flex justify-center">
              <div className="max-w-6xl w-full flex flex-wrap justify-center gap-6">
                {nodes.map((member, index) => (
                  <div 
                    key={member.id}
                    className="relative group w-80"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Полупрозрачный синий фон с блюром */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-white/90 rounded-3xl backdrop-blur-xl border border-blue-100/80 shadow-2xl transform group-hover:scale-105 transition-all duration-500 animate-float" />
                    
                    {/* Синяя обводка при ховере */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-sky-200/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative p-8 text-center z-10">
                      {/* Аватар с синей градиентной обводкой */}
                      <div className="relative mb-6 inline-block">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-sky-500 rounded-full blur-sm" />
                        <img
                          src={member.avatar}
                          alt={member.head}
                          className="relative w-28 h-28 rounded-full mx-auto border-4 border-white shadow-2xl object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-500">
                        {member.head}
                      </h3>
                      <p className="text-gray-600 text-lg font-medium bg-blue-50/50 rounded-2xl py-2 px-4 inline-block border border-blue-100/50">
                        {member.position}
                      </p>
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





  return (
    <>
      <SEOComponent />
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
      {/* Анимированный фон с синими элементами */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sky-300 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-200 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            {t('management.title')}
          </h1>
        </div>

        {/* Основной контент на всю ширину */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-white/90 rounded-3xl backdrop-blur-xl border border-blue-100 shadow-2xl" />
            <div className="relative p-8 z-10 transition-all duration-500">
              {renderManagementContent()}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.15; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
    </>
  );
};

export default Management;