import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './taskmodal.module.css';
import toast from 'react-hot-toast';
import {fetchUserByEmail} from '../api/updateapi';
import { TaskContext } from '../context/TaskContext';
import AuthContext from '../context/AuthContext';
import { Trash2, Plus, Circle, CheckCircle } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, actionType, existingTask }) => {
  const { addTask, majorTaskUpdate, tasks, setTasks } = useContext(TaskContext);
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [checklists, setChecklists] = useState([{ title: '', checked: false }]);
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (actionType === 'edit' && existingTask) {
      setTitle(existingTask.title);
      setPriority(existingTask.priority);
      setChecklists(existingTask.checklists.length >0 ? existingTask.checklists : ['']);
      setDueDate(existingTask.dueDate ? new Date(existingTask.dueDate).toISOString().split('T')[0] : '');
      setAssignedTo(existingTask.assignedTo?.length > 0 ? existingTask.assignedTo[0].email : '');
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
    setErrorMessage('');

    if (!title.trim()) {
      setErrorMessage('Title is required');
      return;
    }
    if (checklists.length === 0 || checklists.some(item => item.title.trim() === '')) {
      setErrorMessage('Please enter at least one checklist item');
      return;
    }

    try {
      setIsSaving(true);
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
        createdBy: user._id,
      };

      if (actionType === 'edit' && existingTask) {
        await majorTaskUpdate(existingTask._id, taskData);
        // setTasks((prevTasks) =>
        //   prevTasks.map((task) => (task._id === existingTask._id ? updatedTask : task))
        // );
        toast.success('Task updated successfully');
      } else {
        await addTask(taskData);
        // Add the new task to the context immediately
        // setTasks((prevTasks) => [...prevTasks, newTask]);
        toast.success('Task added successfully');
      }

      onClose();
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
          Select Priority  <span>*</span>
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
          Checklist  <span>*</span>
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
                <Trash2 />
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddChecklist} className={styles.addBtn}>
              + Add New
            </button>
          </div>
        </label>

        <label>
          Select Due Date
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
