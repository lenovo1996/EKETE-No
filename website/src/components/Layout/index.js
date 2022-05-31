/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES, PERMISSIONS, LOGO_DEFAULT } from 'consts'
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
import { getuserEKT } from 'apis/user-ekt'
import { getMenu } from 'apis/menu-user'


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
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState([])

  const login = useSelector((state) => state.login)
  const branchIdApp = useSelector((state) => state.branch.branchId)
  const triggerReloadBranch = useSelector((state) => state.branch.trigger)
  const setting = useSelector((state) => state.setting)

  // const dataUser = localStorage.getItem('accessToken')
  //   ? jwt_decode(localStorage.getItem('accessToken'))
  //   : {}

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

  const getInfoUser = async (params) => {
    try {
      const res = await getuserEKT(params)
      if (res.status === 200) {
        if (res.data.data.length) setUser({ ...res.data.data[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  const renderMenuItem = (_menu) => (
    <>
      {_menu.menuCon ? (
        <Menu.SubMenu
          style={{
            width: '100%',
            height: collapsed ? 40 : '',

            display: 'block',
          }}
          title={
            <Link
              style={{
                fontSize: '0.9rem',
                
              }}
              to={_menu.url}
            >
              {_menu.name}
            </Link>
          }
          icon={
            <svg marginRight={20} width="1rem" height="1rem" fill="currentColor" viewBox="0 0 1024 1024">
              
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
                <Link  to={e.url}>{e.name}</Link>
              </Menu.Item>
            </>
          ))}
        </Menu.SubMenu>
      ) : (
        <Menu.Item
          key={_menu.url}
          style={{
            fontSize: '0.9rem',
          }}
        
        // onClick={_menu.url === ROUTES.SELL && toggle}
        >
          <svg style={{marginRight : 10}} width="1.1rem" height="1.1rem" fill="currentColor" viewBox="0 0 1024 1024" >
              
              <path d={_menu.icon}/>

            </svg>
          <Link  to={_menu.url}>{_menu.name}</Link>
        </Menu.Item>
      )}
    </>


  )


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

  const content = (
    <div className={styles['user_information']}>
      <ModalUpdateUser user={user} 
      reload={getInfoUser}
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

  // useEffect(() => {
  //   _getBranches()
  // }, [triggerReloadBranch])

  useEffect(() => {
    getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])

  //get width device
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
      setCollapsed(true)
    } else setIsMobile(false)
  }, [])

  return (
    <Layout style={{ backgroundColor: 'white', height: '100%' }}>
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
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={routeMatch.path}
          mode="inline"
        >
          {menu.map(renderMenuItem)}
          <Menu.Item
            key={ROUTES.OVERVIEW}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES.OVERVIEW}>Tổng quan</Link>
          </Menu.Item>
          <Menu.Item
            key={ROUTES.BUSINESS}
            // onClick={onSignOut}
            icon={<DashboardOutlined />}
          >
            <Link to={ROUTES.BUSINESS}>Cửa hàng</Link>
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
          <Menu.Item key={ROUTES.LOGIN} onClick={onSignOut} icon={<LogoutOutlined />}>
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
              <MenuOutlined
                onClick={toggle}
                style={{ fontSize: 20, marginRight: 18, color: 'white' }}
              />
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
    </Layout>
  )
}

export default React.memo(BaseLayout)


