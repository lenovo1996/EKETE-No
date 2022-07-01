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

export default function AssessOders({ detailshopping, children, reload, record }) {
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
                title={<h1 className={styles['title-page']}> Đánh giá đơn hàng</h1>}
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
                    <div className={styles['display-flex']}>
                        <p className={styles['title-input']}>Đánh giá</p>
                        <Rate allowHalf defaultValue={2.5} />

                    </div>
                    
                    {/* <Form.Item label="Đánh giá"></Form.Item> */}
                    <Form.Item label={<p className={styles['title-input']}> Tiêu đề</p>}>
                        <Input className={styles['input']} placeholder="Nhập tiêu đề"></Input>
                    </Form.Item>
                    <Form.Item label={<p className={styles['title-input']}> Đánh giá</p>}>
                        <Input.TextArea className={styles['input-big']}  placeholder="Nhập nội dung đánh giá"></Input.TextArea>
                    </Form.Item>
                    
                    <Row justify="end">
                        <Form.Item>
                            <Button type="primary" className={styles['button']}>
                                Đánh giá
                            </Button>
                        </Form.Item>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
