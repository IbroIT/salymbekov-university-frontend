import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const Documents = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const documentCategories = [
    { value: 'all', label: 'Все документы' },
    { value: 'charter', label: 'Учредительные документы' },
    { value: 'license', label: 'Лицензия и аккредитация' },
    { value: 'reports', label: 'Отчеты о деятельности' },
    { value: 'regulations', label: 'Нормативные акты' }
  ];

  const documents = [
    {
      id: 1,
      name: 'Устав университета',
      description: 'Основной учредительный документ университета имени Салымбекова',
      category: 'charter',
      type: 'pdf',
      size: '2.5 MB',
      date: '2023-01-15',
      downloadCount: 342,
      version: '3.1',
      language: 'ru',
      pages: 45,
      validUntil: '2028-01-15'
    },
    {
      id: 2,
      name: 'Лицензия на образовательную деятельность',
      description: 'Государственная лицензия на ведение образовательной деятельности',
      category: 'license',
      type: 'pdf',
      size: '1.8 MB',
      date: '2023-08-20',
      downloadCount: 598,
      version: '2.0',
      language: 'ru',
      pages: 12,
      validUntil: '2028-08-20'
    },
    {
      id: 3,
      name: 'Свидетельство о государственной аккредитации',
      description: 'Документ о государственной аккредитации образовательных программ',
      category: 'license',
      type: 'pdf',
      size: '1.2 MB',
      date: '2023-06-10',
      downloadCount: 445,
      version: '1.2',
      language: 'ru',
      pages: 8,
      validUntil: '2029-06-10'
    },
    {
      id: 4,
      name: 'Отчет о самообследовании 2023',
      description: 'Годовой отчет о деятельности университета за 2023 год',
      category: 'reports',
      type: 'pdf',
      size: '4.2 MB',
      date: '2024-03-01',
      downloadCount: 234,
      version: '1.0',
      language: 'ru',
      pages: 128
    },
    {
      id: 5,
      name: 'Правила внутреннего распорядка',
      description: 'Внутренние правила и регламенты университета',
      category: 'regulations',
      type: 'pdf',
      size: '890 KB',
      date: '2023-09-05',
      downloadCount: 156,
      version: '2.3',
      language: 'ru',
      pages: 24
    },
    {
      id: 6,
      name: 'Положение о студенческом совете',
      description: 'Регламент работы студенческого самоуправления',
      category: 'regulations',
      type: 'doc',
      size: '520 KB',
      date: '2023-11-12',
      downloadCount: 89,
      version: '1.5',
      language: 'ru',
      pages: 16
    },
    {
      id: 7,
      name: 'Финансовый отчет 2023',
      description: 'Отчет о финансово-хозяйственной деятельности университета',
      category: 'reports',
      type: 'xlsx',
      size: '1.1 MB',
      date: '2024-02-15',
      downloadCount: 67,
      version: '1.0',
      language: 'ru',
      sheets: 15
    },
    {
      id: 8,
      name: 'Charter of the University',
      description: 'Main founding document of Salymbekov University (English version)',
      category: 'charter',
      type: 'pdf',
      size: '2.7 MB',
      date: '2023-01-15',
      downloadCount: 78,
      version: '3.1',
      language: 'en',
      pages: 48,
      validUntil: '2028-01-15'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'doc': return '📝';
      case 'docx': return '📝';
      case 'xlsx': return '📊';
      case 'xls': return '📊';
      default: return '📄';
    }
  };

  const getCategoryBadge = (category) => {
    const categoryConfig = {
      charter: { color: 'bg-purple-100 text-purple-800', label: 'Устав' },
      license: { color: 'bg-green-100 text-green-800', label: 'Лицензия' },
      reports: { color: 'bg-blue-100 text-blue-800', label: 'Отчеты' },
      regulations: { color: 'bg-orange-100 text-orange-800', label: 'Регламенты' }
    };

    const config = categoryConfig[category] || { color: 'bg-gray-100 text-gray-800', label: 'Документ' };
    
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredDocuments = documents.filter(doc => 
    selectedCategory === 'all' || doc.category === selectedCategory
  );

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'date':
        aValue = new Date(a.date);
        bValue = new Date(b.date);
        break;
      case 'downloads':
        aValue = a.downloadCount;
        bValue = b.downloadCount;
        break;
      case 'size':
        aValue = parseFloat(a.size);
        bValue = parseFloat(b.size);
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDownload = (document) => {
    // Здесь будет логика скачивания
    console.log(`Downloading ${document.name}`);
    // Увеличиваем счетчик скачиваний
    document.downloadCount += 1;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <div className="bg-blue-50 rounded-lg p-3 mb-6">
        <nav className="flex items-center text-sm text-gray-600">
          <a href="/" className="hover:text-blue-600">Главная</a>
          <span className="mx-2">→</span>
          <a href="/about" className="hover:text-blue-600">О нас</a>
          <span className="mx-2">→</span>
          <span className="text-blue-600">Устав и документы</span>
        </nav>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Документы университета
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Официальные документы, отчеты и нормативные акты университета имени Салымбекова
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {documentCategories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">Сортировка:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="date">По дате</option>
              <option value="name">По названию</option>
              <option value="downloads">По популярности</option>
              <option value="size">По размеру</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
              title={sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortBy('name')}>
                Название {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Тип
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortBy('date')}>
                Дата {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => setSortBy('size')}>
                Размер {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Скачать
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{getFileIcon(doc.type)}</div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 uppercase">{doc.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(doc.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {doc.size}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    onClick={() => handleDownload(doc)}
                    className="text-blue-600 hover:text-blue-800 text-xl"
                    title="Скачать документ"
                  >
                    📥
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {sortedDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Документы не найдены
          </h3>
          <p className="text-gray-500">
            В выбранной категории нет документов
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {documents.length}
            </div>
            <div className="text-sm text-gray-600">Всего документов</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Общее количество скачиваний</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {documents.filter(doc => doc.validUntil && new Date(doc.validUntil) > new Date()).length}
            </div>
            <div className="text-sm text-gray-600">Действующих лицензий</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {new Set(documents.map(doc => doc.language)).size}
            </div>
            <div className="text-sm text-gray-600">Языков</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
