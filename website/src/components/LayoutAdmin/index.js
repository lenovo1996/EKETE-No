/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES, PERMISSIONS, LOGO_DEFAULT, PERMISSIONS_ADMIN } from 'consts'
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
import { getMenu, deleteMenu } from 'apis/menuUserEKT'
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

  const MENUS = [
    // {
    //   pathsChild: [],
    //   path: ROUTES.OVERVIEW,
    //   title: 'Tổng quan admin',
    //   permissions: [PERMISSIONS_ADMIN.tong_quan_admin],
    //   icon: <DashboardOutlined />,
    // },
    // {
    //   pathsChild: [],
    //   path: ROUTES.OVERVIEW,
    //   title: 'Tổng quan',
    //   permissions: [PERMISSIONS.tong_quan],
    //   icon: <DashboardOutlined />,
    // },
    // {
    //   pathsChild: [],
    //   path: ROUTES.SELL,
    //   title: 'Bán hàng',
    //   permissions: [PERMISSIONS.ban_hang],
    //   icon: <ShoppingCartOutlined />,
    // },
    // {
    //   pathsChild: [ROUTES.ORDER_CREATE],
    //   path: ROUTES.ORDER_LIST,
    //   title: 'Đơn hàng',
    //   permissions: [PERMISSIONS.danh_sach_don_hang],
    //   icon: <ShoppingOutlined />,
    // },
  ]

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
    history.push(ROUTES.LOGIN)
  }

  useEffect(() => {
    if (localStorage.getItem('openKey')) setOpenKeys([localStorage.getItem('openKey')])
  }, [])


  // return(
  //   <div>
  //     <Button onClick={getuserAdmin}>aaaa</Button>
  //   </div>
  // )

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
          {/* {MENUS.map(renderMenuItem)} */}
          {
        menu && menu.map((Item,index)=>{
          return(
            <Menu.Item key={Item.url}  
            // icon={Item.icon}
            >
              <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
               <path d={Item.icon} />
              </svg>
            <Link to={Item.url} >{Item.name}</Link>
            </Menu.Item>
          )
        })
      }
          <Menu.Item
            key={ROUTES.OVERVIEWADMIN}
            // onClick={onSignOut}
            // icon={<DashboardOutlined />}
          >
            <Link to={ROUTES.OVERVIEWADMIN}>Tổng quan Admin</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES.EMPLOYEEADMIN}
            // onClick={onSignOut}
            // icon={<DashboardOutlined />}
          >
              <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
              {/* <path d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z" /> */}
    <path d="M112 0C85.49 0 64 21.49 64 48V96H16C7.163 96 0 103.2 0 112C0 120.8 7.163 128 16 128H272C280.8 128 288 135.2 288 144C288 152.8 280.8 160 272 160H48C39.16 160 32 167.2 32 176C32 184.8 39.16 192 48 192H240C248.8 192 256 199.2 256 208C256 216.8 248.8 224 240 224H16C7.163 224 0 231.2 0 240C0 248.8 7.163 256 16 256H208C216.8 256 224 263.2 224 272C224 280.8 216.8 288 208 288H64V416C64 469 106.1 512 160 512C213 512 256 469 256 416H384C384 469 426.1 512 480 512C533 512 576 469 576 416H608C625.7 416 640 401.7 640 384C640 366.3 625.7 352 608 352V237.3C608 220.3 601.3 204 589.3 192L512 114.7C499.1 102.7 483.7 96 466.7 96H416V48C416 21.49 394.5 0 368 0H112zM544 237.3V256H416V160H466.7L544 237.3zM160 464C133.5 464 112 442.5 112 416C112 389.5 133.5 368 160 368C186.5 368 208 389.5 208 416C208 442.5 186.5 464 160 464zM528 416C528 442.5 506.5 464 480 464C453.5 464 432 442.5 432 416C432 389.5 453.5 368 480 368C506.5 368 528 389.5 528 416z" />
  </svg>
            <Link to={ROUTES.EMPLOYEEADMIN}>Quản lý cửa hàng</Link>
          </Menu.Item>

          {/* <Menu.Item key={ROUTES.CUSTOMER} 
            // onClick={onSignOut} 
            icon={<LogoutOutlined />}>
            <Link to={ROUTES.CUSTOMER}>Cá nhân</Link>
          </Menu.Item> 
          <Menu.Item key={ROUTES.BRANCH_MANAGEMENT} 
            // onClick={onSignOut} 
            icon={<LogoutOutlined />}>
            <Link to={ROUTES.BRANCH_MANAGEMENT}>Cửa hàng</Link>
          </Menu.Item>  */}
          {/* <Menu.Item key={ROUTES.LOGIN} onClick={onSignOut} icon={<LogoutOutlined />}>
            <Link to={ROUTES.LOGIN}>Đăng xuất</Link>
          </Menu.Item> */}
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
              {/* <MenuOutlined
                onClick={toggle}
                style={{ fontSize: 20, marginRight: 18, color: 'white' }}
              /> */}
              <Permission permissions={[PERMISSIONS.them_cua_hang]}>
                <Link
                  to={{ pathname: ROUTES.BRANCH, state: 'show-modal-create-branch' }}
                  style={{ marginRight: '1rem', cursor: 'pointer' }}
                >
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      backgroundColor: '#FFAB2D',
                      borderColor: '#FFAB2D',
                      fontSize: 18,
                      marginLeft: 10,
                      display: login.role === 'EMPLOYEE' && 'none',
                    }}
                  >
                    <Plus />
                  </Button>
                </Link>
              </Permission>
              {/* <Row align="middle">
                <div style={{ color: 'white', marginRight: 8 }}>Chi nhánh:</div>
                <Select
                  // disabled={user && user.role_id === 1 ? false : true}
                  placeholder="Chi nhánh"
                  style={{ width: isMobile ? '90%' : 250 }}
                  onChange={(value) => dispatch({ type: 'SET_BRANCH_ID', data: value })}
                  value={branchIdApp}
                >
                  {branches.map((e, index) => (
                    <Select.Option value={e.branch_id} key={index}>
                      {e.name}
                    </Select.Option>
                  ))}
                </Select>
              </Row> */}
              {/* <Search
              // className={'ant-input-group-addon'}
                placeholder="Tìm kiếm"
                allowClear
                enterButton="Search"
                size="large"
                style={{ width: 240 }}
                onSearch={onSearch}
              /> */}
              
               {/* <Search  style={{ width: 240 }} placeholder="input search text" onSearch={onSearch} enterButton /> */}
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
