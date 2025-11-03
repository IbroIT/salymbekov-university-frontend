import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Logo from '../assets/Logo_white3.png';
const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(t('footer.subscriptionAlert', { email }));
    setEmail('');
  };

  const socialLinks = [
    { 
      icon: <FaFacebookF className="text-lg" />, 
      url: 'https://www.facebook.com/salymbekov.kg', 
      name: 'Facebook',
      color: 'hover:bg-blue-500'
    },
    { 
      icon: <FaTwitter className="text-lg" />, 
      url: 'https://x.com/SalymbekovO', 
      name: 'Twitter',
      color: 'hover:bg-sky-500'
    },
    { 
      icon: <FaInstagram className="text-lg" />, 
      url: 'https://www.instagram.com/salymbekovuniversity/', 
      name: 'Instagram',
      color: 'hover:bg-pink-600'
    },
    { 
      icon: <FaYoutube className="text-lg" />, 
      url: 'https://www.youtube.com/@salymbekovuniversity8213', 
      name: 'YouTube',
      color: 'hover:bg-red-600'
    },
    { 
      icon: <FaWhatsapp className="text-lg" />, 
      url: 'https://api.whatsapp.com/send/?phone=996505658518&text&type=phone_number&app_absent=0', 
      name: 'WhatsApp',
      color: 'hover:bg-green-500'
    }
  ];

  const quickLinks = [
    { title: t('nav.about'), link: '/hsm/about' },
    { title: t('nav.HSM'), link: '/hsm/about' },
    { title: t('nav.admission'), link: '/admissions/procedure' },
    { title: t('nav.news'), link: '/news' },
    { title: t('nav.contacts'), link: '/contacts' },
    { title: t('nav.apply'), link: '/admissions/apply' }
  ];

  return (
    <footer className={`bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Основной контент */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Колонка 1: Лого и описание */}
          <div className="lg:col-span-1">
            <div className="mb-6">
                <img src={Logo} alt="Salymbekov University Logo" className="h-full w-full object-contain" />
              
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              {t('footer.aboutDescription')}
            </p>
          </div>
          
          {/* Колонка 2: Быстрые ссылки */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              {t('footer.quickLinks')}
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-400 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.link}
                    className="flex items-center text-blue-100 hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">
                      {link.title}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Колонка 3: Контакты */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              {t('footer.contactsTitle')}
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-400 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-600/50 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaMapMarkerAlt className="text-blue-200" />
                </div>
                <p className="text-blue-100 text-sm flex-1 group-hover:text-white transition-colors duration-300">
                  {t('footer.address')}
                </p>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-600/50 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaPhone className="text-blue-200" />
                </div>
                <p className="text-blue-100 text-sm flex-1">
                  <a 
                    href="tel:+996312123456" 
                    className="hover:text-white transition-colors duration-300 block"
                  >
                    +996 (312) 123-456
                  </a>
                </p>
              </div>
              
              <div className="flex items-start space-x-3 group">
                <div className="bg-blue-600/50 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <FaEnvelope className="text-blue-200" />
                </div>
                <p className="text-blue-100 text-sm flex-1">
                  <a 
                    href="mailto:info@salymbekov-university.kg" 
                    className="hover:text-white transition-colors duration-300 block"
                  >
                    info@salymbekov-university.kg
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Колонка 4: Соцсети */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-6 relative inline-block">
              {t('footer.socialTitle')}
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-400 rounded-full"></div>
            </h3>
            <p className="text-blue-100 text-sm mb-6">
              {t('footer.followUs')}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg ${social.color}`}
                  aria-label={social.name}
                >
                  <div className="text-white">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Нижняя часть футера */}
      <div className="border-t border-blue-700/50">
        <div className="container mx-auto px-4 py-6 flex justify-center items-center">
          <p className="text-blue-200 text-sm text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;