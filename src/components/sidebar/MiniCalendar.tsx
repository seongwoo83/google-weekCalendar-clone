import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styles from './MiniCalendar.module.scss';
import { ko } from 'date-fns/locale';
import { setWeekByDate } from '../../store/calendarSlice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';



const MiniCalendar = () => {
    const dispatch = useDispatch();
    const eventList = useSelector((state: RootState) => state.calendar.eventList);
    const weekStart = useSelector((state: RootState)=> state.calendar.weekstart);

    const today = new Date();
    const [selected, setSelected] = useState<Date | undefined>(today);

    const [month, setMonth] = useState<Date | undefined>(today)

    useEffect(()=>{
        setSelected(today)
    },[]);
    useEffect(()=>{
        setMonth(weekStart)
    },[weekStart])

    const handleDayClick = (date?: Date)=>{
        if(date){
            setSelected(date);
            dispatch(setWeekByDate(date));
            setMonth(date);
        }
    }


    const eventDates = Array.from(new Set(eventList.map(event => event.date).map(date => new Date(date))));

    return (
        <div className={styles.miniCalendar}>
            <DayPicker
                mode="single"
                showOutsideDays
                fixedWeeks
                month={month}
                selected={selected}
                locale={ko}
                onDayClick={handleDayClick}
                onMonthChange={setMonth}
                modifiers={{
                    hasEvent: eventDates
                }}
                modifiersClassNames={{
                    hasEvent: styles.hasEvent
                }}
            />
        </div>
    );
};

export default MiniCalendar;
