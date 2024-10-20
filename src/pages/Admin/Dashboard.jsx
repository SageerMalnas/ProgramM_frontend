import React from 'react'
import Nav from '../../components/navbar/Nav'
import { Outlet } from 'react-router-dom'
import styles from './dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <Nav />
      </div>
      <div className={styles.rightContainer}>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
