import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import styles from './analytics.module.css';
import { getAnalytics } from '../../../api/taskApi';

export default function Analytics() {
  const { user } = useContext(AuthContext);
  const { token } = user;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const analyticsData = await getAnalytics(token);
        setData(analyticsData.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);
  const status = [
    { name: 'Backlog Tasks', value: 'backlog' },
    { name: 'To-do Tasks', value: 'todo' },
    { name: 'In-Progress Tasks', value: 'inProgress' },
    { name: 'Completed Tasks', value: 'done' },
  ];

  const priorities = [
    { name: 'Low Priority', value: 'low' },
    { name: 'Moderate Priority', value: 'moderate' },
    { name: 'High Priority', value: 'high' },
    { name: 'Due Date Tasks', value: 'due' },
  ];

  if (isLoading) {
    return <p>Loading analytics...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Analytics</h1>

      {data && (
        <div className={styles.data}>

          <ul className={styles.Box}>
            {status.map((s) => (
              <li key={s.value}>
                <div className="">
                  <p>{s.name}</p>
                  <p><strong>{data.status[s.value]}</strong></p>
                </div>
              </li>
            ))}
          </ul>

          <ul className={styles.Box}>
            {priorities.map((p) => (
              <li key={p.value}>
                <div className="">
                  <p>{p.name}</p>
                  <p><strong>{data.priorities[p.value]}</strong></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}