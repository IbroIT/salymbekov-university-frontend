import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import VacancyCard from './VacancyCard';
import { vacanciesData } from './vacanciesData';
import './About.css';

const CareersMain = () => {
  const { t } = useTranslation();
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'Все вакансии' },
    { value: 'academic', label: 'Преподавательские' },
    { value: 'administrative', label: 'Административные' },
    { value: 'technical', label: 'Технические' },
    { value: 'service', label: 'Обслуживающие' }
  ];

  const filteredVacancies = vacanciesData.filter(vacancy => 
    filterCategory === 'all' || vacancy.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-blue-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Главная</Link>
            <span className="mx-2">→</span>
            <Link to="/about" className="hover:text-blue-600">О нас</Link>
            <span className="mx-2">→</span>
            <span className="text-blue-600">Вакансии</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Карьера в университете
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Присоединяйтесь к команде профессионалов Салымбековского университета. 
            Найдите свое место в образовательной среде, где ценятся знания, 
            инновации и стремление к развитию.
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-gray-700 font-medium">Фильтр по категориям:</span>
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setFilterCategory(category.value)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  filterCategory === category.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
            <div className="ml-auto text-sm text-gray-600">
              Найдено вакансий: <span className="font-semibold">{filteredVacancies.length}</span>
            </div>
          </div>
        </div>

        {/* Vacancies Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
        </div>

        {/* No Results */}
        {filteredVacancies.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center mb-12">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Вакансии не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить фильтры или вернитесь позже</p>
          </div>
        )}

        {/* Why Join Us Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            Почему стоит работать с нами?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Развитие</h3>
              <p className="text-gray-600">Возможности профессионального роста, обучения и участия в международных программах</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Команда</h3>
              <p className="text-gray-600">Дружный коллектив единомышленников и поддерживающая рабочая среда</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Стабильность</h3>
              <p className="text-gray-600">Конкурентная зарплата, своевременные выплаты и полный социальный пакет</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">Престиж</h3>
              <p className="text-gray-600">Работа в одном из ведущих университетов Кыргызстана с международным признанием</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-blue-900 text-white rounded-lg p-8 mt-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Не нашли подходящую вакансию?</h2>
            <p className="text-blue-200 mb-6">
              Отправьте нам свое резюме, и мы свяжемся с вами, когда появится подходящая позиция
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hr@salymbekov.kg" className="hover:text-blue-200">
                  hr@salymbekov.kg
                </a>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+996312123456" className="hover:text-blue-200">
                  +996 (312) 12-34-56
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersMain;
