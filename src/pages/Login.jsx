// import React, { useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import styles from './styles/login.module.css'; 

// const Login = () => {
//     const { login } = useContext(AuthContext);
//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     const handleChange = (e) => {
//         setForm((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         login(form);
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 <input
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     value={form.password}
//                     onChange={handleChange}
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             <p>
//                 Don't have an account? <Link to="/register">Register</Link>
//             </p>
//         </div>
//     );
// };

// export default Login;

import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import styles from './styles/login.module.css';
import groupPhoto from '../assets/Group.png'

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
                    <img src={groupPhoto} alt="Astronaut" />
                    <h2>Welcome back my friend</h2>
                    <p>Enter your credentials and let's get started.</p>
                </div>
            </div>
            <div className={styles.rightSection}>
                <h2>Login</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
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
                        {showPassword ? (
                            <MdVisibilityOff
                                className={styles.toggleIcon}
                                onClick={() => setShowPassword(false)}
                            />
                        ) : (
                            <MdVisibility
                                className={styles.toggleIcon}
                                onClick={() => setShowPassword(true)}
                            />
                        )}
                    </div>
                    <button className={styles.Btn} type="submit">Login</button>
                </form>
                <p className={styles.loginText}>
                    Don't have an account?
                </p>
                <Link to="/register">
                    <button className={styles.Btn}>Register</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
