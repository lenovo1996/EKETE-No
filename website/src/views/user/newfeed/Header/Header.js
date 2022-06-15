import React from 'react'
import { Link } from 'react-router-dom'
import styles from './newfeed.module.scss'
import Search from './Search'
import { Button } from 'antd'

export default function Header() {
    return (
        <header className={styles['wrapper']}>
            <div className={styles['inner']}>
                <Link className={styles['logo-link']}>
                    <h1>EKETE</h1>
                </Link>
                <Search />

                {/* <Button size="large" type="primary" className={styles['button']}>
                    Đăng ký
                </Button> */}
                <Button size="large" type="primary" className={styles['button']}>
                    Đăng nhập
                </Button>
            </div>
        </header>
    )
}
