import styles from './DayColumn.module.scss';
import { format, addDays } from 'date-fns';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { getColorById } from '../../utils/getColorById';

interface DayColumnProps {
    weekStart: Date;
    dayIndex: number;
    onClick: ()=>void;
}

const HOUR_HEIGHT = 40;

const DayColumn = ({ weekStart, dayIndex, onClick }: DayColumnProps) => {
    const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
    const events = useSelector((state: RootState) => state.calendar.eventList.filter(event => event.date === date));
    const coloredEvents = events.map(event=>({
        ...event,
        color: getColorById(event.id)
    }))

    return (
        <div className={styles.dayColumn} style={{position: "relative"}} onClick={onClick}>
            {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className={styles.cell}></div>
            ))}
            {
            coloredEvents.map(event => {
                const top = event.startHour * HOUR_HEIGHT;
                const height = (event.endHour - event.startHour) * HOUR_HEIGHT;
                return(
                    <div key={event.id} className={styles.event} style={{top: `${top}px`, height: `${height}px`, backgroundColor: event.color}} onClick={(e) =>{
                        e.stopPropagation();
                        onClick();
                        }}>
                        {event.title}<br />
                        ({event.startHour}:00 - {event.endHour}:00)
                    </div>
                )
            })
            }
        </div>
    )
};

export default DayColumn;
