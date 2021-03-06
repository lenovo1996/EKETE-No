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

}) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const location = useLocation()
  const { Option } = Select;
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [image, setImage] = useState('')

  const provinces = useSelector((state) => state.provinces)
  const districts = useSelector((state) => state.districts)


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
        career_id: dataForm.career_id,
      }
      if (image) {
        body['logo'] = image
      }
      let res
      if (record) res = await updateBusiness(body, record.business_id)
     
      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          dispatch({ type: 'UPDATE_BUSINESS', data: {
            business_id: record.business_id, 
            ...body
          } })

          notification.success({
            message: `C???p nh???t ch???c n??ng th??nh c??ng`,
          })
        } else
          notification.error({
            message:
              res.data.message ||
              `C???p nh???t ch???c n??ng th???t b???i, vui l??ng th??? l???i`,
          })
      } else
        notification.error({
          message:
            res.data.message ||
            `C???p nh???t ch???c n??ng th???t b???i, vui l??ng th??? l???i`,
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const _getProvinces = async () => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const res = await getProvinces()
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        dispatch({ type: 'SET_PROVINCES', provinces_data: res.data.data })
      }
    } catch (error) {
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }
  const _getDistricts = async () => {
    try {
      const res = await getDistricts()
      if (res.status === 200) {
        dispatch({ type: 'SET_DISTRICTS', districts_data: res.data.data })
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
              C???p nh???t
            </Button>
          </Row>
        }
        title='C???p nh???t c???a h??ng'
        centered
        width="70%"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        H??nh ???nh
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
              <div style={{ marginTop: 8 }}>T???i l??n</div>
            </div>
          )}
        </Upload>
        <Form form={form} layout="vertical">
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label={<div style={{ color: 'black', fontWeight: '600' }}>T??n c???a h??ng</div>}
                name="business_name"
                rules={[{ required: true, message: 'Vui l??ng nh???p t??n c???a h??ng' }]}
              >
                <Input size="large" placeholder="Nh???p t??n c???a h??ng" />
              </Form.Item>
            </Col>
             <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_website"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Website</div>}
                rules={[{ required: true, message: 'Vui l??ng nh???p website' }]}
              >
                <Input placeholder="Nh???p website" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="business_registration_number"
                label={<div style={{ color: 'black', fontWeight: '600' }}>????ng k?? kinh doanh</div>}
                rules={[{ required: true, message: 'Vui l??ng nh???p ?????a ch???' }]}
              >
                <Input placeholder="Nh???p ????ng k?? kinh doanh" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_address"
                label={<div style={{ color: 'black', fontWeight: '600' }}>?????a ch???</div>}
                rules={[{ required: true, message: 'Vui l??ng nh???p ?????a ch???' }]}
              >
                <Input placeholder="Nh???p ?????a ch???" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="space-between" align="middle">
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                name="company_province"
                label={<div style={{ color: 'black', fontWeight: '600' }}>T???nh/th??nh ph???</div>}
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
                  placeholder="Ch???n t???nh/th??nh ph???"
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
                label={<div style={{ color: 'black', fontWeight: '600' }}>Qu???n/huy???n</div>}
              >
                <Select
                  size="large"
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Ch???n qu???n huy???n"
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
                rules={[{ message: 'Vui l??ng nh???p ng??nh ngh???', required: true }]}
                name="career_id"
                label={<div style={{ color: 'black', fontWeight: '600' }}>Ng??nh ngh???</div>}
              >
               <Input placeholder="Nh???p ng??nh ngh???" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
              <Form.Item
                label={<div style={{ color: 'black', fontWeight: '600' }}>Li??n h???</div>}
                name="company_phone"
              >
                <Input placeholder="Nh???p li??n h???" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  )
}
