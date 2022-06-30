import React, { useState, useEffect } from 'react'
import styles from './styles/overview.module.scss'
import styleshopping from './styles/historyshopping.module.scss'
import stylefeed from './styles/feed.module.scss'

import { Avatar, Button, Tabs, List, Rate, Skeleton, Input, Tooltip } from 'antd'
import { Row, Col, Modal, Card } from 'antd'
import jwt_decode from 'jwt-decode'
import ModalShopping from './modal-shopping'
import AssessOders from './assess'
import Feedback from './private-feedback'
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
  FileImageOutlined,
  FileGifOutlined,
  CameraOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'

import { getuserEKT } from 'apis/user-ekt'
import { getshopping, getshoppingone } from 'apis/shopping-dairy'
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
      // console.log('danh sach', resShoppingDari)
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
    // <div className="card">
    <div className={styles['container-layout']}>
      <div className={styles['container-content']}>
        <Row>
          <div className={styles['card-overview']}>
            <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '0' }}>
              <Tabs defaultActiveKey="2" className={styles['container-tabs']}>
                <Tabs.TabPane
                  key="1"
                  tab={
                    <span className={styles['tabpane']}>
                      <DiffOutlined />
                      Feed
                    </span>
                  }
                >
                  <div style={{ width: '100%', background: '#fff', borderRadius: 14 }}>
                    <div className={stylefeed['container']}>
                      <Row>
                        <Col style={{ width: '70%' }}>
                          <Meta
                            className={stylefeed['content']}
                            avatar={<Avatar size={50} src="https://joeschmoe.io/api/v1/random" />}
                            title={<p className={stylefeed['text-name']}>@hadudu</p>}
                            title1="kandksja"
                            description="12:00 ngày 26/4/2022"
                          />
                        </Col>
                        <Col className={styleshopping['button']}>
                          <Button className={styleshopping['text-button']}>+ Theo dõi</Button>
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
                        <div className={styles['display-flex']}>
                          <div className={stylefeed['container-name-drep']}>
                            <p>
                              {' '}
                              Sản phẩm ốp điện thoại đẹp sành điệu dành cho những người thích sáng
                              tạo và phá cách
                            </p>
                          </div>
                          <div>
                            <Rate className={stylefeed['rate']} allowHalf defaultValue={2.5} />
                            <div className={stylefeed['rate']}>
                              <p>Đã bán 1234</p>
                            </div>
                          </div>
                        </div>
                        <Row className={stylefeed['container-content']}>
                          <Row style={{ display: 'inline-block', width: '70%' }}>
                            <h1 className={stylefeed['text-price']}> 100.000 - 200.000 VND</h1>
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
                              <p className={stylefeed['text-like']}>
                                <a>abc và 200 người khác</a> đã thích sản phẩm này
                              </p>
                            </Row>
                            {/* <p><a>abc và 200 người khác</a> đã thích sản phẩm này</p> */}
                          </Row>
                          <Col className={stylefeed['container-button-content']}>
                            <div className={stylefeed['container-button-sell']}>
                              <Button className={stylefeed['button-sell']}>Mua ngay</Button>
                            </div>
                            <div className={stylefeed['container-button-add']}>
                              <Button
                                className={stylefeed['button-add']}
                                icon={<ShoppingCartOutlined className={stylefeed['icon-btn']} />}
                              >
                                Thêm vào giỏ
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <p className={stylefeed['text-drep']}>
                            We andour partners use cookies to personalize your experience, to show
                            you ads based on your interests, and for measurement and analytics
                            purposes. By using our website and services, you agree to our use of
                            cookies as described in ourCookie Policy.
                          </p>
                        </Row>
                      </div>

                      <div className={styleshopping['container-add-cmt']}>
                        <div className={styleshopping['container-avt']}>
                          <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
                        </div>
                        <div className={styleshopping['container-input-add-cmt']}>
                          <div
                            className={styleshopping['dashboard_manager_bottom_row_col_parent_top']}
                          ></div>
                          <div className={styleshopping['container-input']}>
                            <Input
                              className={styleshopping['input-add-cmt']}
                              placeholder="Thêm bình luận..."
                              suffix={
                                <Tooltip>
                                  <SmileOutlined className={styleshopping['icon-cmt']} />
                                  <CameraOutlined className={styleshopping['icon-cmt']} />
                                  <FileGifOutlined className={styleshopping['icon-cmt']} />
                                  <FileImageOutlined className={styleshopping['icon-cmt']} />
                                </Tooltip>
                              }
                            />
                            <div>
                              <Button>Đăng</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <List className={styleshopping['container-cmt']}>
                        <List.Item className={styleshopping['container-cmt']}>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                style={{
                                  color: '#FFF',
                                  backgroundColor: '#FDAA3E',
                                  marginRight: 4,
                                }}
                                size={50}
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                              />
                            }
                            title={
                              <a className={styleshopping['name-cmt']} href="https://ant.design">
                                @hadudu
                              </a>
                            }
                            description={
                              <p className={styleshopping['text-cmt']}>
                                {' '}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod, Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit, sed do eiusmod
                              </p>
                            }
                          />
                        </List.Item>
                        <div className={styleshopping['container-cmt-tool']}>
                          <div>
                            <a className={styleshopping['item-tool']}>Thích</a>
                          </div>
                          <div>
                            <a className={styleshopping['item-tool']}>Bình luận</a>
                          </div>
                          <div>
                            <Feedback key="index">
                              <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                          </div>
                        </div>
                      </List>
                      <List className={styleshopping['container-cmt']}>
                        <List.Item className={styleshopping['container-cmt']}>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                style={{
                                  color: '#FFF',
                                  backgroundColor: '#FDAA3E',
                                  marginRight: 4,
                                }}
                                size={50}
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                              />
                            }
                            title={
                              <a className={styleshopping['name-cmt']} href="https://ant.design">
                                @hadudu
                              </a>
                            }
                            description={
                              <p className={styleshopping['text-cmt']}>
                                {' '}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod
                              </p>
                            }
                          />
                        </List.Item>
                        <div className={styleshopping['container-cmt-tool']}>
                          <div>
                            <a className={styleshopping['item-tool']}>Thích</a>
                          </div>
                          <div>
                            <a className={styleshopping['item-tool']}>Bình luận</a>
                          </div>
                          <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                        </div>
                        <div className={styleshopping['container-rep-cmt']}>
                          <List.Item className={styleshopping['container-cmt']}>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{
                                    color: '#FFF',
                                    backgroundColor: '#FDAA3E',
                                    marginRight: 4,
                                  }}
                                  size={50}
                                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                              }
                              title={
                                <a className={styleshopping['name-cmt']} href="https://ant.design">
                                  @hadudu
                                </a>
                              }
                              description={
                                <p className={styleshopping['text-cmt']}>
                                  {' '}
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                  eiusmod
                                </p>
                              }
                            />
                          </List.Item>
                          <div className={styleshopping['container-cmt-tool']}>
                            <div>
                              <a className={styleshopping['item-tool']}>Thích</a>
                            </div>
                            <div>
                              <a className={styleshopping['item-tool']}>Bình luận</a>
                            </div>
                            <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                          </div>
                        </div>
                        <div className={styleshopping['container-rep-cmt']}>
                          <List.Item className={styleshopping['container-cmt']}>
                            <List.Item.Meta
                              avatar={
                                <Avatar
                                  style={{
                                    color: '#FFF',
                                    backgroundColor: '#FDAA3E',
                                    marginRight: 4,
                                  }}
                                  size={50}
                                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                              }
                              title={
                                <a className={styleshopping['name-cmt']} href="https://ant.design">
                                  @hadudu
                                </a>
                              }
                              description={<p className={styleshopping['text-cmt']}> Ok !</p>}
                            />
                          </List.Item>
                          <div className={styleshopping['container-cmt-tool']}>
                            <div>
                              <a className={styleshopping['item-tool']}>Thích</a>
                            </div>
                            <div>
                              <a className={styleshopping['item-tool']}>Bình luận</a>
                            </div>
                            <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                          </div>
                        </div>
                      </List>
                      <div className={styleshopping['container-text-see-cmts']}>
                        <a className={styleshopping['text-see-cmts']}>Xem tất cả 7 bình luận</a>
                      </div>
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
                  <div>
                    {orderekt &&
                      orderekt.map((Item, index) => {
                        return (
                          <div style={{ width: '100%' }}>
                            <div className={styleshopping['container']}>
                              <Row>
                                <Col style={{ width: '70%' }}>
                                  <Meta
                                    className={styleshopping['content']}
                                    avatar={
                                      <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
                                    }
                                    title={
                                      <p className={styleshopping['text-name']}>
                                        @{Item.customer_info.slug_name}
                                      </p>
                                    }
                                    description={moment(Item.create_date).format(
                                      'DD/MM/YYYY HH:mm'
                                    )}
                                  />
                                </Col>
                                <Col className={styleshopping['button']}>
                                  <Button className={styleshopping['text-button']}>
                                    {' '}
                                    + Theo dõi
                                  </Button>
                                </Col>
                              </Row>
                              <div>
                                <div className={styleshopping['display-flex']}>
                                  <p className={styleshopping['text']}>Đơn hàng: &nbsp; </p>
                                  {<p className={styleshopping['text-blue']}> #{Item.code}</p>}
                                </div>
                                <div className={styleshopping['display-flex']}>
                                  <p className={styleshopping['text']}>Mã vận chuyển: &nbsp; </p>
                                  {
                                    <p className={styleshopping['text-blue']}>
                                      {' '}
                                      #
                                      {Item.shipping_info.tracking_number ||
                                        'Đơn hàng mua trực tiếp'}
                                    </p>
                                  }
                                  <p className={styleshopping['status-order']}>
                                    Trạng thái đơn hàng
                                  </p>
                                </div>
                              </div>
                              <div>
                                <List>
                                  {Item.order_details.map((Item, index) => {
                                    return (
                                      <div className={styleshopping['container-product']}>
                                        <div>
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
                                            title={
                                              <p className={styleshopping['text-sku']}>
                                                #{Item.sku}
                                              </p>
                                            }
                                            description={
                                              <p className={styleshopping['text-name-product']}>
                                                {Item.name}
                                              </p>
                                            }
                                          />
                                          <div className={styleshopping['container-center']}>
                                            <h3 className={styleshopping['text-blue']}>
                                              {' '}
                                              {Item.price ? formatCash(+Item.price || 0) : 0}Đ
                                            </h3>
                                          </div>
                                          <Rate
                                            className={styleshopping['rate']}
                                            allowHalf
                                            defaultValue={2.5}
                                          />
                                          <div className={styleshopping['margin-center']}>
                                            <AssessOders key="index">
                                              <Button className={styleshopping['button-cta']}>
                                                Đánh giá
                                              </Button>
                                            </AssessOders>
                                          </div>
                                        </div>
                                        <div
                                          className={
                                            styleshopping[
                                              'dashboard_manager_bottom_row_col_parent_top'
                                            ]
                                          }
                                        ></div>
                                      </div>
                                    )
                                  })}
                                </List>
                                <div>
                                  <div className={styleshopping['container-add-cmt']}>
                                    <div className={styleshopping['container-avt']}>
                                      <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
                                    </div>
                                    <div className={styleshopping['container-input-add-cmt']}>
                                      <div
                                        className={
                                          styleshopping[
                                            'dashboard_manager_bottom_row_col_parent_top'
                                          ]
                                        }
                                      ></div>
                                      <div className={styleshopping['container-input']}>
                                        <Input
                                          className={styleshopping['input-add-cmt']}
                                          placeholder="Thêm bình luận..."
                                          suffix={
                                            <Tooltip>
                                              <SmileOutlined
                                                className={styleshopping['icon-cmt']}
                                              />
                                              <CameraOutlined
                                                className={styleshopping['icon-cmt']}
                                              />
                                              <FileGifOutlined
                                                className={styleshopping['icon-cmt']}
                                              />
                                              <FileImageOutlined
                                                className={styleshopping['icon-cmt']}
                                              />
                                            </Tooltip>
                                          }
                                        />
                                        <div>
                                          <Button>Đăng</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <List className={styleshopping['container-cmt']}>
                                    <List.Item className={styleshopping['container-cmt']}>
                                      <List.Item.Meta
                                        avatar={
                                          <Avatar
                                            style={{
                                              color: '#FFF',
                                              backgroundColor: '#FDAA3E',
                                              marginRight: 4,
                                            }}
                                            size={50}
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                          />
                                        }
                                        title={
                                          <a
                                            className={styleshopping['name-cmt']}
                                            href="https://ant.design"
                                          >
                                            @hadudu
                                          </a>
                                        }
                                        description={
                                          <p className={styleshopping['text-cmt']}>
                                            {' '}
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod, Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed do eiusmod Lorem ipsum dolor sit
                                            amet, consectetur adipiscing elit, sed do eiusmod
                                          </p>
                                        }
                                      />
                                    </List.Item>
                                    <div className={styleshopping['container-cmt-tool']}>
                                      <div>
                                        <a className={styleshopping['item-tool']}>Thích</a>
                                      </div>
                                      <div>
                                        <a className={styleshopping['item-tool']}>Bình luận</a>
                                      </div>
                                      <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                                    </div>
                                  </List>
                                  <List className={styleshopping['container-cmt']}>
                                    <List.Item className={styleshopping['container-cmt']}>
                                      <List.Item.Meta
                                        avatar={
                                          <Avatar
                                            style={{
                                              color: '#FFF',
                                              backgroundColor: '#FDAA3E',
                                              marginRight: 4,
                                            }}
                                            size={50}
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                          />
                                        }
                                        title={
                                          <a
                                            className={styleshopping['name-cmt']}
                                            href="https://ant.design"
                                          >
                                            @hadudu
                                          </a>
                                        }
                                        description={
                                          <p className={styleshopping['text-cmt']}>
                                            {' '}
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                            sed do eiusmod
                                          </p>
                                        }
                                      />
                                    </List.Item>
                                    <div className={styleshopping['container-cmt-tool']}>
                                      <div>
                                        <a className={styleshopping['item-tool']}>Thích</a>
                                      </div>
                                      <div>
                                        <a className={styleshopping['item-tool']}>Bình luận</a>
                                      </div>
                                      <div>
                                        <Feedback key="index">
                                          <a className={styleshopping['item-tool']}>
                                            Phản hồi riêng
                                          </a>
                                        </Feedback>
                                      </div>
                                    </div>
                                    <div className={styleshopping['container-rep-cmt']}>
                                      <List.Item className={styleshopping['container-cmt']}>
                                        <List.Item.Meta
                                          avatar={
                                            <Avatar
                                              style={{
                                                color: '#FFF',
                                                backgroundColor: '#FDAA3E',
                                                marginRight: 4,
                                              }}
                                              size={50}
                                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                          }
                                          title={
                                            <a
                                              className={styleshopping['name-cmt']}
                                              href="https://ant.design"
                                            >
                                              @hadudu
                                            </a>
                                          }
                                          description={
                                            <p className={styleshopping['text-cmt']}>
                                              {' '}
                                              Lorem ipsum dolor sit amet, consectetur adipiscing
                                              elit, sed do eiusmod
                                            </p>
                                          }
                                        />
                                      </List.Item>
                                      <div className={styleshopping['container-cmt-tool']}>
                                        <div>
                                          <a className={styleshopping['item-tool']}>Thích</a>
                                        </div>
                                        <div>
                                          <a className={styleshopping['item-tool']}>Bình luận</a>
                                        </div>
                                        <div>
                                        <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                                        </div>
                                      </div>
                                    </div>
                                    <div className={styleshopping['container-rep-cmt']}>
                                      <List.Item className={styleshopping['container-cmt']}>
                                        <List.Item.Meta
                                          avatar={
                                            <Avatar
                                              style={{
                                                color: '#FFF',
                                                backgroundColor: '#FDAA3E',
                                                marginRight: 4,
                                              }}
                                              size={50}
                                              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                          }
                                          title={
                                            <a
                                              className={styles['name-cmt']}
                                              href="https://ant.design"
                                            >
                                              @hadudu
                                            </a>
                                          }
                                          description={
                                            <p className={styleshopping['text-cmt']}> Ok !</p>
                                          }
                                        />
                                      </List.Item>
                                      <div className={styleshopping['container-cmt-tool']}>
                                        <div>
                                          <a className={styleshopping['item-tool']}>Thích</a>
                                        </div>
                                        <div>
                                          <a className={styleshopping['item-tool']}>Bình luận</a>
                                        </div>
                                        <div>
                                        <Feedback key="index">
                            <a className={styleshopping['item-tool']}>Phản hồi riêng</a>
                            </Feedback>
                                        </div>
                                      </div>
                                    </div>
                                  </List>
                                </div>
                                <div className={styleshopping['container-text-see-cmts']}>
                                  <a className={styleshopping['text-see-cmts']}>
                                    Xem tất cả 7 bình luận
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
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
    // </div>
  )
}

export default App
