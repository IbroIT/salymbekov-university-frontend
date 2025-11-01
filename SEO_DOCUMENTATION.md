# SEO Система для Salymbekov University

## Обзор

Полноценная SEO система для сайта Salymbekov University с поддержкой трех языков (русский, английский, кыргызский) и современными инструментами оптимизации.

## Компоненты системы

### 1. SEOComponent (`src/components/SEO/SEOComponent.jsx`)

Основной компонент для управления SEO мета-тегами на всех страницах сайта.

**Возможности:**
- Автоматическая генерация title, description, keywords для каждой страницы
- Поддержка Open Graph и Twitter Card
- Языковые альтернативы (hreflang)
- Структурированные данные (JSON-LD)
- Специальная поддержка для новостных статей

**Использование:**
```jsx
// Базовое использование
<SEOComponent />

// Для новостной статьи
<SEOComponent 
  isNewsDetail={true}
  newsTitle="Заголовок новости"
  newsDescription="Описание новости"
  customImage="/images/news-image.jpg"
/>

// Кастомные данные
<SEOComponent 
  customTitle="Специальный заголовок"
  customDescription="Специальное описание"
  customKeywords="дополнительные, ключевые, слова"
/>
```

### 2. SEO Переводы (`src/locales/seo/`)

Структурированные переводы SEO контента для всех языков:
- `seoRu.json` - русский язык
- `seoEn.json` - английский язык  
- `seoKg.json` - кыргызский язык

**Структура:**
```json
{
  "seo": {
    "baseTitle": "Salymbekov University",
    "titleSeparator": " | ",
    "baseDescription": "...",
    "baseKeywords": "...",
    "pages": {
      "home": {
        "title": "Главная",
        "description": "...",
        "keywords": "..."
      },
      // другие страницы
    }
  }
}
```

### 3. Структурированные данные (`src/hooks/useStructuredData.js`)

Генерация схем JSON-LD для различных типов контента:
- Образовательная организация (EducationalOrganization)
- Медицинская организация (MedicalOrganization)
- Веб-сайт (WebSite)
- Новостная статья (NewsArticle)
- Образовательная программа (EducationalOccupationalProgram)

### 4. Оптимизация изображений (`src/utils/seoImages.js`)

Утилиты для работы с SEO изображениями:
- Автоматическая генерация OG изображений
- Оптимизация размеров и качества
- Предопределенные изображения для разделов
- Специальные изображения для новостей

### 5. Аналитика (`src/components/Analytics/AnalyticsProvider.jsx`)

Интеграция с основными системами аналитики:
- Google Analytics 4
- Yandex Metrica
- Facebook Pixel

**Настройка:**
```jsx
<AnalyticsProvider
  googleAnalyticsId="G-XXXXXXXXXX"
  yandexMetricaId="XXXXXXXX"
  facebookPixelId="XXXXXXXXXXXXXXX"
>
  {/* Контент приложения */}
</AnalyticsProvider>
```

### 6. SEO Мониторинг (`src/components/SEO/SEOMonitoring.jsx`)

Инструменты для мониторинга SEO производительности:
- Core Web Vitals (LCP, FID, CLS)
- Время загрузки страницы
- Валидация мета-тегов
- Проверка структурированных данных
- Анализ оптимизации изображений
- Проверка мобильной совместимости

## Файлы конфигурации

### sitemap.xml (`public/sitemap.xml`)
Автоматически сгенерированная карта сайта с:
- Всеми основными страницами
- Языковыми альтернативами (hreflang)
- Приоритетами и частотой обновления
- Правильными URL структурами

### robots.txt (`public/robots.txt`)
Оптимизированный файл robots.txt с:
- Разрешениями и запретами для ботов
- Ссылкой на sitemap
- Директивами для очистки параметров
- Host директивой

## Настройка

### 1. Установка зависимостей
```bash
npm install react-helmet-async
```

### 2. Оборачивание приложения в HelmetProvider
```jsx
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      {/* Ваше приложение */}
    </HelmetProvider>
  );
}
```

### 3. Настройка аналитики
Замените идентификаторы в `App.jsx`:
```jsx
<AnalyticsProvider
  googleAnalyticsId="ВАШ_GOOGLE_ANALYTICS_ID"
  yandexMetricaId="ВАШ_YANDEX_METRICA_ID"
  facebookPixelId="ВАШ_FACEBOOK_PIXEL_ID"
>
```

### 4. Настройка домена
Обновите базовый URL во всех файлах:
```javascript
const baseUrl = "https://salymbekov-university.kg";
```

## Использование на страницах

### Базовое использование
Просто добавьте компонент в любую страницу:
```jsx
import SEOComponent from '../SEO/SEOComponent';

const MyPage = () => {
  return (
    <div>
      <SEOComponent />
      {/* Содержимое страницы */}
    </div>
  );
};
```

### Страницы с динамическим контентом
```jsx
const NewsDetail = ({ article }) => {
  return (
    <div>
      <SEOComponent 
        isNewsDetail={true}
        newsTitle={article.title}
        newsDescription={article.description}
        customImage={article.image}
      />
      {/* Содержимое статьи */}
    </div>
  );
};
```

## Отслеживание событий

Используйте предопределенные функции для отслеживания действий пользователей:

```jsx
import { trackUniversityEvents } from '../components/Analytics/AnalyticsProvider';

// При заполнении формы заявки
trackUniversityEvents.applicationStart();

// При отправке заявки
trackUniversityEvents.applicationSubmit();

// При просмотре программы
trackUniversityEvents.programView('Лечебное дело');

// При смене языка
trackUniversityEvents.languageChange('en');
```

## Мониторинг в режиме разработки

В режиме разработки автоматически отображается SEO дашборд с метриками:
- Время загрузки страницы
- Core Web Vitals
- Валидность мета-тегов
- Статус структурированных данных
- Мобильная совместимость
- Оптимизация изображений

## Лучшие практики

### 1. Заголовки страниц
- Длина: 10-60 символов
- Уникальные для каждой страницы
- Включают ключевые слова
- Содержат название университета

### 2. Описания страниц
- Длина: 50-160 символов
- Уникальные и информативные
- Призывают к действию
- Содержат основные ключевые слова

### 3. Ключевые слова
- Релевантные контенту страницы
- Включают брендовые термины
- Содержат локальные ключевые слова (Кыргызстан, Бишкек)
- Медицинские термины для специализированных страниц

### 4. Изображения
- Всегда указывайте alt-тексты
- Используйте современные форматы (WebP, AVIF)
- Оптимизируйте размеры для быстрой загрузки
- Создавайте уникальные OG изображения

### 5. Структурированные данные
- Используйте релевантные схемы Schema.org
- Проверяйте валидность через Google Rich Results Test
- Обновляйте данные при изменении контента

## Производительность

### Метрики для мониторинга:
- **LCP (Largest Contentful Paint)**: < 2.5 секунд
- **FID (First Input Delay)**: < 100 миллисекунд
- **CLS (Cumulative Layout Shift)**: < 0.1

### Оптимизация:
- Ленивая загрузка изображений
- Сжатие и кеширование ресурсов
- Минификация CSS и JavaScript
- Использование CDN для статических ресурсов

## Поддержка

Система автоматически:
- Генерирует правильные мета-теги для всех страниц
- Создает структурированные данные
- Отслеживает пользовательские действия
- Мониторит производительность
- Адаптируется к смене языка

Для настройки под специфические требования модифицируйте файлы переводов и конфигурацию компонентов.