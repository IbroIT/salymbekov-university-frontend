import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStructuredData } from '../../hooks/useStructuredData';
import { getSectionImage, getNewsImage, getOptimizedImageUrl } from '../../utils/seoImages';

// Импортируем SEO данные для всех языков
import seoRu from '../../locales/seo/seoRu.json';
import seoEn from '../../locales/seo/seoEn.json';
import seoKg from '../../locales/seo/seoKg.json';

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
  '/hsm/about': 'hsm',
  '/hsm/AS': 'departments',
  '/hsm/manage': 'management',
  '/hsm/partners': 'partners',
  '/hsm/calendar': 'programs',
  '/hsm/resources': 'programs',
  '/hsm/accreditation': 'hsm',
  '/hsm/learning-goals': 'hsm',
  '/hsm/cmk': 'hsm',
  '/admissions': 'admissions',
  '/admissions/requirements': 'requirements',
  '/admissions/tuition': 'tuition',
  '/admissions/faq': 'admissions',
  '/admissions/apply': 'admissions',
  '/admissions/process': 'admissions',
  '/admissions/applicants': 'admissions',
  '/admissions/applicants/citizens-kg': 'admissions',
  '/admissions/applicants/foreign-citizens': 'admissions',
  '/admissions/requirements/citizens-kg': 'requirements',
  '/admissions/requirements/foreign-citizens': 'requirements',
  '/admissions/apply/citizens-kg': 'admissions',
  '/admissions/apply/foreign-citizens': 'admissions',
  '/admissions/tuition/citizens-kg': 'tuition',
  '/admissions/tuition/foreign-citizens': 'tuition',
  '/admissions/committee': 'admissions',
  '/admissions/courses': 'programs',
  '/admissions/procedure': 'admissions',
  '/admissions/payments': 'tuition',
  '/research': 'research',
  '/research/centers': 'research',
  '/research/publications': 'research',
  '/research/conferences': 'research',
  '/research/grants': 'research',
  '/research/management': 'research',
  '/research/journals': 'research',
  '/infrastructure': 'infrastructure',
  '/infrastructure/hospitals': 'infrastructure',
  '/infrastructure/laboratories': 'infrastructure',
  '/infrastructure/dormitories': 'infrastructure',
  '/infrastructure/audience': 'infrastructure',
  '/infrastructure/startups': 'infrastructure',
  '/student': 'student_life',
  '/student/international': 'student_life',
  '/student/internships': 'student_life',
  '/student/academic-mobility': 'student_life',
  '/student/regulations': 'student_life',
  '/student/instructions': 'student_life',
  '/student/appeal': 'student_life',
  '/student/clubs': 'student_life',
  '/student/calendar': 'student_life',
  '/student/eresources': 'student_life',
  '/student/acadop': 'student_life',
  '/student/socop': 'student_life',
  '/news': 'news',
  '/news/events': 'news',
  '/news/announcements': 'news',
  '/contacts': 'contacts',
  '/media': 'contacts'
};

const SEOComponent = ({ customTitle, customDescription, customKeywords, customImage, isNewsDetail, newsTitle, newsDescription, pageType }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const { getPageSpecificSchema } = useStructuredData();
  
  const currentLanguage = i18n.language || 'ru';
  const currentSeoData = seoData[currentLanguage] || seoData.ru;
  
  // Получаем ключ страницы
  const seoKey = pathToSeoKey[location.pathname] || 'home';
  const pageData = currentSeoData.pages[seoKey] || currentSeoData.pages.home;
  
  // Формируем мета-данные
  const title = customTitle || 
    (isNewsDetail && newsTitle ? `${newsTitle}${currentSeoData.titleSeparator}${currentSeoData.baseTitle}` : 
    `${pageData.title}${currentSeoData.titleSeparator}${currentSeoData.baseTitle}`);
  
  const description = customDescription || 
    (isNewsDetail && newsDescription ? newsDescription : pageData.description);
  
  const keywords = customKeywords || 
    `${pageData.keywords}, ${currentSeoData.baseKeywords}`;
  
  const baseUrl = "https://www.su-medical-school.com";
  const currentUrl = `${baseUrl}${location.pathname}`;
  const canonicalUrl = currentUrl.replace(/\/$/, '') || baseUrl;
  
  // Изображение по умолчанию
  let defaultImage;
  if (isNewsDetail && newsTitle) {
    defaultImage = getNewsImage({ title: newsTitle, description: newsDescription, image: customImage }, currentLanguage);
  } else {
    defaultImage = getSectionImage(location.pathname, currentLanguage);
  }
  
  const image = customImage ? getOptimizedImageUrl(customImage) : defaultImage;
  
  // Языковые альтернативы
  const alternateUrls = {
    'ru': `${baseUrl}${location.pathname}`,
    'en': `${baseUrl}${location.pathname}`,
    'kg': `${baseUrl}${location.pathname}`
  };
  
  // Получаем структурированные данные для страницы
  const determinePageType = () => {
    if (isNewsDetail) return 'news-detail';
    if (location.pathname.includes('/hsm')) return 'hsm';
    if (location.pathname.includes('/admissions')) return 'admissions';
    if (location.pathname === '/') return 'home';
    return 'default';
  };
  
  const structuredData = getPageSpecificSchema(
    pageType || determinePageType(),
    { article: isNewsDetail ? { title: newsTitle, description: newsDescription } : null }
  );

  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <html lang={currentLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={isNewsDetail ? "article" : "website"} />
      <meta property="og:site_name" content={currentSeoData.siteName} />
      <meta property="og:locale" content={currentLanguage === 'kg' ? 'ky_KG' : `${currentLanguage}_KG`} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@salymbekov_university" />
      
      {/* Языковые альтернативы */}
      {Object.entries(alternateUrls).map(([lang, url]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.ru} />
      
      {/* Мета-теги для медицинского учреждения */}
      <meta name="medical.specialty" content="Medical Education, Healthcare, Medical Sciences" />
      <meta name="educational.institution" content={currentSeoData.organization} />
      <meta name="educational.institution.type" content="University" />
      <meta name="educational.institution.level" content="Higher Education" />
      <meta name="geo.region" content="KG" />
      <meta name="geo.placename" content="Бишкек" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="1 day" />
      
      {/* Структурированные данные */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Дополнительные мета-теги для социальных сетей */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      
      {/* Превентивные DNS запросы */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//api.salymbekov-university.kg" />
      <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
    </Helmet>
  );
};

export default SEOComponent;