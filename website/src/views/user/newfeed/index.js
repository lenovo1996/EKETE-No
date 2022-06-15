import React from 'react'
import Header from './Header/Header'
import Sidebar from './Slidebar/Sidebar'
import Home from './Home/Home'
import styles from './index.module.scss'

export default function index() {
    return (
        <div className={styles['wrapper']}>
            <Header />
            <div className={styles['container']}>
                <Sidebar />
                <div className={styles['content']}>
                    <Home />
                </div>
            </div>
        </div>
    )
}
