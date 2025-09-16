import i18n from '../i18n';

/**
 * Получает текст на текущем языке из мультиязычного объекта
 * @param {Object} item - объект с полями field_ru, field_kg, field_en
 * @param {string} fieldName - название поля без суффикса языка
 * @param {string} fallback - значение по умолчанию
 * @returns {string} текст на текущем языке
 */
export const getMultilingualText = (item, fieldName, fallback = '') => {
  if (!item) return fallback;
  
  const currentLanguage = i18n.language || 'ru';
  const languageSuffix = currentLanguage === 'kg' ? '_kg' : 
                        currentLanguage === 'en' ? '_en' : '_ru';
  
  const multilingualField = `${fieldName}${languageSuffix}`;
  
  // Возвращаем текст на текущем языке или fallback на совместимое поле
  return item[multilingualField] || item[fieldName] || fallback;
};

/**
 * Получает массив текстов на текущем языке
 * @param {Array} items - массив мультиязычных объектов
 * @param {string} fieldName - название поля без суффикса языка
 * @returns {Array} массив текстов на текущем языке
 */
export const getMultilingualArray = (items, fieldName) => {
  if (!Array.isArray(items)) return [];
  
  return items.map(item => getMultilingualText(item, fieldName, ''));
};

/**
 * Адаптирует объект с мультиязычными полями для текущего языка
 * @param {Object} item - исходный объект
 * @param {Array} fields - массив названий полей для адаптации
 * @returns {Object} объект с полями, адаптированными для текущего языка
 */
export const adaptMultilingualObject = (item, fields) => {
  if (!item) return item;
  
  const adaptedItem = { ...item };
  
  fields.forEach(fieldName => {
    adaptedItem[fieldName] = getMultilingualText(item, fieldName, item[fieldName]);
  });
  
  return adaptedItem;
};

/**
 * Адаптирует массив объектов с мультиязычными полями
 * @param {Array} items - массив исходных объектов  
 * @param {Array} fields - массив названий полей для адаптации
 * @returns {Array} массив адаптированных объектов
 */
export const adaptMultilingualArray = (items, fields) => {
  if (!Array.isArray(items)) return items;
  
  return items.map(item => adaptMultilingualObject(item, fields));
};
