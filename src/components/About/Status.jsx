import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Status = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock data - в реальном приложении будет приходить из API
  const accreditationData = [
    {
      id: 1,
      type: "government",
      title: t("hsm.accreditation_government"),
      year: "2023",
      level: t("hsm.national_level"),
      description: t("hsm.government_accreditation_desc"),
      validity: "2023-2028",
      status: t("hsm.active"),
      benefits: [t("hsm.state_recognition"), t("hsm.funding"), t("hsm.state_programs")],
      color: "from-blue-500 to-blue-600",
      badgeColor: "bg-blue-500",
      iconColor: "text-blue-600",
      logo: "🏛️"
    },
    {
      id: 2,
      type: "international",
      title: t("hsm.accreditation_international"),
      year: "2022",
      level: t("hsm.international_level"),
      description: t("hsm.international_accreditation_desc"),
      validity: "2022-2027",
      status: t("hsm.active"),
      benefits: [t("hsm.international_recognition"), t("hsm.student_mobility"), t("hsm.quality_standards")],
      color: "from-green-500 to-green-600",
      badgeColor: "bg-green-500",
      iconColor: "text-green-600",
      logo: "🌍"
    },
    {
      id: 3,
      type: "regional",
      title: t("hsm.accreditation_regional"),
      year: "2023",
      level: t("hsm.regional_level"),
      description: t("hsm.regional_accreditation_desc"),
      validity: "2023-2026",
      status: t("hsm.active"),
      benefits: [t("hsm.regional_cooperation"), t("hsm.local_employment"), t("hsm.community_projects")],
      color: "from-purple-500 to-purple-600",
      badgeColor: "bg-purple-500",
      iconColor: "text-purple-600",
      logo: "📍"
    },
    {
      id: 4,
      type: "professional",
      title: t("hsm.accreditation_professional"),
      year: "2024",
      level: t("hsm.professional_level"),
      description: t("hsm.professional_accreditation_desc"),
      validity: "2024-2027",
      status: t("hsm.active"),
      benefits: [t("hsm.industry_standards"), t("hsm.practical_training"), t("hsm.employment_opportunities")],
      color: "from-orange-500 to-orange-600",
      badgeColor: "bg-orange-500",
      iconColor: "text-orange-600",
      logo: "⚡"
    }
  ];

  // Фильтрация данных
  const filteredData = activeFilter === "all" 
    ? accreditationData 
    : accreditationData.filter((item) => item.type === activeFilter);

  // Список фильтров
  const filtersList = [
    { id: "all", name: t("hsm.all") },
    { id: "government", name: t("hsm.government") },
    { id: "international", name: t("hsm.international") },
    { id: "regional", name: t("hsm.regional") },
    { id: "professional", name: t("hsm.professional") },
  ];

  // Функция изменения фильтра
  const changeFilter = (filterId) => {
    setActiveFilter(filterId);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {t("hsm.loading_error")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("hsm.refresh_page")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("hsm.accreditations_title")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("hsm.accreditations_description")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация - фильтры */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("hsm.filter_by_type")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {filtersList.map((filter) => (
                    <li key={filter.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeFilter === filter.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => changeFilter(filter.id)}
                      >
                        {filter.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Статистика в боковой панели */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">{t("hsm.statistics")}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("hsm.total_accreditations")}</span>
                  <span className="font-bold text-blue-600">{accreditationData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("hsm.active")}</span>
                  <span className="font-bold text-green-600">{accreditationData.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t("hsm.years_of_work")}</span>
                  <span className="font-bold text-purple-600">29+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            {/* Сетка аккредитаций */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {filteredData.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Верхняя часть с градиентом */}
                  <div className={`bg-gradient-to-r ${item.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`text-3xl bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center ${item.iconColor} backdrop-blur-sm`}>
                        {item.logo}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm ${
                        item.status === t("hsm.active")
                          ? "bg-green-500/20 text-green-100 border border-green-400/30"
                          : "bg-red-500/20 text-red-100 border border-red-400/30"
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight mb-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm">
                      <span>{item.year}</span>
                      <span className="mx-2">•</span>
                      <span>{item.level}</span>
                    </div>
                  </div>

                  {/* Содержание карточки */}
                  <div className="p-6">
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Детальная информация */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 font-semibold mb-1">
                          {t("hsm.validity_period")}
                        </div>
                        <div className="text-sm font-semibold text-gray-800">
                          {item.validity}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 font-semibold mb-1">
                          {t("hsm.level")}
                        </div>
                        <div className="text-sm font-semibold text-gray-800">
                          {item.level}
                        </div>
                      </div>
                    </div>

                    {/* Преимущества */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-3">
                        {t("hsm.benefits")}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.benefits.map((benefit, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Дополнительная информация */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {t("hsm.quality_first")}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {t("hsm.quality_description")}
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    t("hsm.international_standards"),
                    t("hsm.modern_methods"),
                    t("hsm.practical_training"),
                    t("hsm.graduate_employment"),
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-gray-700 bg-blue-50 px-4 py-2 rounded-full"
                    >
                      <svg
                        className="w-5 h-5 text-green-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;