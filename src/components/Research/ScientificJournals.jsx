import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ScientificJournals = () => {
  const { t, i18n } = useTranslation();
  const [journalsData, setJournalsData] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [journalIssues, setJournalIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [issuesLoading, setIssuesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('journals');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/journals/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch journals');
      }

      const data = await response.json();
      setJournalsData(data.results || data);
      setError(null);
    } catch (err) {
      console.error('Error fetching journals:', err);
      setError(t('research.journals.noData'));
    } finally {
      setLoading(false);
    }
  };

  const fetchJournalDetails = async (journalId) => {
    try {
      setIssuesLoading(true);
      const [journalResponse, issuesResponse] = await Promise.all([
        fetch(`https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/journals/${journalId}/`),
        fetch(`https://su-med-backend-35d3d951c74b.herokuapp.com/research/api/journal-issues/by_journal/?journal_id=${journalId}`)
      ]);

      if (!journalResponse.ok || !issuesResponse.ok) {
        throw new Error('Failed to fetch journal details');
      }

      const journalData = await journalResponse.json();
      const issuesData = await issuesResponse.json();

      setSelectedJournal(journalData);
      setJournalIssues(issuesData);
      setActiveView('archive');
    } catch (err) {
      setError(t('research.journals.noData'));
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

  const renderJournalCard = (journal, index) => (
    <div 
      key={journal.id} 
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
      onMouseEnter={() => setHoveredCard(journal.id)}
      onMouseLeave={() => setHoveredCard(null)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
      
      {journal.cover_image && (
        <div className="h-52 bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden relative">
          <img
            src={journal.cover_image}
            alt={getFieldByLanguage(journal, 'title')}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      )}
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {getFieldByLanguage(journal, 'title')}
          </h3>
          
          {journal.impact_factor && (
            <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
              IF: {journal.impact_factor}
            </span>
          )}
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {getFieldByLanguage(journal, 'description')}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-blue-600">{t('research.journals.editor')}:</span>
              <span className="text-gray-800 ml-2">
                {getFieldByLanguage(journal, 'editor_in_chief')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-blue-600">{t('research.journals.frequency')}:</span>
              <span className="text-gray-800 ml-2">
                {getFieldByLanguage(journal, 'publication_frequency')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <span className="font-semibold text-blue-600">{t('research.journals.year')}:</span>
              <span className="text-gray-800 ml-2">{journal.established_year}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {journal.is_open_access && (
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold border border-green-200">
              {t('research.journals.openAccess')}
            </span>
          )}
          {journal.is_peer_reviewed && (
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold border border-blue-200">
              {t('research.journals.peerReviewed')}
            </span>
          )}
        </div>

        {journal.latest_issue && (
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-4 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"/>
              </svg>
              {t('research.journals.currentIssue')}
            </h4>
            <p className="text-sm text-blue-800 mb-1">
              {t('research.journals.volume')} {journal.latest_issue.volume}, {t('research.journals.number')}{journal.latest_issue.number} ({journal.latest_issue.year})
            </p>
            <p className="text-xs text-blue-600 mb-3">
              {t('research.journals.published')}: {formatDate(journal.latest_issue.publication_date)}
            </p>
            {journal.latest_issue.pdf_file && (
              <button
                onClick={() => handleDownloadPDF(journal.latest_issue.pdf_file, `${getFieldByLanguage(journal, 'title')}_${journal.latest_issue.volume}_${journal.latest_issue.number}`)}
                className="text-blue-700 hover:text-blue-900 text-sm flex items-center gap-2 font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                {t('research.journals.downloadPdf')}
              </button>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => fetchJournalDetails(journal.id)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-semibold"
          >
            {t('research.journals.viewIssue')}
          </button>
          {journal.website && (
            <a
              href={journal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 border-2 border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
              </svg>
              {t('research.journals.website')}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderIssueCard = (issue) => (
    <div key={issue.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex gap-4">
        {issue.cover_image && (
          <div className="flex-shrink-0 relative">
            <img
              src={issue.cover_image}
              alt={`Том ${issue.volume}, №${issue.number}`}
              className="w-20 h-28 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
            />
            <div className="absolute -inset-1 bg-blue-200 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        )}
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2 text-lg">
            {t('research.journals.volume')} {issue.volume}, {t('research.journals.number')}{issue.number}
          </h4>
          
          {getFieldByLanguage(issue, 'title') && (
            <p className="text-gray-700 mb-3 leading-relaxed">
              {getFieldByLanguage(issue, 'title')}
            </p>
          )}

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <span>{t('research.journals.publicationDate')}: {formatDate(issue.publication_date)}</span>
            </div>
            
            {issue.articles_count > 0 && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                </svg>
                <span>{t('research.journals.articles')}: {issue.articles_count}</span>
              </div>
            )}
            
            {issue.pages_count && (
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd"/>
                </svg>
                <span>{t('research.journals.pages')}: {issue.pages_count}</span>
              </div>
            )}
          </div>

          {issue.pdf_file && (
            <button
              onClick={() => handleDownloadPDF(issue.pdf_file, `${selectedJournal?.title_ru}_том_${issue.volume}_${issue.number}`)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md text-sm font-semibold flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              {t('research.journals.downloadPdf')}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
              <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
            </div>
            <span className="ml-4 text-lg text-blue-600 font-semibold">{t('research.journals.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
              </svg>
              <h3 className="text-lg font-semibold">{t('research.journals.error')}</h3>
            </div>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Animated Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-8 -right-4 w-24 h-24 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4 relative z-10 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {t('research.journals.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto relative z-10 leading-relaxed">
            {t('research.journals.subtitle')}
          </p>
        </div>

        {/* Navigation */}
        {activeView === 'archive' && (
          <div className="mb-8">
            <button
              onClick={() => {
                setActiveView('journals');
                setSelectedJournal(null);
                setJournalIssues([]);
              }}
              className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300 group"
            >
              <div className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center group-hover:shadow-lg transition-shadow">
                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              {t('research.journals.backToJournals')}
            </button>
          </div>
        )}

        {/* Journals List */}
        {activeView === 'journals' && (
          <div className="relative">
            {journalsData.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">{t('research.journals.noData')}</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {journalsData.map((journal, index) => renderJournalCard(journal, index))}
            </div>
          </div>
        )}

        {/* Journal Archive */}
        {activeView === 'archive' && selectedJournal && (
          <div className="space-y-8">
            {/* Journal Header */}
            <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-blue-500 to-blue-600 rounded-full transform translate-x-16 -translate-y-16 opacity-10"></div>
              
              <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                {selectedJournal.cover_image && (
                  <div className="flex-shrink-0">
                    <div className="w-48 h-64 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                      <img
                        src={selectedJournal.cover_image}
                        alt={getFieldByLanguage(selectedJournal, 'title')}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {getFieldByLanguage(selectedJournal, 'title')}
                  </h2>
                  
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    {getFieldByLanguage(selectedJournal, 'description')}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-blue-600 text-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                        </svg>
                        {t('research.journals.basicInfo')}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <span className="font-semibold text-blue-500 min-w-[120px]">{t('research.journals.editorInChief')}:</span>
                          <span className="text-gray-800">{getFieldByLanguage(selectedJournal, 'editor_in_chief')}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="font-semibold text-blue-500 min-w-[120px]">{t('research.journals.publicationFrequency')}:</span>
                          <span className="text-gray-800">{getFieldByLanguage(selectedJournal, 'publication_frequency')}</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="font-semibold text-blue-500 min-w-[120px]">{t('research.journals.establishedYear')}:</span>
                          <span className="text-gray-800">{selectedJournal.established_year}</span>
                        </li>
                        {selectedJournal.issn && (
                          <li className="flex items-center gap-3">
                            <span className="font-semibold text-blue-500 min-w-[120px]">{t('research.journals.issn')}:</span>
                            <span className="text-gray-800">{selectedJournal.issn}</span>
                          </li>
                        )}
                        {selectedJournal.impact_factor && (
                          <li className="flex items-center gap-3">
                            <span className="font-semibold text-blue-500 min-w-[120px]">{t('research.journals.impactFactor')}:</span>
                            <span className="text-blue-600 font-bold">{selectedJournal.impact_factor}</span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {getFieldByLanguage(selectedJournal, 'scope') && (
                      <div>
                        <h4 className="font-bold text-blue-600 text-lg mb-4">{t('research.journals.scope')}</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {getFieldByLanguage(selectedJournal, 'scope')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {selectedJournal.is_open_access && (
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-semibold border border-green-200 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {t('research.journals.openAccess')}
                      </span>
                    )}
                    {selectedJournal.is_peer_reviewed && (
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold border border-blue-200 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                        {t('research.journals.peerReviewed')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Archive */}
            {issuesLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-gray-900 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {t('research.journals.allIssues')}
                </h3>
                
                {journalIssues.map(yearData => (
                  <div key={yearData.year} className="bg-white rounded-3xl shadow-lg p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      {yearData.year} {t('research.journals.yearLabel')}
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {yearData.issues.map(issue => renderIssueCard(issue))}
                    </div>
                  </div>
                ))}

                {journalIssues.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-3xl shadow-lg">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">{t('research.journals.noData')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default ScientificJournals;