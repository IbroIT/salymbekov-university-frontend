import { useTranslation } from "react-i18next";
import SeoHelmet from "../SeoHelmet";
import Home from './Home';
import Facts from './FactsSection';
import Programs from './ProgramCards';
import Reviews from './Reviews';
import Partners from "./Partners";
import News from "./News";

const Hero = () => {
  const { i18n } = useTranslation();

  const seoData = {
    ru: {
      title: "Salymbekov University - Медицинский Факультет | Ведущее медицинское образование в Кыргызстане",
      description: "Медицинский факультет Salymbekov University - современное медицинское образование, инновационные исследования и подготовка высококвалифицированных врачей. Аккредитованные программы, международные партнерства.",
      keywords: "медицинский факультет, медицинское образование Кыргызстан, врач, медицинский университет, Salymbekov University, поступление в медицинский, лечебное дело, педиатрия, стоматология, медицинские науки, ординатура, медицинская практика",
      ogImage: "/medical-faculty-og.jpg"
    },
    kg: {
      title: "Salymbekov University - Медицина Факультети | Кыргызстандагы жетекчи медициналык билим берүү",
      description: "Salymbekov University медицина факультети - заманбап медициналык билим берүү, инновациялык иликтөөлөр жана жогоку квалификациялуу дарыгерлерди даярдоо. Аккредитацияланган программалар, эл аралык өнөктөштүктөр.",
      keywords: "медицина факультети, медициналык билим Кыргызстан, дарыгер, медицина университети, Salymbekov University, медицинага кирүү, дарылоо иши, педиатрия, стоматология, медицина илимдери, ординатура, медициналык практика",
      ogImage: "/medical-faculty-og.jpg"
    },
    en: {
      title: "Salymbekov University - Medical Faculty | Leading Medical Education in Kyrgyzstan",
      description: "Salymbekov University Medical Faculty - modern medical education, innovative research and training of highly qualified doctors. Accredited programs, international partnerships.",
      keywords: "medical faculty, medical education Kyrgyzstan, doctor, medical university, Salymbekov University, medical admission, general medicine, pediatrics, dentistry, medical sciences, residency, medical practice",
      ogImage: "/medical-faculty-og.jpg"
    }
  };

  const currentSeo = seoData[i18n.language] || seoData.ru;

  // Структурированные данные для медицинской организации
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Salymbekov University Medical Faculty",
    "description": currentSeo.description,
    "url": "https://www.su-medical-school.com",
    "telephone": "+996-312-000000",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Kyrgyzstan",
      "addressLocality": "Bishkek"
    },
    "department": {
      "@type": "MedicalOrganization",
      "name": "Medical Faculty"
    },
    "medicalSpecialty": [
      "General Medicine",
      "Pediatrics", 
      "Dentistry",
      "Medical Sciences"
    ],
    "educationalProgram": {
      "@type": "EducationalOccupationalProgram",
      "programType": "Medical Education Program"
    }
  };

  return (
    <>
      <SeoHelmet
        title={currentSeo.title}
        description={currentSeo.description}
        keywords={currentSeo.keywords}
        ogImage={currentSeo.ogImage}
      />
      
      {/* Структурированные данные */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="hero-wrapper">
        <Home />
        <Facts />
        <Programs />
        <News />
        <Reviews />
        <Partners />
      </div>
    </>
  );
};

export default Hero;