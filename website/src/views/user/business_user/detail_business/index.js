import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './detail_business.module.scss'
import { Card, Avatar, Typography, Button, Table, Row, Col, Menu, Space,Badge } from 'antd'
//ngôi sao
import Rating from './Rating'

import {
  UserOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { Span } from '@sentry/tracing'
//api
import { detailBusiness, getProductList } from 'apis/business'
import { urlEncode } from '@sentry/utils'

const menuList = [
  {
    label: 'Navigation One',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation One',
    icon: <AppstoreOutlined />,
  },
  {
    label: 'Navigation One',
    icon: <AppstoreOutlined />,
  },
]

export default function Detail_business() {
  const { Meta } = Card
  const { Title } = Typography
  const { id } = useParams()

  const onClick = (e) => {
    console.log('click ', e)
  }
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
      console.log(res)
      if (res.status === 200) setProductList(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const  [rate, setrate] = useState(4)
  // set giá trị sao vàng
  // const handleRate=(rate)=>{
  //   setrate(rate)
  // }


  // console.log(business);
  useEffect(() => {
    _getDetailBusinesses(id)
    _getProductList(id)
  }, [])

  return (
    <div>
      <div className={styles['header']}>
        <div className={styles['card']}>
          <div className={styles['card_opacity']}></div>
          <Meta className='meta'
            avatar={
            <Avatar size={90} style={{border:'2px solid white'}} src={business.logo} />
          }
            title={
              <Title level={1} style={{ color: 'white' }}>
                {business.business_name}
              </Title>
            }
            description={
              <Title level={3} style={{ color: '#d1d1e0' }}>
                Online 220 phút trước
              </Title>
            }
            style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}
          />  
          <Button ghost style={{marginTop: 60, width: '98%',height:50 , fontWeight: 'bold', fontSize: 20}}>
            + Theo dõi
          </Button>
          
        </div>

        <Col className={styles['col']}>
          <Row>
            <ShopOutlined className={styles['icon']} />
            <h2>Sản phẩm: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
          </Row>
          <Row className={styles['row']}>
            <UsergroupAddOutlined className={styles['icon']} />
            <h2>Tỷ lệ phản hồi: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
        
          </Row>
          <Row className={styles['row']}>
            <UsergroupAddOutlined className={styles['icon']} />
            <h2>Sản phẩm: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
          </Row>
        </Col>
        <Col className={styles['col']}>
          <Row>
            <UsergroupAddOutlined className={styles['icon']} />
            <h2>Người theo dõi: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
          </Row>
          <Row className={styles['row']}>
            <UsergroupAddOutlined className={styles['icon']} />
            <h2>Sản phẩm: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
          </Row>
          <Row className={styles['row']}>
            <UsergroupAddOutlined className={styles['icon']} />
            <h2>Sản phẩm: </h2>
            <h2 style={{ color: '#ff751a', marginLeft: 5 }}>1000</h2>
          </Row>
        </Col>
      </div>
      <div className={styles['menu']}>
        <Menu onClick={onClick} mode="horizontal" items={menuList} />
      </div>
      <div className={styles['container1']}>
        <Title level={3} style={{ fontWeight: 'bold' }}>
          GỢI Ý CHO BẠN
        </Title>
        <div className={styles['container']}>
          {/* map data ra mỗi card */}
          <Badge.Ribbon text="+ Yêu thích" color="volcano" >
          <Card
            hoverable
            style={{ width: 300, margin: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Title level={4}>Tên sản phẩm</Title>
            <span style={{ color: '#ff6600' , marginLeft: 20}}>₫ </span>
            <span style={{ fontSize: 20, color: '#ff6600', fontFamily: 'revert-layer' }}>
              200.000
            </span>
            <div style={{display: 'flex'}}>
            <Rating  rate={rate} ></Rating>
            <h3 style={{marginLeft: 20}}> Đã bán </h3>
            <h3 style={{marginLeft:5}}>160</h3>
            </div>  
            <Title level={4} style={{ color: '#b3b3cc' }}>
              Đà Nẵng
            </Title>
          </Card>
          </Badge.Ribbon>
        </div>
      </div>
    </div>
  )
}
