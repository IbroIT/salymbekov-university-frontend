// Утилиты для работы с мультиязычными полями из API

/**
 * Получает текст на нужном языке из объекта с мультиязычными полями
 * @param {Object} item - объект с полями вида field_ru, field_kg, field_en
 * @param {string} fieldName - базовое имя поля (без суффикса языка)
 * @param {string} currentLanguage - текущий язык ('ru', 'kg', 'en')
 * @param {string} fallback - резервное значение, если поле не найдено
 * @returns {string} текст на нужном языке или резервное значение
 */
export const getLocalizedField = (item, fieldName, currentLanguage = 'ru', fallback = '') => {
  if (!item) return fallback;
  
  // Маппинг языков
  const langSuffix = currentLanguage === 'kg' ? 'kg' : currentLanguage === 'en' ? 'en' : 'ru';
  
  // Пытаемся получить поле на нужном языке
  const localizedField = item[`${fieldName}_${langSuffix}`];
  if (localizedField) return localizedField;
  
  // Если поле на нужном языке не найдено, пробуем русский как fallback
  if (langSuffix !== 'ru' && item[`${fieldName}_ru`]) {
    return item[`${fieldName}_ru`];
  }
  
  // Если русского нет, пробуем английский
  if (langSuffix !== 'en' && item[`${fieldName}_en`]) {
    return item[`${fieldName}_en`];
  }
  
  // Если английского нет, пробуем кыргызский
  if (langSuffix !== 'kg' && item[`${fieldName}_kg`]) {
    return item[`${fieldName}_kg`];
  }
  
  // Если ничего не найдено, возвращаем резервное значение
  return fallback;
};

/**
 * Получает локализованное имя категории
 * @param {Object} category - объект категории
 * @param {string} currentLanguage - текущий язык
 * @returns {string} название категории на нужном языке
 */
export const getLocalizedCategoryName = (category, currentLanguage = 'ru') => {
  if (!category) return '';
  
  // Если это объект с мультиязычными полями
  if (category.name_ru || category.name_kg || category.name_en) {
    return getLocalizedField(category, 'name', currentLanguage, category.name || '');
  }
  
  // Если это просто строка или старый формат
  return category.name || category;
};

/**
 * Подготавливает объект новости для отображения с учетом языка
 * @param {Object} news - объект новости из API
 * @param {string} currentLanguage - текущий язык
 * @returns {Object} новость с локализованными полями
 */
export const localizeNewsItem = (news, currentLanguage = 'ru') => {
  if (!news) return null;
  
  return {
    ...news,
    title: getLocalizedField(news, 'title', currentLanguage, news.title),
    summary: getLocalizedField(news, 'summary', currentLanguage, news.summary),
    content: getLocalizedField(news, 'content', currentLanguage, news.content),
    author: getLocalizedField(news, 'author', currentLanguage, news.author),
    category: {
      ...news.category,
      name: getLocalizedCategoryName(news.category, currentLanguage)
    }
  };
};

/**
 * Подготавливает объект события для отображения с учетом языка
 * @param {Object} event - объект события из API
 * @param {string} currentLanguage - текущий язык
 * @returns {Object} событие с локализованными полями
 */
export const localizeEventItem = (event, currentLanguage = 'ru') => {
  if (!event) return null;
  
  return {
    ...event,
    location: getLocalizedField(event, 'location', currentLanguage, event.location),
    // Локализуем связанную новость
    news: event.news ? localizeNewsItem(event.news, currentLanguage) : null
  };
};

/**
 * Подготавливает массив элементов для отображения с учетом языка
 * @param {Array} items - массив элементов
 * @param {string} type - тип элементов ('news', 'events', 'vacancies')
 * @param {string} currentLanguage - текущий язык
 * @returns {Array} массив с локализованными элементами
 */
export const localizeItems = (items, type = 'news', currentLanguage = 'ru') => {
  if (!Array.isArray(items)) return [];
  
  switch (type) {
    case 'news':
      return items.map(item => localizeNewsItem(item, currentLanguage));
    case 'events':
      return items.map(item => localizeEventItem(item, currentLanguage));
    default:
      return items.map(item => ({
        ...item,
        title: getLocalizedField(item, 'title', currentLanguage, item.title),
        description: getLocalizedField(item, 'description', currentLanguage, item.description),
        name: getLocalizedField(item, 'name', currentLanguage, item.name)
      }));
  }
};
