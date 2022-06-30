/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import styles from './layout.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'
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
  Space,
} from 'antd'

import {
  MenuOutlined,
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  ExportOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons'

//components
import ModalUpdateUser from './modal-user'
import DropdownLanguage from 'components/dropdown-language'
//apis
import { getuserEKT } from 'apis/user-ekt'

import { getBusinesses } from 'apis/business'

const { Search } = Input
const { Sider } = Layout
const BaseLayout = (props) => {
  let menu = useSelector((state) => state.menuUser)
  const history = useHistory()

  const routeMatch = useRouteMatch()
  const dispatch = useDispatch()
  const WIDTH_MENU_OPEN = 230
  const WIDTH_MENU_CLOSE = 60

  const [user, setUser] = useState({})
  const [business, setBusiness] = useState([])

  const isCollapsed = localStorage.getItem('collapsed')
    ? JSON.parse(localStorage.getItem('collapsed'))
    : false
  const [collapsed, setCollapsed] = useState(isCollapsed)
  const [isMobile, setIsMobile] = useState(false)

  const [openKeys, setOpenKeys] = useState([])

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}

  const getInfoUser = async (params) => {
    try {
      const res = await getuserEKT(params)
      console.log(res)
      if (res.status === 200) {
        if (res.data.data.length) setUser({ ...res.data.data[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const _getBusinesses = async (params) => {
    try {
      const res = await getBusinesses(params)
      if (res.status === 200) setBusiness(res.data.data)
      console.log(business);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    _getBusinesses({ user_phone: dataUser.data.phone })
  }, [dataUser.data.phone])

  var toggle = () => {
    localStorage.setItem('collapsed', JSON.stringify(!collapsed))
    setCollapsed(!collapsed)
  }

  const linkto = (menu) => {
    if (menu.status === 'public') {
      return menu.url
    } else return '/message1'
  }
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
            fontSize: '0.9rem',
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
  const renderBusinessItem = (_business) => (
    <>
      <Menu.Item
        key={_business.business_name}
        style={{
          // fontSize: '0.9rem',
          width: '100%',
          height: collapsed ? 40 : '',
          display: 'block',
        }}
      >
        <div className={styles['avatar']} style={{ backgroundImage: `url(${_business.logo})` }}>
          <Link to={'/detail-business/' + _business.business_id} style={{ marginLeft: 50 }} >
            {_business.business_name}
          </Link>
        </div>
      </Menu.Item>
    </>
  )

  const onSignOut = () => {
    dispatch({ type: ACTION.LOGOUT })
    dispatch({ type: 'UPDATE_INVOICE', data: [] })
    // window.location.href = `https://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`
    history.push(ROUTES_USER.LOGIN)
  }

  useEffect(() => {
    if (localStorage.getItem('openKey')) setOpenKeys([localStorage.getItem('openKey')])
  }, [])

    const content = (
    <div className={styles['user_information']}>
      {/* <ModalUpdateUser user={user} reload={getInfoUser}> */}
      <div>
        <div style={{ color: '#565656', paddingLeft: 10 }}>
          <UserOutlined style={{ fontSize: '1rem', marginRight: 10, color: ' #565656' }} />
          <Link 
          to={ROUTES_USER.INFOR}
          > Tài khoản của tôi</Link>
        </div>
      </div>
      {/* </ModalUpdateUser> */}

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
          <h2 style={{ margin: 20, color: 'gray' }}> MAIN MENU</h2>

          {menu.map(renderMenuItem)}

          <h3 style={{ marginTop: 40, margin: 20, color: 'gray' }}> DANH SÁCH CỬA HÀNG</h3>
          {business.map(renderBusinessItem)}
          <Link to="/register-business">
            <Button
              style={{
                marginLeft: 20,
                width: 200,
                height: 50,
                background: '#4dc3ff',
                fontFamily: 'revert-layer',
                fontSize: 20,
                color: 'white',
              }}
            >
              Tạo cửa hàng mới
            </Button>
          </Link>

          <Menu.Item key={ROUTES_USER.LOGIN} onClick={onSignOut} icon={<LogoutOutlined />}>
            <Link>Đăng xuất</Link>
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
            ></Row>
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