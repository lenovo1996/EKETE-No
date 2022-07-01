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
  Modal,
} from 'antd'

//apis
import { getuserAdmin, updateuserAdmin, createuserAdmin } from 'apis/admin'
export default function UserAdminForm({ children, reloadData, record }) {
  const [form] = Form.useForm()

  const { Option } = Select
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const [userAdmin, setUserAdmin] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const _addOrEditUserAdmin = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()

      setLoading(true)
      const body = {
        ...dataForm,
        fullname: dataForm.fullname || '',
        password: dataForm.password || '',
        phone: dataForm.phone || '',
        email: dataForm.email || '',
        birthday: dataForm.birthday || '',
        address: dataForm.address || '',
        role: dataForm.role || '',
        department: dataForm.department || '',
      }
      //   console.log(body)

      let res
      if (record) res = await updateuserAdmin(body, record.userAdmin_id)
      else res = await createuserAdmin({ ...body })
      console.log(res)

      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          reloadData()
          notification.success({
            message: `${record ? 'Cập nhật' : 'Thêm'} quản trị viên thành công`,
          })
        } else
          notification.error({
            message:
              res.data.message ||
              `${record ? 'Cập nhật' : 'Thêm'} quản trị viên thất bại, vui lòng thử lại`,
          })
      } else
        notification.error({
          message:
            res.data.message ||
            `${record ? 'Cập nhật' : 'Thêm'} quản trị viên thất bại, vui lòng thử lại`,
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
          ...record,
        })
      }
    }
  }, [visible])

  const _getUsreAdmin = async () => {
    try {
      setLoading(true)
      const res = await getuserAdmin({})
      if (res.status === 200) {
        setUserAdmin(res.data.data)
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }
  useEffect(() => {
    _getUsreAdmin()
  }, [])

  return (
    <>
      <div onClick={toggle}>{children}</div>
      <Modal
        width=  "50%"
        style={{height:'70%'}}
        title={`${record ? 'Cập nhật' : 'Thêm'} quản trị viên`}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        centered
        visible={visible}
        footer={
          <Row justify="end"
          style={{height: 78, paddingTop: 24}}
          >
            <Button
              onClick={_addOrEditUserAdmin}
              loading={loading}
              size="large"
              type="primary"
              style={{ width: 230, background: '#1e4db7' }}
            >
              {record ? 'Cập nhật quản trị viên' : 'Tạo quản trị viên'}
            </Button>
          </Row>
        }
        
      >
        <Form layout="vertical" form={form}>
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: record ? true : true,
                    message: 'Vui lòng nhập số điện thoại quản trị viên!',
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Họ và tên"
                name="fullname"
                rules={[
                  { required: record ? true : true, message: 'Vui lòng nhập tên quản trị viên!' },
                ]}
              >
                <Input placeholder="Nhập tên quản trị viên" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Ngày sinh"
                name="birthday"
                rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
              >
                <DatePicker placeholder="Chọn ngày sinh" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label="Phòng ban"
                name="department"
                rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}
              >
                <Select  placeholder="Chọn phòng ban">
                  <Option value={1}>Phòng Marketing</Option>
                  <Option value={2}>Phòng đào tạo</Option>
                  <Option value={3}>Chăm sóc khách hàng</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                initialValue={2}
                name="role"
                label="Vai trò"
                rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
              >
                <Radio.Group defaultValue={2}>
                    <Radio value={1} >Trưởng phòng</Radio>
                    <Radio value={2} >Phó phòng</Radio>
                    <Radio value={3} >Nhân viên</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )

}
