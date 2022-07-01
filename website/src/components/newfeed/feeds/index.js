import React, {} from 'react'
import {Avatar, Button, Card, Col, Rate, Row} from "antd";
import {HeartOutlined, WechatOutlined, ShareAltOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import styles from "./feeds.module.scss";

import Comment from 'components/newfeed/comment';

const {Meta} = Card

function NewFeeds() {

  return (
    <div style={{width: '100%', background: '#fff', borderRadius: 14}}>
      <div className={styles['container']}>
        <Row>
          <Col style={{width: '70%'}}>
            <Meta
              className={styles['content']}
              avatar={<Avatar size={50} src="https://joeschmoe.io/api/v1/random"/>}
              title={<p className={styles['text-name']}>@hadudu</p>}
              title1="kandksja"
              description="12:00 ngày 26/4/2022"
            />
          </Col>
          <Col className={styles['button']}>
            <Button className={styles['text-button']}>+ Theo dõi</Button>
          </Col>
        </Row>
        <img
          className={styles['image']}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      </div>
      <div className={styles['container-item']}>
        <div>
          <div className={styles['display-flex']}>
            <div className={styles['container-name-drep']}>
              <p>
                {' '}
                Sản phẩm ốp điện thoại đẹp sành điệu dành cho những người thích sáng
                tạo và phá cách
              </p>
            </div>
            <div>
              <Rate className={styles['rate']} allowHalf defaultValue={2.5}/>
              <div className={styles['rate']}>
                <p>Đã bán 1234</p>
              </div>
            </div>
          </div>
          <Row className={styles['container-content']}>
            <Row style={{display: 'inline-block', width: '70%'}}>
              <h1 className={styles['text-price']}> 100.000 - 200.000 VND</h1>
              <Row className={styles['container-icon']}>
                <div className={styles['icon']}>
                  <ShareAltOutlined/>
                </div>
                <div className={styles['icon']}>
                  <HeartOutlined/>
                </div>
                <div className={styles['icon']}>
                  <WechatOutlined/>
                </div>
              </Row>
              <Row>
                <p className={styles['text-like']}>
                  <a>abc và 200 người khác</a> đã thích sản phẩm này
                </p>
              </Row>
              {/* <p><a>abc và 200 người khác</a> đã thích sản phẩm này</p> */}
            </Row>
            <Col className={styles['container-button-content']}>
              <div className={styles['container-button-sell']}>
                <Button className={styles['button-sell']}>Mua ngay</Button>
              </div>
              <div className={styles['container-button-add']}>
                <Button
                  className={styles['button-add']}
                  icon={<ShoppingCartOutlined className={styles['icon-btn']}/>}
                >
                  Thêm vào giỏ
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <p className={styles['text-drep']}>
              We andour partners use cookies to personalize your experience, to show
              you ads based on your interests, and for measurement and analytics
              purposes. By using our website and services, you agree to our use of
              cookies as described in ourCookie Policy.
            </p>
          </Row>
        </div>

        <Comment/>
      </div>
    </div>
  )
}


export default NewFeeds