import { useState, useEffect } from 'react';

// Хук для мониторинга SEO метрик
export const useSEOMonitoring = () => {
  const [seoMetrics, setSeoMetrics] = useState({
    pageLoadTime: 0,
    coreWebVitals: {},
    metaTagsValid: false,
    structuredDataValid: false,
    imageOptimization: {},
    mobileFriendly: false
  });

  useEffect(() => {
    // Измеряем время загрузки страницы
    const measurePageLoadTime = () => {
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      if (navigationTiming) {
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.loadEventStart;
        setSeoMetrics(prev => ({
          ...prev,
          pageLoadTime: loadTime
        }));
      }
    };

    // Проверяем Core Web Vitals
    const measureCoreWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setSeoMetrics(prev => ({
          ...prev,
          coreWebVitals: {
            ...prev.coreWebVitals,
            lcp: lastEntry.startTime
          }
        }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const firstInput = entryList.getEntries()[0];
        if (firstInput) {
          setSeoMetrics(prev => ({
            ...prev,
            coreWebVitals: {
              ...prev.coreWebVitals,
              fid: firstInput.processingStart - firstInput.startTime
            }
          }));
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        setSeoMetrics(prev => ({
          ...prev,
          coreWebVitals: {
            ...prev.coreWebVitals,
            cls: clsValue
          }
        }));
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Проверяем валидность мета-тегов
    const validateMetaTags = () => {
      const title = document.querySelector('title');
      const description = document.querySelector('meta[name="description"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');

      const isValid = title && 
                     description && 
                     title.textContent.length > 10 && 
                     title.textContent.length < 120 &&
                     description.content.length > 50 && 
                     description.content.length < 300 &&
                     ogTitle && ogDescription && ogImage;

      setSeoMetrics(prev => ({
        ...prev,
        metaTagsValid: isValid
      }));
    };

    // Проверяем структурированные данные
    const validateStructuredData = () => {
      const ldJsonScripts = document.querySelectorAll('script[type="application/ld+json"]');
      let isValid = false;

      ldJsonScripts.forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          if (data['@context'] && data['@type']) {
            isValid = true;
          }
        } catch (e) {
          console.warn('Invalid structured data:', e);
        }
      });

      setSeoMetrics(prev => ({
        ...prev,
        structuredDataValid: isValid
      }));
    };

    // Проверяем оптимизацию изображений
    const checkImageOptimization = () => {
      const images = document.querySelectorAll('img');
      let totalImages = images.length;
      let optimizedImages = 0;
      let withAlt = 0;

      images.forEach(img => {
        if (img.alt) withAlt++;
        if (img.src.includes('webp') || img.src.includes('avif')) {
          optimizedImages++;
        }
      });

      setSeoMetrics(prev => ({
        ...prev,
        imageOptimization: {
          total: totalImages,
          optimized: optimizedImages,
          withAlt: withAlt,
          optimizationRate: totalImages > 0 ? (optimizedImages / totalImages) * 100 : 0,
          altTextRate: totalImages > 0 ? (withAlt / totalImages) * 100 : 0
        }
      }));
    };

    // Проверяем мобильную совместимость
    const checkMobileFriendly = () => {
      const viewport = document.querySelector('meta[name="viewport"]');
      const isMobileFriendly = viewport && 
                              viewport.content.includes('width=device-width') &&
                              window.innerWidth < 768 ? 
                              document.body.scrollWidth <= window.innerWidth : true;

      setSeoMetrics(prev => ({
        ...prev,
        mobileFriendly: isMobileFriendly
      }));
    };

    // Запускаем все проверки
    setTimeout(() => {
      measurePageLoadTime();
      measureCoreWebVitals();
      validateMetaTags();
      validateStructuredData();
      checkImageOptimization();
      checkMobileFriendly();
    }, 1000);

  }, []);

  return seoMetrics;
};

// Компонент для отображения SEO дашборда (только в dev режиме)
export const SEODashboard = () => {
  const seoMetrics = useSEOMonitoring();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const getScoreColor = (score, thresholds) => {
    if (score >= thresholds.good) return 'text-green-600';
    if (score >= thresholds.average) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCWVScore = (metric, value) => {
    const thresholds = {
      lcp: { good: 2500, average: 4000 },
      fid: { good: 100, average: 300 },
      cls: { good: 0.1, average: 0.25 }
    };

    if (!value) return 'N/A';
    
    const threshold = thresholds[metric];
    if (value <= threshold.good) return 'Good';
    if (value <= threshold.average) return 'Needs Improvement';
    return 'Poor';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm z-50 border">
      <h3 className="font-bold text-sm mb-2">SEO Monitoring</h3>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Page Load Time:</span>
          <span className={getScoreColor(seoMetrics.pageLoadTime, { good: 1000, average: 3000 })}>
            {seoMetrics.pageLoadTime}ms
          </span>
        </div>

        <div className="border-t pt-1">
          <div className="font-semibold">Core Web Vitals:</div>
          <div className="flex justify-between">
            <span>LCP:</span>
            <span>{getCWVScore('lcp', seoMetrics.coreWebVitals.lcp)}</span>
          </div>
          <div className="flex justify-between">
            <span>FID:</span>
            <span>{getCWVScore('fid', seoMetrics.coreWebVitals.fid)}</span>
          </div>
          <div className="flex justify-between">
            <span>CLS:</span>
            <span>{getCWVScore('cls', seoMetrics.coreWebVitals.cls)}</span>
          </div>
        </div>

        <div className="border-t pt-1">
          <div className="flex justify-between">
            <span>Meta Tags:</span>
            <span className={seoMetrics.metaTagsValid ? 'text-green-600' : 'text-red-600'}>
              {seoMetrics.metaTagsValid ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Structured Data:</span>
            <span className={seoMetrics.structuredDataValid ? 'text-green-600' : 'text-red-600'}>
              {seoMetrics.structuredDataValid ? '✓' : '✗'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Mobile Friendly:</span>
            <span className={seoMetrics.mobileFriendly ? 'text-green-600' : 'text-red-600'}>
              {seoMetrics.mobileFriendly ? '✓' : '✗'}
            </span>
          </div>
        </div>

        {seoMetrics.imageOptimization.total > 0 && (
          <div className="border-t pt-1">
            <div className="font-semibold">Images:</div>
            <div className="flex justify-between">
              <span>Optimized:</span>
              <span>{seoMetrics.imageOptimization.optimizationRate.toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Alt Text:</span>
              <span>{seoMetrics.imageOptimization.altTextRate.toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Функция для отправки SEO метрик на сервер (для мониторинга)
export const reportSEOMetrics = async (metrics) => {
  if (process.env.NODE_ENV === 'production') {
    try {
      await fetch('/api/seo-metrics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...metrics,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.warn('Failed to report SEO metrics:', error);
    }
  }
};

export default { useSEOMonitoring, SEODashboard, reportSEOMetrics };