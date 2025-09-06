import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Данные для галереи
const galleryData = {
  albums: [
    {
      id: 1,
      titleKey: "gallery.albums.orientation2023.title",
      photoCount: 45,
      cover: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      tagsKey: "gallery.albums.orientation2023.tags"
    },
    {
      id: 2,
      titleKey: "gallery.albums.graduation2023.title",
      photoCount: 120,
      cover: "https://images.unsplash.com/photo-1535982337059-51a5b2d3c079?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      tagsKey: "gallery.albums.graduation2023.tags"
    },
    {
      id: 3,
      titleKey: "gallery.albums.symposium.title",
      photoCount: 60,
      cover: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      tagsKey: "gallery.albums.symposium.tags"
    }
  ],
  photos: [
    // Фотографии для альбома "Ориентация 2023"
    {
      id: 101,
      albumId: 1,
      url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.orientation101.title",
      tagsKey: "gallery.photos.orientation101.tags"
    },
    {
      id: 102,
      albumId: 1,
      url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.orientation102.title",
      tagsKey: "gallery.photos.orientation102.tags"
    },
    {
      id: 103,
      albumId: 1,
      url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.orientation103.title",
      tagsKey: "gallery.photos.orientation103.tags"
    },
    
    // Фотографии для альбома "Выпускной 2023"
    {
      id: 201,
      albumId: 2,
      url: "https://images.unsplash.com/photo-1535982337059-51a5b2d3c079?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.graduation201.title",
      tagsKey: "gallery.photos.graduation201.tags"
    },
    {
      id: 202,
      albumId: 2,
      url: "https://images.unsplash.com/photo-1567690346811-22291ebe92ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.graduation202.title",
      tagsKey: "gallery.photos.graduation202.tags"
    },
    {
      id: 203,
      albumId: 2,
      url: "https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.graduation203.title",
      tagsKey: "gallery.photos.graduation203.tags"
    },
    
    // Фотографии для альбома "Научный симпозиум"
    {
      id: 301,
      albumId: 3,
      url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.symposium301.title",
      tagsKey: "gallery.photos.symposium301.tags"
    },
    {
      id: 302,
      albumId: 3,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.symposium302.title",
      tagsKey: "gallery.photos.symposium302.tags"
    },
    {
      id: 303,
      albumId: 3,
      url: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      titleKey: "gallery.photos.symposium303.title",
      tagsKey: "gallery.photos.symposium303.tags"
    }
  ]
};

const Gallery = () => {
  const { t } = useTranslation();
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  // Получение переведенных данных
  const getTranslatedAlbums = () => {
    return galleryData.albums.map(album => ({
      ...album,
      title: t(album.titleKey),
      tags: t(album.tagsKey, { returnObjects: true })
    }));
  };

  const getTranslatedPhotos = () => {
    return galleryData.photos.map(photo => ({
      ...photo,
      title: t(photo.titleKey),
      tags: t(photo.tagsKey, { returnObjects: true })
    }));
  };

  // Фильтрация фотографий по поисковому запросу
  useEffect(() => {
    const translatedPhotos = getTranslatedPhotos();
    
    if (!searchQuery) {
      setFilteredPhotos(activeAlbum ? 
        translatedPhotos.filter(photo => photo.albumId === activeAlbum.id) : 
        []);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = translatedPhotos.filter(photo => 
        (!activeAlbum || photo.albumId === activeAlbum.id) && 
        (photo.title.toLowerCase().includes(query) || 
         photo.tags.some(tag => tag.toLowerCase().includes(query)))
      );
      setFilteredPhotos(filtered);
    }
  }, [searchQuery, activeAlbum, t]);

  // Открытие альбома
  const openAlbum = (album) => {
    const translatedAlbum = {
      ...album,
      title: t(album.titleKey),
      tags: t(album.tagsKey, { returnObjects: true })
    };
    
    setActiveAlbum(translatedAlbum);
    const translatedPhotos = getTranslatedPhotos();
    setFilteredPhotos(translatedPhotos.filter(photo => photo.albumId === album.id));
  };

  // Закрытие альбома
  const closeAlbum = () => {
    setActiveAlbum(null);
    setFilteredPhotos([]);
    setSearchQuery('');
  };

  // Открытие lightbox
  const openLightbox = (photo) => {
    setCurrentPhoto(photo);
    setLightboxOpen(true);
  };

  // Закрытие lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setCurrentPhoto(null), 300);
  };

  // Навигация по фотографиям в lightbox
  const navigatePhotos = (direction) => {
    if (!currentPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === currentPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setCurrentPhoto(filteredPhotos[newIndex]);
  };

  // Скачивание фотографии
  const downloadPhoto = (photoUrl, photoTitle) => {
    fetch(photoUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${photoTitle.replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      })
      .catch(error => console.error(t('gallery.downloadError'), error));
  };

  // Обработка нажатия клавиш в lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigatePhotos('prev');
        if (e.key === 'ArrowRight') navigatePhotos('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, currentPhoto]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
          {t('gallery.title')}
        </h1>
        <p className="text-center text-blue-600 mb-8">
          {t('gallery.subtitle')}
        </p>
        
        {!activeAlbum ? (
          // Отображение альбомов
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getTranslatedAlbums().map(album => (
                <div 
                  key={album.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                  onClick={() => openAlbum(album)}
                >
                  <div className="relative">
                    <img 
                      src={album.cover} 
                      alt={album.title} 
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4">
                      <h3 className="text-white font-bold text-xl">{album.title}</h3>
                      <p className="text-blue-200">
                        {t('gallery.photoCount', { count: album.photoCount })}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {album.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Отображение фотографий в альбоме
          <>
            <div className="flex items-center justify-between mb-6">
              <button 
                onClick={closeAlbum}
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('gallery.backToAlbums')}
              </button>
              <h2 className="text-2xl font-bold text-blue-800">{activeAlbum.title}</h2>
              <div className="w-24"></div> {/* Для выравнивания */}
            </div>
            
            {/* Поиск и фильтрация */}
            <div className="mb-6">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder={t('gallery.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-5 h-5 absolute right-3 top-2.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Фотографии */}
            {filteredPhotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredPhotos.map(photo => (
                  <div 
                    key={photo.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => openLightbox(photo)}
                  >
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-blue-900">{photo.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {photo.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-blue-600 text-lg">{t('gallery.noResults')}</p>
              </div>
            )}
          </>
        )}
        
        {/* Lightbox */}
        {lightboxOpen && currentPhoto && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-blue-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button 
              onClick={() => navigatePhotos('prev')}
              className="absolute left-4 text-white hover:text-blue-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={() => navigatePhotos('next')}
              className="absolute right-4 text-white hover:text-blue-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="max-w-4xl max-h-full">
              <img 
                src={currentPhoto.url} 
                alt={currentPhoto.title} 
                className="max-w-full max-h-screen object-contain"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-bold">{currentPhoto.title}</h3>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {currentPhoto.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-700 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => downloadPhoto(currentPhoto.url, currentPhoto.title)}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center mx-auto"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('gallery.download')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;