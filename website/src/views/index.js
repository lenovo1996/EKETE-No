import React from 'react'
import  { useState, useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PERMISSIONS_ADMIN, ROUTES, ROUTES_ADMIN, ROUTES_USER } from 'consts'

//base layout
import BaseLayout from 'components/Layout'
import BaseLayoutAdmin from 'components/LayoutAdmin'
import BaseLayoutUser from 'components/LayoutUser'
import Authentication from 'components/authentication'
import AuthenticationAdmin from 'components/authenticationAdmin'

import { getMenu } from 'apis/menu-admin'
import { getMenuU } from 'apis/menu-user'

//views

//admin 
// import LoginBusinessAdmin from './admin/'
import LoginAdmin from './admin/login'
import RegisterAdmin from './admin/register'
import OTPAdmin from './admin/otp'
import PasswordNewAdmin from './admin/password-new'
import ForgetPasswordAdmin from './admin/forget-password'
import VerifyAccountAdmin from './admin/verify-account'
import OverviewAdmin from './admin/overviewadmin'
import Business from './admin/business'
import MenuUser from './admin/menuEKT'
import MenuBusiness from './admin/menuBusiness'
import MenuAdmin from './admin/menuAdmin'
import Message from './admin/message'

//user
import LoginBusiness from './user/login-business'
import Login from './user/login'
import Register from './user/register'
import OTP from './user/otp'
import PasswordNew from './user/password-new'
import ForgetPassword from './user/forget-password'
import VerifyAccount from './user/verify-account'
import NotFound from './user/not-found/404'
import BusinessUser from './user/business_user'
import Overview from './user/overview'
import DetailBusiness from './user/business_user/detail_business'
import UpdateBusiness from './user/business_user/Update_business'
import Message1 from './user/message1'
import RegisterBusiness from './user/business_user/registerbusiness'

//apis



const DEFINE_ROUTER = [
  {
    path: ROUTES.OVERVIEW,
    Component: () => <Overview />,
    title: 'Tổng quan',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BUSINESS,
    Component: () => <BusinessUser />,
    title: 'Danh sách thương hiệu',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.DETAIL_BUSINESS,
    Component: () => <DetailBusiness />,
    title: 'Chi tiết cửa hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.UPDATE_BUSINESS,
    Component: () => <UpdateBusiness />,
    title: 'Cập nhật cửa hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.MESSIAGE1,
    Component: () => <Message1 />,
    title: 'thông báo ',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.REGISTERBUSINESS,
    Component: () => <RegisterBusiness />,
    title: 'Đăng ký cửa hàng ',
    permissions: [],
    exact: true,
  },
  
]

const DEFINE_ROUTER_ADMIN = [
  {
    path: ROUTES_ADMIN.OVERVIEWADMIN,
    Component: () => <OverviewAdmin/>,
    title: 'Tổng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.BUSINESSADMIN,
    Component: () => <Business/>,
    title: 'Tổng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MENU_USER,
    Component: () => <MenuUser/>,
    title: 'Menu user',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MENU_BUSINESS,
    Component: () => <MenuBusiness/>,
    title: 'Menu Business',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MENU_ADMIN,
    Component: () => <MenuAdmin/>,
    title: 'Menu Admin',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MESSAGE,
    Component: () => <Message />,
    title: 'Thông báo chức năng chưa hoàn thiện',
    permissions: [],
    exact: true,
  },


]

const AUTH_ROUTER = [
  {
    path: ROUTES.CHECK_SUBDOMAIN,
    Component: () => <LoginBusiness />,
    exact: true,
    title: 'Login business',
    permissions: [],
  },
  {
    path: ROUTES.LOGIN,
    Component: () => <Login />,
    exact: true,
    title: 'Login',
    permissions: [],
  },
  {
    path: ROUTES.REGISTER,
    Component: () => <Register />,
    exact: true,
    title: 'Register',
    permissions: [],
  },
  {
    path: ROUTES.OTP,
    Component: () => <OTP />,
    exact: true,
    title: 'OTP',
    permissions: [],
  },
  {
    path: ROUTES.VERIFY_ACCOUNT,
    Component: () => <VerifyAccount />,
    title: 'Xác thực tài khoản',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PASSWORD_NEW,
    Component: () => <PasswordNew />,
    exact: true,
    title: 'New password',
    permissions: [],
  },
  {
    path: ROUTES.FORGET_PASSWORD,
    Component: () => <ForgetPassword />,
    exact: true,
    title: 'Forget password',
    permissions: [],
  },



  //admin
  {
    path: ROUTES_ADMIN.LOGINADMIN,
    Component: () => <LoginAdmin />,
    exact: true,
    title: 'Login',
    permissions: [],
  },
  {
    path: ROUTES_ADMIN.REGISTERADMIN,
    Component: () => <RegisterAdmin />,
    exact: true,
    title: 'Register',
    permissions: [],
  },
  {
    path: ROUTES_ADMIN.OTPADMIN,
    Component: () => <OTPAdmin />,
    exact: true,
    title: 'OTP',
    permissions: [],
  },
  {
    path: ROUTES_ADMIN.VERIFY_ACCOUNTADMIN,
    Component: () => <VerifyAccountAdmin />,
    title: 'Xác thực tài khoản',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_ADMIN.PASSWORD_NEWADMIN,
    Component: () => <PasswordNewAdmin />,
    exact: true,
    title: 'New password',
    permissions: [],
  },
  {
    path: ROUTES_ADMIN.FORGET_PASSWORDADMIN,
    Component: () => <ForgetPasswordAdmin />,
    exact: true,
    title: 'Forget password',
    permissions: [],
  },

 
]


export default function Views() {
  const dispatch = useDispatch()

  const _getMenuAdmin = async () => {
    try {
      const res = await getMenu()
      if (res.status === 200) {
        dispatch({ type: 'SET_MENU_ADMIN', menu_data: res.data.data })
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    _getMenuAdmin()
  }, [])

  const _getMenuUser = async ()=>{
    try {
      const res = await getMenuU()
      if(res.status === 200){
        dispatch({type:'SET_MENU_USER', menu_data: res.data.data})
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    _getMenuUser()
  }, [])


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Redirect to={ROUTES.OVERVIEW} />
        </Route>

        {DEFINE_ROUTER_ADMIN.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <AuthenticationAdmin {...rest}>
              <BaseLayoutAdmin>
                <Component />
              </BaseLayoutAdmin>
            </AuthenticationAdmin>
          </Route>
        ))}

        {DEFINE_ROUTER.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <Authentication {...rest}>
              <BaseLayoutUser>
                <Component />
              </BaseLayoutUser>
            </Authentication>
          </Route>
        ))}

        {AUTH_ROUTER.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <Component />
          </Route>
        ))}

        <Route path="*">
          <NotFound />
        </Route>
        

        {/* ở đây */}
      </Switch>
    </BrowserRouter>
  )
}

