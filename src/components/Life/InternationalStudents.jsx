import { useState } from 'react';

const InternationalStudents = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Получение визы",
      content: "Список необходимых документов: загранпаспорт, приглашение от вуза, финансовые гарантии, медицинская справка, фотографии, заполненная анкета."
    },
    {
      title: "Проживание",
      content: "Предоставляем комфортабельные общежития с различными вариантами размещения. Стоимость: от 1500 до 3500 руб./мес в зависимости от условий."
    },
    {
      title: "Адаптация",
      content: "Каждому студенту назначается куратор. Регулярно проводятся экскурсии, межкультурные мероприятия и языковые клубы."
    },
    {
      title: "Медицинская страховка",
      content: "Обязательная медицинская страховка на весь период обучения. Стоимость: около 5000 руб./год. Покрывает основные медицинские услуги."
    }
  ];

  const dormImages = [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  ];

  const contacts = {
    email: "international@university.ru",
    phone: "+7 (XXX) XXX-XX-XX",
    address: "ул. Университетская, д. 1, каб. 105",
    hours: "Пн-Пт: 9:00-18:00"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">Для иностранных студентов</h1>
        
        {/* Пошаговый гайд */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Пошаговый гайд</h2>
          
          {/* Навигация по шагам */}
          <div className="flex flex-wrap justify-center mb-8">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`mx-2 my-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeStep === index
                    ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
          
          {/* Контент шага */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">{steps[activeStep].title}</h3>
            <p className="text-gray-700">{steps[activeStep].content}</p>
          </div>
          
          {/* Дополнительный контент для шага "Проживание" */}
          {activeStep === 1 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-blue-700 mb-4">Фотографии общежитий</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {dormImages.map((img, index) => (
                  <div key={index} className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                    <img src={img} alt={`Общежитие ${index + 1}`} className="w-full h-48 object-cover" />
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-blue-100 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Стоимость проживания</h4>
                <ul className="list-disc list-inside text-blue-900">
                  <li>Стандартная комната (2-3 человека): 1500 руб./мес</li>
                  <li>Улучшенная комната (2 человека): 2500 руб./мес</li>
                  <li>Комната повышенной комфортности (1 человек): 3500 руб./мес</li>
                </ul>
              </div>
            </div>
          )}
        </section>
        
        {/* Контакты международного отдела */}
        <section className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Контакты международного отдела</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-3">Контактная информация</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-gray-700">{contacts.email}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <span className="text-gray-700">{contacts.phone}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-gray-700">{contacts.address}</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700">{contacts.hours}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-blue-800 mb-3">Форма обратной связи</h3>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Ваш email" 
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Ваше сообщение" 
                    rows="4"
                    className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InternationalStudents;