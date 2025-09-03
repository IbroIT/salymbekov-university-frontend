import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Моковые данные факультетов и кафедр
  const faculties = [
    {
      id: 1,
      name: 'Медицинский факультет',
      dean: 'Иванов П.С.',
      email: 'dean@med.salymbekov.kg',
      phone: '+996 312 123 456',
      departments: [
        {
          id: 101,
          name: 'Кафедра терапии',
          head: 'Сидорова М.А.',
          headPhoto: '/images/heads/sidorova.jpg',
          headEmail: 'sidorova@med.salymbekov.kg',
          headPhone: '+996 312 123 457',
          teachersCount: 15,
          disciplines: ['Внутренние болезни', 'Пропедевтика', 'Кардиология', 'Пульмонология'],
          scheduleLink: '/schedule/therapy',
          building: 'Главный корпус, 3 этаж',
          room: '301'
        },
        {
          id: 102,
          name: 'Кафедра хирургии',
          head: 'Петров А.В.',
          headPhoto: '/images/heads/petrov.jpg',
          headEmail: 'petrov@med.salymbekov.kg',
          headPhone: '+996 312 123 458',
          teachersCount: 12,
          disciplines: ['Общая хирургия', 'Топографическая анатомия', 'Оперативная хирургия', 'Травматология'],
          scheduleLink: '/schedule/surgery',
          building: 'Хирургический корпус, 2 этаж',
          room: '205'
        },
        {
          id: 103,
          name: 'Кафедра педиатрии',
          head: 'Козлова Е.И.',
          headPhoto: '/images/heads/kozlova.jpg',
          headEmail: 'kozlova@med.salymbekov.kg',
          headPhone: '+996 312 123 459',
          teachersCount: 10,
          disciplines: ['Детские болезни', 'Неонатология', 'Педиатрическая терапия', 'Детская хирургия'],
          scheduleLink: '/schedule/pediatrics',
          building: 'Детский корпус, 1 этаж',
          room: '101'
        }
      ]
    },
    {
      id: 2,
      name: 'Стоматологический факультет',
      dean: 'Смирнов Д.К.',
      email: 'dean@dent.salymbekov.kg',
      phone: '+996 312 123 460',
      departments: [
        {
          id: 201,
          name: 'Кафедра терапевтической стоматологии',
          head: 'Орлова Т.М.',
          headPhoto: '/images/heads/orlova.jpg',
          headEmail: 'orlova@dent.salymbekov.kg',
          headPhone: '+996 312 123 461',
          teachersCount: 8,
          disciplines: ['Кариесология', 'Эндодонтия', 'Пародонтология', 'Эстетическая стоматология'],
          scheduleLink: '/schedule/therapeutic-dentistry',
          building: 'Стоматологический корпус, 2 этаж',
          room: '201'
        },
        {
          id: 202,
          name: 'Кафедра ортопедической стоматологии',
          head: 'Волков С.П.',
          headPhoto: '/images/heads/volkov.jpg',
          headEmail: 'volkov@dent.salymbekov.kg',
          headPhone: '+996 312 123 462',
          teachersCount: 7,
          disciplines: ['Протезирование', 'Ортодонтия', 'Гнатология', 'Имплантология'],
          scheduleLink: '/schedule/orthopedic-dentistry',
          building: 'Стоматологический корпус, 3 этаж',
          room: '301'
        }
      ]
    },
    {
      id: 3,
      name: 'Фармацевтический факультет',
      dean: 'Григорьева Л.Н.',
      email: 'dean@pharm.salymbekov.kg',
      phone: '+996 312 123 463',
      departments: [
        {
          id: 301,
          name: 'Кафедра фармации',
          head: 'Николаев А.Б.',
          headPhoto: '/images/heads/nikolaev.jpg',
          headEmail: 'nikolaev@pharm.salymbekov.kg',
          headPhone: '+996 312 123 464',
          teachersCount: 9,
          disciplines: ['Фармацевтическая технология', 'Фармакогнозия', 'Биофармация', 'Фармацевтическая химия'],
          scheduleLink: '/schedule/pharmacy',
          building: 'Фармацевтический корпус, 1 этаж',
          room: '102'
        },
        {
          id: 302,
          name: 'Кафедра фармакологии',
          head: 'Захарова И.В.',
          headPhoto: '/images/heads/zaharova.jpg',
          headEmail: 'zaharova@pharm.salymbekov.kg',
          headPhone: '+996 312 123 465',
          teachersCount: 6,
          disciplines: ['Общая фармакология', 'Клиническая фармакология', 'Токсикология', 'Фармакотерапия'],
          scheduleLink: '/schedule/pharmacology',
          building: 'Фармацевтический корпус, 2 этаж',
          room: '202'
        }
      ]
    }
  ];

  // Фильтрация данных по поисковому запросу
  const filteredFaculties = faculties.map(faculty => ({
    ...faculty,
    departments: faculty.departments.filter(dept =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(faculty => faculty.departments.length > 0);

  // Переключение раскрытия узла
  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  // Выбор кафедры для отображения деталей
  const handleDepartmentSelect = (department) => {
    setSelectedDepartment(department);
  };

  // Закрытие карточки кафедры
  const handleCloseCard = () => {
    setSelectedDepartment(null);
  };

  // Автоматически раскрывать факультет при выборе кафедры
  useEffect(() => {
    if (selectedDepartment) {
      const facultyId = faculties.find(f => 
        f.departments.some(d => d.id === selectedDepartment.id)
      )?.id;
      if (facultyId) {
        setExpandedNodes(prev => new Set(prev).add(`faculty-${facultyId}`));
      }
    }
  }, [selectedDepartment]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800">Факультеты и кафедры</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Факультеты и кафедры</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Основной контент */}
          <div className="w-full lg:w-2/3">
            {/* Поиск */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Поиск по названию факультета или кафедры..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Древовидная структура */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Структура университета</h2>
              
              {filteredFaculties.length === 0 ? (
                <p className="text-gray-600 text-center py-8">Ничего не найдено</p>
              ) : (
                <div className="space-y-2">
                  {filteredFaculties.map((faculty) => (
                    <div key={faculty.id} className="border rounded-lg">
                      {/* Факультет */}
                      <div 
                        className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleNode(`faculty-${faculty.id}`)}
                      >
                        <span className="font-semibold text-gray-800">{faculty.name}</span>
                        <svg 
                          className={`w-5 h-5 transform transition-transform ${
                            expandedNodes.has(`faculty-${faculty.id}`) ? 'rotate-180' : ''
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Кафедры факультета */}
                      {expandedNodes.has(`faculty-${faculty.id}`) && (
                        <div className="bg-white p-4 space-y-3">
                          {faculty.departments.map((department) => (
                            <div 
                              key={department.id}
                              className="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition-colors"
                              onClick={() => handleDepartmentSelect(department)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-gray-800">{department.name}</span>
                                <span className="text-sm text-gray-500">
                                  {department.teachersCount} преподавателей
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">Зав. кафедрой: {department.head}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Карточка кафедры */}
          <div className="w-full lg:w-1/3">
            {selectedDepartment ? (
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
                <button
                  onClick={handleCloseCard}
                  className="ml-auto block text-gray-400 hover:text-gray-600 mb-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedDepartment.name}</h2>

                {/* Заведующий кафедрой */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-3">Заведующий кафедрой</h3>
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedDepartment.headPhoto}
                      alt={selectedDepartment.head}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-teacher.jpg';
                      }}
                    />
                    <div>
                      <p className="font-medium text-gray-800">{selectedDepartment.head}</p>
                      <p className="text-sm text-gray-600">{selectedDepartment.headEmail}</p>
                      <p className="text-sm text-gray-600">{selectedDepartment.headPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Информация о кафедре */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Количество преподавателей</h4>
                    <p className="text-gray-800">{selectedDepartment.teachersCount} человек</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Основные дисциплины</h4>
                    <ul className="list-disc list-inside text-gray-800 space-y-1">
                      {selectedDepartment.disciplines.map((discipline, index) => (
                        <li key={index}>{discipline}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Расположение</h4>
                    <p className="text-gray-800">{selectedDepartment.building}</p>
                    <p className="text-gray-800">Кабинет: {selectedDepartment.room}</p>
                  </div>

                  {/* Ссылка на расписание */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Расписание</h4>
                    <a
                      href={selectedDepartment.scheduleLink}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Посмотреть расписание
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-6 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2m2 0v-2m0 2v2m-2-2h2m-2-2h2M9 7h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <p className="text-gray-600">Выберите кафедру для просмотра информации</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;