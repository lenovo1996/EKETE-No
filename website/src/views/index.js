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
import UpdateBusiness from './user/business_user/Update_business'
import Message1 from './user/message1'
import RegisterBusiness from './user/business_user/registerbusiness'


//apis

const DEFINE_ROUTER = [
  {
    path: ROUTES.PRODUCT_CHECK,
    Component: () => <ProductCheck />,
    title: 'Kiểm hàng cuối ngày',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS,
    Component: () => <PriceAdjustments />,
    title: 'Danh sách phiếu điều chỉnh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS_CREATE,
    Component: () => <PriceAdjustmentsForm />,
    title: 'Thêm mới phiếu điều chỉnh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRICE_ADJUSTMENTS_UPDATE,
    Component: () => <PriceAdjustmentsForm />,
    title: 'Cập nhật phiếu điều chỉnh',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRODUCT_ADD,
    Component: () => <ProductForm />,
    title: 'Thêm sản phẩm',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PRODUCT_UPDATE,
    Component: () => <ProductForm />,
    title: 'Cập nhật sản phẩm',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.ORDER_LIST,
    Component: () => <OrderList />,
    title: 'Danh sách đơn hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SALES_REPORT,
    Component: () => <SalesReport />,
    title: 'Báo cáo bán hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_INVENTORY,
    Component: () => <ReportInventory />,
    title: 'Báo cáo tồn kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORTS,
    Component: () => <Reports />,
    title: 'Báo cáo tổng hợp',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_VARIANT,
    Component: () => <ReportVariant />,
    title: 'Báo cáo tồn kho theo thuộc tính',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.STOCK_ADJUSTMENTS,
    Component: () => <StockAdjustments />,
    title: 'Kiểm hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STOCK_ADJUSTMENTS_CREATE,
    Component: () => <StockAdjustmentsForm />,
    title: 'Tạo phiếu kiểm hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STOCK_ADJUSTMENTS_UPDATE,
    Component: () => <StockAdjustmentsForm />,
    title: 'Cập nhật phiếu kiểm hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_IMPORT_EXPORT_INVENTORY_PRODUCT,
    Component: () => <ReportImportExportInventoryProduct />,
    title: 'Báo cáo xuất nhập tồn theo sản phẩm',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.REPORT_IMPORT_EXPORT_INVENTORY_VARIANT,
    Component: () => <ReportImportExportInventoryVariant />,
    title: 'Báo cáo xuất nhập tồn theo thuộc tính',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CONTROL,
    Component: () => <ShippingControl />,
    title: 'Đối soát vận chuyển',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.DELIVERY_CONTROL,
    Component: () => <DeliveryControl />,
    title: 'Quản lý giao hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CONTROL_ADD,
    Component: () => <ShippingControlForm />,
    title: 'Tạo phiếu đối soát vận chuyển',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.GUARANTEE,
    Component: () => <Guarantee />,
    title: 'Quản lý bảo hành',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.GUARANTEE_ADD,
    Component: () => <GuaranteeForm />,
    title: 'Thêm bảo hành',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_PRODUCT,
    Component: () => <ShippingProduct />,
    title: 'Quản lý chuyển hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CLIENT_MANAGEMENT,
    Component: () => <ClientManagement />,
    title: 'Quản lý client',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BRANCH_MANAGEMENT,
    Component: () => <Branch />,
    title: 'Quản lý kho',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CONFIGURATION_STORE,
    Component: () => <ConfigurationStore />,
    title: 'Cấu hình thông tin cửa hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OVERVIEW,
    Component: () => <Overview />,
    title: 'Tổng quan',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.STORE,
    Component: () => <Store />,
    title: 'Quản lý cửa hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.POINT,
    Component: () => <Point />,
    title: 'Tích điểm',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ACTIVITY_DIARY,
    Component: () => <ActivityDiary />,
    title: 'Nhật ký hoạt động',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ORDER_CREATE,
    Component: () => <OrderCreate />,
    title: 'Tạo đơn',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.INVENTORY,
    Component: () => <Inventory />,
    title: 'Quản lý kho',
    permissions: [],
    exact: true,
  },

  {
    path: ROUTES.PRODUCT,
    Component: () => <Product />,
    title: 'Quản lý sản phẩm',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PAYMENT,
    Component: () => <Payment />,
    title: 'Quản lý hình thức thanh toán',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.TAX,
    Component: () => <Tax />,
    title: 'Quản lý thuế',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.EMPLOYEE,
    Component: () => <Employee />,
    title: 'Quản lý nhân viên',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.IMPORT_REPORT_FILE,
    Component: () => <ImportReportFile />,
    title: 'Nhập xuất File',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING,
    Component: () => <Shipping />,
    title: 'Quản lý đối tác vận chuyển',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_CREATE,
    Component: () => <ShippingForm />,
    title: 'Thêm đối tác vận chuyển',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CUSTOMER,
    Component: () => <Customer />,
    title: 'Quản lý khách hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SUPPLIER,
    Component: () => <Supplier />,
    title: 'Quản lý nhà cung cấp',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.PROMOTION,
    Component: () => <Promotion />,
    title: 'Khuyến mãi',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.ROLE,
    Component: () => <Role />,
    title: 'Quản lý phân quyền',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SHIPPING_PRODUCT_ADD,
    Component: () => <ShippingProductForm />,
    title: 'Thêm phiếu chuyển hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CATEGORIES,
    Component: () => <Categories />,
    title: 'Quản lý danh mục',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.CATEGORY,
    Component: () => <Category />,
    title: 'Danh mục',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.SETTING,
    Component: () => <Setting />,
    title: 'Cài đặt',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OFFER_LIST,
    Component: () => <OfferList />,
    title: 'Danh sách ưu đãi',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.OFFER_LIST_CREATE,
    Component: () => <OfferListCreate />,
    title: 'Tạo ưu đãi',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BLOG,
    Component: () => <Blog />,
    title: 'Danh sách bài viết',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES.BLOG_CREATE,
    Component: () => <BlogCreate />,
    title: 'Tạo bài viết',
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
const DEFINE_ROUTER_USER = [
  {
    path: ROUTES_USER.OVERVIEW,
    Component: () => <OverviewUser />,
    title: 'Tổng quan',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.BUSINESS,
    Component: () => <BusinessUser />,
    title: 'Danh sách cửa hàng của bạn',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.INFOR,
    Component: () => <Infor />,
    title: 'Thông tin cá nhân',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.SETTINGINFOR,
    Component: () => <SettingInfor />,
    title: 'Thiết lập thông tin cá nhân',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.DETAILBUSINESS,
    Component: () => <DetailBusiness />,
    title: 'Chi tiết cửa hàng',
    permissions: [],
    exact: true,
  },
  {
    path: ROUTES_USER.UPDATEBUSINESS,
    Component: () => <UpdateBusiness />,
    title: 'Thiết lập thông tin cửa hàng',
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
  // {
  //   path: ROUTES_USER.NEWFEED,
  //   Component: () => <NewfeedComponent />,
  //   title: 'Sản phẩm hot trong tháng',
  //   permissions: [],
  //   exact: true,
  // },

]

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
    title: 'Quản lý user admin',
    permissions: 'admin',
    exact: true,
  },
  // {
  //   path: ROUTES_ADMIN.USER_EKT,
  //   Component: () => <UserEKT />,
  //   title: 'Quản lý user ekt',
  //   permissions: 'admin',
  //   exact: true,
  // },
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
    title: 'Xác thực tài khoản',
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
  //   title: 'Sản phẩm hot trong tháng',
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

        {/* ở đây */}
      </Switch>
    </BrowserRouter>
  )
}