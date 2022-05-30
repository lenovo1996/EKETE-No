import React, { useEffect, useState } from 'react'
import styles from './overview.module.scss'
import { ACTION, ROUTES } from 'consts'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { uploadFile } from 'apis/upload'

//antd
import { Row, Col, notification, Form, Input, Button, Upload, Steps, message, PageHeader, Result } from 'antd'

//icons antd
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { useStepsForm } from 'sunflower-antd';
//apis

import { addBusiness } from 'apis/business'
import { getEmployees } from 'apis/employee'
import { verify, getOtp } from 'apis/auth'
import FormItem from 'antd/lib/form/FormItem'


function Overview() {

  const dispatch = useDispatch()
  let history = useHistory()
  const { Step } = Steps;
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [loading3, setLoading3] = useState(false)
  const [image, setImage] = useState('')
  const [avatar, setAvatar] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [form] = Form.useForm()
  const [user, setUser] = useState({})
  const layout = {
    labelCol: { span: 50 },
    wrapperCol: { span: 50 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const formItem = {
    labelCol: { span: 7 },
    wrapperCol: { span: 8 }
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      notification.warning({ message: 'Bạn chỉ có thể tải lên tệp JPG / PNG / JPEG!' });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notification.warning({ message: 'Hình ảnh phải có kích thước nhỏ hơn 2MB!' });
    }
    return isJpgOrPng && isLt2M;
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
  const _upload1 = async (file) => {
    try {
      setLoading1(true)
      const url = await uploadFile(file)
      console.log(url)
      setImage(url || '')
      setLoading1(false)
    } catch (error) {
      setLoading1(false)
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
  const _upload3 = async (file) => {
    try {
      setLoading3(true)
      const url = await uploadFile(file)
      console.log(url)
      setImage2(url || '')
      setLoading3(false)
    } catch (error) {
      setLoading3(false)
    }
  }

  const _addBusiness = async (dataForm) => {
    try {
      const body = {
        ...dataForm,
        logo: dataForm.logo,
        business_name: dataForm.business_name,
        first_name: '',
        last_name: dataForm.business_name,
        company_phone: dataForm.company_phone,
        birthday: '',
        address: dataForm.company_address,
        company_website: dataForm.company_website,
        ward: '',
        district: '',
        province: '',
        company_name: '',
        company_website: '',
        career_id: dataForm.career,
        tax_code: dataForm.tax_code,
        fax: '',
        branch: '',
        business_areas: '',
      }

      dispatch({ type: ACTION.LOADING, data: true })
      const res = await addBusiness(body)
      if (res.status === 200) {
        if (res.data.success) {
          notification.info({ message: 'Mã otp đã được gửi về số điện thoại của bạn' })
          history.push({ pathname: ROUTES.OTP, state: res.data.data })
        }
      } else
        notification.error({
          message: res.data.message || 'Đăng kí không thành công, vui lòng thử lại',
        })
      dispatch({ type: ACTION.LOADING, data: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION.LOADING, data: false })
    }


  }

  const {
    form1,
    current,
    gotoStep,
    stepsProps,
    formProps,
    submit,
    formLoading,
  } = useStepsForm({
    async submit(values) {
      const { business_name, company_phone, company_address, company_website, logo, career, CMND, avatar3, Business_Registration, avatar1, tax_code, avatar2 } = values;
      console.log(business_name, company_phone, company_address, company_website, logo, career, CMND, Business_Registration, tax_code, avatar3, avatar1, avatar2);
      await new Promise(r => setTimeout(r, 1000));
      return 'ok';
    },
    total: 6,
  });
  const formList = [
    <div id='HDSD' style={{ marginTop: 5, marginLeft: 2, height: 500, marginBottom: 15, width: '100%' }} className={styles['card-overview']}>
      <h1 style={{ marginTop: 100 }}>Để tạo cửa hàng thành công vui lòng hoàn thành 2 bước sau: </h1>
      <h1>1. Thông tin cửa hàng</h1>
      <h1>2. Xác thực thông tin </h1><br></br>
      <h1>- Ứng với mỗi tài khoản Ekata chỉ có thể tạo được 1 cửa hàng</h1>
      <h1>- Từ cửa hàng thứ 2 trở đi, bạn vui lòng đăng ký thêm số điện thoại(khác số điện thoại đăng nhập, chưa được đăng ký tài khoản Ekata) để thực hện mở của hàng</h1>
      <h1>Dữ liệu của cửa hàng nếu chưa được hoàn thành xác thực thông tin thì chỉ có thể tồn tại tối đa 60 ngày(kể từ ngày ghi nhận giao dịch cuối cùng của cửa hàng đó)</h1>
      <Form.Item {...tailLayout} style={{ marginTop: 100 }}>
        <Button type='primary' onClick={() => gotoStep(current + 1)}>Next</Button>
      </Form.Item>
    </div>,
    <Row >
      <div id='TTCH' style={{ marginTop: 5, marginLeft: 2, height: 500, marginBottom: 15, width: '100%' }} className={styles['card-overview']} >

        <>
          <Col >
            <Form.Item label="Tên cửa hàng" name="business_name" {...formItem}
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
            <Form.Item label="Số điện thoại" name="company_phone" {...formItem}
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                {
                  pattern: new RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/),
                  message: 'Vui lòng nhập số điện thoại đúng định dạng',
                },
              ]}
            >
              <Input />
            </Form.Item >
          </Col>
          <Col>
            <Form.Item label="Địa chỉ" name="company_address" {...formItem} >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Website" name="company_website" {...formItem} >
              <Input />
            </Form.Item>
          </Col>
          <Col>

            <Form.Item label="Logo" name="logo" {...formItem} >

              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                data={_upload}
                beforeUpload={beforeUpload}
              >
                {avatar ? (
                  <img src={avatar} alt="avatar" style={{ width: 130, height: 130, objectFit: 'cover' }} />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <UploadOutlined />}
                    <div style={{ marginTop: 8 }}>Tải lên </div>
                  </div>
                )}
              </Upload>

            </Form.Item>

          </Col>
          <Col>
            <Form.Item label="Ngành nghề" name="career" {...formItem}
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
          <Form.Item {...tailLayout}>
            <Button
              style={{ marginRight: 10 }}
              type="primary"
              loading={formLoading}

              onClick={() => {
                submit().then(result => {
                  if (result === 'ok') {
                    gotoStep(current + 1);
                  }
                });
              }}
            >
              Submit
            </Button>
            <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
          </Form.Item>
        </>

      </div>
    </Row>,
    <div id='XTOTP' style={{ marginTop: 5, marginLeft: 2, height: 500, marginBottom: 15, width: '100%' }} className={styles['card-overview']}>
      <Form form={form} style={{ marginTop: 15, width: '80%' }}>
        <Form.Item name="otp" rules={[{ required: true, message: 'Bạn chưa nhập mã OTP' }]}>
          <Input
            size="large"
            // onPressEnter={_verifyAccount}
            className={styles['input']}
            maxLength="6"
            placeholder="Nhập mã xác thực OTP"
          />
        </Form.Item>
        <Row wrap={false} align="end" style={{ color: 'white' }}>
          <div>Bạn chưa nhận được mã?</div>
          <p className={styles['otp-content-resent']}>
            Gửi lại OTP
          </p>
        </Row>
      </Form>
      <Button
        size="large"
        type="primary"
        className={styles['otp-button']}
      // onClick={_verifyAccount}
      >
        Xác thực
      </Button>
    </div>,
    <Row>
      <div id='TTKD' style={{ marginTop: 5, marginLeft: 2, height: 1000, marginBottom: 15, width: '100%' }} className={styles['card-overview']}>
        <>
          <Col >
            <Form.Item label="CMND/CCCD" name="CMND" {...formItem}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số CMND/CCCD!',

                },
              ]}
            >
              <Col >
                <Input />
              </Col>

            </Form.Item>
          </Col>
          <Col >
            <Form.Item name="avatar1" {...formItem} style={{ marginLeft: 600}}>
              <Col>
                <Upload

                  name="avatar1"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={true}
                  data={_upload1}
                  beforeUpload={beforeUpload}
                >
                  {image ? (
                    <img src={image} alt="avatar1" style={{ width: 130, height: 130, objectFit: 'cover' }} />
                  ) : (
                    <div>
                      {loading ? <LoadingOutlined /> : <UploadOutlined />}
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  )}
                </Upload>
              </Col>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="Đăng ký kinh doanh" name="Business_Registration" {...formItem}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập đăng ký kinh doanh!',
                },
              ]}>
              
                <Col >
                  <Input />
                </Col>
            </Form.Item>
          </Col>
          <Col style={{marginLeft:600  }} >
            <formItem name="avartar2" {...formItem}   >
              <Col>
                <Upload
                  name="avatar2"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  data={_upload2}
                  beforeUpload={beforeUpload}
                >
                  {image1 ? (
                    <img src={image1} alt="avatar2" style={{ width: 130, height: 130, objectFit: 'cover' }} />
                  ) : (
                    <div>
                      {loading2 ? <LoadingOutlined /> : <UploadOutlined />}
                      <div style={{ marginTop: 8 }}>Tải lên</div>
                    </div>
                  )}
                </Upload>
              </Col>
            </formItem>
          </Col>

        <Col>
          <Form.Item label="Mã số thuế" name="tax_code" {...formItem}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã số thuế!',
              },
            ]}>
            
              <Col >
                <Input />
              </Col>
              </Form.Item>
              </Col>
              <Col>
              <FormItem name="avatar3" {...formItem} style={{ marginLeft: 600 }}>
                <Col>
                  <Upload
                    name="avatar3"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    data={_upload3}
                    beforeUpload={beforeUpload}
                  >
                    {image2 ? (
                      <img src={image2} alt="avatar3" style={{ width: 130, height: 130, objectFit: 'cover' }} />
                    ) : (
                      <div>
                        {loading3 ? <LoadingOutlined /> : <UploadOutlined />}
                        <div style={{ marginTop: 8 }}>Tải lên</div>
                      </div>
                    )}
                  </Upload>
                </Col>
              </FormItem>
            
          
        </Col>
        <Form.Item {...tailLayout} style={{marginTop: 50}}>
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            loading={formLoading}

            onClick={() => {
              submit().then(result => {
                if (result === 'ok') {
                  gotoStep(current + 1);
                }
              });
            }}
          >
            Submit
          </Button>
          <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
        </Form.Item>

      </>
    </div>
    </Row > 
    
      
    ];

  return (
    <div>
      <Steps {...stepsProps} style={{ marginTop: 10 }}>
        <Step title="Hướng dẫn sử dụng" />
        <Step title="Thông tin cửa hàng" />
        <Step title="Xác thực số điện thoại" />
        <Step title="Thông tin kinh doanh" />
        <Step title="Hoàn thành" />
      </Steps>
      <div style={{ marginTop: 100 }}>
        <Form {...layout} {...formProps} >
          {formList[current]}
        </Form>

        {current === 4 && (
          <Result
            status="success"
            title="Submit is succeed!"
            extra={
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    form1.resetFields();
                    gotoStep(0);
                  }}
                >
                  Về trang chủ
                </Button>
                <Button>Vào cửa hàng</Button>
              </>
            }
          />
        )}
      </div>
    </div>
  )
}
export default Overview


