// Утилиты для генерации и оптимизации SEO изображений

export const generateOGImageUrl = (title, description, language = 'ru') => {
  // Используем сервис для генерации динамических изображений
  const baseUrl = 'https://og-image-service.vercel.app';
  
  const params = new URLSearchParams({
    title: encodeURIComponent(title),
    subtitle: encodeURIComponent(description),
    logo: 'https://www.su-medical-school.com/images/logo.png',
    theme: 'medical',
    language: language,
    width: '1200',
    height: '630'
  });
  
  return `${baseUrl}/api/og?${params.toString()}`;
};

export const getOptimizedImageUrl = (originalUrl, width = 1200, height = 630, quality = 85) => {
  if (!originalUrl) return null;
  
  // Если это внешняя ссылка, возвращаем как есть
  if (originalUrl.startsWith('http')) {
    return originalUrl;
  }
  
  // Для локальных изображений добавляем параметры оптимизации
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    f: 'webp' // Используем современный формат
  });
  
  return `https://www.su-medical-school.com/_next/image?url=${encodeURIComponent(originalUrl)}&${params.toString()}`;
};

// Предопределенные изображения для разных разделов сайта
export const sectionImages = {
  home: {
    ru: '/images/og/home-ru.jpg',
    en: '/images/og/home-en.jpg', 
    kg: '/images/og/home-kg.jpg'
  },
  about: {
    ru: '/images/og/about-ru.jpg',
    en: '/images/og/about-en.jpg',
    kg: '/images/og/about-kg.jpg'
  },
  hsm: {
    ru: '/images/og/hsm-ru.jpg',
    en: '/images/og/hsm-en.jpg',
    kg: '/images/og/hsm-kg.jpg'
  },
  admissions: {
    ru: '/images/og/admissions-ru.jpg',
    en: '/images/og/admissions-en.jpg',
    kg: '/images/og/admissions-kg.jpg'
  },
  research: {
    ru: '/images/og/research-ru.jpg',
    en: '/images/og/research-en.jpg',
    kg: '/images/og/research-kg.jpg'
  },
  news: {
    ru: '/images/og/news-ru.jpg',
    en: '/images/og/news-en.jpg',
    kg: '/images/og/news-kg.jpg'
  },
  default: {
    ru: '/images/og/default-ru.jpg',
    en: '/images/og/default-en.jpg',
    kg: '/images/og/default-kg.jpg'
  }
};

export const getSectionImage = (section, language = 'ru') => {
  const sectionKey = Object.keys(sectionImages).find(key => 
    section.includes(key)) || 'default';
  
  return sectionImages[sectionKey][language] || sectionImages.default[language];
};

// Функция для генерации мета-изображения для новостей
export const getNewsImage = (article, language = 'ru') => {
  // Если у статьи есть собственное изображение
  if (article?.image) {
    return getOptimizedImageUrl(article.image);
  }
  
  // Если это специальная категория новостей
  if (article?.category) {
    const categoryImages = {
      events: '/images/og/news-events.jpg',
      announcements: '/images/og/news-announcements.jpg',
      research: '/images/og/news-research.jpg',
      students: '/images/og/news-students.jpg'
    };
    
    if (categoryImages[article.category]) {
      return getOptimizedImageUrl(categoryImages[article.category]);
    }
  }
  
  // Fallback к стандартному изображению новостей
  return getSectionImage('news', language);
};

// Генерация структурированных данных для изображений
export const getImageStructuredData = (imageUrl, alt, caption) => ({
  "@type": "ImageObject",
  "url": imageUrl,
  "width": 1200,
  "height": 630,
  "alternateName": alt,
  "caption": caption,
  "encodingFormat": "image/jpeg",
  "contentUrl": imageUrl,
  "thumbnailUrl": getOptimizedImageUrl(imageUrl, 400, 300)
});

export default {
  generateOGImageUrl,
  getOptimizedImageUrl,
  getSectionImage,
  getNewsImage,
  getImageStructuredData
};