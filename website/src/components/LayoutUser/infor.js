import React, {useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode'
import {useHistory} from 'react-router-dom'
import styles from './infor.module.scss'
import moment from 'moment'
import ShoppingHistory from 'components/newfeed/shopping-history'

import {Avatar, Tabs} from 'antd'
import {Row, Col, Image} from 'antd'
import {
  SettingOutlined,
  PhoneFilled,
  BulbFilled,
  MailFilled,
  ChromeFilled,
  CalendarOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { getuserEKT } from 'apis/user-ekt'
import { ROUTES_USER } from 'consts'

export default function Infor() {
  const [user, setUser] = useState([])
  const history = useHistory()

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}

  const getInfoUser = async (params) => {
    try {
      const res = await getuserEKT(params)
      if (res.status === 200) {
        if (res.data.data.length) setUser({...res.data.data[0]})
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInfoUser({user_id: dataUser.data.user_id})
  }, [dataUser.data.user_id])
  return (
    <div className={styles['container-layout']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div className={styles['font-bold']}>Thông tin cá nhân</div>
        <div className={styles['container-icon-setting']}>
          <a
            className={styles['icon-setting']}
            onClick={() => history.push({pathname: ROUTES_USER.SETTINGINFOR, state: user})}
          >
            <SettingOutlined/>
          </a>
        </div>
      </div>
      <div>
        <div className={styles['container-account']}>
          <div className={styles['container-avt']}>
            <Avatar size={104} src={user && (user.avatar || '')}/>
          </div>
          <div className={styles['container-infor']}>
            <div className={styles['display-flex']}>
              <div className={styles['infor-name']}>
                <p>{user.fullname || '...'}</p>
              </div>
              <div className={styles['container-icon-phone']}>
                <PhoneFilled
                  style={{color: '#39CB7F', fontSize: 12}}
                />
              </div>
              <div className={styles['container-icon-id']}>
                <BulbFilled
                  style={{color: '#91919F'}}
                />
              </div>
            </div>

            <div className={styles['container-status']}>
              <p>{user.bio || '...'}</p>
            </div>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>{moment(user.birthday).format(
                'DD/MM/YYYY'
              )}</div>
              <div className={styles['container-item']}>SDT: {user.phone || '...'}</div>
              <div className={styles['container-item']}>{user.gender || '...'}</div>
            </div>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>
                {' '}
                <MailFilled/> {user.email || '...'}
              </div>
              <div className={styles['container-item']}>
                <ChromeFilled/> {user.web || '...'}
              </div>
            </div>
            <div className={styles['container-dh']}>
              <div className={styles['center']}>
                <h1 className={styles['dh-number']}>180k</h1>
                <p className={styles['dh-content']}>lượt theo dõi</p>
              </div>
              <div className={styles['center']}>
                <h1 sclassName={styles['dh-number']}>10</h1>
                <p className={styles['dh-content']}>đang theo dõi</p>
              </div>
              <div className={styles['center']}>
                <h1 className={styles['dh-number']}>6k</h1>
                <p className={styles['dh-content']}>lượt mua sắm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['container-fe-hi']}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div className={styles['card-overview']}>
              <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                <Tabs centered>
                  <Tabs.TabPane
                    tab={
                      <span className={styles['tabpane']}>
                        <CalendarOutlined/>
                        Feed
                      </span>
                    }
                    key="1"
                  >
                    <div style={{width: '100%'}}>
                      <div className={styles['container-feed']}>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"/>
                        </div>

                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <span className={styles['tabpane']}>
                        <HistoryOutlined/>
                        Shopping history
                      </span>
                    }
                    key="2"
                  >
                    <ShoppingHistory userPhone={dataUser.data.phone}/>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
