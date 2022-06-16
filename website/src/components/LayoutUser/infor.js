import React from 'react'
import styles from './infor.module.scss'
import { Avatar, Button, Table, Tabs, List } from 'antd'
import { Row, Col, Timeline, Modal, Card } from 'antd'
import { HeartOutlined, WechatOutlined, ShareAltOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'

const { Meta } = Card
export default function Infor() {
  return (
    <div className={styles['container-layout']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div className={styles['font-bold']}>Thông tin cá nhân </div>
        <div className={styles['container-icon-setting']}>
                
                <Link to={ROUTES_USER.SETTINGINFOR}> <SettingOutlined /></Link>
              </div>
      </div>
      <div>
        <div className={styles['container-account']}>
          <div className={styles['container-avt']}>
            <Avatar size={140} src="https://joeschmoe.io/api/v1/random" />
          </div>
          <div>
           
              
              <div>Nguyễn Ngọc Hà</div>
              
            
            <p>đời là bể khổ quay đầu là bể mỏ</p>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>01/07/1999</div>
              <div className={styles['container-item']}>SDT: 0395121517</div>
              <div className={styles['container-item']}>Nam</div>
            </div>
            <div className={styles['container-flex']}>
              <div className={styles['container-item']}>ngocha17.1999@gmail.com</div>
              <div className={styles['container-item']}>hadeptrai.com</div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-dh']}>
            <div className={styles['center']}>
              <h1 style={{ fontWeight: 'bold' }}>180</h1>
              <p>lượt theo dõi</p>
            </div>
            <div className={styles['center']}>
              <h1 style={{ fontWeight: 'bold' }}>10</h1>
              <p>Đang theo dõi</p>
            </div>
            <div className={styles['center']}>
              <h1 style={{ fontWeight: 'bold' }}>6</h1>
              <p>lượt mua sắm</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div
              style={{
                marginLeft: 0,
                marginTop: 0,
                width: 680,
                height: '100%',
                marginBottom: 15,
              }}
              className={styles['card-overview']}
            >
              <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Tabs>
                  <Tabs.TabPane tab="Feed" key="1">
                    <div style={{ width: '100%', overflowY: 'scroll' }}>
                      <div className={styles['container']}>
                        <Row>
                          <Col>
                            <Meta
                              className={styles['content']}
                              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                              title="@hadudu"
                              title1="kandksja"
                              description="12:00 ngày 26/4/2022"
                            />
                          </Col>
                          <Col className={styles['button']}>
                            <Button>Theo dõi</Button>
                          </Col>
                        </Row>
                        <div className={styles['container-item1']}>
                          <Row>
                            <img
                              className={styles['image']}
                              alt="example"
                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                          </Row>
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
                        <div
                          className={styles['dashboard_manager_bottom_row_col_parent_top']}
                        ></div>
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Shopping history" key="2">
                    <div style={{ width: '100%', overflowY: 'scroll', paddingTop: 10 }}>
                      <div className={styles['container']}>
                        <Row>
                          <Col>
                            <Meta
                              className={styles['content']}
                              avatar={<Avatar size={60} src="https://joeschmoe.io/api/v1/random" />}
                              title="@hadudu"
                              title1="kandksja"
                              description="12:00 ngày 26/4/2022"
                            />
                          </Col>

                          <Col className={styles['button']}>
                            <Button>Theo dõi</Button>
                          </Col>
                        </Row>
                        <div>
                          <h3>Đơn hàng: #123456</h3>
                          <h3>Mã vận chuyển: #12314-UKIOU</h3>
                        </div>
                        <div>
                          <List>
                            <div className={styles['container-product']}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    shape="square"
                                    size="large"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  />
                                }
                                title="#Q-N123"
                                description="Quaanf xer goois"
                              />
                              <div className={styles['container-center']}>
                                <h3>220.000 vnd</h3>
                              </div>
                              {/* <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
                                                            </div> */}
                            </div>
                            <div className={styles['container-product']}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    shape="square"
                                    size="large"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  />
                                }
                                title="#Q-N123"
                                description="Quaanf xer goois"
                              />
                              <div className={styles['container-center']}>
                                <h3>220.000 vnd</h3>
                              </div>
                              {/* <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
                                                            </div> */}
                            </div>
                            <div className={styles['container-product']}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    shape="square"
                                    size="large"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  />
                                }
                                title="#Q-N123"
                                description="Quaanf xer goois"
                              />
                              <div className={styles['container-center']}>
                                <h3>220.000 vnd</h3>
                              </div>
                              {/* <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
                                                            </div> */}
                            </div>
                            <div className={styles['container-product']}>
                              <List.Item.Meta
                                avatar={
                                  <Avatar
                                    shape="square"
                                    size="large"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  />
                                }
                                title="#Q-N123"
                                description="Quaanf xer goois"
                              />
                              <div className={styles['container-center']}>
                                <h3>220.000 vnd</h3>
                              </div>
                              {/* <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
                                                            </div> */}
                            </div>
                          </List>
                        </div>

                        <div
                          className={styles['dashboard_manager_bottom_row_col_parent_top']}
                        ></div>
                      </div>
                    </div>
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
