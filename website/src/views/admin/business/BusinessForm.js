import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, regexPhone } from 'consts/index'
import { useLocation } from 'react-router-dom'

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
  Upload
} from 'antd'

// icon
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
//apis

import { getProvinces, getDistricts } from 'apis/address'
import { getBusinesses, updateBusiness } from 'apis/business';
import { uploadFile } from 'apis/upload'
export default function MenuForm({
  children,
  reloadData,
  record,

  // status = ['new', 'tetting', 'ready to public','public','waiting for review','pending']
}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const location = useLocation()
  const { Option } = Select;
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const [business, setBusiness] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [image, setImage] = useState('')
  const [provinces, setProvinces] = useState([])
  const [districtMain, setDistrictMain] = useState([])
  const [districtsDefault, setDistrictsDefault] = useState([])
  

  const _uploadImage = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      setImage(url || '')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const _editBusiness = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()

      setLoading(true)
      const body = {
        ...dataForm,
        business_name: dataForm.business_name || '',
        company_website: dataForm.company_website || '',
        company_address: dataForm.company_address || '',
        company_district: dataForm.company_district || '',
        company_province: dataForm.company_province || '',
        company_phone: dataForm.company_phone ||'',
        logo: dataForm.logo || '',
        career_id: dataForm.career_id,
      }
      console.log(body)

      let res = await updateBusiness(body, record.menu_id)
     
      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          reloadData()
          notification.success({
            message: `Cập nhật chức năng thành công`,
          })
        } else
          notification.error({
            message:
              res.data.message ||
              `Cập nhật chức năng thất bại, vui lòng thử lại`,
          })
      } else
        notification.error({
          message:
            res.data.message ||
            `Cập nhật chức năng thất bại, vui lòng thử lại`,
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const _getProvinces = async () => {
    try {
      const res = await getProvinces()
      if (res.status === 200) setProvinces(res.data.data)

      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }

  const _getDistricts = async () => {
    try {
      const res = await getDistricts()
      if (res.status === 200) {
        setDistrictMain(res.data.data)
        setDistrictsDefault(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    _getProvinces()
    _getDistricts()

    if (location.state && location.state === 'show-modal-create-branch') setVisible(true)
  }, [])

  useEffect(() => {
    if (visible) {
      if (!record) {
        form.resetFields()
        setImage('')
      } else {
        form.setFieldsValue({ ...record })
        setImage(record.logo || '')
      }
    }
  }, [visible])


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
  useEffect(() => {
    _getBusinesses()
  }, [])

  return (
    <>
      <div onClick={() => setVisible(true)}>{children}</div>
      <Drawer
        footer={
          <Row justify="end">
            <Button
              loading={loading}
              onClick={_editBusiness}
              size="large"
              type="primary"
              style={{ minWidth: 120 }}
            >
              Cập nhật
            </Button>
          </Row>
        }
        title='Cập nhật cửa hàng'
        centered
        width="70%"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Hình ảnh
        <Upload
          className="upload-shipping"
          name="logo"
          listType="picture-card"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          data={_uploadImage}
        >
          {image ? (
            <img src={image} alt="avatar" style={{ width: '100%' }} />
          ) : (
            <div>
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>
          )}
        </Upload>
        <Form form={form} layout="vertical">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label={<div style={{ color: 'black', fontWeight: '600' }}>Tên cửa hàng</div>}
                name="business_name"
                rules={[{ required: true, message: 'Vui lòng nhập tên cửa hàng' }]}
              >
                <Input size="large" placeholder="Nhập tên cửa hàng" />
              </Form.Item>
            </Col>
             <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_website"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Website</div>}
                rules={[{ required: true, message: 'Vui lòng nhập website' }]}
              >
                <Input placeholder="Nhập website" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_address"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Địa chỉ</div>}
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
              >
                <Input placeholder="Nhập địa chỉ" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_province"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Tỉnh/thành phố</div>}
              >
                <Select
                  size="large"
                  onChange={(value) => {
                    if (value) {
                      const districtsNew = districtsDefault.filter((e) => e.province_name === value)
                      setDistrictMain([...districtsNew])
                    } else setDistrictMain([...districtsDefault])
                  }}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn tỉnh/thành phố"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {provinces.map((values, index) => {
                    return (
                      <Option value={values.province_name} key={index}>
                        {values.province_name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_district"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Quận/huyện</div>}
              >
                <Select
                  size="large"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Chọn quận huyện"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {districtMain.map((values, index) => {
                    return (
                      <Option value={values.district_name} key={index}>
                        {values.district_name}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                rules={[{ message: 'Vui lòng nhập ngành nghề', required: true }]}
                name="career_id"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Ngành nghề</div>}
              >
               <Input placeholder="Nhập ngành nghề" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label={<div style={{ color: 'black', fontWeight: '600' }}>Liên hệ</div>}
                name="company_phone"
              >
                <Input placeholder="Nhập liên hệ" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}
