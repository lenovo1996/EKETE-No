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
  Space,
  notification,
  DatePicker,
} from 'antd'
import { SearchOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

//apis
import { getEmployees, deleteEmployee } from 'apis/employee'
import { getDistricts, getProvinces } from 'apis/address'
import { getAllBranch } from 'apis/branch'
import { getRoles } from 'apis/role'
import { getuserEKT } from 'apis/user-ekt'
import { getBusinesses } from'apis/business'

//components
import TitlePage from 'components/title-page'
import SettingColumns from 'components/setting-columns'
import columnsBusiness from './columns'
import { render } from '@testing-library/react'

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


  const _getBusinesses = async () => {
    try {
      setLoading(true)
      const res = await getBusinesses({ ...paramsFilter })
      console.log(res)
      if (res.status === 200) {
        setBusiness(res.data.data)
        // if(res.data.data.profile_status === 1){
        //   console.log(11);
        // }
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
          if (column.key === 'business_name') return { ...column, render: (text, record) => <a>{record.business_name}</a> }
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
            <Select defaultValue={record.status}  style={{ width: 120 }} onChange={handleChange}>
            <Option value={record.status=1}>Active</Option>
            <Option value={record.status=2}>Warnning</Option>
            <Option value={record.status=3}>Block</Option>
            <Option value={record.status=4}>Band</Option>
            <Option value={record.status=5}>Waiting for review  </Option>
          </Select> )}
             if (column.key === 'action')
             return {
               ...column,
               render: (text, record) => (
                 <Popconfirm
                  //  title="Bạn có muốn xóa nhân viên này không?"
                  //  okText="Đồng ý"
                  //  cancelText="Từ chối"
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
