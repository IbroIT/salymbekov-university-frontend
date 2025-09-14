import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Dormitories = () => {
  const { t, i18n } = useTranslation();
  const [dormitories, setDormitories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDorm, setSelectedDorm] = useState(null);
  const [activeTab, setActiveTab] = useState('dormitories');

  useEffect(() => {
    // Fetch dormitories from Django API
    const fetchDormitories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/infrastructure/dormitories/');
        if (response.ok) {
          const data = await response.json();
          const dormitoriesData = data.results || data;
          setDormitories(dormitoriesData);
        } else {
          console.error('Failed to fetch dormitories:', response.statusText);
          // Fallback to mock data if API fails
          setDormitories(getMockDormitories());
        }
      } catch (error) {
        console.error('Error fetching dormitories:', error);
        // Fallback to mock data if API fails
        setDormitories(getMockDormitories());
      } finally {
        setLoading(false);
      }
    };

    fetchDormitories();
  }, []);

  const getMockDormitories = () => {
    return [
      {
        id: 1,
        name: {
          ru: "Общежитие №1 (Женское)",
          kg: "№1 жатакана (Аялдар)",
          en: "Dormitory #1 (Female)"
        },
        address: {
          ru: "г. Бишкек, ул. Студенческая, 10",
          kg: "Бишкек шаары, Студенттик көчө, 10",
          en: "Bishkek, Student Street, 10"
        },
        type: "female",
        capacity: 200,
        available: 15,
        description: {
          ru: "Комфортабельное общежитие для студенток с современными удобствами",
          kg: "Заманбап ыңгайлуулуктары бар студенттер үчүн ыңгайлуу жатакана",
          en: "Comfortable dormitory for female students with modern amenities"
        },
        rooms: [
          {
            type: "double",
            name: { ru: "Двухместная комната", kg: "Эки жактуу бөлмө", en: "Double room" },
            price: { ru: "3500 сом/месяц", kg: "3500 сом/ай", en: "3500 som/month" },
            features: { ru: "2 кровати, 2 стола, шкаф, Wi-Fi", kg: "2 керебет, 2 стол, шкаф, Wi-Fi", en: "2 beds, 2 desks, wardrobe, Wi-Fi" }
          },
          {
            type: "triple",
            name: { ru: "Трёхместная комната", kg: "Үч жактуу бөлмө", en: "Triple room" },
            price: { ru: "2800 сом/месяц", kg: "2800 сом/ай", en: "2800 som/month" },
            features: { ru: "3 кровати, 3 стола, шкаф, Wi-Fi", kg: "3 керебет, 3 стол, шкаф, Wi-Fi", en: "3 beds, 3 desks, wardrobe, Wi-Fi" }
          }
        ],
        facilities: [
          { ru: "Общая кухня на этаже", kg: "Кабатта жалпы ашкана", en: "Shared kitchen per floor" },
          { ru: "Прачечная", kg: "Кир жуучу жай", en: "Laundry room" },
          { ru: "Комната отдыха", kg: "Эс алуу бөлмөсү", en: "Recreation room" },
          { ru: "Круглосуточная охрана", kg: "Тун-күн коргоо", en: "24/7 security" },
          { ru: "Wi-Fi интернет", kg: "Wi-Fi интернет", en: "Wi-Fi internet" }
        ],
        photos: [
          { type: "exterior", url: "/images/dorm1_exterior.jpg" },
          { type: "room", url: "/images/dorm1_room.jpg" },
          { type: "kitchen", url: "/images/dorm1_kitchen.jpg" },
          { type: "common", url: "/images/dorm1_common.jpg" }
        ]
      },
      {
        id: 2,
        name: {
          ru: "Общежитие №2 (Мужское)",
          kg: "№2 жатакана (Эркектер)",
          en: "Dormitory #2 (Male)"
        },
        address: {
          ru: "г. Бишкек, ул. Студенческая, 12",
          kg: "Бишкек шаары, Студенттик көчө, 12",
          en: "Bishkek, Student Street, 12"
        },
        type: "male",
        capacity: 180,
        available: 8,
        description: {
          ru: "Современное общежитие для студентов с отличными условиями проживания",
          kg: "Мыкты жашоо шарттары бар студенттер үчүн заманбап жатакана",
          en: "Modern dormitory for male students with excellent living conditions"
        },
        rooms: [
          {
            type: "double",
            name: { ru: "Двухместная комната", kg: "Эки жактуу бөлмө", en: "Double room" },
            price: { ru: "3500 сом/месяц", kg: "3500 сом/ай", en: "3500 som/month" },
            features: { ru: "2 кровати, 2 стола, шкаф, Wi-Fi", kg: "2 керебет, 2 стол, шкаф, Wi-Fi", en: "2 beds, 2 desks, wardrobe, Wi-Fi" }
          },
          {
            type: "triple",
            name: { ru: "Трёхместная комната", kg: "Үч жактуу бөлмө", en: "Triple room" },
            price: { ru: "2800 сом/месяц", kg: "2800 сом/ай", en: "2800 som/month" },
            features: { ru: "3 кровати, 3 стола, шкаф, Wi-Fi", kg: "3 керебет, 3 стол, шкаф, Wi-Fi", en: "3 beds, 3 desks, wardrobe, Wi-Fi" }
          }
        ],
        facilities: [
          { ru: "Общая кухня на этаже", kg: "Кабатта жалпы ашкана", en: "Shared kitchen per floor" },
          { ru: "Прачечная", kg: "Кир жуучу жай", en: "Laundry room" },
          { ru: "Спортивная комната", kg: "Спорт бөлмөсү", en: "Sports room" },
          { ru: "Круглосуточная охрана", kg: "Тун-күн коргоо", en: "24/7 security" },
          { ru: "Wi-Fi интернет", kg: "Wi-Fi интернет", en: "Wi-Fi internet" }
        ],
        photos: [
          { type: "exterior", url: "/images/dorm2_exterior.jpg" },
          { type: "room", url: "/images/dorm2_room.jpg" },
          { type: "kitchen", url: "/images/dorm2_kitchen.jpg" },
          { type: "sports", url: "/images/dorm2_sports.jpg" }
        ]
      },
      {
        id: 3,
        name: {
          ru: "Семейное общежитие",
          kg: "Үй-бүлөлүк жатакана",
          en: "Family Dormitory"
        },
        address: {
          ru: "г. Бишкек, ул. Семейная, 5",
          kg: "Бишкек шаары, Үй-бүлөлүк көчө, 5",
          en: "Bishkek, Family Street, 5"
        },
        type: "family",
        capacity: 50,
        available: 3,
        description: {
          ru: "Общежитие для семейных студентов с отдельными квартирами",
          kg: "Өзүнчө батирлары бар үй-бүлөлүү студенттер үчүн жатакана",
          en: "Dormitory for married students with separate apartments"
        },
        rooms: [
          {
            type: "studio",
            name: { ru: "Студия", kg: "Студия", en: "Studio" },
            price: { ru: "8000 сом/месяц", kg: "8000 сом/ай", en: "8000 som/month" },
            features: { ru: "Спальня, кухня, санузел, Wi-Fi", kg: "Уктоочу бөлмө, ашкана, даарет, Wi-Fi", en: "Bedroom, kitchen, bathroom, Wi-Fi" }
          },
          {
            type: "one_bedroom",
            name: { ru: "Однокомнатная", kg: "Бир бөлмөлүү", en: "One bedroom" },
            price: { ru: "12000 сом/месяц", kg: "12000 сом/ай", en: "12000 som/month" },
            features: { ru: "Отдельная спальня, кухня, санузел, Wi-Fi", kg: "Өзүнчө спальня, ашкана, даарет, Wi-Fi", en: "Separate bedroom, kitchen, bathroom, Wi-Fi" }
          }
        ],
        facilities: [
          { ru: "Детская игровая площадка", kg: "Балдар оюн аянты", en: "Children's playground" },
          { ru: "Общая прачечная", kg: "Жалпы кир жуучу жай", en: "Shared laundry" },
          { ru: "Парковочные места", kg: "Унаа токтотуу жерлери", en: "Parking spaces" },
          { ru: "Круглосуточная охрана", kg: "Тун-күн коргоо", en: "24/7 security" }
        ],
        photos: [
          { type: "exterior", url: "/images/family_dorm_exterior.jpg" },
          { type: "apartment", url: "/images/family_apartment.jpg" },
          { type: "playground", url: "/images/playground.jpg" },
          { type: "parking", url: "/images/parking.jpg" }
        ]
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

  const photoTypeNames = {
    exterior: { ru: "Внешний вид", kg: "Сырткы көрүнүш", en: "Exterior" },
    room: { ru: "Комната", kg: "Бөлмө", en: "Room" },
    kitchen: { ru: "Кухня", kg: "Ашкана", en: "Kitchen" },
    common: { ru: "Общая зона", kg: "Жалпы аймак", en: "Common area" },
    sports: { ru: "Спортивная комната", kg: "Спорт бөлмөсү", en: "Sports room" },
    apartment: { ru: "Квартира", kg: "Батир", en: "Apartment" },
    playground: { ru: "Игровая площадка", kg: "Оюн аянты", en: "Playground" },
    parking: { ru: "Парковка", kg: "Унаа токтотуу", en: "Parking" }
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
            {t('dormitories.title', 'Общежития университета')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('dormitories.subtitle', 'Комфортабельное проживание для студентов в современных общежитиях')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow p-1">
            <button
              onClick={() => setActiveTab('dormitories')}
              className={`px-6 py-2 rounded-md transition-colors ${activeTab === 'dormitories'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              {t('dormitories.dormitoriesTab', 'Общежития')}
            </button>
            <button
              onClick={() => setActiveTab('application')}
              className={`px-6 py-2 rounded-md transition-colors ${activeTab === 'application'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
                }`}
            >
              {t('dormitories.applicationTab', 'Порядок заселения')}
            </button>
          </div>
        </div>

        {activeTab === 'dormitories' && (
          <div className="space-y-8">
            {dormitories.map((dorm) => (
              <div key={dorm.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={dorm.photo || dorm.photo_url ||
                        (dorm.photos && dorm.photos.find(p => p.type === 'exterior')?.url) ||
                        `https://via.placeholder.com/400x300?text=${encodeURIComponent(getTranslatedField(dorm, 'name'))}`}
                      alt={getTranslatedField(dorm, 'name')}
                      className="w-full h-64 md:h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Dormitory+Photo';
                      }}
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {getTranslatedField(dorm, 'name')}
                      </h2>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">
                          {t('dormitories.available', 'Доступно')}
                        </div>
                        <div className={`text-lg font-bold ${(dorm.available || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {dorm.available || 0} / {dorm.capacity || 100}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {getTranslatedField(dorm, 'description')}
                    </p>

                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {t('dormitories.address', 'Адрес')}:
                      </h3>
                      <p className="text-gray-600">{getTranslatedField(dorm, 'address')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {t('dormitories.roomTypes', 'Типы комнат')}:
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(dorm.rooms || []).map((room, index) => (
                            <li key={index}>
                              {getTranslatedField(room, 'name') || room.name} - {getTranslatedField(room, 'price') || room.price || '0 сом/месяц'}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {t('dormitories.mainFacilities', 'Основные удобства')}:
                        </h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {(dorm.facilities || []).slice(0, 3).map((facility, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {typeof facility === 'string' ? facility : getTranslatedField(facility, 'name') || facility[getCurrentLanguage()] || facility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedDorm(selectedDorm === dorm.id ? null : dorm.id)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {selectedDorm === dorm.id
                        ? t('dormitories.hideDetails', 'Скрыть детали')
                        : t('dormitories.showDetails', 'Показать детали')
                      }
                    </button>
                  </div>
                </div>

                {selectedDorm === dorm.id && (
                  <div className="bg-gray-50 p-6 border-t">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Room Details */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {t('dormitories.roomDetails', 'Подробности о комнатах')}
                        </h3>
                        <div className="space-y-4">
                          {dorm.rooms.map((room, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow">
                              <h4 className="font-semibold text-gray-800 mb-2">
                                {room.name[getCurrentLanguage()]}
                              </h4>
                              <p className="text-blue-600 font-medium mb-2">
                                {room.price[getCurrentLanguage()]}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {room.features[getCurrentLanguage()]}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            {t('dormitories.allFacilities', 'Все удобства')}
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {dorm.facilities.map((facility, index) => (
                              <div key={index} className="flex items-center text-gray-700">
                                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {facility[getCurrentLanguage()]}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Photo Gallery */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {t('dormitories.photos', 'Фотографии')}
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {dorm.photos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={photo.url}
                                alt={photoTypeNames[photo.type]?.[getCurrentLanguage()] || photo.type}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/200x150?text=Photo';
                                }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-sm font-medium">
                                  {photoTypeNames[photo.type]?.[getCurrentLanguage()] || photo.type}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'application' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {t('dormitories.applicationProcess', 'Порядок заселения в общежитие')}
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Required Documents */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('dormitories.requiredDocuments', 'Необходимые документы')}
                </h3>
                <ul className="space-y-3">
                  {[
                    { ru: "Заявление на заселение", kg: "Орнотууга арыз", en: "Application for accommodation" },
                    { ru: "Справка о доходах семьи", kg: "Үй-бүлөнүн кирешеси жөнүндө маалымат", en: "Family income certificate" },
                    { ru: "Медицинская справка (форма 086-у)", kg: "Медициналык справка (086-у форма)", en: "Medical certificate (form 086-u)" },
                    { ru: "Копия паспорта", kg: "Паспорттун көчүрмөсү", en: "Passport copy" },
                    { ru: "Фотографии 3x4 (2 шт.)", kg: "3x4 сүрөттөр (2 даана)", en: "Photos 3x4 (2 pieces)" },
                    { ru: "Справка о флюорографии", kg: "Флюорография жөнүндө справка", en: "Fluorography certificate" }
                  ].map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {doc[getCurrentLanguage()]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Process */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('dormitories.applicationSteps', 'Этапы подачи заявления')}
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: { ru: "Подача документов", kg: "Документтерди тапшыруу", en: "Document submission" },
                      desc: { ru: "Подача полного пакета документов в деканат", kg: "Толук документтерди деканатка тапшыруу", en: "Submit complete documents to dean's office" }
                    },
                    {
                      step: 2,
                      title: { ru: "Рассмотрение заявления", kg: "Арызды кароо", en: "Application review" },
                      desc: { ru: "Рассмотрение комиссией в течение 5-7 рабочих дней", kg: "Комиссия тарабынан 5-7 иш күнүнө каралат", en: "Commission review within 5-7 working days" }
                    },
                    {
                      step: 3,
                      title: { ru: "Уведомление о результате", kg: "Жыйынтык жөнүндө кабарлоо", en: "Result notification" },
                      desc: { ru: "Уведомление о предоставлении места", kg: "Орун берүү жөнүндө кабарлоо", en: "Notification about place allocation" }
                    },
                    {
                      step: 4,
                      title: { ru: "Заселение", kg: "Орношуу", en: "Check-in" },
                      desc: { ru: "Подписание договора и заселение", kg: "Келишимге кол коюу жана орношуу", en: "Contract signing and check-in" }
                    }
                  ].map((step) => (
                    <div key={step.step} className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {step.title[getCurrentLanguage()]}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {step.desc[getCurrentLanguage()]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('dormitories.contactInfo', 'Контактная информация')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('dormitories.dormitoryDepartment', 'Отдел общежитий')}
                  </h4>
                  <div className="text-gray-700 space-y-1">
                    <p>{t('dormitories.workingHours', 'Часы работы')}: {t('dormitories.schedule', 'Пн-Пт: 9:00-17:00')}</p>
                    <p>{t('dormitories.phone', 'Телефон')}: +996 312 123-456</p>
                    <p>Email: dormitory@salymbekov.edu.kg</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {t('dormitories.adminOffice', 'Администрация общежитий')}
                  </h4>
                  <div className="text-gray-700 space-y-1">
                    <p>{t('dormitories.emergencyContact', 'Экстренная связь')}: +996 555 123-456</p>
                    <p>{t('dormitories.administrator', 'Администратор')}: Петрова А.И.</p>
                    <p>{t('dormitories.address', 'Адрес')}: {t('dormitories.mainAddress', 'ул. Студенческая, 8 (главный офис)')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t('dormitories.importantNotes', 'Важные примечания')}
              </h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t('dormitories.note1', 'Приоритет отдается студентам из других регионов и малообеспеченным семьям')}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t('dormitories.note2', 'Оплата производится ежемесячно до 10 числа')}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t('dormitories.note3', 'Посещение общежития посторонними лицами ограничено с 22:00 до 6:00')}
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {t('dormitories.note4', 'В комнатах запрещено курение и употребление алкоголя')}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dormitories;