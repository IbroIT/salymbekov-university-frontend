import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaEnvelope, FaComment, FaArrowRight, FaMapMarkerAlt, FaPhone, FaClock, FaGlobe, FaBuilding, FaIdCard } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const Contacts = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Карта Университета Салымбекова
  const mapUrl = "https://2gis.kg/bishkek/firm/70000001039696456/74.561483%2C42.878785?m=74.56123%2C42.878447%2F18.87";

  const departments = [
    {
      name: t('contacts.departments.admission.name'),
      phone: "+996 (312) 123-401",
      email: "admission@salymbekov-med.kg",
      hours: t('contacts.departments.admission.hours'),
      head: t('contacts.departments.admission.head'),
      icon: "🎓"
    },
    {
      name: t('contacts.departments.academic.name'),
      phone: "+996 (312) 123-402",
      email: "academic@salymbekov-med.kg",
      hours: t('contacts.departments.academic.hours'),
      head: t('contacts.departments.academic.head'),
      icon: "📚"
    },
    {
      name: t('contacts.departments.research.name'),
      phone: "+996 (312) 123-403",
      email: "research@salymbekov-med.kg",
      hours: t('contacts.departments.research.hours'),
      head: t('contacts.departments.research.head'),
      icon: "🔬"
    },
    {
      name: t('contacts.departments.international.name'),
      phone: "+996 (312) 123-404",
      email: "international@salymbekov-med.kg",
      hours: t('contacts.departments.international.hours'),
      head: t('contacts.departments.international.head'),
      icon: "🌐"
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t('contacts.copiedToClipboard', { text }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            📞 {t('contacts.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-200 max-w-3xl mx-auto"
          >
            {t('contacts.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Контактная информация */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-400/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6">{t('contacts.contactInfo')}</h2>
            
            {/* Табы */}
            <div className="flex mb-6 bg-blue-900/30 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('general')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'general'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                {t('contacts.tabs.general')}
              </button>
              <button
                onClick={() => setActiveTab('departments')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'departments'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-blue-300 hover:text-white'
                }`}
              >
                {t('contacts.tabs.departments')}
              </button>
            </div>

            {activeTab === 'general' ? (
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600/20 p-3 rounded-lg mr-4">
                    <FaBuilding className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{t('contacts.address.title')}</h3>
                    <p className="text-blue-200">{t('contacts.address.value')}</p>
                    <h3 className="font-semibold text-white">Адрес</h3>
                    <p className="text-blue-200">г. Бишкек, ул. Фучика 3</p>
                    <button
                      onClick={() => copyToClipboard(t('contacts.address.value'))}
                      className="text-blue-400 text-sm hover:text-blue-300 mt-1"
                    >
                      {t('contacts.copyAddress')}
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-600/20 p-3 rounded-lg mr-4">
                    <FaPhone className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{t('contacts.phones.title')}</h3>
                    <p className="text-blue-200">+996 (312) 123-456 ({t('contacts.phones.reception')})</p>
                    <p className="text-blue-200">+996 (700) 123-456 ({t('contacts.phones.hotline')})</p>
                    <button
                      onClick={() => copyToClipboard('+996312123456')}
                      className="text-blue-400 text-sm hover:text-blue-300 mt-1"
                    >
                      {t('contacts.copyNumber')}
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-600/20 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-red-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{t('contacts.email.title')}</h3>
                    <p className="text-blue-200">info@salymbekov-med.kg</p>
                    <p className="text-blue-200">support@salymbekov-med.kg</p>
                    <button
                      onClick={() => copyToClipboard('info@salymbekov-med.kg')}
                      className="text-blue-400 text-sm hover:text-blue-300 mt-1"
                    >
                      {t('contacts.copyEmail')}
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-600/20 p-3 rounded-lg mr-4">
                    <FaClock className="text-yellow-400 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{t('contacts.hours.title')}</h3>
                    <p className="text-blue-200">{t('contacts.hours.weekdays')}</p>
                    <p className="text-blue-200">{t('contacts.hours.saturday')}</p>
                    <p className="text-blue-200">{t('contacts.hours.sunday')}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowContactForm(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  {t('contacts.sendMessage')}
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="bg-blue-900/30 rounded-lg p-4 hover:bg-blue-800/30 transition-colors border border-blue-400/10"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{dept.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-2">{dept.name}</h4>
                        <p className="text-sm text-blue-200 mb-1">📞 {dept.phone}</p>
                        <p className="text-sm text-blue-200 mb-1">📧 {dept.email}</p>
                        <p className="text-sm text-blue-200 mb-1">🕒 {dept.hours}</p>
                        <p className="text-xs text-blue-300">{t('contacts.departments.head')}: {dept.head}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Карта */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-blue-400/20"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" />
              {t('contacts.map.title')}
            </h2>
            
            {!isMapLoaded ? (
              <div className="h-96 bg-blue-900/30 rounded-xl animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2 text-blue-400">🗺️</div>
                  <p className="text-blue-300">{t('contacts.map.loading')}</p>
                </div>
              </div>
            ) : (
              <div className="h-96 rounded-xl relative overflow-hidden">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-xl"
                  aria-label={t('contacts.map.ariaLabel')}
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/80 to-transparent p-4 pt-6">
                  <div className="flex flex-col gap-2 text-white">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-red-400 text-xl mt-1" />
                      <div>
                        <p className="font-bold">{t('contacts.map.universityName')}</p>
                        <p className="text-sm opacity-90">{t('contacts.address.value')}</p>
                        <p className="font-bold">Университет Салымбекова</p>
                        <p className="text-sm opacity-90">г. Бишкек, ул. Фучика 3</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <FaPhone className="text-blue-300 opacity-80" />
                      <p className="text-sm">+996 (312) 123-456</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <FaClock className="text-blue-300 opacity-80" />
                      <p className="text-sm">{t('contacts.hours.weekdays')}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Инструкция под картой */}
            <div className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-400/20">
              <h4 className="font-semibold text-white mb-2">{t('contacts.map.howToGet')}</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• {t('contacts.map.transport.buses')}</li>
                <li>• {t('contacts.map.transport.minibuses')}</li>
                <li>• {t('contacts.map.transport.taxi')}</li>
                <li>• {t('contacts.map.transport.car')}</li>
                <li>• Автобусы: 8, 15, 35, 254 до остановки "Шлагбаум"</li>
                <li>• Маршрутки: 173, 185, 200 А, 218, 290, 386, 935</li>
                <li>• Такси: назовите адрес "ул. Фучика 3"</li>
                <li>• Авто: парковка на территории кампуса</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Быстрые действия */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-400/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">🚀 {t('contacts.quickActions.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="tel:+996312123456"
              className="bg-green-600/20 hover:bg-green-600/30 text-white p-4 rounded-xl text-center transition-all border border-green-400/20"
            >
              <div className="text-2xl mb-2">📞</div>
              <p className="font-semibold">{t('contacts.quickActions.call')}</p>
              <p className="text-sm opacity-90">{t('contacts.phones.reception')}</p>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="mailto:info@salymbekov-med.kg"
              className="bg-blue-600/20 hover:bg-blue-600/30 text-white p-4 rounded-xl text-center transition-all border border-blue-400/20"
            >
              <div className="text-2xl mb-2">📧</div>
              <p className="font-semibold">{t('contacts.quickActions.write')}</p>
              <p className="text-sm opacity-90">Email</p>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => copyToClipboard(t('contacts.address.value'))}
              className="bg-purple-600/20 hover:bg-purple-600/30 text-white p-4 rounded-xl text-center transition-all border border-purple-400/20"
            >
              <div className="text-2xl mb-2">📋</div>
              <p className="font-semibold">{t('contacts.quickActions.copy')}</p>
              <p className="text-sm opacity-90">{t('contacts.address.title')}</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowContactForm(true)}
              className="bg-orange-600/20 hover:bg-orange-600/30 text-white p-4 rounded-xl text-center transition-all border border-orange-400/20"
            >
              <div className="text-2xl mb-2">📝</div>
              <p className="font-semibold">{t('contacts.quickActions.application')}</p>
              <p className="text-sm opacity-90">{t('contacts.quickActions.onlineForm')}</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Социальные сети */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-blue-400/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FaGlobe className="text-cyan-400" />
            {t('contacts.social.title')}
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Facebook", icon: "📘", color: "bg-blue-600/20", border: "border-blue-400/20", handle: "/SalymbekovUniversity" },
              { name: "Instagram", icon: "📷", color: "bg-pink-600/20", border: "border-pink-400/20", handle: "@salymbekovuniversity" },
              { name: "Twitter", icon: "🐦", color: "bg-sky-600/20", border: "border-sky-400/20", handle: "@SalymbekovUniversity" },
              { name: "YouTube", icon: "📺", color: "bg-red-600/20", border: "border-red-400/20", handle: "Salymbekov University" }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.05 }}
                href="#"
                className={`${social.color} hover:${social.color.replace('20', '30')} text-white p-4 rounded-xl text-center transition-all border ${social.border}`}
              >
                <div className="text-2xl mb-2">{social.icon}</div>
                <p className="font-semibold">{social.name}</p>
                <p className="text-sm opacity-90">{social.handle}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Модальное окно с формой */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900 rounded-2xl p-8 border border-blue-400/30 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaPaperPlane className="text-cyan-400 text-2xl" />
                <h3 className="text-2xl font-bold text-white">
                  {t('contacts.contactForm.title')}
                </h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="ml-auto text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>

              <form className="space-y-5">
                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-blue-400/80" />
                  </div>
                  <input
                    type="text"
                    placeholder={t('contacts.contactForm.namePlaceholder')}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-blue-400/80" />
                  </div>
                  <input
                    type="email"
                    placeholder={t('contacts.contactForm.emailPlaceholder')}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  />
                </motion.div>

                <motion.div whileFocus={{ scale: 1.02 }} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                    <FaComment className="text-blue-400/80" />
                  </div>
                  <textarea
                    placeholder={t('contacts.contactForm.messagePlaceholder')}
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-blue-300/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                  ></textarea>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-bold text-white flex items-center justify-center gap-2 group"
                >
                  {t('contacts.contactForm.sendButton')}
                  <motion.span className="inline-block group-hover:translate-x-1 transition-transform">
                    <FaArrowRight />
                  </motion.span>
                </motion.button>
              </form>

              <div className="mt-4 text-center text-sm text-blue-300/80">
                {t('contacts.contactForm.responseTime')}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;