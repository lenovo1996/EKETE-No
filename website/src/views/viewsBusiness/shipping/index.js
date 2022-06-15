import styles from './shipping.module.scss'
import { ACTION, IMAGE_DEFAULT, PERMISSIONS, ROUTES } from 'consts'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

import { Button, Col, Form, Input, Modal, notification, Row } from 'antd'

//apis
// import { getShippings, connectShippingGHN, connectShippingGHTK } from 'apis/shipping'

//components
import Permission from 'components/permission'
import TitlePage from 'components/title-page'

export default function Shipping() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const [shippings, setShippings] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [shippingCompanyName, setShippingCompanyName] = useState('')

  const _connectShipping = async () => {
    // try {
    //   dispatch({ type: ACTION.LOADING, data: true })
    //   const body = form.getFieldsValue()
    //   console.log(body)
    //   let res
    //   if (shippingCompanyName === 'Giao Hàng Nhanh') res = await connectShippingGHN(body)
    //   else res = await connectShippingGHTK(body)
    //   dispatch({ type: ACTION.LOADING, data: false })
    //   if (res.status === 200) {
    //     if (res.data.success) {
    //       notification.success({ message: 'Kích hoạt thành công' })
    //       _getShippings()
    //     } else
    //       notification.error({
    //         message: res.data.message || 'Kích hoạt thất bại, vui lòng thử lại',
    //       })
    //   } else
    //     notification.error({ message: res.data.message || 'Kích hoạt thất bại, vui lòng thử lại' })
    // } catch (error) {
    //   console.log(error)
    //   dispatch({ type: ACTION.LOADING, data: false })
    // }
  }

  const _getShippings = async () => {
    // try {
    //   dispatch({ type: ACTION.LOADING, data: true })
    //   const res = await getShippings()
    //   console.log(res)
    //   if (res.status === 200) setShippings(res.data.data)
    //   dispatch({ type: ACTION.LOADING, data: false })
    // } catch (error) {
    //   dispatch({ type: ACTION.LOADING, data: false })
    // }
  }

  useEffect(() => {
    _getShippings()
  }, [])

  useEffect(() => {
    if (!modalVisible) form.resetFields()
  }, [modalVisible])

  return (
    <div className="card">
      <Modal
        visible={modalVisible}
        title={`Kết nối đối tác ${shippingCompanyName}`}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button
            onClick={_connectShipping}
            type="primary"
            style={{ backgroundColor: '#6D24CF', border: 'none' }}
          >
            Kết nối
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Token API" name="token">
            <Input placeholder="Token API" />
          </Form.Item>
          {shippingCompanyName === 'Giao Hàng Nhanh' && (
            <Form.Item label="Shop id" name="shop_id">
              <Input placeholder="Shop id" />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <TitlePage
        title={
          <Row
            wrap={false}
            align="middle"
            style={{ cursor: 'pointer' }}
            onClick={() => history.push(ROUTES.CONFIGURATION_STORE)}
          >
            <ArrowLeftOutlined style={{ marginRight: 8 }} />
            Đối tác vận chuyển
          </Row>
        }
      >
        <Permission permissions={[PERMISSIONS.them_doi_tac_van_chuyen]}>
          <Button
            onClick={() => history.push(ROUTES.SHIPPING_CREATE)}
            icon={<PlusCircleOutlined />}
            type="primary"
            size="large"
          >
            Thêm đối tác
          </Button>
        </Permission>
      </TitlePage>
      <Row gutter={[20, 20]} style={{ padding: '20px 10px' }} justify="space-between">
        {shippings.map((shipping) => (
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Row
              justify="space-between"
              style={{
                boxShadow: '0px 4px 25px rgba(37, 107, 254, 0.25)',
                padding: 20,
                borderRadius: 10,
              }}
            >
              <div>
                <img
                  alt=""
                  style={{ width: 80, height: 80 }}
                  src={shipping.image || IMAGE_DEFAULT}
                />
                <p>{shipping.name || ''}</p>
              </div>

              <Button
                onClick={() => {
                  setModalVisible(true)
                  setShippingCompanyName(shipping.name)
                }}
                type="primary"
                style={{
                  backgroundColor: shipping.active && '#68D69D',
                  border: 'none',
                  display:
                    shipping.name === 'Giao Hàng Nhanh' || shipping.name === 'Giao Hàng Tiêt Kiệm'
                      ? ''
                      : 'none',
                }}
              >
                {shipping.active ? 'Đã kích hoạt' : 'Kích hoạt ngay'}
              </Button>
            </Row>
          </Col>
        ))}
      </Row>
    </div>
  )
}
