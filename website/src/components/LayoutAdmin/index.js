// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from 'react'
// import styles from './layout.module.scss'
// import { useDispatch, useSelector } from 'react-redux'
// import { ACTION, ROUTES, PERMISSIONS,ROUTES_ADMIN, LOGO_DEFAULT, PERMISSIONS_ADMIN } from 'consts'
// import { Link, useLocation, useRouteMatch, useHistory } from 'react-router-dom'
// import { Bell, Plus } from 'utils/icon'
// import jwt_decode from 'jwt-decode'

// import {
//   Layout,
//   Menu,
//   Select,
//   Button,
//   Dropdown,
//   BackTop,
//   Affix,
//   Avatar,
//   Badge,
//   Empty,
//   Row,
//   Popover,
//   Col,
//   Input,
//   Space

// } from 'antd'

// import {
//   MenuOutlined,
//   GoldOutlined,
//   DashboardOutlined,
//   LogoutOutlined,

//   UserOutlined,
//   ExportOutlined,


// } from '@ant-design/icons'

// //components
// import Permission from 'components/permission'
// import ModalUpdateUser from './modal-user'
// import DropdownLanguage from 'components/dropdown-language'

// //apis
// import { getuserAdmin } from 'apis/admin'
// import { getMenu, deleteMenu } from 'apis/menu-user'
// import Item from 'antd/lib/list/Item'

// const { Search } = Input;
// const { Sider } = Layout
// const BaseLayout = (props) => {
//   const history = useHistory()
//   const location = useLocation()
//   const routeMatch = useRouteMatch()
//   const dispatch = useDispatch()
//   const WIDTH_MENU_OPEN = 230
//   const WIDTH_MENU_CLOSE = 60


//   const [branches, setBranches] = useState([])
//   const [user, setUser] = useState({})
//   const [menu, setMenu] = useState([])

//   const login = useSelector((state) => state.login)
//   const branchIdApp = useSelector((state) => state.branch.branchId)
//   const triggerReloadBranch = useSelector((state) => state.branch.trigger)
//   const setting = useSelector((state) => state.setting)

//   const dataUser = localStorage.getItem('accessToken')
//     ? jwt_decode(localStorage.getItem('accessToken'))
//     : {}
//     console.log("layout",dataUser);
//   const [loading, setLoading] = useState(false)
  
//   const isCollapsed = localStorage.getItem('collapsed')
//     ? JSON.parse(localStorage.getItem('collapsed'))
//     : false
//   const [collapsed, setCollapsed] = useState(isCollapsed)
//   const [isMobile, setIsMobile] = useState(false)

//   const [openKeys, setOpenKeys] = useState([])



//     const _getMenu = async () => {
//       try {
//         setLoading(true)
//         const res = await getMenu()
//         console.log(res)
//         if (res.status === 200) {
//           setMenu(res.data.data)
//           console.log('meunu', res.data.data)
//         }
//         setLoading(false)
//       } catch (e) {
//         setLoading(false)
//         console.log(e)
//       }
//     }
 

//     const _getInfoUser = async (params) => {
//       try {
//         const res = await getuserAdmin(params)
//         console.log("1");
//         if (res.status === 200) {
//           if (res.data.data.length) setUser({ ...res.data.data[0] })
//           console.log('infoAdmin',res.data.data);
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }

//   useEffect(() => {
//     _getInfoUser({ user_id: dataUser.data.user_id })
//   }, [dataUser.data.user_id])

//   var toggle = () => {
//     localStorage.setItem('collapsed', JSON.stringify(!collapsed))
//     setCollapsed(!collapsed)
//   }



 

//   const onSearch = (value) => console.log(value)

//   const onSignOut = () => {
//     dispatch({ type: ACTION.LOGOUT })
//     dispatch({ type: 'UPDATE_INVOICE', data: [] })
//     // window.location.href = `https://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`
//     history.push(ROUTES_ADMIN.LOGINADMIN)
//   }

//   useEffect(() => {
//     if (localStorage.getItem('openKey')) setOpenKeys([localStorage.getItem('openKey')])
//   }, [])


//   const content = (
//     <div className={styles['user_information']}>
//       <ModalUpdateUser user={user} 
//       reload={getuserAdmin}
//       >
//         <div>
//           <div
//             style={{ color: '#565656', paddingLeft: 10 }}
//             onClick={getuserAdmin}
//           >
//             <UserOutlined style={{ fontSize: '1rem', marginRight: 10, color: ' #565656' }} />
//             Tài khoản của tôi
//           </div> 
//         </div> 
//       </ModalUpdateUser>

//       <div>
//         <a onClick={onSignOut} style={{ color: '#565656', paddingLeft: 10 }}>
//           <div>
//             <ExportOutlined style={{ fontSize: '1rem', marginRight: 10, color: '#565656' }} />
//             Đăng xuất
//           </div>
//         </a>
//       </div>
//     </div>
//   )
//   const NotifyContent = () => (
//     <div className={styles['notificationBox']}>
//       <div className={styles['title']}>Thông báo</div>
//       {/* <div className={styles['content']}>
//         <Empty />
//       </div> */}
//     </div>
//   )



//   //get width device
//   useEffect(() => {
//     if (window.innerWidth < 768) {
//       setIsMobile(true)
//       setCollapsed(true)
//     } else setIsMobile(false)
//   }, [])
//   useEffect(() => {
//     _getMenu()
//   }, [])

//   return (
    
//     <Layout style={{ backgroundColor: 'white', height: '100%' }}>
//        {/* <Permission permissions={['PERMISSIONS_ADMIN.tong_quan_admin']}> */}
//       <BackTop style={{ right: 10, bottom: 15 }} />

//       <Sider
//         trigger={null}
//         collapsible
//         width={isMobile ? '100%' : WIDTH_MENU_OPEN}
//         collapsedWidth={isMobile ? 0 : WIDTH_MENU_CLOSE}
//         style={{
//           backgroundColor: 'white',
//           zIndex: isMobile && 6000,
//           height: '100vh',
//           position: 'fixed',
//         }}
//         collapsed={collapsed}
//       >
//         <Row
//           justify="center"
//           style={{
//             display: collapsed ? 'none' : 'flex',
//             paddingTop: 10,
//             paddingBottom: 20,
//           }}
//         >
//           <Avatar
//             src={user && (user.avatar || '')}
//             style={{ color: '#FFF', backgroundColor: '#FDAA3E', width: 80, height: 80 }}
//           />
//         </Row>
//         <Menu
//           style={{
//             height: `calc(100vh - ${collapsed ? 4 : 96}px)`,
//             overflowY: 'auto',
//             overflowX: 'hidden',
//           }}
//           theme="light"
//           onClick={(e) => {
//             if (e.keyPath && e.keyPath.length === 1) localStorage.removeItem('openKey')
//           }}
//           // onOpenChange={onOpenChange}
//           openKeys={openKeys}
//           selectedKeys={routeMatch.path}
//           mode="inline"
//         >

//           <Menu.Item
//             key={ROUTES_ADMIN.OVERVIEWADMIN}
//             // onClick={onSignOut}
//             icon={<DashboardOutlined />}
//           >
//             <Link to={ROUTES_ADMIN.OVERVIEWADMIN}>Tổng quan Admin</Link>
//           </Menu.Item>
//           <Menu.Item
//             key={ROUTES_ADMIN.BUSINESSADMIN}
//             // onClick={onSignOut}
//             icon={<DashboardOutlined />}
//           >
//             <Link to={ROUTES_ADMIN.BUSINESSADMIN}>Quản lý cửa hàng</Link>
//           </Menu.Item>
//           <Menu.Item
//             key={ROUTES_ADMIN.MENU_USER}
//             // onClick={onSignOut}
//             icon={<DashboardOutlined />}
//           >
//             <Link to={ROUTES_ADMIN.MENU_USER}>Quản lý menu user</Link>
//           </Menu.Item>
//           <Menu.Item
//             key={ROUTES.LOGOUT}
//             onClick={onSignOut}
//             icon={<DashboardOutlined />}
//           >
//             <Link to={ROUTES.LOGIN}>Đăng xuất</Link>
//           </Menu.Item>



//         </Menu>
//       </Sider>  
//       <Layout style={{ marginLeft: collapsed ? WIDTH_MENU_CLOSE : WIDTH_MENU_OPEN }}>
//         <Affix offsetTop={0}>
//           <Row
//             wrap={isMobile}
//             justify="space-between"
//             align="middle"
//             style={{ backgroundColor: '#5b6be8' }}
//           >
//             <Row
//               align="middle"
//               wrap={false}
//               style={{
//                 width: '100%',
//                 paddingLeft: 5,
//                 paddingRight: 5,
//                 paddingTop: 12,
//                 paddingBottom: 12,
//               }}
//               justify={isMobile && 'space-between'}
//             >
             
//             </Row>
//             <Row wrap={false} align="middle" style={{ marginRight: 10 }}>
//               <DropdownLanguage />
//               <div style={{ marginTop: 8, marginRight: 15 }}>
//                 <Dropdown overlay={<NotifyContent />} placement="bottomCenter" trigger="click">
//                   <Badge count={0} showZero size="small" offset={[-3, 3]}>
//                     <Bell style={{ color: 'rgb(253, 170, 62)', cursor: 'pointer' }} />
//                   </Badge>
//                 </Dropdown>

//               </div>
//               <Dropdown overlay={content} trigger="click">
//                 <Row align="middle" wrap={false} style={{ cursor: 'pointer' }}>
//                   <Avatar
//                     src={user && (user.avatar || '')}
//                     style={{ color: '#FFF', backgroundColor: '#FDAA3E', width: 35, height: 35 }}
//                   />
//                   <span
//                     style={{
//                       textTransform: 'capitalize',
//                       marginLeft: 5,
//                       color: 'white',
//                       fontWeight: 600,
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {user && (user.fullname || '...')}
//                   </span>
//                 </Row>
//               </Dropdown>
//             </Row>
//           </Row>
//         </Affix>
//         <div style={{ backgroundColor: '#f0f2f5', width: '100%' }}>{props.children}</div>
//       </Layout>
//       {/* </Permission> */}
//     </Layout>
//   )
// }


// export default React.memo(BaseLayout)
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
<<<<<<< HEAD
import { ACTION, PERMISSIONS, LOGO_DEFAULT, ROUTES_ADMIN } from 'consts'
=======
import { ACTION, ROUTES, PERMISSIONS, ROUTES_ADMIN, LOGO_DEFAULT, PERMISSIONS_ADMIN } from 'consts'
>>>>>>> main
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
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  ExportOutlined,
} from '@ant-design/icons'

//components
import Permission from 'components/permission'
import ModalUpdateUser from './modal-user'
import DropdownLanguage from 'components/dropdown-language'

//apis
import { getuserAdmin } from 'apis/admin'
<<<<<<< HEAD
import { getMenu } from 'apis/menu-user'
=======
import { getMenu, deleteMenu } from 'apis/menu-admin'
>>>>>>> main


const { Search } = Input;
const { Sider } = Layout
const BaseLayout = (props) => {
  const history = useHistory()
  const location = useLocation()
  const routeMatch = useRouteMatch()
  const dispatch = useDispatch()
  const WIDTH_MENU_OPEN = 230
  const WIDTH_MENU_CLOSE = 60



  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState([])


<<<<<<< HEAD
  // const dataUser = localStorage.getItem('accessToken')
  //   ? jwt_decode(localStorage.getItem('accessToken'))
  //   : {}

=======
<<<<<<< Updated upstream
  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
    console.log("layout",dataUser);
=======

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
>>>>>>> Stashed changes
  const [loading, setLoading] = useState(false)
  
>>>>>>> main
  const isCollapsed = localStorage.getItem('collapsed')
    ? JSON.parse(localStorage.getItem('collapsed'))
    : false


  const [collapsed, setCollapsed] = useState(isCollapsed)
  const [isMobile, setIsMobile] = useState(false)

  const [openKeys, setOpenKeys] = useState([])
<<<<<<< Updated upstream


  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}

<<<<<<< HEAD
  const getInfoUser = async (params) => {
=======
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
=======
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

  const _getMenu = async () => {
    try {
      setLoading(true)
      const res = await getMenu()
      console.log(res)
      if (res.status === 200) {
        setMenu(res.data.data)
        console.log('meunu', res.data.data)
>>>>>>> Stashed changes
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
<<<<<<< Updated upstream
 

    const _getInfoUser = async (params) => {
      try {
        const res = await getuserAdmin(params)
        console.log("1");
        if (res.status === 200) {
          if (res.data.data.length) setUser({ ...res.data.data[0] })
          console.log('infoAdmin',res.data.data);
        }
      } catch (error) {
        console.log(error)
=======
  }
  useEffect(() => {
    _getMenu()
  }, [])

  const _getInfoUser = async (params) => {
>>>>>>> main
    try {
      const res = await getuserAdmin(params)
      if (res.status === 200) {
        if (res.data.data.length) setUser({ ...res.data.data[0] })
<<<<<<< HEAD
=======
        console.log('infoAdmin', res.data.data);
>>>>>>> Stashed changes
>>>>>>> main
      }
    } catch (error) {
      console.log(error)
    }
  }
<<<<<<< HEAD
=======

  useEffect(() => {
    _getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])
>>>>>>> main

  var toggle = () => {
    localStorage.setItem('collapsed', JSON.stringify(!collapsed))
    setCollapsed(!collapsed)
  }
  const _getMenu = async () => {
    try {
      setLoading(true)
      const res = await getMenu()
      console.log(res)
      if (res.status === 200) {
        setMenu(res.data.data)
        console.log('res.data.data', res.data.data)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  useEffect(() => {
    _getMenu()
  }, [])

  // const renderMenuItem = (_menu) => (
  //   <>
  //     {_menu.menuCon ? (
  //       <Menu.SubMenu
  //         style={{
  //           width: '100%',
  //           height: collapsed ? 40 : '',

  //           display: 'block',
  //         }}
  //         title={
  //           <Link
  //             style={{
  //               fontSize: '0.9rem',
                
  //             }}
  //             to={_menu.url}
  //           >
  //             {_menu.name}
  //           </Link>
  //         }
  //         icon={
  //           <svg marginRight={20} width="1rem" height="1rem" fill="currentColor" viewBox="0 0 1024 1024">
              
  //             <path d={_menu.icon} />

  //           </svg>
  //         }
  //       >
  //         {_menu.menuCon.map((e) => (
  //           <>
  //             <Menu.Item
  //               key={e.url}
  //               style={{
  //                 fontSize: '0.9rem',
  //               }}
  //             >
  //               <Link  to={e.url}>{e.name}</Link>
  //             </Menu.Item>
  //           </>
  //         ))}
  //       </Menu.SubMenu>
  //     ) : (
  //       <Menu.Item
  //         key={_menu.url}
  //         style={{
  //           fontSize: '0.9rem',
  //         }}
        
  //       // onClick={_menu.url === ROUTES.SELL && toggle}
  //       >
  //         <svg style={{marginRight : 10}} width="1.1rem" height="1.1rem" fill="currentColor" viewBox="0 0 1024 1024" >
              
  //             <path d={_menu.icon}/>

  //           </svg>
  //         <Link  to={_menu.url}>{_menu.name}</Link>
  //       </Menu.Item>
  //     )}
  //   </>


  // )

<<<<<<< HEAD
=======
<<<<<<< Updated upstream
 
=======
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
>>>>>>> Stashed changes
>>>>>>> main

  const onSearch = (value) => console.log(value)

  const onSignOut = () => {
    dispatch({ type: ACTION.LOGOUT })
    dispatch({ type: 'UPDATE_INVOICE', data: [] })
    // window.location.href = `https://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`
    history.push(ROUTES_ADMIN.LOGINADMIN)
  }

  useEffect(() => {
    if (localStorage.getItem('openKey')) setOpenKeys([localStorage.getItem('openKey')])
  }, [])

  const content = (
    <div className={styles['user_information']}>
<<<<<<< HEAD
      <ModalUpdateUser user={user} 
      reload={getInfoUser}
=======
      <ModalUpdateUser user={user}
        reload={getuserAdmin}
>>>>>>> main
      >
        <div>
          <div
            style={{ color: '#565656', paddingLeft: 10 }}
            // onClick={getInfoUser}
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
  const SettingOutlined = () => (
    <div className={styles['notificationBox']}>
      {/* <div className={styles['title']}></div> */}
      {/* <div className={styles['content']}>
        <Empty />
      </div> */}
    </div>
  )

<<<<<<< HEAD
  // useEffect(() => {
  //   _getBranches()
  // }, [triggerReloadBranch])

  useEffect(() => {
    getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])
=======
<<<<<<< Updated upstream

=======
  // useEffect(() => {
  //   _getInfoUser({ user_id: dataUser.data.user_id })
  // }, [dataUser.data.user_id])
>>>>>>> Stashed changes
>>>>>>> main

  //get width device
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
      setCollapsed(true)
    } else setIsMobile(false)
  }, [])
<<<<<<< HEAD

  return (
    <Layout style={{ backgroundColor: 'white', height: '100%' }}>
=======
  const renderMenuItem = (_menu) => (
    <>
      {_menu.menuCon ? (
        <Menu.SubMenu
          style={{
            width: '100%',
            height: collapsed ? 40 : '',
            display: 'block',

            // fontSize: '0.9rem',
          }}
          title={
            <Link
              style={{
                fontSize: '0.9rem',
                color: 'black',
              }}
              to={_menu.url}
            >
              {_menu.name}
            </Link>
          }
          icon={
            <svg
              marginRight={20}
              width="1rem"
              height="1rem"
              fill="currentColor"
              viewBox="0 0 1024 1024"
            >
              <path d={_menu.icon} />
            </svg>
          }
        >
          {_menu.menuCon.map((e) => (
            <>
              <Menu.Item
                key={e.url}
                style={{
                  fontSize: '0.9rem',
                }}
              >
                <Link to={e.url}>{e.name}</Link>
              </Menu.Item>
            </>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={_menu.url}
          style={{
            // fontSize: '0.9rem',
            width: '100%',
            height: collapsed ? 40 : '',
            display: 'block',
          }}

          // onClick={_menu.url === ROUTES.SELL && toggle}
        >
          <svg
            style={{ marginRight: 10 }}
            width="1.1rem"
            height="1.1rem"
            fill="currentColor"
            viewBox="0 0 1024 1024"
          >
            <path d={_menu.icon} />
          </svg>
          <Link to={_menu.url}>{_menu.name}</Link>
        </Menu.Item>
      )}
    </>
  )

  return (

    <Layout style={{ backgroundColor: 'white', height: '100%' }}>
      {/* <Permission permissions={['PERMISSIONS_ADMIN.tong_quan_admin']}> */}
>>>>>>> main
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
          {/* <img
            // src={setting && setting.company_logo ? setting.company_logo : LOGO_DEFAULT}
            style={{ objectFit: 'contain', maxHeight: 70, width: '100%' }}
            src={user && (user.avatar || '')}
            alt=""
          /> */}
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
          // onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={routeMatch.path}
          mode="inline"
        >
<<<<<<< HEAD
          {/* {menu.map(renderMenuItem)} */}
          <Menu.Item
=======
          {menu.map(renderMenuItem)}

          {/* <Menu.Item
>>>>>>> main
            key={ROUTES_ADMIN.OVERVIEWADMIN}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.OVERVIEWADMIN}>Tổng quan</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES_ADMIN.BUSINESSADMIN}
            // onClick={onSignOut}
            icon={<MenuOutlined />}
          >
            <Link to={ROUTES_ADMIN.BUSINESSADMIN}>Q/L cửa hàng</Link>
          </Menu.Item>
<<<<<<< HEAD
          <Menu.Item key={ROUTES_ADMIN.MENU_USER} 
            // onClick={onSignOut} 
            icon={<LogoutOutlined />}>
            <Link to={ROUTES_ADMIN.MENU_USER}>Quản lý menu user</Link>
          </Menu.Item> 
          {/* <Menu.Item key={ROUTES.BRANCH_MANAGEMENT} 
            // onClick={onSignOut} 
            icon={<LogoutOutlined />}>
            <Link to={ROUTES.BRANCH_MANAGEMENT}>Cửa hàng</Link>
          </Menu.Item>  */}
          <Menu.Item key={ROUTES_ADMIN.LOGINADMIN} onClick={onSignOut} icon={<LogoutOutlined />}>
            <Link to={ROUTES_ADMIN.LOGINADMIN}>Đăng xuất</Link>
          </Menu.Item>
=======
          <Menu.Item
            key={ROUTES_ADMIN.MENU_USER}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.MENU_USER}>Q/L menu chức năng user</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES_ADMIN.MENU_BUSINESS}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.MENU_BUSINESS}>Q/L menu chức năng cửa hàng</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES_ADMIN.MENU_ADMIN}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES_ADMIN.MENU_ADMIN}>Q/L menu chức năng admin</Link>
          </Menu.Item> */}
          <Menu.Item
            key={ROUTES.LOGOUT}
            onClick={onSignOut}
            icon={<LogoutOutlined />}
          >
            <Link to={ROUTES.LOGIN}>Đăng xuất</Link>
          </Menu.Item>



>>>>>>> main
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
<<<<<<< HEAD
              <MenuOutlined
                onClick={toggle}
                style={{ fontSize: 20, marginRight: 18, color: 'white' }}
              />
              {/* <Permission permissions={[PERMISSIONS.them_cua_hang]}>
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
              </Permission> */}
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
=======

>>>>>>> main
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
    </Layout>
  )
}

export default React.memo(BaseLayout)


