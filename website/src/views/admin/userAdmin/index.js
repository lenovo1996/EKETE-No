import React, { useEffect, useState, useRef } from 'react'
import styles from './userAdmin.module.scss'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES } from 'consts'

//antd
import { Popconfirm, Input, Select, Table, Button, Space, notification, Tooltip, Alert } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'

//apis
import { getuserAdmin, deleteuserAdmin } from 'apis/admin'

//components
import UserAdminForm from './userAdminForm'
import SettingColumns from 'components/setting-columns'
import ColumnsU from './columns'

export default function Employee() {
  const typingTimeoutRef = useRef(null)
  const dispatch = useDispatch()

  const [columns, setColumns] = useState([])

  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')
  const [userAdmin, setUserAdmin] = useState('')
  const [countUserAdmin, setCountUserAdmin] = useState(0)

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
  const _deleteUser = async (userAdmin_id) => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await deleteuserAdmin(userAdmin_id)
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Xóa quản trị viên thành công' })
          dispatch({ type: ACTION.LOADING, data: false })
          _getUserAdmin()
        } else
          notification.error({
            message: res.data.message || 'Xóa quản trị viên thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Xóa quản trị viên thất bại, vui lòng thử lại',
        })
      dispatch({ type: ACTION.LOADING, data: false })

    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }
  const _getUserAdmin = async () => {
    try {
      setLoading(true)
      const res = await getuserAdmin({...paramsFilter})
      console.log(res)
      if (res.status === 200) {
        setUserAdmin(res.data.data)
        setCountUserAdmin(res.data.count)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    _getUserAdmin()
  }, [paramsFilter])

  const _getDepartment =(e)=>{
    if(e == 1) return 'Phòng Marketing'
    if(e == 2) return 'Phòng đào tạo'
    if(e == 3) return 'Chăm sóc khách hàng'
  }
  const _getRole =(e)=>{
    if(e == 1) return 'Trưởng phòng'
    if(e == 2) return 'Phó phòng'
    if(e == 3) return 'Nhân viên'
  }

  return (
    <div className={styles['container']}>
      <div className={styles['title_page']}>
        <div>
          <div className={styles['title']}>Quản lý quản trị viên</div>
          <p className={styles['title1']}>Nội dung cụ thể về quản lý quản trị viên</p>
        </div>
        <div>
          <Input
            className={styles['search']}
            allowClear
            suffix={<SearchOutlined style={{ fontSize: 20 }} />}
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
            columnsDefault={ColumnsU}
            nameColumn="ColumnsU"
          />
          <UserAdminForm >
            <Button type="primary" size="large" style={{background:'#1e4db7'}}>
              Tạo quản trị viên
            </Button>
          </UserAdminForm>
        </Space>
      </div>

      <Table
        className={styles['table']}
        id='useradmin'
        loading={loading}
        scroll={{ y: 670 }}
        rowKey="userAdmin_id"
        size="small"
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) =>
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
          total: countUserAdmin,
        }}
        columns={columns.map((column) => {
          if (column.key === 'stt') return { ...column, render: (text, record, index) => index + 1 }
          if (column.key === 'fullname')
            return {
              ...column,
              render: (text, record) => (
                // <UserAdminForm
                //   record={record}
                //   reloadData={_getUserAdmin}
                // >
                  <a>{record.fullname}</a>
                // </UserAdminForm>
              ),
            }
          if (column.key === 'phone') return { ...column, render: (text, record) => record.phone }
          if (column.key === 'birdayth')
            return { ...column, render: (text, record) => record.birthday && moment(record.birthday).format('DD-MM-YYYY'),}
          if (column.key === 'email') return { ...column, render: (text, record) => record.email }
          if (column.key === 'role')
            return {
              ...column,
              render: (text, record) => (
                record.role,
                (<Button style={{ background: '#4db8ff', color: 'white',border:0, width: 120}}>{_getRole(record.role)}</Button>)
              ),
            }
          if (column.key === 'department') return { ...column, render: (text, record) => _getDepartment(record.department) }
          if (column.key === 'time') return { ...column,
            render: (text, record) =>
                record.create_date && moment(record.create_date).format('DD-MM-YYYY HH:mm'), }
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
                      onConfirm={() => _deleteUser(record.userAdmin_id)}
                    >
                      <Button icon={<DeleteOutlined />} type="primary" danger />
                    </Popconfirm>
                  </Tooltip>
                </Space>
              ),
            }

          return column
        })}
        dataSource={userAdmin}
      />
    </div>
  )
}
