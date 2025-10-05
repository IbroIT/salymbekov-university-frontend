const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Salymbekov University Medical Faculty",
    "alternateName": "Медицинский факультет Salymbekov University",
    "url": "https://www.su-medical-school.com",
    "logo": "https://www.su-medical-school.com/cropped-2.png",
    "description": "Ведущий медицинский факультет в Кыргызстане, offering quality medical education and research",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "KG",
      "addressLocality": "Бишкек",
      "addressRegion": "Чуйская область"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "admissions",
      "email": "admission@salymbekov.com",
      "telephone": "+996312611611"
    },
    "sameAs": [
      "https://www.instagram.com/salymbekovuniversity/",
      "https://www.facebook.com/salymbekovuniversity/"
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(structuredData)}
    </script>
  );
};

export default StructuredData;