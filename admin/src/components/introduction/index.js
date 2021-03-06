import React, { useEffect, useState } from 'react'

//antd
import { Button, Modal, Row, Form, Input, Select, Divider, Upload, notification } from 'antd'

import { useSelector, useDispatch } from 'react-redux'
import { ACTION, regexPhone } from 'consts'

//apis
import { getProvinces, getDistricts } from 'apis/address'
import { addStore } from 'apis/store'
import { addBranch } from 'apis/branch'
import { uploadFile } from 'apis/upload'
import { updateEmployee } from 'apis/employee'
import { addLabel, getAllLabel } from 'apis/label'

//icons
import { PlusOutlined } from '@ant-design/icons'

function ModalIntro() {
  const [formBranch] = Form.useForm()
  const [formStore] = Form.useForm()
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const [visibleCreate, setVisibleCreate] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districtsStore, setDistrictsStore] = useState([])
  const [districtsBranch, setDistrictsBranch] = useState([])
  const [labels, setLabels] = useState([])
  const [inputLabel, setInputLabel] = useState('')

  const [imageBranch, setImageBranch] = useState('')
  const [fileImageBranch, setFileImageBranch] = useState(null)

  const [imageStore, setImageStore] = useState('')
  const [fileImageStore, setFileImageStore] = useState(null)

  const dataUser = useSelector((state) => state.login.dataUser)

  function getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const getLabelData = async () => {
    try {
      const res = await getAllLabel()
      console.log(res)
      if (res.status === 200) {
        setLabels(res.data.data.filter((e) => e.active))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _addLabel = async () => {
    try {
      dispatch({ type: ACTION.LOADING, data: true })
      const body = {
        name: inputLabel,
        description: '',
      }
      const res = await addLabel(body)
      console.log(res)
      if (res.status === 200) {
        let arrayLabelNew = [...labels]
        arrayLabelNew.push(res.data.data)
        setLabels([...arrayLabelNew])
        setInputLabel('')
        notification.success({ message: 'T???o th??nh c??ng label!' })
      }

      if (res.status === 400) {
        setInputLabel('')
        notification.error({ message: 'Label ???? t???n t???i!' })
      }
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }

  const _getProvinces = async () => {
    try {
      const res = await getProvinces()
      if (res.status === 200) {
        setProvinces(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _getDistrictsStore = async (query) => {
    try {
      const res = await getDistricts(query)
      if (res.status === 200) {
        setDistrictsStore(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _getDistrictsBranch = async (query) => {
    try {
      const res = await getDistricts(query)
      console.log(res)
      if (res.status === 200) {
        setDistrictsBranch(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onCreate = async () => {
    try {
      let validated = true
      try {
        await formBranch.validateFields()
        await formStore.validateFields()
        validated = true
      } catch (error) {
        validated = false
      }

      if (!validated) return

      const dataStore = formStore.getFieldValue()
      const dataBranch = formBranch.getFieldValue()

      //validated phone
      if (!regexPhone.test(dataBranch.phone) || !regexPhone.test(dataStore.phone)) {
        notification.error({ message: 'S??? ??i???n tho???i li??n h??? kh??ng h???p l???!' })
        return
      }

      dispatch({ type: ACTION.LOADING, data: true })

      /* upload image */
      let urlImageBranch
      let urlImageStore
      if (fileImageBranch) urlImageBranch = await uploadFile(fileImageBranch)
      if (fileImageStore) urlImageStore = await uploadFile(fileImageStore)
      /* upload image */

      const bodyBranch = {
        ...dataBranch,
        logo: urlImageBranch || '',
        latitude: '',
        longtitude: '',
        address: '',
        email: '',
        fax: '',
        website: '',
      }

      const resBranch = await addBranch(bodyBranch)
      if (resBranch.status === 200) {
        const bodyStore = {
          ...dataStore,
          logo: urlImageStore || '',
          email: '',
          fax: '',
          website: '',
          latitude: '',
          longtitude: '',
          address: '',
          branch_id: resBranch.data.data.branch_id,
          label_id: dataStore.label_id || '',
        }

        const resStore = await addStore(bodyStore)
        console.log(resStore)
        if (resStore.status === 200) {
          notification.success({
            message: 'Ch??c m???ng b???n ???? t???o chi nh??nh v?? c???a h??ng th??nh c??ng',
          })
          const resUser = await updateEmployee(
            {
              is_new: false,
              branch_id: resBranch.data.data.branch_id,
              store_id: resStore.data.data.store_id,
            },
            dataUser.data && dataUser.data.user_id
          )
          console.log(resUser)
          if (resUser.status === 200) {
            if (resUser.data.accessToken && resUser.data.refreshToken) {
              localStorage.setItem('accessToken', resUser.data.accessToken)
              localStorage.setItem('refreshToken', resUser.data.refreshToken)
            }
          }
          setTimeout(() => window.location.reload(), 300)
        } else {
          formStore.setFieldsValue({ name: undefined })
          formBranch.setFieldsValue({ name: undefined })
          notification.error({
            message: resStore.data.message || 'T???o c???a h??ng th???t b???i!',
          })
        }
      } else {
        formStore.setFieldsValue({ name: undefined })
        formBranch.setFieldsValue({ name: undefined })
        notification.error({
          message: resBranch.data.message || 'T???o chi nh??nh th???t b???i!',
        })
      }

      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      dispatch({ type: ACTION.LOADING, data: false })
      console.log(error)
    }
  }

  useEffect(() => {
    if (Object.keys(dataUser).length) {
      if (dataUser.data.is_new) setVisible(true)
      else setVisible(false)
    }
  }, [dataUser])

  useEffect(() => {
    _getProvinces()
    _getDistrictsStore({ search: 'H??? Ch?? Minh' })
    _getDistrictsBranch({ search: 'H??? Ch?? Minh' })
    getLabelData()
  }, [])

  useEffect(() => {
    formBranch.setFieldsValue({ district: 'Qu???n G?? V???p' })
    formStore.setFieldsValue({ district: 'Qu???n G?? V???p' })
    formBranch.setFieldsValue({ province: 'H??? Ch?? Minh' })
    formStore.setFieldsValue({ province: 'H??? Ch?? Minh' })
  }, [])

  return (
    <>
      <Modal
        width={650}
        footer={null}
        title="Th??m chi nh??nh v?? c???a h??ng"
        visible={visibleCreate}
        closable={false}
      >
        <Form form={formBranch} layout="vertical">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={(info) => {
              if (info.file.status === 'done') info.file.status = 'done'
              setFileImageBranch(info.file.originFileObj)
              getBase64(info.file.originFileObj, (imageUrl) => setImageBranch(imageUrl))
            }}
          >
            {imageBranch ? (
              <img src={imageBranch} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          <Row justify="space-between" align="middle">
            <Form.Item
              name="name"
              label="T??n chi nh??nh"
              rules={[{ required: true, message: 'Vui l??ng nh???p t??n chi nh??nh!' }]}
            >
              <Input size="large" style={{ width: 250 }} placeholder="Nh???p t??n chi nh??nh" />
            </Form.Item>
            <Form.Item
              name="province"
              label="T???nh/Th??nh ph???"
              rules={[{ required: true, message: 'Vui l??ng nh???p t???nh/th??nh ph???!' }]}
            >
              <Select
                style={{ width: 250 }}
                size="large"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Ch???n t???nh/th??nh ph???"
                onChange={(value) => _getDistrictsBranch({ search: value })}
              >
                {provinces.map((value, index) => (
                  <Select.Option value={value.province_name} key={index}>
                    {value.province_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
          <Row justify="space-between" align="middle">
            <Form.Item
              name="phone"
              label="Li??n h???"
              rules={[{ required: true, message: 'Vui l??ng nh???p li??n h???!' }]}
            >
              <Input size="large" style={{ width: 250 }} placeholder="Nh???p li??n h???" />
            </Form.Item>
            <Form.Item
              name="district"
              label="Qu???n/huy???n"
              rules={[{ required: true, message: 'Vui l??ng nh???p qu???n/huy???n!' }]}
            >
              <Select
                style={{ width: 250 }}
                size="large"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Ch???n qu???n/huy???n"
              >
                {districtsBranch.map((value, index) => (
                  <Select.Option value={value.district_name} key={index}>
                    {value.district_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Form>
        <Divider />
        <Form form={formStore} layout="vertical">
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={(info) => {
              if (info.file.status === 'done') info.file.status = 'done'
              setFileImageStore(info.file.originFileObj)
              getBase64(info.file.originFileObj, (imageUrl) => setImageStore(imageUrl))
            }}
          >
            {imageStore ? (
              <img src={imageStore} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>T???i l??n</div>
              </div>
            )}
          </Upload>
          <Row justify="space-between" align="middle">
            <Form.Item
              name="name"
              label="T??n c???a h??ng"
              rules={[{ required: true, message: 'Vui l??ng nh???p t??n c???a h??ng!' }]}
            >
              <Input size="large" style={{ width: 250 }} placeholder="Nh???p t??n c???a h??ng" />
            </Form.Item>
            <Form.Item
              name="province"
              label="T???nh/Th??nh ph???"
              rules={[{ required: true, message: 'Vui l??ng nh???p t???nh/th??nh ph???!' }]}
            >
              <Select
                style={{ width: 250 }}
                size="large"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Ch???n t???nh/th??nh ph???"
                onChange={(value) => _getDistrictsStore({ search: value })}
              >
                {provinces.map((value, index) => (
                  <Select.Option value={value.province_name} key={index}>
                    {value.province_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
          <Row justify="space-between" align="middle">
            <Form.Item
              name="phone"
              label="Li??n h???"
              rules={[{ required: true, message: 'Vui l??ng nh???p li??n h???!' }]}
            >
              <Input size="large" style={{ width: 250 }} placeholder="Nh???p li??n h???" />
            </Form.Item>
            <Form.Item
              name="district"
              label="Qu???n/huy???n"
              rules={[{ required: true, message: 'Vui l??ng nh???p qu???n/huy???n!' }]}
            >
              <Select
                style={{ width: 250 }}
                size="large"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Ch???n qu???n/huy???n"
              >
                {districtsStore.map((value, index) => (
                  <Select.Option value={value.district_name} key={index}>
                    {value.district_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
          <Row justify="end">
            <Form.Item name="label_id" label="Label">
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: 250 }}
                size="large"
                placeholder="Ch???n label"
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        padding: 8,
                      }}
                    >
                      <Input
                        style={{ flex: 'auto' }}
                        onChange={(e) => setInputLabel(e.target.value)}
                        value={inputLabel}
                      />
                      <a
                        style={{
                          flex: 'none',
                          padding: '8px',
                          display: 'block',
                          cursor: 'pointer',
                        }}
                        onClick={_addLabel}
                      >
                        <PlusOutlined /> Add label
                      </a>
                    </div>
                  </div>
                )}
              >
                {labels.map((l, index) => (
                  <Select.Option
                    value={l.label_id}
                    key={index}
                    style={{ display: !l.active && 'none' }}
                  >
                    {l.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Row>
        </Form>
        <Divider />
        <Row justify="end">
          <Button type="primary" size="large" onClick={onCreate}>
            Th??m
          </Button>
        </Row>
      </Modal>
      <Modal
        title={<div style={{ fontWeight: 600, fontSize: 19 }}>Ch??o m???ng ?????n v???i Admin Order</div>}
        centered
        width={580}
        footer={
          <Row justify="end">
            <Button
              type="primary"
              style={{ width: '7.5rem' }}
              onClick={() => {
                setVisible(false)
                setVisibleCreate(true)
              }}
            >
              Ti???p t???c
            </Button>
          </Row>
        }
        visible={visible}
        closable={false}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 300,
              marginRight: 20,
            }}
          >
            <img
              style={{ width: '100%' }}
              src="https://ecomfullfillment.s3.ap-southeast-1.amazonaws.com/1629652136039_ecomfullfillment_0.png"
              alt=""
            />
          </div>
          <div style={{ color: 'black', fontSize: '1.1rem', fontWeight: 400 }}>
            Ch??o m???ng b???n ?????n v???i t??nh n??ng b??n t???i c???a h??ng. H??y t???o m???t chi nh??nh v?? m???t c???a h??ng
            ????? b???t ?????u vi???c kinh doanh c??ng <span style={{ fontWeight: 700 }}>Admin Order</span>{' '}
            nh??!!!
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalIntro
