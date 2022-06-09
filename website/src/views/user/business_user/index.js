import React, { useEffect, useRef, useState } from 'react'

// style
import styles from './business_user.module.scss'
import FormBusiness from './registerbusiness'
// moment
// import { uploadFile } from 'apis/upload'
import { ACTION, ROUTES, ROUTES_USER } from 'consts'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

// antd

import { Button, Modal, Card, Avatar } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
// api
import { getBusinesses } from 'apis/business'
import { getuserEKT } from 'apis/user-ekt'

// html react parser

export default function Business() {
  const [business, setBusiness] = useState([])
  const { Meta } = Card
  // const [user, setUser] = useState([])

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}

  const _getBusinesses = async (params) => {
    try {
      const res = await getBusinesses(params)
      console.log('resShop', res)
      if (res.status === 200) setBusiness(res.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  const _loginWithQuery = async (token) => {
    // dispatch({ type: ACTION.LOGIN, data: token })

    //luu branch id len redux
    // const dataUser = jwt_decode(token.accessToken)

    // dispatch({ type: 'SET_BRANCH_ID', data: dataUser.data.store_id })

    const intervalPushRouter = setInterval(() => {
      if (localStorage.getItem('accessToken')) window.open(ROUTES.OVERVIEW)
      clearInterval(intervalPushRouter)
      console.log(localStorage.getItem('accessToken'))
    }, 500)
  }
  useEffect(() => {
    _getBusinesses({ user_phone: dataUser.data.phone })
  }, [dataUser.data.phone])

  const ModalCustomer = ({ children, record }) => {
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)

    return (
      <>
        <div onClick={toggle}>{children}</div>
        <Modal
          width="75%"
          style={{ top: 20 }}
          onCancel={toggle}
          // width={800}
          footer={null}
          title={`Tạo cửa hàng`}
          visible={visible}
        >
          <FormBusiness
            record={record}
            close={toggle}
            text={record ? 'Lưu' : 'Tạo'}
            reload={_getBusinesses}
          />
        </Modal>
      </>
    )
  }

  return (
    <div className={styles['body_brand']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div>Danh sách cửa hàng của bạn</div>
        <ModalCustomer
        // width="100px"
        >
          <Button type="primary">Đăng ký cửa hàng</Button>
        </ModalCustomer>
      </div>

      <div className={styles['containerItem']}>
        {business &&
          business.map((Item, index) => {
            return (
              <a
                onClick={_loginWithQuery}
                // href={`https://${Item.prefix}.${process.env.REACT_APP_HOST}${ROUTES_USER.OVERVIEW}`}
              >
                <Card
                  className={styles['iTem']}
                  style={{ width: 300 }}
                  cover={
                    <img
                      style={{ width: 300, height: 180, objectFit: 'cover' }}
                      // style={{'height': '70%'}}
                      alt="example"
                      src={Item.logo}
                    />
                  }
                >
                  <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={Item.business_name}
                    description="This is the description"
                  />
                </Card>
              </a>
            )
          })}
        {/* <Card className={styles['iTem']}
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="Card title"
      description="This is the description"
    />
  </Card> */}
      </div>
    </div>
  )
}
