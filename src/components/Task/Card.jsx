import React, { useContext, useState, useEffect } from 'react';
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import CheckLists from './Checklists';
import TaskModal from '../../modal/TaskModal';
import { TaskContext } from '../../context/TaskContext';
import { format, isPast } from 'date-fns';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function Card({ task, toggleDisclosure, onDeleteTask }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { minorTaskUpdate, majorTaskUpdate, deleteTask } = useContext(TaskContext);

  const handleTaskDelete = () => {
    deleteTask(task._id);
  };

  const handleTaskUpdate = async (updates) => {
    await majorTaskUpdate(task._id, updates);
    setShowEditModal(false);
  };

  const handleStatusChange = async (newStatus) => {
    await minorTaskUpdate(task, { status: newStatus });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const assignedUserInitials = task.assignedUsers?.map(user => (
    <span key={user} className={styles.assignedUserInitial}>
      {user[0].toUpperCase()}
    </span>
  ));

  const priorityClass = task.priority === 'low' ? styles.lowPriority :
    task.priority === 'moderate' ? styles.moderarePriority :
      styles.highPriority;

  const isDueDatePast = task.dueDate && isPast(new Date(task.dueDate));
  const dateButtonClass = task.status === 'done'
    ? styles.completedDateButton
    : isDueDatePast
      ? styles.overdueDateButton
      : styles.DateButton;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <span className={`${styles.priorityIndicator} ${priorityClass}`}>
            {task.priority.toUpperCase()} {assignedUserInitials} PRIORITY
          </span>

          <div className={styles.menu}>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <MoreHorizontal />
            </button>

            {showMenu && (
              <div className={`${styles.menuItems} ${showMenu ? 'visible' : ''}`}>
                <div className={styles.menuItem} onClick={() => { setShowEditModal(true), setShowMenu(false) }}>
                  Edit
                </div>
                <div className={styles.menuItem} onClick={handleTaskDelete} style={{ color: 'red' }}>
                  Delete
                </div>
                <div className={styles.menuItem}>
                  Share
                </div>
              </div>
            )}
          </div>
        </div>

        <h3>{task.title}</h3>
        <div>
          <CheckLists
            // isOpen={isOpen}
            toggleDisclosure={toggleDisclosure}
            task={task}
            onTaskUpdate={minorTaskUpdate}
          />
        </div>
        <div className={styles.categoryBadges}>
          <button className={styles.dateButtonClass}>
            {task.dueDate ? format(new Date(task.dueDate), 'MMM do') : ''}
          </button>

          {categories.map((category) =>
            category.value !== task.status ? (
              <button
                key={category.id}
                className={styles.categoryButton}
                onClick={() => handleStatusChange(category.value)}
              >
                {category.title}
              </button>
            ) : null
          )}
        </div>
      </div>

      {showEditModal && (
        <TaskModal
          onClose={() => setShowEditModal(false)}
          onSubmit={handleTaskUpdate}
          defaultTask={task}
        />
      )}
    </>
  );
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDisclosure: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
