/**
 * Проверяет, является ли URL изображения валидным и не пустым
 * @param {string} imageUrl - URL изображения для проверки
 * @returns {boolean} - true если URL валидный, false если нет
 */
export const isValidImageUrl = (imageUrl) => {
  return imageUrl && 
         typeof imageUrl === 'string' && 
         imageUrl.trim() !== '' && 
         imageUrl !== 'null' && 
         imageUrl !== 'undefined';
};

/**
 * Возвращает валидный URL изображения или null
 * @param {string} imageUrl - URL изображения для проверки
 * @returns {string|null} - валидный URL или null
 */
export const getSafeImageUrl = (imageUrl) => {
  return isValidImageUrl(imageUrl) ? imageUrl : null;
};

export default {
  isValidImageUrl,
  getSafeImageUrl
};
