import React from 'react'

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PERMISSIONS_ADMIN, ROUTES } from 'consts'

//base layout
import BaseLayout from 'components/Layout'
import BaseLayoutAdmin from 'components/LayoutAdmin'
import Authentication from 'components/authentication'
import AuthenticationAdmin from 'components/authenticationAdmin'

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
import EmployeeAdmin from './admin/employee'


//user
import LoginBusiness from './login-business'
import Login from './login'
import Register from './register'
import OTP from './otp'
import PasswordNew from './password-new'
import ForgetPassword from './forget-password'
import VerifyAccount from './verify-account'
import NotFound from './not-found/404'
import Brand from './brand'
import Overview from './overview'

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
    path: ROUTES.BRAND,
    Component: () => <Brand />,
    title: 'Danh sách thương hiệu',
    permissions: [],
    exact: true,
  },
  //admin
  // {
  //   path: ROUTES.OVERVIEWADMIN,
  //   Component: () => <OverviewAdmin />,
  //   title: 'Tổng quan',
  //   permissions: [],
  //   exact: true,
  // },
  // {
  //   path: ROUTES.EMPLOYEEADMIN,
  //   Component: () => <EmployeeAdmin />,
  //   title: 'Quản lý nhân viên',
  //   permissions: [],
  //   exact: true,
  // },
]

const DEFINE_ROUTER_ADMIN = [
  {
    path: ROUTES.OVERVIEWADMIN,
    Component: () => <OverviewAdmin/>,
    title: 'Tổng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES.EMPLOYEEADMIN,
    Component: () => <EmployeeAdmin/>,
    title: 'Tổng quan',
    permissions: 'admin',
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

  // {
  //   path: ROUTES.CHECK_SUBDOMAINADMIN,
  //   Component: () => <LoginBusinessAdmin />,
  //   exact: true,
  //   title: 'Login business',
  //   permissions: [],
  // },
  {
    path: ROUTES.LOGINADMIN,
    Component: () => <LoginAdmin />,
    exact: true,
    title: 'Login',
    permissions: [],
  },
  {
    path: ROUTES.REGISTERADMIN,
    Component: () => <RegisterAdmin />,
    exact: true,
    title: 'Register',
    permissions: [],
  },
  {
    path: ROUTES.OTPADMIN,
    Component: () => <OTPAdmin />,
    exact: true,
    title: 'OTP',
    permissions: [],
  },
  {
    path: ROUTES.VERIFY_ACCOUNTADMIN,
    Component: () => <VerifyAccountAdmin />,
    title: 'Xác thực tài khoản',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PASSWORD_NEWADMIN,
    Component: () => <PasswordNewAdmin />,
    exact: true,
    title: 'New password',
    permissions: [],
  },
  {
    path: ROUTES.FORGET_PASSWORDADMIN,
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
              <BaseLayout>
                <Component />
              </BaseLayout>
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

