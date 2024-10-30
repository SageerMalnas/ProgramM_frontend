import React, { useContext, useState, useEffect } from 'react';
import { MoreHorizontal, ChevronDown } from 'lucide-react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
import CheckLists from './Checklists';
import TaskModal from '../../modal/TaskModal';
import { TaskContext } from '../../context/TaskContext';
import { format } from 'date-fns';
import ConfirmationModal from '../../modal/ConfirmationModal';
import toast from 'react-hot-toast';
import { isPast } from 'date-fns';


const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function Card({ task, isOpen, toggleDisclosure }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletModalOpen, setDeleteModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { minorTaskUpdate, majorTaskUpdate } = useContext(TaskContext);

  const toggleDeleteModal = () => {
    setDeleteModal(!deletModalOpen);
  }


  function copyLink(taskId) {
    try {
      const url = `${window.location.origin}/tasks/${taskId}`;
      navigator.clipboard.writeText(url)
        .then(() => {
          console.log('URL copied:', url);
          toast.success('Link Copied');
          window.location.href = url;
        })
        .catch((error) => {
          console.error('Failed to copy URL:', error);
          toast.error('Failed to copy URL');
        });
    } catch (error) {
      console.error('Error in copyLink function:', error);
      toast.error('Unexpected error occurred');
    }
  }

  const handleShareClick = () => {
    console.log('Share clicked, task ID:', task._id);
    copyLink(task._id);
    setShowMenu(false);
  };

  const handleStatusChange = async (newStatus) => {
    await minorTaskUpdate(task, { status: newStatus });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);

  }

  const assignedUserIcon = Array.isArray(task.assignedTo) && task.assignedTo.length > 0
    ? task.assignedTo.map(user => (
      <span key={user._id} className={styles.assignedUserIcon} title={user.email}>
        {user.email.slice(0, 2).toUpperCase()}
      </span>
    ))
    : null;


  const priorityClass = task.priority === 'low' ? styles.lowPriority :
    task.priority === 'moderate' ? styles.moderatePriority :
      styles.highPriority;

  const isDueDatePast = task.dueDate && isPast(new Date(task.dueDate));
  const dateButtonClass = task.status === 'done'
    ? styles.completedDateButton
    : isDueDatePast
      ? styles.highPriorityDate
      : task.priority === 'high'
        ? styles.highPriorityDate
        : styles.DateButton;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.groupOne}>
          <span className={`${styles.priorityIndicator} ${priorityClass}`}>
            <li style={{ fontSize: '6px' }}>
              {task.priority.toUpperCase()} PRIORITY
            </li>
            {assignedUserIcon?.length > 0 && (
            <div className={styles.assignedUsersContainer}>
              {assignedUserIcon}
            </div>
          )}
          </span>
          
          <div className={styles.menu}>
            <button className={styles.menuButton} onClick={toggleMenu}>
              <MoreHorizontal size={16} />
            </button>

            {showMenu && (
              <div className={`${styles.menuItems} ${showMenu ? 'visible' : ''}`}>
                <div className={styles.menuItem} onClick={() => { setShowEditModal(true), setShowMenu(false) }}>
                  Edit
                </div>
                <div className={styles.menuItem} onClick={handleShareClick}>
                  Share
                </div>
                <div className={styles.menuItem} onClick={toggleDeleteModal} style={{ color: 'red' }}>
                  Delete
                </div>
              </div>
            )}
          </div>
        </div>
        {deletModalOpen && (
          <ConfirmationModal toggleModal={toggleDeleteModal} actionType="deleteTask" taskId={task._id} />
        )}

        {/* <h3 >{task.title}</h3> */}
        <h3 className={styles.title} title={task.title}>{task.title}</h3>
        {/* <h3 data-fulltitle={task.title}>{task.title}</h3> */}
        <div>
          <CheckLists
            isOpen={isOpen}
            toggleDisclosure={toggleDisclosure}
            task={task}
            onTaskUpdate={minorTaskUpdate}
          />
        </div>
        <div className={styles.categoryBadges}>
          {task.dueDate && (
            <button className={dateButtonClass}>
              {format(new Date(task.dueDate), 'MMM do')}
            </button>
          )}
          <div className={styles.statusButtons}>
            {categories.map((category) =>
              category.value !== task.status ? (
                <button
                  key={category.id}
                  className={styles.categoryButton}
                  onClick={() => handleStatusChange(category.value)}
                >
                  {category.title.toUpperCase()}
                </button>
              ) : null
            )}
          </div>
        </div>
      </div>

      {showEditModal && (
        <TaskModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          actionType='edit'
          existingTask={task}
        />
      )}
    </>
  );
}

Card.propTypes = {
  task: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleDisclosure: PropTypes.func.isRequired,
};
