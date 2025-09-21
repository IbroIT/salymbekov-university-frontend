import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  GlobeAltIcon, 
  DocumentCheckIcon, 
  CalendarDaysIcon, 
  StarIcon, 
  AcademicCapIcon,
  ArrowPathIcon,
  ChevronRightIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { getMultilingualText } from '../../utils/multilingualUtils';

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
    if (rawData && (
      (rawData.partner_universities && rawData.partner_universities.length > 0) || 
      (rawData.exchange_opportunities && rawData.exchange_opportunities.length > 0) || 
      (rawData.participation_requirements && rawData.participation_requirements.length > 0)
    )) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawData]);

  const updateDataForCurrentLanguage = () => {
    // Адаптируем partner_universities
    const adaptedPartnerUniversities = (rawData.partner_universities || []).map(uni => ({
      ...uni,
      name: getMultilingualText(uni, 'name', uni.name),
      description: getMultilingualText(uni, 'description', uni.description),
      programs: (uni.programs || []).map(program => ({
        ...program,
        name: getMultilingualText(program, 'name', program.name)
      }))
    }));

    // Адаптируем exchange_opportunities
    const adaptedExchangeOpportunities = (rawData.exchange_opportunities || []).map(opportunity => ({
      ...opportunity,
      title: getMultilingualText(opportunity, 'title', opportunity.title),
      description: getMultilingualText(opportunity, 'description', opportunity.description),
      benefits: (opportunity.benefits || []).map(benefit => 
        getMultilingualText(benefit, 'text', benefit.text || benefit)
      )
    }));

    // Адаптируем participation_requirements
    const adaptedParticipationRequirements = (rawData.participation_requirements || []).map(req => ({
      ...req,
      title: getMultilingualText(req, 'title', req.title),
      description: getMultilingualText(req, 'description', req.description),
      items: (req.items || []).map(item => 
        getMultilingualText(item, 'text', item.text || item)
      )
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
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col justify-center items-center h-96">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <GlobeAltIcon className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
              {t('studentLife.academicMobility.loading')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 border border-red-100 transform transition-all hover:scale-[1.01]">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <ArrowPathIcon className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-red-800 mb-3">{t('studentLife.academicMobility.error')}</h3>
              <p className="text-red-700 mb-6">{error}</p>
              <button 
                onClick={fetchAcademicMobilityData}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full font-medium flex items-center hover:shadow-lg transition-all duration-300"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" />
                {t('studentLife.academicMobility.tryAgain')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок с анимацией */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('studentLife.academicMobility.title')}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            {t('studentLife.academicMobility.subtitle')}
          </p>
        </div>

        {/* Анимированные табы */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="inline-flex bg-white rounded-full p-1 shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`py-3 px-6 rounded-full font-medium text-sm flex items-center transition-all duration-300 ${
                  activeTab === 'opportunities'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                {t('studentLife.academicMobility.tabs.opportunities')}
              </button>
              <button
                onClick={() => setActiveTab('universities')}
                className={`py-3 px-6 rounded-full font-medium text-sm flex items-center transition-all duration-300 ${
                  activeTab === 'universities'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                {t('studentLife.academicMobility.tabs.partners')}
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`py-3 px-6 rounded-full font-medium text-sm flex items-center transition-all duration-300 ${
                  activeTab === 'requirements'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <DocumentCheckIcon className="w-5 h-5 mr-2" />
                {t('studentLife.academicMobility.tabs.requirements')}
              </button>
            </div>
          </div>
        </div>

        {/* Контент табов */}
        <div className="transition-all duration-500">
          {activeTab === 'opportunities' && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.exchange_opportunities && data.exchange_opportunities.length > 0 ? (
                  data.exchange_opportunities.map((opportunity, index) => (
                    <div 
                      key={opportunity.id || index} 
                      className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="mb-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                          <GlobeAltIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{opportunity.title || 'Возможность обмена'}</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">{opportunity.description || 'Описание не указано'}</p>
                      </div>
                      
                      <div className="mb-5 p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center text-sm text-blue-700 font-medium">
                          <CalendarDaysIcon className="w-5 h-5 mr-2" />
                          <span>{t('studentLife.academicMobility.duration')}: {opportunity.duration}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <StarIcon className="w-5 h-5 text-yellow-500 mr-2" />
                          {t('studentLife.academicMobility.advantages')}:
                        </h4>
                        <ul className="space-y-2">
                          {opportunity.benefits && opportunity.benefits.length > 0 ? (
                            opportunity.benefits.map((benefit, benefitIndex) => (
                              <li key={benefit.id || benefitIndex} className="flex items-start text-sm text-gray-700">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                {benefit.text || benefit || 'Преимущество'}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500 text-sm">Преимущества не указаны</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GlobeAltIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">Данные о возможностях обмена пока не загружены</p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">{t('studentLife.academicMobility.applicationSteps.title')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="text-center transform transition-all duration-300 hover:scale-105">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 backdrop-blur-sm">
                        {step}
                      </div>
                      <p className="font-medium text-sm">
                        {t(`studentLife.academicMobility.applicationSteps.step${step}`)}
                      </p>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          )}

          {activeTab === 'universities' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {data.partner_universities && data.partner_universities.length > 0 ? (
                  data.partner_universities.map((university) => (
                    <div 
                      key={university.id} 
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="flex items-start space-x-5 mb-5">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">
                          {university.logo ? (
                            <img src={university.logo} alt={university.name || 'University'} className="w-16 h-16 object-contain" />
                          ) : (
                            <AcademicCapIcon className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{university.name || 'Название университета'}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{university.city || 'Город'}, {university.country || 'Страна'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{t('studentLife.academicMobility.programs')}:</h4>
                          <div className="flex flex-wrap gap-2">
                            {university.programs && university.programs.length > 0 ? (
                              university.programs.map((program, index) => (
                                <span 
                                  key={program.id || index} 
                                  className="bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-medium"
                                >
                                  {program.name || 'Программа'}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-sm">Программы не указаны</span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="font-medium text-gray-900">{t('studentLife.academicMobility.duration')}:</span>
                            <p className="text-gray-600">{university.duration || 'Не указано'}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="font-medium text-gray-900 block mb-1">{t('studentLife.academicMobility.universityCard.language')}:</span>
                            <p className="text-gray-600">{university.language || 'Не указано'}</p>
                          </div>
                        </div>

                        {university.requirements && (
                          <div className="bg-blue-50 p-4 rounded-xl">
                            <h4 className="font-semibold text-blue-900 mb-2">{t('studentLife.academicMobility.universityCard.requirements')}:</h4>
                            <div className="text-sm text-blue-800 space-y-1.5">
                              <p>• GPA: {university.requirements.gpa || 'Не указано'}+</p>
                              <p>• {t('studentLife.academicMobility.universityCard.languageCert')}: {university.requirements.language_cert || 'Не указано'}</p>
                              <p>• {t('studentLife.academicMobility.universityCard.recommendations')}: {university.requirements.recommendation || 'Не указано'}</p>
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-gray-200">
                          <div className="flex items-center text-sm">
                            <EnvelopeIcon className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="font-medium text-gray-900 mr-2">{t('studentLife.academicMobility.universityCard.contact')}:</span>
                            <a href={`mailto:${university.contact_email}`} className="text-blue-600 hover:underline truncate">
                              {university.contact_email || 'Не указано'}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AcademicCapIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">Данные о университетах-партнерах пока не загружены</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-8">
              {data.participation_requirements && data.participation_requirements.length > 0 ? (
                data.participation_requirements.map((section, index) => {
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
                    <div 
                      key={index} 
                      className="bg-white rounded-2xl shadow-lg p-7 border border-gray-100 transform transition-all duration-300 hover:shadow-xl"
                    >
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mr-5">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {section.category || section.title || 'Требования'}
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {section.requirements && section.requirements.length > 0 ? (
                          section.requirements.map((requirement, reqIndex) => (
                            <div key={reqIndex} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                                {reqIndex + 1}
                              </div>
                              <span className="text-gray-700">{requirement}</span>
                            </div>
                          ))
                        ) : section.items && section.items.length > 0 ? (
                          section.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-start p-3 bg-gray-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                                {itemIndex + 1}
                              </div>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-full text-center py-4">Требования не указаны</p>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DocumentCheckIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">Данные о требованиях пока не загружены</p>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-7 text-white">
                  <h3 className="text-xl font-bold mb-5 flex items-center">
                    <CalendarDaysIcon className="w-6 h-6 mr-3" />
                    {t('studentLife.academicMobility.importantDates.title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <span className="font-medium">{t('studentLife.academicMobility.importantDates.fall')}</span>
                      <span className="font-semibold">{t('studentLife.academicMobility.importantDates.fallDeadline')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <span className="font-medium">{t('studentLife.academicMobility.importantDates.spring')}</span>
                      <span className="font-semibold">{t('studentLife.academicMobility.importantDates.springDeadline')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <span className="font-medium">{t('studentLife.academicMobility.importantDates.summer')}</span>
                      <span className="font-semibold">{t('studentLife.academicMobility.importantDates.summerDeadline')}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                      <span className="font-medium">{t('studentLife.academicMobility.importantDates.selection')}</span>
                      <span className="font-semibold">{t('studentLife.academicMobility.importantDates.selectionTime')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-xl p-7 text-white">
                  <h3 className="text-xl font-bold mb-5 flex items-center">
                    <EnvelopeIcon className="w-6 h-6 mr-3" />
                    {t('studentLife.academicMobility.contact.title')}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <EnvelopeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold">{t('studentLife.academicMobility.contact.department')}</p>
                        <a href="mailto:international@su.edu.kg" className="text-blue-300 hover:underline break-all">
                          international@su.edu.kg
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <PhoneIcon className="w-4 h-4" />
                      </div>
                      <span>+996 312 123-456 (доб. 123)</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <MapPinIcon className="w-4 h-4" />
                      </div>
                      <span>{t('studentLife.academicMobility.contact.officeLocation')}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <ClockIcon className="w-4 h-4" />
                      </div>
                      <span>{t('studentLife.academicMobility.contact.workingHours')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicMobility;