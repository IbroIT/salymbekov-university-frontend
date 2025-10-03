// components/SeoHelmet.jsx
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SeoHelmet = ({ 
  title, 
  description, 
  keywords, 
  canonical,
  ogImage,
  structuredData
}) => {
  const { i18n } = useTranslation();
  
  const baseUrl = "https://www.su-medical-school.com";
  const defaultImage = "/cropped-2.png";

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical || baseUrl} />
      
      {/* Языковые альтернативы */}
      <link rel="alternate" hreflang="ru" href={`${baseUrl}/ru`} />
      <link rel="alternate" hreflang="kg" href={`${baseUrl}/kg`} />
      <link rel="alternate" hreflang="en" href={`${baseUrl}/en`} />
      <link rel="alternate" hreflang="x-default" href={baseUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:url" content={canonical || baseUrl} />
      <meta property="og:locale" content={i18n.language === 'kg' ? 'ky_KG' : i18n.language + '_KG'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Salymbekov University Medical Faculty" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Дополнительные мета-теги для медицинского учреждения */}
      <meta name="medical.specialty" content="Medical Education, Healthcare, Medical Sciences" />
      <meta name="educational.institution" content="Salymbekov University" />
      <meta name="educational.institution.type" content="University" />
      <meta name="educational.institution.level" content="Higher Education" />
      <meta name="geo.region" content="KG" />
      <meta name="geo.placename" content="Bishkek" />
      
      {/* Структурированные данные */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHelmet;