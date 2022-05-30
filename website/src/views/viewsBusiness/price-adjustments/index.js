import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { ROUTES } from 'consts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//components
import columnsPrice from './columns'
import SettingColumns from 'components/setting-columns'
import TitlePage from 'components/title-page'

//antd
import { Row, Col, Input, Button, Space, Table, Affix } from 'antd'

//icons
import { SearchOutlined } from '@ant-design/icons'

//apis
import { getProducts } from 'apis/product'
import { getPriceAdjustments } from 'apis/price-adjustments'
import FilterDate from 'components/filter-date'

export default function PriceAdjustments() {
  const typingTimeoutRef = useRef(null)
  const branchIdApp = useSelector((state) => state.branch.branchId)

  const [columns, setColumns] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')
  const [countPriceAdjustments, setCountPriceAdjustments] = useState(0)
  const [priceAdjustments, setPriceAdjustments] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const _getPriceAdjustments = async () => {
    try {
      setLoading(true)
      const res = await getPriceAdjustments({ ...paramsFilter })
      console.log(res)
      if (res.status === 200) {
        setPriceAdjustments(res.data.data)
        setCountPriceAdjustments(res.data.count)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const _onSearch = (e) => {
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

  const _getProducts = async () => {
    try {
      const res = await getProducts({ get_all: true, branch_id: branchIdApp })
      if (res.status === 200) {
        const productsExport = []
        res.data.data.map((e) => {
          e.variants.map((variant) => {
            productsExport.push({
              'Mã sản phẩm (*)': e.sku || '',
              'Tên sản phẩm (*)': e.name || '',
              'Mã phiên bản (*)': variant.sku || '',
              'Tên Phiên bản (*)': variant.title || '',
              'Số lượng thực tế': 1,
            })
          })
        })
        setProducts(productsExport.map((product, index) => ({ STT: index + 1, ...product })))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    _getProducts()
  }, [])

  useEffect(() => {
    _getPriceAdjustments()
  }, [paramsFilter])

  return (
    <div className="card">
      <Affix offsetTop={60}>
        <TitlePage title="Phiếu điều chỉnh">
          <Space>
            <SettingColumns
              columns={columns}
              setColumns={setColumns}
              columnsDefault={columnsPrice}
              nameColumn="columnsPriceAdjustments"
            />
            <Link to={ROUTES.PRICE_ADJUSTMENTS_CREATE}>
              <Button type="primary" size="large">
                Tạo phiếu điều chỉnh
              </Button>
            </Link>
          </Space>
        </TitlePage>
      </Affix>
      <Row gutter={[10, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} sm={24} md={24} lg={9} xl={9}>
          <Input
            style={{ width: '100%' }}
            allowClear
            onChange={_onSearch}
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm theo mã phiếu kiểm hàng"
            value={valueSearch}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <FilterDate
            bordered={true}
            paramsFilter={paramsFilter}
            setParamsFilter={setParamsFilter}
          />
        </Col>
      </Row>

      <Table
        size="small"
        dataSource={priceAdjustments}
        columns={columns.map((column) => {
          if (column.key === 'stt')
            return {
              ...column,
              width: 50,
              render: (text, record, index) =>
                (paramsFilter.page - 1) * paramsFilter.page_size + index + 1,
            }
          if (column.key === 'code')
            return {
              ...column,
              render: (text, record) => (
                <Link to={{ pathname: ROUTES.PRICE_ADJUSTMENTS_UPDATE, state: record }}>
                  {record.code}
                </Link>
              ),
            }
          if (column.key === 'create_date')
            return {
              ...column,
              render: (text, record) => moment(record.create_date).format('DD/MM/YYYY, hh:mm'),
            }
          if (column.key === 'adjusted_date')
            return {
              ...column,
              render: (text, record) => moment(record.create_date).format('DD/MM/YYYY, hh:mm'),
            }
          if (column.key === 'last_update')
            return {
              ...column,
              render: (text, record) => moment(record.last_update).format('DD/MM/YYYY, hh:mm'),
            }
          return column
        })}
        loading={loading}
        style={{ width: '100%', marginTop: 10 }}
        pagination={{
          position: ['bottomLeft'],
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          pageSizeOptions: [20, 30, 40, 50, 60, 70, 80, 90, 100],
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            setParamsFilter({ ...paramsFilter, page: page, page_size: pageSize })
          },
          total: countPriceAdjustments,
        }}
      />
    </div>
  )
}
