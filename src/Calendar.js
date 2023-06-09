import './style.css';

const days = new Array(42).fill(1);

function Calendar() {

  

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <div>&lt;</div>
        <div>2023</div>
        <div>&gt;</div>
      </div>
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
