// Утилита для получения локализованного значения из объекта API
export const getLocalizedValue = (obj, field, language = 'ru') => {
    if (!obj) return '';

    const languageMap = {
        'ru': '',
        'kg': '_kg',
        'en': '_en'
    };

    const suffix = languageMap[language] || '';
    const localizedField = field + suffix;

    return obj[localizedField] || obj[field] || '';
};

// Утилита для получения локализованного массива
export const getLocalizedArray = (obj, field, language = 'ru') => {
    if (!obj) return [];

    const languageMap = {
        'ru': '',
        'kg': '_kg',
        'en': '_en'
    };

    const suffix = languageMap[language] || '';
    const localizedField = field + suffix;

    return obj[localizedField] || obj[field] || [];
};

// Получить текущий язык из i18n
export const getCurrentLanguage = () => {
    // Если используется react-i18next
    try {
        // Для React i18next, проверяем глобальный объект
        if (typeof window !== 'undefined' && window.i18n) {
            return window.i18n.language || 'ru';
        }

        // Попробуем получить из localStorage (используется react-i18next)
        const storedLang = localStorage.getItem('i18nextLng');
        if (storedLang) {
            // Убираем суффиксы типа '-US', '-RU' и берем только основную часть
            return storedLang.split('-')[0].toLowerCase();
        }

        return 'ru';
    } catch (e) {
        console.warn('Error getting language:', e);
        return 'ru';
    }
};