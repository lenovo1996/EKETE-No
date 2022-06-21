import React, { useEffect, useState, useRef } from 'react'
import styles from './business.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES_ADMIN } from 'consts'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

//antd
import { Popconfirm, Select, Table, Button, notification, Input } from 'antd'
import { SearchOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

//apis

import { getBusinesses, setstatus, setprofilestatus } from 'apis/business'

//components
import SettingColumns from 'components/setting-columns'
import columnsBusiness from './columns'
import BusinessForm from './BusinessForm'

const { Option } = Select
export default function Employee() {
  const history = useHistory()
  const dispatch = useDispatch()
  const typingTimeoutRef = useRef(null)
  const [columns, setColumns] = useState([])
  const [countUser, setCountUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [valueSearch, setValueSearch] = useState('')

  const business = useSelector((state) => state.business)

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
  const _getBusinesses = async () => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await getBusinesses({ ...paramsFilter })
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        dispatch({ type: 'SET_BUSINESS', data: res.data.data })
      }
    } catch (e) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(e)
    }
  }

  const _setstatus = async (value, business_id) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await setstatus(business_id, value)
      dispatch({ type: ACTION.LOADING, data: false })

      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Cập nhật cửa hàng thành công' })
          dispatch({ type: 'UPDATE_BUSINESS', data: { business_id, status: value } })
        } else
          notification.error({
            message: res.data.message || 'Cập nhật cửa hàng thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Cập nhật cửa hàng thất bại, vui lòng thử lại',
        })
    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }
  const _setprofilestatus = async (value, business_id) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await setprofilestatus(business_id, value)
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Cập nhật trạng thái hồ sơ thành công' })
          dispatch({ type: 'UPDATE_BUSINESS', data: { business_id, profile_status: value } })
        } else
          notification.error({
            message: res.data.message || 'Cập nhật trạng thái hồ sơ thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Cập nhật trạng thái hồ sơ thất bại, vui lòng thử lại',
        })
    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }

  useEffect(() => {
    _getBusinesses()
  }, [])
  const _getProfileStatus = (e) => {
    if (e == 1) return 'Chưa xác thực'
    if (e == 2) return 'Đã xác thực số điện thoại'
    if (e == 3) return 'Đã gửi hình ảnh xác thực đăng ký kinh doanh'
    if (e == 4) return 'Chờ xác thực'
    if (e == 5) return 'Xác thực thành công'
  }

  const _getStatus = (e) => {
    if (e == 1) return 'Waiting for review'
    if (e == 2) return 'Banned'
    if (e == 3) return 'Block'
    if (e == 4) return 'Warnning'
    if (e == 5) return 'Active'
  }
  const _setBackgroud = (e) => {
    if (e === 1) return '#ff6600'
    if (e === 2) return '#ffff00'
    if (e === 3) return '#33ccff'
    if (e === 4) return '#66e0ff'
    if (e === 5) return '#00ff99'
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title_page']}>
        <div>
          <div className={styles['title']}>Quản lý cửa hàng</div>
          <p className={styles['title1']}>Thông tin chi tiết về cửa hàng quản lý</p>
        </div>
        <div>
          <Input
            className={styles['search']}
            allowClear
            suffix={<SearchOutlined />}
            placeholder="Tìm kiếm nhanh"
            onChange={onSearch}
            value={valueSearch}
            bordered={true}
          />
        </div>
      </div>

      <SettingColumns
        columns={columns}
        setColumns={setColumns}
        columnsDefault={columnsBusiness}
        nameColumn="columnsBusiness"
      />

      <Table
        className={styles['table']}
        loading={loading}
        rowKey="business_id"
        size="small"
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) =>
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
          total: countUser,
        }}
        columns={columns.map((column) => {
          if (column.key === 'stt') return { ...column, render: (text, record, index) => index + 1 }
          if (column.key === 'business_name')
            return {
              ...column,
              render: (text, record) => (
                <BusinessForm record={record}>
                  <a>{record.business_name}</a>
                </BusinessForm>
              ),
            }
          if (column.key === 'user_name')
            return { ...column, render: (text, record) => record.user_name }
          if (column.key === 'company_address')
            return { ...column, render: (text, record) => record.company_address }
          if (column.key === 'company_phone')
            return { ...column, render: (text, record) => record.company_phone }
          if (column.key === 'profile_status') {
            return {
              ...column,
              render: (text, record) => (
                <Select
                  defaultValue={_getProfileStatus(record.profile_status)}
                  bordered={false}
                  style={{ background: _setBackgroud(record.profile_status),  borderRadius: 3  }}
                  onChange={(e) => _setprofilestatus(e, record.business_id)}
                >
                  <option value={1}>Chưa xác thực</option>
                  <option value={2}>Đã xác thực số điện thoại</option>
                  <option value={3}>Đã gửi hình ảnh xác thực đăng ký kinh doanh</option>
                  <option value={4}>Chờ xác thực</option>
                  <option ption value={5}>
                    Xác thực thành công
                  </option>
                </Select>
              ),
            }
          }
          if (column.key === 'status')
            return {
              ...column,
              render: (text, record) => (
                <Select
                  defaultValue={_getStatus(record.status)}
                  bordered={false}
                  // className={styles['select_status']}
                  style={{ background: _setBackgroud(record.status), borderRadius: 3 }}
                  onChange={(e) => _setstatus(e, record.business_id)}
                >
                  <option value={5}>Active</option>
                  <option value={4}>Warnning</option>
                  <option value={3}>Block</option>
                  <option value={2}>Banned</option>
                  <option value={1}>Waiting for review </option>
                </Select>
              ),
            }
          if (column.key === 'action')
            return {
              ...column,
              render: (text, record) => (
                <Popconfirm
                  title="Bạn có muốn xóa cửa hàng này không?"
                  okText="Đồng ý"
                  cancelText="Từ chối"
                  //  onConfirm={() => _deleteUser(record.user_id)}
                >
                  <Button icon={<DeleteOutlined />} type="primary" danger />
                </Popconfirm>
              ),
            }
          return column
        })}
        dataSource={business}
      />
    </div>
  )
}
