import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Hospitals = () => {
  const { t, i18n } = useTranslation();
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    // Fetch hospitals from Django API
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/infrastructure/hospitals/');
        if (response.ok) {
          const data = await response.json();
          setHospitals(data.results || data); // Handle both paginated and non-paginated responses
        } else {
          console.error('Failed to fetch hospitals:', response.statusText);
          // Fallback to mock data if API fails
          setHospitals(getMockHospitals());
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        // Fallback to mock data if API fails
        setHospitals(getMockHospitals());
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const getMockHospitals = () => {
    return [
      {
        id: 1,
        name: {
          ru: "Клиника Салымбеков Университета",
          kg: "Салымбеков университетинин клиникасы",
          en: "Salymbekov University Clinic"
        },
        photo: "/images/hospital1.jpg",
        description: {
          ru: "Главная клиническая база университета для подготовки медицинских кадров",
          kg: "Медициналык кадрларды даярдоо үчүн университеттин негизги клиникалык базасы",
          en: "Main clinical base of the university for medical training"
        },
        departments: [
          {
            name: { ru: "Терапевтическое отделение", kg: "Терапевтикалык бөлүм", en: "Therapeutic Department" },
            description: { ru: "Практика в общей терапии", kg: "Жалпы терапиядагы практика", en: "General therapy practice" }
          },
          {
            name: { ru: "Хирургическое отделение", kg: "Хирургиялык бөлүм", en: "Surgical Department" },
            description: { ru: "Работа в операционных", kg: "Операция бөлмөсүндө иштөө", en: "Operating room work" }
          },
          {
            name: { ru: "Педиатрическое отделение", kg: "Педиатриялык бөлүм", en: "Pediatric Department" },
            description: { ru: "Работа с детьми", kg: "Балдар менен иштөө", en: "Working with children" }
          }
        ],
        practiceOpportunities: {
          ru: "Студенты могут участвовать в обходах врачей, наблюдать операции, работать с пациентами под контролем преподавателей",
          kg: "Студенттер дарыгерлердин айланышына катыша алышат, операцияларды көрө алышат, мугалимдердин көзөмөлү астында пациенттер менен иштей алышат",
          en: "Students can participate in medical rounds, observe surgeries, work with patients under supervision"
        },
        address: {
          ru: "г. Бишкек, ул. Медицинская, 1",
          kg: "Бишкек шаары, Медициналык көчөсү, 1",
          en: "Bishkek, Medical Street, 1"
        },
        contact: "+996 312 123-456"
      },
      {
        id: 2,
        name: {
          ru: "Детская клиническая больница",
          kg: "Балдар клиникалык ооруканасы",
          en: "Children's Clinical Hospital"
        },
        photo: "/images/hospital2.jpg",
        description: {
          ru: "Специализированная детская больница для педиатрической практики",
          kg: "Педиатриялык практика үчүн адистештирилген балдар ооруканасы",
          en: "Specialized children's hospital for pediatric practice"
        },
        departments: [
          {
            name: { ru: "Неонатология", kg: "Неонатология", en: "Neonatology" },
            description: { ru: "Работа с новорожденными", kg: "Жаңы төрөлгөн балдар менен иштөө", en: "Working with newborns" }
          },
          {
            name: { ru: "Детская хирургия", kg: "Балдар хирургиясы", en: "Pediatric Surgery" },
            description: { ru: "Хирургические вмешательства у детей", kg: "Балдарда хирургиялык кийлигишүүлөр", en: "Surgical interventions in children" }
          }
        ],
        practiceOpportunities: {
          ru: "Практика по детской медицине, участие в лечении детей различных возрастов",
          kg: "Балдар медицинасы боюнча практика, ар түрдүү курактагы балдарды дарылоого катышуу",
          en: "Pediatric medicine practice, participation in treating children of various ages"
        },
        address: {
          ru: "г. Бишкек, ул. Детская, 15",
          kg: "Бишкек шаары, Балдар көчөсү, 15",
          en: "Bishkek, Children's Street, 15"
        },
        contact: "+996 312 654-321"
      }
    ];
  };

  const getCurrentLanguage = () => {
    return ['ru', 'kg', 'en'].includes(i18n.language) ? i18n.language : 'ru';
  };

  // Helper function to get translated field value
  const getTranslatedField = (obj, fieldPrefix) => {
    const lang = getCurrentLanguage();
    return obj[`${fieldPrefix}_${lang}`] || obj[`${fieldPrefix}_ru`] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('hospitals.title', 'Больницы и клиники')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('hospitals.subtitle', 'Список университетских клиник и больниц для практики студентов')}
          </p>
        </div>

        <div className="grid gap-8">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={hospital.photo || hospital.photo_url || `https://via.placeholder.com/400x300?text=${encodeURIComponent(getTranslatedField(hospital, 'name'))}`}
                    alt={getTranslatedField(hospital, 'name')}
                    className="w-full h-64 md:h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Hospital+Photo';
                    }}
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    {getTranslatedField(hospital, 'name')}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {getTranslatedField(hospital, 'description')}
                  </p>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {t('hospitals.address', 'Адрес')}:
                    </h3>
                    <p className="text-gray-600">{getTranslatedField(hospital, 'address')}</p>
                    <p className="text-gray-600">{t('hospitals.contact', 'Контакт')}: {hospital.contact_phone || hospital.contact}</p>
                  </div>

                  <button
                    onClick={() => setSelectedHospital(selectedHospital === hospital.id ? null : hospital.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {selectedHospital === hospital.id
                      ? t('hospitals.hideDetails', 'Скрыть детали')
                      : t('hospitals.showDetails', 'Показать детали')
                    }
                  </button>
                </div>
              </div>

              {selectedHospital === hospital.id && (
                <div className="bg-gray-50 p-6 border-t">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('hospitals.departments', 'Отделения')}
                      </h3>
                      <div className="space-y-3">
                        {(hospital.departments || []).map((dept, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg shadow">
                            <h4 className="font-semibold text-gray-800">
                              {getTranslatedField(dept, 'name')}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {getTranslatedField(dept, 'description')}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {t('hospitals.practiceOpportunities', 'Возможности для практики')}
                      </h3>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-gray-700">
                          {getTranslatedField(hospital, 'practice_opportunities') ||
                            (hospital.practiceOpportunities && hospital.practiceOpportunities[getCurrentLanguage()]) ||
                            t('hospitals.defaultPractice', 'Возможности для практики в данной больнице')}
                        </p>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          {t('hospitals.practiceFeatures', 'Особенности практики')}
                        </h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {t('hospitals.feature1', 'Работа с реальными пациентами')}
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {t('hospitals.feature2', 'Наблюдение операций')}
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {t('hospitals.feature3', 'Супервизия опытных врачей')}
                          </li>
                          <li className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {t('hospitals.feature4', 'Доступ к медицинскому оборудованию')}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {t('hospitals.practiceInfo', 'Информация о практике')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold mb-2">{t('hospitals.schedule', 'График практики')}:</h3>
              <p>{t('hospitals.scheduleText', 'Практика проводится согласно учебному плану, обычно 4-6 часов в день')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('hospitals.requirements', 'Требования')}:</h3>
              <p>{t('hospitals.requirementsText', 'Медицинская книжка, белый халат, сменная обувь, студенческий билет')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('hospitals.duration', 'Продолжительность')}:</h3>
              <p>{t('hospitals.durationText', 'От 2 недель до 2 месяцев в зависимости от курса и специализации')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t('hospitals.coordination', 'Координация')}:</h3>
              <p>{t('hospitals.coordinationText', 'Практика организуется деканатом совместно с администрацией больниц')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;