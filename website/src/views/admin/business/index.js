import React, { useEffect, useState, useRef } from 'react'

import moment from 'moment'
import { compare } from 'utils'
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
  DatePicker,  Space,

} from 'antd'
import { SearchOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

//apis

import { getBusinesses , setstatus } from'apis/business'

//components
import TitlePage from 'components/title-page'
import SettingColumns from 'components/setting-columns'
import columnsBusiness from './columns'
import BusinessForm from './BusinessForm'

const { Option } = Select
export default function Employee() {
  const typingTimeoutRef = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()
  const branchIdApp = useSelector((state) => state.branch.branchId)

  const [roles, setRoles] = useState([])
  const [districts, setDistricts] = useState([])
  const [branches, setBranches] = useState([])
  const [provinces, setProvinces] = useState([])
  const [columns, setColumns] = useState([])
  const [users, setUsers] = useState([])
  const [countUser, setCountUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [Address, setAddress] = useState({ province: [], district: [] })
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueDateSearch, setValueDateSearch] = useState(null)
  const [valueSearch, setValueSearch] = useState('')
  const [valueTime, setValueTime] = useState() //dùng để hiện thị value trong filter by time
  const [valueDateTimeSearch, setValueDateTimeSearch] = useState({})
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const toggleOpenSelect = () => setIsOpenSelect(!isOpenSelect)

  const [user, setUser] = useState([])
  const [business, setBusiness] = useState('')

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
    console.log("business", dataUser);


  const _getBusinesses = async () => {
    try {
      setLoading(true)
      const res = await getBusinesses({ ...paramsFilter })
      console.log(res)
      if (res.status === 200) {
        setBusiness(res.data.data)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const _setstatus = async (value, business_id) => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await setstatus(business_id, value)
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Cập nhật trạng thái  thành công' })
          _getBusinesses()
        } else
          notification.error({
            message: res.data.message || 'Cập nhật trạng thái thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Cập nhật trạng thái thất bại, vui lòng thử lại',
        })
    } catch (err) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(err)
    }
  }

  useEffect(() => {
    _getBusinesses()
  }, [])

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
               onChange={handleChange}
              //  onClick={getAddress}
               >
              <Option value={record.profile_status=1}>Chưa xác thực</Option>
              <Option value={record.profile_status=2}>Đã xác thực số điện thoại</Option>
              <Option value={record.profile_status=3}> Đã gửi hình ảnh xác thực đăng ký kinh doanh </Option>
              <Option value={record.profile_status=4}>Chờ xác thực</Option>
              <Option value={record.profile_status=5}>Xác thực thành công</Option>
            </Select>)

          }
    
        }
          // return { ...column, render: (text, record) => record.profile_status }
          if (column.key === 'status') return { ...column, render: (text, record) => 
            (
              // record.status, 
            <Select defaultValue={record.status}  style={{ width: 120 }} onChange={(e)=>{ _setstatus(e,record.business_id)}}>
            <Option value={1}>Active</Option>
            <Option value={2}>Warnning</Option>
            <Option value={3}>Block</Option>
            <Option value={4}>Band</Option>
            <Option value={5}>Waiting for review  </Option>
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
