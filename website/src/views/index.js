import React from 'react'

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PERMISSIONS_ADMIN, ROUTES, ROUTES_ADMIN } from 'consts'

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
import Business from './admin/business'
import MenuUser from './admin/menuEKT'
import MenuBusiness from './admin/menuBusiness'
import MenuAdmin from './admin/menuAdmin'


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
import OverviewUser from './user/overview'
import NewfeedComponent from './user/newfeed'

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
    path: ROUTES.BRAND_CREATE,
    Component: () => <BrandCreate />,
    title: 'Tạo thương hiệu',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CHANNEL,
    Component: () => <Channel />,
    title: 'Danh sách kênh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_INVENTORIES,
    Component: () => <ImportInventories />,
    title: 'Nhập hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_INVENTORY,
    Component: () => <ImportInventory />,
    title: 'Chi tiết đơn hàng nhập kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.RECEIPTS_PAYMENT,
    Component: () => <ReceiptsAndPayment />,
    title: 'Báo cáo thu chi',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SELL,
    Component: () => <Sell />,
    title: 'Bán hàng',
    permissions: [],
    exact: true,
  },
  // {
  //   path: ROUTES.REFUND,
  //   Component: () => <Refund />,
  //   title: 'Trả hàng',
  //   permissions: [],
  //   exact: true,
  // },
  {
    path: ROUTES.SETTING_BILL,
    Component: () => <SettingBill />,
    title: 'Cài đặt máy in bill',
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

