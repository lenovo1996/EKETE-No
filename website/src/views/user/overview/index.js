/* eslint-disable jsx-a11y/anchor-is-valid */

// import { PAGE_SIZE } from 'consts'
import React, { useState, useEffect } from 'react'
import styles from './overview.module.scss'
import { Avatar, Button, Table, Tabs, List } from 'antd'
import { Row, Col, Timeline, Modal, Card } from 'antd'
import jwt_decode from 'jwt-decode'
import ModalShopping from './modal-shopping'
<<<<<<< HEAD
import AssessOders from './assess'
=======
>>>>>>> admin-user-ngoc-ha
import { useHistory, useLocation } from 'react-router-dom'
import { compare, formatCash, compareCustom } from 'utils'
import moment from 'moment'

<<<<<<< HEAD
import Newfeed from '../newfeed'
import { HeartOutlined, WechatOutlined, ShareAltOutlined } from '@ant-design/icons'
=======

import Newfeed from '../newfeed'
>>>>>>> admin-user-ngoc-ha

// import ModalUpdateUser from './modal-user'
import { getuserEKT } from 'apis/user-ekt'
import { getshopping, getshoppingone } from 'apis/shopping-dairy'
import { ROUTES_USER } from 'consts'
<<<<<<< HEAD
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1'
import { forEach } from 'lodash'
=======
>>>>>>> admin-user-ngoc-ha
// import data from 'views/import-report-file/datatest'
const { Meta } = Card

function App() {
    let history = useHistory()

    const [user, setUser] = useState([])
    const [orderekt, setorderEKT] = useState('')
<<<<<<< HEAD
    const [detailshopping, setDetaishopping] = useState('')
=======
    const [detailshopping, setDetaishopping] = useState([])
>>>>>>> admin-user-ngoc-ha

    const dataUser = localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) : {}

    const getInfoUser = async (params) => {
        try {
            const res = await getuserEKT(params)
            if (res.status === 200) {
                if (res.data.data.length) setUser({ ...res.data.data[0] })
                // console.log("user", user.data.fullname);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const _getShoppingDari = async (params) => {
        try {
            const resShoppingDari = await getshopping(params)
<<<<<<< HEAD

            if (resShoppingDari.status === 200) setorderEKT(resShoppingDari.data.data)
            //    console.log("danh sách", resShoppingDari.data.data);

            // console.log("danh sach", orderekt);
=======

            if (resShoppingDari.status === 200) setorderEKT(resShoppingDari.data.data)
            console.log("list",resShoppingDari );
>>>>>>> admin-user-ngoc-ha
        } catch (e) {
            console.log(e)
        }
    }
<<<<<<< HEAD
    // console.log("danh sach", orderekt);

    const getone = async (business_prefix, orderId) => {
        try {
            // console.log(detailshopping);
            const res = await getshoppingone(business_prefix, orderId)

            if (res.status === 200) {
                setDetaishopping(res.data.data)
=======

    useEffect(() => {
        _getShoppingDari({ phone: dataUser.data.phone })
    }, [dataUser.data.phone])

    const getone = async (business_prefix, orderId) => {
        try {
            const res = await getshoppingone(business_prefix, orderId)
            console.log(res)
            if (res.status === 200) {
                setDetaishopping(res.data.data)
                // window.open(res.status, res.data.data)
                // history.push(ROUTES_USER.NEWFEED)
>>>>>>> admin-user-ngoc-ha
            }
        } catch (error) {
            console.log(error)
        }
    }
<<<<<<< HEAD

    useEffect(() => {
        _getShoppingDari({ phone: dataUser.data.phone })
        // getone()
    }, [dataUser.data.phone])

=======
>>>>>>> admin-user-ngoc-ha
    useEffect(() => {
        getInfoUser({ user_id: dataUser.data.user_id })
    }, [dataUser.data.user_id])

<<<<<<< HEAD
=======
    // useEffect(() => {
    //   _getShoppingDari()
    // }, [])

>>>>>>> admin-user-ngoc-ha
    return (
        <div className={styles['container-layout']}>
            <div className={styles['container-content']}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <div
<<<<<<< HEAD
                            style={{
                                marginLeft: 0,
                                marginTop: 0,
                                width: 750,
=======
                            style={{ marginRight: 20, marginTop: 0, height: '100%', marginBottom: 15 }}
                            className={styles['card-overview']}
                        >
                            <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
                                <div>Lịch sử mua hàng của bạn</div>
                                {/* <Button type="primary" onClick={checkUser} orderekt={orderekt}>
                  Làm mới
                </Button> */}
                            </div>
                            <div style={{ width: '100%', overflowY: 'scroll', paddingTop: 10 }}>
                                <Timeline
                                    // mode="alternate"
                                    style={{
                                        marginLeft: 80,
                                        marginTop: 20,
                                    }}
                                >
                                    {orderekt &&
                                        orderekt.map((Item, index) => {
                                            return (
                                                <Timeline.Item color="green">
                                                    <p>Ngày mua: {moment(Item.create_date).format('DD/MM/YYYY HH:mm')}</p>
                                                    <p>Cửa hàng: {Item.business_id || 'chưa có thông tin'}</p>
                                                    <p>Giá trị đơn hàng: {Item.final_cost
                                                                    ? formatCash(+Item.final_cost || 0)
                                                                    : 0 || 'chưa có thông tin'}vnđ</p>

                                                    <ModalShopping detailshopping={detailshopping} key='index'>
                                                        {/* <Newfeed detailshopping={detailshopping}> */}
                                                        <Button
                                                            onClick={() => getone(Item.business_prefix, Item.orderId)}
                                                        >
                                                            Xem chi tiết
                                                        </Button>
                                                    </ModalShopping>
                                                    {/* </Newfeed> */}
                                                </Timeline.Item>
                                            )
                                        })}
                                </Timeline>
                            </div>
                        </div>
                    </Col>
                    {/* <ModalShopping detailshopping={detailshopping}/> */}

                    <Col xs={24} sm={24} md={24} lg={10} xl={10} style={{ marginBottom: 15 }}>
                        <div
                            style={{
                                marginLeft: 7,
                                marginTop: 0,
>>>>>>> admin-user-ngoc-ha
                                height: '100%',
                                marginBottom: 15,
                            }}
                            className={styles['card-overview']}
                        >
<<<<<<< HEAD
                            <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                                <Tabs>
                                    <Tabs.TabPane tab="Feed" key="1">
                                        <div style={{ width: '100%', overflowY: 'scroll' }}>
                                            <div className={styles['container']}>
                                                <Row>
                                                    <Col>
                                                        <Meta
                                                            className={styles['content']}
                                                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                                                            title="@hadudu"
                                                            title1="kandksja"
                                                            description="12:00 ngày 26/4/2022"
                                                        />
                                                    </Col>
                                                    <Col className={styles['button']}>
                                                        <Button>Theo dõi</Button>
                                                    </Col>
                                                </Row>
                                                <div className={styles['container-item']}>
                                                    <Row>
                                                        <img
                                                            className={styles['image']}
                                                            alt="example"
                                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                                        />
                                                    </Row>
                                                    <div className={styles['container-content']}>
                                                        <Row style={{ display: 'inline-block', width: '70%' }}>
                                                            <h1> 100.000 - 200.000 VND</h1>
                                                            <Row className={styles['container-icon']}>
                                                                <div className={styles['icon']}>
                                                                    <ShareAltOutlined />
                                                                </div>
                                                                <div className={styles['icon']}>
                                                                    <HeartOutlined />
                                                                </div>
                                                                <div className={styles['icon']}>
                                                                    <WechatOutlined />
                                                                </div>
                                                            </Row>
                                                            <Row>
                                                                <p>
                                                                    <a>abc và 200 người khác</a> đã thích sản phẩm này
                                                                </p>
                                                            </Row>
                                                            {/* <p><a>abc và 200 người khác</a> đã thích sản phẩm này</p> */}
                                                        </Row>
                                                        <Col className={styles['container-button-content']}>
                                                            <div className={styles['container-button-sell']}>
                                                                <Button className={styles['button-sell']}>
                                                                    Mua ngay
                                                                </Button>
                                                            </div>
                                                            <div className={styles['container-button-sell']}>
                                                                <Button className={styles['button-sell']}>
                                                                    Thêm vào giỏ
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                    <Row>
                                                        <p>
                                                            We andour partners use cookies to personalize your
                                                            experience, to show you ads based on your interests, and for
                                                            measurement and analytics purposes. By using our website and
                                                            services, you agree to our use of cookies as described in
                                                            ourCookie Policy.
                                                        </p>
                                                    </Row>
                                                </div>
                                                <div
                                                    className={styles['dashboard_manager_bottom_row_col_parent_top']}
                                                ></div>
                                            </div>
                                        </div>
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab="Shopping history" key="2">
                                        <div style={{ width: '100%', overflowY: 'scroll', paddingTop: 10 }}>
                                            <div className={styles['container']}>
                                                <Row>
                                                    <Col>
                                                        <Meta
                                                            className={styles['content']}
                                                            avatar={
                                                                <Avatar
                                                                    size={60}
                                                                    src="https://joeschmoe.io/api/v1/random"
                                                                />
                                                            }
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
                                                            <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
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
                                                            <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
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
                                                            <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
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
                                                            <div className={styles['button']}>
                                                                <AssessOders key="index">
                                                                    <Button>Đánh giá</Button>
                                                                </AssessOders>
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

                                {orderekt &&
                                    orderekt.map((Item, index) => {
                                        console.log(Item.orderId);
                                    //  getone(Item.business_prefix, Item.orderId)
                                     console.log("chi tiet", detailshopping);
                                    // console.log(getshoppingone(Item.business_prefix, Item.orderId));
                                        // if(res.status === 200) setDetaishopping(res.data.data)
                                        {
                                            detailshopping &&
                                                detailshopping.map((Item, index) => {
                                                    return <p>aaa{Item.bill_status}</p>
                                                })
                                        }
                                        //    }
                                        // console.log(Item.orderId);
                                        // getone(Item.business_prefix, Item.orderId)
                                        // console.log("chitiet", detailshopping);
                                    })}
                            </div>
                        </div>
                    </Col>
                    {/* <div
                        style={{
                            // marginLeft: 80,
                            top: 80,
                            right: 0,
                            marginTop: 0,
                            width: 400,
                            // height: 500,
                            marginBottom: 15,
                            position: 'fixed',
                        }}
                        className={styles['card-overview']}
                    >
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
                    </div> */}
=======
                            <div style={{ width: '100%', overflowY: 'scroll' }}>
                                <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
                                    <div>Thông tin cá nhân</div>
                                    {/* <ModalUpdateUser user={user} reload={getInfoUser}>
                    <Button type="primary" onClick={getInfoUser} orderekt={orderekt}>
                      Chỉnh sửa
                    </Button>
                  </ModalUpdateUser> */}
                                </div>
                                {/* <ModalUpdateUser reload={getInfoUser} user={user}> */}
                                <div className={styles['container-account']}>
                                    <div className={styles['top-left-info']}>
                                        <p style={{ fontWeight: 'bold' }}>- {user && (user.fullname || '...')}</p>
                                        <p>- {user && (user.job || '...')}</p>
                                        <p style={{ color: 'blue' }}>- {user && (user.email || '...')}</p>
                                        <p style={{ color: 'blue' }}>- {user && (user.address || '...')}</p>
                                        <p style={{ color: 'blue' }}>+ {user && (user.phone || '...')}</p>
                                    </div>
                                    <div className={styles['top-right-avt']}>
                                        <Avatar
                                            src={user.avatar}
                                            style={{ color: '#FFF', backgroundColor: '#FDAA3E', width: 80, height: 80 }}
                                        />
                                    </div>
                                </div>
                                {/* </ModalUpdateUser> */}
                                <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
                                    <div style={{ marginLeft: '20px' }}>Status</div>
                                </div>
                                <div className={styles['container-dh']}>
                                    <div className={styles['center']}>
                                        <h1 style={{ fontWeight: 'bold' }}>180</h1>
                                        <p>đơn hàng</p>
                                    </div>
                                    <div className={styles['center']}>
                                        <h1 style={{ fontWeight: 'bold' }}>10</h1>
                                        <p>cửa hàng thành viên</p>
                                    </div>
                                    <div className={styles['center']}>
                                        <h1 style={{ fontWeight: 'bold' }}>6</h1>
                                        <p>VIP</p>
                                    </div>
                                </div>
                                <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
                                    <div style={{ marginLeft: '20px' }}>About me</div>
                                </div>
                                <div style={{ marginLeft: '20px', textAlign: 'justify' }}>
                                    Create React App doesn’t handle backend logic or databases; it just creates a
                                    frontend build pipeline, so you can use it with any backend you want. Under the
                                    hood, it uses Babel and webpack, but you don’t need to know anything about them.
                                    When you’re ready to deploy to production, running npm run build will create an
                                    optimized build of your app in the build folder. You can learn more about Create
                                    React App from its README and the User Guide.
                                </div>
                            </div>
                        </div>
                    </Col>
>>>>>>> admin-user-ngoc-ha
                </Row>
            </div>
        </div>
    )
<<<<<<< HEAD

    
=======
>>>>>>> admin-user-ngoc-ha
}

export default App
