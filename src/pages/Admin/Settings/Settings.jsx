import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Lock, User, Mail } from 'lucide-react'; 
import AuthContext from '../../../context/AuthContext';
import { updateUserDetails } from '../../../api/updateapi';
import styles from './settings.module.css';

export default function Settings() {
  const [isSafeToReset, setIsSafeToReset] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false); 
  const [showNewPassword, setShowNewPassword] = useState(false); 

  const { user, logout } = useContext(AuthContext); 
  const { register,handleSubmit,reset,setError,formState: { errors, isSubmitting },} = useForm({
    defaultValues: { 
      name: user?.name || '', 
      email: user?.email || '', 
      oldPassword: '', 
      newPassword: '' 
    }, 
  });

  const onSubmit = async (data) => {
    try {
      if (data.newPassword && !data.oldPassword) {
        setError("oldPassword", { message: "Old password is required to update the password" });
        return;
      }

    //   if (data.oldPassword !== user.oldPassword) {
    //     setError("oldPassword", { message: "Old password is not correct" });
    //     return;
    //   }

      await updateUserDetails(data, user.token);
      toast.success(`${data.email !== user.email ? 'Email' : 'Password'} updated successfully!`);

      setIsSafeToReset(true);

      
      if (data.email !== user.email || data.newPassword) {
        logout();
      }
    } catch (error) {
      toast.error(error.message);
      if (error.errors) {
        for (const property in error.errors) {
          setError(property, { message: error.errors[property] });
        }
      }
    }
  };

  useEffect(() => {
    if (!isSafeToReset) return;
    reset();
  }, [reset, isSafeToReset]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Settings</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Name Input */}
        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register('name')}
            />
            <User className={styles.icon} />
          </div>
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        {/* Email Input */}
        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <input
              id="email"
              type="email"
              placeholder="Update Email"
              {...register('email')}
            />
            <Mail className={styles.icon} />
          </div>
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} />
            <input
              id="oldPassword"
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Old Password"
              {...register('oldPassword')}
            />
            {showOldPassword ? (
              <EyeOff className={styles.Eyeicon} onClick={() => setShowOldPassword(!showOldPassword)} />
            ) : (
              <Eye className={styles.Eyeicon} onClick={() => setShowOldPassword(!showOldPassword)} />
            )}
          </div>
          {errors.oldPassword && (
            <p className={styles.error}>{errors.oldPassword.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <Lock className={styles.icon} />
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              {...register('newPassword')}
            />
            {showNewPassword ? (
              <EyeOff className={styles.Eyeicon} onClick={() => setShowNewPassword(!showNewPassword)} />
            ) : (
              <Eye className={styles.Eyeicon} onClick={() => setShowNewPassword(!showNewPassword)} />
            )}
          </div>
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword.message}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}
