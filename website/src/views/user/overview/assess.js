/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'

//antd
import { Modal, Form, Row, Col, Input, Button, Upload, notification, Table } from 'antd'

//icons
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { compare, formatCash, compareCustom } from 'utils'
import moment from 'moment'
import columnsOrder from './columns'
import SettingColumns from 'components/setting-columns'

import { ROUTES, PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'consts'
//apis

export default function AssessOders({ detailshopping, children, reload, record }) {
    const toggle = () => setVisible(!visible)
    const [visible, setVisible] = useState(false)
    // const [form] = Form.useForm()
    // console.log('aaa', detailshopping)
    return (
        <>
            <div onClick={toggle}>{children}</div>
            <Modal
                width="50%"
                title="Đánh giá đơn hàng"
                centered
                footer={null}
                visible={visible}
                okText="Lưu"
                cancelText="Đóng"
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                <Form layout="vertical">
                    
                    {/* <Form.Item label="Đánh giá"></Form.Item> */}
                    <Form.Item label="Tiêu đề">
                        <Input placeholder="Nhập tiêu đề"></Input>
                    </Form.Item>
                    <Form.Item label="Đánh giá">
                        <Input.TextArea placeholder="Nhập nội dung đánh giá"></Input.TextArea>
                    </Form.Item>
                    
                    <Row justify="end">
                        <Form.Item>
                            <Button type="primary">
                                Đánh giá
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
