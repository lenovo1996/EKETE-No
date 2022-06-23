import React, { useEffect, useState, useRef } from 'react'
import styles from './menuAdmin.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES } from 'consts'
import { useHistory } from 'react-router-dom'


//antd
import {
  Popconfirm,
  Input,
  Row,
  Col,
  Select,
  Table,
  Button,
  Space,
  notification,
  Tooltip,
  Alert
} from 'antd'
import { SearchOutlined,DeleteOutlined } from '@ant-design/icons'

//apis
import { getMenu, deleteMenu, updateMenu, setstatus } from 'apis/menu-admin'

//components
import MenuForm from './menuForm'
import SettingColumns from 'components/setting-columns'
import columnsM from './columns'

const { Option } = Select
export default function Menu() {
  const typingTimeoutRef = useRef(null)
  const dispatch = useDispatch()

  const [columns, setColumns] = useState([])

  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')
  const [menu, setMenu] = useState('')

  const onSearch = (e) => {
    const value = e.target.value
    setValueSearch(value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      if (value) paramsFilter.name = value
      else delete paramsFilter.name

      setParamsFilter({ ...paramsFilter, page: 1 })
    }, 650)
  }
  const _deleteMenu = async (menu_id) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await deleteMenu(menu_id)
      dispatch({ type: ACTION.LOADING, data: false })

      console.log(res)
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Xóa chức năng thành công' })
          _getMenu()
        } else
          notification.error({
            message: res.data.message || 'Xóa chức năng thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Xóa chức năng thất bại, vui lòng thử lại',
        })
    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }
  const _getMenu = async () => {
    try {
      setLoading(true)
      const res = await getMenu({ ...paramsFilter })
      // console.log(res)
      if (res.status === 200) {
        setMenu(res.data.data)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    _getMenu()
  }, [paramsFilter])

  const _setstatus = async ( value,menu_id) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await setstatus(menu_id, value)
      dispatch({ type: ACTION.LOADING, data: false }) 
      dispatch({ type: 'UPDATE_MENU_ADMIN', menu_id, status: value })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Cập nhật chức năng thành công' })
          _getMenu()
        } else
          notification.error({
            message: res.data.message || 'Cập nhật chức năng thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Cập nhật chức năng thất bại, vui lòng thử lại',
        })
    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }

  const _setBackgroudStatus = (e) => {
    if (e === 1) return '#0bb2fb'
    if (e === 2) return '#fc4b6c'
    if (e === 6) return '#11142d'
    if (e === 5) return '#fdc90f'
    if (e === 4) return '#39cb7f'
    if (e === 3) return '#1e4db7'
  }


  return (
    <div className={styles['container']}>
      <div className={styles['title_page']}>
        <div>
          <div className={styles['title']}>Quản lý chức năng</div>
          <p className={styles['title1']}>Nội dung cụ thể về qunr lý chức năng</p>
        </div>
        <div>
          <Input
            className={styles['search']}
            allowClear
            suffix={<SearchOutlined style={{ fontSize: 20 }}/>}
            placeholder="Tìm kiếm nhanh"
            onChange={onSearch}
            value={valueSearch}
            bordered={true}
          />
        </div>
      
        <Space>
          <SettingColumns
            columns={columns}
            setColumns={setColumns}
            columnsDefault={columnsM}
            nameColumn="columsM"
          />
          <MenuForm reloadData={_getMenu}>
            <Button type="primary" size="large">
              Tạo chức năng
            </Button>
          </MenuForm>
        </Space>
      </div>
      

      <Table
      className={styles['table']}
        loading={loading}
        rowKey="menu_id"
        size="small"
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) =>
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
        }}
        columns={columns.map((column) => {
          if (column.key === 'stt') return { ...column, render: (text, record, index) => index + 1 }
          if (column.key === 'nameMenu')
            return {
              ...column,
              render: (text, record) => (
                <MenuForm
                  record={record}
                  reloadData={_getMenu}
                  // roles={roles}
                >
                  <a>{record.name}</a>
                </MenuForm>
              ),
            }
          if (column.key === 'parent_menu_id')
            return { ...column, render: (text, record) => record.parent_menu_id }
          if (column.key === 'description')
            return { ...column, render: (text, record) => record.description }
          if (column.key === 'url') return { ...column, render: (text, record) => record.url }
          if (column.key === 'view_position')
            return { ...column, render: (text, record) => (record.view_position, (<Button style={{background: '#4db8ff', color: 'white'}}>{record.view_position}</Button>))}
          if (column.key === 'status') {
            return {
              ...column,
              render: (text, record) => (
                record.status,
                (
                  <Select
                    defaultValue={record.status}
                    bordered={false}
                    style={{ background: _setBackgroudStatus(record.status), borderRadius: 3, width: 120, color: 'white'  }}
                    onChange={(e)=>{ _setstatus(e,record.menu_id)}}
                  > 
                    <Option value={1}>new</Option>
                    <Option value={2}>testing</Option>
                    <Option value={3}>ready to public</Option>
                    <Option value={4}>public</Option>
                    <Option value={5}>pending</Option>
                    <Option value={6}>waiting for review</Option>
                  </Select>
                )
              ),
            }
          }
          if (column.key === 'action')
            return {
              ...column,
              render: (text, record) => (
                <Space>
                  <Tooltip>
                    <Popconfirm
                      title="Bạn có muốn xóa chức năng này không?"
                      okText="Đồng ý"
                      cancelText="Từ chối"
                      onConfirm={() => _deleteMenu(record.menu_id)}
                    >
                      <Button icon={<DeleteOutlined />} type="primary" danger />
                    </Popconfirm>
                  </Tooltip>
                </Space>
              ),
            }

          return column
        })}
        dataSource={menu}
      />
    </div>
  )
}
