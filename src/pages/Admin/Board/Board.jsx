import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { TaskContext } from '../../../context/TaskContext';
import styles from './board.module.css';
import TasksContainer from '../../../components/Task/TaskContainer';

function getFormattedDate(date) {
  return date.toDateString();
}

const options = [
  { id: 1, name: 'Today', value: 1 },
  { id: 2, name: 'This week', value: 7 },
  { id: 3, name: 'This month', value: 30 },
];

export default function Board() {
  const { user } = useContext(AuthContext);
  const { selectedDateRange, setSelectedDateRange } = useContext(TaskContext);
  const dateString = getFormattedDate(new Date());

  const handleDateRangeChange = (e) => {
    const selectedOption = options.find(option => option.value === Number(e.target.value));
    setSelectedDateRange(selectedOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <h1>Welcome! {user?.name || 'User'}</h1>
        <p style={{ color:'#707070' }}>{dateString}</p>
      </div>

      <div className={styles.groupTwo}>
        <h2>Board</h2>

        <div className={styles.selectContainer}>
          <select
            id="date-range-select"
            value={selectedDateRange?.value || ''}
            onChange={handleDateRangeChange}
            className={styles.select}
          >
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {/* <ChevronDown size={16} /> */}
        </div>
      </div>

      <TasksContainer />
    </div>
  );
}
