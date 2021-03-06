import React, { useEffect, useState } from 'react'

//antd
import { Form, Modal, Row, Input, Select, InputNumber, Spin } from 'antd'

//apis
import { getDistricts, getProvinces } from 'apis/address'

export default function DeliveryAddress({ setDeliveryAddress, address }) {
  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

  const [districts, setDistricts] = useState([])
  const [districtsDefault, setDistrictsDefault] = useState([])
  const [provinces, setProvinces] = useState([])
  const [loadingDistrict, setLoadingDistrict] = useState(false)
  const [loadingProvince, setLoadingProvince] = useState(false)

  const [nameProvince, setNameProvince] = useState('')

  const _updateDeliveryAddress = async () => {
    await form.validateFields()
    const dataForm = form.getFieldsValue()
    setDeliveryAddress({ ...address, ...dataForm })
    toggle()
  }

  const _exit = () => {
    toggle()
    form.setFieldsValue({ ...address })
  }

  const _getProvinces = async () => {
    try {
      setLoadingProvince(true)
      const res = await getProvinces()
      if (res.status === 200) setProvinces(res.data.data)
      setLoadingProvince(false)
    } catch (error) {
      setLoadingProvince(false)
      console.log(error)
    }
  }

  const _getDistricts = async () => {
    try {
      setLoadingDistrict(true)
      const res = await getDistricts()
      if (res.status === 200) {
        setDistricts(res.data.data)
        setDistrictsDefault(res.data.data)
      }
      setLoadingDistrict(false)
    } catch (error) {
      setLoadingDistrict(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (nameProvince) {
      const districtsNew = districtsDefault.filter(
        (district) => district.province_name === nameProvince
      )
      setDistricts([...districtsNew])
    }
  }, [nameProvince])

  useEffect(() => {
    _getDistricts()
    _getProvinces()
  }, [])

  useEffect(() => {
    if (visible && address)
      form.setFieldsValue({ ...address, name: address.first_name + ' ' + address.last_name })
  }, [visible])

  return (
    <>
      <div style={{ color: '#1890ff', cursor: 'pointer', marginTop: 6 }} onClick={toggle}>
        Thay ?????i ?????a ch??? giao h??ng
      </div>
      <Modal
        onOk={_updateDeliveryAddress}
        width={600}
        okText="C???p nh???t"
        cancelText="Tho??t"
        title="Thay ?????i ?????a ch??? giao h??ng"
        visible={visible}
        onCancel={_exit}
      >
        <Form form={form} layout="vertical">
          <Row justify="space-between" wrap={false}>
            <Form.Item
              style={{ width: 250 }}
              name="first_name"
              label="H??? kh??ch h??ng"
              rules={[{ message: ' Vui l??ng nh???p h??? kh??ch h??ng', required: true }]}
            >
              <Input placeholder="Nh???p h??? kh??ch h??ng" />
            </Form.Item>

            <Form.Item
              style={{ width: 250 }}
              name="last_name"
              label="T??n kh??ch h??ng"
              rules={[{ message: ' Vui l??ng nh???p t??n kh??ch h??ng', required: true }]}
            >
              <Input placeholder="Nh???p t??n kh??ch h??ng" />
            </Form.Item>
          </Row>

          <Row justify="space-between" wrap={false}>
            <Form.Item
              style={{ width: 250 }}
              name="address"
              label="?????a ch???"
              rules={[{ message: ' Vui l??ng nh???p ?????a ch???', required: true }]}
            >
              <Input placeholder="Nh???p ?????a ch???" />
            </Form.Item>

            <Form.Item
              style={{ width: 250 }}
              name="phone"
              label="S??? ??i???n tho???i"
              rules={[{ message: ' Vui l??ng nh???p s??? ??i???n tho???i', required: true }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nh???p s??? ??i???n tho???i" />
            </Form.Item>
          </Row>

          <Row justify="space-between" wrap={false}>
            <Form.Item
              style={{ width: 250 }}
              name="province"
              label="T???nh/th??nh ph???"
              rules={[{ message: ' Vui l??ng ch???n t???nh/th??nh ph???', required: true }]}
            >
              <Select
                notFoundContent={loadingProvince ? <Spin /> : null}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch
                placeholder="Ch???n t???nh/th??nh ph???"
                onChange={(value) => setNameProvince(value)}
              >
                {provinces.map((province, index) => (
                  <Select.Option key={index} value={province.province_name}>
                    {province.province_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ width: 250 }}
              name="district"
              label="Qu???n/huy???n"
              rules={[{ message: ' Vui l??ng ch???n qu???n/huy???n', required: true }]}
            >
              <Select
                notFoundContent={loadingDistrict ? <Spin /> : null}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch
                placeholder="Ch???n qu???n/huy???n"
              >
                {districts.map((district, index) => (
                  <Select.Option key={index} value={district.district_name}>
                    {district.district_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
