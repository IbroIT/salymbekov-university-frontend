import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(t('footer.subscriptionAlert', { email }));
    setEmail('');
  };

  return (
    <footer className="bg-blue-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Колонка 1: О вузе */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.aboutTitle')}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              {t('footer.aboutDescription')}
            </p>
          </div>
          
          {/* Колонка 2: Контакты */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.contactsTitle')}</h3>
            <address className="text-blue-100 not-italic text-sm">
              <p className="mb-2">{t('footer.address')}</p>
              <p className="mb-2">
                {t('footer.phone')}: <a href="tel:+996312123456" className="hover:text-white">+996 (312) 123-456</a>
              </p>
              <p className="mb-2">
                Email: <a href="mailto:info@salymbekov-university.kg" className="hover:text-white">info@salymbekov-university.kg</a>
              </p>
            </address>
          </div>
          
          {/* Колонка 3: Соцсети и подписка */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">{t('footer.socialTitle')}</h3>
            <div className="flex space-x-3 mb-6">
              {[
                { icon: <FaFacebookF />, url: '#', name: 'Facebook' },
                { icon: <FaTwitter />, url: '#', name: 'Twitter' },
                { icon: <FaInstagram />, url: '#', name: 'Instagram' },
                { icon: <FaLinkedinIn />, url: '#', name: 'LinkedIn' },
                { icon: <FaTelegramPlane />, url: '#', name: 'Telegram' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="bg-blue-700 hover:bg-blue-600 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-4">{t('footer.subscriptionTitle')}</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder')}
                required
                className="bg-blue-700 border border-blue-600 rounded px-3 py-2 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-blue-800 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition-colors"
              >
                {t('footer.subscribeButton')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Нижняя часть футера */}
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;