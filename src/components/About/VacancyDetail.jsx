import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApplicationForm from './ApplicationForm';
import { vacanciesData } from './vacanciesData';
import './About.css';

const VacancyDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const vacancy = vacanciesData.find(v => v.id === parseInt(id));

  if (!vacancy) {
    return <Navigate to="/about/vacancies" replace />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const isDeadlineSoon = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'academic': return '🏫';
      case 'administrative': return '💼';
      case 'technical': return '🖥️';
      case 'service': return '📚';
      default: return '💼';
    }
  };

  const getCategoryLabel = (category) => {
    const categories = {
      'academic': 'Преподавательская должность',
      'administrative': 'Административная должность',
      'technical': 'Техническая должность',
      'service': 'Обслуживающая должность'
    };
    return categories[category] || 'Общая должность';
  };

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
            <Link to="/about/vacancies" className="hover:text-blue-600">Вакансии</Link>
            <span className="mx-2">→</span>
            <span className="text-blue-600">{vacancy.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <span className="text-5xl mr-4">{getCategoryIcon(vacancy.category)}</span>
                <div>
                  <h1 className="text-3xl font-bold text-blue-900 mb-2">
                    {vacancy.title}
                  </h1>
                  <p className="text-xl text-blue-600 font-medium mb-2">{vacancy.department}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {getCategoryLabel(vacancy.category)}
                  </span>
                </div>
              </div>
              {isDeadlineSoon(vacancy.deadline) && (
                <div className="text-right">
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
                    ⚠️ Срочная вакансия
                  </span>
                  <p className="text-red-600 text-sm mt-2">
                    До окончания: {Math.ceil((new Date(vacancy.deadline) - new Date()) / (1000 * 60 * 60 * 24))} дн.
                  </p>
                </div>
              )}
            </div>

            {/* Key Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Зарплата</p>
                  <p className="font-semibold text-gray-900">{vacancy.salary}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600">📍</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Местоположение</p>
                  <p className="font-semibold text-gray-900">{vacancy.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600">⏰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Тип занятости</p>
                  <p className="font-semibold text-gray-900">{vacancy.type}</p>
                </div>
              </div>

              {vacancy.experience && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-orange-600">💼</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Опыт работы</p>
                    <p className="font-semibold text-gray-900">{vacancy.experience}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600">📅</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Дедлайн</p>
                  <p className="font-semibold text-gray-900">{formatDate(vacancy.deadline)}</p>
                </div>
              </div>

              {vacancy.education && (
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600">🎓</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Образование</p>
                    <p className="font-semibold text-gray-900">{vacancy.education}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={() => setShowApplicationForm(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg"
              >
                📧 Откликнуться на вакансию
              </button>
              <p className="text-sm text-gray-600 mt-2">
                Отправьте свое резюме и сопроводительное письмо
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📋 Описание вакансии
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {vacancy.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  ✅ Обязанности
                </h2>
                <ul className="space-y-4">
                  {vacancy.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  📚 Требования к кандидату
                </h2>
                <ul className="space-y-4">
                  {vacancy.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-4 mt-1 text-lg flex-shrink-0">✓</span>
                      <span className="text-gray-700 leading-relaxed">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Conditions */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  🎁 Условия работы
                </h3>
                <ul className="space-y-3">
                  {vacancy.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">★</span>
                      <span className="text-gray-700 text-sm leading-relaxed">{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              {vacancy.tags && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    🏷️ Ключевые навыки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {vacancy.tags.slice(1).map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-2 rounded-full text-sm bg-gray-100 text-gray-800 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  📞 Контактная информация
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <span className="text-blue-600 mr-2">📧</span>
                    <a href="mailto:hr@salymbekov.kg" className="text-blue-600 hover:underline">
                      hr@salymbekov.kg
                    </a>
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="text-blue-600 mr-2">📱</span>
                    <a href="tel:+996312123456" className="text-blue-600 hover:underline">
                      +996 (312) 12-34-56
                    </a>
                  </div>
                  <div className="flex items-start text-sm">
                    <span className="text-blue-600 mr-2 mt-0.5">📍</span>
                    <span className="text-gray-700">
                      г. Бишкек, ул. Ибраимова 103
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  📊 Информация о вакансии
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Опубликована:</span>
                    <span className="font-medium">{formatDate(vacancy.postedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Дедлайн:</span>
                    <span className={`font-medium ${isDeadlineSoon(vacancy.deadline) ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatDate(vacancy.deadline)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID вакансии:</span>
                    <span className="font-medium">#{vacancy.id.toString().padStart(4, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Apply Button (Sidebar) */}
              <button
                onClick={() => setShowApplicationForm(true)}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Откликнуться
              </button>
            </div>
          </div>

          {/* Similar Vacancies */}
          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                💡 Похожие вакансии
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {vacanciesData
                  .filter(v => v.id !== vacancy.id && v.category === vacancy.category)
                  .slice(0, 2)
                  .map(similarVacancy => (
                    <Link
                      key={similarVacancy.id}
                      to={`/about/vacancies/${similarVacancy.id}`}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{getCategoryIcon(similarVacancy.category)}</span>
                        <div>
                          <h3 className="font-semibold text-blue-900">{similarVacancy.title}</h3>
                          <p className="text-sm text-gray-600">{similarVacancy.department}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">{similarVacancy.shortDescription}</p>
                      <p className="text-sm font-medium text-green-600 mt-2">{similarVacancy.salary}</p>
                    </Link>
                  ))}
              </div>
              {vacanciesData.filter(v => v.id !== vacancy.id && v.category === vacancy.category).length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  Похожих вакансий не найдено
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <ApplicationForm 
          vacancy={vacancy} 
          onClose={() => setShowApplicationForm(false)} 
        />
      )}
    </div>
  );
};

export default VacancyDetail;
