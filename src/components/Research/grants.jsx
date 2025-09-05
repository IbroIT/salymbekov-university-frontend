import React, { useState } from 'react';

// Моковые данные грантов
const grantsData = [
  {
    id: 1,
    title: "Молодежные научные проекты",
    organization: "МОН КР",
    amount: "500,000 сом",
    deadline: "15.04.2024",
    category: "Молодежные",
    duration: "12 месяцев",
    requirements: "Возраст до 35 лет, публикации в рецензируемых журналах",
    description: "Поддержка молодых ученых для проведения фундаментальных и прикладных исследований",
    status: "active",
    contact: "grants@mon.kg",
    website: "https://grants.mon.kg"
  },
  {
    id: 2,
    title: "Международные исследовательские проекты",
    organization: "Horizon Europe",
    amount: "€50,000",
    deadline: "30.06.2024",
    category: "Международные",
    duration: "24 месяца",
    requirements: "Международный консорциум, инновационный подход",
    description: "Финансирование прорывных исследований в области биомедицины и технологий",
    status: "active",
    contact: "info@horizon-europe.eu",
    website: "https://horizon-europe.eu"
  },
  {
    id: 3,
    title: "Фундаментальные исследования в медицине",
    organization: "РФФИ",
    amount: "2,000,000 руб.",
    deadline: "20.05.2024",
    category: "Фундаментальные",
    duration: "18 месяцев",
    requirements: "Кандидат наук, исследовательская группа",
    description: "Поддержка фундаментальных медицинских исследований с перспективой клинического применения",
    status: "active",
    contact: "rffi@mail.ru",
    website: "https://rffi.ru"
  },
  {
    id: 4,
    title: "Инновационные стартапы в здравоохранении",
    organization: "Всемирный банк",
    amount: "$100,000",
    deadline: "10.09.2024",
    category: "Инновационные",
    duration: "36 месяцев",
    requirements: "Бизнес-план, команда, прототип решения",
    description: "Финансирование инновационных проектов в области цифрового здравоохранения",
    status: "upcoming",
    contact: "startup@worldbank.org",
    website: "https://worldbank.org/health"
  },
  {
    id: 5,
    title: "Клинические исследования",
    organization: "NIH",
    amount: "$250,000",
    deadline: "01.03.2024",
    category: "Клинические",
    duration: "24 месяца",
    requirements: "Одобрение этического комитета, клиническая база",
    description: "Поддержка клинических исследований новых методов диагностики и лечения",
    status: "closed",
    contact: "clinical@nih.gov",
    website: "https://nih.gov/grants"
  }
];

const Grants = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    grantId: '',
    projectTitle: '',
    principalInvestigator: '',
    email: '',
    phone: '',
    department: '',
    teamMembers: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    expectedResults: '',
    files: null
  });

  const filteredGrants = grantsData.filter(grant => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return grant.status === 'active';
    if (activeTab === 'upcoming') return grant.status === 'upcoming';
    if (activeTab === 'closed') return grant.status === 'closed';
    return true;
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Здесь будет логика отправки заявки
    alert('Заявка успешно отправлена!');
    setShowApplicationForm(false);
    setFormData({
      grantId: '',
      projectTitle: '',
      principalInvestigator: '',
      email: '',
      phone: '',
      department: '',
      teamMembers: '',
      projectDescription: '',
      budget: '',
      timeline: '',
      expectedResults: '',
      files: null
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'active': { text: 'Прием заявок', color: 'bg-green-100 text-green-800' },
      'upcoming': { text: 'Скоро откроется', color: 'bg-blue-100 text-blue-800' },
      'closed': { text: 'Прием закрыт', color: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status] || { text: '', color: '' };
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Молодежные': 'bg-purple-100 text-purple-800',
      'Международные': 'bg-indigo-100 text-indigo-800',
      'Фундаментальные': 'bg-blue-100 text-blue-800',
      'Инновационные': 'bg-teal-100 text-teal-800',
      'Клинические': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 Грантовые возможности
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Финансирование научных исследований и инновационных проектов от ведущих организаций
          </p>
        </div>

        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-1 inline-flex flex-wrap justify-center">
            {[
              { key: 'all', label: 'Все гранты', emoji: '📋' },
              { key: 'active', label: 'Активные', emoji: '✅' },
              { key: 'upcoming', label: 'Скоро', emoji: '⏰' },
              { key: 'closed', label: 'Завершенные', emoji: '🔒' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 mx-1 mb-1 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Таблица грантов */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Грант
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Организация
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дедлайн
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGrants.map((grant) => (
                  <tr key={grant.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{grant.title}</div>
                      <div className={`inline-flex px-2 py-1 text-xs rounded-full ${getCategoryColor(grant.category)}`}>
                        {grant.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{grant.organization}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-green-600">{grant.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{grant.deadline}</div>
                      <div className="text-xs text-gray-500">{grant.duration}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(grant.status).color}`}>
                        {getStatusBadge(grant.status).text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedGrant(grant)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Подробнее
                        </button>
                        {grant.status === 'active' && (
                          <button
                            onClick={() => {
                              setSelectedGrant(grant);
                              setShowApplicationForm(true);
                              setFormData(prev => ({ ...prev, grantId: grant.id }));
                            }}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Подать заявку
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGrants.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              Нет доступных грантов по выбранному фильтру
            </div>
          )}
        </div>

        {/* Модальное окно с деталями гранта */}
        {selectedGrant && !showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedGrant.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(selectedGrant.category)}`}>
                        {selectedGrant.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(selectedGrant.status).color}`}>
                        {getStatusBadge(selectedGrant.status).text}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedGrant(null)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Основная информация</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Организация</p>
                        <p className="font-semibold">{selectedGrant.organization}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Размер финансирования</p>
                        <p className="font-semibold text-green-600 text-xl">{selectedGrant.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Дедлайн подачи</p>
                        <p className="font-semibold text-red-600">{selectedGrant.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Срок реализации</p>
                        <p className="font-semibold">{selectedGrant.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Контакты</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Контактное лицо</p>
                        <p className="font-semibold">{selectedGrant.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Вебсайт</p>
                        <a href={selectedGrant.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">
                          {selectedGrant.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Описание</h3>
                  <p className="text-gray-600">{selectedGrant.description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Требования</h3>
                  <p className="text-gray-600">{selectedGrant.requirements}</p>
                </div>

                {selectedGrant.status === 'active' && (
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setShowApplicationForm(true);
                        setFormData(prev => ({ ...prev, grantId: selectedGrant.id }));
                      }}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                    >
                      📝 Подать заявку на грант
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Форма заявки на грант */}
        {showApplicationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">📝 Заявка на грант</h2>
                  <button
                    onClick={() => setShowApplicationForm(false)}
                    className="text-white hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmitApplication} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название проекта *
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Руководитель проекта *
                    </label>
                    <input
                      type="text"
                      name="principalInvestigator"
                      value={formData.principalInvestigator}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Кафедра/Лаборатория *
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Члены команды
                    </label>
                    <input
                      type="text"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleInputChange}
                      placeholder="ФИО, должности через запятую"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание проекта *
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Цели, задачи, методы, ожидаемые результаты..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Бюджет (сом) *
                    </label>
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Срок реализации (мес) *
                    </label>
                    <input
                      type="number"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ожидаемые результаты *
                  </label>
                  <textarea
                    name="expectedResults"
                    value={formData.expectedResults}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Публикации, патенты, практическое применение..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Прикрепить проектное предложение (PDF)
                  </label>
                  <input
                    type="file"
                    name="files"
                    onChange={handleInputChange}
                    accept=".pdf,.doc,.docx"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    📤 Отправить заявку
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grants;