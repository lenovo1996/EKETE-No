import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './detail_business.module.scss'
import { Card, Avatar, Typography, Button, Table, Row, Col, Menu, Space } from 'antd'

import {
  UserOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { Span } from '@sentry/tracing'
//api
import { detailBusiness, getProductList } from 'apis/business'

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

  console.log(business);
  useEffect(() => {
    _getDetailBusinesses(id)
    _getProductList(id)
  }, [])
  
  return (
    <div>
      <div className={styles['header']}>
        <Card className={styles['Card']}
    
        >
          <Meta
            avatar={<Avatar src={business.logo} />}
            title={
              <Title level={2} style={{ color: 'white' }}>
                {business.business_name}
              </Title>
            }
            description={
              <Title level={3} style={{ color: 'white' }}>
                Online 220 phút trước
              </Title>
            }
            style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}
          />
          <Button ghost style={{ float: 'none' }}>
            + Theo dõi
          </Button>
        </Card>

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
            <span style={{ color: '#ff6600' }}>₫ </span>
            <span style={{ fontSize: 20, color: '#ff6600', fontFamily: 'revert-layer' }}>
              200.000
            </span>
            <div id="rating" style={{ display: 'flex', flexDirection: 'row' }}>
              <input type="radio" id="star5" className={styles['rating']} value="5" />
              <label class="full" for="star5" title="Awesome - 5 stars"></label>

              <input type="radio" id="star4" className="rating" value="4" />
              <label class="full" for="star4" title="Pretty good - 4 stars"></label>

              <input type="radio" id="star3" className="rating" value="3" />
              <label class="full" for="star3" title="Meh - 3 stars"></label>

              <input type="radio" id="star2" className="rating" value="2" />
              <label class="full" for="star2" title="Kinda bad - 2 stars"></label>

              <input type="radio" id="star1" className="rating" value="1" />
              <label class="full" for="star1" title="Sucks big time - 1 star"></label>
              <label> Đã bán </label>
            </div>

            <Title level={4} style={{ color: '#b3b3cc' }}>
              Đà Nẵng
            </Title>
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, marginLeft: 10 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                style={{ width: 300 }}
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </div>
      </div>
    </div>
  )
}
