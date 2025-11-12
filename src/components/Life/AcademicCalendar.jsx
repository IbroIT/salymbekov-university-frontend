import React, { useState, useEffect } from 'react';
import { BarChart, BookOpen, FileEdit, Flower2, GraduationCap, Hospital, Leaf, Snowflake, Sun, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  AcademicCapIcon,
  ClockIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const AcademicCalendar = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('fall');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Данные академического календаря
  const calendarData = {
    fall: {
      name: t('academicCalendar.fall.name', 'Осенний семестр'),
      period: t('academicCalendar.fall.period', 'Сентябрь - Декабрь'),
      events: [
        {
          id: 1,
          title: t('academicCalendar.fall.events.0.title', 'Начало учебного года'),
          date: t('academicCalendar.fall.events.0.date', '1 сентября'),
          description: t('academicCalendar.fall.events.0.description', 'Торжественная линейка и начало занятий'),
          Icon: GraduationCap,
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 2,
          title: t('academicCalendar.fall.events.1.title', 'Рубежный контроль 1'),
          date: t('academicCalendar.fall.events.1.date', '15-20 октября'),
          description: t('academicCalendar.fall.events.1.description', 'Первая промежуточная аттестация'),
          Icon: FileEdit,
          color: 'from-purple-500 to-pink-500'
        },
        {
          id: 3,
          title: t('academicCalendar.fall.events.2.title', 'Рубежный контроль 2'),
          date: t('academicCalendar.fall.events.2.date', '25-30 ноября'),
          description: t('academicCalendar.fall.events.2.description', 'Вторая промежуточная аттестация'),
          Icon: BarChart,
          color: 'from-orange-500 to-red-500'
        },
        {
          id: 4,
          title: t('academicCalendar.fall.events.3.title', 'Итоговая аттестация'),
          date: t('academicCalendar.fall.events.3.date', '15-25 декабря'),
          description: t('academicCalendar.fall.events.3.description', 'Экзаменационная сессия'),
          Icon: Target,
          color: 'from-green-500 to-emerald-500'
        },
        {
          id: 5,
          title: t('academicCalendar.fall.events.4.title', 'Зимние каникулы'),
          date: t('academicCalendar.fall.events.4.date', '26 декабря - 10 января'),
          description: t('academicCalendar.fall.events.4.description', 'Период отдыха'),
          Icon: Snowflake,
          color: 'from-indigo-500 to-blue-500'
        }
      ]
    },
    spring: {
      name: t('academicCalendar.spring.name', 'Весенний семестр'),
      period: t('academicCalendar.spring.period', 'Январь - Май'),
      events: [
        {
          id: 6,
          title: t('academicCalendar.spring.events.0.title', 'Начало весеннего семестра'),
          date: t('academicCalendar.spring.events.0.date', '11 января'),
          description: t('academicCalendar.spring.events.0.description', 'Продолжение учебного года'),
          Icon: BookOpen,
          color: 'from-blue-500 to-cyan-500'
        },
        {
          id: 7,
          title: t('academicCalendar.spring.events.1.title', 'Рубежный контроль 1'),
          date: t('academicCalendar.spring.events.1.date', '20-25 февраля'),
          description: t('academicCalendar.spring.events.1.description', 'Первая промежуточная аттестация'),
          Icon: FileEdit,
          color: 'from-purple-500 to-pink-500'
        },
        {
          id: 8,
          title: t('academicCalendar.spring.events.2.title', 'Рубежный контроль 2'),
          date: t('academicCalendar.spring.events.2.date', '25-30 марта'),
          description: t('academicCalendar.spring.events.2.description', 'Вторая промежуточная аттестация'),
          Icon: BarChart,
          color: 'from-orange-500 to-red-500'
        },
        {
          id: 9,
          title: t('academicCalendar.spring.events.3.title', 'Практика'),
          date: t('academicCalendar.spring.events.3.date', '1-30 апреля'),
          description: t('academicCalendar.spring.events.3.description', 'Производственная практика'),
          Icon: Hospital,
          color: 'from-teal-500 to-cyan-500'
        },
        {
          id: 10,
          title: t('academicCalendar.spring.events.4.title', 'Итоговая аттестация'),
          date: t('academicCalendar.spring.events.4.date', '15-30 мая'),
          description: t('academicCalendar.spring.events.4.description', 'Экзаменационная сессия'),
          Icon: Target,
          color: 'from-green-500 to-emerald-500'
        }
      ]
    },
    summer: {
      name: t('academicCalendar.summer.name', 'Летний период'),
      period: t('academicCalendar.summer.period', 'Июнь - Август'),
      events: [
        {
          id: 11,
          title: t('academicCalendar.summer.events.0.title', 'Летние каникулы'),
          date: t('academicCalendar.summer.events.0.date', '1 июня - 31 августа'),
          description: t('academicCalendar.summer.events.0.description', 'Период отдыха и подготовки'),
          Icon: Sun,
          color: 'from-yellow-500 to-orange-500'
        },
        {
          id: 12,
          title: t('academicCalendar.summer.events.1.title', 'Летняя практика'),
          date: t('academicCalendar.summer.events.1.date', '1-30 июня'),
          description: t('academicCalendar.summer.events.1.description', 'Клиническая практика для старших курсов'),
          Icon: Hospital,
          color: 'from-teal-500 to-cyan-500'
        },
        {
          id: 13,
          title: t('academicCalendar.summer.events.2.title', 'Дополнительная сессия'),
          date: t('academicCalendar.summer.events.2.date', '1-15 июля'),
          description: t('academicCalendar.summer.events.2.description', 'Пересдача задолженностей'),
          Icon: FileEdit,
          color: 'from-purple-500 to-pink-500'
        }
      ]
    }
  };

  const tabs = [
  { id: 'fall', name: t('academicCalendar.tabs.fall', 'Осенний'), Icon: Leaf },
  { id: 'spring', name: t('academicCalendar.tabs.spring', 'Весенний'), Icon: Flower2 },
  { id: 'summer', name: t('academicCalendar.tabs.summer', 'Летний'), Icon: Sun }
  ];

  const currentSemester = calendarData[activeTab];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('academicCalendar.title', 'Академический календарь')}
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {t('academicCalendar.subtitle', 'Основные события и даты учебного года')}
          </p>
        </motion.div>

        {/* Табы для переключения семестров */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-xl bg-white p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">
                <tab.Icon className="w-6 h-6" />
              </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Информация о семестре */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{currentSemester.name}</h2>
              <div className="flex items-center text-gray-600 mt-2">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span className="text-lg">{currentSemester.period}</span>
              </div>
            </div>
            <div className="hidden md:block">
              <CalendarDaysIcon className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* События семестра */}
          <div className="space-y-4">
            {currentSemester.events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${event.color} flex items-center justify-center text-3xl mr-4 flex-shrink-0`}
                  >
                <event.Icon className="w-6 h-6" />
              </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-blue-600 mb-2">
                      <CalendarDaysIcon className="w-4 h-4 mr-2" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Важная информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl"
        >
          <div className="flex items-start">
            <ExclamationCircleIcon className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                {t('academicCalendar.importantNote.title', 'Важная информация')}
              </h3>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• {t('academicCalendar.importantNote.item1', 'Даты могут быть изменены в соответствии с решением учебного управления')}</li>
                <li>• {t('academicCalendar.importantNote.item2', 'Следите за объявлениями на официальном сайте университета')}</li>
                <li>• {t('academicCalendar.importantNote.item3', 'Точные даты экзаменов публикуются за 2 недели до начала сессии')}</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
