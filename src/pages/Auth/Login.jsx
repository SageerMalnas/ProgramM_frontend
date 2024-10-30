import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styles from './styles/login.module.css';
import groupPhoto from '../../assets/Group.png'
import { Eye, LockKeyhole, Mail, EyeOff } from 'lucide-react';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(form);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.astronaut}>
                <figure className={styles.circle}></figure>
                    <img src={groupPhoto} alt="Astronaut" />
                    <h2>Welcome aboard my friend</h2>
                    <p>Just a couple of clicks and we start.</p>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h2>Login</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                        {showPassword ? (
                            <EyeOff
                                size={18}
                                className={styles.toggleIcon}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <Eye
                                size={18}
                                className={styles.toggleIcon}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button className={styles.LoginBtn} type="submit">Log in</button>
                </form>
                <p className={styles.loginText}>
                    Don't have an account?
                </p>
                <Link to="/register">
                    <button className={styles.RegBtn}>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
