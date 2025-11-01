import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

// Импортируем SEO данные
import seoRu from '../locales/seo/seoRu.json';
import seoEn from '../locales/seo/seoEn.json';
import seoKg from '../locales/seo/seoKg.json';

const seoData = {
  ru: seoRu.seo,
  en: seoEn.seo,
  kg: seoKg.seo
};

// Маппинг путей на ключи SEO
const pathToSeoKey = {
  '/': 'home',
  '/about': 'about',
  '/about/management': 'management',
  '/about/careers': 'careers',
  '/about/vacancies': 'careers',
  '/about/partners': 'partners',
  '/about/mission': 'mission',
  '/about/founders': 'founders',
  '/about/structure': 'structure',
  '/about/achievements': 'achievements',
  '/hsm': 'hsm',
  '/hsm/programs': 'hsm',
  '/hsm/eduprograms': 'programs',
  '/hsm/departments': 'departments',
  '/admissions': 'admissions',
  '/research': 'research',
  '/infrastructure': 'infrastructure',
  '/student': 'student_life',
  '/news': 'news',
  '/contacts': 'contacts'
};

export const useSEO = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const currentLanguage = i18n.language || 'ru';
  const currentSeoData = seoData[currentLanguage] || seoData.ru;
  
  const getSEOData = (customData = {}) => {
    const seoKey = pathToSeoKey[location.pathname] || 'home';
    const pageData = currentSeoData.pages[seoKey] || currentSeoData.pages.home;
    
    const baseUrl = "https://salymbekov-university.kg";
    const currentUrl = `${baseUrl}${location.pathname}`;
    
    return {
      title: customData.title || `${pageData.title}${currentSeoData.titleSeparator}${currentSeoData.baseTitle}`,
      description: customData.description || pageData.description,
      keywords: customData.keywords || `${pageData.keywords}, ${currentSeoData.baseKeywords}`,
      canonical: currentUrl,
      image: customData.image || `${baseUrl}/images/og-image-${currentLanguage}.jpg`,
      currentLanguage,
      seoData: currentSeoData,
      pageData
    };
  };
  
  return { getSEOData, currentLanguage, seoData: currentSeoData };
};

export default useSEO;