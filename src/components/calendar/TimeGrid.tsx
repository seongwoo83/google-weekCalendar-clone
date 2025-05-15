import styles from './TimeGrid.module.scss';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const TimeGrid = () => (
  <div className={styles.timeGrid}>
    {hours.map((hour) => (
      <div key={hour} className={styles.timeCell}>{hour}</div>
    ))}
  </div>
);

export default TimeGrid;
