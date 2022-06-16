import React from 'react'
import styles from './infor.module.scss'
import { Avatar, Button, Table, Tabs, List } from 'antd'
import { Row, Col, Timeline, Modal, Card, Form, Input, Select, DatePicker } from 'antd'
import { HeartOutlined, WechatOutlined, ShareAltOutlined, SettingOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { ACTION, ROUTES_USER, PERMISSIONS, LOGO_DEFAULT } from 'consts'

const { Meta } = Card
export default function SettingInfor() {
  return (
    <div className={styles['container-layout-setting']}>
      <div className={styles['dashboard_manager_bottom_row_col_parent_top']}>
        <div className={styles['font-bold']}>Thiết lập thông tin cá nhân </div>
      </div>

      <div>
        <Row>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <div
              style={{
                marginLeft: 0,
                marginTop: 0,
                width: 850,
                height: '100%',
                marginBottom: 15,
              }}
              className={styles['card-overview']}
            >
              <div style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Tabs>
                  <Tabs.TabPane tab="Thiết lập thông tin" key="1">
                    <div style={{ width: '100%', overflowY: 'scroll' }}>
                      <div className={styles['container']}>
                        <Form layout="horizontal" labelCol={{ span: 4 }} wrapperCol={{ span: 24 }}>
                          {/* <Form.Item label="Đánh giá"></Form.Item> */}
                          <Form.Item label="Tên hiển thị">
                            <Input placeholder="Nhập tên hiển thị"></Input>
                          </Form.Item>
                          <Form.Item label="Tên định danh">
                            <Input placeholder="Nhập tên định danh"></Input>
                          </Form.Item>
                          <div className={styles['display-flex']}>
                          <Form.Item label="Website" >
                            <Input placeholder="Nhập website"></Input>
                          </Form.Item>
                          <Form.Item style={{width: 160}}>
                            <Select>
                              <Select.Option value="demo">Công khai</Select.Option>
                              <Select.Option value="demo">Không công khai</Select.Option>


                            </Select>
                          </Form.Item>

                          </div>
                          <Form.Item label="Bio">
                            <Input.TextArea placeholder="Nhập nội dung "></Input.TextArea>
                          </Form.Item>
                          <Form.Item label="Email">
                            <Input placeholder="Nhập email"></Input>
                          </Form.Item>
                          <Form.Item label="Số điện thoại">
                            <Input placeholder="Nhập số điện thoại"></Input>
                          </Form.Item>
                          <Form.Item label="Giới tính">
                            <Select>
                              <Select.Option value="demo">Nam</Select.Option>
                              <Select.Option value="demo">Nữ</Select.Option>

                              <Select.Option value="demo">Khác</Select.Option>

                            </Select>
                          </Form.Item>
                          <Form.Item label=" Ngày sinh">
                            <DatePicker/>
                          </Form.Item>


                          <Row justify="end">
                            <Form.Item>
                              <Button type="primary">Đánh giá</Button>
                            </Form.Item>
                          </Row>
                        </Form>
                      </div>
                    </div>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Xác thực" key="2">
                    <div style={{ width: '100%', overflowY: 'scroll', paddingTop: 10 }}>
                      <div className={styles['container']}>adsa</div>
                    </div>
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
