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
            notification.success({ message: `${record ? 'C???p nh???t' : 'Th??m'} thu??? th??nh c??ng` })
            _getTaxList()
            toggle()
          } else
            notification.error({
              message:
                res.data.message ||
                `${record ? 'C???p nh???t' : 'Th??m'} thu??? th???t b???i, vui l??ng th??? l???i`,
            })
        } else
          notification.error({
            message:
              res.data.message || `${record ? 'C???p nh???t' : 'Th??m'} thu??? th???t b???i, vui l??ng th??? l???i`,
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
          title={`${record ? 'C???p nh???t' : 'Th??m'} th??ng tin thu???`}
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
                    label={<div style={{ color: 'black', fontWeight: '600' }}>T??n thu???</div>}
                    name="name"
                    rules={[{ required: true, message: 'Gi?? tr??? r???ng!' }]}
                  >
                    <Input placeholder="Nh???p t??n thu???" size="large" allowClear />
                  </Form.Item>
                </div>
              </Col>
              <Col style={{ width: '100%' }} xs={24} sm={24} md={11} lg={11} xl={11}>
                <div>
                  <Form.Item
                    label={<div style={{ color: 'black', fontWeight: '600' }}>Gi?? tr??? (%)</div>}
                    name="value"
                    rules={[{ required: true, message: 'Gi?? tr??? r???ng!' }]}
                  >
                    <InputNumber
                      placeholder="Nh???p v??o gi?? tr??? thu???"
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
                    M?? t???
                  </div>
                  <Form.Item name="description">
                    <TextArea rows={4} placeholder="Nh???p m?? t???" />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row>
              <Form.Item name="default" valuePropName="checked">
                <Checkbox>Ch???n l??m m???c ?????nh</Checkbox>
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
                    {record ? 'C???p nh???t' : 'Th??m'}
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
          notification.success({ message: 'C???p nh???t tr???ng th??i th??nh c??ng' })
        } else
          notification.error({
            message: res.data.message || 'C???p nh???t tr???ng th??i th???t b???i, vui l??ng th??? l???i',
          })
      } else
        notification.error({
          message: res.data.message || 'C???p nh???t tr???ng th??i th???t b???i, vui l??ng th??? l???i',
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
          notification.success({ message: 'Xo?? thu??? th??nh c??ng!' })
        } else
          notification.error({
            message: res.data.message || 'Xo?? thu??? th???t b???i, vui l??ng th??? l???i!',
          })
      } else
        notification.error({
          message: res.data.message || 'Xo?? thu??? th???t b???i, vui l??ng th??? l???i!',
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
      title: 'T??n thu???',
      sorter: (a, b) => compare(a, b, 'name'),
      render: (text, record) => (
        <ModalCreateOrUpdateTax record={record}>
          <a>
            {record.name} {record.default && '(M???c ?????nh)'}
          </a>
        </ModalCreateOrUpdateTax>
      ),
    },

    {
      title: 'Gi?? tr???',
      dataIndex: 'value',
      render: (text, record) => text && `${text}%`,
      sorter: (a, b) => compare(a, b, 'value'),
    },
    {
      title: 'M?? t???',
      dataIndex: 'description',
      sorter: (a, b) => compare(a, b, 'description'),
    },
    {
      title: 'H??nh ?????ng',
      dataIndex: 'action',
      width: 100,
      render: (text, record) => (
        <Space>
          <Switch checked={record.active} onChange={(e) => _updateStatusTax({ active: e }, record.tax_id)} />
          <Popconfirm
            onConfirm={() => _deleteTax(record.tax_id)}
            title="B???n c?? mu???n x??a s???n ph???m n??y kh??ng?"
            okText="?????ng ??"
            cancelText="T??? ch???i"
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
              <div style={{ marginLeft: 8 }}>Qu???n l?? thu???</div>
            </Row>
          }
        >
          <Permission permissions={[PERMISSIONS.them_thue]}>
            <ModalCreateOrUpdateTax>
              <Button size="large" type="primary" icon={<PlusCircleOutlined />}>
                Th??m thu???
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
              placeholder="T??m ki???m theo t??n thu???"
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
