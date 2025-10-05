import { Helmet } from 'react-helmet-async';

const SeoHead = ({ 
  title = "Медицинский факультет Salymbekov University - Качественное медицинское образование в Кыргызстане",
  description = "Ведущий медицинский факультет в Кыргызстане. Подготовка врачей по международным стандартам. Современные лаборатории, квалифицированные преподаватели.",
  keywords = "медицинский факультет, медицинское образование Кыргызстан, врач обучение, Salymbekov University медицина, медицинские специальности",
  image = "/cropped-2.png",
  url = "https://www.su-medical-school.com",
  type = "website"
}) => {
  const siteName = "Salymbekov University Medical Faculty";
  
  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Salymbekov University" />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@SalymbekovUni" />
      
      {/* Дополнительные мета-теги */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      
      {/* Гео-метатеги */}
      <meta name="geo.region" content="KG-C" />
      <meta name="geo.placename" content="Бишкек" />
      <meta name="geo.position" content="42.874621;74.569762" />
      <meta name="ICBM" content="42.874621, 74.569762" />
    </Helmet>
  );
};

export default SeoHead;