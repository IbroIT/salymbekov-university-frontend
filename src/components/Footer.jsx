import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Спасибо за подписку на email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-blue-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Колонка 1: О вузе */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">О нашем вузе</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Мы являемся ведущим образовательным учреждением, стремящимся к excellence в обучении, 
              исследованиях и инновациях. Наша миссия - подготовить будущих лидеров к вызовам современного мира.
            </p>
          </div>
          
          {/* Колонка 2: Программы */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Образовательные программы</h3>
            <ul className="space-y-2">
              {['Бакалавриат', 'Магистратура', 'Аспирантура', 'MBA', 'Курсы повышения квалификации'].map((program) => (
                <li key={program}>
                  <a href="#" className="text-blue-100 hover:text-white transition-colors text-sm">
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Колонка 3: Быстрые ссылки */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              {[
                { name: 'Расписание', url: '#' },
                { name: 'Библиотека', url: '#' },
                { name: 'Личный кабинет', url: '#' },
                { name: 'ЭИОС', url: '#' },
                { name: 'Поддержка', url: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.url} className="text-blue-100 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Колонка 4: Контакты */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <address className="text-blue-100 not-italic text-sm">
              <p className="mb-2">г. Москва, ул. Образования, д. 1</p>
              <p className="mb-2">
                Тел: <a href="tel:+74951234567" className="hover:text-white">+7 (495) 123-45-67</a>
              </p>
              <p className="mb-2">
                Email: <a href="mailto:info@university.ru" className="hover:text-white">info@university.ru</a>
              </p>
            </address>
          </div>
          
          {/* Колонка 5: Соцсети и подписка */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
            <div className="flex space-x-3 mb-6">
              {[
                { icon: <FaFacebookF />, url: '#' },
                { icon: <FaTwitter />, url: '#' },
                { icon: <FaInstagram />, url: '#' },
                { icon: <FaLinkedinIn />, url: '#' },
                { icon: <FaTelegramPlane />, url: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="bg-blue-700 hover:bg-blue-600 transition-colors h-10 w-10 rounded-full flex items-center justify-center"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <h3 className="text-xl font-bold mb-4">Подписка на рассылку</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="bg-blue-700 border border-blue-600 rounded px-3 py-2 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-white text-blue-800 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition-colors"
              >
                Подписаться
              </button>
            </form>
          </div>
        </div>
        
        {/* Нижняя часть футера */}
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-sm text-blue-200">
          <p>© {new Date().getFullYear()} Название Университета. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;