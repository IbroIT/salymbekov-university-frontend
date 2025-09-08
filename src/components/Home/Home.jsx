import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Начни карьеру в медицине",
      subtitle: "Стань частью сообщества будущих врачей",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Международные стандарты образования",
      subtitle: "Образование, соответствующее мировым требованиям",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Современные симуляционные центры",
      subtitle: "Отрабатывайте навыки на передовом оборудовании",
      image: "https://images.unsplash.com/photo-1582719471384-894e35a4b48f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Клиническая практика с первого курса",
      subtitle: "Реальный опыт работы с пациентами с самого начала",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    }
  ];

  // Автопрокрутка каждые 6 секунд
  useEffect(() => {
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Контейнер слайдов */}
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-full h-screen flex-shrink-0 relative"
          >
            {/* Фоновое изображение */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
            </div>
            
            {/* Контент слайда */}
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fadeIn">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fadeIn delay-200">
                {slide.subtitle}
              </p>
              
            </div>
          </div>
        ))}
      </div>
      
      {/* Навигационные кнопки */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-100 text-blue-900 p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Предыдущий слайд"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-100 text-blue-900 p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Следующий слайд"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Индикаторы прогресса */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="w-12 h-2 rounded-full overflow-hidden bg-white bg-opacity-40"
            aria-label={`Перейти к слайду ${index + 1}`}
          >
            <div 
              className={`h-full bg-white transition-all duration-1000 ease-linear ${currentSlide === index ? 'w-full' : 'w-0'}`}
              style={{ transition: currentSlide === index ? 'width 6s linear' : 'none' }}
            ></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;