import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from './styles/register.module.css'; 
import GroupImage from '../../assets/Group.png'
import { Eye, LockKeyhole, Mail, EyeOff , User} from 'lucide-react';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        register(form);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.astronaut}>
                <figure className={styles.circle}></figure>
                    <img src={GroupImage} alt="Astronaut Mascot" />
                    <h2>Welcome aboard my friend</h2>
                    <p>Just a couple of clicks and we start.</p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <h2 style={{ display: "flex", justifyContent: "center" }}>Register</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <User size={18}  className={styles.icon} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <Mail size={18} className={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <LockKeyhole size={18} className={styles.icon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            
                        />
                        <div className={styles.toggleIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <LockKeyhole size={18} className={styles.icon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            
                        />
                        <div className={styles.toggleIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </div>
                    </div>
                    <button type="submit" className={styles.RegBtn}>Register</button>
                </form>
                <p className={styles.loginText}>
                    Have an account?
                </p>
                <Link to="/login">
                    <button className={styles.LoginBtn}>Log in</button>
                </Link>
            </div>
        </div>
    );
};

export default Register;
