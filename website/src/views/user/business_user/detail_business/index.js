import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './detail_business.module.scss'
import { Card, Avatar, Tabs, List, Modal, Rate } from 'antd'
//ngôi sao

import { SettingOutlined, DropboxOutlined, LayoutOutlined } from '@ant-design/icons'
//api
import { detailBusiness, getProductList } from 'apis/business'
import FormUpdate from '../Update_business' 

export default function Detail_business() {
  const { id } = useParams()
  const { TabPane } = Tabs
  const [business, setBusiness] = useState([])
  const [productList, setProductList] = useState([])
  const [count, setCount] = useState([])

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

  return (
    <div className={styles['body']}>
      <div className={styles['profile']}>
        <div
          className={styles['card']}
          style={{ backgroundImage: `url(${business.business_cover_image})` }}
        >
          <Link to={'/update-business/' + id}>
          
            <div className={styles['setting']}>
              <SettingOutlined style={{ fontSize: 20 }} />
            </div>
          
          </Link>
          <Avatar
            size={119}
            style={{
              position: 'absolute',
              border: '3px solid #0bb2fb',
              marginTop: 149,
              marginLeft: 123,
              background: 'black',
            }}
          />
          <Avatar
            size={107}
            style={{ position: 'relative', marginTop: 155, marginLeft: 129 }}
            src={business.logo}
          />
        </div>
        <h1 style={{ marginTop: 65, marginBottom: 5, fontSize: 26, fontWeight: 'bold' }}>
          {business.business_name}
        </h1>
        <h3 style={{ color: '#6c757d', fontWeight: 'inherit' }}>{business.business_desiption}</h3>
        <div className={styles['follow']}>
          <div style={{ marginRight: 107 }}>
            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: 20 }}>110K</p>
            <p style={{ color: '#6c757d', fontWeight: 'inherit' }}>lượt theo dõi</p>
          </div>
          <div>
            <p style={{ marginBottom: 0, fontWeight: 'bold', fontSize: 20 }}>19</p>
            <p style={{ color: '#6c757d', fontWeight: 'inherit' }}>đang theo dõi</p>
          </div>
        </div>
        <hr style={{ width: '80%', color: '#6c757d' }} />
        <List
          className={styles['list']}
          dataSource={[
            {
              id: 1,
              name: 'Sản phẩm',
              src: 'https://cdn1.vectorstock.com/i/1000x1000/96/40/magic-open-box-line-icon-box-with-stars-vector-24019640.jpg',
              a: '784 >',
            },
            {
              id: 2,
              name: 'Tỉ lệ phản hồi',
              src: 'https://cdn5.vectorstock.com/i/1000x1000/78/34/chat-icon-isolated-on-white-background-from-vector-27697834.jpg',
              a: '97%',
            },
            {
              id: 3,
              name: 'Thời gian phản hồi',
              src: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
              a: 'Vài phút',
            },
            {
              id: 4,
              name: 'Đánh giá Shop',
              src: 'https://cdn3.vectorstock.com/i/1000x1000/09/42/star-icon-vector-22390942.jpg',
              a: '0,0(000)',
            },
            {
              id: 5,
              name: 'Tỉ lệ đơn không thành công',
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
        <Tabs id='tab_detail' defaultActiveKey="1" style={{ alignItems: 'center', padding: 20, width: '100%' }}>
          <TabPane
            tab={
              <span style={{ fontSize: 20, marginLeft: 200, paddingRight: 75   }}>
                <LayoutOutlined style={{ fontSize: 20 }} />
                Feed
              </span>
            }
            key="1"
          >
            Content of Tab Pane 1
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontSize: 20, marginLeft: 165, marginRight: 185 }}>
                <DropboxOutlined tyle={{ fontSize: 20 }} />
                Sản phẩm
              </span>
            }
            key="2"
          >
            <div className={styles['list_product']}>
              {/* map data ra mỗi card */}
              {productList.map((item, index) => (
                <Card
                  hoverable
                  className={styles['Card_item']}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                      style={{
                        width: 207,
                        height: 230,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                    />
                  }
                >
                  <div className={styles['name_product']}>{item.name}</div>
                  <div style={{ display: 'flex' }}>
                    <div className={styles['sale']}>Giảm 30%</div>
                    <div className={styles['deal']}>Mua kèm Deal sốc</div>
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
                      {item.price}
                    </span>
                    <span style={{ color: '#1e4db7' }}>₫ </span>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Rate disabled defaultValue={4} style={{ fontSize: 14 }} />
                    <p style={{ marginLeft: 8, color: '#6c757d', fontWeight: 'inherit' }}>Đã bán</p>
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
