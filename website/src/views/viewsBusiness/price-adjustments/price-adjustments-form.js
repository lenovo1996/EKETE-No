import React, { useEffect, useState } from 'react'
import styles from './price-adjustments.module.scss'
import { useHistory, Link, useLocation } from 'react-router-dom'
import { ROUTES, IMAGE_DEFAULT, PERMISSIONS } from 'consts'
import { formatCash } from 'utils'
import { useDispatch, useSelector } from 'react-redux'

//components
import TitlePage from 'components/title-page'
import Permission from 'components/permission'

//antd
import { Row, Col, Input, Button, Table, InputNumber, Form, Select, Spin, notification } from 'antd'

//icons
import {
  ArrowLeftOutlined,
  CloseOutlined,
  SearchOutlined,
  PlusSquareOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import noData from 'assets/icons/no-data.png'

//apis
import { getProducts } from 'apis/product'
import { updatePriceAdjustments, addPriceAdjustments } from 'apis/price-adjustments'

export default function PriceAdjustments() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const location = useLocation()
  const branchIdApp = useSelector((state) => state.branch.branchId)

  const [loadingProduct, setLoadingProduct] = useState(false)
  const [products, setProducts] = useState([])
  const [listProduct, setListProduct] = useState([])

  const _createOrUpdatePriceAdjustments = async () => {
    try {
      if (listProduct.length === 0) {
        notification.warning({ message: 'Vui lòng thêm sản phẩm vào phiếu kiểm' })
        return
      }

      dispatch({ type: 'LOADING', data: true })
      const dataForm = form.getFieldsValue()
      const body = {
        ...dataForm,
        lists: listProduct.map((product) => ({
          variant_id: product.variant_id,
          price_new: product.price_after_adjustment,
        })),
        code: dataForm.code || '',
        note: dataForm.note || '',
        type: 'SELL_PRICE',
      }
      console.log(body)

      let res
      if (!location.state) res = await addPriceAdjustments(body)
      else res = await updatePriceAdjustments(body, location.state.fix_price_id)
      console.log(res)

      if (res.status === 200) {
        if (res.data.success) {
          notification.success({
            message: `${location.state ? 'Cập nhật' : 'Thêm'} phiếu điều chỉnh thành công`,
          })
          history.push({ pathname: ROUTES.PRICE_ADJUSTMENTS })
        } else
          notification.error({
            message:
              res.data.message ||
              `${
                location.state ? 'Cập nhật' : 'Thêm'
              } phiếu điều chỉnh thất bại, vui lòng thử lại!`,
          })
      } else
        notification.error({
          message:
            res.data.message ||
            `${location.state ? 'Cập nhật' : 'Thêm'} phiếu điều chỉnh thất bại, vui lòng thử lại!`,
        })
      dispatch({ type: 'LOADING', data: false })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'LOADING', data: false })
    }
  }

  const _addProductToOrder = (product) => {
    if (product) {
      const listProductNew = [...listProduct]
      const indexProduct = listProductNew.findIndex((p) => p.variant_id === product.variant_id)
      if (indexProduct === -1) listProductNew.push(product)
      else notification.warning({ message: 'Sản phẩm đã được thêm' })
      setListProduct([...listProductNew])
    }
  }

  const _removeProductToOrder = (product) => {
    if (product) {
      const listProductNew = [...listProduct]
      const indexProduct = listProductNew.findIndex((p) => p.variant_id === product.variant_id)
      if (indexProduct !== -1) listProductNew.splice(indexProduct, 1)
      setListProduct([...listProductNew])
    }
  }

  const _editProductToOrder = (value, index) => {
    const listProductNew = [...listProduct]
    listProductNew[index].price_after_adjustment = value
    setListProduct([...listProductNew])
  }

  const _getProducts = async () => {
    try {
      setLoadingProduct(true)
      const res = await getProducts({ merge: true, detach: true, branch_id: branchIdApp })
      if (res.status === 200)
        setProducts(
          res.data.data.map((e) => ({
            ...e.variants,
            price_after_adjustment: e.variants.price || 0,
          }))
        )
      setLoadingProduct(false)
    } catch (err) {
      console.log(err)
      setLoadingProduct(false)
    }
  }

  const columns = [
    {
      title: 'Mã SKU',
      dataIndex: 'sku',
    },
    {
      title: 'Tên Sản phẩm',
      dataIndex: 'title',
    },
    {
      title: 'Giá hiện tại',
      render: (text, record) => formatCash(record.price || 0),
    },
    {
      title: 'Chênh lệch',
      render: (text, record) =>
        formatCash((record.price_after_adjustment || 0) - (record.price || 0)),
    },
    {
      width: 150,
      title: 'Sau điều chỉnh',
      render: (text, record, index) => (
        <InputNumber
          disabled={location.state ? true : false}
          style={{ width: '100%' }}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          min={0}
          defaultValue={record.price_after_adjustment || 0}
          onBlur={(e) => {
            const value = e.target.value.replaceAll(',', '')
            _editProductToOrder(+value, index)
          }}
        />
      ),
    },
    {
      width: 20,
      title: '',
      render: (text, record) => (
        <DeleteOutlined
          style={{
            color: 'red',
            fontSize: 15,
            cursor: 'pointer',
            display: location.state && 'none',
          }}
          onClick={() => _removeProductToOrder(record)}
        />
      ),
    },
  ]

  useEffect(() => {
    _getProducts()
  }, [])

  useEffect(() => {
    if (location.state) {
      form.setFieldsValue({ ...location.state })
      setListProduct(
        location.state.lists.map((product) => ({
          ...product,
          price_after_adjustment: product.new_price || 0,
        }))
      )
    }
  }, [])

  return (
    <div className="card">
      <Form layout="vertical" form={form}>
        <TitlePage
          isAffix={true}
          title={
            <Link to={ROUTES.PRICE_ADJUSTMENTS}>
              <Row
                align="middle"
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 600,
                  width: 'max-content',
                }}
              >
                <ArrowLeftOutlined style={{ marginRight: 5 }} />
                {location.state ? 'Cập nhật' : 'Tạo'} phiếu điều chỉnh
              </Row>
            </Link>
          }
        >
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={_createOrUpdatePriceAdjustments}
          >
            {location.state ? 'Cập nhật' : 'Tạo'}
          </Button>
        </TitlePage>

        <Row gutter={30} style={{ marginTop: 25 }}>
          <Col span={16}>
            <div className={styles['block']}>
              <Row justify="space-between" align="middle" wrap={false}>
                <div className={styles['title']}>Thông tin sản phẩm</div>
              </Row>

              <div className="select-product-sell">
                <Select
                  disabled={location.state ? true : false}
                  notFoundContent={loadingProduct ? <Spin size="small" /> : null}
                  dropdownClassName="dropdown-select-search-product"
                  allowClear
                  showSearch
                  clearIcon={<CloseOutlined style={{ color: 'black' }} />}
                  suffixIcon={<SearchOutlined style={{ color: 'black', fontSize: 15 }} />}
                  style={{ width: '100%', marginBottom: 15 }}
                  placeholder="Tìm kiếm theo tên sản phẩm"
                  dropdownRender={(menu) => (
                    <div>
                      <Permission permissions={[PERMISSIONS.them_san_pham]}>
                        <Row
                          wrap={false}
                          align="middle"
                          style={{ cursor: 'pointer' }}
                          onClick={() => window.open(ROUTES.PRODUCT_ADD, '_blank')}
                        >
                          <div
                            style={{
                              paddingLeft: 15,
                              width: 45,
                              height: 50,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <PlusSquareOutlined style={{ fontSize: 19 }} />
                          </div>
                          <p style={{ marginLeft: 20, marginBottom: 0, fontSize: 16 }}>
                            Thêm sản phẩm mới
                          </p>
                        </Row>
                      </Permission>
                      {menu}
                    </div>
                  )}
                >
                  {products.map((data, index) => (
                    <Select.Option value={data.title} key={data.title + index + ''}>
                      <Row
                        align="middle"
                        wrap={false}
                        style={{ padding: '7px 13px' }}
                        onClick={(e) => {
                          _addProductToOrder(data)
                          e.stopPropagation()
                        }}
                      >
                        <img
                          src={data.image[0] ? data.image[0] : IMAGE_DEFAULT}
                          alt=""
                          style={{
                            minWidth: 40,
                            minHeight: 40,
                            maxWidth: 40,
                            maxHeight: 40,
                            objectFit: 'cover',
                          }}
                        />

                        <div style={{ width: '100%', marginLeft: 15 }}>
                          <Row wrap={false} justify="space-between">
                            <span
                              style={{
                                maxWidth: 200,
                                marginBottom: 0,
                                fontWeight: 600,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                                display: '-webkit-box',
                              }}
                            >
                              {data.title}
                            </span>
                            <p style={{ marginBottom: 0, fontWeight: 500 }}>
                              {formatCash(data.price)}
                            </p>
                          </Row>
                        </div>
                      </Row>
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <Table
                pagination={false}
                columns={columns}
                size="small"
                dataSource={listProduct}
                locale={{
                  emptyText: (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 200,
                      }}
                    >
                      <img src={noData} alt="" style={{ width: 90, height: 90 }} />
                      <h4 style={{ fontSize: 15, color: '#555' }}>
                        Phiếu điều chỉnh của bạn chưa có sản phẩm nào
                      </h4>
                    </div>
                  ),
                }}
              />
            </div>
          </Col>

          <Col span={8}>
            <div className={styles['block']} style={{ marginBottom: 30 }}>
              <div className={styles['title']}>Thông tin đơn hàng</div>
              <Form.Item label="Mã đơn hàng" name="code">
                <Input placeholder="Nhập mã đơn hàng" />
              </Form.Item>
              <Form.Item name="note" label="GHI CHÚ">
                <Input.TextArea rows={2} placeholder="Nhập ghi chú" />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
