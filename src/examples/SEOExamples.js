// Примеры использования SEO системы Salymbekov University

// 1. БАЗОВОЕ ИСПОЛЬЗОВАНИЕ
import SEOComponent from '../components/SEO/SEOComponent';

const AboutPage = () => {
  return (
    <div>
      {/* Автоматически генерирует SEO для страницы "О нас" */}
      <SEOComponent />
      
      <h1>О университете</h1>
      {/* Контент страницы */}
    </div>
  );
};

// 2. КАСТОМНЫЕ META-ТЕГИ
const SpecialPage = () => {
  return (
    <div>
      <SEOComponent 
        customTitle="Специальная программа | Salymbekov University"
        customDescription="Уникальная медицинская программа для подготовки врачей высшей категории"
        customKeywords="специальная программа, медицинское образование, врачи высшей категории"
        customImage="/images/special-program.jpg"
      />
      
      <h1>Специальная программа</h1>
      {/* Контент */}
    </div>
  );
};

// 3. СТРАНИЦА НОВОСТИ С ДЕТАЛЯМИ
const NewsDetail = ({ article }) => {
  return (
    <div>
      <SEOComponent 
        isNewsDetail={true}
        newsTitle={article.title}
        newsDescription={article.excerpt || article.content.substring(0, 160)}
        customImage={article.featured_image}
      />
      
      <article>
        <h1>{article.title}</h1>
        <p>{article.content}</p>
      </article>
    </div>
  );
};

// 4. ОТСЛЕЖИВАНИЕ СОБЫТИЙ
import { trackUniversityEvents } from '../components/Analytics/AnalyticsProvider';

const ApplicationForm = () => {
  const handleFormStart = () => {
    // Отслеживаем начало заполнения заявки
    trackUniversityEvents.applicationStart();
  };

  const handleFormSubmit = (formData) => {
    // Отслеживаем отправку заявки
    trackUniversityEvents.applicationSubmit();
    
    // Отправка формы
    submitApplication(formData);
  };

  return (
    <form onFocus={handleFormStart} onSubmit={handleFormSubmit}>
      {/* Поля формы */}
    </form>
  );
};

// 5. ОТСЛЕЖИВАНИЕ ПРОСМОТРА ПРОГРАММ
const ProgramCard = ({ program }) => {
  const handleProgramView = () => {
    trackUniversityEvents.programView(program.name);
  };

  return (
    <div onClick={handleProgramView}>
      <h3>{program.name}</h3>
      <p>{program.description}</p>
    </div>
  );
};

// 6. СМЕНА ЯЗЫКА С ОТСЛЕЖИВАНИЕМ
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    // Отслеживаем смену языка
    trackUniversityEvents.languageChange(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('ru')}>Русский</button>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('kg')}>Кыргызча</button>
    </div>
  );
};

// 7. ИСПОЛЬЗОВАНИЕ SEO ХУКА
import { useSEO } from '../hooks/useSEO';

const DynamicPage = ({ pageData }) => {
  const { getSEOData } = useSEO();
  
  const seoData = getSEOData({
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.tags?.join(', ')
  });

  return (
    <div>
      <SEOComponent 
        customTitle={seoData.title}
        customDescription={seoData.description}
        customKeywords={seoData.keywords}
      />
      
      <h1>{pageData.title}</h1>
      <p>{pageData.content}</p>
    </div>
  );
};

// 8. СТРУКТУРИРОВАННЫЕ ДАННЫЕ ДЛЯ СОБЫТИЙ
import { useStructuredData } from '../hooks/useStructuredData';

const EventPage = ({ event }) => {
  const { getPageSpecificSchema } = useStructuredData();
  
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": "Salymbekov University",
      "address": "ул. Ахунбаева 92, Бишкек, Кыргызстан"
    },
    "organizer": {
      "@type": "Organization",
      "name": "Salymbekov University"
    }
  };

  return (
    <div>
      <SEOComponent 
        customTitle={`${event.title} | Salymbekov University`}
        customDescription={event.description}
      />
      
      {/* Добавляем структурированные данные для события */}
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
      
      <h1>{event.title}</h1>
      <p>{event.description}</p>
    </div>
  );
};

// 9. МОНИТОРИНГ SEO (ТОЛЬКО ДЛЯ РАЗРАБОТКИ)
import { useSEOMonitoring } from '../components/SEO/SEOMonitoring';

const DevTools = () => {
  const seoMetrics = useSEOMonitoring();
  
  // В production этот компонент ничего не рендерит
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{ position: 'fixed', bottom: 10, left: 10, background: 'white', padding: 10 }}>
      <h4>SEO Метрики:</h4>
      <p>Загрузка: {seoMetrics.pageLoadTime}ms</p>
      <p>Meta теги: {seoMetrics.metaTagsValid ? '✅' : '❌'}</p>
      <p>Structured Data: {seoMetrics.structuredDataValid ? '✅' : '❌'}</p>
    </div>
  );
};

// 10. УСЛОВНОЕ SEO ДЛЯ РАЗНЫХ ТИПОВ СТРАНИЦ
const UniversalPage = ({ pageType, data }) => {
  const renderSEO = () => {
    switch (pageType) {
      case 'news-detail':
        return (
          <SEOComponent 
            isNewsDetail={true}
            newsTitle={data.title}
            newsDescription={data.description}
            customImage={data.image}
          />
        );
      
      case 'program':
        return (
          <SEOComponent 
            customTitle={`${data.name} | Программы | Salymbekov University`}
            customDescription={`Изучите программу ${data.name} в Salymbekov University. ${data.description}`}
            customKeywords={`${data.name}, образовательная программа, медицинское образование`}
          />
        );
      
      case 'faculty':
        return (
          <SEOComponent 
            customTitle={`${data.name} | Преподаватели | Salymbekov University`}
            customDescription={`Познакомьтесь с ${data.name} - ${data.position} в Salymbekov University`}
            customImage={data.photo}
          />
        );
      
      default:
        return <SEOComponent />;
    }
  };

  return (
    <div>
      {renderSEO()}
      {/* Контент страницы */}
    </div>
  );
};

// 11. СОЗДАНИЕ КАСТОМНЫХ СХЕМ
const ResearchPage = ({ research }) => {
  const researchSchema = {
    "@context": "https://schema.org",
    "@type": "ResearchProject",
    "name": research.title,
    "description": research.abstract,
    "author": research.authors.map(author => ({
      "@type": "Person",
      "name": author.name,
      "affiliation": "Salymbekov University"
    })),
    "funding": {
      "@type": "MonetaryGrant",
      "funder": research.funder
    },
    "keywords": research.keywords.join(', ')
  };

  return (
    <div>
      <SEOComponent 
        customTitle={`${research.title} | Исследования | Salymbekov University`}
        customDescription={research.abstract}
        customKeywords={research.keywords.join(', ')}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(researchSchema)}
      </script>
      
      {/* Контент исследования */}
    </div>
  );
};

// 12. ИНТЕГРАЦИЯ С ФОРМАМИ
const ContactForm = () => {
  const handleSubmit = (formData) => {
    // Отслеживаем отправку формы обратной связи
    trackUniversityEvents.contactFormSubmit();
    
    // Отправляем данные
    sendContactForm(formData);
  };

  return (
    <div>
      <SEOComponent 
        customTitle="Контакты | Salymbekov University"
        customDescription="Свяжитесь с Salymbekov University. Контактная информация, адрес, телефоны и форма обратной связи."
        customKeywords="контакты, связаться, телефон, адрес, форма обратной связи"
      />
      
      <form onSubmit={handleSubmit}>
        {/* Поля формы */}
      </form>
    </div>
  );
};