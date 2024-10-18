import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './pages/Register';
import Dashboard from './pages/Admin/Board/Dashboard';
import Login from './pages/Login';

function App() {


  return (
    <AuthProvider>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
        <ToastContainer/>
    </AuthProvider>
  )
}

export default App
