import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './detail_business.module.scss'
import { Card, Avatar,  Tabs, List, } from 'antd'
//ngôi sao
import Rating from './Rating'

import { SettingOutlined, DropboxOutlined, LayoutOutlined } from '@ant-design/icons'
//api
import { detailBusiness, getProductList } from 'apis/business'

export default function Detail_business() {

  const { id } = useParams()
  const { TabPane } = Tabs
  const [business, setBusiness] = useState([])
  const [productList, setProductList] = useState([])

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
      const res = await getProductList(id)
      if (res.status === 200) setProductList(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  console.log(productList);


  const [rate, setrate] = useState(4)

  useEffect(() => {
    _getDetailBusinesses(id)
    _getProductList(id)
  }, [id])

  const renderProduct = (_product) => {
    <Card
      hoverable
      className={styles['Card_item']}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style={{
            width: 230,
            height: 262,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      }
    >
      <div className={styles['name_product']}></div>
      <div style={{ display: 'flex' }}>
        <div className={styles['sale']}>Giảm 30%</div>
        <div className={styles['deal']}>Mua kèm Deal sốc</div>
      </div>
      <span style={{ color: '#1e4db7', marginLeft: 20 }}>₫ </span>
      <span style={{ fontSize: 20, color: '#1e4db7', fontFamily: 'revert-layer' }}> </span>
      <div style={{ display: 'flex' }}>
        <Rating rate={rate}></Rating>
        <p style={{ marginLeft: 8, color: '#6c757d', fontWeight: 'inherit' }}>Đã bán</p>
        <p style={{ marginLeft: 5, color: '#6c757d', fontWeight: 'inherit' }}>160</p>
      </div>
    </Card>
  }

  return (
    <div className={styles['body']}>
      <div className={styles['profile']}>
        <div className={styles['card']}>
          <div className={styles['setting']}>
            <SettingOutlined style={{ fontSize: 20 }} />
          </div>
          <Avatar
            size={134}
            style={{
              position: 'absolute',
              border: '3px solid #0bb2fb',
              marginTop: 149,
              marginLeft: 115,
              background: 'black',
            }}
          />
          <Avatar
            size={120}
            style={{ position: 'relative', marginTop: 156, marginLeft: 122 }}
            src={business.logo}
          />
        </div>
        <h1 style={{ marginTop: 65, marginBottom: 5, fontSize: 26, fontWeight: 'bold' }}>
          {business.business_name}
        </h1>
        <h3 style={{ color: '#6c757d', fontWeight: 'inherit' }}>{business.business_desiption}</h3>
        <div className={styles['follow']}>
          <div style={{ marginRight: 60 }}>
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
            <List.Item key={item.id} actions={[<a>{item.a}</a>]}>
              <List.Item.Meta avatar={<Avatar src={item.src} />} title={item.name} />
            </List.Item>
          )}
        />
      </div>
      <div className={styles['container']}>
        <Tabs defaultActiveKey="1" style={{ alignItems: 'center', padding: 20, width: '100%' }}>
          <TabPane
            tab={
              <span style={{ fontSize: 20, marginLeft: 200, paddingRight: 261 }}>
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
              <span style={{ fontSize: 20, marginLeft: 183, marginRight: 185 }}>
                <DropboxOutlined tyle={{ fontSize: 20 }} />
                Sản phẩm
              </span>
            }
            key="2"
          >
            <div className={styles['list_product']}>{/* map data ra mỗi card */}</div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}
