import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const useStructuredData = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  
  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Salymbekov University",
    "alternateName": "Салымбеков Университет",
    "url": "https://www.su-medical-school.com",
    "logo": "https://www.su-medical-school.com/images/logo.png",
    "image": "https://www.su-medical-school.com/images/university-main.jpg",
    "description": {
      "ru": "Ведущий медицинский университет в Кыргызстане. Качественное медицинское образование, современные исследования и подготовка врачей международного уровня.",
      "en": "Leading medical university in Kyrgyzstan. Quality medical education, modern research and training of international level doctors.",
      "kg": "Кыргызстандагы жетекчи медицина университети. Сапаттуу медициналык билим берүү, заманбап иликтөөлөр жана эл аралык деңгээлдеги дарыгерлерди даярдоо."
    }[i18n.language] || "Leading medical university in Kyrgyzstan.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Ахунбаева 92",
      "addressLocality": "Бишкек",
      "addressRegion": "Чүй областы",
      "postalCode": "720000",
      "addressCountry": "KG"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+996-312-123456",
        "contactType": "customer service",
        "availableLanguage": ["Russian", "English", "Kyrgyz"],
        "areaServed": "KG"
      },
      {
        "@type": "ContactPoint", 
        "telephone": "+996-555-123456",
        "contactType": "admissions",
        "availableLanguage": ["Russian", "English", "Kyrgyz"],
        "areaServed": "KG"
      }
    ],
    "foundingDate": "1995",
    "numberOfStudents": 2500,
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Medical Degree"
    },
    "accreditedBy": {
      "@type": "Organization",
      "name": "Ministry of Education and Science of the Kyrgyz Republic"
    },
    "sameAs": [
      "https://www.facebook.com/salymbekov.university",
      "https://www.instagram.com/salymbekov.university",
      "https://www.linkedin.com/school/salymbekov-university",
      "https://www.youtube.com/channel/salymbekov-university"
    ],
    "department": [
      {
        "@type": "EducationalOrganization",
        "name": "Higher School of Medicine",
        "alternateName": "Высшая школа медицины",
        "description": "Medical education programs"
      },
      {
        "@type": "EducationalOrganization", 
        "name": "Research Center",
        "alternateName": "Исследовательский центр",
        "description": "Medical research and development"
      }
    ],
    "offers": {
      "@type": "EducationalOccupationalProgram",
      "name": "Medical Education Programs",
      "programType": "Bachelor, Master, Doctoral",
      "educationalCredentialAwarded": "Medical Degree",
      "timeToComplete": "P6Y",
      "occupationalCategory": "Healthcare"
    }
  });

  const getWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Salymbekov University",
    "url": "https://salymbekov-university.kg",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://salymbekov-university.kg/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Salymbekov University"
    },
    "inLanguage": ["ru", "en", "ky"]
  });

  const getMedicalOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Salymbekov University Medical Faculty",
    "url": "https://salymbekov-university.kg/hsm",
    "medicalSpecialty": [
      "General Medicine",
      "Pediatrics",
      "Dentistry", 
      "Surgery",
      "Internal Medicine",
      "Cardiology",
      "Neurology"
    ],
    "availableService": [
      {
        "@type": "MedicalProcedure",
        "name": "Medical Education",
        "procedureType": "Educational"
      },
      {
        "@type": "MedicalProcedure", 
        "name": "Medical Research",
        "procedureType": "Research"
      }
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Medical Accreditation"
    }
  });

  const getNewsArticleSchema = (article) => ({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate || article.publishedDate,
    "author": {
      "@type": "Organization",
      "name": "Salymbekov University"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Salymbekov University",
      "logo": {
        "@type": "ImageObject",
        "url": "https://salymbekov-university.kg/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://salymbekov-university.kg${location.pathname}`
    },
    "articleSection": "University News",
    "keywords": article.keywords || "medical university, education, healthcare",
    "inLanguage": i18n.language
  });

  const getEducationalProgramSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalProgram",
    "name": "Medical Education Program",
    "description": "Comprehensive medical education program leading to medical degree",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Salymbekov University"
    },
    "programType": "Medical Degree",
    "timeToComplete": "P6Y",
    "occupationalCategory": {
      "@type": "CategoryCode",
      "inCodeSet": {
        "@type": "CategoryCodeSet",
        "name": "Healthcare Occupations"
      },
      "codeValue": "29-1060",
      "name": "Physicians and Surgeons"
    },
    "educationalCredentialAwarded": "Doctor of Medicine",
    "applicationDeadline": "2024-08-15",
    "startDate": "2024-09-01",
    "numberOfCredits": 360,
    "typicalCreditsPerTerm": 30,
    "termDuration": "P1Y",
    "termsPerYear": 2
  });

  const getPageSpecificSchema = (pageType, data = {}) => {
    const schemas = [getOrganizationSchema(), getWebSiteSchema()];

    switch (pageType) {
      case 'home':
        schemas.push(getMedicalOrganizationSchema());
        schemas.push(getEducationalProgramSchema());
        break;
      
      case 'hsm':
        schemas.push(getMedicalOrganizationSchema());
        schemas.push(getEducationalProgramSchema());
        break;
      
      case 'news-detail':
        if (data.article) {
          schemas.push(getNewsArticleSchema(data.article));
        }
        break;
        
      case 'admissions':
        schemas.push(getEducationalProgramSchema());
        break;
        
      default:
        break;
    }

    return {
      "@context": "https://schema.org",
      "@graph": schemas
    };
  };

  return { getPageSpecificSchema };
};

export default useStructuredData;