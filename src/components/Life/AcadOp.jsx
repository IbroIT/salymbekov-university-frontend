import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { studentLifeAPI } from "../../services/studentLifeService";

const AcadOp = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [academicMobilityData, setAcademicMobilityData] = useState({
    partner_universities: [],
    exchange_opportunities: [],
    participation_requirements: []
  });

  // Helper function to get localized value from API data
  const getLocalizedField = (item, fieldName) => {
    if (!item) return '';

    const currentLang = i18n.language;
    if (currentLang === 'en' && item[`${fieldName}_en`]) {
      return item[`${fieldName}_en`];
    } else if (currentLang === 'ky' && item[`${fieldName}_kg`]) {
      return item[`${fieldName}_kg`];
    }
    return item[`${fieldName}_ru`] || item[fieldName] || '';
  };

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch academic mobility data
  useEffect(() => {
    const fetchAcademicData = async () => {
      try {
        setLoading(true);
        const response = await studentLifeAPI.getAcademicMobilityData();
        console.log('Academic mobility data:', response.data);

        if (response.data) {
          setAcademicMobilityData({
            partner_universities: response.data.partner_universities || [],
            exchange_opportunities: response.data.exchange_opportunities || [],
            participation_requirements: response.data.participation_requirements || []
          });
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching academic mobility data:', err);
        setError('Failed to load academic opportunities data');
      } finally {
        setLoading(false);
      }
    };

    fetchAcademicData();
  }, []);

  // Process exchange opportunities as "opportunities"
  const opportunitiesData = academicMobilityData.exchange_opportunities.map(opportunity => ({
    id: opportunity.id,
    title: getLocalizedField(opportunity, 'title'),
    description: getLocalizedField(opportunity, 'description'),
    category: opportunity.type === 'semester' ? 'semester' : 'annual',
    status: 'available',
    popular: opportunity.id === 1, // Mark first as popular for demo
    students: opportunity.type === 'semester' ? '25+' : '15+',
    icon: opportunity.type === 'semester' ? '🌍' : '🎓',
    color: opportunity.type === 'semester' ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-cyan-500',
    features: opportunity.benefits?.map(benefit => getLocalizedField(benefit, 'text')) || []
  }));

  // Create categories based on exchange opportunities
  const categories = [
    {
      id: 'semester',
      name: t("acadop.categories.semester", "Семестровый обмен"),
      count: academicMobilityData.exchange_opportunities.filter(op => op.type === 'semester').length
    },
    {
      id: 'annual',
      name: t("acadop.categories.annual", "Годовой обмен"),
      count: academicMobilityData.exchange_opportunities.filter(op => op.type === 'year').length
    },
    {
      id: 'universities',
      name: t("acadop.categories.universities", "Университеты-партнеры"),
      count: academicMobilityData.partner_universities.length
    }
  ];

  // Create success stories from partner universities
  const successStories = academicMobilityData.partner_universities.slice(0, 3).map((university, index) => ({
    name: ['Айгуль Сапар', 'Марат Жуманов', 'Диана Калиева'][index] || `Student ${index + 1}`,
    program: getLocalizedField(university, 'name'),
    achievement: t("acadop.successStories.achievement", "Академическая мобильность"),
    quote: t("acadop.successStories.quote", "Программа обмена открыла новые горизонты в моей карьере"),
    image: ['👩‍🔬', '👨‍⚕️', '👩‍🎓'][index] || '👨‍🎓'
  }));

  // Фильтрация данных
  const filteredData = opportunitiesData.filter((opportunity) => {
    const matchesCategory =
      activeCategory === "all" || opportunity.category === activeCategory;
    const matchesSearch =
      opportunity.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Статистика
  const stats = {
    total: opportunitiesData.length,
    available: opportunitiesData.filter((r) => r.status === "available").length,
    students: opportunitiesData.reduce((sum, r) => {
      const students = parseInt(r.students?.replace("+", "") || "0");
      return sum + students;
    }, 0),
    popular: opportunitiesData.filter((r) => r.popular).length,
  };

  const statistics = [
    {
      label: t("acadop.statistics.total", "Всего возможностей"),
      value: stats.total,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: t("acadop.statistics.available", "Доступно сейчас"),
      value: stats.available,
      color: "from-green-500 to-green-600",
    },
    {
      label: t("acadop.statistics.students", "Студентов участвует"),
      value: `${stats.students}+`,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: t("acadop.statistics.popular", "Популярные"),
      value: stats.popular,
      color: "from-orange-500 to-orange-600",
    },
  ];

  // Categories list for navigation
  const categoriesList = [
    { id: "all", name: t("acadop.categories.all", "Все категории"), count: opportunitiesData.length },
    ...categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.count,
    })),
  ];

  // Добавляем состояния загрузки и ошибки
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading", "Загрузка...")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("common.error", "Ошибка")}</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("common.retry", "Попробовать снова")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("acadop.hero.title", "Академические возможности")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("acadop.hero.highlight", "для студентов")}
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("acadop.hero.description", "Откройте для себя уникальные возможности для академического и профессионального роста")}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white shadow-lg transform transition-all duration-500 text-center`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("acadop.categories.title", "Категории")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {categoriesList.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex justify-between items-center ${activeCategory === category.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Поиск */}
              <div className="p-4 border-t border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("acadop.search.placeholder", "Поиск возможностей...")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-xl p-6 transition-all duration-500">
              {/* Заголовок раздела */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {activeCategory === "all"
                        ? t("acadop.opportunities.all", "Все возможности")
                        : categories.find((cat) => cat.id === activeCategory)?.name || activeCategory}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {t("acadop.opportunities.description", "Академические возможности для студентов")}
                    </p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {t("acadop.results_count", "Найдено {{count}}", {
                      count: filteredData.length,
                    })}
                  </span>
                </div>
              </div>

              {/* Сетка возможностей */}
              <div className="space-y-6">
                {filteredData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredData.map((opportunity, index) => (
                      <div
                        key={opportunity.id}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {/* Заголовок карточки */}
                        <div
                          className={`bg-gradient-to-r ${opportunity.color} p-6 text-white relative overflow-hidden`}
                        >
                          <div className="flex items-center mb-4">
                            <div className="text-2xl mr-4 bg-white/20 rounded-xl w-12 h-12 flex items-center justify-center shadow-lg">
                              {opportunity.icon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">
                                  {opportunity.title}
                                </h3>
                                {opportunity.popular && (
                                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                                    {t("acadop.opportunities.popularBadge", "Популярно")}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center text-white/80 text-sm mt-1">
                                <svg
                                  className="w-4 h-4 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                                </svg>
                                <span>
                                  {opportunity.students}{" "}
                                  {t("acadop.opportunities.students", "студентов")}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Статус */}
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${opportunity.status === "available"
                                  ? "bg-green-400"
                                  : "bg-yellow-400"
                                }`}
                            ></div>
                            <span className="text-xs text-white/80 font-medium">
                              {opportunity.status === "available"
                                ? t("acadop.opportunities.status.available", "Доступно")
                                : t("acadop.opportunities.status.comingSoon", "Скоро")}
                            </span>
                          </div>
                        </div>

                        {/* Содержание */}
                        <div className="p-6">
                          <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                            {opportunity.description}
                          </p>

                          {/* Особенности */}
                          <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-800 mb-3">
                              {t("acadop.opportunities.featuresTitle", "Особенности")}
                            </h4>
                            <div className="space-y-2">
                              {opportunity.features?.map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-gray-600 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Кнопка доступа */}
                          <button
                            className={`w-full bg-gradient-to-r ${opportunity.color} text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center group`}
                          >
                            <span className="flex items-center">
                              {t("acadop.opportunities.detailsButton", "Подробнее")}
                              <svg
                                className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <svg
                      className="mx-auto h-16 w-16 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      {t("acadop.noResults.title", "Возможности не найдены")}
                    </h3>
                    <p className="mt-2 text-gray-500">
                      {t(
                        "acadop.noResults.description",
                        "Попробуйте изменить поисковый запрос или выбрать другую категорию"
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcadOp;