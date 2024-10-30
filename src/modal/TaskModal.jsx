import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './taskmodal.module.css';
import toast from 'react-hot-toast';
import { getUser } from '../api/updateapi';
import { TaskContext } from '../context/TaskContext';
import AuthContext from '../context/AuthContext';
import { Trash } from 'lucide-react';


const TaskModal = ({ isOpen, onClose, actionType, existingTask }) => {
  const { addTask, majorTaskUpdate } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [checklists, setChecklists] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const [assignedUserId, setAssignedUserId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUser();
        setUsers(data);
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };
    fetchUsers();
  }, []);


  useEffect(() => {

    if (actionType === 'edit' && existingTask) {
      setTitle(existingTask.title);
      setPriority(existingTask.priority);
      setChecklists(existingTask.checklists.length > 0 ? existingTask.checklists : ['']);
      setDueDate(existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().split('T')[0] : '');


      const assignedUser = existingTask.assignedTo && existingTask.assignedTo.length > 0 ? existingTask.assignedTo[0] : null;
      setAssignedTo(assignedUser ? assignedUser.email : '');
      setAssignedUserId(assignedUser ? assignedUser._id : null);
      // setAssignedTo(existingTask.assignedTo?.length > 0 ? existingTask.assignedTo[0].email : '');
      // setAssignedUserId(existingTask.assignedTo?.[0]?._id || null);
    }
  }, [actionType, existingTask]);

  const getChecklistCount = () => {
    const completedCount = checklists.filter(item => item.checked).length;
    return `(${completedCount}/${checklists.length})`;
  };

  const handleChecklistChange = (index, value) => {
    setChecklists((prevChecklists) => {
      const updatedChecklists = [...prevChecklists];
      updatedChecklists[index] = { ...updatedChecklists[index], title: value };
      return updatedChecklists;
    });
  };
  const handleAddChecklistItem = () => {
    setChecklists([...checklists, { title: '', checked: false }]);
  };

  const handleRemoveChecklist = (index) => {
    setChecklists((prevChecklists) => prevChecklists.filter((_, i) => i !== index));
  };

  const handleToggleChecklist = (index) => {
    setChecklists((prevChecklists) => {
      const updatedChecklists = [...prevChecklists];
      updatedChecklists[index] = {
        ...updatedChecklists[index],
        checked: !updatedChecklists[index].checked,
      };
      return updatedChecklists;
    });
    // onTaskUpdate({ ...existingTask, checklists });
  };

  const handleUserSelect = (user) => {
    setAssignedTo(user.email);
    setAssignedUserId(user._id);
    setDropdownOpen(false);
  };

  const handleSaveTask = async () => {
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }
    if (!priority) {
      setErrorMessage('Please select a priority');
      return;
    }
    if (checklists.length === 0 || checklists.some(item => item.title.trim() === '')) {
      setErrorMessage('Please enter checklist item');
      return;
    }

    try {
      setIsSaving(true);

      const taskData = {
        title,
        priority,
        checklists,
        dueDate,
        assignedTo: assignedUserId || null,
        createdBy: user._id,
      };

      if (actionType === 'edit' && existingTask) {
        await majorTaskUpdate(existingTask._id, taskData);
        // setTasks((prevTasks) =>
        //   prevTasks.map((task) => (task._id === existingTask._id ? updatedTask : task))
        // );
        toast.success('Updated successfully');
      } else {
        await addTask(taskData);
        // Add the new task to the context immediately
        // setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success('Added successfully');
      }

      onClose();
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred while saving the task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDueDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setErrorMessage('Due date cannot be in the past');
    } else {
      setDueDate(selectedDate);
      setErrorMessage('');
    }
  };

  return isOpen ? (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>

        <label>
          Title <span style={{ color: 'red' }}>*</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
            placeholder="Enter task title"
          />
        </label>

        <div className={styles.priorityOptions}>
          <label>
            Select Priority <span style={{ color: 'red' }}>*</span>
          </label>
          <div className={styles.radioGroup}>
            {['high', 'moderate', 'low'].map((level) => (
              <div
                key={level}
                onClick={() => setPriority(level)}
                className={`${styles.radioOption} ${priority === level ? styles.checkedOption : ''}`}
              >
                <span
                  style={{
                    color:
                      level === 'high' ? '#ff2473' :
                        level === 'moderate' ? '#18b0ff' :
                          '#63c05b',
                  }}
                >
                  •
                </span>
                {level.toUpperCase()} PRIORITY
              </div>
            ))}
          </div>
        </div>


        {checklists.length > 0 && (
          <label className={styles.AssignedUser}>
            Assign to
            <div className={styles.assignedInputWrapper}>
              <div className={styles.dropdownContainer} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className={styles.selectedUser}>{assignedTo || 'Add a assignee'}</div>
                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {users.map(user => (
                      <div key={user._id} className={styles.dropdownItem}>
                        <div className={styles.userInfo}>
                          <div className={styles.userIcon}>
                            {user.email.substring(0, 2).toUpperCase()}
                          </div>
                          <span>{user.email}</span>
                        </div>
                        <div
                          className={styles.AssignBtn}
                          onClick={() => handleUserSelect(user)}
                        >
                          Assign
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </label>
        )}
        <label className={styles.CheckTitle}>
          <span>
            Checklist {getChecklistCount()} <span style={{ color: 'red' }}>*</span>
          </span>
          <div className={styles.CheckContainer}>
            {checklists.map((item, index) => (
              <div key={index} className={styles.checklistItem}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleChecklist(index)}
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChecklistChange(index, e.target.value)}
                  placeholder="enter"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveChecklist(index)}
                  className={styles.removeBtn}
                >
                  <Trash size={14} />
                </button>
              </div>
            ))}
          </div>

        </label>
        <button type="button" onClick={handleAddChecklistItem} className={styles.addBtn}>
          + Add New
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <div className={styles.bottom}>
          <div className={styles.calendarOverlay}>
            <div
              className={`${styles.dateDisplay} ${!dueDate && styles.placeholder}`}
              onClick={() => document.getElementById('dateInput').showPicker()}
            >
              {dueDate ? dueDate : 'Select Due Date'}
            </div>
            <input
              id="dateInput"
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className={styles.dateInputHidden}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className={styles.modalActions}>
            <button onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={handleSaveTask} className={styles.saveBtn} disabled={isSaving}>
              {isSaving ? 'Saving...' : actionType === 'edit' ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(['add', 'edit']).isRequired,
  existingTask: PropTypes.object,
};

export default TaskModal;
