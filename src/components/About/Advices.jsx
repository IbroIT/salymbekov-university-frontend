import React, { useState, useEffect } from 'react';

const Advices = () => {
  const [activeSection, setActiveSection] = useState('ученый-совет');
  const [isVisible, setIsVisible] = useState(false);

  // Моковые данные для всех разделов
  const sectionsData = {
    'ученый-совет': {
      title: 'Ученый совет',
      description: 'Высший коллегиальный орган управления университетом, осуществляющий общее руководство образовательной, научной и воспитательной деятельностью.',
      members: [
        {
          id: 1,
          name: "Иванов Иван Иванович",
          position: "Ректор университета",
          department: "Администрация",
          bio: "Доктор технических наук, профессор. Автор более 100 научных работ."
        },
        {
          id: 2,
          name: "Петрова Анна Сергеевна",
          position: "Проректор по учебной работе",
          department: "Учебный отдел",
          bio: "Кандидат педагогических наук, доцент. Стаж работы - 15 лет."
        },
        {
          id: 3,
          name: "Сидоров Алексей Владимирович",
          position: "Декан факультета информационных технологий",
          department: "Факультет ИТ",
          bio: "Доктор технических наук, профессор. Член-корреспондент Академии наук."
        },
        {
          id: 4,
          name: "Кузнецова Елена Михайловна",
          position: "Заведующая кафедрой экономики",
          department: "Экономический факультет",
          bio: "Кандидат экономических наук, доцент. Автор учебников по экономике."
        }
      ]
    },
    'ректорский-совет': {
      title: 'Ректорский совет',
      description: 'Совещательный орган при ректоре университета, координирующий текущую деятельность и оперативное управление.',
      members: [
        {
          id: 1,
          name: "Иванов Иван Иванович",
          position: "Ректор университета",
          department: "Администрация",
          bio: "Доктор технических наук, профессор. Автор более 100 научных работ."
        },
        {
          id: 2,
          name: "Смирнов Петр Васильевич",
          position: "Первый проректор",
          department: "Администрация",
          bio: "Кандидат экономических наук, доцент. Стаж работы - 20 лет."
        },
        {
          id: 3,
          name: "Федорова Мария Петровна",
          position: "Проректор по научной работе",
          department: "Научный отдел",
          bio: "Доктор физико-математических наук, профессор."
        }
      ]
    },
    'попечительский-совет': {
      title: 'Попечительский совет',
      description: 'Орган, осуществляющий надзор за деятельностью университета, содействующий его развитию и привлечению внебюджетных средств.',
      members: [
        {
          id: 1,
          name: "Ковалев Андрей Николаевич",
          position: "Председатель попечительского совета",
          department: "Внешние организации",
          bio: "Генеральный директор промышленного холдинга. Выпускник университета 1995 года."
        },
        {
          id: 2,
          name: "Семенова Ольга Викторовна",
          position: "Заместитель председателя",
          department: "Бизнес-сообщество",
          bio: "Президент региональной торгово-промышленной палаты."
        }
      ]
    },
    'профсоюзный-комитет': {
      title: 'Профсоюзный комитет',
      description: 'Орган, представляющий интересы сотрудников университета, защищающий их трудовые права и социальные гарантии.',
      members: [
        {
          id: 1,
          name: "Николаева Светлана Ивановна",
          position: "Председатель профкома",
          department: "Профсоюзная организация",
          bio: "Работает в университете с 2001 года. Активный защитник прав сотрудников."
        },
        {
          id: 2,
          name: "Волков Алексей Сергеевич",
          position: "Заместитель председателя",
          department: "Профсоюзная организация",
          bio: "Кандидат юридических наук. Специалист по трудовому праву."
        }
      ]
    },
    'учебно-методический-совет': {
      title: 'Учебно-методический совет',
      description: 'Координационный орган, обеспечивающий качество образовательного процесса и методическое сопровождение учебных программ.',
      members: [
        {
          id: 1,
          name: "Федорова Мария Петровна",
          position: "Председатель УМС",
          department: "Учебно-методическое управление",
          bio: "Доктор педагогических наук, профессор. Автор методических пособий."
        },
        {
          id: 2,
          name: "Громова Ирина Владимировна",
          position: "Заместитель председателя",
          department: "Учебный отдел",
          bio: "Кандидат педагогических наук, доцент."
        }
      ]
    },
    'наградная-комиссия': {
      title: 'Наградная комиссия',
      description: 'Орган, рассматривающий вопросы поощрения сотрудников и студентов за достижения в научной, учебной и общественной деятельности.',
      members: [
        {
          id: 1,
          name: "Григорьева Ольга Викторовна",
          position: "Председатель наградной комиссии",
          department: "Отдел кадров",
          bio: "Кандидат исторических наук. Работает в университете более 25 лет."
        }
      ]
    },
    'комиссия-по-этике': {
      title: 'Комиссия по этике',
      description: 'Орган, обеспечивающий соблюдение этических норм и правил поведения в университетском сообществе.',
      members: [
        {
          id: 1,
          name: "Дмитриев Сергей Алексеевич",
          position: "Председатель комиссии по этике",
          department: "Юридический отдел",
          bio: "Доктор юридических наук, профессор. Специалист по корпоративной этике."
        }
      ]
    },
    'комиссия-по-льготам': {
      title: 'Комиссия по льготам',
      description: 'Орган, рассматривающий вопросы предоставления льгот и социальной поддержки сотрудникам и студентам университета.',
      members: [
        {
          id: 1,
          name: "Тихонова Елена Васильевна",
          position: "Председатель комиссии по льготам",
          department: "Социальный отдел",
          bio: "Кандидат социологических наук. Работает в социальной сфере 15 лет."
        }
      ]
    },
    'финансовый-комитет': {
      title: 'Финансовый комитет',
      description: 'Орган, осуществляющий контроль за финансово-хозяйственной деятельностью университета и распределением бюджетных средств.',
      members: [
        {
          id: 1,
          name: "Козлов Алексей Дмитриевич",
          position: "Председатель финансового комитета",
          department: "Финансово-экономическое управление",
          bio: "Кандидат экономических наук. Финансовый директор университета."
        }
      ]
    },
    'антикоррупционная-комиссия': {
      title: 'Антикоррупционная комиссия',
      description: 'Орган, осуществляющий профилактику коррупционных правонарушений и контроль за соблюдением антикоррупционного законодательства.',
      members: [
        {
          id: 1,
          name: "Орлов Владимир Сергеевич",
          position: "Председатель антикоррупционной комиссии",
          department: "Юридический отдел",
          bio: "Доктор юридических наук. Специалист по антикоррупционному праву."
        }
      ]
    },
    'документы-на-конкурсные-выборы': {
      title: 'Документы на конкурсные выборы',
      description: 'Нормативные документы и материалы, регламентирующие проведение конкурсных выборов на замещение должностей в университете.',
      documents: [
        { id: 1, title: "Положение о конкурсных выборах", date: "05.04.2023", size: "2.5 МБ" },
        { id: 2, title: "Требования к кандидатам", date: "10.04.2023", size: "1.2 МБ" },
        { id: 3, title: "График проведения выборов", date: "15.04.2023", size: "0.8 МБ" },
        { id: 4, title: "Формы заявлений", date: "20.04.2023", size: "1.1 МБ" }
      ]
    }
  };

  // Список разделов для навигации
  const sectionsList = [
    { id: 'ученый-совет', name: 'Ученый совет' },
    { id: 'ректорский-совет', name: 'Ректорский совет' },
    { id: 'попечительский-совет', name: 'Попечительский совет' },
    { id: 'профсоюзный-комитет', name: 'Профсоюзный комитет' },
    { id: 'учебно-методический-совет', name: 'Учебно-методический совет' },
    { id: 'наградная-комиссия', name: 'Наградная комиссия' },
    { id: 'комиссия-по-этике', name: 'Комиссия по этике' },
    { id: 'комиссия-по-льготам', name: 'Комиссия по льготам' },
    { id: 'финансовый-комитет', name: 'Финансовый комитет' },
    { id: 'антикоррупционная-комиссия', name: 'Антикоррупционная комиссия' },
    { id: 'документы-на-конкурсные-выборы', name: 'Документы на конкурсные выборы' }
  ];

  // Анимация появления при загрузке
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Получение данных активного раздела
  const currentSectionData = sectionsData[activeSection];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Общественные органы управления</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Коллегиальные органы управления университетом, обеспечивающие развитие образовательной, научной и воспитательной деятельности.
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
                  {sectionsList.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id 
                            ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
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
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{currentSectionData.title}</h2>
                <p className="text-gray-600 mt-2">{currentSectionData.description}</p>
              </div>

              {/* Контент раздела - члены */}
              {currentSectionData.members && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Состав</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionData.members.map((member, index) => (
                      <div 
                        key={member.id} 
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                              <p className="text-blue-600 text-sm">{member.position}</p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {member.department}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{member.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Контент раздела - документы */}
              {currentSectionData.documents && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">Документы</h3>
                  
                  <div className="space-y-4">
                    {currentSectionData.documents.map((doc, index) => (
                      <div 
                        key={doc.id} 
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="mb-2 md:mb-0">
                          <h4 className="font-medium text-gray-900">{doc.title}</h4>
                          <p className="text-sm text-gray-600">Дата публикации: {doc.date}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">{doc.size}</span>
                          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Скачать
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Сообщение, если в разделе нет контента */}
              {!currentSectionData.members && !currentSectionData.documents && (
                <div className="text-center py-10">
                  <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Информация готовится</h3>
                  <p className="mt-2 text-gray-500">Содержание этого раздела находится в процессе наполнения.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advices;