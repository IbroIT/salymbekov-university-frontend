import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GlobeAltIcon, DocumentCheckIcon, CalendarDaysIcon, StarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import { getMultilingualText, adaptMultilingualArray } from '../../utils/multilingualUtils';

const AcademicMobility = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('opportunities');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    partner_universities: [],
    exchange_opportunities: [],
    participation_requirements: []
  });
  const [rawData, setRawData] = useState({
    partner_universities: [],
    exchange_opportunities: [],
    participation_requirements: []
  });

  useEffect(() => {
    fetchAcademicMobilityData();
  }, []);

  // Обновление данных при смене языка
  useEffect(() => {
    if (rawData.partner_universities.length > 0 || rawData.exchange_opportunities.length > 0 || rawData.participation_requirements.length > 0) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawData]);

  const updateDataForCurrentLanguage = () => {
    // Адаптируем partner_universities
    const adaptedPartnerUniversities = rawData.partner_universities.map(uni => ({
      ...uni,
      name: getMultilingualText(uni, 'name', uni.name),
      description: getMultilingualText(uni, 'description', uni.description),
      programs: uni.programs?.map(program => ({
        ...program,
        name: getMultilingualText(program, 'name', program.name)
      })) || []
    }));

    // Адаптируем exchange_opportunities
    const adaptedExchangeOpportunities = rawData.exchange_opportunities.map(opportunity => ({
      ...opportunity,
      title: getMultilingualText(opportunity, 'title', opportunity.title),
      description: getMultilingualText(opportunity, 'description', opportunity.description),
      benefits: opportunity.benefits?.map(benefit => 
        getMultilingualText(benefit, 'text', benefit.text || benefit)
      ) || []
    }));

    // Адаптируем participation_requirements
    const adaptedParticipationRequirements = rawData.participation_requirements.map(req => ({
      ...req,
      title: getMultilingualText(req, 'title', req.title),
      description: getMultilingualText(req, 'description', req.description),
      items: req.items?.map(item => 
        getMultilingualText(item, 'text', item.text || item)
      ) || []
    }));

    setData({
      partner_universities: adaptedPartnerUniversities,
      exchange_opportunities: adaptedExchangeOpportunities,
      participation_requirements: adaptedParticipationRequirements
    });
  };

  const fetchAcademicMobilityData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/student-life/api/data/academic_mobility_data/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Сохраняем оригинальные данные
      setRawData(result);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching academic mobility data:', err);
      setError('Ошибка загрузки данных. Попробуйте обновить страницу.');
      // Fallback to static data in case of error
      setData({
        partner_universities: [],
        exchange_opportunities: [],
        participation_requirements: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-600">{t('studentLife.academicMobility.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">{t('studentLife.academicMobility.error')}</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={fetchAcademicMobilityData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              {t('studentLife.academicMobility.tryAgain')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('studentLife.academicMobility.title')}</h1>
          <p className="text-lg text-gray-600">
            {t('studentLife.academicMobility.subtitle')}
          </p>
        </div>

        {/* Табы */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'opportunities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.academicMobility.tabs.opportunities')}
              </button>
              <button
                onClick={() => setActiveTab('universities')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'universities'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.academicMobility.tabs.partners')}
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requirements'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {t('studentLife.academicMobility.tabs.requirements')}
              </button>
            </nav>
          </div>
        </div>

        {/* Контент табов */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.exchange_opportunities.map((opportunity, index) => (
                <div key={opportunity.id || index} className="bg-white rounded-lg shadow-md p-6 border">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{opportunity.title}</h3>
                  <p className="text-gray-600 mb-4">{opportunity.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      <span>Продолжительность: {opportunity.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Преимущества:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {opportunity.benefits && opportunity.benefits.map((benefit, benefitIndex) => (
                        <li key={benefit.id || benefitIndex} className="flex items-start">
                          <StarIcon className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                          {benefit.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('studentLife.academicMobility.applicationSteps.title')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">1</div>
                  <p className="text-sm text-blue-800 font-medium">{t('studentLife.academicMobility.applicationSteps.step1')}</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">2</div>
                  <p className="text-sm text-blue-800 font-medium">{t('studentLife.academicMobility.applicationSteps.step2')}</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">3</div>
                  <p className="text-sm text-blue-800 font-medium">{t('studentLife.academicMobility.applicationSteps.step3')}</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto">4</div>
                  <p className="text-sm text-blue-800 font-medium">{t('studentLife.academicMobility.applicationSteps.step4')}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'universities' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.partner_universities.map((university) => (
                <div key={university.id} className="bg-white rounded-lg shadow-md p-6 border">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {university.logo ? (
                        <img src={university.logo} alt={university.name} className="w-14 h-14 object-contain" />
                      ) : (
                        <AcademicCapIcon className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{university.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <GlobeAltIcon className="w-4 h-4 mr-1" />
                        <span>{university.city}, {university.country}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Программы:</h4>
                      <div className="flex flex-wrap gap-1">
                        {university.programs && university.programs.map((program, index) => (
                          <span key={program.id || index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {program.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Продолжительность:</span>
                        <p className="text-gray-600">{university.duration}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">{t('studentLife.academicMobility.universityCard.language')}:</span>
                        <p className="text-gray-600">{university.language}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{t('studentLife.academicMobility.universityCard.requirements')}:</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>• GPA: {university.requirements.gpa}+</p>
                        <p>• {t('studentLife.academicMobility.universityCard.languageCert')}: {university.requirements.language_cert}</p>
                        <p>• {t('studentLife.academicMobility.universityCard.recommendations')}: {university.requirements.recommendation}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <span className="font-medium text-gray-900">{t('studentLife.academicMobility.universityCard.contact')}:</span>
                      <p className="text-sm text-blue-600">{university.contact_email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="space-y-6">
            {data.participation_requirements.map((section, index) => {
              const getIconComponent = (iconName) => {
                switch(iconName) {
                  case 'AcademicCapIcon': return AcademicCapIcon;
                  case 'GlobeAltIcon': return GlobeAltIcon;
                  case 'DocumentCheckIcon': return DocumentCheckIcon;
                  default: return DocumentCheckIcon;
                }
              };
              
              const IconComponent = getIconComponent(section.icon);
              
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <IconComponent className="w-6 h-6 mr-3 text-blue-600" />
                    {section.category}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.requirements.map((requirement, reqIndex) => (
                      <div key={reqIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">{t('studentLife.academicMobility.importantDates.title')}</h3>
              <div className="space-y-2 text-orange-700">
                <p>• <strong>{t('studentLife.academicMobility.importantDates.fall')}:</strong> {t('studentLife.academicMobility.importantDates.fallDeadline')}</p>
                <p>• <strong>{t('studentLife.academicMobility.importantDates.spring')}:</strong> {t('studentLife.academicMobility.importantDates.springDeadline')}</p>
                <p>• <strong>{t('studentLife.academicMobility.importantDates.summer')}:</strong> {t('studentLife.academicMobility.importantDates.summerDeadline')}</p>
                <p>• <strong>{t('studentLife.academicMobility.importantDates.selection')}:</strong> {t('studentLife.academicMobility.importantDates.selectionTime')}</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('studentLife.academicMobility.contact.title')}</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>{t('studentLife.academicMobility.contact.department')}</strong></p>
                <p>Email: <a href="mailto:international@su.edu.kg" className="text-blue-600 hover:underline">international@su.edu.kg</a></p>
                <p>{t('studentLife.academicMobility.contact.phone')}: +996 312 123-456 (доб. 123)</p>
                <p>{t('studentLife.academicMobility.contact.office')}: {t('studentLife.academicMobility.contact.officeLocation')}</p>
                <p>{t('studentLife.academicMobility.contact.hours')}: {t('studentLife.academicMobility.contact.workingHours')}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicMobility;
