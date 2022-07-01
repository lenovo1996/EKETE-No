import React, { useEffect, useState, useRef } from 'react'
import styles from './userEkt.module.scss'
import moment from 'moment'
import { ACTION, ROUTES } from 'consts'

//antd
import { Popconfirm, Input, Select, Table, Button, Space, notification, Tooltip, Alert } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'

//apis
import { getuserEKT  } from 'apis/user-ekt'
//components
import columnsU from './colunms'

export default function Employee() {
  const typingTimeoutRef = useRef(null)

  const [columns, setColumns] = useState([])

  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')
  const [userEkt, setUserEkt] = useState('')
  const [countUserEkt, setCountUserEkt] = useState(0)

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
//   const _deleteUser = async (userAdmin_id) => {
//     try {
//       // dispatch({ type: ACTION.LOADING, data: true })
//       const res = await deleteuserAdmin(userAdmin_id)
//       dispatch({ type: ACTION.LOADING, data: false })
//       if (res.status === 200) {
//         if (res.data.success) {
//           notification.success({ message: 'Xóa quản trị viên thành công' })
//           dispatch({ type: ACTION.LOADING, data: false })
//           _getUserAdmin()
//         } else
//           notification.error({
//             message: res.data.message || 'Xóa quản trị viên thất bại, vui lòng thử lại',
//           })
//       } else
//         notification.error({
//           message: res.data.message || 'Xóa quản trị viên thất bại, vui lòng thử lại',
//         })
//       dispatch({ type: ACTION.LOADING, data: false })

//     } catch (err) {
//       dispatch({ type: ACTION.LOADING, data: false })
//       console.log(err)
//     }
//   }
  const _getUserEkt = async () => {
    try {
      setLoading(true)
      const res = await getuserEKT({...paramsFilter})
      if (res.status === 200) {
        setUserEkt(res.data.data)
        setCountUserEkt(res.data.count)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    _getUserEkt()
  }, [paramsFilter])


  return (
    <div className={styles['container']}>
      <div className={styles['title_page']}>
        <div>
          <div className={styles['title']}>Quản lý user EKT</div>
          <p className={styles['title1']}>Nội dung cụ thể về quản lý user</p>
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
      </div>

      <Table
        className={styles['table']}
        id='userekt'
        loading={loading}
        scroll={{ y: 620 }}
        rowKey="user_id"
        size="small"
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) =>
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
          total: countUserEkt,
        }}
        columns={columnsU.map((column) => {
          if (column.key === 'stt') return { ...column, render: (text, record, index) => index + 1 }
          if (column.key === 'fullname')
            return {
              ...column,
              render: (text, record) => (
                  <a>{record.fullname}</a>
              ),
            }
          if (column.key === 'phone') return { ...column, render: (text, record) => record.phone }
          if (column.key === 'birdayth')
            return { ...column, render: (text, record) => record.birthday && moment(record.birthday).format('DD-MM-YYYY'),}
          if (column.key === 'email') return { ...column, render: (text, record) => record.email }
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
                      title="Bạn có muốn người dùng năng này không?"
                      okText="Đồng ý"
                      cancelText="Từ chối"
                    //   onConfirm={() => _deleteUser(record.userAdmin_id)}
                    >
                      <Button icon={<DeleteOutlined />} type="primary" danger />
                    </Popconfirm>
                  </Tooltip>
                </Space>
              ),
            }

          return column
        })}
        dataSource={userEkt}
      />
    </div>
  )
}
