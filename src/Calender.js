import React, { useState } from 'react';
import "./Calender.css"
import {Button} from 'react-bootstrap';

const Calendar = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const renderCalendar = () => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDay = startDate.getDay();
    const totalDays = endDate.getDate();
    
    const days = [];
    for (let i = 0; i < weekDays.length; i++) {
      days.push(<div key={`week-${i}`} className="calendar-day week-day">{weekDays[i]}</div>);
    }
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === new Date().toDateString();
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday ? 'today' : ''}`} 
          onClick={() => onDayClick(date)}
        >
          {day}
        </div>
      );
    }

    return <div className="calendar-grid">{days}</div>;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="primary" onClick={handlePrevMonth}>Prev</Button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <Button variant="primary" onClick={handleNextMonth}>Next</Button>
      </div>
      <div className="calendar">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
