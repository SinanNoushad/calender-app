import React, { useEffect, useState } from 'react';
import CalenderSection from './Components/CalenderSection';
import EventsSection from './Components/EventsSection';

const cal = 'http://calapi.inadiutorium.cz/api/v0/en/calendars';

function App() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isMonthView, setIsMonthView] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(Math.floor((currentDate.getDate() - 1) / 7));

  useEffect(() => {
    fetch(`${cal}/general-en/${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.map(event => ({
          ...event,
          date: new Date(event.date)
        })));
      });
  }, [currentDate]);

  return (
    <div className="flex bg-blue-500 h-screen w-screen justify-center items-center">
      <CalenderSection
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        isMonthView={isMonthView}
        setIsMonthView={setIsMonthView}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <EventsSection events={events} selectedDate={selectedDate} isMonthView={isMonthView} currentWeek={currentWeek} currentDate={currentDate} />
    </div>
  );
}

export default App;
