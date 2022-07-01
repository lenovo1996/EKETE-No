import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
// style
import styles from './business_user.module.scss'
import { ACTION, ROUTES, ROUTES_USER } from 'consts'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


// antd

import { Card, Avatar,notification } from 'antd'
// api
import { getBusinesses} from 'apis/business'
import { checkBusiness } from 'apis/auth'

// html react parser

export default function Business() {
  const location = useLocation()
  const dispatch = useDispatch()
  const [business, setBusiness] = useState([])
  const { Meta } = Card

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
  
    const intervalPushRouter = setInterval(() => {
      if (localStorage.getItem('accessToken')) window.open(ROUTES.OVERVIEW)
      clearInterval(intervalPushRouter)
      console.log(localStorage.getItem('accessToken'))
    }, 500)
  }
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const token = query.get('token')
    if (token) {
      const tokenParser = JSON.parse(token)
      _loginWithQuery(tokenParser)
    } else return
  }, [])
  useEffect(() => {
    _getBusinesses({ user_phone: dataUser.data.phone })
  }, [dataUser.data.phone])



  return (
    <div className={styles['body_brand']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div>Danh sách cửa hàng của bạn</div>
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
      </div>
    </div>
  )
}
