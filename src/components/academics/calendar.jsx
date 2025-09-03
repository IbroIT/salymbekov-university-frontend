import { useState } from 'react';
import { Link } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import ky from 'ky';
import './Calendar.css';

const Calendar = () => {
  const [calendarView, setCalendarView] = useState('dayGridMonth');

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

  // Кастомный рендер событий
  const eventContent = (eventInfo) => {
    return (
      <div className="flex items-center p-1">
        <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: eventInfo.event.backgroundColor }}></div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium truncate">{eventInfo.event.title}</div>
          <div className="text-xs opacity-75 truncate">{eventInfo.timeText}</div>
        </div>
      </div>
    );
  };

  // Кастомный рендер заголовка события в списке
  const eventContentList = (eventInfo) => {
    return (
      <div className="flex items-center p-2">
        <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: eventInfo.event.backgroundColor }}></div>
        <div className="flex-1">
          <div className="font-medium">{eventInfo.event.title}</div>
          <div className="text-sm text-gray-600">{eventInfo.event.extendedProps.description}</div>
        </div>
        <div className="text-sm text-gray-500 ml-4">{eventInfo.timeText}</div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Главная</Link>
          <span className="mx-2">→</span>
          <Link to="/academics" className="hover:text-blue-600">Академики</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-800">Академический календарь</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">Академический календарь</h1>

        {/* Легенда событий */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Легенда событий</h2>
          <div className="flex flex-wrap gap-4">
            {eventTypes.map((type, index) => (
              <div key={index} className="flex items-center">
                <span className="text-lg mr-2">{type.icon}</span>
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: type.color }}></div>
                <span className="text-sm text-gray-700">{type.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Переключение видов и экспорт */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCalendarView('dayGridMonth')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                calendarView === 'dayGridMonth'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Месяц
            </button>
            <button
              onClick={() => setCalendarView('timeGridWeek')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                calendarView === 'timeGridWeek'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Неделя
            </button>
            <button
              onClick={() => setCalendarView('timeGridDay')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                calendarView === 'timeGridDay'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              День
            </button>
            <button
              onClick={() => setCalendarView('listMonth')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                calendarView === 'listMonth'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Список
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                // Экспорт всего календаря
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
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Экспорт всего календаря
            </button>
          </div>
        </div>

        {/* Календарь */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <FullCalendar
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
              listMonth: { buttonText: 'Список' }
            }}
            events={calendarEvents}
            eventContent={eventContent}
            eventClick={(info) => {
              info.jsEvent.preventDefault();
              
              // Модальное окно с деталями события
              if (info.event) {
                const event = info.event;
                const modal = document.createElement('div');
                modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
                modal.innerHTML = `
                  <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
                    <div class="flex justify-between items-center mb-4">
                      <h3 class="text-xl font-bold">${event.title}</h3>
                      <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <div class="mb-4">
                      <div class="flex items-center mb-2">
                        <div class="w-4 h-4 rounded-full mr-2" style="background-color: ${event.backgroundColor}"></div>
                        <span class="text-sm text-gray-600">${event.extendedProps.type}</span>
                      </div>
                      <p class="text-gray-700">${event.extendedProps.description}</p>
                    </div>
                    <div class="flex gap-2">
                      <button class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700" onclick="window.open('https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.startStr.replace(/-/g, '')}/${event.endStr ? event.endStr.replace(/-/g, '') : event.startStr.replace(/-/g, '')}&details=${encodeURIComponent(event.extendedProps.description)}', '_blank')">
                        Google Calendar
                      </button>
                      <button class="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50" onclick="
                        const icsContent = 'BEGIN:VCALENDAR\\nVERSION:2.0\\nBEGIN:VEVENT\\nSUMMARY:${event.title}\\nDTSTART:${event.startStr.replace(/-/g, '').replace(/:/g, '')}\\nDTEND:${event.endStr ? event.endStr.replace(/-/g, '').replace(/:/g, '') : event.startStr.replace(/-/g, '').replace(/:/g, '')}\\nDESCRIPTION:${event.extendedProps.description}\\nEND:VEVENT\\nEND:VCALENDAR';
                        const blob = new Blob([icsContent], { type: 'text/calendar' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = '${event.title}.ics';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      ">
                        Скачать .ics
                      </button>
                    </div>
                  </div>
                `;
                document.body.appendChild(modal);
                
                // Обработчик закрытия модального окна
                modal.addEventListener('click', (e) => {
                  if (e.target === modal) {
                    modal.remove();
                  }
                });
              }
            }}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;