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

export default function ModalShopping({ detailshopping, children, reload, record }) {
    const toggle = () => setVisible(!visible)
    const [visible, setVisible] = useState(false)
    // const [form] = Form.useForm()
    // console.log('aaa', detailshopping)
    const columnsProduct = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'sku',
            sorter: (a, b) => compare(a, b, 'sku'),
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (data) => (
                <img src={data && data[0] ? data[0] : ''} style={{ maxWidth: 60, maxHeight: 60 }} alt="" />
            ),
        },
        {
            title: 'Tên sản phẩm',

            dataIndex: 'title',
            sorter: (a, b) => compare(a, b, 'title'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            sorter: (a, b) => compare(a, b, 'quantity'),
        },
        {
            title: 'Đơn giá',
            sorter: (a, b) => compare(a, b, 'price'),

            render: (text, record) => (record.price ? formatCash(+record.price) : 0),
        },
        {
            title: 'Chiết khấu',
            sorter: (a, b) => compare(a, b, 'discount'),

            render: (text, record) => (record.discount ? formatCash(+record.discount) : 0),
        },
        {
            title: 'Thành tiền',
            sorter: (a, b) => compare(a, b, 'total_cost'),
            render: (text, record) => (record.total_cost ? formatCash(+record.total_cost) : 0),
        },
    ]
    return (
        <>
            <div onClick={toggle}>{children}</div>
            <Modal
                width="80%"
                title="Chi tiết đơn hàng"
                centered
                footer={null}
                visible={visible}
                okText="Lưu"
                cancelText="Đóng"
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
            >
                {detailshopping &&
                    detailshopping.map((Item, index) => {
                        return (
                            <div style={{ paddingTop: 17, paddingBottom: 17 }}>
                                <Row wrap={false}>
                                    <div
                                        style={{
                                            width: 'calc(100% - 165px)',
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: 5,
                                            border: '1px solid #E8EAEB',
                                            padding: '15px 0px',
                                            marginRight: 15,
                                            fontSize: 14.7,
                                        }}
                                    >
                                        <Row wrap={false}>
                                            <div style={{ width: '100%', padding: '0px 25px' }}>
                                                <p style={{ fontWeight: 700, marginBottom: 6 }}>Thông tin đơn hàng</p>
                                                <Row justify="space-between">
                                                    <div style={{ color: '#747C87' }}>Mã đơn hàng:</div>
                                                    <div>{Item.order_id || ''}</div>
                                                </Row>
                                                <Row justify="space-between">
                                                    <div style={{ color: '#747C87' }}>Ngày tạo:</div>
                                                    <div>{moment(Item.create_date).format('DD/MM/YYYY HH:mm')}</div>
                                                </Row>
                                                <Row justify="space-between">
                                                    <div style={{ color: '#747C87' }}>Nguồn bán hàng:</div>
                                                    <div>POS</div>
                                                </Row>
                                                <Row justify="space-between">
                                                    <div style={{ color: '#747C87' }}>Nhân viên bán hàng:</div>
                                                    <div>
                                                        {Item.employee
                                                            ? `${Item.employee.first_name} ${Item.employee.last_name}`
                                                            : ''}
                                                    </div>
                                                </Row>
                                            </div>
                                            <div
                                                style={{
                                                    width: '33.33333%',
                                                    padding: '0px 25px',
                                                    borderRight: '1px solid #E8EAEB',
                                                }}
                                            >
                                                <p style={{ fontWeight: 700, marginBottom: 6 }}>Khách hàng</p>
                                                <Row wrap={false} style={{ width: '100%' }}>
                                                    <a>
                                                        {Item.customer
                                                            ? `${Item.customer.first_name} ${Item.customer.last_name}`
                                                            : ''}
                                                    </a>
                                                    <div
                                                        style={{ margin: '0px 5px', display: !Item.customer && 'none' }}
                                                    >
                                                        -
                                                    </div>
                                                    <div>{Item.customer ? Item.customer.phone : ''}</div>
                                                </Row>
                                                <div>
                                                    {Item.customer
                                                        ? `${Item.customer.address}, ${Item.customer.district}, ${Item.customer.province}`
                                                        : ''}
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
                                </Row>
                                <div className="table-product-in-order">
                                    <Table
                                        pagination={false}
                                        size="small"
                                        style={{ width: '99%', marginTop: 30 }}
                                        columns={columnsProduct}
                                        dataSource={Item.order_details}
                                        summary={() => (
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell></Table.Summary.Cell>
                                                <Table.Summary.Cell colSpan={2}>
                                                    <div style={{ fontSize: 14.7 }}>
                                                        <Row wrap={false} justify="space-between">
                                                            <div>Tổng tiền ({Item.order_details.length} sản phẩm)</div>
                                                            <div>
                                                                {Item.total_cost ? formatCash(+Item.total_cost) : 0}
                                                            </div>
                                                        </Row>
                                                        <Row wrap={false} justify="space-between">
                                                            <div>Tổng thuế</div>
                                                            <div>
                                                                {Item.total_tax ? formatCash(+Item.total_tax) : 0}
                                                            </div>
                                                        </Row>
                                                        <Row wrap={false} justify="space-between">
                                                            <div>Chiết khấu</div>
                                                            <div>
                                                                {Item.promotion
                                                                    ? `${formatCash(+(Item.promotion.value || 0))} ${
                                                                          Item.promotion.type &&
                                                                          Item.promotion.type !== 'VALUE'
                                                                              ? '%'
                                                                              : ''
                                                                      }`
                                                                    : 0}
                                                            </div>
                                                        </Row>
                                                        <Row wrap={false} justify="space-between">
                                                            <div>Phí giao hàng</div>
                                                            <div>
                                                                {Item.shipping_info
                                                                    ? formatCash(+Item.shipping_info.cod || 0)
                                                                    : 0}
                                                            </div>
                                                        </Row>
                                                        <Row
                                                            wrap={false}
                                                            justify="space-between"
                                                            style={{ fontWeight: 600 }}
                                                        >
                                                            <div>Tổng thanh toán</div>
                                                            <div>
                                                                {Item.final_cost
                                                                    ? formatCash(+Item.final_cost || 0)
                                                                    : 0}
                                                            </div>
                                                        </Row>
                                                    </div>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                        )}
                                    />
                                </div>
                            </div>
                        )
                    })}
            </Modal>
        </>
    )
}