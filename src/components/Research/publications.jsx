import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';

// Моковые данные
const publicationsData = [
  {
    id: 1,
    title: "Новые подходы в лечении сердечно-сосудистых заболеваний",
    authors: ["Алиев А.К.", "Смагулова Г.М.", "Жанузаков Т.Р."],
    journal: "Cardiology Research",
    year: 2024,
    citationIndex: 45,
    doi: "10.1234/cardio.2024.001",
    abstract: "Исследование современных методов лечения...",
    center: "Центр молекулярной медицины"
  },
  {
    id: 2,
    title: "Нейропластичность и когнитивные функции",
    authors: ["Смагулова Г.М.", "Алиев А.К."],
    journal: "Neuroscience Letters",
    year: 2023,
    citationIndex: 32,
    doi: "10.1234/neuro.2023.002",
    abstract: "Изучение механизмов нейропластичности...",
    center: "Центр нейронаук"
  },
  {
    id: 3,
    title: "Биоматериалы нового поколения",
    authors: ["Жанузаков Т.Р.", "Смагулова Г.М."],
    journal: "Biomaterials Science",
    year: 2023,
    citationIndex: 28,
    doi: "10.1234/bio.2023.003",
    abstract: "Разработка инновационных биоматериалов...",
    center: "Центр биомедицинских технологий"
  },
  {
    id: 4,
    title: "Генная терапия наследственных заболеваний",
    authors: ["Алиев А.К.", "Жанузаков Т.Р."],
    journal: "Gene Therapy",
    year: 2022,
    citationIndex: 67,
    doi: "10.1234/gene.2022.004",
    abstract: "Перспективы генной терапии...",
    center: "Центр молекулярной медицины"
  },
  {
    id: 5,
    title: "ИИ в диагностике неврологических расстройств",
    authors: ["Смагулова Г.М."],
    journal: "AI in Medicine",
    year: 2022,
    citationIndex: 41,
    doi: "10.1234/ai.2022.005",
    abstract: "Применение искусственного интеллекта...",
    center: "Центр нейронаук"
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Publications = () => {
  const [filters, setFilters] = useState({
    yearRange: [2018, 2024],
    author: '',
    journal: '',
    minCitations: 0,
    center: ''
  });

  const [sortConfig, setSortConfig] = useState({ key: 'year', direction: 'desc' });
  const [selectedChart, setSelectedChart] = useState('bar');
  const [selectedPublications, setSelectedPublications] = useState(new Set());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedPublication, setExpandedPublication] = useState(null);

  // Уникальные значения для фильтров
  const uniqueValues = useMemo(() => ({
    authors: [...new Set(publicationsData.flatMap(pub => pub.authors))],
    journals: [...new Set(publicationsData.map(pub => pub.journal))],
    centers: [...new Set(publicationsData.map(pub => pub.center))],
    years: [...new Set(publicationsData.map(pub => pub.year))].sort()
  }), []);

  // Статистика для графиков
  const chartData = useMemo(() => {
    const yearData = publicationsData.reduce((acc, pub) => {
      acc[pub.year] = (acc[pub.year] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(yearData).map(([year, count]) => ({
      year: parseInt(year),
      publications: count
    })).sort((a, b) => a.year - b.year);
  }, []);

  const centerData = useMemo(() => {
    const centerCounts = publicationsData.reduce((acc, pub) => {
      acc[pub.center] = (acc[pub.center] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(centerCounts).map(([center, count]) => ({
      center,
      count
    }));
  }, []);

  // Фильтрация и сортировка
  const filteredPublications = useMemo(() => {
    let filtered = publicationsData.filter(pub => 
      pub.year >= filters.yearRange[0] &&
      pub.year <= filters.yearRange[1] &&
      pub.citationIndex >= filters.minCitations &&
      (filters.author === '' || pub.authors.includes(filters.author)) &&
      (filters.journal === '' || pub.journal === filters.journal) &&
      (filters.center === '' || pub.center === filters.center)
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = (format) => {
    const data = filteredPublications.map(pub => ({
      Title: pub.title,
      Authors: pub.authors.join(', '),
      Journal: pub.journal,
      Year: pub.year,
      Citations: pub.citationIndex,
      DOI: pub.doi
    }));

    if (format === 'csv') {
      const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'publications.csv';
      link.click();
    }
  };

  const togglePublicationSelection = (id) => {
    const newSelection = new Set(selectedPublications);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedPublications(newSelection);
  };

  const togglePublicationExpand = (id) => {
    setExpandedPublication(expandedPublication === id ? null : id);
  };

  const renderMobilePublication = (pub) => (
    <div key={pub.id} className="bg-white rounded-lg shadow-sm p-4 mb-3 border">
      <div className="flex justify-between items-start mb-2">
        <input
          type="checkbox"
          checked={selectedPublications.has(pub.id)}
          onChange={() => togglePublicationSelection(pub.id)}
          className="h-4 w-4 text-blue-600 rounded mt-1"
        />
        <button
          onClick={() => togglePublicationExpand(pub.id)}
          className="text-blue-600 text-sm"
        >
          {expandedPublication === pub.id ? 'Свернуть' : 'Подробнее'}
        </button>
      </div>

      <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
        {pub.title}
      </h3>

      <div className="text-xs text-gray-600 mb-2">
        <strong>Авторы:</strong> {pub.authors.join(', ')}
      </div>

      <div className="text-xs text-gray-600 mb-2">
        <strong>Журнал:</strong> {pub.journal}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">{pub.year}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {pub.citationIndex} цитат
        </span>
      </div>

      {expandedPublication === pub.id && (
        <div className="mt-3 pt-3 border-t">
          <div className="text-xs text-gray-600 mb-2">
            <strong>Центр:</strong> {pub.center}
          </div>
          <div className="text-xs text-gray-600 mb-2">
            <strong>DOI:</strong> {pub.doi}
          </div>
          <p className="text-xs text-gray-600 italic">{pub.abstract}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 md:py-8 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">Научные публикации</h1>
          <p className="text-sm md:text-xl text-gray-600">База публикаций исследователей Университета Салымбекова</p>
        </div>

        {/* Кнопка фильтров для мобильных */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="w-full p-3 bg-white rounded-xl shadow-md flex items-center justify-between"
          >
            <span className="font-medium text-gray-700">Фильтры публикаций</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-500 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Фильтры */}
        <div className={`bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
          <h2 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6">Фильтры публикаций</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Год публикации */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Год публикации: {filters.yearRange[0]} - {filters.yearRange[1]}
              </label>
              <input
                type="range"
                min={Math.min(...uniqueValues.years)}
                max={Math.max(...uniqueValues.years)}
                value={filters.yearRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  yearRange: [prev.yearRange[0], parseInt(e.target.value)]
                }))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{Math.min(...uniqueValues.years)}</span>
                <span>{Math.max(...uniqueValues.years)}</span>
              </div>
            </div>

            {/* Автор */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Автор</label>
              <select
                value={filters.author}
                onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все авторы</option>
                {uniqueValues.authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
            </div>

            {/* Журнал */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Журнал</label>
              <select
                value={filters.journal}
                onChange={(e) => setFilters(prev => ({ ...prev, journal: e.target.value }))}
                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все журналы</option>
                {uniqueValues.journals.map(journal => (
                  <option key={journal} value={journal}>{journal}</option>
                ))}
              </select>
            </div>

            {/* Центр */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Научный центр</label>
              <select
                value={filters.center}
                onChange={(e) => setFilters(prev => ({ ...prev, center: e.target.value }))}
                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Все центры</option>
                {uniqueValues.centers.map(center => (
                  <option key={center} value={center}>{center}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Цитатный индекс */}
          <div className="mt-4 md:mt-6">
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Минимальный индекс цитирования: {filters.minCitations}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minCitations}
              onChange={(e) => setFilters(prev => ({ ...prev, minCitations: parseInt(e.target.value) }))}
              className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Кнопка применения фильтров для мобильных */}
          <div className="md:hidden mt-4">
            <button
              onClick={() => setIsFiltersOpen(false)}
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-medium"
            >
              Применить фильтры
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-0">Статистика публикаций</h2>
            <div className="flex space-x-1 md:space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedChart('bar')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm whitespace-nowrap ${
                  selectedChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Столбчатая
              </button>
              <button
                onClick={() => setSelectedChart('line')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm whitespace-nowrap ${
                  selectedChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Линейная
              </button>
              <button
                onClick={() => setSelectedChart('pie')}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm whitespace-nowrap ${
                  selectedChart === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Круговая
              </button>
            </div>
          </div>

          <div className="h-60 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedChart === 'bar' ? (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="publications" fill="#3B82F6" />
                </BarChart>
              ) : selectedChart === 'line' ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="publications" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={centerData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ center, count }) => `${center}: ${count}`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {centerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Таблица публикаций */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-3 md:space-y-0">
            <h2 className="text-lg md:text-2xl font-semibold">
              Публикации ({filteredPublications.length})
            </h2>
            <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2">
              <button
                onClick={() => handleExport('csv')}
                className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs md:text-sm whitespace-nowrap"
              >
                Экспорт CSV
              </button>
              <button
                onClick={() => handleExport('bibtex')}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs md:text-sm whitespace-nowrap"
              >
                Экспорт BibTeX
              </button>
            </div>
          </div>

          {/* Мобильная версия */}
          <div className="md:hidden">
            {filteredPublications.map(renderMobilePublication)}
            
            {filteredPublications.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">
                Публикации не найдены по выбранным фильтрам
              </div>
            )}
          </div>

          {/* Десктопная версия */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Выбор
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('title')}
                  >
                    Название {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('authors')}
                  >
                    Авторы {sortConfig.key === 'authors' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('journal')}
                  >
                    Журнал {sortConfig.key === 'journal' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('year')}
                  >
                    Год {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('citationIndex')}
                  >
                    Цитаты {sortConfig.key === 'citationIndex' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPublications.map((pub) => (
                  <tr key={pub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPublications.has(pub.id)}
                        onChange={() => togglePublicationSelection(pub.id)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{pub.title}</div>
                      <div className="text-sm text-gray-500">{pub.center}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">
                        {pub.authors.map((author, index) => (
                          <div key={index}>{author}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">{pub.journal}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{pub.year}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {pub.citationIndex}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPublications.length === 0 && (
            <div className="hidden md:block text-center py-12 text-gray-500">
              Публикации не найдены по выбранным фильтрам
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Publications;