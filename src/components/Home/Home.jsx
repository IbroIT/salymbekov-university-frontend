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
      
      // Преобразуем баннеры
      const processedBanners = banners.map((banner) => ({
        id: banner.id,
        photo: banner.photo
      }));
      
      setSlides(processedBanners);
      
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
      // Fallback данные на случай ошибки
      setSlides([
        {
          id: 1,
          photo: "https://img2.rtve.es/i/?w=1600&i=01712310257437.jpg",
        },
        {
          id: 2,
          photo: "https://www.fundacionhergar.org/sites/fundacionhergar.org/files/GettyImages-1961399015.jpg",
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
  const handleImageError = (index, imageUrl) => {
    console.error(`Image failed to load for slide ${index}:`, imageUrl);
    console.log('Trying to decode URL:', decodeURIComponent(imageUrl));
    console.log('Trying to load image in a new tab to test accessibility...');
    
    // Попробуем загрузить изображение через fetch
    fetch(imageUrl, { method: 'HEAD', mode: 'cors' })
      .then(response => {
        console.log('Fetch test response:', response.status, response.statusText);
        if (!response.ok) {
          console.error('Fetch test failed:', response.status);
        }
      })
      .catch(error => {
        console.error('Fetch test error:', error);
      });
      
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Тестирование загрузки изображения
  const testImageLoad = async (imageUrl) => {
    try {
      console.log(`Testing image load: ${imageUrl}`);
      const response = await fetch(imageUrl, { method: 'HEAD' });
      console.log(`Image test result: ${response.status} ${response.statusText}`);
      return response.ok;
    } catch (error) {
      console.error(`Image test failed:`, error);
      return false;
    }
  };

  // Полный URL для изображения
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath === '') {
      console.warn('Empty or null image path');
      return null;
    }
    
    console.log('Original image path:', imagePath);
    
    // Если это уже полный URL (http/https)
    if (imagePath.startsWith('http')) {
      // Декодируем URL-кодированные символы
      try {
        const decodedUrl = decodeURIComponent(imagePath);
        console.log('Decoded URL:', decodedUrl);
        return imagePath; // Возвращаем оригинальный URL-кодированный URL
      } catch (error) {
        console.warn('Failed to decode URL:', error);
        return imagePath;
      }
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
          // Используем поле photo
          const imagePath = slide.photo;
          const imageUrl = getImageUrl(imagePath);
          const hasImageError = imageErrors[index];
          
          console.log(`Slide ${index}:`, slide);
          console.log(`Photo path ${index}:`, imagePath);
          console.log(`Image URL ${index}:`, imageUrl);
          console.log(`Image error ${index}:`, hasImageError);
          
          // Тестируем загрузку изображения
          if (imageUrl && !hasImageError) {
            testImageLoad(imageUrl);
          }
          
          return (
            <div 
              key={slide.id || index} 
              className="w-full h-full flex-shrink-0 relative"
            >
              {/* Фоновое изображение */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: (hasImageError || !imageUrl) 
                    ? 'linear-gradient(to right, #4F46E5, #7C3AED)'
                    : `url("${imageUrl}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {!hasImageError && imageUrl && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>
                )}
                
                {/* Отладочная информация в случае ошибки */}
                {hasImageError && (
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-800 bg-opacity-75">
                    <div className="text-center p-4">
                      <p className="text-lg mb-2">Изображение не загрузилось</p>
                      <p className="text-sm opacity-75 break-all">{imageUrl}</p>
                      <button 
                        onClick={() => window.open(imageUrl, '_blank')}
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Открыть в новой вкладке
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Отладочное img — показываем напрямую (object-cover) */}
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover z-50"
                    style={{ border: '2px solid rgba(255,0,0,0.6)' }}
                    onError={() => handleImageError(index, imageUrl)}
                    onLoad={() => console.log(`Image loaded: ${imageUrl}`)}
                  />
                )}
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