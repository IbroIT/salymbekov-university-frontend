import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MedicalUniversityReviews = () => {
  const { t, i18n } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('next');

  const reviews = [
    {
      id: 1,
      nameKey: 'reviews.student1.name',
      facultyKey: 'reviews.student1.faculty',
      courseKey: 'reviews.student1.course',
      textKey: 'reviews.student1.text',
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      nameKey: 'reviews.student2.name',
      facultyKey: 'reviews.student2.faculty',
      courseKey: 'reviews.student2.course',
      textKey: 'reviews.student2.text',
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      nameKey: 'reviews.student3.name',
      facultyKey: 'reviews.student3.faculty',
      courseKey: 'reviews.student3.course',
      textKey: 'reviews.student3.text',
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      nameKey: 'reviews.student4.name',
      facultyKey: 'reviews.student4.faculty',
      courseKey: 'reviews.student4.course',
      textKey: 'reviews.student4.text',
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      nameKey: 'reviews.student5.name',
      facultyKey: 'reviews.student5.faculty',
      courseKey: 'reviews.student5.course',
      textKey: 'reviews.student5.text',
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];



  // Автопрокрутка
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setDirection('next');
      setCurrentIndex((prevIndex) =>
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  const goToNext = () => {
    setDirection('next');
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
  };

  const goToPrevious = () => {
    setDirection('prev');
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
  };

  const goToSlide = (slideIndex) => {
    setDirection(slideIndex > currentIndex ? 'next' : 'prev');
    setCurrentIndex(slideIndex);
  };

  // Анимация появления
  const getSlideAnimation = (index) => {
    if (index === currentIndex) {
      return direction === 'next'
        ? 'animate-fade-in-right'
        : 'animate-fade-in-left';
    }
    return 'opacity-0 absolute';
  };

  return (
    <section className="py-8 md:py-16 relative overflow-hidden">
      {/* Декоративные элементы - скрыты на мобильных */}
      <div className="hidden md:block absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
      <div className="hidden md:block absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full translate-x-20 translate-y-20 opacity-30"></div>
      <div className="hidden md:block absolute top-1/2 left-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-900 mb-3 md:mb-4">{t('reviews.title')}</h2>
        <p className="text-sm md:text-lg text-center text-blue-700 mb-8 md:mb-12 max-w-2xl mx-auto">
          {t('reviews.subtitle')}
        </p>

        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-auto md:h-96 overflow-visible">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`transition-all duration-500 ease-in-out ${getSlideAnimation(index)}`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  zIndex: index === currentIndex ? 10 : 0
                }}
              >
                <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-8 flex flex-col md:flex-row items-center h-full mx-2 md:mx-4 transform transition-transform duration-300 hover:scale-105">
                  <div className="w-full md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={t(review.nameKey)}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                      />
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold py-1 px-2 md:px-3 rounded-full whitespace-nowrap">
                        {t(review.courseKey)}
                      </div>
                    </div>
                    <h3 className="font-bold text-blue-900 mt-4 text-lg md:text-xl text-center">{t(review.nameKey)}</h3>
                    <p className="text-blue-700 text-center text-sm md:text-base">{t(review.facultyKey)}</p>
                  </div>

                  <div className="w-full md:w-2/3 md:pl-8 flex flex-col justify-center">
                    {/* <div className="flex justify-center md:justify-start mb-3 md:mb-4">
                      {renderStars(review.rating)}
                    </div> */}

                    <div className="relative">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-100 absolute -left-2 md:-left-4 -top-1 md:-top-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-700 text-sm md:text-lg leading-relaxed pl-4 md:pl-6 text-center md:text-left">
                        {t(review.textKey)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Кнопки навигации - уменьшены на мобильных */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
            aria-label={t('reviews.previousButton')}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 bg-blue-600 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
            aria-label={t('reviews.nextButton')}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center mt-6 md:mt-10">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full mx-1 md:mx-2 transition-all duration-300 ${currentIndex === index ? 'bg-blue-600 scale-125' : 'bg-blue-300 hover:bg-blue-400'}`}
              aria-label={`${t('reviews.goToReview')} ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Медицинские иконки - скрыты на мобильных */}
      <div className="hidden md:block absolute bottom-10 left-10 opacity-10">
        <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.649 5.286l-7.65-3.428-7.65 3.428c-.641.287-.641 1.497 0 1.784l7.65 3.428 7.65-3.428c.641-.287.641-1.497 0-1.784zm-7.65 11.428l-7.65-3.428v6.856c0 .947.756 1.714 1.688 1.714h11.924c.932 0 1.688-.767 1.688-1.714v-6.856l-7.65 3.428z" />
        </svg>
      </div>

      <div className="hidden md:block absolute top-10 right-10 opacity-10">
        <svg className="w-20 h-20 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
    </section>
  );
};

export default MedicalUniversityReviews;