import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Media = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Данные о публикациях в СМИ
  const mediaData = [
    {
      id: 1,
      category: 'tv',
      outlet: 'КТР',
      title: {
        ru: 'Салымбековский Университет открывает новый симуляционный центр',
        en: 'Salymbekov University opens new simulation center',
        kg: 'Салымбеков Университети жаңы симуляциялык борбор ачат'
      },
      description: {
        ru: 'Репортаж о современном медицинском оборудовании в новом симуляционном центре университета',
        en: 'Report on modern medical equipment in the university\'s new simulation center',
        kg: 'Университеттин жаңы симуляциялык борборундагы заманбап медициналык жабдыктар жөнүндө репортаж'
      },
      date: '2024-11-15',
      image: 'https://images.unsplash.com/photo-1582719471384-894e35a4b48f?w=400&h=250&fit=crop',
      link: '#'
    },
    {
      id: 2,
      category: 'newspaper',
      outlet: 'Вечерний Бишкек',
      title: {
        ru: 'Университет готовит высококвалифицированных медиков',
        en: 'University trains highly qualified medical professionals',
        kg: 'Университет жогорку квалификациялуу медиктерди даярдайт'
      },
      description: {
        ru: 'Статья о качестве образования и достижениях выпускников Салымбековского Университета',
        en: 'Article about education quality and achievements of Salymbekov University graduates',
        kg: 'Салымбеков Университетинин бүтүрүүчүлөрүнүн жетишкендиктери жана билим берүүнүн сапаты жөнүндө макала'
      },
      date: '2024-11-10',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop',
      link: '#'
    },
    {
      id: 3,
      category: 'online',
      outlet: '24.kg',
      title: {
        ru: 'Международное сотрудничество в медицинском образовании',
        en: 'International cooperation in medical education',
        kg: 'Медициналык билим берүүдөгү эл аралык кызматташтык'
      },
      description: {
        ru: 'Материал о партнерстве университета с международными медицинскими организациями',
        en: 'Article about university partnerships with international medical organizations',
        kg: 'Университеттин эл аралык медициналык уюмдар менен өнөктөштүгү жөнүндө материал'
      },
      date: '2024-11-05',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop',
      link: '#'
    },
    {
      id: 4,
      category: 'radio',
      outlet: 'Биринчи радио',
      title: {
        ru: 'Студенты-медики помогают в борьбе с эпидемиями',
        en: 'Medical students help fight epidemics',
        kg: 'Медик студенттер эпидемияларга каршы күрөшүүдө жардам беришет'
      },
      description: {
        ru: 'Интервью с деканом о вкладе студентов в общественное здравоохранение',
        en: 'Interview with the dean about students\' contribution to public health',
        kg: 'Студенттердин коомдук саламаттыкка кошкон салымы жөнүндө декан менен маек'
      },
      date: '2024-10-28',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
      link: '#'
    },
    {
      id: 5,
      category: 'tv',
      outlet: 'НТС',
      title: {
        ru: 'Выпускники университета работают по всему Кыргызстану',
        en: 'University graduates work throughout Kyrgyzstan',
        kg: 'Университеттин бүтүрүүчүлөрү бүткүл Кыргызстан боюнча иштешет'
      },
      description: {
        ru: 'Сюжет о том, как выпускники укрепляют систему здравоохранения страны',
        en: 'Story about how graduates strengthen the country\'s healthcare system',
        kg: 'Бүтүрүүчүлөр өлкөнүн саламаттыкты сактоо системасын кантип күчөтүп жатканы жөнүндө сюжет'
      },
      date: '2024-10-20',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop',
      link: '#'
    },
    {
      id: 6,
      category: 'online',
      outlet: 'Kaktus.media',
      title: {
        ru: 'Инновации в медицинском образовании',
        en: 'Innovations in medical education',
        kg: 'Медициналык билим берүүдөгү инновациялар'
      },
      description: {
        ru: 'Обзор современных методов обучения, применяемых в Салымбековском Университете',
        en: 'Overview of modern teaching methods used at Salymbekov University',
        kg: 'Салымбеков Университетинде колдонулган заманбап окутуу методдорунун көз жугуртуусу'
      },
      date: '2024-10-15',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      link: '#'
    }
  ];

  const categories = [
    { id: 'all', name: { ru: 'Все', en: 'All', kg: 'Баары' }, icon: '📺' },
    { id: 'tv', name: { ru: 'Телевидение', en: 'Television', kg: 'Телевидение' }, icon: '📺' },
    { id: 'newspaper', name: { ru: 'Газеты', en: 'Newspapers', kg: 'Гезиттер' }, icon: '📰' },
    { id: 'online', name: { ru: 'Интернет', en: 'Online', kg: 'Интернет' }, icon: '💻' },
    { id: 'radio', name: { ru: 'Радио', en: 'Radio', kg: 'Радио' }, icon: '📻' }
  ];

  useEffect(() => {
    // Имитация загрузки
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const getLocalizedContent = (content) => {
    if (typeof content === 'object') {
      return content[i18n.language] || content.ru || content.en || content.kg || '';
    }
    return content;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(i18n.language === 'kg' ? 'ky-KG' : i18n.language, options);
  };

  const filteredMedia = selectedCategory === 'all' 
    ? mediaData 
    : mediaData.filter(item => item.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'tv': return '📺';
      case 'newspaper': return '📰';
      case 'online': return '💻';
      case 'radio': return '📻';
      default: return '📄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Загрузка медиа-материалов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок страницы */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {getLocalizedContent({
                ru: 'СМИ о нас',
                en: 'Media about us',
                kg: 'БМКлар биз жөнүндө'
              })}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {getLocalizedContent({
                ru: 'Узнайте, что говорят ведущие медиа-издания о Салымбековском Университете и наших достижениях в медицинском образовании',
                en: 'Learn what leading media outlets say about Salymbekov University and our achievements in medical education',
                kg: 'Алдыңкы БМК жарыялоочулар Салымбеков Университети жана медициналык билим берүүдөгү биздин жетишкендиктер жөнүндө эмне дешет'
              })}
            </p>
            <div className="flex items-center justify-center text-blue-200">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>
                {getLocalizedContent({
                  ru: 'Более 50 публикаций за последний год',
                  en: 'Over 50 publications in the last year',
                  kg: 'Акыркы жылда 50дон ашык жарыялоо'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Фильтры по категориям */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              <span className="mr-2 text-lg">{category.icon}</span>
              {getLocalizedContent(category.name)}
            </button>
          ))}
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600">
              {getLocalizedContent({
                ru: 'ТВ сюжетов',
                en: 'TV reports',
                kg: 'ТВ репортаждар'
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
            <div className="text-gray-600">
              {getLocalizedContent({
                ru: 'Статей в прессе',
                en: 'Press articles',
                kg: 'Басма сөздөгү макалалар'
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">20+</div>
            <div className="text-gray-600">
              {getLocalizedContent({
                ru: 'Онлайн публикаций',
                en: 'Online publications',
                kg: 'Онлайн жарыялоолор'
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
            <div className="text-gray-600">
              {getLocalizedContent({
                ru: 'Радио интервью',
                en: 'Radio interviews',
                kg: 'Радио маектер'
              })}
            </div>
          </div>
        </div>

        {/* Список медиа-материалов */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Изображение */}
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={getLocalizedContent(item.title)}
                  className="w-full h-48 object-cover"
                />
                {/* Тип медиа */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <span className="mr-1">{getCategoryIcon(item.category)}</span>
                    {item.outlet}
                  </span>
                </div>
                {/* Дата */}
                <div className="absolute bottom-4 right-4">
                  <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {formatDate(item.date)}
                  </span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {getLocalizedContent(item.title)}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {getLocalizedContent(item.description)}
                </p>
                
                {/* Кнопка просмотра */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    {item.outlet}
                  </span>
                  <a 
                    href={item.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                  >
                    <span>
                      {getLocalizedContent({
                        ru: 'Читать',
                        en: 'Read',
                        kg: 'Окуу'
                      })}
                    </span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {getLocalizedContent({
              ru: 'Хотите узнать больше?',
              en: 'Want to learn more?',
              kg: 'Көбүрөөк билгиңиз келеби?'
            })}
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            {getLocalizedContent({
              ru: 'Следите за нашими новостями и достижениями в социальных сетях и на официальном сайте университета',
              en: 'Follow our news and achievements on social media and the university\'s official website',
              kg: 'Биздин жаңылыктарды жана жетишкендиктерди социалдык тармактарда жана университеттин расмий сайтында көзөмөлдөңүз'
            })}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {getLocalizedContent({
                ru: 'Наш сайт',
                en: 'Our website',
                kg: 'Биздин сайт'
              })}
            </a>
            <a 
              href="#" 
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              {getLocalizedContent({
                ru: 'Социальные сети',
                en: 'Social media',
                kg: 'Социалдык тармактар'
              })}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
