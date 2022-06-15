import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Avatar, Card } from 'antd'
import React from 'react'
import styles from './home.module.scss'

const { Meta } = Card
function Home() {
    return (
        <div>
            <div className={styles['container']}>
                <Meta
                    className={styles['content']}
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title="@hadudu"
                    description="Sản phẩm hot chào đón mùa hè... hãy ghé thăm shop và quẹo lựa món đồ mà bạn yêu thích !!!"
                />
                <div className={styles['container-item']}>
                    <img
                        className={styles['image']}
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
