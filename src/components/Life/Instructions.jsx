import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DocumentTextIcon, 
  ClipboardDocumentListIcon, 
  CalendarDaysIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  PhoneIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { getMultilingualText, adaptMultilingualArray } from '../../utils/multilingualUtils';

const Instructions = () => {
  const { t, i18n } = useTranslation();
  const [activeGuide, setActiveGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentGuides, setStudentGuides] = useState([]);
  const [rawStudentGuides, setRawStudentGuides] = useState([]); // Сохраняем оригинальные данные
  const [guideDetailsLoading, setGuideDetailsLoading] = useState(false);

  // Загрузка списка инструкций при загрузке компонента
  useEffect(() => {
    fetchInstructionsData();
  }, []);

  // Обновление данных при смене языка
  useEffect(() => {
    if (rawStudentGuides.length > 0) {
      updateDataForCurrentLanguage();
    }
  }, [i18n.language, rawStudentGuides]);

  const updateDataForCurrentLanguage = () => {
    // Адаптируем данные для текущего языка
    const adaptedGuides = adaptMultilingualArray(rawStudentGuides, [
      'title', 'description', 'estimated_time', 'max_duration', 'contact_info', 'requirements'
    ]);
    
    // Также адаптируем вложенные структуры
    const fullyAdaptedGuides = adaptedGuides.map(guide => ({
      ...guide,
      steps: guide.steps?.map(step => ({
        ...step,
        title: getMultilingualText(step, 'title', step.title),
        description: getMultilingualText(step, 'description', step.description),
        timeframe: getMultilingualText(step, 'timeframe', step.timeframe),
        details: getMultilingualText(step, 'details', step.details) || []
      })) || []
    }));
    
    setStudentGuides(fullyAdaptedGuides);
    
    // Обновляем активный гид, если он есть
    if (activeGuide) {
      const updatedActiveGuide = fullyAdaptedGuides.find(g => g.id === activeGuide.id);
      if (updatedActiveGuide) {
        setActiveGuide(updatedActiveGuide);
      }
    }
  };

  const fetchInstructionsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/api/student-life/api/data/instructions_data/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const guides = result.student_guides || [];
      
      // Сохраняем оригинальные данные
      setRawStudentGuides(guides);
      
      // Адаптация данных будет выполнена через useEffect
    } catch (err) {
      console.error('Ошибка загрузки инструкций:', err);
      setError(t('studentLife.instructions.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const fetchGuideDetails = async (guideId) => {
    try {
      setGuideDetailsLoading(true);
      
      // Найти гид в уже загруженных данных
      const guide = studentGuides.find(g => g.id === guideId);
      if (guide) {
        setActiveGuide(guide);
      } else {
        throw new Error(t('studentLife.instructions.instructionNotFound'));
      }
    } catch (err) {
      console.error('Ошибка загрузки деталей инструкции:', err);
      alert(t('studentLife.instructions.instructionLoadError'));
    } finally {
      setGuideDetailsLoading(false);
    }
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      'CalendarDaysIcon': CalendarDaysIcon,
      'UserGroupIcon': UserGroupIcon,
      'ClipboardDocumentListIcon': ClipboardDocumentListIcon,
      'DocumentTextIcon': DocumentTextIcon
    };
    return iconMap[iconName] || DocumentTextIcon;
  };

  // Загрузка основных данных
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('studentLife.instructions.loading')}</p>
        </div>
      </div>
    );
  }

  // Ошибка загрузки
  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('studentLife.instructions.error')}</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchInstructionsData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('studentLife.instructions.tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  // Детальный просмотр инструкции
  const GuideDetail = ({ guide }) => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          {(() => {
            const IconComponent = getIconComponent(guide.icon);
            return <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />;
          })()}
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{guide.title}</h2>
            <p className="text-blue-700">{guide.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{t('studentLife.instructions.requirements')}</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {(guide.requirements || []).map((req, index) => (
              <li key={index} className="flex items-start">
                <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{t('studentLife.instructions.timeframe')}</h3>
          <p className="text-sm text-gray-600 flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            {guide.max_duration || t('studentLife.instructions.notSpecified')}
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">{t('studentLife.instructions.contacts')}</h3>
          <p className="text-sm text-gray-600 flex items-start">
            <PhoneIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            {guide.contact_info || t('studentLife.instructions.defaultContact')}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {(guide.steps || []).map((step, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {step.step_number || index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                  {step.timeframe && (
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {step.timeframe}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{step.description}</p>
                <ul className="space-y-2">
                  {(step.details || []).map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
        <div className="flex items-start">
          <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">{t('studentLife.instructions.importantNotes')}</h3>
            <ul className="text-yellow-700 space-y-1 text-sm">
              {t('studentLife.instructions.notes', { returnObjects: true }).map((note, index) => (
                <li key={index}>• {note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('studentLife.instructions.title')}</h1>
          <p className="text-lg text-gray-600">
            {t('studentLife.instructions.subtitle')}
          </p>
        </div>

        {!activeGuide ? (
          <div className="space-y-6">
            {/* Карточки инструкций */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentGuides.map((guide) => {
                const IconComponent = getIconComponent(guide.icon);
                return (
                  <div key={guide.id} className="bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600 mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{guide.description}</p>
                      <div className="space-y-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>{t('studentLife.instructions.estimatedTime')}: {guide.estimated_time || t('studentLife.instructions.notSpecified')}</span>
                        </div>
                        <div className="flex items-center">
                          <DocumentTextIcon className="w-4 h-4 mr-2" />
                          <span>{t('studentLife.instructions.duration')}: {guide.max_duration || t('studentLife.instructions.notSpecified')}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => fetchGuideDetails(guide.id)}
                        disabled={guideDetailsLoading}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {guideDetailsLoading ? t('studentLife.instructions.loading') : t('studentLife.instructions.viewInstruction')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Если нет инструкций */}
            {studentGuides.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">{t('studentLife.instructions.noInstructions')}</p>
              </div>
            )}

            {/* Общая информация */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('studentLife.instructions.generalInfo')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t('studentLife.instructions.workingHours')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {t('studentLife.instructions.schedule', { returnObjects: true }).map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">{t('studentLife.instructions.requiredDocuments')}</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {t('studentLife.instructions.documentTips', { returnObjects: true }).map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Контактная информация */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">{t('studentLife.instructions.needHelp')}</h3>
              <p className="text-blue-800 mb-4">
                {t('studentLife.instructions.helpDescription')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                <div>
                  <p><strong>{t('studentLife.instructions.deanOffice')}</strong></p>
                  <p>{t('studentLife.instructions.mainBuilding')}, {t('studentLife.instructions.room')} 105</p>
                  <p>Тел: +996 312 123-456</p>
                  <p>Email: dean@su.edu.kg</p>
                </div>
                <div>
                  <p><strong>{t('studentLife.instructions.academicOffice')}</strong></p>
                  <p>{t('studentLife.instructions.mainBuilding')}, {t('studentLife.instructions.room')} 110</p>
                  <p>Тел: +996 312 123-458</p>
                  <p>Email: studies@su.edu.kg</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveGuide(null)}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              {t('studentLife.instructions.back')}
            </button>
            <GuideDetail guide={activeGuide} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructions;
