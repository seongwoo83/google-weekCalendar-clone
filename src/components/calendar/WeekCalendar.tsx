import styles from './WeekCalendar.module.scss';
import TimeGrid from './TimeGrid';
import DayColumn from './DayColumn';
import { addDays, format, getMonth } from 'date-fns';
import type { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EventListModal from '../event/EventListModal';

const days = ['월', '화', '수', '목', '금', '토', '일'];

const WeekCalendar = () => {
  const weekStart = useSelector((state: RootState) => state.calendar.weekstart);

  const [modalDate, setModalDate] = useState<string | null>(null)

  const eventList = useSelector((state: RootState) => state.calendar.eventList);
  const selectedEvents = modalDate ? eventList.filter(event => event.date === modalDate) : [];

  return (
    <div className={styles.weekCalendar}>
      <div className={styles.headerRow}>
        <div className={styles.timeCell}></div>
        {days.map((day, idx) => {
          const dateObj = addDays(weekStart, idx);
          const cellMonth = getMonth(dateObj);

          const prevMonth = idx > 0 ? getMonth(addDays(weekStart, idx-1)) : cellMonth;

          const showMonth = idx === 0 ? false : cellMonth !== prevMonth;
          return (
          <div key={day} className={styles.dayHeader}>
            <div>{day}</div>
            <span className={styles.dateNum}>{format(addDays(new Date(weekStart), idx), 'd')}</span>
            {showMonth && (
              <span className={styles.monthLable}>{cellMonth + 1 }월</span>
            )}
          </div>
        )
        })}
      </div>
      <div className={styles.bodyRow}>
        <TimeGrid />
        {days.map((day, idx) => {
          const date = format(addDays(weekStart, idx), 'yyyy-MM-dd');
          return (
            <DayColumn key={day} weekStart={weekStart} dayIndex={idx} onClick={()=>setModalDate(date)} />
          )
        }
        )}
      </div>
      {modalDate && (
        <EventListModal date={modalDate} events={selectedEvents} onClose={()=>setModalDate(null)} />
      )}
    </div>
  );
};

export default WeekCalendar;
