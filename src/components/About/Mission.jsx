import { useTranslation } from 'react-i18next';
import { CheckCircleIcon, AcademicCapIcon, BeakerIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Mission = () => {
  const { t } = useTranslation();

  const valueIcons = {
    education: AcademicCapIcon,
    science: BeakerIcon,
    medicine: HeartIcon,
    studentCare: UserGroupIcon
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('mission.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('mission.subtitle')}
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">
              {t('mission.missionTitle')}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
              {t('mission.missionText')}
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('mission.valuesTitle')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['education', 'science', 'medicine', 'studentCare'].map((valueKey) => {
              const IconComponent = valueIcons[valueKey];
              return (
                <div key={valueKey} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <IconComponent className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t(`mission.values.${valueKey}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`mission.values.${valueKey}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Development Priorities */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            {t('mission.prioritiesTitle')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-4">
              {t('mission.priorities', { returnObjects: true }).map((priority, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 leading-relaxed">{priority}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;