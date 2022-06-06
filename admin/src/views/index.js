import React from 'react'

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PERMISSIONS_ADMIN, ROUTES_USER, ROUTES_ADMIN, ROUTES } from 'consts'

//base layout
import BaseLayoutAdmin from 'components/LayoutAdmin'
import AuthenticationAdmin from 'components/authenticationAdmin'

//views

//admin
// import LoginBusinessAdmin from './admin/'
import LoginAdmin from './login'
import RegisterAdmin from './register'
import OTPAdmin from './otp'
import PasswordNewAdmin from './password-new'
import ForgetPasswordAdmin from './forget-password'
import VerifyAccountAdmin from './verify-account'
import OverviewAdmin from './overviewadmin'
import Business from './business'
import MenuUser from './menuEKT'
import NotFoundUser from './not-found/404'

const DEFINE_ROUTER_ADMIN = [
  {
    path: ROUTES_ADMIN.OVERVIEWADMIN,
    Component: () => <OverviewAdmin />,
    title: 'Tổng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.BUSINESSADMIN,
    Component: () => <Business />,
    title: 'Tổng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MENU_USER,
    Component: () => <MenuUser />,
    title: 'Menu user',
    permissions: 'admin',
    exact: true,
  },
]

const AUTH_ROUTER = [
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
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true}>
          <Redirect to={ROUTES_USER.OVERVIEW} />
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

        {AUTH_ROUTER.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <Component />
          </Route>
        ))}

        <Route path="*">
          <NotFoundUser />
        </Route>

        {/* ở đây */}
      </Switch>
    </BrowserRouter>
  )
}
