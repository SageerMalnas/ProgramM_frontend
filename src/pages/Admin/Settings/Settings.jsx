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

  const { user, logout, setUser } = useContext(AuthContext);
  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting }, } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '',
      newPassword: ''
    },
  });

  const onSubmit = async (data) => {

    try {

      const fieldsToUpdate = [
        data.name !== user.name,
        data.email !== user.email,
        data.newPassword && data.oldPassword && data.newPassword !== data.oldPassword
      ].filter(Boolean); 
      
      if (fieldsToUpdate.length > 1) {
        toast.error("You can edit only one field at a time.");
        return;
      }

      if (data.newPassword && !data.oldPassword) {
        setError("oldPassword", { message: "Old password is required to update the password" });
        return;
      }

      if (!data.email.trim()) {
        setError("email", { message: "Email cannot be empty" });
        return;
      }

      if (data.newPassword && data.oldPassword === data.newPassword) {
        setError("newPassword", { message: "Old and new passwords cannot be the same" });
        return;
      }

      if (
        data.name === user.name &&
        data.email === user.email &&
        !data.newPassword
      ) {
        toast.error("Nothing to update.");
        return;
      }

      const updatedUser = await updateUserDetails(data, user.token);

      // toast.success(`${data.email !== user.email ? 'Email' : 'Password'} updated successfully!`);
      let updateType = "Profile";
      if (data.email !== user.email) updateType = "Email";
      else if (data.newPassword) updateType = "Password";

      toast.success(`${updateType} updated successfully!`);
      setIsSafeToReset(true);
      if (data.name !== user.name) {
        setUser({ ...user, name: data.name });
      }


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
            <User size={18} className={styles.icon} />
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
            <Mail size={18} className={styles.icon} />
          </div>
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <Lock size={18} className={styles.icon} />
            <input
              id="oldPassword"
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Old Password"
              {...register('oldPassword')}
            />
            {showOldPassword ? (
              <EyeOff size={18} className={styles.Eyeicon} onClick={() => setShowOldPassword(!showOldPassword)} />
            ) : (
              <Eye size={18} className={styles.Eyeicon} onClick={() => setShowOldPassword(!showOldPassword)} />
            )}
          </div>
          {errors.oldPassword && (
            <p className={styles.error}>{errors.oldPassword.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputContainer}>
            <Lock size={18} className={styles.icon} />
            <input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
              {...register('newPassword')}
            />
            {showNewPassword ? (
              <EyeOff size={18} className={styles.Eyeicon} onClick={() => setShowNewPassword(!showNewPassword)} />
            ) : (
              <Eye size={18} className={styles.Eyeicon} onClick={() => setShowNewPassword(!showNewPassword)} />
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
