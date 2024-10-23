import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import styles from './TaskContainer.module.css';
import Card from './Card';

const categories = [
  { id: 1, title: 'Backlog', value: 'backlog' },
  { id: 2, title: 'To do', value: 'todo' },
  { id: 3, title: 'In progress', value: 'inProgress' },
  { id: 4, title: 'Done', value: 'done' },
];

export default function TasksContainer() {
  const { tasks, isLoading } = useContext(TaskContext);

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {categories.map((category) => {
          const categoryTasks = tasks?.filter((task) => task.status === category.value);

          return (
            <div key={category.id} className={styles.category}>
              <h3>{category.title}</h3>

              <div className={styles.cardsContainer}>
                {categoryTasks?.length > 0 ? (
                  categoryTasks.map((task) => (
                    <Card
                      key={task._id}
                      task={task}
                      isOpen={false}
                      toggleDisclosure={() => {}}
                      onDeleteTask={() => {}}
                    />
                  ))
                ) : (
                  <div className={styles.emptyCard}>
                    <span>No tasks</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
