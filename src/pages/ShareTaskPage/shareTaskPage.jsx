// PublicLayout.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShareTaskCard from './shareTaskCard';
import { getTaskById } from '../../api/taskApi'; // Ensure this path matches your setup
import styles from './sharePage.module.css';
import proImage from '../../assets/AppLogo.png'

export default function ShareTaskPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = ''; // Add token if required for public access
        const response = await getTaskById(taskId, token);
        setTask(response.data.task);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={proImage} alt="Pro Manage" className={styles.logo} />
        <h1>Pro Manage</h1>
      </header>
      <main className={styles.main}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : (
          <ShareTaskCard task={task} />
        )}
      </main>
    </div>
  );
}
