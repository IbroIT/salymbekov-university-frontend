import { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css';

const Calendar = () => {
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [showLegend, setShowLegend] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Моковые данные академического календаря
  const calendarEvents = [
    {
      id: 1,
      title: 'Осенний семестр',
      start: '2024-09-01',
      end: '2024-12-20',
      color: '#3B82F6',
      type: 'Учебный период',
      description: 'Начало осеннего семестра 2024-2025 учебного года'
    },
    {
      id: 2,
      title: 'Осенняя сессия',
      start: '2024-12-23',
      end: '2025-01-10',
      color: '#EF4444',
      type: 'Экзаменационная сессия',
      description: 'Экзаменационная сессия осеннего семестра'
    },
    {
      id: 3,
      title: 'Зимние каникулы',
      start: '2025-01-11',
      end: '2025-02-02',
      color: '#10B981',
      type: 'Каникулы',
      description: 'Зимние каникулы для студентов'
    },
    {
      id: 4,
      title: 'Весенний семестр',
      start: '2025-02-03',
      end: '2025-05-20',
      color: '#3B82F6',
      type: 'Учебный период',
      description: 'Начало весеннего семестра'
    },
    {
      id: 5,
      title: 'Научная конференция',
      start: '2025-03-15',
      end: '2025-03-17',
      color: '#8B5CF6',
      type: 'Научное мероприятие',
      description: 'Ежегодная научно-практическая конференция'
    },
    {
      id: 6,
      title: 'Весенняя сессия',
      start: '2025-05-23',
      end: '2025-06-15',
      color: '#EF4444',
      type: 'Экзаменационная сессия',
      description: 'Экзаменационная сессия весеннего семестра'
    },
    {
      id: 7,
      title: 'Летние каникулы',
      start: '2025-06-16',
      end: '2025-08-31',
      color: '#10B981',
      type: 'Каникулы',
      description: 'Летние каникулы для студентов'
    },
    {
      id: 8,
      title: 'День открытых дверей',
      start: '2025-04-12T10:00:00',
      end: '2025-04-12T16:00:00',
      color: '#8B5CF6',
      type: 'Мероприятие',
      description: 'День открытых дверей для абитуриентов'
    },
    {
      id: 9,
      title: 'Защита дипломов',
      start: '2025-06-20',
      end: '2025-06-25',
      color: '#F59E0B',
      type: 'Аттестация',
      description: 'Защита выпускных квалификационных работ'
    }
  ];

  // Легенда событий
  const eventTypes = [
    { color: '#3B82F6', label: 'Учебные периоды', icon: '🔵' },
    { color: '#EF4444', label: 'Экзаменационные сессии', icon: '🔴' },
    { color: '#10B981', label: 'Каникулы', icon: '🟢' },
    { color: '#8B5CF6', label: 'Научные мероприятия', icon: '🟣' },
    { color: '#F59E0B', label: 'Аттестация', icon: '🟠' }
  ];

  // Экспорт в Google Calendar
  const exportToGoogleCalendar = (event) => {
    const start = event.startStr.split('T')[0];
    const end = event.endStr ? event.endStr.split('T')[0] : start;
    
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start.replace(/-/g, '')}/${end.replace(/-/g, '')}&details=${encodeURIComponent(event.extendedProps.description)}`;
    
    window.open(googleUrl, '_blank');
  };

  // Экспорт в ICS файл
  const exportToICS = (event) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.startStr.replace(/-/g, '').replace(/:/g, '')}
DTEND:${event.endStr ? event.endStr.replace(/-/g, '').replace(/:/g, '') : event.startStr.replace(/-/g, '').replace(/:/g, '')}
DESCRIPTION:${event.extendedProps.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Экспорт всего календаря
  const exportAllToICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
${calendarEvents.map(event => `
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start.replace(/-/g, '')}
DTEND:${event.end ? event.end.replace(/-/g, '') : event.start.replace(/-/g, '')}
DESCRIPTION:${event.description}
END:VEVENT
`).join('')}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'academic_calendar.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Кастомный рендер событий
  const eventContent = (eventInfo) => {
    return (
      <div className="flex items-center p-1">
        <div className="w-2 h-2 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: eventInfo.event.backgroundColor }}></div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{eventInfo.event.title}</div>
          <div className="text-xs opacity-75 truncate">{eventInfo.timeText}</div>
        </div>
      </div>
    );
  };

  // Обработчик клика по событию
  const handleEventClick = (info) => {
    info.jsEvent.preventDefault();
    setSelectedEvent(info.event);
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
        {/* Хлебные крошки */}
        <nav className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-1 sm:mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-1 sm:mx-2">→</span>
          <span className="text-gray-800">Академический календарь</span>
        </nav>

        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">Академический календарь</h1>

        {/* Кнопка показа/скрытия легенды на мобильных */}
        <div className="block sm:hidden mb-4">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            {showLegend ? 'Скрыть легенду' : 'Показать легенду'}
            <span className="ml-2">{showLegend ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Легенда событий */}
        <div className={`bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 ${showLegend ? 'block' : 'hidden sm:block'}`}>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Легенда событий</h2>
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-4">
            {eventTypes.map((type, index) => (
              <div key={index} className="flex items-center">
                <span className="text-base sm:text-lg mr-1 sm:mr-2">{type.icon}</span>
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-1 sm:mr-2 flex-shrink-0" style={{ backgroundColor: type.color }}></div>
                <span className="text-xs sm:text-sm text-gray-700">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Переключение видов и экспорт */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
          <div className="order-2 sm:order-1">
            <button
              onClick={exportAllToICS}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
            >
              Экспорт всего календаря
            </button>
          </div>
          
          <div className="order-1 sm:order-2 grid grid-cols-2 gap-2 sm:flex sm:gap-2">
            <button
              onClick={() => setCalendarView('dayGridMonth')}
              className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${calendarView === 'dayGridMonth' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Месяц
            </button>
            <button
              onClick={() => setCalendarView('timeGridWeek')}
              className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${calendarView === 'timeGridWeek' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Неделя
            </button>
            <button
              onClick={() => setCalendarView('timeGridDay')}
              className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${calendarView === 'timeGridDay' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              День
            </button>
            <button
              onClick={() => setCalendarView('listMonth')}
              className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${calendarView === 'listMonth' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Список
            </button>
          </div>
        </div>

        {/* Календарь */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={calendarView}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today'
            }}
            views={{
              dayGridMonth: { buttonText: 'Месяц' },
              timeGridWeek: { buttonText: 'Неделя' },
              timeGridDay: { buttonText: 'День' },
              listMonth: { buttonText: 'Список' }
            }}
            events={calendarEvents}
            eventContent={eventContent}
            eventClick={handleEventClick}
            locale="ru"
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
            windowResize={function(arg) {
              if (window.innerWidth < 640) {
                arg.view.calendar.changeView('listMonth');
                setCalendarView('listMonth');
              }
            }}
          />
        </div>
      </div>

      {/* Модальное окно для события */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-bold">{selectedEvent.title}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor: selectedEvent.backgroundColor}}></div>
                <span className="text-sm text-gray-600">{selectedEvent.extendedProps.type}</span>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">{selectedEvent.extendedProps.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button 
                onClick={() => exportToGoogleCalendar(selectedEvent)}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
              >
                Google Calendar
              </button>
              <button 
                onClick={() => exportToICS(selectedEvent)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
              >
                Скачать .ics
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;