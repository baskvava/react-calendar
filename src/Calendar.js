import './style.css';

const days = new Array(42).fill(1);
const titles = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function Calendar() {

  

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <div>&lt;</div>
        <div>2023</div>
        <div>&gt;</div>
      </div>
      <div className='calendar-titles'>{titles.map((title)=><span>{title}</span>)}</div>
      <section className="calendar-body">
        {days.map((_,idx)=> {
          return (
            <button key={idx} className="calendar-days"><span>{idx}</span></button>
          )}
        )}
      </section>
    </div>
  );
}

export default Calendar;
