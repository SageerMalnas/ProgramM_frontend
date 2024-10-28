import { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { Plus, CopyMinus } from 'lucide-react';
import Card from './Card';
import TaskModal from '../../modal/TaskModal';
import styles from './TaskContainer.module.css';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function TaskContainerPage() {
  const { tasks, isLoading } = useContext(TaskContext);
  const [openDisclosures, setOpenDisclosures] = useState([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [closeAllChecklists, setCloseAllChecklists] = useState(false);

  const toggleDisclosure = (id) => {
    setOpenDisclosures((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const closeAllDisclosures = () => {
    setCloseAllChecklists(prev => !prev);
    if (openDisclosures.length > 0) {
      setOpenDisclosures([]);
    }
  };

  const toggleTaskModal = () => setTaskModalOpen((prev) => !prev);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div key={category.id} className={styles.category}>
            <div className={styles.head}>
              <h3>{category.title}</h3>
              <div className={styles.icons}>
                {category.title === 'To do' && (
                  <Plus size={20} color="#767575" onClick={toggleTaskModal} />
                )}
                <CopyMinus
                  size={20}
                  color={openDisclosures.length ? '#17a2b8' : '#767575'}
                  onClick={closeAllDisclosures}
                />
              </div>
            </div>

            <div className={styles.taskCard}>
              {tasks
                ?.filter((task) => task.status === category.value)
                .map((task) => (
                  <Card
                    key={task._id}
                    task={task}
                    isOpen={openDisclosures.includes(task._id)}
                    toggleDisclosure={() => toggleDisclosure(task._id)}
                    
                  />
                ))}
              {tasks?.filter((task) => task.status === category.value).length === 0 && (
                <div className={styles.emptyCard}>
                  <span>No tasks</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {isTaskModalOpen && <TaskModal isOpen={isTaskModalOpen} onClose={toggleTaskModal} actionType='add' />}
    </div>
  );
}
