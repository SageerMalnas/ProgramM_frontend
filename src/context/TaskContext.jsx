import { createContext, useCallback, useContext, useEffect, useMemo, useState, }from 'react';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';
import toast from 'react-hot-toast';
import { useImmer } from 'use-immer';
import { getTasks, addTask as addTaskToDb, updateTask, deleteTask as deleteTaskFromDb } from '../api/taskApi';


const options = [
  { id: 1, name: 'Today', value: 1 },
  { id: 2, name: 'This week', value: 7 },
  { id: 3, name: 'This month', value: 30 },
];


export const TaskContext = createContext({
  tasks: [],
  isLoading: false,
  selectedDateRange: { id: 2, name: 'This week', value: 7 },
  setSelectedDateRange: () => { },
  fetchTasks: async () => { },
  minorTaskUpdate: async () => { },
  majorTaskUpdate: async () => { },
  addTask: async () => { },
  deleteTask: async () => { },
});


export function TaskProvider({ children }) {
  const [tasks, setTasks] = useImmer(null);
  const [selectedDateRange, setSelectedDateRange] = useState(options[1]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const token = user?.token;
  const { value } = selectedDateRange;


  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const resObj = await getTasks(value, token);
      setTasks(resObj.data.tasks);
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  }, [token, setTasks, value]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);


  const minorTaskUpdate = useCallback(
    async (task, updates) => {
      try {
    
        setTasks((draft) => {
          let tsk = draft.find((t) => t._id === task._id);
          if (!tsk) return;
          Object.assign(tsk, updates);
        });
    
        await updateTask(task._id, updates, token);
      } catch (error) {
        toast.error(error.message);
      }
    },
    [setTasks, token]
  );


  const majorTaskUpdate = useCallback(
    async (taskId, updates) => {
      try {
        const updatedTask = await updateTask(taskId, updates, token);
        setTasks((draft) => {
          const index = draft.findIndex((task) => task._id === taskId);
          if (index < 0) return;
          draft[index] = updatedTask.data.task;
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [setTasks, token]
  );


  const addTask = useCallback(
    async (task) => {
      try {
        const newTask = await addTaskToDb(task, token);
        setTasks((draft) => {
          draft.push(newTask);
        });
      } catch (error) {
        toast.error(error.message);
      }
    },
    [setTasks, token]
  );


  const deleteTask = useCallback(
    async (taskId) => {
      try {
        await deleteTaskFromDb(taskId, token);
        setTasks((draft) => draft.filter((task) => task._id !== taskId));
      } catch (error) {
        toast.error(error.message);
      }
    },
    [setTasks, token]
  );

  return (
    <TaskContext.Provider
      value={useMemo(
        () => ({
          tasks,
          isLoading,
          minorTaskUpdate,
          fetchTasks,
          addTask,
          majorTaskUpdate,
          deleteTask,
          selectedDateRange,
          setSelectedDateRange,
        }),
        [
          tasks,
          isLoading,
          minorTaskUpdate,
          fetchTasks,
          addTask,
          majorTaskUpdate,
          deleteTask,
          selectedDateRange,
          setSelectedDateRange,
        ]
      )}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node,
};
