import React,{ useState} from "react";

function CalenderSection({ currentDate, setCurrentDate, selectedDate, setSelectedDate, setIsMonthView, setCurrentWeek, isMonthView, currentWeek }) {

    const [isToday, setIsToday] = useState(true);
    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const prevMonth = () => {
        setIsToday(false);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setIsToday(false);
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const resetToToday = () => {
        setIsToday(true);
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="flex-1 p-7 border-2"></div>);
    }
    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(year, month, i);
        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        calendarDays.push(
            <button
                key={i}
                className={`flex-1 text-center p-7 border-2  ${isSelected ? 'bg-blue-500' : ''}`}
                onClick={() =>{ 
                    setIsToday(false);
                    setSelectedDate(date)}
                }
            >
                {i}
            </button>
        );
    }

    const prevWeek = () => {
        setCurrentWeek(currentWeek > 0 ? currentWeek - 1 : 0);
    };

    const nextWeek = () => {
        const totalWeeks = Math.ceil((totalDays + firstDay) / 7);
        setCurrentWeek(currentWeek < totalWeeks - 1 ? currentWeek + 1 : totalWeeks - 1);
    };

    const weekDays = calendarDays.slice(currentWeek * 7, (currentWeek + 1) * 7);

    return (
        <>
            <div className="w-200 h-3/4 bg-white mr-5 flex justify-start p-5 flex-col">
                <div className="w-full h-20 bg-white flex items-center p-5 ">
                    <div className="flex flex-row gap-2">
                        <button className="size-12 bg-gray-200 border-gray-50 hover:bg-gray-300 rounded-2xl flex justify-center items-center" onClick={isMonthView ? prevMonth : prevWeek}>
                            <img className="size-10" src="https://img.icons8.com/ios-filled/50/back.png" />
                        </button>
                        <button className="size-12 bg-gray-200 border-gray-50 hover:bg-gray-300 rounded-2xl flex justify-center items-center" onClick={isMonthView ? nextMonth : nextWeek}>
                            <img className="size-10" src="https://img.icons8.com/ios-filled/50/forward--v1.png"/>
                        </button>
                    </div>
                    <button className={` ml-10 h-10 w-20 text-white ${isToday ? 'bg-amber-600' :  'bg-gray-600'} `} onClick={resetToToday}>Today</button>
                    <span className="ml-10 h-10 w-70 flex items-center justify-center text-[20px] font-bold">
                        {monthNames[month]} {year}
                    </span>
                    <div className="flex flex-row gap-2">
                        <button className={`ml-10 w-20 h-10 text-white ${isMonthView ? 'bg-amber-600' : 'bg-gray-600'}`} onClick={() => setIsMonthView(true)}>Month</button>
                        <button className={` w-20 h-10 text-white ${isMonthView ? 'bg-gray-600' : 'bg-amber-600'}`} onClick={() => setIsMonthView(false)}>Week</button>
                    </div>
                </div>
                <div className="w-full h-full  mt-5">
                    <div className="flex justify-between bg-gray-200 p-2">
                        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                            <div key={day} className="flex-1 text-center font-semibold">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 p-2 ">
                        {isMonthView ? calendarDays : weekDays}
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalenderSection;
