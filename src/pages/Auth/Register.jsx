import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from './styles/register.module.css'; 
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import GroupImage from '../../assets/Group.png'

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
                    <img src={GroupImage} alt="Astronaut Mascot" />
                    <h2>Welcome aboard my friend</h2>
                    <p>Just a couple of clicks and we start</p>
                </div>
            </div>

            <div className={styles.rightSection}>
                <h2 style={{ display: "flex", justifyContent: "center" }}>Register</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <FaUser className={styles.icon} />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaEnvelope className={styles.icon} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FaLock className={styles.icon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.toggleIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <FaLock className={styles.icon} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <div className={styles.toggleIcon} onClick={togglePasswordVisibility}>
                            {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                        </div>
                    </div>
                    <button type="submit" className={styles.Btn}>Register</button>
                </form>
                <p className={styles.loginText}>
                    Have an account?
                </p>
                <Link to="/login">
                    <button className={styles.Btn}>Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Register;
