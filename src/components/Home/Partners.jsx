import React, { useState, useEffect, useRef } from 'react';
import { Globe, Hospital, Microscope } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Partners = () => {
  const { t } = useTranslation();
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const scrollerRef = useRef(null);
  
  // Данные партнеров с улучшенным дизайном
  const partners = [
    { 
      id: 1, 
      nameKey: 'partners.nationalHospital', 
      icon: "Hospital", 
      color: 'from-blue-500 to-indigo-600',
      glow: 'hover:shadow-blue-500/50'
    },
    { 
      id: 2, 
      nameKey: 'partners.cityHospital', 
      icon: '🏨', 
      color: 'from-purple-500 to-pink-600',
      glow: 'hover:shadow-purple-500/50'
    },
    { 
      id: 3, 
      nameKey: 'partners.medicalCenters', 
      icon: '<HardHat className="w-5 h-5" />', 
      color: 'from-green-500 to-teal-600',
      glow: 'hover:shadow-green-500/50'
    },
    { 
      id: 4, 
      nameKey: 'partners.who', 
      icon: "Globe", 
      color: 'from-amber-500 to-orange-600',
      glow: 'hover:shadow-amber-500/50'
    },
    { 
      id: 5, 
      nameKey: 'partners.redCross', 
      icon: '➕', 
      color: 'from-red-500 to-rose-600',
      glow: 'hover:shadow-red-500/50'
    },
    { 
      id: 6, 
      nameKey: 'partners.medicalAssociation', 
      icon: '<Stethoscope className="w-5 h-5" />', 
      color: 'from-indigo-500 to-blue-600',
      glow: 'hover:shadow-indigo-500/50'
    },
    { 
      id: 7, 
      nameKey: 'partners.healthInstitute', 
      icon: "Microscope", 
      color: 'from-pink-500 to-rose-600',
      glow: 'hover:shadow-pink-500/50'
    },
    { 
      id: 8, 
      nameKey: 'partners.researchFoundation', 
      icon: '<Syringe className="w-5 h-5" />', 
      color: 'from-teal-500 to-emerald-600',
      glow: 'hover:shadow-teal-500/50'
    },
  ];

  // Удваиваем массив для бесшовной анимации
  const duplicatedPartners = [...partners, ...partners];

  // Эффект для плавного скролла с requestAnimationFrame
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    
    let animationId;
    let position = 0;
    const speed = 0.5; // px per frame
    
    const animate = () => {
      position -= speed;
      
      // Reset position when scrolled halfway
      if (Math.abs(position) > scroller.scrollWidth / 2) {
        position = 0;
      }
      
      scroller.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300">
            {t('partners.title')}
          </span>
        </h2>
        
        <div className="relative py-6">
          <div 
            ref={scrollerRef}
            className="flex whitespace-nowrap"
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`} 
                className={`inline-flex flex-col items-center mx-4 p-6 rounded-2xl bg-gradient-to-r ${partner.color} transition-all duration-500 transform hover:-translate-y-2 ${partner.glow} hover:shadow-2xl`}
                style={{ minWidth: '220px' }}
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                <span className={`text-5xl mb-3 transition-transform duration-700 ${hoveredPartner === partner.id ? 'scale-125 rotate-12' : ''}`}>
               
              </span>
                <span className="text-lg font-medium text-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  {t(partner.nameKey)}
                </span>
                {/* Индикатор наведения */}
                <div className={`absolute -bottom-2 w-10 h-1 bg-white rounded-full transition-all duration-300 ${hoveredPartner === partner.id ? 'scale-125 opacity-100' : 'scale-0 opacity-0'}`} />
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Partners;