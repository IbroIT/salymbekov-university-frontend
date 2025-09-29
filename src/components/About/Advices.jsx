import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCouncils } from "../../hooks/useCouncils";

const Advices = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Use custom hook for councils
  const {
    sectionsData,
    sectionsList,
    activeSection,
    loading,
    error,
    changeActiveSection,
    getCurrentSectionData,
    sectionHasMembers,
    sectionHasDocuments,
  } = useCouncils();

  // Get current section data
  const currentSectionData = getCurrentSectionData();

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
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
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
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
                {t("hsm.councils.loading_error")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("hsm.councils.refresh_page")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("hsm.councils.title")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("hsm.councils.subtitle")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white font-bold text-lg">
                {t("hsm.councils.sections")}
              </div>
              <nav className="p-2">
                <ul className="space-y-1">
                  {sectionsList.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                        onClick={() => changeActiveSection(section.id)}
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
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {currentSectionData.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {currentSectionData.description}
                </p>
              </div>

              {/* Контент раздела - члены */}
              {sectionHasMembers() && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.councils.composition")}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentSectionData.members.map((member, index) => (
                      <div
                        key={member.id}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            {member.photo ? (
                              <img
                                src={member.photo}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover mr-4"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl mr-4">
                                {member.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                            )}
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">
                                {member.name}
                              </h3>
                              <p className="text-blue-600 text-sm">
                                {member.position}
                              </p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {member.department}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{member.bio}</p>

                          {/* Контактная информация */}
                          {(member.email || member.phone) && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              {member.email && (
                                <p className="text-xs text-gray-600 mb-1">
                                  <strong>{t("hsm.councils.email")}:</strong>{" "}
                                  {member.email}
                                </p>
                              )}
                              {member.phone && (
                                <p className="text-xs text-gray-600">
                                  <strong>{t("hsm.councils.phone")}:</strong>{" "}
                                  {member.phone}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Контент раздела - документы */}
              {sectionHasDocuments() && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {t("hsm.councils.documents")}
                  </h3>

                  <div className="space-y-4">
                    {currentSectionData.documents.map((doc, index) => (
                      <div
                        key={doc.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="mb-2 md:mb-0">
                          <h4 className="font-medium text-gray-900">
                            {doc.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {t("hsm.councils.publish_date")}: {doc.date}
                          </p>
                          {doc.description && (
                            <p className="text-sm text-gray-500 mt-1">
                              {doc.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {doc.size}
                          </span>
                          <button
                            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                            onClick={() => {
                              if (doc.file_url) {
                                window.open(doc.file_url, "_blank");
                              }
                            }}
                          >
                            <svg
                              className="w-5 h-5 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            {t("hsm.councils.download")}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Сообщение, если в разделе нет контента */}
              {!sectionHasMembers() && !sectionHasDocuments() && (
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {t("hsm.councils.preparing_info")}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {t("hsm.councils.content_in_progress")}
                  </p>
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