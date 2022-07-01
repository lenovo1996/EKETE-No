import React, { useState, useEffect, useRef } from 'react'
import columnsReceiptsPayment from './columns'
import { compareCustom, formatCash } from 'utils'
import { useHistory } from 'react-router-dom'
import { PAGE_SIZE, ROUTES } from 'consts'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { compare } from 'utils'

//apis
import { getCustomers } from 'apis/customer'
import { addFinances, getFinances } from 'apis/report'
import { getPayments } from 'apis/payment'

//antd
import {
  Row,
  Space,
  Button,
  Input,
  Select,
  Table,
  Modal,
  Form,
  InputNumber,
  notification,
  Tag,
  Col,
} from 'antd'

//icons
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  SearchOutlined,
  CloseOutlined,
  UploadOutlined,
} from '@ant-design/icons'

//components
import SettingColumns from 'components/setting-columns'
import TitlePage from 'components/title-page'
import FilterDate from 'components/filter-date'
import exportCsv from 'components/ExportCSV/export'

export default function ReceiptsAndPayment() {
  const history = useHistory()
  const dataUser = useSelector((state) => state.login.dataUser)
  const [form] = Form.useForm()
  const typingTimeoutRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [payments, setPayments] = useState([])
  const [customers, setCustomers] = useState([])
  const [columns, setColumns] = useState([])
  const [finances, setFinances] = useState([])
  const [countFinance, setCountFinance] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: PAGE_SIZE })
  const [valueSearch, setValueSearch] = useState('')

  const ModalCreatePaymentOrReceipts = ({ type }) => {
    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)

    const onFinish = async (values) => {
      const payment = payments.find((e) => e.payment_method_id === values.payment_method_id)
      const body = {
        source: 'CUSTOMER_PAY',
        note: values.note || '',
        payer_id: values.payer_id,
        value: values.value,
        receiver_id: values.receiver_id,
        type: type.toUpperCase(),
        payments: [
          {
            payment_method_id: payment ? payment.payment_method_id : '',
            name: payment ? payment.name : '',
            value: values.values,
          },
        ],
        status: 'COMPLETE',
        username: dataUser.data ? dataUser.data.username : '',
      }

      let res
      res = await addFinances(body)
      if (res.status === 200) {
        if (res.data.success) {
          _getFinances()
          notification.success({ message: 'Tạo phiếu thành công !' })
        } else
          notification.error({
            message: res.data.message || 'Tạo phiếu thất bại, vui lòng thử lại!',
          })
      } else
        notification.error({
          message: res.data.message || 'Tạo phiếu thất bại, vui lòng thử lại!',
        })
    }

    return (
      <>
        <Button
          onClick={toggle}
          style={{
            backgroundColor: type === 'payment' ? '#DE7C08' : '#0877DE',
            borderColor: type === 'payment' ? '#DE7C08' : '#0877DE',
            borderRadius: 5,
            color: 'white',
            fontWeight: 600,
          }}
        >
          {type === 'payment' ? 'Tạo phiếu chi' : 'Tạo phiếu thu'}
        </Button>

        <Modal
          width={650}
          onCancel={toggle}
          visible={visible}
          title={type === 'payment' ? 'Tạo phiếu chi' : 'Tạo phiếu thu'}
          footer={false}
        >
          <Form onFinish={onFinish} form={form} layout="vertical">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row justify="space-between">
                <Form.Item
                  name="payer_id"
                  label="Người trả"
                  rules={[{ required: true, message: 'Vui lòng chọn người trả' }]}
                >
                  <Select showSearch placeholder="Chọn người trả" style={{ width: 280 }}>
                    {customers.map((customer, index) => (
                      <Select.Option key={index} value={customer.customer_id}>
                        {(customer.first_name || '') + ' ' + (customer.last_name || '')} -{' '}
                        {customer.phone || ''}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="receiver_id"
                  label="Tên người nhận"
                  rules={[{ required: true, message: 'Vui lòng chọn người nhận' }]}
                >
                  <Select showSearch placeholder="Chọn người nhận" style={{ width: 280 }}>
                    {customers.map((customer, index) => (
                      <Select.Option key={index} value={customer.customer_id}>
                        {(customer.first_name || '') + ' ' + (customer.last_name || '')} -{' '}
                        {customer.phone || ''}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>
              <Row justify="space-between">
                <Form.Item
                  name="value"
                  label="Giá trị ghi nhận"
                  rules={[{ required: true, message: 'Vui lòng nhập giá trị ghi nhận' }]}
                >
                  <InputNumber min={0} placeholder="Nhập giá trị ghi nhận" style={{ width: 280 }} />
                </Form.Item>
                <Form.Item
                  name="payment_method_id"
                  label="Hình thức thanh toán"
                  rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán' }]}
                >
                  <Select
                    showSearch
                    optionFilterProp="children"
                    allowClear
                    placeholder="Chọn hình thức thanh toán"
                    style={{ width: 280 }}
                  >
                    {payments.map((payment, index) => (
                      <Select.Option key={index} value={payment.payment_method_id}>
                        {payment.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Row>
              <Row justify="space-between">
                <Form.Item
                  name="values"
                  label="Nhập giá trị thanh toán"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng giá trị',
                    },
                  ]}
                >
                  <InputNumber
                    value=""
                    min={0}
                    placeholder="Nhập giá trị ghi nhận"
                    style={{ width: 280 }}
                  />
                </Form.Item>
                <Form.Item name="note" label="Mô tả">
                  <Input.TextArea rows={4} placeholder="Nhập Mô tả" style={{ width: 280 }} />
                </Form.Item>
              </Row>
            </Space>

            <Row justify="end">
              <Button
                style={{
                  backgroundColor: type === 'payment' ? '#DE7C08' : '#0877DE',
                  borderColor: type === 'payment' ? '#DE7C08' : '#0877DE',
                  borderRadius: 5,
                  color: 'white',
                  fontWeight: 600,
                }}
                type="primary"
                htmlType="submit"
                size="large"
              >
                {type === 'payment' ? 'Tạo phiếu chi' : 'Tạo phiếu thu'}
              </Button>
            </Row>
          </Form>
        </Modal>
      </>
    )
  }

  const onSearch = (e) => {
    setValueSearch(e.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      const value = e.target.value
      if (value) paramsFilter.code = value
      else delete paramsFilter.code
      setParamsFilter({ ...paramsFilter, page: 1 })
    }, 750)
  }

  const onFilters = (attribute = '', value = '') => {
    if (value) paramsFilter[attribute] = value
    else delete paramsFilter[attribute]
    setParamsFilter({ ...paramsFilter, page: 1 })
  }

  const _getCustomers = async () => {
    try {
      const res = await getCustomers()
      console.log(res)
      if (res.status === 200) setCustomers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const _getPayments = async () => {
    try {
      const res = await getPayments()
      if (res.status === 200) {
        setPayments(res.data.data)
        const payment = res.data.data.find((e) => e.default)
        form.setFieldsValue({ payments: payment ? payment.payment_method_id : '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const exportFinances = async () => {
    try {
      setLoading(true)
      const res = await getFinances({ page: 1, page_size: 99999 })
      if (res.status === 200) {
        const financesExport = res.data.data.map((e) => ({
          'Mã phiếu': e.code || '',
          'Loại hình phiếu': e.type === 'PAYMENT' ? 'Phiếu chi' : 'Phiếu thu',
          'Hình thức thanh toán': e.payments.map((payment) => payment.name || '').join(', '),
          'Trạng thái': e.status || '',
          'Số tiền': formatCash(e.value || 0),
          'Người nộp': e.payer_info ? `${e.payer_info.first_name} ${e.payer_info.last_name}` : '',
          'Người nhận': e.receiver_info
            ? `${e.receiver_info.first_name} ${e.receiver_info.last_name}`
            : '',
          'Người tạo phiếu': e.creator_info
            ? `${e.creator_info.first_name} ${e.creator_info.last_name}`
            : '',
          'Ngày ghi nhận': e.create_date ? moment(e.create_date).format('DD/MM/YYYY HH:mm') : '',
        }))
        await exportCsv(financesExport, 'Danh sách phiếu')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const _getFinances = async () => {
    try {
      setLoading(true)
      const res = await getFinances(paramsFilter)
      console.log(res)
      if (res.status === 200) {
        setFinances(res.data.data)
        setCountFinance(res.data.count)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }

  useEffect(() => {
    _getFinances()
  }, [paramsFilter])

  useEffect(() => {
    _getCustomers()
    _getPayments()
  }, [])

  return (
    <div className="card">
      <TitlePage
        title={
          <Row
            wrap={false}
            align="middle"
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(ROUTES.REPORTS)}
          >
            <ArrowLeftOutlined style={{ marginRight: 10 }} />
            Danh sách phiếu
          </Row>
        }
      >
        <Space size="middle">
          <Button
            icon={<UploadOutlined />}
            style={{
              backgroundColor: '#66AE43',
              borderColor: '#66AE43',
              borderRadius: 5,
              color: 'white',
              fontWeight: 600,
            }}
            onClick={exportFinances}
          >
            Xuất excel
          </Button>
          <SettingColumns
            columns={columns}
            setColumns={setColumns}
            columnsDefault={columnsReceiptsPayment}
            nameColumn="columnsReceiptsPayment"
            btn={
              <Button
                style={{
                  backgroundColor: '#4E7DD9',
                  borderColor: '#4E7DD9',
                  borderRadius: 5,
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                Điều chỉnh cột
              </Button>
            }
          />
          <ModalCreatePaymentOrReceipts type="payment" />
          <ModalCreatePaymentOrReceipts type="receipt" />
        </Space>
      </TitlePage>

      <Row align="middle" style={{ border: '1px solid #d9d9d9', borderRadius: 5, marginTop: 10 }}>
        <Col xs={24} sm={24} md={24} lg={7} xl={7} style={{ borderRight: '1px solid #d9d9d9' }}>
          <Input
            clearIcon={<CloseOutlined />}
            allowClear
            prefix={<SearchOutlined />}
            bordered={false}
            style={{ width: '100%' }}
            placeholder="Tìm kiếm theo mã phiếu"
            value={valueSearch}
            onChange={onSearch}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={3} xl={3}>
          <Select
            clearIcon={<CloseOutlined />}
            allowClear
            bordered={false}
            placeholder="Chọn loại phiếu"
            style={{ width: '100%', borderRight: '1px solid #d9d9d9' }}
            value={paramsFilter.type}
            onChange={(value) => onFilters('type', value)}
          >
            <Select.Option value="RECEIPT">Phiếu thu</Select.Option>
            <Select.Option value="PAYMENT">Phiếu chi</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <Select
            clearIcon={<CloseOutlined />}
            allowClear
            bordered={false}
            showSearch
            optionFilterProp="children"
            placeholder="Hình thức thanh toán"
            style={{ width: '100%', borderRight: '1px solid #d9d9d9' }}
            value={paramsFilter.payment_method_id}
            onChange={(value) => onFilters('payment_method_id', value)}
          >
            {payments.map((payment, index) => (
              <Select.Option key={index} value={payment.payment_method_id}>
                {payment.name}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={4} xl={4}>
          <Select
            clearIcon={<CloseOutlined />}
            allowClear
            bordered={false}
            showSearch
            optionFilterProp="children"
            placeholder="Người tạo phiếu"
            style={{ width: '100%', borderRight: '1px solid #d9d9d9' }}
            value={paramsFilter.creator_id}
            onChange={(value) => onFilters('creator_id', value)}
          >
            {customers.map((customer, index) => (
              <Select.Option key={index} value={customer.customer_id}>
                {(customer.first_name || '') + ' ' + (customer.last_name || '')} -{' '}
                {customer.phone || ''}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={5}>
          <FilterDate paramsFilter={paramsFilter} setParamsFilter={setParamsFilter} width="100%" />
        </Col>
      </Row>
      <br />
      <Table
        loading={loading}
        dataSource={finances}
        size="small"
        style={{ width: '100%' }}
        columns={columns.map((column) => {
          if (column.key === 'code')
            return {
              ...column,
              sorter: (a, b) => compare(a, b, 'code'),
            }
          if (column.key === 'type')
            return {
              ...column,
              render: (text, record) => (record.type === 'RECEIPT' ? 'Phiếu thu' : 'Phiếu chi'),
              sorter: (a, b) => compare(a, b, 'type'),
            }
          if (column.key === 'payment')
            return {
              ...column,
              render: (text, record) =>
                record.payments && record.payments.map((e) => e.name).join(', '),
            }
          if (column.key === 'money')
            return {
              ...column,
              sorter: (a, b) => compare(a, b, 'value'),
              render: (text, record) => record.value && formatCash(record.value || 0),
            }
          if (column.key === 'status')
            return {
              ...column,
              sorter: (a, b) => compare(a, b, 'status'),
              render: (text, record) =>
                record.status && (
                  <Tag color={record.status === 'COMPLETE' && 'success'}>{record.status}</Tag>
                ),
            }
          if (column.key === 'receiver')
            return {
              ...column,
              sorter: (a, b) =>
                compareCustom(
                  a.receiver_info
                    ? `${a.receiver_info.first_name} ${a.receiver_info.last_name}`
                    : '',
                  b.receiver_info
                    ? `${b.receiver_info.first_name} ${b.receiver_info.last_name}`
                    : ''
                ),
              render: (text, record) =>
                record.receiver_info &&
                `${record.receiver_info.first_name} ${record.receiver_info.last_name}`,
            }
          if (column.key === 'creator')
            return {
              ...column,
              sorter: (a, b) =>
                compareCustom(
                  a.creator_info ? `${a.creator_info.first_name} ${a.creator_info.last_name}` : '',
                  b.creator_info ? `${b.creator_info.first_name} ${b.creator_info.last_name}` : ''
                ),
              render: (text, record) =>
                record.creator_info &&
                `${record.creator_info.first_name} ${record.creator_info.last_name}`,
            }
          if (column.key === 'receiver')
            return {
              ...column,
              render: (text, record) => (record.receiver_id ? `${record.receiver_id}` : ''),
            }
          if (column.key === 'payer')
            return {
              ...column,
              sorter: (a, b) =>
                compareCustom(
                  a.payer_info ? `${a.payer_info.first_name} ${a.payer_info.last_name}` : '',
                  b.payer_info ? `${b.payer_info.first_name} ${b.payer_info.last_name}` : ''
                ),
              render: (text, record) =>
                record.payer_info &&
                `${record.payer_info.first_name} ${record.payer_info.last_name}`,
            }
          if (column.key === 'create_date')
            return {
              ...column,
              sorter: (a, b) => moment(a.create_date).unix() - moment(b.create_date).unix(),
              render: (text, record) =>
                record.create_date && moment(record.create_date).format('DD/MM/YYYY HH:mm'),
            }
          return column
        })}
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) =>
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
          total: countFinance,
        }}
      />
    </div>
  )
}
