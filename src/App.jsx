import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Auth/Register';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import '@fontsource/poppins';
import Analytics from './pages/Admin/Analytics/Analytics';
import Settings from './pages/Admin/Settings/Settings';

function App() {


  return (
    <AuthProvider>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics/>} />
        <Route path='/settings' element={<Settings/>} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
