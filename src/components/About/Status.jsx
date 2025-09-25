import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAccreditations } from "../../hooks/useAccreditations";

const Status = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Use custom hook for accreditations
  const { accreditations, loading, error, changeFilter } =
    useAccreditations(activeFilter);

  // Get filtered data based on active filter
  const filteredData =
    activeFilter === "all"
      ? accreditations
      : accreditations.filter((item) => item.type === activeFilter);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="relative min-h-screen py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative min-h-screen py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-4 relative z-10">
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
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-16 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Современный Hero Section */}
        <div className="text-center mb-16">
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white py-20 px-8 rounded-3xl shadow-2xl overflow-hidden">
            {/* Анимированный фон */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"></div>

              {/* Плавающие элементы */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float"></div>
              <div className="absolute bottom-20 right-16 w-16 h-16 bg-cyan-400/10 rounded-full blur-lg animate-float-delayed"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-white/20">
                <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                <span className="text-lg font-semibold text-cyan-100">
                  {t("hsm.accreditations_title")}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                 {t("hsm.University_name")}
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
                {t("hsm.accreditations_description")}
              </p>

              <div className="flex justify-center gap-4 mt-8">
                <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                <div className="w-4 h-1 bg-cyan-400 rounded-full"></div>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { key: "all", label: t("hsm.all") },
            { key: "government", label: t("hsm.government") },
            { key: "international", label: t("hsm.international") },
            { key: "regional", label: t("hsm.regional") },
            { key: "professional", label: t("hsm.professional") },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveFilter(filter.key);
                changeFilter(filter.key);
              }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.key
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white/70 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Сетка аккредитаций */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className={`group relative bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Анимированный фон при наведении */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Верхняя часть с градиентом */}
              <div
                className={`relative bg-gradient-to-r ${item.color} p-6 text-white overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`text-3xl bg-white/20 rounded-2xl w-16 h-16 flex items-center justify-center ${item.iconColor} backdrop-blur-sm`}
                    >
                      {item.logo}
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm ${
                        item.status === "Активный" ||
                        item.status === "Active" ||
                        item.status === "Активдүү"
                          ? "bg-green-500/20 text-green-100 border border-green-400/30"
                          : "bg-red-500/20 text-red-100 border border-red-400/30"
                      }`}
                    >
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
              </div>

              {/* Содержание карточки */}
              <div className="relative p-6">
                <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Детальная информация */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 font-semibold mb-1">
                      {t("hsm.validity_period")}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {item.validity}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-3 border border-gray-100">
                    <div className="text-xs text-gray-500 font-semibold mb-1">
                      {t("hsm.level")}
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {item.level}
                    </div>
                  </div>
                </div>

                {/* Преимущества */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {t("hsm.benefits")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.benefits &&
                      item.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-lg text-xs font-medium border border-blue-100 hover:border-blue-300 transition-colors duration-300"
                        >
                          {benefit}
                        </span>
                      ))}
                  </div>
                </div>

                {/* Кнопка подробнее */}
              </div>

              {/* Индикатор при наведении */}
              <div
                className={`absolute bottom-0 left-0 w-0 h-1 ${item.badgeColor} transition-all duration-500 group-hover:w-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-blue-600 mb-2">29+</div>
            <div className="text-sm text-gray-600 font-medium">
              {t("hsm.years_of_success")}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {filteredData.length}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {t("hsm.accreditations")}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-purple-600 mb-2">3500+</div>
            <div className="text-sm text-gray-600 font-medium">
              {t("hsm.students")}
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20">
            <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
            <div className="text-sm text-gray-600 font-medium">
              {t("hsm.teachers")}
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 border border-white/60 shadow-xl backdrop-blur-sm">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {t("hsm.quality_first")}
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t("hsm.quality_description")}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                t("hsm.international_standards"),
                t("hsm.modern_methods"),
                t("hsm.practical_training"),
                t("hsm.graduate_employment"),
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center text-gray-700 bg-white/50 px-4 py-2 rounded-full border border-white"
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

      {/* Добавляем стили для анимаций */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
      `}</style>
    </section>
  );
};

export default Status;
