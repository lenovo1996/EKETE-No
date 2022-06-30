/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'

//antd
import { Modal, Form, Row, Col, Input, Button, Upload, notification, Table, Rate } from 'antd'
import styles from './styles/assess.module.scss'

//icons
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { compare, formatCash, compareCustom } from 'utils'
import moment from 'moment'
import columnsOrder from './columns'
import SettingColumns from 'components/setting-columns'

import { ROUTES, PAGE_SIZE, PAGE_SIZE_OPTIONS } from 'consts'
//apis

export default function Feedback({ detailshopping, children, reload, record }) {
    const toggle = () => setVisible(!visible)
    const [visible, setVisible] = useState(false)
    // const [form] = Form.useForm()
    // console.log('aaa', detailshopping)
    return (
        <>
            <div onClick={toggle}>{children}</div>
            <Modal
                width="802px"
                height="628px"
                title={<h1 className={styles['title-page']}> Phản hồi riêng</h1>}
                centered
                footer={null}
                visible={visible}
                okText="Lưu"
                cancelText="Đóng"
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                className={styles['center']}
            >
                <Form layout="vertical" >
                    <Form.Item label={<p className={styles['title-input']}> Nội dung phản hồi</p>}>
                        <Input.TextArea className={styles['input-big']}  placeholder="Nhập nội dung phản hồi"></Input.TextArea>
                    </Form.Item>
                    
                    <Row justify="end">
                        <Form.Item>
                            <Button type="primary" className={styles['button-feedback']}>
                                Phản hồi
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
