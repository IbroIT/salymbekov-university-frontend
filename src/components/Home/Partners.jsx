import React, { useState, useEffect } from 'react';

const Partners = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  // Данные партнеров
  const partners = [
    { id: 1, name: 'Национальный госпиталь', icon: '🏥' },
    { id: 2, name: 'Городская клиническая больница', icon: '🏨' },
    { id: 3, name: 'Частные медицинские центры', icon: '⛑️' },
    { id: 4, name: 'ВОЗ', icon: '🌐' },
    { id: 5, name: 'Красный Крест', icon: '➕' },
    { id: 6, name: 'Медицинская ассоциация', icon: '⚕️' },
    { id: 7, name: 'Институт здоровья', icon: '🔬' },
    { id: 8, name: 'Фонд медицинских исследований', icon: '💉' },
  ];

  // Удваиваем массив для бесшовной анимации
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-12 bg-blue-600 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Наши партнеры</h2>
        
        <div 
          className="relative flex overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex whitespace-nowrap ${isPaused ? 'animate-pause' : 'animate-scroll'}`}
            style={{ animationDuration: '30s' }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.id}-${index}`} 
                className="inline-flex flex-col items-center mx-8 p-6 bg-blue-500 rounded-xl transition-all duration-300 hover:bg-blue-400 hover:scale-105"
              >
                <span className="text-5xl mb-3">{partner.icon}</span>
                <span className="text-lg font-medium text-center">{partner.name}</span>
              </div>
            ))}
          </div>
          
          {/* Градиентные затемнения по краям */}
          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-600 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-600 to-transparent z-10"></div>
        </div>
        
        <p className="text-center mt-8 text-blue-200 text-sm">
          Наведите курсор на бегущую строку, чтобы приостановить анимацию
        </p>
      </div>
      
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          .animate-pause {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default Partners;