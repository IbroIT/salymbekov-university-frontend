import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const LifeOverview = () => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];

  // Данные для демонстрации (в реальном приложении будут приходить из пропсов или API)
  const photoUrls = Array(12).fill(null).map((_, i) => `https://picsum.photos/300/200?random=${i+1}`);
  const videoData = [
    { 
      id: 1, 
      titleKey: 'life.videos.festival.title',
      thumbnail: "https://picsum.photos/400/250?random=13", 
      url: "#",
      durationKey: 'life.videos.duration'
    },
    { 
      id: 2, 
      titleKey: 'life.videos.conference.title',
      thumbnail: "https://picsum.photos/400/250?random=14", 
      url: "#",
      durationKey: 'life.videos.duration'
    },
    { 
      id: 3, 
      titleKey: 'life.videos.sports.title',
      thumbnail: "https://picsum.photos/400/250?random=15", 
      url: "#",
      durationKey: 'life.videos.duration'
    }
  ];

  const stats = [
    { 
      value: '15+', 
      labelKey: 'life.stats.clubs.label'
    },
    { 
      value: '15', 
      labelKey: 'life.stats.events.label'
    },
    { 
      value: '1000+', 
      labelKey: 'life.stats.photos.label'
    }
  ];

  const handleVideoPlay = (index) => {
    if (activeVideo === index) {
      // Если кликаем на уже активное видео, останавливаем его
      videoRefs[index].current.pause();
      setActiveVideo(null);
    } else {
      // Останавливаем предыдущее видео и запускаем новое
      if (activeVideo !== null) {
        videoRefs[activeVideo].current.pause();
      }
      setActiveVideo(index);
      setTimeout(() => videoRefs[index].current.play(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          {t('life.title')}
        </h2>
        
        {/* Фото-коллаж */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            {t('life.photoCollage.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photoUrls.map((url, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img 
                  src={url} 
                  alt={t('life.photoCollage.alt', { number: index + 1 })} 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-blue-900 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 cursor-pointer"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Видео-репортажи */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            {t('life.videos.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoData.map((video, index) => (
              <div 
                key={video.id} 
                className="relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={t(video.titleKey)} 
                    className="w-full h-48 object-cover"
                  />
                  <div 
                    className={`absolute inset-0 flex items-center justify-center bg-blue-900 bg-opacity-50 transition-all duration-300 ${activeVideo === index ? 'opacity-0' : 'opacity-100 cursor-pointer'}`}
                    onClick={() => handleVideoPlay(index)}
                  >
                    <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <video
                    ref={videoRefs[index]}
                    className={`w-full h-48 object-cover ${activeVideo === index ? 'block' : 'hidden'}`}
                    controls={activeVideo === index}
                  >
                    <source src={video.url} type="video/mp4" />
                    {t('life.videos.browserSupport')}
                  </video>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-medium text-blue-900">
                    {t(video.titleKey)}
                  </h4>
                  <p className="text-blue-600">
                    {t(video.durationKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Цифры и статистика */}
        <div className="bg-blue-800 text-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            {t('life.stats.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-blue-700 rounded-xl transition-transform duration-300 hover:scale-105">
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl">{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifeOverview;