import { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { TaskContext } from '../../../context/TaskContext';
import styles from './board.module.css';
import TasksContainer from '../../../components/Task/TaskContainer';
import Modal from '../../../modal/AddUserModal';
import {UsersRound} from 'lucide-react'

const API_URL = import.meta.env.VITE_API_BASE_URL;
function getFormattedDate(date) {
  return date.toDateString();
}

const options = [
  { id: 1, name: 'Today', value: 1 },
  { id: 2, name: 'This week', value: 7 },
  { id: 3, name: 'This month', value: 30 },
];

const fetchWithAuth = async (url, method, token, body = null) => {
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const options = { method, headers, ...(body && { body: JSON.stringify(body) }) };
  const res = await fetch(url, options);
  if (!res.ok) throw new Error((await res.json()).message || 'Something went wrong');
  return await res.json();
};

export default function Board() {
  const { user } = useContext(AuthContext);
  const { selectedDateRange, setSelectedDateRange } = useContext(TaskContext);
  const dateString = getFormattedDate(new Date());



  const token = user?.token;
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddUser = async (email) => {
        const response = await fetchWithAuth(`${API_URL}/api/user/adduser`, 'POST', token, { email });
        return response;
    };




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
        <div className={styles.heading}>
        <h2>Board</h2>
        <button onClick={() => setIsModalOpen(true)}><UsersRound size={10} style={{color: '#707070'}}/> Add User</button>
        </div>
        
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
      {isModalOpen && (
                <Modal
                    onClose={() => setIsModalOpen(false)}
                    onAddUser={handleAddUser}
                />
            )}
    </div>
  );
}
