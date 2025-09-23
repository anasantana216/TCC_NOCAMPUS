import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  category: string;
}

interface CalendarProps {
  events: Event[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'July', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 md:h-12"></div>
      );
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const hasEvents = dayEvents.length > 0;
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`
            h-10 md:h-12 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all
            ${isToday(date) ? 'bg-primary text-white' : ''}
            ${isSelected ? 'ring-2 ring-secondary' : ''}
            ${hasEvents && !isToday(date) ? 'bg-secondary-light bg-opacity-20' : ''}
            ${!hasEvents && !isToday(date) && !isSelected ? 'hover:bg-gray-100' : ''}
          `}
          onClick={() => setSelectedDate(date)}
        >
          <span className={`text-sm font-medium ${isToday(date) ? 'text-white' : 'text-gray-900'}`}>
            {day}
          </span>
          {hasEvents && (
            <div className="flex space-x-1 mt-1">
              {dayEvents.slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full ${
                    isToday(date) ? 'bg-white' : 'bg-secondary'
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Eventos em {selectedDate.toLocaleDateString('pt-BR')}:
          </h4>
          <div className="space-y-2">
            {selectedDateEvents.map(event => (
              <div
                key={event.id}
                className="p-3 bg-gray-50 rounded-lg border-l-4 border-secondary"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">{event.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      {event.time} • {event.location}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-secondary-light bg-opacity-20 text-secondary text-xs rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="border-t pt-4 mt-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span>Hoje</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-secondary-light bg-opacity-40 rounded-full mr-2"></div>
            <span>Com eventos</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 border-2 border-secondary rounded-full mr-2"></div>
            <span>Selecionado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;