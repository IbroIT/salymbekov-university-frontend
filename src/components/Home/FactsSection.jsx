import { useState, useEffect, useRef } from 'react';
import './Facts.css'
const CounterItem = ({ end, icon, label, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setTimeout(() => {
            setHasAnimated(true);
            
            let startTime = null;
            const step = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              
              // Эффект замедления в конце
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              setCount(Math.floor(easeOutQuart * end));
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            
            window.requestAnimationFrame(step);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated, delay]);

  return (
    <div 
      ref={ref} 
      className={`text-center p-8 bg-white rounded-2xl shadow-xl transform transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100 hover:shadow-2xl hover:-translate-y-2' 
          : 'opacity-0 translate-y-10 scale-95'
      }`}
    >
      <div className="relative inline-block mb-4">
        <div className="text-5xl mb-2">{icon}</div>
        {hasAnimated && (
          <div className="absolute -top-2 -right-4">
            <div className="relative">
              <div className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-blue-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-5 w-5 bg-blue-600"></div>
            </div>
          </div>
        )}
      </div>
      <div className="text-5xl font-bold text-blue-600 mb-2 transition-all duration-300">
        {count.toLocaleString()}+
      </div>
      <div className="text-lg text-gray-700 font-medium bg-blue-50 py-2 px-4 rounded-full inline-block">
        {label}
      </div>
      {hasAnimated && (
        <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mx-auto"></div>
      )}
    </div>
  );
};

const AnimatedFactsSection = () => {
  const facts = [
    { end: 5000, icon: "👨‍🎓", label: "студентов", delay: 0 },
    { end: 2500, icon: "🎓", label: "выпускников", delay: 200 },
    { end: 25, icon: "📚", label: "образовательных программ", delay: 400 },
    { end: 50, icon: "🏥", label: "партнерских клиник", delay: 600 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6 relative inline-block">
            Цифры и факты
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Наши достижения за годы работы в сфере образования
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact, index) => (
            <CounterItem
              key={index}
              end={fact.end}
              icon={fact.icon}
              label={fact.label}
              delay={fact.delay}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-2 animate-bounce">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animation-delay-200"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animation-delay-400"></div>
          </div>
          <p className="text-gray-500 mt-2">Прокрутите вниз, чтобы увидеть больше</p>
        </div>
      </div>
    </section>
  );
};

export default AnimatedFactsSection;