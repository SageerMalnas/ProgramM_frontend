import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Checklists.module.css';
import { MoreHorizontal, ChevronDown } from 'lucide-react';

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

const CheckLists = ({ task, toggleDisclosure, onTaskUpdate }) => {
  const [lists, setLists] = useState(task.checklists);
  const dones = lists.filter((list) => list.checked);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChecklist = () => {
    setIsOpen((prev) => !prev);
  }

  const handleToggleChecklist = (listId, checked) => {
    const updatedLists = lists.map((list) =>
      list._id === listId ? { ...list, checked } : list
    );
    setLists(updatedLists);
    onTaskUpdate({ ...task, checklists: updatedLists });
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h4>
          Checklists ({dones.length}/{lists.length})
        </h4>
        <button className={styles.Arrowbutton} onClick={toggleChecklist}>
        <ChevronDown
          className={isOpen && styles.rotate}
        />
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
