import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics 4
export const useGoogleAnalytics = (measurementId) => {
  const location = useLocation();

  useEffect(() => {
    if (!measurementId) return;

    // Загружаем Google Analytics скрипт
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Инициализируем gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
      custom_map: {
        custom_parameter_1: 'medical_university',
        custom_parameter_2: 'kyrgyzstan'
      }
    });

    return () => {
      // Cleanup при размонтировании
      const existingScript = document.querySelector(`script[src*="${measurementId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [measurementId]);

  // Отслеживание изменений страниц
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }, [location, measurementId]);
};

// Yandex Metrica
export const useYandexMetrica = (counterId) => {
  const location = useLocation();

  useEffect(() => {
    if (!counterId) return;

    // Yandex Metrica код
    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");

    window.ym(counterId, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
      ecommerce: "dataLayer"
    });
  }, [counterId]);

  useEffect(() => {
    if (window.ym) {
      window.ym(counterId, 'hit', location.pathname);
    }
  }, [location, counterId]);
};

// Facebook Pixel
export const useFacebookPixel = (pixelId) => {
  const location = useLocation();

  useEffect(() => {
    if (!pixelId) return;

    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }, [pixelId]);

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [location]);
};

// Общий компонент аналитики
export const AnalyticsProvider = ({ 
  children, 
  googleAnalyticsId = 'G-XXXXXXXXXX',
  yandexMetricaId = 'XXXXXXXX',
  facebookPixelId = 'XXXXXXXXXXXXXXX'
}) => {
  useGoogleAnalytics(googleAnalyticsId);
  useYandexMetrica(yandexMetricaId);
  useFacebookPixel(facebookPixelId);

  return children;
};

// Функции для отслеживания событий
export const trackEvent = (eventName, parameters = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }

  // Yandex Metrica
  if (window.ym) {
    window.ym(process.env.REACT_APP_YANDEX_METRICA_ID, 'reachGoal', eventName);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

// Специальные события для университета
export const trackUniversityEvents = {
  applicationStart: () => trackEvent('application_start', {
    event_category: 'admissions',
    event_label: 'application_form'
  }),
  
  applicationSubmit: () => trackEvent('application_submit', {
    event_category: 'admissions', 
    event_label: 'application_complete'
  }),
  
  programView: (programName) => trackEvent('program_view', {
    event_category: 'academics',
    event_label: programName
  }),
  
  contactFormSubmit: () => trackEvent('contact_form_submit', {
    event_category: 'contact',
    event_label: 'contact_form'
  }),
  
  newsArticleView: (articleTitle) => trackEvent('news_view', {
    event_category: 'content',
    event_label: articleTitle
  }),
  
  languageChange: (language) => trackEvent('language_change', {
    event_category: 'internationalization',
    event_label: language
  }),
  
  downloadBrochure: () => trackEvent('download_brochure', {
    event_category: 'engagement',
    event_label: 'university_brochure'
  })
};

export default AnalyticsProvider;