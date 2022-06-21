/* eslint-disable jsx-a11y/anchor-is-valid */

// import { PAGE_SIZE } from 'consts'
import React, { useState, useEffect } from 'react'
import styles from './styles/overview.module.scss'
import { Avatar, Button, Table, Tabs, List } from 'antd'
import { Row, Col, Timeline, Modal, Card } from 'antd'
import jwt_decode from 'jwt-decode'
import ModalShopping from './modal-shopping'
import AssessOders from './assess'
import { useHistory, useLocation } from 'react-router-dom'
import { compare, formatCash, compareCustom } from 'utils'
import moment from 'moment'

import Newfeed from '../newfeed'
import {
  HeartOutlined,
  WechatOutlined,
  ShareAltOutlined,
  DiffOutlined,
  HistoryOutlined,
} from '@ant-design/icons'

// import ModalUpdateUser from './modal-user'
import { getuserEKT } from 'apis/user-ekt'
import { getshopping, getshoppingone } from 'apis/shopping-dairy'
import { ROUTES_USER } from 'consts'
// import data from 'views/import-report-file/datatest'
const { Meta } = Card

function App() {
  let history = useHistory()

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
    _getShoppingDari()
    // getone()
  }, [])

  useEffect(() => {
    getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])

  return (
    <div className={styles['container-layout']}>
      <div className={styles['container-content']}>
        <Row>
          <div className={styles['card-overview']}>
            <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              <Tabs defaultActiveKey="2">
                <Tabs.TabPane
                  key="1"
                  tab={
                    <span>
                      <DiffOutlined />
                      Feed
                    </span>
                  }
                >
                  <div style={{ width: '100%', paddingTop: 10 }}>
                    <div className={styles['container']}>
                      <Row>
                        <Col>
                          <Meta
                            className={styles['content']}
                            avatar={<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />}
                            title={<p className={styles['text-name']}>@hadudu</p>}
                            title1="kandksja"
                            description="12:00 ngày 26/4/2022"
                          />
                        </Col>
                        <Col className={styles['button']}>
                          <Button>Theo dõi</Button>
                        </Col>
                      </Row>
                      <div className={styles['container-item']}>
                        <div>
                          <img
                            className={styles['image']}
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        </div>
                        <div className={styles['container-content']}>
                          <Row style={{ display: 'inline-block', width: '70%' }}>
                            <h1> 100.000 - 200.000 VND</h1>
                            <Row className={styles['container-icon']}>
                              <div className={styles['icon']}>
                                <ShareAltOutlined />
                              </div>
                              <div className={styles['icon']}>
                                <HeartOutlined />
                              </div>
                              <div className={styles['icon']}>
                                <WechatOutlined />
                              </div>
                            </Row>
                            <Row>
                              <p>
                                <a>abc và 200 người khác</a> đã thích sản phẩm này
                              </p>
                            </Row>
                            {/* <p><a>abc và 200 người khác</a> đã thích sản phẩm này</p> */}
                          </Row>
                          <Col className={styles['container-button-content']}>
                            <div className={styles['container-button-sell']}>
                              <Button className={styles['button-sell']}>Mua ngay</Button>
                            </div>
                            <div className={styles['container-button-sell']}>
                              <Button className={styles['button-sell']}>Thêm vào giỏ</Button>
                            </div>
                          </Col>
                        </div>
                        <Row>
                          <p>
                            We andour partners use cookies to personalize your experience, to show
                            you ads based on your interests, and for measurement and analytics
                            purposes. By using our website and services, you agree to our use of
                            cookies as described in ourCookie Policy.
                          </p>
                        </Row>
                      </div>
                      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}></div>
                    </div>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane
                  key="2"
                  tab={
                    <span>
                      <HistoryOutlined />
                      Shopping history
                    </span>
                  }
                >
                  {orderekt &&
                    orderekt.map((Item, index) => {
                      return (
                        <div style={{ width: '100%' ,paddingTop: 10 }}>
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
                                          <AssessOders key="index">
                                            <Button>Đánh giá</Button>
                                          </AssessOders>
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
          <div className={styles['container-top10']}>
            <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
              <div>TOP CỬA HÀNG </div>
            </div>
            <div style={{ width: '100%', overflowY: 'scroll', paddingTop: 10 }}>
              <List>
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          color: '#FFF',
                          backgroundColor: '#FDAA3E',
                          width: 60,
                          height: 60,
                        }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      />
                    }
                    title={<a href="https://ant.design">@hadudu</a>}
                    description="Chất lượng tạo nên thương hiệu EKETE"
                  />
                  <div>
                    <a> + Theo dõi</a>
                  </div>
                </List.Item>
              </List>
            </div>
          </div>
        </Row>
      </div>
    </div>
  )
}

export default App
