import React from 'react';

function EventsSection({ events, selectedDate, isMonthView, currentWeek, currentDate }) {
  const getWeekStartDate = (date, week) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const dayOfMonth = week * 7 - firstDayOfMonth + 1;
    return new Date(date.getFullYear(), date.getMonth(), dayOfMonth);
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    if (isMonthView) {
      return eventDate.getFullYear() === selectedDate.getFullYear() && eventDate.getMonth() === selectedDate.getMonth();
    } else {
      const weekStartDate = getWeekStartDate(currentDate, currentWeek);
      const weekEndDate = new Date(weekStartDate);
      weekEndDate.setDate(weekEndDate.getDate() + 6);
      return eventDate >= weekStartDate && eventDate <= weekEndDate;
    }
  });

  const groupedEvents = {};
  filteredEvents.forEach(event => {
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (!groupedEvents[eventDate]) {
      groupedEvents[eventDate] = [];
    }
    groupedEvents[eventDate].push(...event.celebrations);
  });

  return (
    <div className="w-150 h-3/4 bg-white ml-5 flex justify-center p-5">
      <div className="w-full h-full bg-gray-200">
        <h1 className="h-15 pl-5 font-bold text-2xl bg-gray-300 flex items-center">Events</h1>
        <div className='p-5 h-[90%] overflow-auto'>
          {Object.keys(groupedEvents).length > 0 ? (
            Object.keys(groupedEvents).map((date) => (
              <div key={date} className="p-5 border-b-2">
                <h2 className="font-bold text-lg">{date}</h2>
                {groupedEvents[date].map((celebration, index) => (
                  <div key={index} className="p-2 pl-5">
                    <h3 className="font-semibold">{celebration.title}</h3>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="p-3">No events for this period.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventsSection;
