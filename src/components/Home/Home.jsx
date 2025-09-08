import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const API_BASE_URL = 'http://localhost:8000/api';

const HeroSlider = () => {
  const { i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Загрузка баннеров из API
  useEffect(() => {
    fetchBanners();
  }, [i18n.language]);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching banners from:', `${API_BASE_URL}/banners/`);
      console.log('Current language:', i18n.language);
      
      const response = await fetch(`${API_BASE_URL}/banners/`, {
        headers: {
          'Accept-Language': i18n.language === 'kg' ? 'ky' : i18n.language,
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Banners data received:', data);
      
      // Обрабатываем разные форматы ответа
      const banners = data.results || data;
      
      // Если нет данных, используем fallback
      if (banners.length === 0) {
        throw new Error('No banners received from API');
      }
      
      setSlides(banners);
      
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
      // Fallback данные на случай ошибки
      setSlides([
        {
          id: 1,
          title: i18n.language === 'kg' ? "Медицинадагы кесип баштоо" : "Начни карьеру в медицине",
          subtitle: i18n.language === 'kg' ? "Келечек врачтар коомунун бир бөлүгү бол" : "Стань частью сообщества будущих врачей",
          image: "https://img2.rtve.es/i/?w=1600&i=01712310257437.jpg",
        },
        {
          id: 2,
          title: i18n.language === 'kg' ? "Эл аралык билим берүү стандарттары" : "Международные стандарты образования",
          subtitle: i18n.language === 'kg' ? "Дүйнөлүк талаптарга жооп берген билим берүү" : "Образование, соответствующее мировым требованиям",
          image: "https://www.fundacionhergar.org/sites/fundacionhergar.org/files/GettyImages-1961399015.jpg",
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Автопрокрутка каждые 6 секунд
  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Переход к конкретному слайду
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Переход к следующему слайду
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  // Переход к предыдущему слайду
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  // Обработчик ошибок изображений
  const handleImageError = (index) => {
    console.error(`Image failed to load for slide ${index}`);
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Полный URL для изображения
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      console.warn('Empty image path');
      return '';
    }
    
    console.log('Original image path:', imagePath);
    
    // Если это уже полный URL (http/https)
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Для медиафайлов Django
    if (imagePath.startsWith('/media/')) {
      const url = `http://localhost:8000${imagePath}`;
      console.log('Media file URL:', url);
      return url;
    }
    
    // Для любых других путей
    const url = `http://localhost:8000${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
    console.log('Other path URL:', url);
    return url;
  };

  if (loading) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    console.error('Banner error:', error);
  }

  console.log('Slides to render:', slides);

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600 mb-4">Ката: {error || 'Маалымат жок'}</p>
          <button 
            onClick={fetchBanners}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Кайра аракет кылуу
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Контейнер слайдов */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => {
          // Пробуем разные возможные поля для изображения
          const imagePath = slide.image || slide.image_url || slide.photo || slide.photo_url || slide.banner_image;
          const imageUrl = getImageUrl(imagePath);
          const hasImageError = imageErrors[index];
          
          console.log(`Slide ${index}:`, slide);
          console.log(`Image path ${index}:`, imagePath);
          console.log(`Image URL ${index}:`, imageUrl);
          console.log(`Image error ${index}:`, hasImageError);
          
          return (
            <div 
              key={slide.id || index} 
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Фоновое изображение */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: hasImageError 
                    ? 'linear-gradient(to right, #4F46E5, #7C3AED)'
                    : `url(${imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!hasImageError && (
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                )}
                
                {/* Скрытый img для обработки ошибок */}
                <img 
                  src={imageUrl}
                  alt=""
                  className="hidden"
                  onError={() => handleImageError(index)}
                  onLoad={() => console.log(`Image loaded: ${imageUrl}`)}
                />
              </div>
              
              {/* Контент слайда */}
              <div className="relative z-10 flex flex-col justify-end items-center h-full pb-8 md:pb-20 lg:pb-24 px-4 sm:px-8 md:px-14 text-white">
                <div className="bg-gradient-to-r from-gray-900/90 to-purple-900/60 backdrop-blur-xl p-6 md:p-8 rounded-3xl max-w-2xl transform transition-all duration-700 hover:scale-[1.02] border border-white/10 shadow-2xl shadow-purple-500/10 mx-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed font-light">
                    {slide.subtitle}
                  </p>
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-lg -z-10"></div>
                </div>

                <div className="absolute -left-20 -top-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Навигационные кнопки (только если больше 1 слайда) */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-100 text-blue-900 p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
            aria-label={i18n.language === 'kg' ? "Мурунку слайд" : "Предыдущий слайд"}
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-100 text-blue-900 p-2 sm:p-3 rounded-full transition-all duration-300 z-20"
            aria-label={i18n.language === 'kg' ? "Кийинки слайд" : "Следующий слайд"}
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Индикаторы прогресса (только если больше 1 слайда) */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-8 sm:w-12 h-2 rounded-full overflow-hidden bg-white bg-opacity-40 transition-all duration-300 hover:bg-opacity-60"
              aria-label={i18n.language === 'kg' ? `Слайдга өтүү ${index + 1}` : `Перейти к слайду ${index + 1}`}
            >
              <div 
                className={`h-full bg-white transition-all duration-1000 ease-linear ${currentSlide === index ? 'w-full' : 'w-0'}`}
              ></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;