import React from 'react'
import  { useState, useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import { PERMISSIONS_ADMIN, ROUTES_USER, ROUTES_ADMIN, ROUTES } from 'consts'

//base layout
import BaseLayout from 'components/LayoutUser'
import BaseLayoutUser from 'components/LayoutUser'
import BaseLayoutAdmin from 'components/LayoutAdmin'
import BaseLayoutBusiness from 'components/Layout'
import Authentication from 'components/authentication'
import AuthenticationAdmin from 'components/authenticationAdmin'
import AuthenticationBusiness from 'components/authenticationBusiness'

import { getMenu } from 'apis/menu-admin'
import { getMenuU } from 'apis/menu-user'


//views
// import Login from './login'
// import Register from './register'
import ProductCheck from './viewsBusiness/product-check'
import OrderList from './viewsBusiness/order-list'
import SalesReport from './viewsBusiness/sales-report'
import ReportInventory from './viewsBusiness/report-inventory'
import ShippingControl from './viewsBusiness/shipping-control'
import ShippingControlForm from './viewsBusiness/shipping-control/shipping-control-form'
import Guarantee from './viewsBusiness/guarantee'
import GuaranteeForm from './viewsBusiness/guarantee/guarantee-form'
import ShippingProduct from './viewsBusiness/shipping-product'
import ClientManagement from './viewsBusiness/client-management'
import Branch from './viewsBusiness/branch'
import Reports from './viewsBusiness/reports'
import ReportVariant from './viewsBusiness/report-variant'
import ReportImportExportInventoryProduct from './viewsBusiness/report-import-export-inventory-product'
import ReportImportExportInventoryVariant from './viewsBusiness/report-import-export-inventory-variant'
import StockAdjustments from './viewsBusiness/stock-adjustments'
import StockAdjustmentsForm from './viewsBusiness/stock-adjustments-form'
import ConfigurationStore from './viewsBusiness/configuration-store'
// import OTP from './otp'
import Setting from './viewsBusiness/setting'
import ReceiptsAndPayment from './viewsBusiness/receipts-and-payment'
// import PasswordNew from './password-new'
// import ForgetPassword from './forget-password'
import Overview from './viewsBusiness/overview'
import Sell from './viewsBusiness/sell'
// import Refund from './viewsBusiness/refund'
import Store from './viewsBusiness/store'
// import VerifyAccount from './verify-account'
import ActivityDiary from './viewsBusiness/activity-diary'

// import NotFound from './not-found/404'

import ShippingProductForm from './viewsBusiness/shipping-product/shipping-product-form'
import OrderCreate from './viewsBusiness/order-create'
import Categories from './viewsBusiness/categories'
import Category from './viewsBusiness/category'

import Inventory from './viewsBusiness/inventory'
import OfferList from './viewsBusiness/offer-list'
import Product from './viewsBusiness/product'
import ProductForm from './viewsBusiness/product/product-form'
import Payment from './viewsBusiness/payment'
import Tax from './viewsBusiness/tax'
import Employee from './viewsBusiness/employee'
import Shipping from './viewsBusiness/shipping'
import Customer from './viewsBusiness/customer'
import Supplier from './viewsBusiness/supplier'
import Promotion from './viewsBusiness/promotion'
import Role from './viewsBusiness/role'
import PriceAdjustments from './viewsBusiness/price-adjustments'
import PriceAdjustmentsForm from './viewsBusiness/price-adjustments/price-adjustments-form'

import Point from './viewsBusiness/point'
import OfferListCreate from './viewsBusiness/offer-list-create'
import Blog from './viewsBusiness/blog'
import BlogCreate from './viewsBusiness/blog-create'
import Brand from './viewsBusiness/brand'
import SettingBill from './viewsBusiness/setting-bill'
import BrandCreate from './viewsBusiness/brand-create'
import Channel from './viewsBusiness/channel'
// import Contact from './contact'
import ImportInventories from './viewsBusiness/import-inventories'
import ImportInventory from './viewsBusiness/import-inventory'
import ImportReportFile from './viewsBusiness/import-report-file'
import DeliveryControl from './viewsBusiness/delivery-control'
import ShippingForm from './viewsBusiness/shipping/shipping-form'

//admin
import LoginAdmin from './admin/login'
import RegisterAdmin from './admin/register'
import OTPAdmin from './admin/otp'
import PasswordNewAdmin from './admin/password-new'
import ForgetPasswordAdmin from './admin/forget-password'
import VerifyAccountAdmin from './admin/verify-account'
import OverviewAdmin from './admin/overviewadmin'
import Business from './admin/business'
import MenuUser from './admin/menuEKT'
import MenuAdmin from './admin/menuAdmin'
import MenuBussiness from './admin/menuBusiness'
import UserEKT from './admin/userEKT'
import UserAdmin from './admin/userAdmin'

//user
import LoginBusiness from './user/login-business'
import LoginUser from './user/login'
import RegisterUser from './user/register'
import OTPUser from './user/otp'
import PasswordNewUser from './user/password-new'
import ForgetPasswordUser from './user/forget-password'
import VerifyAccountUser from './user/verify-account'
import NotFoundUser from './user/not-found/404'
import BusinessUser from './user/business_user'
import OverviewUser from './user/overview'

import NewfeedComponent from './user/newfeed'
import Infor from '../components/LayoutUser/infor'
import SettingInfor from '../components/LayoutUser/setting-infor'

import DetailBusiness from './user/business_user/detail_business'
import Message1 from './user/message1'
import RegisterBusiness from './user/business_user/registerbusiness'


//apis

const DEFINE_ROUTER = [
  {
    path: ROUTES.PRODUCT_CHECK,
    Component: () => <ProductCheck />,
    title: 'Ki???m h??ng cu???i ng??y',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS,
    Component: () => <PriceAdjustments />,
    title: 'Danh s??ch phi???u ??i???u ch???nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS_CREATE,
    Component: () => <PriceAdjustmentsForm />,
    title: 'Th??m m???i phi???u ??i???u ch???nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS_UPDATE,
    Component: () => <PriceAdjustmentsForm />,
    title: 'C???p nh???t phi???u ??i???u ch???nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRODUCT_ADD,
    Component: () => <ProductForm />,
    title: 'Th??m s???n ph???m',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRODUCT_UPDATE,
    Component: () => <ProductForm />,
    title: 'C???p nh???t s???n ph???m',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.ORDER_LIST,
    Component: () => <OrderList />,
    title: 'Danh s??ch ????n h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SALES_REPORT,
    Component: () => <SalesReport />,
    title: 'B??o c??o b??n h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_INVENTORY,
    Component: () => <ReportInventory />,
    title: 'B??o c??o t???n kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORTS,
    Component: () => <Reports />,
    title: 'B??o c??o t???ng h???p',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_VARIANT,
    Component: () => <ReportVariant />,
    title: 'B??o c??o t???n kho theo thu???c t??nh',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.STOCK_ADJUSTMENTS,
    Component: () => <StockAdjustments />,
    title: 'Ki???m h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STOCK_ADJUSTMENTS_CREATE,
    Component: () => <StockAdjustmentsForm />,
    title: 'T???o phi???u ki???m h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STOCK_ADJUSTMENTS_UPDATE,
    Component: () => <StockAdjustmentsForm />,
    title: 'C???p nh???t phi???u ki???m h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_IMPORT_EXPORT_INVENTORY_PRODUCT,
    Component: () => <ReportImportExportInventoryProduct />,
    title: 'B??o c??o xu???t nh???p t???n theo s???n ph???m',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_IMPORT_EXPORT_INVENTORY_VARIANT,
    Component: () => <ReportImportExportInventoryVariant />,
    title: 'B??o c??o xu???t nh???p t???n theo thu???c t??nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CONTROL,
    Component: () => <ShippingControl />,
    title: '?????i so??t v???n chuy???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.DELIVERY_CONTROL,
    Component: () => <DeliveryControl />,
    title: 'Qu???n l?? giao h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CONTROL_ADD,
    Component: () => <ShippingControlForm />,
    title: 'T???o phi???u ?????i so??t v???n chuy???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.GUARANTEE,
    Component: () => <Guarantee />,
    title: 'Qu???n l?? b???o h??nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.GUARANTEE_ADD,
    Component: () => <GuaranteeForm />,
    title: 'Th??m b???o h??nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_PRODUCT,
    Component: () => <ShippingProduct />,
    title: 'Qu???n l?? chuy???n h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CLIENT_MANAGEMENT,
    Component: () => <ClientManagement />,
    title: 'Qu???n l?? client',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BRANCH_MANAGEMENT,
    Component: () => <Branch />,
    title: 'Qu???n l?? kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CONFIGURATION_STORE,
    Component: () => <ConfigurationStore />,
    title: 'C???u h??nh th??ng tin c???a h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OVERVIEW,
    Component: () => <Overview />,
    title: 'T???ng quan',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STORE,
    Component: () => <Store />,
    title: 'Qu???n l?? c???a h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.POINT,
    Component: () => <Point />,
    title: 'T??ch ??i???m',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ACTIVITY_DIARY,
    Component: () => <ActivityDiary />,
    title: 'Nh???t k?? ho???t ?????ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ORDER_CREATE,
    Component: () => <OrderCreate />,
    title: 'T???o ????n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.INVENTORY,
    Component: () => <Inventory />,
    title: 'Qu???n l?? kho',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.PRODUCT,
    Component: () => <Product />,
    title: 'Qu???n l?? s???n ph???m',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PAYMENT,
    Component: () => <Payment />,
    title: 'Qu???n l?? h??nh th???c thanh to??n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.TAX,
    Component: () => <Tax />,
    title: 'Qu???n l?? thu???',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.EMPLOYEE,
    Component: () => <Employee />,
    title: 'Qu???n l?? nh??n vi??n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_REPORT_FILE,
    Component: () => <ImportReportFile />,
    title: 'Nh???p xu???t File',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING,
    Component: () => <Shipping />,
    title: 'Qu???n l?? ?????i t??c v???n chuy???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CREATE,
    Component: () => <ShippingForm />,
    title: 'Th??m ?????i t??c v???n chuy???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CUSTOMER,
    Component: () => <Customer />,
    title: 'Qu???n l?? kh??ch h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SUPPLIER,
    Component: () => <Supplier />,
    title: 'Qu???n l?? nh?? cung c???p',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PROMOTION,
    Component: () => <Promotion />,
    title: 'Khuy???n m??i',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ROLE,
    Component: () => <Role />,
    title: 'Qu???n l?? ph??n quy???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_PRODUCT_ADD,
    Component: () => <ShippingProductForm />,
    title: 'Th??m phi???u chuy???n h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CATEGORIES,
    Component: () => <Categories />,
    title: 'Qu???n l?? danh m???c',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CATEGORY,
    Component: () => <Category />,
    title: 'Danh m???c',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SETTING,
    Component: () => <Setting />,
    title: 'C??i ?????t',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OFFER_LIST,
    Component: () => <OfferList />,
    title: 'Danh s??ch ??u ????i',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OFFER_LIST_CREATE,
    Component: () => <OfferListCreate />,
    title: 'T???o ??u ????i',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BLOG,
    Component: () => <Blog />,
    title: 'Danh s??ch b??i vi???t',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BLOG_CREATE,
    Component: () => <BlogCreate />,
    title: 'T???o b??i vi???t',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BRAND,
    Component: () => <Brand />,
    title: 'Danh s??ch th????ng hi???u',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BRAND_CREATE,
    Component: () => <BrandCreate />,
    title: 'T???o th????ng hi???u',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CHANNEL,
    Component: () => <Channel />,
    title: 'Danh s??ch k??nh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_INVENTORIES,
    Component: () => <ImportInventories />,
    title: 'Nh???p h??ng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_INVENTORY,
    Component: () => <ImportInventory />,
    title: 'Chi ti???t ????n h??ng nh???p kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.RECEIPTS_PAYMENT,
    Component: () => <ReceiptsAndPayment />,
    title: 'B??o c??o thu chi',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SELL,
    Component: () => <Sell />,
    title: 'B??n h??ng',
    permissions: [],
    exact: true,
  },
  // {
  //   path: ROUTES.REFUND,
  //   Component: () => <Refund />,
  //   title: 'Tr??? h??ng',
  //   permissions: [],
  //   exact: true,
  // },
  {
    path: ROUTES.SETTING_BILL,
    Component: () => <SettingBill />,
    title: 'C??i ?????t m??y in bill',
    permissions: [],
    exact: true,
  },
  
  
]
const DEFINE_ROUTER_USER = [
  {
    path: ROUTES_USER.OVERVIEW,
    Component: () => <OverviewUser />,
    title: 'T???ng quan',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.BUSINESS,
    Component: () => <BusinessUser />,
    title: 'Danh s??ch c???a h??ng c???a b???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.INFOR,
    Component: () => <Infor />,
    title: 'Th??ng tin c?? nh??n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.SETTINGINFOR,
    Component: () => <SettingInfor />,
    title: 'Thi???t l???p th??ng tin c?? nh??n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.DETAILBUSINESS,
    Component: () => <DetailBusiness />,
    title: 'Chi ti???t c???a h??ng',
    permissions: [],
    exact: true,
  },
  
  {
    path: ROUTES_USER.REGISTERBUSINESS,
    Component: () => <RegisterBusiness />,
    title: '????ng k?? c???a h??ng ',
    permissions: [],
    exact: true,
  },
  // {
  //   path: ROUTES_USER.NEWFEED,
  //   Component: () => <NewfeedComponent />,
  //   title: 'S???n ph???m hot trong th??ng',
  //   permissions: [],
  //   exact: true,
  // },

]

const DEFINE_ROUTER_ADMIN = [
  {
    path: ROUTES_ADMIN.OVERVIEWADMIN,
    Component: () => <OverviewAdmin />,
    title: 'T???ng quan',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.BUSINESSADMIN,
    Component: () => <Business />,
    title: 'T???ng quan',
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
  {
    path: ROUTES_ADMIN.MENU_ADMIN,
    Component: () => <MenuAdmin />,
    title: 'Menu admin',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.MENU_BUSINESS,
    Component: () => <MenuBussiness />,
    title: 'Menu business',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.USER_ADMIN,
    Component: () => <UserAdmin />,
    title: 'Qu???n l?? user admin',
    permissions: 'admin',
    exact: true,
  },
  {
    path: ROUTES_ADMIN.USER_EKT,
    Component: () => <UserEKT />,
    title: 'Qu???n l?? user ekt',
    permissions: 'admin',
    exact: true,
  },
]

const AUTH_ROUTER = [
  {
    path: ROUTES_USER.CHECK_SUBDOMAIN,
    Component: () => <LoginBusiness />,
    exact: true,
    title: 'Login business',
    permissions: [],
  },
  {
    path: ROUTES_USER.LOGIN,
    Component: () => <LoginUser />,
    exact: true,
    title: 'Login',
    permissions: [],
  },
  {
    path: ROUTES_USER.REGISTER,
    Component: () => <RegisterUser />,
    exact: true,
    title: 'Register',
    permissions: [],
  },
  {
    path: ROUTES_USER.OTP,
    Component: () => <OTPUser />,
    exact: true,
    title: 'OTP',
    permissions: [],
  },
  {
    path: ROUTES_USER.VERIFY_ACCOUNT,
    Component: () => <VerifyAccountUser />,
    title: 'X??c th???c t??i kho???n',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.PASSWORD_NEW,
    Component: () => <PasswordNewUser />,
    exact: true,
    title: 'New password',
    permissions: [],
  },
  {
    path: ROUTES_USER.FORGET_PASSWORD,
    Component: () => <ForgetPasswordUser />,
    exact: true,
    title: 'Forget password',
    permissions: [],
  },
  // {
  //   path: ROUTES_USER.NEWFEED,
  //   Component: () => <NewfeedComponent />,
  //   title: 'S???n ph???m hot trong th??ng',
  //   permissions: [],
  //   exact: true,
  // },
 

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
    title: 'X??c th???c t??i kho???n',
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

        {DEFINE_ROUTER_USER.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <Authentication {...rest}>
              <BaseLayoutUser>
                <Component />
              </BaseLayoutUser>
            </Authentication>
          </Route>
        ))}

        {DEFINE_ROUTER.map(({ Component, ...rest }, index) => (
          <Route {...rest} key={index}>
            <AuthenticationBusiness {...rest}>
              <BaseLayoutBusiness>
                <Component />
              </BaseLayoutBusiness>
            </AuthenticationBusiness>
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

        {/* ??? ????y */}
      </Switch>
    </BrowserRouter>
  )
}