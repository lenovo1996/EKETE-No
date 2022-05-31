/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES, PERMISSIONS,ROUTES_ADMIN, LOGO_DEFAULT, PERMISSIONS_ADMIN } from 'consts'
import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import { Bell, Plus } from 'utils/icon'
import jwt_decode from 'jwt-decode'

import {
  Layout,
  Menu,
  Select,
  Button,
  Dropdown,
  BackTop,
  Affix,
  Avatar,
  Badge,
  Empty,
  Row,
  Popover,
  Col,
  Input,
  Space

} from 'antd'

import {
  MenuOutlined,
  GoldOutlined,
  DashboardOutlined,
  LogoutOutlined,

  UserOutlined,
  ExportOutlined,

  ShoppingCartOutlined,

} from '@ant-design/icons'

//components
import Permission from 'components/permission'
import ModalUpdateUser from './modal-user'
import DropdownLanguage from 'components/dropdown-language'

//apis
import { getuserAdmin } from 'apis/admin'
import { getMenu, deleteMenu } from 'apis/menu-user'
import Item from 'antd/lib/list/Item'

const { Search } = Input;
const { Sider } = Layout
const BaseLayout = (props) => {
  const history = useHistory()
  const location = useLocation()
  const routeMatch = useRouteMatch()
  const dispatch = useDispatch()
  const WIDTH_MENU_OPEN = 230
  const WIDTH_MENU_CLOSE = 60


  const [branches, setBranches] = useState([])
  const [user, setUser] = useState({})
  const [menu, setMenu] = useState([])

  const login = useSelector((state) => state.login)
  const branchIdApp = useSelector((state) => state.branch.branchId)
  const triggerReloadBranch = useSelector((state) => state.branch.trigger)
  const setting = useSelector((state) => state.setting)

  // const dataUser = localStorage.getItem('accessToken')
  //   ? jwt_decode(localStorage.getItem('accessToken'))
  //   : {}
  const [loading, setLoading] = useState(false)
  const isCollapsed = localStorage.getItem('collapsed')
    ? JSON.parse(localStorage.getItem('collapsed'))
    : false
  const [collapsed, setCollapsed] = useState(isCollapsed)
  const [isMobile, setIsMobile] = useState(false)

  const [openKeys, setOpenKeys] = useState([])
  const rootSubmenuKeys = [
    'store',
    'warehouse',
    'offer',
    'report',
    'transport',
    'commerce',
    ROUTES.PRODUCT,
  ]
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      localStorage.setItem('openKey', latestOpenKey)
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }
  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
    const _getMenu = async () => {
      try {
        setLoading(true)
        const res = await getMenu()
        console.log(res)
        if (res.status === 200) {
          setMenu(res.data.data)
          console.log('meunu', res.data.data)
        }
        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.log(e)
      }
    }
 

    const _getInfoUser = async (params) => {
      try {
        const res = await getuserAdmin(params)
        if (res.status === 200) {
          if (res.data.data.length) setUser({ ...res.data.data[0] })
          console.log('infoAdmin',res.data.data);
        }
      } catch (error) {
        console.log(error)
      }
    }

  var toggle = () => {
    localStorage.setItem('collapsed', JSON.stringify(!collapsed))
    setCollapsed(!collapsed)
  }



    // const renderMenuItem = (_menu) => (
    //   <Permission permissions={_menu.permissions} key={_menu.path}>
    //     {_menu.menuItems ? (
    //       <Menu.SubMenu
    //         // className={`${styles['edit-submenu-arrow']} edit-submenu-arrow`}
    //         style={{
    //           // height: 40,
    //           backgroundColor:
    //             (location.pathname === _menu.path || _menu.pathsChild.includes(location.pathname)) &&
    //             '#e7e9fb',
    //           width: '100%',
    //           // height: collapsed ? 40 : '',
    //           display: 'block',
    //         }}
    //         key={_menu.path}
    //         // onTitleClick={() => history.push(_menu.path)}
    //         onClick={_menu.path === ROUTES.OVERVIEW && toggle}
    //         title={
    //           <Link
    //             style={{
    //               fontSize: '0.8rem',

    //               color:
    //                 location.pathname === _menu.path || _menu.pathsChild.includes(location.pathname)
    //                   ? '#5F73E2'
    //                   : 'rgba(0, 0, 0, 0.85)',
    //             }}
    //             to={_menu.path}
    //           >
    //             {_menu.title}
    //           </Link>
    //         }
    //         icon={
    //           <Link
    //             style={{
    //               fontSize: '0.8rem',
    //               color:
    //                 location.pathname === _menu.path || _menu.pathsChild.includes(location.pathname)
    //                   ? '#5F73E2'
    //                   : 'rgba(0, 0, 0, 0.85)',
    //             }}
    //             to={_menu.path}
    //           >
    //             {_menu.icon}
    //           </Link>
    //         }
    //       >
    //         {_menu.menuItems.map((e) => (
    //           <Permission permissions={e.permissions}>
    //             <Menu.Item
    //               key={e.path}
    //               style={{
    //                 fontSize: '0.8rem',
    //                 backgroundColor:
    //                   (location.pathname === e.path || e.pathsChild.includes(location.pathname)) &&
    //                   '#e7e9fb',
    //               }}
    //             >
    //               <Link to={e.path}>{e.title}</Link>
    //             </Menu.Item>
    //           </Permission>
    //         ))}
    //       </Menu.SubMenu>
    //     ) : (
    //       <Menu.Item
    //         key={_menu.path}
    //         style={{
    //           fontSize: '0.8rem',
    //           backgroundColor:
    //             (location.pathname === _menu.path || _menu.pathsChild.includes(location.pathname)) &&
    //             '#e7e9fb',
    //         }}
    //         icon={_menu.icon}
    //         onClick={_menu.path === ROUTES.SELL && toggle}
    //       >
    //         <Link to={_menu.path}>{_menu.title}</Link>
    //       </Menu.Item>
    //     )}
    //   </Permission>
    // )

  const onSearch = (value) => console.log(value)

  const onSignOut = () => {
    dispatch({ type: ACTION.LOGOUT })
    dispatch({ type: 'UPDATE_INVOICE', data: [] })
    // window.location.href = `https://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`
    history.push(ROUTES_ADMIN.LOGIN)
  }

  useEffect(() => {
    if (localStorage.getItem('openKey')) setOpenKeys([localStorage.getItem('openKey')])
  }, [])


  const content = (
    <div className={styles['user_information']}>
      <ModalUpdateUser user={user} 
      reload={getuserAdmin}
      >
        <div>
          <div
            style={{ color: '#565656', paddingLeft: 10 }}
            onClick={getuserAdmin}
          >
            <UserOutlined style={{ fontSize: '1rem', marginRight: 10, color: ' #565656' }} />
            Tài khoản của tôi
          </div> 
        </div> 
      </ModalUpdateUser>

      <div>
        <a onClick={onSignOut} style={{ color: '#565656', paddingLeft: 10 }}>
          <div>
            <ExportOutlined style={{ fontSize: '1rem', marginRight: 10, color: '#565656' }} />
            Đăng xuất
          </div>
        </a>
      </div>
    </div>
  )
  const NotifyContent = () => (
    <div className={styles['notificationBox']}>
      <div className={styles['title']}>Thông báo</div>
      {/* <div className={styles['content']}>
        <Empty />
      </div> */}
    </div>
  )




  useEffect(() => {
    _getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])

  //get width device
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
      setCollapsed(true)
    } else setIsMobile(false)
  }, [])
  useEffect(() => {
    _getMenu()
  }, [])

  return (
    
    <Layout style={{ backgroundColor: 'white', height: '100%' }}>
       {/* <Permission permissions={['PERMISSIONS_ADMIN.tong_quan_admin']}> */}
      <BackTop style={{ right: 10, bottom: 15 }} />

      <Sider
        trigger={null}
        collapsible
        width={isMobile ? '100%' : WIDTH_MENU_OPEN}
        collapsedWidth={isMobile ? 0 : WIDTH_MENU_CLOSE}
        style={{
          backgroundColor: 'white',
          zIndex: isMobile && 6000,
          height: '100vh',
          position: 'fixed',
        }}
        collapsed={collapsed}
      >
        <Row
          justify="center"
          style={{
            display: collapsed ? 'none' : 'flex',
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          <Avatar
            src={user && (user.avatar || '')}
            style={{ color: '#FFF', backgroundColor: '#FDAA3E', width: 80, height: 80 }}
          />
        </Row>
        <Menu
          style={{
            height: `calc(100vh - ${collapsed ? 4 : 96}px)`,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
          theme="light"
          onClick={(e) => {
            if (e.keyPath && e.keyPath.length === 1) localStorage.removeItem('openKey')
          }}
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={routeMatch.path}
          mode="inline"
        >

          <Menu.Item
            key={ROUTES_ADMIN.OVERVIEWADMIN}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.OVERVIEWADMIN}>Tổng quan Admin</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES_ADMIN.BUSINESSADMIN}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.BUSINESSADMIN}>Quản lý cửa hàng</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES_ADMIN.MENU_USER}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.MENU_USER}>Quản lý menu user</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES.LOGOUT}
            onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES.LOGIN}>Đăng xuất</Link>
          </Menu.Item>



        </Menu>
      </Sider>  
      <Layout style={{ marginLeft: collapsed ? WIDTH_MENU_CLOSE : WIDTH_MENU_OPEN }}>
        <Affix offsetTop={0}>
          <Row
            wrap={isMobile}
            justify="space-between"
            align="middle"
            style={{ backgroundColor: '#5b6be8' }}
          >
            <Row
              align="middle"
              wrap={false}
              style={{
                width: '100%',
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 12,
                paddingBottom: 12,
              }}
              justify={isMobile && 'space-between'}
            >
             
            </Row>
            <Row wrap={false} align="middle" style={{ marginRight: 10 }}>
              <DropdownLanguage />
              <div style={{ marginTop: 8, marginRight: 15 }}>
                <Dropdown overlay={<NotifyContent />} placement="bottomCenter" trigger="click">
                  <Badge count={0} showZero size="small" offset={[-3, 3]}>
                    <Bell style={{ color: 'rgb(253, 170, 62)', cursor: 'pointer' }} />
                  </Badge>
                </Dropdown>

              </div>
              <Dropdown overlay={content} trigger="click">
                <Row align="middle" wrap={false} style={{ cursor: 'pointer' }}>
                  <Avatar
                    src={user && (user.avatar || '')}
                    style={{ color: '#FFF', backgroundColor: '#FDAA3E', width: 35, height: 35 }}
                  />
                  <span
                    style={{
                      textTransform: 'capitalize',
                      marginLeft: 5,
                      color: 'white',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user && (user.fullname || '...')}
                  </span>
                </Row>
              </Dropdown>
            </Row>
          </Row>
        </Affix>
        <div style={{ backgroundColor: '#f0f2f5', width: '100%' }}>{props.children}</div>
      </Layout>
      {/* </Permission> */}
    </Layout>
  )
}


export default React.memo(BaseLayout)
