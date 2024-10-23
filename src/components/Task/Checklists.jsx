import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Checklists.module.css';

const CheckListItem = ({ list, onToggle }) => (
  <div className={styles.checklistItem}>
    <input
      type="checkbox"
      checked={list.checked}
      onChange={(e) => onToggle(list._id, e.target.checked)}
    />
    <span>{list.title}</span>
  </div>
);

const CheckLists = ({ task, isOpen, toggleDisclosure, onTaskUpdate }) => {
  const [lists, setLists] = useState(task.checklists);
  const dones = lists.filter((list) => list.checked);

  const handleToggleChecklist = (listId, checked) => {
    const updatedLists = lists.map((list) =>
      list._id === listId ? { ...list, checked } : list
    );
    setLists(updatedLists);
    onTaskUpdate({ ...task, checklists: updatedLists });
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h4>
          Checklists ({dones.length}/{lists.length})
        </h4>
        <button className={styles.toggleButton} onClick={toggleDisclosure}>
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      {isOpen && (
        <div className={styles.lists}>
          {lists.map((list) => (
            <CheckListItem key={list._id} list={list} onToggle={handleToggleChecklist} />
          ))}
        </div>
      )}
    </div>
  );
};

CheckLists.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDisclosure: PropTypes.func.isRequired,
  onTaskUpdate: PropTypes.func.isRequired,
};

export default CheckLists;
