import { createContext, useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { toast } from "react-hot-toast";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
      }, [user]);

    const register = async (userData) => {
        const { password, confirmPassword } = userData;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const data = await authApi.register(userData);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Registration successful!");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    const login = async (userData) => {
        try {
            const data = await authApi.login(userData);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid email or password");
        }
    };

    const logout = () => {
        authApi.logout();
        setUser(null);
        toast.success("Logged out successfully!");
        navigate("/login");
    };

    
    
    return (
        <AuthContext.Provider value={{ user, register, login, logout,setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
