
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import styles from './login.module.scss'
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { ACTION, ROUTES_ADMIN } from 'consts'
import jwt_decode from 'jwt-decode'

//antd
import { Row, Col, Form, Input, Button, notification, Tabs } from 'antd'

//apis
import { loginAdmin, getOtp } from 'apis/admin'



export default function Login() {
  const dispatch = useDispatch()
  const [formLogin] = Form.useForm()
  let history = useHistory()
  const location = useLocation()
  const [form] = Form.useForm()


  const sendOtp = async () => {
    try {
      await formLogin.validateFields()
      const dataForm = formLogin.getFieldsValue()
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await loginAdmin(dataForm)

      if (res.status === 200) {
        if (res.data.success)
          history.push({
            pathname: ROUTES_ADMIN.OTPADMIN,
            state: { phone: dataForm.phone, action: 'LOGINADMIN' },
          })
        else notification.error({ message: res.data.message || 'Không tìm thấy doanh nghiệp này' })
      } else notification.error({ message: res.data.message || 'Không tìm thấy doanh nghiệp này' })

      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }



  const _login = async (body) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })

      const domain = window.location.href
      let subDomain = domain.split(`.${process.env.REACT_APP_HOST}`)
      subDomain = subDomain[0].split('//')

      // Khi code comment lại, code xong để lại như cũ
      // const res = await login({ ...body, username: body.username }, { shop: 'vanhoang' })
      const res = await getOtp({ ...body, phone: body.phone }, { shop: subDomain[1] })

      dispatch({ type: ACTION.LOADING, data: false })
      console.log(res)

      //check account have verify
      if (res.status === 403) {
        await getOtp(body.phone)
        notification.error({
          message: res.data.message || 'Đăng nhập thất bại, vui lòng thử lại',
        })
        history.push({ pathname: ROUTES_ADMIN.OTP, state: { phone: body.phone } })
        return
      }

      if (res.status === 200) {
        if (res.data.success) {
          dispatch({ type: ACTION.LOGIN, data: res.data.data })

          //luu branch id len redux
          const dataUser = jwt_decode(res.data.data.accessToken)

          dispatch({ type: 'SET_BRANCH_ID', data: dataUser.data.store_id })

          history.push(ROUTES_ADMIN.OTP)
        } else
          notification.error({
            message: res.data.message || 'Đăng nhập thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Đăng nhập thất bại, vui lòng thử lại',
        })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }

  //check url có subdomain hay không
  // const _isHaveSubdomain = () => {
  //   try {
  //     const domain = window.location.href
  //     let subDomain = domain.split(`.${process.env.REACT_APP_HOST}`)
  //     if (subDomain && subDomain.length === 1 && !localStorage.getItem('accessToken'))
  //       window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     _isHaveSubdomain()
  //   }, [1000])
  // })

  useEffect(() => {
    //get username
    const phone = new URLSearchParams(location.search).get('phone')
    if (phone) formLogin.setFieldsValue({ phone: phone })
  }, [])

  return (
    <Row className={styles['login-container']}>
      <Col xs={24} sm={24} md={14} lg={14} xl={10} className={styles['login-content']}>
        <Tabs className="tabs-login" size="large" activeKey="login" centered>
          <Tabs.TabPane
            tab={<div style={{ fontSize: 23, fontWeight: 700, color: 'white' }}>Đăng nhập</div>}
            key="login"
          >
            <Row justify="center" align="middle" style={{ padding: '0px 80px' }}>
              <Form form={formLogin} onFinish={sendOtp} layout="vertical" style={{ width: '100%' }}>
                <Form.Item
                  label={<div style={{ color: 'white' }}>Số điện thoại</div>}
                  name="phone"
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                  <Input size="large" placeholder="Nhập số điện thoại" />
                </Form.Item>
                <Form.Item
                  label={<div style={{ color: 'white' }}>Mật khẩu</div>}
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password size="large" type="password" placeholder="Mật khẩu" />
                </Form.Item>
                <Row justify="space-between">
                  <Link to={ROUTES_ADMIN.FORGET_PASSWORDADMIN} style={{ margin: '20px 0px', color: 'white' }}>
                    Quên mật khẩu?
                  </Link>
                  <a
                    onClick={() =>
                      (window.location.href = `${process.env.SCHEMA}${process.env.REACT_APP_HOST}${ROUTES_ADMIN.REGISTERADMIN}`)
                    }
                    style={{ margin: '20px 0px', color: 'white' }}
                  >
                    Đăng ký tài khoản miễn phí!
                  </a>
                </Row>
                <Row justify="center">
                  <Form.Item style={{ width: '100%' }}>
                    <Button
                      size="large"
                      style={{
                        width: '100%',
                        backgroundColor: 'black',
                        borderColor: 'black',
                        color: 'white',
                      }}
                      htmlType="submit"
                    >
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Row>
              </Form>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}