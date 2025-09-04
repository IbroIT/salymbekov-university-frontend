import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ruLocale from '@fullcalendar/core/locales/ru';

const Calendar = () => {
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredTypes, setFilteredTypes] = useState(['Учебный период', 'Экзаменационная сессия', 'Каникулы', 'Научное мероприятие', 'Аттестация', 'Мероприятие']);
  const calendarRef = useRef(null);

  // Моковые данные академического календаря
  const calendarEvents = [
    {
      id: 1,
      title: 'Осенний семестр',
      start: '2024-09-01',
      end: '2024-12-20',
      color: '#3B82F6',
      type: 'Учебный период',
      description: 'Начало осеннего семестра 2024-2025 учебного года. Студенты приступают к занятиям по расписанию.',
      icon: '📚'
    },
    {
      id: 2,
      title: 'Осенняя сессия',
      start: '2024-12-23',
      end: '2025-01-10',
      color: '#EF4444',
      type: 'Экзаменационная сессия',
      description: 'Экзаменационная сессия осеннего семестра. Проводятся зачеты и экзамены по всем дисциплинам.',
      icon: '📝'
    },
    {
      id: 3,
      title: 'Зимние каникулы',
      start: '2025-01-11',
      end: '2025-02-02',
      color: '#10B981',
      type: 'Каникулы',
      description: 'Зимние каникулы для студентов. Отдых и восстановление перед следующим семестром.',
      icon: '⛷️'
    },
    {
      id: 4,
      title: 'Весенний семестр',
      start: '2025-02-03',
      end: '2025-05-20',
      color: '#3B82F6',
      type: 'Учебный период',
      description: 'Начало весеннего семестра. Продолжение учебного процесса по утвержденному расписанию.',
      icon: '🌱'
    },
    {
      id: 5,
      title: 'Научная конференция',
      start: '2025-03-15',
      end: '2025-03-17',
      color: '#8B5CF6',
      type: 'Научное мероприятие',
      description: 'Ежегодная научно-практическая конференция студентов и преподавателей. Доклады, дискуссии, мастер-классы.',
      icon: '🔬'
    },
    {
      id: 6,
      title: 'Весенняя сессия',
      start: '2025-05-23',
      end: '2025-06-15',
      color: '#EF4444',
      type: 'Экзаменационная сессия',
      description: 'Экзаменационная сессия весеннего семестра. Зачетная неделя и экзамены.',
      icon: '📖'
    },
    {
      id: 7,
      title: 'Летние каникулы',
      start: '2025-06-16',
      end: '2025-08-31',
      color: '#10B981',
      type: 'Каникулы',
      description: 'Летние каникулы для студентов. Практика, отдых, подготовка к следующему учебному году.',
      icon: '🌞'
    },
    {
      id: 8,
      title: 'День открытых дверей',
      start: '2025-04-12T10:00:00',
      end: '2025-04-12T16:00:00',
      color: '#F59E0B',
      type: 'Мероприятие',
      description: 'День открытых дверей для абитуриентов. Экскурсии по университету, встречи с преподавателями.',
      icon: '🎓'
    },
    {
      id: 9,
      title: 'Защита дипломов',
      start: '2025-06-20',
      end: '2025-06-25',
      color: '#EC4899',
      type: 'Аттестация',
      description: 'Защита выпускных квалификационных работ. Выступление выпускников перед аттестационной комиссией.',
      icon: '🎯'
    },
    {
      id: 10,
      title: 'Международный день врача',
      start: '2024-10-07',
      color: '#6366F1',
      type: 'Мероприятие',
      description: 'Торжественное собрание, посвященное Международному дню врача. Награждение лучших студентов и преподавателей.',
      icon: '👨‍⚕️'
    }
  ];

  // Легенда событий
  const eventTypes = [
    { color: '#3B82F6', label: 'Учебные периоды', icon: '📚', type: 'Учебный период' },
    { color: '#EF4444', label: 'Экзаменационные сессии', icon: '📝', type: 'Экзаменационная сессия' },
    { color: '#10B981', label: 'Каникулы', icon: '🎉', type: 'Каникулы' },
    { color: '#8B5CF6', label: 'Научные мероприятия', icon: '🔬', type: 'Научное мероприятие' },
    { color: '#F59E0B', label: 'Общие мероприятия', icon: '🎓', type: 'Мероприятие' },
    { color: '#EC4899', label: 'Аттестация', icon: '🎯', type: 'Аттестация' }
  ];

  // Фильтрация событий по выбранным типам
  const filteredEvents = calendarEvents.filter(event => 
    filteredTypes.includes(event.type)
  );

  // Обработчик клика по событию
  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  // Экспорт в Google Calendar
  const exportToGoogleCalendar = (event) => {
    const start = event.startStr.split('T')[0];
    const end = event.endStr ? event.endStr.split('T')[0] : start;
    
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start.replace(/-/g, '')}/${end.replace(/-/g, '')}&details=${encodeURIComponent(event.extendedProps.description)}`;
    
    window.open(googleUrl, '_blank');
  };

  // Экспорт в ICS файл
  const exportToICS = (event) => {
    const formatDate = (dateStr) => {
      return dateStr ? dateStr.replace(/-/g, '').replace(/:/g, '') : '';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Medical University//Academic Calendar//RU
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDate(event.startStr)}
DTEND:${formatDate(event.endStr)}
DESCRIPTION:${event.extendedProps.description}
LOCATION:Медицинский университет
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Экспорт всего календаря
  const exportAllToICS = () => {
    const formatDate = (dateStr) => {
      return dateStr ? dateStr.replace(/-/g, '').replace(/:/g, '') : '';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Medical University//Academic Calendar//RU
${calendarEvents.map(event => `
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
DESCRIPTION:${event.description}
LOCATION:Медицинский университет
END:VEVENT
`).join('')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'academic_calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Переключение фильтра типов событий
  const toggleEventType = (type) => {
    setFilteredTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  // Кастомный рендер событий
  const eventContent = (eventInfo) => {
    return (
      <div className="fc-event-content flex items-center p-1">
        <div className="w-2 h-2 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: eventInfo.event.backgroundColor }}></div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium truncate">{eventInfo.event.title}</div>
          {eventInfo.view.type !== 'dayGridMonth' && (
            <div className="text-xs opacity-75 truncate">{eventInfo.timeText}</div>
          )}
        </div>
      </div>
    );
  };

  // Кастомный рендер заголовка события в списке
  const eventContentList = (eventInfo) => {
    return (
      <div className="flex items-center p-3 border-l-4 rounded-r-lg" style={{ borderLeftColor: eventInfo.event.backgroundColor }}>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{eventInfo.event.title}</div>
          <div className="text-sm text-gray-600 mt-1">{eventInfo.event.extendedProps.description}</div>
        </div>
        <div className="text-sm text-gray-500 ml-4 whitespace-nowrap">{eventInfo.timeText}</div>
      </div>
    );
  };

  // Эффект для обновления календаря при изменении фильтров
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.refetchEvents();
    }
  }, [filteredTypes]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8 flex items-center">
          <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600 transition-colors">Академики</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800 font-medium">Академический календарь</span>
        </nav>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Академический календарь</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Планируйте свой учебный год с нашим интерактивным календарем. Отслеживайте важные события, сессии и каникулы.
          </p>
        </div>

        {/* Легенда и фильтры событий */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Фильтры событий</h2>
          <div className="flex flex-wrap gap-3">
            {eventTypes.map((type, index) => (
              <button
                key={index}
                onClick={() => toggleEventType(type.type)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  filteredTypes.includes(type.type)
                    ? 'bg-opacity-20 text-gray-800 shadow-sm'
                    : 'bg-opacity-10 text-gray-500 opacity-70'
                }`}
                style={{ backgroundColor: filteredTypes.includes(type.type) ? type.color : '#f3f4f6' }}
              >
                <span className="text-lg mr-2">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
                <div className="w-3 h-3 rounded-full ml-2" style={{ backgroundColor: type.color }}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Кнопки экспорта и управления */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportAllToICS}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Экспорт всего календаря
            </button>
            
            <a
              href="#mobile-view"
              className="md:hidden flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              Список событий
            </a>
          </div>
        </div>

        {/* Календарь */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            }}
            views={{
              dayGridMonth: { buttonText: 'Месяц' },
              timeGridWeek: { buttonText: 'Неделя' },
              timeGridDay: { buttonText: 'День' },
              listMonth: { 
                buttonText: 'Список',
                eventContent: eventContentList
              }
            }}
            events={filteredEvents}
            eventContent={eventContent}
            eventClick={handleEventClick}
            locale={ruLocale}
            buttonText={{
              today: 'Сегодня',
              month: 'Месяц',
              week: 'Неделя',
              day: 'День',
              list: 'Список'
            }}
            height="auto"
            contentHeight="auto"
            eventDisplay="block"
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false
            }}
            dayMaxEvents={3}
            moreLinkText="еще"
            windowResize={() => {
              if (calendarRef.current) {
                const calendarApi = calendarRef.current.getApi();
                calendarApi.updateSize();
              }
            }}
          />
        </div>

        {/* Мобильный вид - список событий (скрыт на десктопе) */}
        <div id="mobile-view" className="md:hidden bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Ближайшие события</h2>
          <div className="space-y-4">
            {filteredEvents.slice(0, 5).map(event => (
              <div 
                key={event.id} 
                className="p-4 border-l-4 rounded-r-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                style={{ borderLeftColor: event.color }}
                onClick={() => {
                  setSelectedEvent({
                    title: event.title,
                    startStr: event.start,
                    endStr: event.end,
                    extendedProps: {
                      description: event.description,
                      type: event.type
                    },
                    backgroundColor: event.color
                  });
                  setIsModalOpen(true);
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  </div>
                  <span className="text-lg">{event.icon}</span>
                </div>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.start).toLocaleDateString('ru-RU')}
                  {event.end && (
                    <>
                      <span className="mx-2">—</span>
                      {new Date(event.end).toLocaleDateString('ru-RU')}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями события */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedEvent.title}</h3>
              <button 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: selectedEvent.backgroundColor }}></div>
                <span className="text-sm font-medium text-gray-600">{selectedEvent.extendedProps.type}</span>
              </div>
              
              <p className="text-gray-700 mb-4">{selectedEvent.extendedProps.description}</p>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(selectedEvent.startStr).toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                {selectedEvent.endStr && (
                  <>
                    <span className="mx-2">—</span>
                    <span>
                      {new Date(selectedEvent.endStr).toLocaleDateString('ru-RU', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => exportToGoogleCalendar(selectedEvent)}
                className="flex-1 flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Google Calendar
              </button>
              
              <button 
                onClick={() => exportToICS(selectedEvent)}
                className="flex-1 flex items-center justify-center border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Скачать .ics
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Стили для FullCalendar */
        .fc {
          font-family: inherit;
        }

        .fc .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
        }

        .fc .fc-button {
          background-color: #3B82F6;
          border-color: #3B82F6;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
        }

        .fc .fc-button:hover {
          background-color: #2563EB;
          border-color: #2563EB;
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active {
          background-color: #1D4ED8;
          border-color: #1D4ED8;
        }

        .fc .fc-daygrid-day-number {
          color: #374151;
          font-weight: 500;
        }

        .fc .fc-col-header-cell-cushion {
          color: #374151;
          font-weight: 600;
          padding: 0.5rem;
        }

        .fc .fc-event {
          border: none;
          border-radius: 0.5rem;
          padding: 0.25rem;
          font-size: 0.75rem;
        }

        .fc .fc-event:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .fc .fc-list-event:hover {
          background-color: #F3F4F6;
        }

        .fc .fc-day-today {
          background-color: #EFF6FF !important;
        }

        /* Адаптивность */
        @media (max-width: 768px) {
          .fc .fc-toolbar {
            flex-direction: column;
            gap: 1rem;
          }
          
          .fc .fc-toolbar-title {
            font-size: 1.25rem;
          }
          
          .fc .fc-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Calendar;