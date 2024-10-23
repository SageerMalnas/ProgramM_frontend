import { ChevronDown, PlusCircle } from 'lucide-react';
import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { TaskContext } from '../../../context/TaskContext';
import styles from './board.module.css';
import TasksContainer from '../../../components/Task/TaskContainer';
import TaskModal from '../../../modal/TaskModal';


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
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Handler for when the select dropdown changes
  const handleDateRangeChange = (e) => {
    const selectedOption = options.find(option => option.value === Number(e.target.value));
    setSelectedDateRange(selectedOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupOne}>
        <h1>Welcome! {user?.name || 'User'}</h1>
        <p style={{ opacity: '0.4' }}>{dateString}</p>
      </div>

      <div className={styles.groupTwo}>
        <h2>Board</h2>

        {/* Replacing Listbox with a native select element */}
        <div className={styles.selectContainer}>
          <label htmlFor="date-range-select" className={styles.label}>
            Select Date Range:
          </label>
          <select
            id="date-range-select"
            value={selectedDateRange?.value || ''}
            onChange={handleDateRangeChange}
            className={styles.select}
          >
            <option value="" disabled>
              Select Range
            </option>
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
      {showTaskModal && (
        <TaskModal onClose={() => setShowTaskModal(false)} onSubmit={(taskData) => {/* API call to add task */}} />
      )}

      {/* Plus Icon to Add Task */}
      <div className={styles.addTaskIcon} onClick={() => setShowTaskModal(true)}>
        <PlusCircle size={40} />
      </div>
    </div>
  );
}
