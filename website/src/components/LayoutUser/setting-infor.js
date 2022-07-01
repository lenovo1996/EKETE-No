import React, { useState, useEffect } from 'react'
import styles from './settinginfor.module.scss'
import moment from 'moment'
import cccd1 from 'assets/icons/CCCD1.png'
import cccd2 from 'assets/icons/CCCD2.png'
import { useHistory } from 'react-router-dom'
import { Avatar, Button, Table, Tabs, List, notification, Image } from 'antd'
import {
  Row,
  Col,
  Timeline,
  Modal,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumbe,
  Upload,
  message,
} from 'antd'
import {
  HeartOutlined,
  WechatOutlined,
  ShareAltOutlined,
  SettingOutlined,
  InboxOutlined,
  UploadOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'
import { updateuserEKT, getuserEKT } from 'apis/user-ekt'
import { uploadFile } from 'apis/upload'
const { Meta } = Card
const { Option } = Select
const { Dragger } = Upload
export default function SettingInfor({ reload }) {
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  // const [loading2, setLoading2] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState([])
  const toggle = () => setVisible(!visible)
  const history = useHistory()

  const _updateUser = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()
      const body = {
        ...dataForm,
        avatar: avatar,
        image1: image1,
        image2: image2,
      }
      setLoading(true)
      let res
      if (history.location.state) res = await updateuserEKT(body, history.location.state.user_id)
      // const res = await updateuserEKT(body, user && user.user_id)
      if (res.status === 200) {
        if (res.success) {
          toggle()
          reload()
          notification.success({ message: 'Cập nhật thông tin cá nhân thành công' })
          reload({ user_id: res.user_id })
        } else
          notification.success({
            message: res.data.message || 'Cập nhật thông tin cá nhân thành công',
            
          })
          reload({ user_id: res.user_id })

      } else
        notification.error({ message: res.data.message || 'Cập nhật thông tin cá nhân không thành công' })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  useEffect(() => {
    console.log('user nè ', history.location.state)
    if (history.location.state) {
      form.setFieldsValue({
        nam_identification: history.location.state.nam_identification,
        name_display: history.location.state.name_display,
        web: history.location.state.web,
        bio: history.location.state.bio,
        email: history.location.state.email,
        phone: history.location.state.phone,
        gender: history.location.state.gender,
        avatar: history.location.state.avatar,
        image1: history.location.state.image1,
        image2: history.location.state.image2,
        birthday: moment(history.location.state.birthday),
        card_type: history.location.state.card_type,
        id_card: history.location.state.id_card,
        location_card: history.location.state.location_card,
        date_card: moment(history.location.state.date_card),
      })
    }
  }, [])

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
      console.log(error)
    }
  }
  const _upload2 = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      // console.log(url)
      setImage1(url || '')
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const _upload3 = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      // console.log(url)
      setImage2(url || '')
      setLoading(false)
      
    } catch (error) {
      setLoading(false)
      
    }
  }

  useEffect(() => {
    if (visible)
      if (user) {
        form.setFieldsValue({ ...user })
        setAvatar(user.avatar || '')
        setImage1(user.image1 || '')
        setImage2(user.image2 || '')
      }
  }, [visible])

  return (
    <div className={styles['container-layout-setting']}>
      <div className={styles['font-bold']}>Thiết lập thông tin cá nhân </div>

      <div>
        {/* <div onClick={toggle}>{children}</div> */}
        <div
          style={{
            marginLeft: 0,
            marginTop: 0,
            width: 1123,
            height: '100%',
            marginBottom: 15,
          }}
          className={styles['card-overview']}
        >
          <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
            <Tabs centered>
              <Tabs.TabPane tab="Thiết lập thông tin" key="1">
                <div style={{ width: '100%', overflowY: 'scroll' }}>
                  <div className={styles['container']}>
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              color: '#FFF',
                              backgroundColor: '#FDAA3E',
                              width: 72,
                              height: 72,
                            }}
                            src={avatar}
                          />
                        }
                        title={<p className={styles['meta-name']}>Nguyễn Ngọc Hà</p>}
                        description={<a>Thay đổi ảnh đại diện</a>}
                      />
                    </List.Item>
                    <Form
                      form={form}
                      layout="horizontal"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 24 }}
                      style={{ marginTop: 20 }}
                    >
                      <Form.Item label="Tên hiển thị" className={styles['margin-bottom']}>
                        <Form.Item className={styles['width-input']} name="name_display">
                          <Input placeholder="Nhập tên hiển thị"></Input>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="Tên định danh" className={styles['margin-bottom']}>
                        <Form.Item className={styles['width-input']} name="nam_identification">
                          <Input placeholder="Nhập tên định danh"></Input>
                        </Form.Item>
                      </Form.Item>
                      <div className={styles['content']} style={{ marginLeft: '18%' }}>
                        <p>
                          Hãy lấy tên mà bạn thường dùng để tài khoản của bạn dễ tìm thấy hơn. Đó có
                          thể là tên đầy đủ, biệt danh hoặc tên doanh nghiệp. Bạn chỉ có thể đổi tên
                          mình 2 lần trong vòng 14 ngày.
                          <a>Tìm hiểu thêm.</a>
                        </p>
                      </div>
                      <Form.Item label="Website" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item className={styles['width-input']} name="web">
                            <Input placeholder="Nhập website " />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="Bio" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item className={styles['width-input']} name="bio">
                            <Input.TextArea rows={4} placeholder="Nhập nội dung " />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>

                      <Form.Item label="Email" name="email" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item name="email" className={styles['width-input']}>
                            <Input placeholder="Nhập email " />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        className={styles['margin-bottom']}
                      >
                        <Input.Group compact>
                          <Form.Item name="phone" className={styles['width-input']}>
                            <Input placeholder="Nhập số điện thoại " />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="Giới tính" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item className={styles['width-input']} name="gender">
                            <Select placeholder="Chọn giới tính">
                              <Option value="Nam">Nam</Option>
                              <Option value="Nữ">Nữ</Option>
                              <Option value="Khác">Khác</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item label="Ngày sinh" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item name="birthday">
                            <DatePicker className={styles['width-input']} />
                          </Form.Item>
                          <Form.Item
                            noStyle
                            // rules={[{ required: true, message: 'Province is required' }]}
                          >
                            <Select placeholder="Trạng thái" style={{ width: 120, marginLeft: 10 }}>
                              <Option value="1">Công khai</Option>
                              <Option value="2">Riêng tư</Option>
                            </Select>
                          </Form.Item>
                        </Input.Group>
                      </Form.Item>

                      <Form.Item {...tailLayout}>
                        <Button
                          htmlType="submit"
                          type="primary"
                          className={styles['button-push']}
                          loading={loading}
                          onClick={_updateUser}
                        >
                          Lưu thông tin
                        </Button>
                        <Button htmlType="button" className={styles['button-push']}>
                          Huỷ bỏ
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Xác thực" key="2">
                <div style={{ width: '100%', paddingTop: 10 }}>
                  <div className={styles['container-accuracy']}>
                    <div className={styles['container-guide']}>
                      <div className={styles['container-item']}>
                        <p className={styles['title-item']}>
                          Xác thực CMND mang lại những lợi ích gì?
                        </p>
                        <p className={styles['content-item']}>
                          Được tạo cửa hàng và sử dụng miễn phí phần mềm quản lý bán hàng Đảm bảo
                          hoàn toàn độ tin cậy đối với khách hàng và cửa hàng.
                        </p>
                        <p className={styles['content-item']}>
                          Quá trình thanh toán nhanh hơn, các vấn đề tài khoản hay khó khăn khi làm
                          việc có thể được giải quyết nhanh chóng.
                        </p>
                      </div>
                      <div className={styles['container-item']}>
                        <p className={styles['title-item']}>Chụp CMND như thế nào cho đúng cách?</p>
                        <p className={styles['content-item']}>
                          1. CMND được chụp chính diện, không nghiêng ngả.
                        </p>
                        <p className={styles['content-item']}>
                          {' '}
                          2. Chụp trên nền mầu trắng, không bị xen lẫn chữ hay hình vẽ.{' '}
                        </p>
                        <p className={styles['content-item']}>
                          4. Xoay ảnh đúng chiều đọc được khi chụp xong.
                        </p>
                        <p className={styles['content-item']}>
                          3. Ảnh chụp CMND phải thấy hết toàn bộ CMND, không bị cắt{' '}
                        </p>
                      </div>
                      <div className={styles['container-item']}>
                        <p className={styles['title-item']}> Làm cách nào để xác thực CMND?</p>
                        <p className={styles['content-item']}>
                          Scan và đăng lên Ảnh CMND cả 2 mặt.
                        </p>
                        <p className={styles['content-item']}>
                          Điền đầy đủ, chính xác Số CMND, Ngày cấp, Nơi cấp.
                        </p>
                        <p className={styles['content-item']}> Bấm nút Lưu thông tin CMND.</p>
                        <p className={styles['content-item']}> Bấm nút Xác thực CMND.</p>
                        <p className={styles['content-item']}>
                          {' '}
                          Ekata sẽ xác thực trong vòng 72 tiếng.
                        </p>
                      </div>
                    </div>
                    <div
                      className={styles['dashboard_manager_bottom_row_col_parent_top']}
                      style={{ marginBottom: 28, marginTop: 24 }}
                    ></div>
                    <div>
                      <Form
                        layout="horizontal"
                        form={form}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 24 }}
                      >
                        <div className={styles['container-input']}>
                          <Form.Item
                            name="card_type"
                            label="Loại thẻ"
                            // rules={[{ required: true }]}
                            className={styles['width-input-xt']}
                          >
                            <Select placeholder="Chọn loại thẻ xác thực ">
                              <Option value="CCCD">CCCD</Option>
                              <Option value="CMND">CMND</Option>
                              <Option value="Hộ chiếu">Hộ chiếu</Option>
                            </Select>
                          </Form.Item>
                        </div>
                        <div className={styles['container-guide']}>
                          <div className={styles['conyainer-form']}>
                            <div style={{ display: 'flex' }}>
                              <div className={styles['container-node']}>
                                <div className={styles['node-title']}>Hình ảnh mặt trước</div>
                                <div className={styles['node-describe']}>
                                  Kích thước 10MB. Định dạng jpg, jpeg, png, gif. Độ phân giải tối
                                  thiểu 1200x1200px
                                </div>
                              </div>
                              <Form.Item
                                valuePropName="fileList"
                                // getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload
                                  name="image1"
                                  listType="picture-card"
                                  // className="avatar-uploader"
                                  className={styles['ant-upload-select']}
                                  showUploadList={false}
                                  beforeUpload={beforeUpload}
                                  data={_upload2}
                                  // onChange={handleChange}
                                >
                                  {image1 ? (
                                    <img
                                      src={image1}
                                      alt="image1"
                                      style={{ width: '100%', height: 178, objectFit: 'cover', borderRadius: 18 }}
                                    />
                                  ) : (
                                    <div>
                                      {loading ? <LoadingOutlined /> : null}
                                      <div >
                                        <div>
                                          {' '}
                                          <Avatar
                                            className={styles['container-icon-image']}
                                            // style={{ width: 54, height: 39 }}
                                            src={cccd1}
                                          />
                                        </div>
                                        <div className={styles['text-upload']}>Mặt trước</div>
                                      </div>
                                    </div>
                                  )}
                                </Upload>
                              </Form.Item>
                            </div>
                            <div className={styles['container-input']}>
                              <Form.Item
                                label="Mã số ID"
                                // style={{marginBottom: 0}}
                                className={styles['margin-bottom']}
                              >
                                <Form.Item className={styles['width-input']} name="id_card">
                                  <Input placeholder="Nhập mã số ID của bạn"></Input>
                                </Form.Item>
                              </Form.Item>
                              <Form.Item
                                label="Họ và tên"
                                // style={{marginBottom: 0}}
                                className={styles['margin-bottom']}
                              >
                                <Form.Item
                                  className={styles['width-input']}
                                  name="nam_identification"
                                >
                                  <Input placeholder="Nhập họ và tên"></Input>
                                </Form.Item>
                              </Form.Item>
                              <Form.Item label="Ngày sinh" name="birthday">
                                <DatePicker className={styles['width-input']} />
                              </Form.Item>
                            </div>
                          </div>
                          <div>
                          <div style={{ display: 'flex' }}>
                              <div className={styles['container-node']}>
                                <div className={styles['node-title']}>Hình ảnh mặt trước</div>
                                <div className={styles['node-describe']}>
                                  Kích thước 10MB. Định dạng jpg, jpeg, png, gif. Độ phân giải tối
                                  thiểu 1200x1200px
                                </div>
                              </div>
                              <Form.Item
                                valuePropName="fileList"
                                // getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload
                                  name="image2"
                                  listType="picture-card"
                                  // className="avatar-uploader"
                                  className={styles['ant-upload-select']}
                                  showUploadList={false}
                                  beforeUpload={beforeUpload}
                                  data={_upload3}
                                  // onChange={handleChange}
                                >
                                  {image2 ? (
                                    <img
                                      src={image2}
                                      alt="image2"
                                      style={{ width: '100%', height: 178, objectFit: 'cover', borderRadius: 18 }}
                                    />
                                  ) : (
                                    <div>
                                      {loading ? <LoadingOutlined /> : null}
                                      <div >
                                        <div>
                                          {' '}
                                          <Avatar
                                            className={styles['container-icon-image']}
                                            // style={{ width: 54, height: 39 }}
                                            src={cccd1}
                                          />
                                        </div>
                                        <div className={styles['text-upload']}>Mặt trước</div>
                                      </div>
                                    </div>
                                  )}
                                </Upload>
                              </Form.Item>
                            </div>
                            <div className={styles['container-input']}>
                              <Form.Item label="Ngày cấp" name="date_card">
                                <DatePicker className={styles['width-input']} />
                              </Form.Item>
                              <Form.Item
                                label="Nơi cấp"
                                // style={{marginBottom: 0}}
                                className={styles['margin-bottom']}
                              >
                                <Form.Item className={styles['width-input']} name="location_card">
                                  <Input placeholder="Nhập nơi cấp"></Input>
                                </Form.Item>
                              </Form.Item>
                            </div>
                          </div>
                        </div>

                        <Form.Item {...tailLayout}>
                          <Button
                            htmlType="submit"
                            type="primary"
                            className={styles['button-push']}
                            loading={loading}
                            onClick={_updateUser}
                          >
                            Lưu thông tin
                          </Button>
                          <Button htmlType="button" className={styles['button-push']}>
                            Huỷ bỏ
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
