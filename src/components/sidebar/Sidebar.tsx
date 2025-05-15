import MiniCalendar from './MiniCalendar';
import { useState } from 'react';
import styles from './Sidebar.module.scss';
import EventModal from '../event/EventModal';
const Sidebar = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <aside>
            <button className={styles.createEventButton} onClick={() => setShowModal(true)}>만들기</button>
            <MiniCalendar />
            {showModal && <EventModal onClose={() => setShowModal(false)} />}
        </aside>
    );
};

export default Sidebar;
