import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { researchAPI } from '../../services/researchService';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

const ScientificJournals = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [journalsData, setJournalsData] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [journalIssues, setJournalIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("journals");

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      console.log('🔍 Journals: Starting to fetch journals...');
      setLoading(true);
      const data = await researchAPI.getScientificJournals();
      console.log('<CheckCircle className="w-5 h-5" /> Journals: Received data:', data);
      console.log('<BookOpen className="w-5 h-5" /> Journals: Data type:', typeof data, 'Array?', Array.isArray(data));

      if (data && data.results) {
        console.log('<BookOpen className="w-5 h-5" /> Journals: Using data.results:', data.results.length, 'items');
        setJournalsData(data.results);
      } else if (Array.isArray(data)) {
        console.log('<BookOpen className="w-5 h-5" /> Journals: Using data directly:', data.length, 'items');
        setJournalsData(data);
      } else {
        console.log('<BookOpen className="w-5 h-5" /> Journals: Data format unexpected, setting empty array');
        setJournalsData([]);
      }

      setError(null);
    } catch (err) {
      console.error('<XCircle className="w-5 h-5" /> Journals: Error fetching journals:', err);
      setError('Ошибка загрузки журналов');
      setJournalsData([]);
    } finally {
      setLoading(false);
    }
  }; const fetchJournalDetails = async (journalId) => {
    try {
      setIssuesLoading(true);

      const [journalData, issuesData] = await Promise.all([
        researchAPI.getJournalDetails(journalId),
        researchAPI.getJournalIssuesByJournal(journalId)
      ]);

      setSelectedJournal(journalData);
      setJournalIssues(Array.isArray(issuesData) ? issuesData : []);
      setActiveSection("archive");
    } catch (err) {
      setError(t('research.journals.noData', 'Не удалось загрузить данные'));
      console.error('Error fetching journal details:', err);
    } finally {
      setIssuesLoading(false);
    }
  };

  const getFieldByLanguage = (obj, field) => {
    const currentLang = i18n.language;
    return obj[`${field}_${currentLang}`] || obj[`${field}_ru`] || obj[field] || '';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const handleDownloadPDF = (pdfUrl, title) => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${title}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Sections data
  const sectionsData = {
    journals: {
      title: t("research.journals.title", "Научные журналы"),
      description: t("research.journals.subtitle", "Академические издания Высшей медицинской школы"),
      content: "journals"
    },
    archive: {
      title: selectedJournal ? getFieldByLanguage(selectedJournal, 'title') : t("research.journals.archive", "Архив журнала"),
      description: t("research.journals.archiveDescription", "Все выпуски научного журнала"),
      content: "archive"
    }
  };

  // Sections list for navigation
  const sectionsList = [
    { id: "journals", name: t("research.journals.navJournals", "Все журналы") },
  ];

  // Get current section data
  const getCurrentSectionData = () => {
    return sectionsData[activeSection] || sectionsData.journals;
  };

  const currentSectionData = getCurrentSectionData();

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
                {t("research.journals.error", "Ошибка загрузки")}
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t("research.journals.retry", "Повторить")}
              </button>
            </div>
          </div>
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
            {t("research.journals.title", "Научные журналы")}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t("research.journals.subtitle", "Академические издания Высшей медицинской школы")}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Боковая навигация */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-6">
              
              <nav className="p-2">
                <ul className="space-y-1">
                  {sectionsList.map((section) => (
                    <li key={section.id}>
                      <button
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-between ${activeSection === section.id
                            ? "bg-blue-100 text-blue-700 font-medium shadow-sm"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                        onClick={() => {
                          setActiveSection(section.id);
                          setSelectedJournal(null);
                          setJournalIssues([]);
                        }}
                      >
                        <span>{section.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {journalsData.length}
                        </span>
                      </button>
                    </li>
                  ))}

                  {/* Кнопка назад для архива */}
                  {activeSection === "archive" && selectedJournal && (
                    <li>
                      <button
                        className="w-full text-left px-4 py-3 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => {
                          setActiveSection("journals");
                          setSelectedJournal(null);
                          setJournalIssues([]);
                        }}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t("research.journals.backToJournals", "Назад к журналам")}
                      </button>
                    </li>
                  )}
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

              {/* Контент раздела - Журналы */}
              {activeSection === "journals" && (
                <div className="space-y-6">
                  {journalsData.length === 0 ? (
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
                        {t("research.journals.noData", "Журналы не найдены")}
                      </h3>
                      <p className="mt-2 text-gray-500">
                        {t("research.journals.noDataDescription", "В данный момент нет доступных научных журналов")}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {journalsData.map((journal, index) => (
                        <div
                          key={journal.id}
                          className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {journal.cover_image && (
                            <div className="h-48 bg-gray-200 overflow-hidden">
                              <img
                                src={journal.cover_image}
                                alt={getFieldByLanguage(journal, 'title')}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-bold text-gray-900">
                                {getFieldByLanguage(journal, 'title')}
                              </h3>

                              {journal.impact_factor && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
                                  IF: {journal.impact_factor}
                                </span>
                              )}
                            </div>

                            <p className="text-gray-700 mb-4 text-sm line-clamp-3">
                              {getFieldByLanguage(journal, 'description')}
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-semibold text-blue-600 mr-2">
                                  {t("research.journals.editor", "Главный редактор")}:
                                </span>
                                <span>{getFieldByLanguage(journal, 'editor_in_chief')}</span>
                              </div>

                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-semibold text-blue-600 mr-2">
                                  {t("research.journals.frequency", "Периодичность")}:
                                </span>
                                <span>{getFieldByLanguage(journal, 'publication_frequency')}</span>
                              </div>

                              <div className="flex items-center text-sm text-gray-600">
                                <span className="font-semibold text-blue-600 mr-2">
                                  {t("research.journals.year", "Год основания")}:
                                </span>
                                <span>{journal.established_year}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {journal.is_open_access && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                                  {t("research.journals.openAccess", "Открытый доступ")}
                                </span>
                              )}
                              {journal.is_peer_reviewed && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                                  {t("research.journals.peerReviewed", "Рецензируемый")}
                                </span>
                              )}
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={() => fetchJournalDetails(journal.id)}
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                              >
                                {t("research.journals.viewIssue", "Смотреть выпуски")}
                              </button>
                              {journal.website && (
                                <a
                                  href={journal.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm flex items-center justify-center"
                                >
                                  {t("research.journals.website", "Сайт")}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Контент раздела - Архив */}
              {activeSection === "archive" && selectedJournal && (
                <div className="space-y-6">
                  {/* Информация о журнале */}
                  <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-md border border-purple-100 p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {selectedJournal.cover_image && (
                        <div className="flex-shrink-0">
                          <img
                            src={selectedJournal.cover_image}
                            alt={getFieldByLanguage(selectedJournal, 'title')}
                            className="w-32 h-48 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {getFieldByLanguage(selectedJournal, 'title')}
                        </h3>

                        <p className="text-gray-700 mb-4">
                          {getFieldByLanguage(selectedJournal, 'description')}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 mb-2">
                              <span className="font-semibold text-blue-600">
                                {t("research.journals.editorInChief", "Главный редактор")}:
                              </span>{" "}
                              {getFieldByLanguage(selectedJournal, 'editor_in_chief')}
                            </p>
                            <p className="text-gray-600 mb-2">
                              <span className="font-semibold text-blue-600">
                                {t("research.journals.publicationFrequency", "Периодичность")}:
                              </span>{" "}
                              {getFieldByLanguage(selectedJournal, 'publication_frequency')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 mb-2">
                              <span className="font-semibold text-blue-600">
                                {t("research.journals.establishedYear", "Год основания")}:
                              </span>{" "}
                              {selectedJournal.established_year}
                            </p>
                            {selectedJournal.impact_factor && (
                              <p className="text-gray-600 mb-2">
                                <span className="font-semibold text-blue-600">
                                  {t("research.journals.impactFactor", "Импакт-фактор")}:
                                </span>{" "}
                                {selectedJournal.impact_factor}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Выпуски журнала */}
                  {issuesLoading ? (
                    <div className="flex justify-center items-center h-32">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        {t("research.journals.allIssues", "Все выпуски")}
                      </h3>

                      {journalIssues.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            {t("research.journals.noIssues", "Выпуски не найдены")}
                          </p>
                        </div>
                      ) : (
                        journalIssues.map((yearData) => (
                          <div key={yearData.year} className="space-y-4">
                            <h4 className="text-lg font-bold text-gray-800 border-b border-gray-200 pb-2">
                              {yearData.year} {t("research.journals.yearLabel", "год")}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {yearData.issues.map((issue) => (
                                <div
                                  key={issue.id}
                                  className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm border border-blue-100 p-4 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <h5 className="font-semibold text-gray-800">
                                      {t("research.journals.volume", "Том")} {issue.volume}, {t("research.journals.number", "№")}{issue.number}
                                    </h5>
                                    {issue.year && (
                                      <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">
                                        {issue.year}
                                      </span>
                                    )}
                                  </div>

                                  {getFieldByLanguage(issue, 'title') && (
                                    <p className="text-gray-600 text-sm mb-3">
                                      {getFieldByLanguage(issue, 'title')}
                                    </p>
                                  )}

                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                      {formatDate(issue.publication_date)}
                                    </span>
                                    {issue.pdf_file && (
                                      <button
                                        onClick={() => handleDownloadPDF(issue.pdf_file, `${getFieldByLanguage(selectedJournal, 'title')}_${issue.volume}_${issue.number}`)}
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        PDF
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificJournals;