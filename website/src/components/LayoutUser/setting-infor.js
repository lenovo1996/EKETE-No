import React from 'react'
import styles from './settinginfor.module.scss'

import { Avatar, Button, Table, Tabs, List } from 'antd'
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
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'

const { Meta } = Card
const { Option } = Select
const { Dragger } = Upload
export default function SettingInfor() {
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 100 }} placeholder="Trạng thái">
        <Option value="1">Công khai</Option>
        <Option value="2">Riêng tư</Option>
      </Select>
    </Form.Item>
  )
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  return (
    <div className={styles['container-layout-setting']}>
      <div className={styles['font-bold']}>Thiết lập thông tin cá nhân </div>

      <div>
        <div
          style={{
            marginLeft: 0,
            marginTop: 0,
            width: 1000,
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
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                          />
                        }
                        title={<p className={styles['meta-name']}>Nguyễn Ngọc Hà</p>}
                        description={<a>Thay đổi ảnh đại diện</a>}
                      />
                    </List.Item>
                    <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 24 }} style={{marginTop: 20}}>
                      <Form.Item
                        label="Tên hiển thị"
                        // style={{marginBottom: 0}}
                        className={styles['margin-bottom']}
                      >
                        <Form.Item className={styles['width-input']}>
                          <Input placeholder="Nhập tên hiển thị"></Input>
                        </Form.Item>
                      </Form.Item>
                      <Form.Item label="Tên định danh" className={styles['margin-bottom']}>
                        <Form.Item className={styles['width-input']}>
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
                          <Form.Item className={styles['width-input']}>
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
                          <Form.Item className={styles['width-input']}>
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
                      <Form.Item label="Email" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item className={styles['width-input']}>
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
                      <Form.Item label="Số điện thoại" className={styles['margin-bottom']}>
                        <Input.Group compact>
                          <Form.Item className={styles['width-input']}>
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
                          <Form.Item className={styles['width-input']}>
                            <Select placeholder="Chọn giới tính">
                              <Option value="1">Nam</Option>
                              <Option value="2">Nữ</Option>
                              <Option value="3">Khác</Option>
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
                          <Form.Item>
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
                        <Button htmlType="submit" type="primary" className={styles['button-push']}>
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
                      <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
                        <Form.Item
                          name="loaithe"
                          label="Loại thẻ"
                          // rules={[{ required: true }]}
                          className={styles['width-input-xt']}
                        >
                          <Select placeholder="Chọn loại thẻ xác thực ">
                            <Option value="1">CCCD</Option>
                            <Option value="2">CMND</Option>
                            <Option value="3">Hộ chiếu</Option>
                          </Select>
                        </Form.Item>
                        <div className={styles['container-guide']}>
                          <div className={styles['conyainer-form']}>
                            <Form.Item className={styles['width-input-xt']}>
                              <Form.Item
                                name="dragger"
                                valuePropName="fileList"
                                // getValueFromEvent={normFile}
                                noStyle
                              >
                                <Upload.Dragger name="files" action="/upload.do">
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">Hình ảnh mặt trước</p>
                                  <p>
                                    Kích thước nhỏ hơn 10mb Định dạng jpg, jpeg, png, gif. Độ phân
                                    giải tối thiểu 1200x1200px
                                  </p>
                                </Upload.Dragger>
                              </Form.Item>
                            </Form.Item>
                            <Form.Item
                              label="Mã số ID"
                              // style={{marginBottom: 0}}
                              className={styles['margin-bottom']}
                            >
                              <Form.Item className={styles['width-input']}>
                                <Input placeholder="Nhập mã số ID của bạn"></Input>
                              </Form.Item>
                            </Form.Item>
                            <Form.Item
                              label="Họ và tên"
                              // style={{marginBottom: 0}}
                              className={styles['margin-bottom']}
                            >
                              <Form.Item className={styles['width-input']}>
                                <Input placeholder="Nhập họ và tên"></Input>
                              </Form.Item>
                            </Form.Item>
                            <Form.Item label="Ngày sinh">
                              <DatePicker className={styles['width-input']} />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item className={styles['width-input-xt']} >
                              <Form.Item
                                name="dragger"
                                valuePropName="fileList"
                                // getValueFromEvent={normFile}
                                noStyle
                                // style={{background: "#ccc"}}
                              >
                                <Upload.Dragger name="files" action="/upload.do" >
                                  <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                  </p>
                                  <p className="ant-upload-text">Hình ảnh mặt sau</p>
                                  <p>
                                    Kích thước nhỏ hơn 10MB Định dạng jpg, jpeg, png, gif. Độ phân
                                    giải tối thiểu 1200x1200px
                                  </p>
                                </Upload.Dragger>
                              </Form.Item>
                            </Form.Item>
                            <Form.Item label="Ngày cấp">
                              <DatePicker className={styles['width-input']} />
                            </Form.Item>
                            <Form.Item
                              label="Nơi cấp"
                              // style={{marginBottom: 0}}
                              className={styles['margin-bottom']}
                            >
                              <Form.Item className={styles['width-input']}>
                                <Input placeholder="Nhập nơi cấp"></Input>
                              </Form.Item>
                            </Form.Item>
                          </div>
                        </div>

                        <Form.Item {...tailLayout}>
                          <Button
                            htmlType="submit"
                            type="primary"
                            className={styles['button-push']}
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
