import React, {useState} from 'react';
import './style.css';

// constant
const TITLES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_A_WEEK = 7;

const composeCss = (cssStyle = [], isToday) => {
  const newCssStyle = [...cssStyle];
  if (isToday) {
    newCssStyle.push('selected')
  }
  return newCssStyle.join(' ')
}

const DisplayDays = ({
    start, 
    diffLen, 
    startDate = null, 
    todayDate = null, 
    isReversed = false, 
    handleClick = () => {},
    disabeld = false
  }) => {

  if (diffLen - start <= 0) {
    return null;
  }

  const initialArray = new Array(diffLen - start).fill(null);
  let i = start;
  
  const mappingDays = initialArray.map((_, idx)=> {
    const val = startDate ? startDate - i : i;
    i += 1;
    return val;
  });

  const days = isReversed ? mappingDays.reverse() : mappingDays;
  
  return <>
    {days.map((day, idx)=> 
      <button 
        key={idx} 
        className={composeCss(['calendar-days'], todayDate === day)}
        onClick={() => handleClick(day)}
        disabled={disabeld}
      >
        <span>{day}</span>
      </button>
    )}
  </>
}

const TODAY = new Date();
const DATE = TODAY.getDate();
const FULL_YEAR = TODAY.getFullYear();

function Calendar() {

  const [today, setToday] = useState(DATE);
  const todayMonth = TODAY.getMonth();
  const [todayYear, setTodayYear] = useState(FULL_YEAR);

  console.log({today})
  console.log("todayM", todayMonth - 1);
  // prevMonDays
  const prevMonthFilledLength = new Date(todayYear, todayMonth, 0).getDay();
  const prevDays = new Date(todayYear, todayMonth, 0).getDate();
  
  // current
  const currentMonDays = new Date(todayYear, todayMonth + 1, 0).getDate() + 1;
  // next Month
  const currentMonthFilledLength = new Date(todayYear, todayMonth + 1, 0).getDay();
  const nextMonthFilledLength = DAYS_A_WEEK - currentMonthFilledLength;

  const handleClick = (val) => {
    setToday(val)
  }

  const handleYearClick = (val) => {
    setTodayYear(prev => prev + val);
  }


  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <button onClick={() => handleYearClick(-1)}>&lt;</button>
        <div>{todayYear}</div>
        <button onClick={() => handleYearClick(1)}>&gt;</button>
      </div>
      <div className='calendar-titles'>{TITLES.map((title)=><span key={title}>{title}</span>)}</div>
      <section className="calendar-body">
        {/* prev */}
        <DisplayDays 
          start={0} 
          diffLen={prevMonthFilledLength + 1} 
          startDate={prevDays} 
          isReversed={true}
          disabeld={true}
        />
        {/* curretn */}
        <DisplayDays 
          start={1} 
          diffLen={currentMonDays} 
          todayDate={today} 
          handleClick={handleClick}
          disabeld={false}
        />
        {/* next */}
        <DisplayDays 
          start={1} 
          diffLen={nextMonthFilledLength - 1 >= DAYS_A_WEEK ? DAYS_A_WEEK : nextMonthFilledLength} 
          disabeld={true}
        />
      </section>
    </div>
  );
}

export default Calendar;
