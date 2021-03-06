import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './detail_business.module.scss'
import stylefeed from './feed.module.scss'
import { compare, formatCash } from 'utils'

import { Card, Avatar, Tabs, List, Modal, Rate, Row, Col, Button } from 'antd'
import jwt_decode from 'jwt-decode'
import {
  SettingOutlined,
  DropboxOutlined,
  LayoutOutlined,
  ShareAltOutlined,
  HeartOutlined,
  WechatOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons'
//api
import { detailBusiness, getProductList } from 'apis/business'
import FormUpdate from '../Update_business'
import { dropRight } from 'lodash'

export default function Detail_business() {
  const { id } = useParams()
  const { TabPane } = Tabs
  const [mode, setMode] = useState('top');
  const [business, setBusiness] = useState([])
  const [productList, setProductList] = useState([])
  const [count, setCount] = useState([])
  const { Meta } = Card

  const _getDetailBusinesses = async (id) => {
    try {
      const res = await detailBusiness(id)
      if (res.status === 200) setBusiness(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const _getProductList = async (id) => {
    try {
      const res1 = await getProductList(id)
      if (res1.status === 200) {
        setProductList(res1.data.products)
        setCount(res1.data.counts)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    _getDetailBusinesses(id)
    _getProductList(id)
  }, [id])

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
  const user_phone = dataUser.data.phone

  return (
    <div className={styles['body']}>
      <div className={styles['profile']}>
        <div
          className={styles['card']}
          style={{ backgroundImage: `url(${business.business_cover_image})` }}
        >
          {user_phone === business.user_phone ? (
            <FormUpdate>
              <div className={styles['setting']}>
                <SettingOutlined style={{ fontSize: 20 }} />
              </div>
            </FormUpdate>
          ) : null}

          <Avatar
            size={117}
            style={{
              position: 'absolute',
              border: '3px solid #0bb2fb',
              marginTop: 103,
              marginLeft: 104,
              background: 'white',
            }}
          />
          <Avatar
            size={103}
            style={{ position: 'relative', marginTop: 110, marginLeft: 111 }}
            src={business.logo}
          />
        </div>
        <h1 style={{ marginTop: 54, marginBottom: 5, fontSize: 23, fontWeight: 'bold' }}>
          {business.business_name}
        </h1>
        <p style={{ color: '#6c757d', fontWeight: 'inherit' }}>{business.business_desiption}</p>
        <div className={styles['follow']}>
          <div style={{ marginRight: 70 }}>
            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: 18 }}>110K</p>
            <p style={{ color: '#6c757d', fontWeight: 'inherit' }}>l?????t theo d??i</p>
          </div>
          <div>
            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: 18 }}>19</p>
            <p style={{ color: '#6c757d', fontWeight: 'inherit' }}>??ang theo d??i</p>
          </div>
        </div>
        <hr style={{ width: '80%', color: '#6c757d' }} />
        <List
          className={styles['list']}
          dataSource={[
            {
              id: 1,
              name: 'S???n ph???m',
              src: 'https://cdn1.vectorstock.com/i/1000x1000/96/40/magic-open-box-line-icon-box-with-stars-vector-24019640.jpg',
              a: '784 >',
            },
            {
              id: 2,
              name: 'T??? l??? ph???n h???i',
              src: 'https://cdn5.vectorstock.com/i/1000x1000/78/34/chat-icon-isolated-on-white-background-from-vector-27697834.jpg',
              a: '97%',
            },
            {
              id: 3,
              name: 'Th???i gian ph???n h???i',
              src: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
              a: 'V??i ph??t',
            },
            {
              id: 4,
              name: '????nh gi?? Shop',
              src: 'https://cdn3.vectorstock.com/i/1000x1000/09/42/star-icon-vector-22390942.jpg',
              a: '0,0(000)',
            },
            {
              id: 5,
              name: 'T??? l??? ????n kh??ng th??nh c??ng',
              src: 'https://media.istockphoto.com/vectors/bill-icon-vector-design-trendy-vector-id1284067597?k=20&m=1284067597&s=612x612&w=0&h=7rHw18-AHc771dObKJZY3s5_ifMjd4cfs6e93MkZ61s=',
              a: '0,00%',
            },
          ]}
          renderItem={(item) => (
            <List.Item key={item.id} actions={[<a onClick={showModal}>{item.a}</a>]}>
              <List.Item.Meta avatar={<Avatar src={item.src} />} title={item.name} />
            </List.Item>
          )}
        />
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
      <div className={styles['container']}>
        <Tabs
          id="tab_detail"
          defaultActiveKey="1"
          style={{ alignItems: 'center', width: '100%' }}
          // tabPosition={mode}
        >
          <TabPane
            tab={
              <span style={{ fontSize: 17 , marginLeft: 166, marginRight: 57}}>
                <LayoutOutlined style={{ fontSize: 20 }} />
                Feed
              </span>
            }
            key="1"
          >
            <div style={{width: '100%'}}>
            <div style={{ width: '100%', background: '#fff', borderRadius: 14 }}>
              <div className={stylefeed['container']}>
                <Row>
                  <Col style={{ width: '70%' }}>
                    <Meta
                      className={stylefeed['content']}
                      avatar={<Avatar size={50} src={business.logo} />}
                      title={<p className={stylefeed['text-name']}>{business.business_name}</p>}
                      title1="kandksja"
                      description="12:00 ng??y 26/4/2022"
                    />
                  </Col>
                  <Col className={stylefeed['button']}>
                    <Button style={{ color: '#1e4db7', fontWeight: 'bold' }}>+ Theo d??i</Button>
                  </Col>
                </Row>
                <img
                  className={stylefeed['image']}
                  alt="example"
                  src="https://chupanhvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2020/10/25090359/chup-san-pham2.jpg"
                />
              </div>
              <div className={stylefeed['container-item']}>
                <div>
                  <Row className={stylefeed['container-content']}>
                    <Row style={{ display: 'inline-block', width: '70%' }}>
                      <h2 className={stylefeed['name_feed']}>B??? compo s???n ph???m d???u g???i tr??? g??u 15 trong 1, gi??p lo???i s???ch g???u ch??? trong 1 l???n g???i </h2>
                      <h1 style={{fontSize: 24, color: '#1e4db7'}}> 100.000 - 200.000 VND</h1>
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
                        <p style={{fontWeight:'bold', color:'#6c757d'}}>
                          <a style={{color: '#0bb2fc'}}>abc v?? 200 ng?????i kh??c</a> ???? th??ch s???n ph???m n??y
                        </p>
                      </Row>
                      {/* <p><a>abc v?? 200 ng?????i kh??c</a> ???? th??ch s???n ph???m n??y</p> */}
                    </Row>
                    <Col className={stylefeed['container-button-content']}>
                      <Rate disabled defaultValue={4} style={{ fontSize: 18, marginLeft: 63 }} />
                      <div style={{ display: 'flex',   flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <p style={{ marginLeft: 8, color: '#6c757d', fontSize: 21 }}>
                          ???? b??n
                        </p>
                        <p style={{ marginLeft: 5, color: '#6c757d',fontSize: 21  }}>
                          160
                        </p>
                      </div>
                      <div className={stylefeed['container-button-sell']}>
                        <Button className={stylefeed['button-sell']}>Mua ngay</Button>
                      </div>
                      <div className={stylefeed['container-button-sell']}>
                        <Button
                          className={stylefeed['button-add-GH']}
                          icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}
                        >
                          Th??m v??o gi???
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <p>
                      We andour partners use cookies to personalize your experience, to show you ads
                      based on your interests, and for measurement and analytics purposes. By using
                      our website and services, you agree to our use of cookies as described in
                      ourCookie Policy.
                    </p>
                  </Row>
                </div>
                <div className={stylefeed['dashboard_manager_bottom_row_col_parent_top']}></div>
              </div>
            </div>
            <div style={{ width: '100%', background: '#fff', borderRadius: 14 }}>
              <div className={stylefeed['container']}>
                <Row>
                  <Col style={{ width: '70%' }}>
                    <Meta
                      className={stylefeed['content']}
                      avatar={<Avatar size={50} src={business.logo} />}
                      title={<p className={stylefeed['text-name']}>{business.business_name}</p>}
                      title1="kandksja"
                      description="12:00 ng??y 26/4/2022"
                    />
                  </Col>
                  <Col className={stylefeed['button']}>
                    <Button style={{ color: '#1e4db7', fontWeight: 'bold' }}>+ Theo d??i</Button>
                  </Col>
                </Row>
                <img
                  className={stylefeed['image']}
                  alt="example"
                  src="https://top10tphcm.com/wp-content/uploads/2020/06/Shop-quan-ao-nu-quan-4.jpg"
                />
              </div>
              <div className={stylefeed['container-item']}>
                <div>
                  <Row className={stylefeed['container-content']}>
                    <Row style={{ display: 'inline-block', width: '70%' }}>
                      <h2 className={stylefeed['name_feed']}>B??? compo s???n ph???m d???u g???i tr??? g??u 15 trong 1, gi??p lo???i s???ch g???u ch??? trong 1 l???n g???i </h2>
                      <h1 style={{fontSize: 24, color: '#1e4db7'}}> 100.000 - 200.000 VND</h1>
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
                        <p style={{fontWeight:'bold', color:'#6c757d'}}>
                          <a style={{color: '#0bb2fc'}}>abc v?? 200 ng?????i kh??c</a> ???? th??ch s???n ph???m n??y
                        </p>
                      </Row>
                      {/* <p><a>abc v?? 200 ng?????i kh??c</a> ???? th??ch s???n ph???m n??y</p> */}
                    </Row>
                    <Col className={stylefeed['container-button-content']}>
                      <Rate disabled defaultValue={4} style={{ fontSize: 18, marginLeft: 63 }} />
                      <div style={{ display: 'flex',   flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <p style={{ marginLeft: 8, color: '#6c757d', fontSize: 21 }}>
                          ???? b??n
                        </p>
                        <p style={{ marginLeft: 5, color: '#6c757d',fontSize: 21  }}>
                          160
                        </p>
                      </div>
                      <div className={stylefeed['container-button-sell']}>
                        <Button className={stylefeed['button-sell']}>Mua ngay</Button>
                      </div>
                      <div className={stylefeed['container-button-sell']}>
                        <Button
                          className={stylefeed['button-add-GH']}
                          icon={<ShoppingCartOutlined style={{ fontSize: 18 }} />}
                        >
                          Th??m v??o gi???
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <p>
                      We andour partners use cookies to personalize your experience, to show you ads
                      based on your interests, and for measurement and analytics purposes. By using
                      our website and services, you agree to our use of cookies as described in
                      ourCookie Policy.
                    </p>
                  </Row>
                </div>
                <div className={stylefeed['dashboard_manager_bottom_row_col_parent_top']}></div>
              </div>
            </div>  
            </div>
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontSize: 17, marginLeft: 104, marginRight: 155}}>
                <DropboxOutlined tyle={{ fontSize: 17 }} />
                S???n ph???m
              </span>
            }
            key="2"
          >
            <div className={styles['list_product']}>
              {/* map data ra m???i card */}
              {productList.map((item, index) => (
                <Card
                  hoverable
                  className={styles['Card_item']}
                  cover={
                    <img
                      alt="example"
                      src={item.images[0]}
                      style={{
                        width: 210,
                        height: 214,
                        borderTopLeftRadius: 6,
                        borderTopRightRadius: 6,
                      }}
                    />
                  }
                >
                  <div className={styles['name_product']}>{item.name}</div>
                  <div style={{ display: 'flex' }}>
                    <div className={styles['sale']}>Gi???m 30%</div>
                    <div className={styles['deal']}>Mua k??m Deal s???c</div>
                  </div>
                  <div className={styles['price']}>
                    <span
                      style={{
                        fontSize: 18,
                        color: '#1e4db7',
                        fontFamily: ' Helvetica',
                        lineHeight: 1.2,
                      }}
                    >
                      {formatCash(item.price)}
                    </span>
                    <span style={{ color: '#1e4db7' }}>??? </span>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Rate disabled defaultValue={4} style={{ fontSize: 14, marginLeft: '62px!important' }} />
                    <p style={{ marginLeft: 8, color: '#6c757d', fontWeight: 'inherit' }}>???? b??n</p>
                    <p style={{ marginLeft: 5, color: '#6c757d', fontWeight: 'inherit' }}>160</p>
                  </div>
                </Card>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
