import { useContext, useState, useEffect } from 'react';
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
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isOpenState, setIsOpenState] = useState({});


  const toggleDisclosure = (id) => {
    setIsOpenState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const closeCategoryChecklists = (category) => {
    const updatedState = { ...isOpenState };

    tasks.filter((task) => task.status === category)
      .forEach((task) => {
        delete updatedState[task._id];
      });

    setIsOpenState(updatedState);
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
                  <Plus size={20} color="#000000" onClick={toggleTaskModal} />
                )}
                <CopyMinus
                  size={20}
                  color={'#767575'}
                  onClick={() => closeCategoryChecklists(category.value)}
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
                    // isOpen={openDisclosures.includes(task._id)}
                    isOpen={isOpenState[task._id] || false}
                    toggleDisclosure={() => toggleDisclosure(task._id)}
                  />
                ))}

            </div>
          </div>
        ))}
      </div>
      {isTaskModalOpen && <TaskModal isOpen={isTaskModalOpen} onClose={toggleTaskModal} actionType='add' />}
    </div>
  );
}
