import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './TaskModal.module.css'; // assuming modular CSS
import toast from 'react-hot-toast';
import {fetchUserByEmail} from '../api/updateapi';
import { TaskContext } from '../context/TaskContext';
import AuthContext from '../context/AuthContext';

const TaskModal = ({ isOpen, onClose, actionType, existingTask }) => {
  const { addTask, majorTaskUpdate } = useContext(TaskContext);
  const { user } = useContext(AuthContext); // To get the logged-in user's ID

  // States for Task fields
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [checklists, setChecklists] = useState([{ title: '', checked: false }]);
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Effect to pre-fill fields if editing
  useEffect(() => {
    if (actionType === 'edit' && existingTask) {
      setTitle(existingTask.title || '');
      setPriority(existingTask.priority || 'low');
      setChecklists(existingTask.checklists || [{ title: '', checked: false }]);
      setDueDate(existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().split('T')[0] : '');
      setAssignedTo(existingTask.assignedTo ? existingTask.assignedTo.email : '');
    }
  }, [actionType, existingTask]);

  const handleChecklistChange = (index, value) => {
    const updatedChecklists = [...checklists];
    updatedChecklists[index].title = value;
    setChecklists(updatedChecklists);
  };

  const handleAddChecklist = () => {
    setChecklists([...checklists, { title: '', checked: false }]);
  };

  const handleRemoveChecklist = (index) => {
    const updatedChecklists = [...checklists];
    updatedChecklists.splice(index, 1);
    setChecklists(updatedChecklists);
  };

  const handleSaveTask = async () => {
    setErrorMessage(''); // Clear previous error

    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }
    if (!dueDate) {
      setErrorMessage('Due date is required');
      return;
    }

    try {
      setIsSaving(true);
      // Check if assigned user exists by email
      let assignedUserId = null;
      if (assignedTo) {
        const assignedUser = await fetchUserByEmail(assignedTo);
        if (!assignedUser) {
          setErrorMessage('User does not exist');
          setIsSaving(false);
          return;
        }
        assignedUserId = assignedUser._id;
      }

      const taskData = {
        title,
        priority,
        checklists,
        dueDate,
        assignedTo: assignedUserId,
        createdBy: user._id, // The ID of the logged-in user
      };

      if (actionType === 'edit' && existingTask) {
        await majorTaskUpdate(existingTask._id, taskData);
        toast.success('Task updated successfully');
      } else {
        await addTask(taskData);
        toast.success('Task added successfully');
      }

      onClose(); // Close modal after success
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred while saving the task');
    } finally {
      setIsSaving(false);
    }
  };

  return isOpen ? (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>{actionType === 'edit' ? 'Edit Task' : 'Add New Task'}</h3>

        <label>
          Title <span>*</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
            placeholder="Enter task title"
          />
        </label>

        <label>
          Select Priority
          <div className={styles.priorityOptions}>
            {['high', 'moderate', 'low'].map((level) => (
              <button
                key={level}
                onClick={() => setPriority(level)}
                className={priority === level ? styles.selected : ''}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </label>

        <label>
          Assign to:
          <input
            type="email"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className={styles.inputField}
            placeholder="Enter user's email"
          />
        </label>

        <label>
          Checklist
          <div>
            {checklists.map((item, index) => (
              <div key={index} className={styles.checklistItem}>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleChecklistChange(index, e.target.value)}
                  placeholder="Checklist item"
                />
                <button type="button" onClick={() => handleRemoveChecklist(index)} className={styles.removeBtn}>
                  ❌
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddChecklist} className={styles.addBtn}>
              + Add New
            </button>
          </div>
        </label>

        <label>
          Select Due Date <span>*</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={styles.inputField}
          />
        </label>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

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
  ) : null;
};

TaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actionType: PropTypes.oneOf(['add', 'edit']).isRequired,
  existingTask: PropTypes.object,
};

export default TaskModal;
