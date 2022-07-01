import React, { useState } from 'react'
import styles from './business_user.module.scss'
import { ACTION, ROUTES } from 'consts'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { uploadFile } from 'apis/upload'

//antd
import { Row, Col, notification, Form, Input, Button, Upload, Steps, Result, Modal } from 'antd'

//icons antd
import { UploadOutlined, LoadingOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useStepsForm } from 'sunflower-antd'
//apis

import { addBusiness, verifyOtp, getOtp, validate } from 'apis/business'

function Form_business() {
  const dispatch = useDispatch()
  const { Step } = Steps
  let location = useLocation()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [image1, setImage1] = useState('')
  const [valuesdata, setValuesdata] = useState('')

  const [hidden, setHidden] = useState(false)

  const layout = {
    labelCol: { span: 50 },
    wrapperCol: { span: 50 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
  }
  const item1 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notification.warning({ message: 'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notification.warning({ message: 'Hình ảnh phải có kích thước nhỏ hơn 2MB!' })
    }
    return isJpgOrPng && isLt2M
  }

  const _upload = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      console.log(url)
      setAvatar(url || '')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const _upload2 = async (file) => {
    try {
      setLoading2(true)
      const url = await uploadFile(file)
      console.log(url)
      setImage1(url || '')
      setLoading2(false)
    } catch (error) {
      setLoading2(false)
    }
  }

  const _verifyOtp = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const dataForm = form.getFieldsValue()
      var body = { company_phone: valuesdata.company_phone, otp_code: dataForm.otp }
      const res = await verifyOtp(body)
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Xác thực otp thành công' })
          setHidden(false)
        } else
          notification.warning({
            message:
              res.data.message ||
              `Xác thực OTP thất bại, vui lòng bấm vào 'Gửi lại OTP' để thử lại`,
          })
      } else
        notification.warning({
          message:
            res.data.message || `Xác thực OTP thất bại, vui lòng bấm vào 'Gửi lại OTP' để thử lại`,
        })
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }
  const _sendOtp = async () => {
    try {
      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await getOtp(valuesdata.company_phone)
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Gửi lại otp thành công, vui lòng kiểm tra lại' })
          setHidden(true)
        } else notification.error({ message: 'Gửi lại otp thất bại, vui lòng thử lại' })
      } else notification.error({ message: 'Gửi lại otp thất bại, vui lòng thử lại' })
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }
  const _validateBusinessRegister = async () => {
    try {
      await form.validateFields()
      // dispatch({ type: ACTION.LOADING, data: true })
      const dataForm = form.getFieldsValue()
      var body = {
        company_phone: valuesdata.company_phone,
        business_registration_image: image1,
        tax_code: dataForm.tax_code,
      }
      const res = await validate(body)
      dispatch({ type: ACTION.LOADING, data: false })
      if (res.status === 200) {
        if (res.data.success) {
          notification.success({ message: 'Cập nhật cửa hàng thành công' })
          gotoStep(current + 1)
        } else
          notification.warning({
            message: res.data.message || `Cập nhật cửa hàng thất bại`,
          })
      } else
        notification.warning({
          message: res.data.message || `Cập nhật cửa hàng thất bại`,
        })
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }

  const { form, current, gotoStep, stepsProps, formProps, submit, formLoading } = useStepsForm({
    async submit(values) {
      setValuesdata(values)
      await new Promise((r) => setTimeout(r, 1000))
      return 'ok'
    },
  })
  console.log(valuesdata)

  const _addBusiness = async () => {
    try {
      const body = {
        logo: avatar,
        business_name: valuesdata.business_name,
        company_phone: valuesdata.company_phone,
        company_address: valuesdata.company_address,
        company_website: valuesdata.company_website,
        // company_district: '',
        // company_province: '',
        career_id: valuesdata.career_id,
        business_registration_image: image1,
        business_registration_number: valuesdata.business_registration_number,
        tax_code: valuesdata.tax_code,
      }

      // dispatch({ type: ACTION.LOADING, data: true })
      const res = await addBusiness(body)
      if (res.status === 200) {
        if (res.data.success) {
          notification.info({ message: 'Bạn đã đăng ký cửa hàng, hãy xác thông tin' })
          gotoStep(current + 1)
        }
      } else {
        notification.error({
          message: res.data.message || 'Đăng kí không thành công, vui lòng thử lại',
        })
      }
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    _addBusiness()
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const removeAvatar = () => {
    setAvatar('')
  }

  const formList = [
    <Row>
      <div
        id="TTCH"
        
        className={styles['card-overview']}
      >
        <Form form={form}>
          <Col>
            <Form.Item
              label="Tên cửa hàng"
              name="business_name"
              {...item1}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên cửa hàng!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Số điện thoại"
              name="company_phone"
              {...item1}
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                {
                  pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/),
                  message: 'Vui lòng nhập số điện thoại đúng định dạng',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Địa chỉ" name="company_address" {...item1}>
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Website" name="company_website" {...item1}>
              <Input />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Ngành nghề"
              name="career_id"
              {...item1}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngành nghề!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Logo" name="logo" {...item1} style={{ display: 'flex' }}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                data={_upload}
                onRemove={removeAvatar}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    style={{ width: 130, height: 100, objectFit: 'cover' }}
                  />
                ) : (
                  <Button icon={<UploadOutlined />}>Upload</Button>
                )}
              </Upload>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Mã số đăng ký" name="business_registration_number" {...item1}>
              <Input />
            </Form.Item>
          </Col>

          <Form.Item style={{ marginTop: 40, textAlign: 'center' }}>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#d1d1e0',
                fontWeight: 'bold',
              }}
              onClick={() => gotoStep(current - 1)}
            >
              Hủy bỏ
            </Button>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#1e4db7',
                fontWeight: 'bold',
                border: 'none',
              }}
              type="primary"
              loading={formLoading}
              onClick={() => {
                submit().then((result) => {
                  if (result === 'ok') {
                    showModal()
                  }
                })
              }}
            >
              Lưu thông tin
            </Button>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <h1>Đăng ký cửa hàng !!!</h1>
            </Modal>
          </Form.Item>
        </Form>
      </div>
    </Row>,
    <Row>
      <div
        id="TTKD"
        
        className={styles['card-overview']}
      >
        <Form form={form}>
          <Col>
            <Form.Item label="Xác nhận SĐT" {...item1}>
              <h2 style={{ marginLeft: 10 }}>{valuesdata.company_phone}</h2>
            </Form.Item>
          </Col>
          <Col style={{ display: 'flex', marginLeft: 345 }}>
            <Form.Item
              label="Mã OTP"
              name="otp"
              {...item1}
              rules={[
                {
                  required: true,
                  message: 'Thiếu OTP!',
                },
              ]}
            >
              <Input
                style={{ width: 160 }}
                size="middle"
                onPressEnter={_verifyOtp}
                maxLength="6"
                placeholder="Mã OTP"
              />
            </Form.Item>
            {!hidden ? (
              <Button className={styles['otp-button']} onClick={_sendOtp}>
                Gửi OTP
              </Button>
            ) : (
              <Button className={styles['otp-button']} onClick={_verifyOtp}>
                Xác thực OTP
              </Button>
            )}
          </Col>
        </Form>
        <Form form={form}>
          <Col>
            <Form.Item label="Đăng ký kinh doanh" name="business_registration_image" {...item1}>
              <Upload
                name="image1"
                listType="picture-card"
                className={styles['ant-upload-select']}
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // data={_upload2}
                // beforeUpload={beforeUpload}
              >
                {image1 ? (
                  <img
                    src={image1}
                    alt="image1"
                    style={{ width: 356, height: 178, objectFit: 'cover' }}
                  />
                ) : (
                  <div>
                    {loading2 ? <LoadingOutlined /> : <UploadOutlined />}
                    <div style={{ marginTop: 8 }}>Tải ảnh giấy đăng ký kinh doanh lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Mã số thuế"
              name="tax_code"
              {...item1}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã số thuế!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <div
            className={styles['containerItemUpload']}
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          ></div>
          <Form.Item style={{ marginTop: 40, textAlign: 'center' }}>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#d1d1e0',
                fontWeight: 'bold',
              }}
              onClick={() => gotoStep(current - 1)}
            >
              Hủy bỏ
            </Button>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#1e4db7',
                fontWeight: 'bold',
              }}
              type="primary"
              loading={formLoading}
              onClick={_validateBusinessRegister}
            >
              Lưu thông tin
            </Button>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#00ff99',
                fontWeight: 'bold',
              }}
            >
              Vào cửa hàng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Row>,
  ]

  return (
    <div className={styles['container']}>
      <h2 style={{ fontSize: 30, height: 50 }}>Tạo cửa hàng</h2>
      <div className={styles['title']}>
        <div className={styles['title1']}>
          <h1 style={{ marginTop: 20 }}>
            Để tạo cửa hàng thành công vui lòng hoàn thành 2 bước sau:
          </h1>
          <p style={{ marginLeft: 20 }}>1. Thông tin cửa hàng</p>
          <p style={{ marginLeft: 20 }}>2. Xác thực thông tin </p>
        </div>

        <div className={styles['title2']}>
          <p>- Ứng với mỗi tài khoản Ekata chỉ có thể tạo được 1 cửa hàng</p>
          <p>
            - Từ cửa hàng thứ 2 trở đi, bạn vui lòng đăng ký thêm số điện thoại (khác số điện thoại
            đăng nhập, chưa được đăng ký tài khoản Ekata) để thực hện mở của hàng
          </p>
          <p>
            Dữ liệu của cửa hàng nếu chưa được hoàn thành xác thực thông tin thì chỉ có thể tồn tại
            tối đa 60 ngày (kể từ ngày ghi nhận giao dịch cuối cùng của cửa hàng đó)
          </p>
        </div>
      </div>

      <Steps type="navigation" {...stepsProps}>
        <Step title="Thông tin cửa hàng" />
        <Step title="Xác thực thông tin " />
        <Step title="Trạng thái xác thực" />
      </Steps>
      <div>
        <Form {...layout} {...formProps}>
          {formList[current]}
        </Form>

        {current === 2 && (
          <div className={styles['result']}>
            <img className={styles['image-result']} src="https://www.33finance.com/wp-content/uploads/2022/01/physical-store-300x255.png"></img>
            <div>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#d1d1e0',
                fontWeight: 'bold',
              }}
            >
              Hủy bỏ
            </Button>
            <Button
              style={{
                marginRight: 10,
                width: 150,
                height: 50,
                background: '#1e4db7',
                fontWeight: 'bold',
                border: 'none',
              }}
            >
              Lưu thông tin
            </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Form_business
