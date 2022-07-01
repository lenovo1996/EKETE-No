import React, {useEffect, useState} from 'react'
import styles from "./styles/historyshopping.module.scss";
import {Avatar, Button, Card, Col, List, Rate, Row} from "antd";
import moment from "moment";
import {formatCash} from "../../../utils";
import AssessOders from "./assess";
import {getshopping} from "../../../apis/shopping-dairy";
const { Meta } = Card

function ShoppingHistory() {

    const [shoppingHistory, setShoppingHistory] = useState(false)

    const _getShoppingDari = async (params) => {
        try {
            const resShoppingDari = await getshopping(params)
            if (resShoppingDari.status === 200) setShoppingHistory(resShoppingDari.data.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        _getShoppingDari()
    }, [])

    return (
        <div>
            {shoppingHistory &&
            shoppingHistory.map((Item, index) => {
                return (
                    <div style={{ width: '100%'}}>
                        <div className={styles['container']}>
                            <Row>
                                <Col style={{ width: '70%' }}>
                                    <Meta
                                        className={styles['content']}
                                        avatar={
                                            <Avatar size={50} src="https://joeschmoe.io/api/v1/random" />
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
                                    <Button>Theo dõi</Button>
                                </Col>
                            </Row>
                            <div>
                                <div className={styles['display-flex']}>
                                    <p className={styles['text']}>Đơn hàng: &nbsp; </p>
                                    {<p className={styles['text-blue']}> #{Item.code}</p>}
                                </div>
                                <div className={styles['display-flex']}>
                                    <p className={styles['text']}>Mã vận chuyển: &nbsp; </p>
                                    {
                                        <p className={styles['text-blue']}>
                                            {' '}
                                            #
                                            {Item.shipping_info.tracking_number ||
                                            'Đơn hàng mua trực tiếp'}
                                        </p>
                                    }
                                </div>
                            </div>
                            <div>
                                <List>
                                    {Item.order_details.map((Item, index) => {
                                        return (
                                            <div>
                                                <div className={styles['container-product']}>
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
                                                <div
                                                    className={
                                                        styles[
                                                            'dashboard_manager_bottom_row_col_parent_top'
                                                            ]
                                                    }
                                                ></div>
                                            </div>
                                        )
                                    })}
                                </List>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default ShoppingHistory