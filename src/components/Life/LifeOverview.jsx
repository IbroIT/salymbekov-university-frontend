import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LifeOverview = () => {
  const { t } = useTranslation();
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  
  // API state
  const [lifeData, setLifeData] = useState({
    photo_urls: [],
    video_data: [],
    stats: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch life overview data from API
  useEffect(() => {
    const fetchLifeData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/student-life/api/data/life_overview_data/');
        if (!response.ok) {
          throw new Error('Failed to fetch life overview data');
        }
        const data = await response.json();
        setLifeData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching life overview data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLifeData();
  }, []);

  // Use video data from API
  const videoData = lifeData.video_data.map((video, index) => ({
    ...video,
    thumbnail: video.thumbnail || `https://picsum.photos/400/250?random=${13 + index}`,
    url: video.url || "#"
  }));

  // Use stats from API
  const stats = lifeData.stats;

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
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error loading data: {error}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        )}
        
        {/* Content */}
        {!loading && !error && (
          <>
        
        {/* Фото-коллаж */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            {t('life.photoCollage.title')}
          </h3>
          {lifeData.photo_urls && lifeData.photo_urls.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {lifeData.photo_urls.map((url, index) => (
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
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <div className="text-gray-500 text-lg">
                {t('life.photoCollage.noPhotos', 'Фотографии пока не загружены')}
              </div>
            </div>
          )}
        </div>
        
        {/* Видео-репортажи */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
            {t('life.videos.title')}
          </h3>
          {lifeData.video_data && lifeData.video_data.length > 0 ? (
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
          ) : (
            <div className="text-center py-12 bg-gray-100 rounded-lg">
              <div className="text-gray-500 text-lg">
                {t('life.videos.noVideos', 'Видео пока не загружены')}
              </div>
            </div>
          )}
        </div>
        
        {/* Цифры и статистика */}
        {lifeData.stats && lifeData.stats.length > 0 && (
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
        )}
          </>
        )}
      </div>
    </div>
  );
};

export default LifeOverview;