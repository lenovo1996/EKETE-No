import React, { useEffect, useState } from 'react'

//antd
import {
  Form,
  Drawer,
  Row,
  Col,
  Button,
  Input,
  notification,
  DatePicker,
  Select,
  Radio,
  Space,
  InputNumber,
} from 'antd'

//apis
import { getMenu,updateMenu, addMenu } from 'apis/menu-user'

export default function MenuForm({
  children,
  reloadData,
  record,

  // status = ['new', 'tetting', 'ready to public','public','waiting for review','pending']
}) {
  const [form] = Form.useForm()
  
  const { Option } = Select;
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const [menu, setMenu] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })

  const _addOrEditMenu = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()

      setLoading(true)
      const body = {
        ...dataForm,
        name: dataForm.name || '',
        parent_menu_id: dataForm.parent_menu_id || '',
        description: dataForm.description || '',
        url: dataForm.url || '',
        view_position: dataForm.view_position || '',
        status: dataForm.status || '',
        icon: dataForm.icon || ''
      }
      console.log(body)

      let res
      if (record) res = await updateMenu(body, record.menu_id)
      else res = await addMenu({ ...body })
      console.log(res)

      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          reloadData()
          notification.success({
            message: `${record ? 'Cập nhật' : 'Thêm'} chức năng thành công`,
          })
        } else
          notification.error({
            message:
              res.data.message ||
              `${record ? 'Cập nhật' : 'Thêm'} chức năng thất bại, vui lòng thử lại`,
          })
      } else
        notification.error({
          message:
            res.data.message ||
            `${record ? 'Cập nhật' : 'Thêm'} chức năng thất bại, vui lòng thử lại`,
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (visible) {
      if (!record) {
        form.resetFields()
      } else {
        form.setFieldsValue({
          ...record
        })
      }
    }
  }, [visible])

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
  }, [])

  return (
    <>
      <div onClick={toggle}>{children}</div>
      <Drawer
        width="70%"
        footer={
          <Row justify="end">
            <Button
              onClick={_addOrEditMenu}
              loading={loading}
              size="large"
              type="primary"
              style={{ width: 120 }}
              
            >
              {record ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Row>
        }
        title={`${record ? 'Cập nhật' : 'Thêm'} chức năng`}
        placement="right"
        onClose={toggle}
        visible={visible}
      >
        <Form layout="vertical" form={form}>
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Tên chức năng"
                name="name"
                rules={[
                  { required: record ? false : true, message: 'Vui lòng nhập tên chức năng!' },
                ]}
              >
                <Input disabled={record ? true : false} placeholder="Nhập tên chức năng" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11} style={{ display: record && 'none' }}>
              <Form.Item
              initialValue={'/'}
                label="URL"
                name="url"
                rules={[{ required: record ? false : true, message: 'Vui lòng nhập đường dẫn!' }]}
              >
                <Input  placeholder='Nhập đường dẫn' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item label="Mô tả" name="description">
                <Input placeholder="Nhập mô tả" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="parent_menu_id"
                label="Menu cấp trên"
                
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  placeholder="Chọn menu cấp trên"
                >
                  {menu.map((menu, index) => (
                    <Select.Option value={menu.menu_id} key={index}>
                      {menu.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item label="Vị trí hiển thị" name="view_position">
                <InputNumber placeholder="Nhập vị trí hiển thị"  style={{ width: '100%' }}/>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item label="Icon" name="icon">
                <Input placeholder="Nhập Icon" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="status"
                label="Trạng thái"
                rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              >
                <Select  style={{ width: 300 }}>
                  <Option value="new">new</Option>
                  <Option value="testing">testing</Option>
                  <Option value="ready to public" >ready to public</Option>
                  <Option value="public ">public</Option>
                  <Option value="waiting for review">waiting for review</Option>
                  <Option value="pending">pending</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}
