import { useState } from "react";
import styles from './EventModal.module.scss';
import { useDispatch } from "react-redux";
import { addEvent } from "../../store/calendarSlice";

interface EventModalProps {
    onClose: () => void;
}


const EventModal = ({onClose }: EventModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startHour, setStartHour] = useState(0);
    const [endHour, setEndHour] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!date) return;
        if(startHour >= endHour){
            alert('종료 시각은 시작 시각보다 늦은 시간이어야 합니다.');
            return;
        }
        dispatch(addEvent({
            id: Date.now().toString(),
            title,
            date,
            startHour,
            endHour,
        }));
        onClose();
    }

    return (
        <div className={styles.modalBackround}>
            <div className={styles.modalBackdrop}>
                <form className={styles.modal} onSubmit={handleSubmit}>
                    <h2>이벤트 추가</h2>
                    <label>
                        <span>제목</span>
                        <input value={title} onChange={e => setTitle(e.target.value)} required />
                    </label>
                    <label>
                        <span>날짜</span>
                        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
                    </label>
                    <label>
                        <span>시작 시각</span>
                        <input
                            type="number"
                            min={0}
                            max={23}
                            value={startHour}
                            onChange={e => setStartHour(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        <span>종료 시각</span>
                        <input
                            type="number"
                            min={0}
                            max={23}
                            value={endHour}
                            onChange={e => setEndHour(Number(e.target.value))}
                            required
                        />
                    </label>
                    <div className={styles.actions}>
                        <button type="submit">추가</button>
                        <button type="button" onClick={onClose}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventModal;