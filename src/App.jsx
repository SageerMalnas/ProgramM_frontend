import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Auth/Register';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import '@fontsource/poppins';
import Analytics from './pages/Admin/Analytics/Analytics';
import Settings from './pages/Admin/Settings/Settings';
import Board from './pages/Admin/Board/Board';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './protectedRoute';

function App() {


  return (
    <AuthProvider>
      <TaskProvider>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path='/dashboard' element={<Dashboard />}>
        <Route index element={<Navigate to="board" />} />
          <Route path='analytics' element={<Analytics />} />
          <Route path='settings' element={<Settings />} />
          <Route path='board' element={<Board/>}/>
        </Route>
        </Route>
        <Route path='*' element={<Navigate to="/login"/>}/>
      </Routes>
      </TaskProvider>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
