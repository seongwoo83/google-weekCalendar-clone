import styles from './EventListModal.module.scss';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/calendarSlice';

interface Event{
    id: string;
    title: string;
    startHour: number;
    endHour: number;
}

interface EventListModalProps{
    date: string;
    events: Event[];
    onClose: () => void;
}

const EventListModal = ({date, events, onClose}: EventListModalProps) => {
    const dispatch = useDispatch();
    
    return(
        <div className={styles.modalBackground} onClick={onClose}>
            <div className={styles.modalBackDrop} onClick={onClose}>
                <div className={styles.modal} onClick={e => e.stopPropagation()}>
                    <div className={styles.modalTitle}>{date} Event</div>
                    {
                        events.length === 0 ? (
                            <div>이벤트가 없습니다.</div>
                        ) : (
                            <ul>
                                {
                                    events.map((event)=> (
                                        <li key={event.id} className={styles.eventItem}>
                                            <span>
                                                {event.title} ({event.startHour}:00 ~ {event.endHour}:00)
                                            </span>
                                            <button className={styles.deleteBtn} onClick={()=>dispatch(deleteEvent(event.id))}>삭제</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                    <button className={styles.closeBtn} onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    )
}

export default EventListModal;


