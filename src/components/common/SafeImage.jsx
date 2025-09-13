import { getSafeImageUrl } from '../../utils/imageUtils';

/**
 * Компонент безопасного изображения с fallback
 * @param {Object} props - пропсы компонента
 * @param {string} props.src - URL изображения
 * @param {string} props.alt - альтернативный текст
 * @param {string} props.className - CSS классы
 * @param {React.ReactNode} props.fallback - fallback элемент
 * @returns {React.ReactElement} - элемент изображения или fallback
 */
export const SafeImage = ({ src, alt, className, fallback, ...props }) => {
  const safeUrl = getSafeImageUrl(src);
  
  if (safeUrl) {
    return (
      <img
        src={safeUrl}
        alt={alt}
        className={className}
        {...props}
      />
    );
  }
  
  return fallback || (
    <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
      <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
    </div>
  );
};

export default SafeImage;
