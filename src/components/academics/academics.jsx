import { useState, useEffect } from 'react';

const Academics = () => {
  // Состояния для фильтров
  const [filters, setFilters] = useState({
    educationLevels: [],
    faculty: '',
    studyForm: '',
    language: ''
  });

  // Состояния для программ и пагинации
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const programsPerPage = 6;

  // Моковые данные (замените на реальные данные с API)
  const mockPrograms = [
    {
      id: 1,
      title: 'Лечебное дело',
      faculty: 'Медицинский факультет',
      educationLevel: 'Бакалавриат',
      studyForm: 'Очная',
      language: 'Русский',
      duration: '6 лет',
      popularity: 95,
      image: '/images/medicine.jpg'
    },
    {
      id: 2,
      title: 'Стоматология',
      faculty: 'Стоматологический факультет',
      educationLevel: 'Специалитет',
      studyForm: 'Очная',
      language: 'Кыргызский',
      duration: '5 лет',
      popularity: 88,
      image: '/images/dentistry.jpg'
    },
    {
      id: 3,
      title: 'Фармация',
      faculty: 'Фармацевтический факультет',
      educationLevel: 'Бакалавриат',
      studyForm: 'Заочная',
      language: 'Русский',
      duration: '5 лет',
      popularity: 76,
      image: '/images/pharmacy.jpg'
    },
    {
      id: 4,
      title: 'Медицинская биохимия',
      faculty: 'Биологический факультет',
      educationLevel: 'Магистратура',
      studyForm: 'Очная',
      language: 'Английский',
      duration: '2 года',
      popularity: 65,
      image: '/images/biochemistry.jpg'
    },
    {
      id: 5,
      title: 'Сестринское дело',
      faculty: 'Медицинский факультет',
      educationLevel: 'Бакалавриат',
      studyForm: 'Заочная',
      language: 'Кыргызский',
      duration: '4 года',
      popularity: 82,
      image: '/images/nursing.jpg'
    },
    {
      id: 6,
      title: 'Общественное здоровье',
      faculty: 'Факультет общественного здоровья',
      educationLevel: 'Магистратура',
      studyForm: 'Очная',
      language: 'Русский',
      duration: '2 года',
      popularity: 59,
      image: '/images/public-health.jpg'
    },
    {
      id: 7,
      title: 'Медицинская кибернетика',
      faculty: 'Факультет информационных технологий',
      educationLevel: 'Бакалавриат',
      studyForm: 'Очная',
      language: 'Русский',
      duration: '4 года',
      popularity: 71,
      image: '/images/cybernetics.jpg'
    },
    {
      id: 8,
      title: 'Клиническая психология',
      faculty: 'Психологический факультет',
      educationLevel: 'Специалитет',
      studyForm: 'Очная',
      language: 'Русский',
      duration: '5 лет',
      popularity: 68,
      image: '/images/psychology.jpg'
    }
  ];

  const faculties = [
    'Медицинский факультет',
    'Стоматологический факультет',
    'Фармацевтический факультет',
    'Биологический факультет',
    'Факультет общественного здоровья',
    'Факультет информационных технологий',
    'Психологический факультет'
  ];

  const educationLevels = [
    'Бакалавриат',
    'Специалитет',
    'Магистратура',
    'Аспирантура'
  ];

  // Загрузка данных (в реальном приложении замените на API вызов)
  useEffect(() => {
    setPrograms(mockPrograms);
    setFilteredPrograms(mockPrograms);
  }, []);

  // Фильтрация и сортировка программ
  useEffect(() => {
    let result = [...programs];

    // Фильтрация по уровню образования
    if (filters.educationLevels.length > 0) {
      result = result.filter(program => 
        filters.educationLevels.includes(program.educationLevel)
      );
    }

    // Фильтрация по факультету
    if (filters.faculty) {
      result = result.filter(program => program.faculty === filters.faculty);
    }

    // Фильтрация по форме обучения
    if (filters.studyForm) {
      result = result.filter(program => program.studyForm === filters.studyForm);
    }

    // Фильтрация по языку обучения
    if (filters.language) {
      result = result.filter(program => program.language === filters.language);
    }

    // Сортировка
    if (sortBy === 'popularity') {
      result.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredPrograms(result);
    setCurrentPage(1);
  }, [filters, sortBy, programs]);

  // Пагинация
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram);
  const totalPages = Math.ceil(filteredPrograms.length / programsPerPage);

  const handleEducationLevelChange = (level) => {
    setFilters(prev => ({
      ...prev,
      educationLevels: prev.educationLevels.includes(level)
        ? prev.educationLevels.filter(l => l !== level)
        : [...prev.educationLevels, level]
    }));
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      educationLevels: [],
      faculty: '',
      studyForm: '',
      language: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Академические программы</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Сайдбар с фильтрами */}
          <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">Фильтры</h2>
              <button
                onClick={resetFilters}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Сбросить
              </button>
            </div>

            {/* Уровень образования */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Уровень образования</h3>
              {educationLevels.map(level => (
                <label key={level} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={filters.educationLevels.includes(level)}
                    onChange={() => handleEducationLevelChange(level)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-gray-700">{level}</span>
                </label>
              ))}
            </div>

            {/* Факультет */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Факультет</h3>
              <select
                value={filters.faculty}
                onChange={(e) => handleFilterChange('faculty', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все факультеты</option>
                {faculties.map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>

            {/* Форма обучения */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Форма обучения</h3>
              <select
                value={filters.studyForm}
                onChange={(e) => handleFilterChange('studyForm', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все формы</option>
                <option value="Очная">Очная</option>
                <option value="Заочная">Заочная</option>
              </select>
            </div>

            {/* Язык обучения */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Язык обучения</h3>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все языки</option>
                <option value="Русский">Русский</option>
                <option value="Кыргызский">Кыргызский</option>
                <option value="Английский">Английский</option>
              </select>
            </div>
          </aside>

          {/* Основной контент */}
          <main className="w-full lg:w-3/4">
            {/* Сортировка и информация */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Найдено программ: {filteredPrograms.length}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">По популярности</option>
                <option value="title">По названию</option>
              </select>
            </div>

            {/* Сетка программ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentPrograms.map(program => (
                <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={program.image} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{program.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{program.faculty}</p>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>{program.educationLevel}</span>
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{program.studyForm}</span>
                      <span className="text-sm text-blue-600">{program.language}</span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${program.popularity}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Популярность: {program.popularity}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <nav className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Назад
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 rounded border ${
                        currentPage === index + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                  >
                    Вперед
                  </button>
                </nav>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Academics;