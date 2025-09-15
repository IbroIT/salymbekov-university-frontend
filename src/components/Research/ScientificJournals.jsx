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

  useEffect(() => {
    console.log('ScientificJournals component loaded');
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      console.log('Fetching journals...');
      setLoading(true);
      const response = await fetch('http://localhost:8000/research/api/journals/');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Failed to fetch journals');
      }

      const data = await response.json();
      console.log('Journals data:', data);
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
        fetch(`http://localhost:8000/research/api/journals/${journalId}/`),
        fetch(`http://localhost:8000/research/api/journal-issues/by_journal/?journal_id=${journalId}`)
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

  const renderJournalCard = (journal) => (
    <div key={journal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {getFieldByLanguage(journal, 'title')}
        </h3>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {getFieldByLanguage(journal, 'description')}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">{t('research.journals.editor')}:</span>
            <span className="text-gray-800">
              {getFieldByLanguage(journal, 'editor_in_chief')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">{t('research.journals.frequency')}:</span>
            <span className="text-gray-800">
              {getFieldByLanguage(journal, 'publication_frequency')}
            </span>
          </div>

          {journal.impact_factor && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">Импакт-фактор:</span>
              <span className="text-blue-600 font-bold">{journal.impact_factor}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-600">{t('research.journals.year')}:</span>
            <span className="text-gray-800">{journal.established_year}</span>
          </div>

          {journal.issn && (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-600">{t('research.journals.issn')}:</span>
              <span className="text-gray-800">{journal.issn}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {journal.is_open_access && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              {t('research.journals.openAccess')}
            </span>
          )}
          {journal.is_peer_reviewed && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {t('research.journals.peerReviewed')}
            </span>
          )}
        </div>

        {journal.latest_issue && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">{t('research.journals.currentIssue')}:</h4>
            <p className="text-sm text-gray-700 mb-1">
              {t('research.journals.volume')} {journal.latest_issue.volume}, {t('research.journals.number')}{journal.latest_issue.number} ({journal.latest_issue.year})
            </p>
            <p className="text-xs text-gray-600">
              {t('research.journals.published')}: {formatDate(journal.latest_issue.publication_date)}
            </p>
            {journal.latest_issue.pdf_file && (
              <button
                onClick={() => handleDownloadPDF(journal.latest_issue.pdf_file, `${getFieldByLanguage(journal, 'title')}_${journal.latest_issue.volume}_${journal.latest_issue.number}`)}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                {t('research.journals.downloadPdf')}
              </button>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => fetchJournalDetails(journal.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t('research.journals.viewIssue')}
          </button>
          {journal.website && (
            <a
              href={journal.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              {t('research.journals.website')}
            </a>
          )}
        </div>
      </div>
    </div>
  );

  const renderIssueCard = (issue) => (
    <div key={issue.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {issue.cover_image && (
          <div className="flex-shrink-0">
            <img
              src={issue.cover_image}
              alt={`Том ${issue.volume}, №${issue.number}`}
              className="w-20 h-28 object-cover rounded"
            />
          </div>
        )}
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-2">
            {t('research.journals.volume')} {issue.volume}, {t('research.journals.number')}{issue.number}
          </h4>
          
          {getFieldByLanguage(issue, 'title') && (
            <p className="text-gray-700 mb-2">
              {getFieldByLanguage(issue, 'title')}
            </p>
          )}

          <div className="space-y-1 text-sm text-gray-600 mb-3">
            <p>{t('research.journals.publicationDate')}: {formatDate(issue.publication_date)}</p>
            {issue.articles_count > 0 && (
            <p>{t('research.journals.articles')}: {issue.articles_count}</p>
            )}
            {issue.pages_count && (
              <p>{t('research.journals.pages')}: {issue.pages_count}</p>
            )}
            {issue.doi && (
              <p>{t('research.journals.doi')}: {issue.doi}</p>
            )}
          </div>

          {issue.pdf_file && (
            <button
              onClick={() => handleDownloadPDF(issue.pdf_file, `${selectedJournal?.title_ru}_том_${issue.volume}_${issue.number}`)}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
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
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-lg">{t('research.journals.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('research.journals.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('research.journals.subtitle')}
          </p>
        </div>

        {/* Navigation */}
        {activeView === 'archive' && (
          <div className="mb-6">
            <button
              onClick={() => {
                setActiveView('journals');
                setSelectedJournal(null);
                setJournalIssues([]);
              }}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
              </svg>
              {t('research.journals.archive')}
            </button>
          </div>
        )}

        {/* Journals List */}
        {activeView === 'journals' && (
          <div>
            {journalsData.length === 0 && !loading && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('research.journals.noData')}</p>
              </div>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journalsData.map(journal => renderJournalCard(journal))}
            </div>
          </div>
        )}

        {/* Journal Archive */}
        {activeView === 'archive' && selectedJournal && (
          <div>
            {/* Journal Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                {selectedJournal.cover_image && (
                  <div className="flex-shrink-0">
                    <img
                      src={selectedJournal.cover_image}
                      alt={getFieldByLanguage(selectedJournal, 'title')}
                      className="w-48 h-64 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {getFieldByLanguage(selectedJournal, 'title')}
                  </h2>
                  
                  <p className="text-gray-700 mb-4">
                    {getFieldByLanguage(selectedJournal, 'description')}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">{t('research.journals.basicInfo')}:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>{t('research.journals.editorInChief')}: {getFieldByLanguage(selectedJournal, 'editor_in_chief')}</li>
                        <li>{t('research.journals.publicationFrequency')}: {getFieldByLanguage(selectedJournal, 'publication_frequency')}</li>
                        <li>{t('research.journals.establishedYear')}: {selectedJournal.established_year}</li>
                        {selectedJournal.issn && <li>{t('research.journals.issn')}: {selectedJournal.issn}</li>}
                        {selectedJournal.eissn && <li>E-ISSN: {selectedJournal.eissn}</li>}
                        {selectedJournal.impact_factor && <li>{t('research.journals.impactFactor')}: {selectedJournal.impact_factor}</li>}
                      </ul>
                    </div>

                    {getFieldByLanguage(selectedJournal, 'scope') && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">{t('research.journals.scope')}:</h4>
                        <p className="text-sm text-gray-600">
                          {getFieldByLanguage(selectedJournal, 'scope')}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedJournal.is_open_access && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {t('research.journals.openAccess')}
                      </span>
                    )}
                    {selectedJournal.is_peer_reviewed && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">{t('research.journals.allIssues')}</h3>
                
                {journalIssues.map(yearData => (
                  <div key={yearData.year} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {yearData.year} {t('research.journals.yearLabel')}
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {yearData.issues.map(issue => renderIssueCard(issue))}
                    </div>
                  </div>
                ))}

                {journalIssues.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">{t('research.journals.noData')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScientificJournals;