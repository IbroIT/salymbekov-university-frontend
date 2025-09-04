// Демонстрационные примеры использования Management компонента

// 1. Базовое использование
import React from 'react';
import Management from './components/About/Management';

const App = () => {
  return (
    <div className="App">
      <Management />
    </div>
  );
};

// 2. Использование с роутингом
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const AppWithRouting = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about/management" element={<Management />} />
      </Routes>
    </Router>
  );
};

// 3. Кастомизированная версия с дополнительными пропсами
const CustomManagement = () => {
  const customTheme = {
    primaryColor: '#B91C1C', // Harvard red
    secondaryColor: '#1D4ED8',
    backgroundColor: '#F8FAFC'
  };

  const customTranslations = {
    title: 'Руководство университета',
    searchPlaceholder: 'Поиск по персоналу...',
    exportButton: 'Скачать структуру'
  };

  return (
    <Management 
      theme={customTheme}
      translations={customTranslations}
      showExportButton={true}
      showSearchStats={true}
      enableAnimations={true}
      compactMode={false}
    />
  );
};

// 4. Интеграция с API
import { useState, useEffect } from 'react';

const ManagementWithAPI = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/university/structure');
        if (!response.ok) throw new Error('Ошибка загрузки данных');
        
        const data = await response.json();
        setOrgData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Загрузка структуры...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return <Management data={orgData} />;
};

// 5. Расширенная версия с дополнительным функционалом
const EnhancedManagement = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [viewPreferences, setViewPreferences] = useState({
    showPhotos: true,
    showContacts: true,
    showExperience: true,
    compactView: false
  });

  const handleSearch = (query) => {
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const toggleFavorite = (personId) => {
    setFavorites(prev => 
      prev.includes(personId) 
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const exportToExcel = (data) => {
    // Логика экспорта в Excel
    console.log('Экспорт в Excel:', data);
  };

  const exportToJSON = (data) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'university_structure.json';
    a.click();
  };

  return (
    <div className="enhanced-management">
      <div className="management-controls">
        <div className="search-history">
          <h3>История поиска:</h3>
          {searchHistory.map((query, index) => (
            <button 
              key={index} 
              onClick={() => handleSearch(query)}
              className="history-item"
            >
              {query}
            </button>
          ))}
        </div>
        
        <div className="export-options">
          <button onClick={() => exportToJSON(orgData)}>
            📄 Экспорт JSON
          </button>
          <button onClick={() => exportToExcel(orgData)}>
            📊 Экспорт Excel
          </button>
        </div>
        
        <div className="view-preferences">
          <label>
            <input 
              type="checkbox" 
              checked={viewPreferences.showPhotos}
              onChange={(e) => setViewPreferences(prev => ({
                ...prev, 
                showPhotos: e.target.checked
              }))}
            />
            Показывать фотографии
          </label>
          {/* Другие настройки */}
        </div>
      </div>
      
      <Management 
        onSearch={handleSearch}
        onFavoriteToggle={toggleFavorite}
        favorites={favorites}
        viewPreferences={viewPreferences}
      />
    </div>
  );
};

// 6. Мобильная версия с упрощенным интерфейсом
const MobileManagement = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Management 
      mobileMode={isMobile}
      showHierarchyLevel={!isMobile}
      enableSwipeGestures={isMobile}
      compactCards={isMobile}
    />
  );
};

// 7. Интеграция с состоянием Redux
import { useSelector, useDispatch } from 'react-redux';

const ManagementWithRedux = () => {
  const dispatch = useDispatch();
  const {
    organizationData,
    searchTerm,
    selectedDepartment,
    expandedNodes,
    loading,
    error
  } = useSelector(state => state.management);

  const handleSearch = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const handleDepartmentFilter = (dept) => {
    dispatch({ type: 'SET_DEPARTMENT_FILTER', payload: dept });
  };

  const handleNodeToggle = (nodeId) => {
    dispatch({ type: 'TOGGLE_NODE', payload: nodeId });
  };

  return (
    <Management 
      data={organizationData}
      searchTerm={searchTerm}
      selectedDepartment={selectedDepartment}
      expandedNodes={expandedNodes}
      loading={loading}
      error={error}
      onSearch={handleSearch}
      onDepartmentFilter={handleDepartmentFilter}
      onNodeToggle={handleNodeToggle}
    />
  );
};

// 8. Версия с поддержкой темной темы
const ThemeableManagement = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`management-wrapper ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="theme-controls">
        <button onClick={toggleTheme}>
          {isDarkMode ? '☀️ Светлая тема' : '🌙 Темная тема'}
        </button>
      </div>
      <Management darkMode={isDarkMode} />
    </div>
  );
};

// 9. Версия с аналитикой
const AnalyticsManagement = () => {
  const [analytics, setAnalytics] = useState({
    searchQueries: [],
    viewedProfiles: [],
    exportCount: 0,
    sessionTime: 0
  });

  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const sessionTime = Date.now() - startTime;
      // Отправка аналитики
      fetch('/api/analytics/management', {
        method: 'POST',
        body: JSON.stringify({
          ...analytics,
          sessionTime
        })
      });
    };
  }, [analytics]);

  const trackSearch = (query) => {
    setAnalytics(prev => ({
      ...prev,
      searchQueries: [...prev.searchQueries, {
        query,
        timestamp: Date.now()
      }]
    }));
  };

  const trackProfileView = (personId) => {
    setAnalytics(prev => ({
      ...prev,
      viewedProfiles: [...prev.viewedProfiles, {
        personId,
        timestamp: Date.now()
      }]
    }));
  };

  return (
    <Management 
      onSearch={trackSearch}
      onProfileView={trackProfileView}
      onExport={() => setAnalytics(prev => ({
        ...prev, 
        exportCount: prev.exportCount + 1
      }))}
    />
  );
};

export {
  App,
  AppWithRouting,
  CustomManagement,
  ManagementWithAPI,
  EnhancedManagement,
  MobileManagement,
  ManagementWithRedux,
  ThemeableManagement,
  AnalyticsManagement
};
