import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const StudentLife = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    {
      id: 1,
      src: '/images/student-life/1.jpg',
      alt: 'Студенты на лекции',
      category: 'Учеба'
    },
    {
      id: 2,
      src: '/images/student-life/2.jpg',
      alt: 'Научная конференция',
      category: 'Наука'
    },
    {
      id: 3,
      src: '/images/student-life/3.jpg',
      alt: 'Спортивные мероприятия',
      category: 'Спорт'
    },
    {
      id: 4,
      src: '/images/student-life/4.jpg',
      alt: 'Культурные события',
      category: 'Культура'
    },
    {
      id: 5,
      src: '/images/student-life/5.jpg',
      alt: 'Международные обмены',
      category: 'Международное'
    },
    {
      id: 6,
      src: '/images/student-life/6.jpg',
      alt: 'Волонтерская деятельность',
      category: 'Волонтерство'
    },
    {
      id: 7,
      src: '/images/student-life/7.jpg',
      alt: 'Лабораторные работы',
      category: 'Практика'
    },
    {
      id: 8,
      src: '/images/student-life/8.jpg',
      alt: 'Творческие вечера',
      category: 'Творчество'
    }
  ];

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {t('studentLife.title', 'Студенческая жизнь')}
            </motion.h1>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 1 }}
            ></motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        {/* Текстовая секция */}
        <motion.section
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <motion.div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-800 font-light">
                {t('studentLife.intro', 'Студенческая жизнь – это необыкновенное время, время открытий, накопления знаний, яркая и запоминающаяся пора.')}
              </p>
              
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                {t('studentLife.description', 'Это не только период лекций, семинаров и экзаменов, но так же и возможность проявить себя и в полной мере раскрыть свои способности.')}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Фотогалерея */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              {t('studentLife.galleryTitle', 'Фотогалерея')}
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
            ></motion.div>
          </div>

          {/* Сетка фотографий */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => openLightbox(image, index)}
              >
                {/* Заглушка для изображения */}
                <div className="aspect-square bg-gradient-to-br from-blue-200 to-cyan-200 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-6 h-6" />
                      <div className="text-blue-800 font-semibold">{image.category}</div>
                    </div>
                  </div>
                  
                  {/* Наложение при наведении */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <div className="text-lg font-semibold mb-1">{image.alt}</div>
                      <div className="text-sm">Нажмите для просмотра</div>
                    </div>
                  </div>
                </div>

                {/* Бейдж категории */}
                <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-6xl max-h-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors z-10"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>

              {/* Изображение */}
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-200 to-cyan-200 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-6 h-6" />
                    <div className="text-2xl font-semibold text-blue-800 mb-2">
                      {selectedImage.alt}
                    </div>
                    <div className="text-blue-600">{selectedImage.category}</div>
                  </div>
                </div>
              </div>

              {/* Навигация */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Индикатор */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentLife;