import styles from './HeaderBar.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { goToPrevWeek, goToNextWeek, goToToday } from '../../store/calendarSlice';
import { format } from 'date-fns';
import type { RootState } from '../../store/store';

const Logo = () => (
    <div className={styles.logo}>
        <img src="./logo.png" alt="Google Calendar" className={styles.logoImg} />
        <span className={styles.logoText}>Calendar</span>
    </div>
);


const HeaderBar = () => {

    const dispatch = useDispatch();
    const weekstart = useSelector((state: RootState) => state.calendar.weekstart);

    return (
        <header className={styles.headerBar}>
            <div className={styles.left}>
                <Logo />
            </div>
            <div className={styles.center}>
                <button className={styles.todayBtn} onClick={() => dispatch(goToToday())}>오늘</button>
                <button className={styles.arrowBtn} onClick={() => dispatch(goToPrevWeek())}>&lt;</button>
                <button className={styles.arrowBtn} onClick={() => dispatch(goToNextWeek())}>&gt;</button>
                <span className={styles.dateText}>{format(weekstart, 'yyyy년 M월')}</span>
            </div>
        </header>
    );
};

export default HeaderBar;
