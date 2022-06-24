import React, { useEffect, useState, useRef } from 'react'
import styles from './business.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES_ADMIN } from 'consts'

//antd
import { Popconfirm, Select, Table, Button, notification, Input } from 'antd'
import { SearchOutlined,DeleteOutlined } from '@ant-design/icons'

//apis

import { getBusinesses, setstatus, setprofilestatus, deleteBusinesses } from 'apis/business'

//components
import columnsBusiness from './columns'
import BusinessForm from './BusinessForm'

// const { Option } = Select
export default function Employee() {
  const dispatch = useDispatch()
  const typingTimeoutRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')


  const business = useSelector((state) => state.business)
  const onSearch = (e) => {
    setValueSearch(e.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      const value = e.target.value

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
      dispatch({ type: ACTION.LOADING, data: false })}
    } catch (e) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(e)
    }
}
const _deleteBusiness = async (business_id) => {
  try {
    dispatch({ type: ACTION.LOADING, data: true })
    const res = await deleteBusinesses(business_id)
    dispatch({ type: ACTION.LOADING, data: false })
    if (res.status === 200) {
      if (res.data.success) {
        notification.success({ message: 'Xóa cửa hàng thành công' })
        _getBusinesses()
      } else
        notification.error({
          message: res.data.message || 'Xóa cửa hàng thất bại, vui lòng thử lại',
        })
    } else
      notification.error({
        message: res.data.message || 'Xóa cửa hàng thất bại, vui lòng thử lại',
      })
  } catch (err) {
    dispatch({ type: ACTION.LOADING, data: false })
    console.log(err)
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
  }, [paramsFilter])

  const _setBackgroudProfileStaus = (e) => {
    if (e === 1) return '#fc4b6c'
    if (e === 2) return '#0bb2fb'
    if (e === 3) return '#1e4db7'
    if (e === 4) return '#fdc90f'
    if (e === 5) return '#39cb7f'
  }
  const _setBackgroudStatus = (e) => {
    if (e === 1) return '#0bb2fb'
    if (e === 2) return '#fc4b6c'
    if (e === 3) return '#11142d'
    if (e === 4) return '#fdc90f'
    if (e === 5) return '#39cb7f'
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
            suffix={<SearchOutlined style={{ fontSize: 20 }}/>}
            placeholder="Tìm kiếm nhanh"
            onChange={onSearch}
            value={valueSearch}
            bordered={true}
          />
        </div>
      </div>

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
          // total: countUser,
        }}
        columns={columnsBusiness.map((column) => {
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
                  defaultValue={record.profile_status}
                  bordered={false}
                  style={{ background: _setBackgroudProfileStaus(record.profile_status),  borderRadius: 3, width:170, color: 'white' }}
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
                  defaultValue={record.status}
                  bordered={false}
                  style={{ background: _setBackgroudStatus(record.status), borderRadius: 3, width: 120, color: 'white'  }}
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
                   onConfirm={() => _deleteBusiness(record.business_id)}
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
