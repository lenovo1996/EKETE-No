import React, {useEffect, useState} from 'react'
import {Avatar, Button, Card, Col, List, Rate, Row} from "antd";
import moment from "moment";
import {formatCash} from "../../../utils";
import {getshopping} from "../../../apis/shopping-dairy";
import styles from "./shopping-history.module.scss";
import AssessOders from './assess'
import Comment from 'components/newfeed/comment'
import avatarRound from 'assets/img/avatar-round.png'

const {Meta} = Card

function ShoppingHistory({userPhone = false}) {

  const _getShoppingDari = async (params) => {
    try {
      const resShoppingDari = await getshopping(params)
      if (resShoppingDari.status === 200) setShoppingHistory(resShoppingDari.data.data)
    } catch (e) {
      console.log(e)
    }
  }
  const [shoppingHistory, setShoppingHistory] = useState(false)

  useEffect(() => {
    let params = {};
    if (userPhone) {
      params = {
        phone: userPhone
      }
    }
    _getShoppingDari(params)
  }, [])

  return (
    <div>
      {shoppingHistory &&
      shoppingHistory.map((Item) => {
        return (
          <div style={{width: '100%'}}>
            <div className={styles['container']}>
              <Row className={styles['header-info']}>
                <Col style={{width: '70%'}}>
                  <Meta
                    className={styles['content']}
                    avatar={
                      <Avatar size={50} src={avatarRound}/>
                    }
                    title={
                      <p className={styles['text-name']}>
                        @{Item.customer_info.slug_name}
                      </p>
                    }
                    description={moment(Item.create_date).format(
                      'DD/MM/YYYY HH:mm'
                    )}
                  />
                </Col>
                <Col className={styles['button']}>
                  <Button className={styles['text-button']}>
                    + Theo dõi
                  </Button>
                </Col>
              </Row>
              <div>
                <div className={styles['display-flex']}>
                  <p className={styles['text']}>Đơn hàng: &nbsp; </p>
                  {<p className={styles['text-blue']}> #{Item.code}</p>}
                </div>
                <div className={styles['display-flex']} style={{justifyContent: 'space-between'}}>
                  <div>
                    <span className={styles['text']}>Mã vận chuyển: &nbsp; </span>
                    <span className={styles['text-blue']}>
                      #
                      {Item.shipping_info.tracking_number ||
                      'Đơn hàng mua trực tiếp'}
                    </span>
                  </div>

                  <p className={styles['status-order']}>
                    Trạng thái đơn hàng
                  </p>
                </div>
              </div>
              <div>
                <List>
                  {Item.order_details.map((Item, index) => {
                    return (
                      <div className={styles['container-product']}>
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
                              <p className={styles['text-sku']}>
                                #{Item.sku}
                              </p>
                            }
                            description={
                              <p className={styles['text-name-product']}>
                                {Item.name}
                              </p>
                            }
                          />
                          <div className={styles['container-center']}>
                            <h3 className={styles['text-blue']}>
                              {' '}
                              {Item.price ? formatCash(+Item.price || 0) : 0}Đ
                            </h3>
                          </div>
                          <Rate
                            className={styles['rate']}
                            allowHalf
                            disabled
                            defaultValue={2.5}
                          />
                          <div className={styles['margin-center']}>
                            <AssessOders key="index">
                              <Button className={styles['button-cta']}>
                                Đánh giá
                              </Button>
                            </AssessOders>
                          </div>
                        </div>
                        <div className={styles['borber-bottom']}></div>
                      </div>
                    )
                  })}
                </List>
                <Comment/>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}


export default ShoppingHistory