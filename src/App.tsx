import WeekCalendar from './components/calendar/WeekCalendar'
import HeaderBar from './components/header/HeaderBar'
import Sidebar from './components/sidebar/Sidebar'
import styles from './App.module.scss'

function App() {

  return (
    <>
      <HeaderBar />
      <div className={styles.mainLayout}>
        <Sidebar />
        <WeekCalendar />
      </div>
    </>
  )
}

export default App
