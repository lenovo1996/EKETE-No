import React from 'react'
import styles from './infor.module.scss'
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
import { Link } from 'react-router-dom'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'

const { Meta } = Card
export default function Infor() {
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
                    <div style={{ width: '100%', paddingTop: 10 }}>
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
