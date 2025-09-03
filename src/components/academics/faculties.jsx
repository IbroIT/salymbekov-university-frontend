import { useState } from 'react';
import { Link } from 'react-router-dom';

const Faculties = () => {
  const [activeAccordion, setActiveAccordion] = useState('description');

  // Моковые данные программы
  const program = {
    id: 1,
    title: {
      ru: 'Лечебное дело',
      kg: 'Дарылоо иши',
      en: 'General Medicine'
    },
    faculty: 'Медицинский факультет',
    educationLevel: 'Бакалавриат',
    duration: '6 лет',
    languages: ['Русский', 'Английский'],
    studyForm: 'Очная',
    price: '85,000 сом/семестр',
    image: '/images/medicine-hero.jpg',
    brochure: '/brochures/medicine.pdf',
    
    description: `Программа "Лечебное дело" готовит высококвалифицированных врачей общей практики. 
    Студенты получают фундаментальные знания в области медицины, клинические навыки и практический опыт. 
    Программа аккредитована международными медицинскими организациями и соответствует мировым стандартам.`,
    
    curriculum: [
      { semester: 1, credits: 30, subjects: ['Анатомия', 'Биология', 'Химия', 'Латинский язык'] },
      { semester: 2, credits: 32, subjects: ['Гистология', 'Биохимия', 'Физика', 'Философия'] },
      { semester: 3, credits: 34, subjects: ['Физиология', 'Микробиология', 'Патологическая анатомия'] },
      { semester: 4, credits: 36, subjects: ['Фармакология', 'Пропедевтика', 'Иммунология'] },
      { semester: 5, credits: 38, subjects: ['Внутренние болезни', 'Хирургия', 'Педиатрия'] },
      { semester: 6, credits: 40, subjects: ['Акушерство', 'Гинекология', 'Неврология'] }
    ],
    
    teachers: [
      {
        id: 1,
        name: 'Иванов Петр Сергеевич',
        position: 'Профессор, д.м.н.',
        specialty: 'Хирургия',
        image: '/images/teachers/ivanov.jpg',
        experience: '25 лет'
      },
      {
        id: 2,
        name: 'Сидорова Мария Алексеевна',
        position: 'Доцент, к.м.н.',
        specialty: 'Терапия',
        image: '/images/teachers/sidorova.jpg',
        experience: '15 лет'
      },
      {
        id: 3,
        name: 'Козлов Айбек Темирович',
        position: 'Профессор, д.м.н.',
        specialty: 'Кардиология',
        image: '/images/teachers/kozlova.jpg',
        experience: '20 лет'
      }
    ],
    
    careers: [
      { icon: '🏥', title: 'Врач-терапевт', description: 'Работа в поликлиниках и больницах' },
      { icon: '🚑', title: 'Скорая помощь', description: 'Экстренная медицинская помощь' },
      { icon: '🔬', title: 'Исследователь', description: 'Научная работа в медицинских институтах' },
      { icon: '👨‍⚕️', title: 'Хирург', description: 'Операционная деятельность' },
      { icon: '🌡️', title: 'Семейный врач', description: 'Первичная медицинская помощь' },
      { icon: '📊', title: 'Медменеджер', description: 'Управление медицинскими учреждениями' }
    ]
  };

  const handleApply = () => {
    // Логика подачи заявки
    console.log('Подача заявки на программу');
  };

  const handleDownloadBrochure = () => {
    // Логика скачивания брошюры
    const link = document.createElement('a');
    link.href = program.brochure;
    link.download = 'Брошюра_Лечебное_дело.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800">{program.title.ru}</span>
        </nav>

        {/* Герой-блок */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          <img 
            src={program.image} 
            alt="Студенты медицинского факультета"
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = '/images/placeholder-hero.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="text-white p-8 max-w-4xl">
              <h1 className="text-4xl font-bold mb-4">{program.title.ru}</h1>
              <p className="text-xl mb-2">{program.title.kg}</p>
              <p className="text-xl mb-8">{program.title.en}</p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleApply}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Подать заявку
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Скачать брошюру
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Основная информация в таблице */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Основная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Уровень</span>
              <span className="text-gray-600">{program.educationLevel}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Длительность</span>
              <span className="text-gray-600">{program.duration}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Язык обучения</span>
              <span className="text-gray-600">{program.languages.join(', ')}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Стоимость</span>
              <span className="text-gray-600">{program.price}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Форма обучения</span>
              <span className="text-gray-600">{program.studyForm}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="font-semibold text-gray-700">Факультет</span>
              <span className="text-gray-600">{program.faculty}</span>
            </div>
          </div>
        </div>

        {/* Навигация по блокам */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'description', label: 'Описание программы' },
            { id: 'curriculum', label: 'Учебный план' },
            { id: 'teachers', label: 'Преподаватели' },
            { id: 'careers', label: 'Карьерные перспективы' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveAccordion(item.id)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                activeAccordion === item.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Блоки контента */}
        <div className="space-y-8">
          {/* Описание программы */}
          {activeAccordion === 'description' && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Описание программы</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {program.description}
              </p>
            </div>
          )}

          {/* Учебный план */}
          {activeAccordion === 'curriculum' && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Учебный план</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 font-semibold text-gray-700">Семестр</th>
                      <th className="px-6 py-3 font-semibold text-gray-700">Кредиты</th>
                      <th className="px-6 py-3 font-semibold text-gray-700">Дисциплины</th>
                    </tr>
                  </thead>
                  <tbody>
                    {program.curriculum.map((semester, index) => (
                      <tr key={semester.semester} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-gray-700">{semester.semester}</td>
                        <td className="px-6 py-4 text-gray-600">{semester.credits}</td>
                        <td className="px-6 py-4 text-gray-600">
                          <ul className="list-disc list-inside">
                            {semester.subjects.map((subject, idx) => (
                              <li key={idx}>{subject}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Преподаватели */}
          {activeAccordion === 'teachers' && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Преподаватели</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.teachers.map((teacher) => (
                  <div key={teacher.id} className="text-center">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-teacher.jpg';
                      }}
                    />
                    <h4 className="font-semibold text-gray-800 mb-2">{teacher.name}</h4>
                    <p className="text-blue-600 mb-2">{teacher.position}</p>
                    <p className="text-gray-600 mb-2">{teacher.specialty}</p>
                    <p className="text-sm text-gray-500">Стаж: {teacher.experience}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Карьерные перспективы */}
          {activeAccordion === 'careers' && (
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Карьерные перспективы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {program.careers.map((career, index) => (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="text-4xl mb-4">{career.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-2">{career.title}</h4>
                    <p className="text-gray-600">{career.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faculties;