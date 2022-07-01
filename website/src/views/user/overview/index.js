import React from 'react'
import styles from './styles/overview.module.scss'
import stylefeed from './styles/feed.module.scss'
import TopBusiness from "./top-business";
import ShoppingHistory from "./shopping-history";

import { Avatar, Button, Tabs } from 'antd'
import { Row, Col, Card } from 'antd'

import {
  HeartOutlined,
  WechatOutlined,
  ShareAltOutlined,
  DiffOutlined,
  HistoryOutlined,
} from '@ant-design/icons'

const { Meta } = Card

function App() {

  return (
    <div className={styles['container-layout']}>
      <div className={styles['container-content']}>
        <div className={styles['card-overview']}>
          <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '0' }}>
            <Tabs defaultActiveKey="2" className={styles['container-tabs']} >
              <Tabs.TabPane
                key="1"
                tab={
                  <span className={styles['tabpane']}>
                    <DiffOutlined />
                    Feed
                  </span>
                }
              >
                <div style={{ width: '100%', background: '#fff',  borderRadius: 14 }}>
                  <div className={stylefeed['container']}>
                    <Row>
                      <Col style={{width: '70%'}}>
                        <Meta
                          className={stylefeed['content']}
                          avatar={<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />}
                          title={<p className={stylefeed['text-name']}>@hadudu</p>}
                          title1="kandksja"
                          description="12:00 ngày 26/4/2022"
                        />
                      </Col>
                      <Col className={stylefeed['button']}>
                        <Button>Theo dõi</Button>
                      </Col>
                    </Row>
                    <img
                          className={stylefeed['image']}
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      </div>
                    <div className={stylefeed['container-item']}>
                      <div>

                      <Row className={stylefeed['container-content']}>
                        <Row style={{ display: 'inline-block', width: '70%' }}>
                          <h1> 100.000 - 200.000 VND</h1>
                          <Row className={stylefeed['container-icon']}>
                            <div className={stylefeed['icon']}>
                              <ShareAltOutlined />
                            </div>
                            <div className={stylefeed['icon']}>
                              <HeartOutlined />
                            </div>
                            <div className={stylefeed['icon']}>
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
                        <Col className={stylefeed['container-button-content']}>
                          <div className={stylefeed['container-button-sell']}>
                            <Button className={stylefeed['button-sell']}>Mua ngay</Button>
                          </div>
                          <div className={stylefeed['container-button-sell']}>
                            <Button className={stylefeed['button-sell']}>Thêm vào giỏ</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          We andour partners use cookies to personalize your experience, to show
                          you ads based on your interests, and for measurement and analytics
                          purposes. By using our website and services, you agree to our use of
                          cookies as described in ourCookie Policy.
                        </p>
                      </Row>
                    </div>
                    <div
                      className={stylefeed['dashboard_manager_bottom_row_col_parent_top']}
                    ></div>
                  </div>
                </div>
                <div style={{ width: '100%', background: '#fff', borderRadius: 14 }}>
                  <div className={stylefeed['container']}>
                    <Row>
                      <Col>
                        <Meta
                          className={stylefeed['content']}
                          avatar={<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />}
                          title={<p className={stylefeed['text-name']}>@hadudu</p>}
                          title1="kandksja"
                          description="12:00 ngày 26/4/2022"
                        />
                      </Col>
                      <Col className={stylefeed['button']}>
                        <Button>Theo dõi</Button>
                      </Col>
                    </Row>
                    <img
                          className={stylefeed['image']}
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      </div>
                    <div className={stylefeed['container-item']}>
                      <div>

                      <Row className={stylefeed['container-content']}>
                        <Row style={{ display: 'inline-block', width: '70%' }}>
                          <h1> 100.000 - 200.000 VND</h1>
                          <Row className={stylefeed['container-icon']}>
                            <div className={stylefeed['icon']}>
                              <ShareAltOutlined />
                            </div>
                            <div className={stylefeed['icon']}>
                              <HeartOutlined />
                            </div>
                            <div className={stylefeed['icon']}>
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
                        <Col className={stylefeed['container-button-content']}>
                          <div className={stylefeed['container-button-sell']}>
                            <Button className={stylefeed['button-sell']}>Mua ngay</Button>
                          </div>
                          <div className={stylefeed['container-button-sell']}>
                            <Button className={stylefeed['button-sell']}>Thêm vào giỏ</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <p>
                          We andour partners use cookies to personalize your experience, to show
                          you ads based on your interests, and for measurement and analytics
                          purposes. By using our website and services, you agree to our use of
                          cookies as described in ourCookie Policy.
                        </p>
                      </Row>
                    </div>
                    <div
                      className={stylefeed['dashboard_manager_bottom_row_col_parent_top']}
                    ></div>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane
                key="2"
                tab={
                  <span className={styles['tabpane']}>
                    <HistoryOutlined />
                    Shopping history
                  </span>
                }
              >
                <ShoppingHistory />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
        <TopBusiness></TopBusiness>
      </div>
    </div>
  )
}

export default App
