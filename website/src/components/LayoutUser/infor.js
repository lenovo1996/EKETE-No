import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useHistory, useLocation } from 'react-router-dom'
import styles from './infor.module.scss'
import { compare, formatCash, compareCustom } from 'utils'
import moment from 'moment'
// import AssessOders from './assess'

import { Avatar, Button, Table, Tabs, List } from 'antd'
import { Row, Col, Timeline, Modal, Card, Image } from 'antd'
import {
  HeartOutlined,
  WechatOutlined,
  ShareAltOutlined,
  SettingOutlined,
  PhoneOutlined,
  BulbOutlined,
  PhoneFilled,
  BulbFilled,
  MailOutlined,
  MailFilled,
  ChromeFilled,
  CalendarOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { getuserEKT } from 'apis/user-ekt'
import { getshopping, getshoppingone } from 'apis/shopping-dairy'
import { Link } from 'react-router-dom'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'

const { Meta } = Card
export default function Infor() {
  const [user, setUser] = useState([])
const [orderekt, setorderEKT] = useState('')
const [detailshopping, setDetaishopping] = useState('')

const dataUser = localStorage.getItem('accessToken')
  ? jwt_decode(localStorage.getItem('accessToken'))
  : {}

const getInfoUser = async (params) => {
  try {
    const res = await getuserEKT(params)
    if (res.status === 200) {
      if (res.data.data.length) setUser({ ...res.data.data[0] })
    }
  } catch (error) {
    console.log(error)
  }
}

const _getShoppingDari = async (params) => {
  try {
    const resShoppingDari = await getshopping(params)
    if (resShoppingDari.status === 200) setorderEKT(resShoppingDari.data.data)
    console.log('danh sach', resShoppingDari)
  } catch (e) {
    console.log(e)
  }
}
useEffect(() => {
  _getShoppingDari({ phone: dataUser.data.phone })
  // getone()
}, [dataUser.data.phone])

useEffect(() => {
  getInfoUser({ user_id: dataUser.data.user_id })
}, [dataUser.data.user_id])
  return (
    <div className={styles['container-layout']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div className={styles['font-bold']}>Thông tin cá nhân </div>
        <div className={styles['container-icon-setting']}>
          <Link to={ROUTES_USER.SETTINGINFOR} className={styles['icon-setting']}>
            {' '}
            <SettingOutlined />
          </Link>
        </div>
      </div>
      <div>
        <div className={styles['container-account']}>
          <div className={styles['container-avt']}>
            <Avatar size={104} src="https://joeschmoe.io/api/v1/random" />
          </div>
          <div className={styles['container-infor']}>
            <div className={styles['display-flex']}>
              <div className={styles['infor-name']}>
                <p>Nguyễn Ngọc Hà</p>
              </div>
              <div className={styles['container-icon-phone']}>
                <PhoneFilled
                style={{ color: '#39CB7F' }}
                //  className={styles['color-icon-phone']} 
                 />
              </div>
              <div className={styles['container-icon-id']}>
                <BulbFilled 
                style={{ color: '#91919F' }}
                // className={styles['color-icon-id']}
                 />
              </div>
            </div>

            <div className={styles['container-status']}>
              <p>Cuộc đời là một chuỗi ngày cần khám phá và trải nghiệm</p>
            </div>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>01/07/1999</div>
              <div className={styles['container-item']}>SDT: 0395121517</div>
              <div className={styles['container-item']}>Nam</div>
            </div>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>
                {' '}
                <MailFilled /> ngocha17.1999@gmail.com
              </div>
              <div className={styles['container-item']}>
                <ChromeFilled /> hadeptrai.com
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
        <div></div>
      </div>
      <div className={styles['container-fe-hi']}>
        <Row>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div
              style={{
                marginLeft: 0,
                marginTop: 0,
                width: 690,
                height: '100%',
                marginBottom: 15,
                background: '#F9F9F9',
              }}
              className={styles['card-overview']}
            >
              <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Tabs centered>
                  <Tabs.TabPane
                    tab={
                      <span>
                        <CalendarOutlined />
                        Feed
                      </span>
                    }
                    key="1"
                  >
                    <div style={{ width: '100%' }}>
                      <div className={styles['container-feed']}>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                        <div>
                          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
                        </div>
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane
                    tab={
                      <span>
                        <HistoryOutlined />
                        Shopping history
                      </span>
                    }
                    key="2"
                  >
                    {orderekt &&
                    orderekt.map((Item, index) => {
                      return (
                        <div style={{ width: '100%', paddingTop: 10 }}>
                          <div className={styles['container']}>
                            <Row>
                              <Col>
                                <Meta
                                  className={styles['content']}
                                  avatar={
                                    <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
                                  }
                                  title={
                                    <p className={styles['text-name']}>
                                      @{Item.customer_info.slug_name}
                                    </p>
                                  }
                                  description={moment(Item.create_date).format('DD/MM/YYYY HH:mm')}
                                />
                              </Col>
                              <Col className={styles['button']}>
                                <Button>Theo dõi</Button>
                              </Col>
                            </Row>
                            <div>
                              <div className={styles['display-flex']}>
                                <p className={styles['text']}>Đơn hàng: &nbsp; </p>
                                {<p className={styles['text-blue']}> #{Item.code}</p>}
                              </div>
                              {/* <h3>
                                Mã vận chuyển:{' '}
                                {Item.shipping_info.tracking_number || 'Đơn hàng mua trực tiếp'}{' '}
                              </h3> */}
                              <div className={styles['display-flex']}>
                                <p className={styles['text']}>Mã vận chuyển: &nbsp; </p>
                                {
                                  <p className={styles['text-blue']}>
                                    {' '}
                                    #
                                    {Item.shipping_info.tracking_number || 'Đơn hàng mua trực tiếp'}
                                  </p>
                                }
                              </div>
                            </div>
                            <div>
                              <List>
                                {Item.order_details.map((Item, index) => {
                                  return (
                                    <div>
                                      <div className={styles['container-product']}>
                                        <List.Item.Meta
                                          avatar={
                                            <Avatar
                                              style={{
                                                width: '47px',
                                                height: '50px',
                                                borderRadius: '6px ',
                                              }}
                                              shape="square"
                                              size="large"
                                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                          }
                                          title={<p className={styles['text-sku']}>#{Item.sku}</p>}
                                          description={
                                            <p className={styles['text-name-product']}>
                                              {Item.name}
                                            </p>
                                          }
                                        />
                                        <div className={styles['container-center']}>
                                          <h3 className={styles['text-blue']}>
                                            {' '}
                                            {Item.price ? formatCash(+Item.price || 0) : 0}Đ
                                          </h3>
                                        </div>
                                        <div className={styles['button']}>
                                          {/* <AssessOders key="index"> */}
                                            <Button>Đánh giá</Button>
                                          {/* </AssessOders> */}
                                        </div>
                                      </div>
                                      <div
                                        className={
                                          styles['dashboard_manager_bottom_row_col_parent_top']
                                        }
                                      ></div>
                                    </div>
                                  )
                                })}
                              </List>
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
