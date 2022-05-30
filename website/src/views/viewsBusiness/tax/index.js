import React, { useState, useEffect, useRef } from 'react'
import { ROUTES, PERMISSIONS, PAGE_SIZE } from 'consts'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { compare } from 'utils'

//antd
import {
  InputNumber,
  Input,
  Button,
  notification,
  Table,
  Row,
  Form,
  Col,
  Drawer,
  Checkbox,
  Popconfirm,
  Switch,
  Space
} from 'antd'

//icons
import {
  PlusCircleOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons'

//apis
import { addTax, getTaxs, updateTax, deleteTax } from 'apis/tax'

//components
import Permission from 'components/permission'
import TitlePage from 'components/title-page'

const { TextArea } = Input
export default function Tax() {
  const history = useHistory()
  const branchIdApp = useSelector((state) => state.branch.branchId)
  const typingTimeoutRef = useRef(null)

  const [valueSearch, setValueSearch] = useState('')
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: PAGE_SIZE })
  const [countTax, setCountTax] = useState(0)
  const [taxList, setTaxList] = useState([])
  const [loading, setLoading] = useState(false)

  const onSearch = (e) => {
    setValueSearch(e.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(() => {
      const value = e.target.value
      if (value) paramsFilter.name = value
      else delete paramsFilter.name
      setParamsFilter({ ...paramsFilter, page: 1 })
    }, 650)
  }

  const _getTaxList = async () => {
    try {
      setLoading(true)
      const res = await getTaxs({ ...paramsFilter, branch_id: branchIdApp })
      console.log(res)
      if (res.status === 200) {
        setTaxList(res.data.data)
        setCountTax(res.data.count)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const ModalCreateOrUpdateTax = ({ children, record }) => {
    const [form] = Form.useForm()

    const [visible, setVisible] = useState(false)
    const toggle = () => setVisible(!visible)

    const onFinish = async (values) => {
      try {
        const body = {
          name: values.name,
          value: values.value,
          description: values.description || '',
          default: values.default || false,
        }
        let res
        if (record) res = await updateTax(body, record.tax_id)
        else res = await addTax(body)
        if (res.status === 200) {
          if (res.data.success) {
            notification.success({ message: `${record ? 'Cập nhật' : 'Thêm'} thuế thành công` })
            _getTaxList()
            toggle()
          } else
            notification.error({
              message:
                res.data.message ||
                `${record ? 'Cập nhật' : 'Thêm'} thuế thất bại, vui lòng thử lại`,
            })
        } else
          notification.error({
            message:
              res.data.message || `${record ? 'Cập nhật' : 'Thêm'} thuế thất bại, vui lòng thử lại`,
          })
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if (!visible) form.resetFields()
      else {
        if (record) form.setFieldsValue({ ...record })
      }
    }, [visible])

    return (
      <>
        <div onClick={toggle}>{children}</div>
        <Drawer
          title={`${record ? 'Cập nhật' : 'Thêm'} thông tin thuế`}
          width={720}
          onClose={toggle}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form onFinish={onFinish} layout="vertical" form={form}>
            <Row
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
                <div>
                  <Form.Item
                    label={<div style={{ color: 'black', fontWeight: '600' }}>Tên thuế</div>}
                    name="name"
                    rules={[{ required: true, message: 'Giá trị rỗng!' }]}
                  >
                    <Input placeholder="Nhập tên thuế" size="large" allowClear />
                  </Form.Item>
                </div>
              </Col>
              <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
                <div>
                  <Form.Item
                    label={<div style={{ color: 'black', fontWeight: '600' }}>Giá trị (%)</div>}
                    name="value"
                    rules={[{ required: true, message: 'Giá trị rỗng!' }]}
                  >
                    <InputNumber
                      placeholder="Nhập vào giá trị thuế"
                      size="large"
                      className="br-15__input"
                      style={{ width: '100%' }}
                      min={0}
                      max={100}
                      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </div>
              </Col>
              <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
                <div>
                  <div
                    style={{
                      color: 'black',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Mô tả
                  </div>
                  <Form.Item name="description">
                    <TextArea rows={4} placeholder="Nhập mô tả" />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row>
              <Form.Item name="default" valuePropName="checked">
                <Checkbox>Chọn làm mặc định</Checkbox>
              </Form.Item>
            </Row>

            <Row
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Col
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
                xs={24}
                sm={24}
                md={5}
                lg={4}
                xl={3}
              >
                <Form.Item>
                  <Button size="large" type="primary" htmlType="submit">
                    {record ? 'Cập nhật' : 'Thêm'}
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    )
  }

  const _updateStatusTax = async (body, id) => {
    try {
      setLoading(true)
      const res = await updateTax(body, id)
      if (res.status === 200) {
        if (res.data.success) {
          _getTaxList()
          notification.success({ message: 'Cập nhật trạng thái thành công' })
        } else
          notification.error({
            message: res.data.message || 'Cập nhật trạng thái thất bại, vui lòng thử lại',
          })
      } else
        notification.error({
          message: res.data.message || 'Cập nhật trạng thái thất bại, vui lòng thử lại',
        })
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const _deleteTax = async (tax_id) => {
    try {
      setLoading(true)
      const res = await deleteTax({ tax_id: [tax_id] })
      console.log(res)
      if (res.status === 200) {
        if (res.data.success) {
          _getTaxList()
          notification.success({ message: 'Xoá thuế thành công!' })
        } else
          notification.error({
            message: res.data.message || 'Xoá thuế thất bại, vui lòng thử lại!',
          })
      } else
        notification.error({
          message: res.data.message || 'Xoá thuế thất bại, vui lòng thử lại!',
        })

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  const columns = [
    {
      title: 'STT',
      width: 60,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên thuế',
      sorter: (a, b) => compare(a, b, 'name'),
      render: (text, record) => (
        <ModalCreateOrUpdateTax record={record}>
          <a>
            {record.name} {record.default && '(Mặc định)'}
          </a>
        </ModalCreateOrUpdateTax>
      ),
    },

    {
      title: 'Giá trị',
      dataIndex: 'value',
      render: (text, record) => text && `${text}%`,
      sorter: (a, b) => compare(a, b, 'value'),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      sorter: (a, b) => compare(a, b, 'description'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      width: 100,
      render: (text, record) => (
        <Space>
          <Switch checked={record.active} onChange={(e) => _updateStatusTax({ active: e }, record.tax_id)} />
          <Popconfirm
            onConfirm={() => _deleteTax(record.tax_id)}
            title="Bạn có muốn xóa sản phẩm này không?"
            okText="Đồng ý"
            cancelText="Từ chối"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    _getTaxList()
  }, [branchIdApp, paramsFilter])

  return (
    <>
      <div className="card">
        <TitlePage
          title={
            <Row
              align="middle"
              onClick={() => history.push(ROUTES.CONFIGURATION_STORE)}
              style={{ cursor: 'pointer' }}
            >
              <ArrowLeftOutlined />
              <div style={{ marginLeft: 8 }}>Quản lý thuế</div>
            </Row>
          }
        >
          <Permission permissions={[PERMISSIONS.them_thue]}>
            <ModalCreateOrUpdateTax>
              <Button size="large" type="primary" icon={<PlusCircleOutlined />}>
                Thêm thuế
              </Button>
            </ModalCreateOrUpdateTax>
          </Permission>
        </TitlePage>

        <Row style={{ margin: '1rem 0' }}>
          <Col
            style={{
              borderRight: 'none',
              border: '1px solid #d9d9d9',
              borderRadius: '5px 0px 0px 5px',
            }}
            xs={24}
            sm={24}
            md={11}
            lg={11}
            xl={7}
          >
            <Input
              prefix={<SearchOutlined />}
              style={{ width: '100%' }}
              name="name"
              value={valueSearch}
              enterButton
              onChange={onSearch}
              placeholder="Tìm kiếm theo tên thuế"
              allowClear
              bordered={false}
            />
          </Col>
        </Row>

        <div style={{ width: '100%', border: '1px solid rgb(243, 234, 234)' }}>
          <Table
            size="small"
            columns={columns}
            loading={loading}
            dataSource={taxList}
            pagination={{
              position: ['bottomLeft'],
              current: paramsFilter.page,
              pageSize: paramsFilter.page_size,
              pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
              showQuickJumper: true,
              onChange: (page, pageSize) =>
                setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize }),
              total: countTax,
            }}
          />
        </div>
      </div>
    </>
  )
}
