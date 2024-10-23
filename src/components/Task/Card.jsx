import React, { useContext, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import CheckLists from './Checklists';
import TaskModal from '../../modal/TaskModal';
import { TaskContext } from '../../context/TaskContext';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function Card({ task, isOpen, toggleDisclosure, onDeleteTask }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <span className={styles.priorityIndicator}>
            {task.priority.toUpperCase()} PRIORITY
          </span>

          <div className={styles.menu}>
            <button className={styles.menuButton}>
              <MoreHorizontal />
            </button>

            <div className={styles.menuItems}>
              <div className={styles.menuItem} onClick={() => setShowEditModal(true)}>
                Edit
              </div>
              <div className={styles.menuItem} onClick={handleTaskDelete} style={{ color: 'red' }}>
                Delete
              </div>
            </div>
          </div>
        </div>

        <h3>{task.title}</h3>

        <CheckLists
          isOpen={isOpen}
          toggleDisclosure={toggleDisclosure}
          task={task}
          onTaskUpdate={minorTaskUpdate}
        />

        <div className={styles.categoryBadges}>
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
