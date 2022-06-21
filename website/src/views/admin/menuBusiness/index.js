import React, { useEffect, useState, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES } from 'consts'
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

  Tooltip,
} from 'antd'
import { SearchOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons'

//apis
import { getMenu , deleteMenu, setstatus } from 'apis/menu'


//components
import TitlePage from 'components/title-page'
import MenuForm from './menuForm'
import SettingColumns from 'components/setting-columns'
import columnsM from './columns'

const { Option } = Select
export default function Employee() {
  const typingTimeoutRef = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()


  const [columns, setColumns] = useState([])

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


  const [menu, setMenu] = useState('')

  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}
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
        }, 750)
      }
    const _deleteMenu = async (menu_id)=>{
      try {
        dispatch({type: ACTION.LOADING, data: true})
        const res = await deleteMenu(menu_id)
        dispatch({type: ACTION.LOADING, data: false})
        if(res.status ===200){
          if(res.data.success){
            notification.success({message: 'Xóa chức năng thành công'})
            _getMenu()
          }else
            notification.error({
              message: res.data.message || 'Xóa chức năng thất bại, vui lòng thử lại',
            })
          }else
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
          console.log(res)
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
    


  return (
    <div className="card">
    
      <TitlePage
        title={
          <Row
            align="middle"
            // onClick={() => history.push(ROUTES.CONFIGURATION_STORE)}
            style={{ cursor: 'pointer' }}
          >
            {/* <ArrowLeftOutlined style={{ marginRight: 8 }} /> */}
            <div>Quản lý chức năng</div>
          </Row>
        }
      >

        <Space>
        <SettingColumns
            columns={columns}
            setColumns={setColumns}
            columnsDefault={columnsM}
            nameColumn="columsM"
          />
            <MenuForm
            reloadData={_getMenu}
          >
            <Button type="primary" size="large">
              Tạo chức năng
            </Button>
          </MenuForm>
          </Space>
      </TitlePage>
      <Row
        gutter={[16, 16]}
        style={{ marginTop: 15, border: '1px solid #d9d9d9', borderRadius: 5 }}
      >
        <Col xs={24} sm={24} md={12} lg={12} xl={6}>
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm tên chức năng"
            onChange={onSearch}
            value={valueSearch}
            bordered={false}
          />
        </Col>
      </Row>

      <Table
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
          if (column.key === 'nameMenu') return { ...column, render: (text, record) => 
          <MenuForm
            record={record}
            reloadData={_getMenu}
            // roles={roles}
          > 
            <a>{record.name}</a>
          </MenuForm> }
          if (column.key === 'parent_menu_id') return { ...column, render: (text, record) => record.parent_menu_id }
          if (column.key === 'description') return { ...column, render: (text, record) => record.description }
          if (column.key === 'url') return { ...column, render: (text, record) => record.url }
          if (column.key === 'view_position') return { ...column, render: (text, record) => (record.view_position, (<Button style={{background: '#4db8ff', color: 'white'}}>{record.view_position}</Button>)) }
          if (column.key === 'status') {
            return { ...column, render: (text, record) => (record.status ,      
             <Select defaultValue={record.status}  style={{ width: 120 }} 
             onChange={(e)=>{ _setstatus(e,record.menu_id)}}
              >
              <Option value="new">new</Option>
              <Option value="testing">testing</Option>
              <Option value="ready to public" >ready to public</Option>
              <Option value="public ">public</Option>
              <Option value="waiting for review">waiting for review</Option>
              <Option value="pending">pending</Option>
            </Select>) 
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
        style={{ width: '100%', marginTop: 10 }}
      />
    </div>
  )
}
