import React, { useEffect, useState, useRef } from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES_ADMIN } from 'consts'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

//antd
import {
  Popconfirm,
  Input,
  Row,
  Col,
  Select,
  Table,
  Button,
  notification,
  DatePicker, 

} from 'antd'
import { SearchOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

//apis

import { getBusinesses , setstatus, setprofilestatus } from'apis/business'

//components
import TitlePage from 'components/title-page'
import SettingColumns from 'components/setting-columns'
import columnsBusiness from './columns'
import BusinessForm from './BusinessForm'

const { Option } = Select
export default function Employee() {
  const history = useHistory()
  const dispatch = useDispatch()


  const [columns, setColumns] = useState([])
  const [countUser, setCountUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const toggleOpenSelect = () => setIsOpenSelect(!isOpenSelect)


  const [business, setBusiness] = useState('')

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
    // console.log("business", dataUser);


  const _getBusinesses = async () => {
    try {
      setLoading(true)
      const res = await getBusinesses({ ...paramsFilter })
      // console.log(res)
      if (res.status === 200) {
        setBusiness(res.data.data)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
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
          _getBusinesses()
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
          _getBusinesses()
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

  const _setBackgroud=(de)=>{
    if(de === 'Chưa xác thực') return 'green'
    if(de === 'Đã xác thực số điện thoại') return '#99ffff'
    if(de === 'Đã gửi hình ảnh xác thực đăng ký kinh doanh') return 'yellow'
  }
  return (
    <div className="card">
    
      <TitlePage
        title={
          <Row
            align="middle"
            onClick={() => history.push(ROUTES_ADMIN.CONFIGURATION_STORE)}
            style={{ cursor: 'pointer' }}
          >
            {/* <ArrowLeftOutlined style={{ marginRight: 8 }} /> */}
            <div>Quản lý cửa hàng</div>
          </Row>
        }
      >
        <SettingColumns
            columns={columns}
            setColumns={setColumns}
            columnsDefault={columnsBusiness}
            nameColumn="columnsBusiness"
          />
      </TitlePage>
     

      <Table
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
          if (column.key === 'business_name') return { ...column,render: (text, record) => (
            <BusinessForm
              record={record}
              reloadData={_getBusinesses}
              // roles={roles}
            >
              <a>{record.business_name}</a>
            </BusinessForm>
          ),}
          if (column.key === 'user_name') return { ...column, render: (text, record) => record.user_name }
          if (column.key === 'company_address') return { ...column, render: (text, record) => record.company_address }
          if (column.key === 'company_phone') return { ...column, render: (text, record) => record.company_phone }
          if (column.key === 'profile_status') {
            return { ...column, render: (text, record) => 
              (
                // record.profile_status, 
              <Select defaultValue={record.profile_status}
              style={{ width: 240 }}
              //  className={styles['select_profile']}
              //  style={{background:(_setBackgroud(record.profile_status))}}
               onChange={(e)=> _setprofilestatus(e,record.business_id)}
             
               >
              <Option value={'Chưa xác thực'}>Chưa xác thực</Option>
              <Option value={'Đã xác thực số điện thoại'}>Đã xác thực số điện thoại</Option>
              <Option value={'Đã gửi hình ảnh xác thực đăng ký kinh doanh'}>Đã gửi hình ảnh xác thực đăng ký kinh doanh</Option>
              <Option value={'Chờ xác thực'}>Chờ xác thực</Option>
              <Option value={'Xác thực thành công'}>Xác thực thành công</Option>  
            </Select>)
          }
    
        }
          // return { ...column, render: (text, record) => record.profile_status }
          if (column.key === 'status') return { ...column, render: (text, record) => 
            (
              // record.status, 
            <Select defaultValue={record.status}  style={{ width: 120 }} onChange={(e)=>{ _setstatus(e,record.business_id)}}>
            <Option value={'Active'}>Active</Option>
            <Option value={'Warnning'}>Warnning</Option>
            <Option value={'Block'}>Block</Option>
            <Option value={'Banned'}>Banned</Option>
            <Option value={'Waiting for review'}>Waiting for review  </Option>
          </Select> )}
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
        style={{ width: '100%', marginTop: 10 }}
      />
    </div>
  )
}
