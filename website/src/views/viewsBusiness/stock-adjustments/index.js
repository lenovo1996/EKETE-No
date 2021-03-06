import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment'
import { ROUTES } from 'consts'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

//components
import columnsStock from './columns'
import SettingColumns from 'components/setting-columns'
import exportToCSV from 'components/ExportCSV/export'
import ImportCSV from 'components/ImportCSV'
import TitlePage from 'components/title-page'
import FilterDate from 'components/filter-date'
import { createCheckInventoryNote } from 'apis/inventory'
//antd
import { Row, Col, Input, Button, Space, Table, Select, Affix, notification } from 'antd'

//icons
import { SearchOutlined, VerticalAlignTopOutlined } from '@ant-design/icons'

//apis
import { getCheckInventoryNote, importCheckInventoryNote } from 'apis/inventory'
import { getEmployees } from 'apis/employee'
import { getProducts } from 'apis/product'

const { Option } = Select
export default function StockAdjustments() {
  const dispatch = useDispatch()
  const typingTimeoutRef = useRef(null)
  const branchIdApp = useSelector((state) => state.branch.branchId)

  const [columns, setColumns] = useState([])
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 20 })
  const [valueSearch, setValueSearch] = useState('')
  const [inventoryNote, setInventoryNote] = useState([])
  const [countInventoryNote, setCountInventoryNote] = useState(0)
  const [valueUserFilter, setValueUserFilter] = useState(null)
  const [userList, setUserList] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const _getCheckInventoryNote = async () => {
    try {
      setLoading(true)
      const res = await getCheckInventoryNote({ ...paramsFilter })
      console.log('ress', res)
      if (res.status === 200) {
        setInventoryNote(res.data.data)
        setCountInventoryNote(res.data.count)
      }
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const _getUserList = async () => {
    try {
      const res = await getEmployees({ page: 1, page_size: 1000 })
      if (res.status === 200) {
        if (res.data.success) setUserList(res.data.data)
      }
    } catch (err) {
      console.log(err)
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

  const _onClearFilters = () => {
    setValueSearch('')
    setValueUserFilter()
    setParamsFilter({ page: 1, page_size: 20 })
  }

  const onChangeUserFilter = (value) => {
    setValueUserFilter(value)
    if (value) paramsFilter.creator_id = value
    else delete paramsFilter.creator_id
    setParamsFilter({ ...paramsFilter })
  }

  const _onFilter = (attribute = '', value = '') => {
    const paramsFilterNew = { ...paramsFilter }
    if (value) paramsFilterNew[attribute] = value
    else delete paramsFilterNew[attribute]
    setParamsFilter({ ...paramsFilterNew })
  }
  const _balance = async (value) => {
    try {
      const body = {
        branch_id: value.branch_id,
        products: [
          {
            product_id: value.product_id,
            variant_id: value.variant_id,
            system_quantity: value.total_quantity,
            real_quantity: value.real_quantity,
            diff_reason: value.diff_reason,
          },
        ],
        note: '',
        status: 'BALANCED',
        balance: true,
      }
      console.log(body)
      let res
      res = await createCheckInventoryNote(body)
      if (res.status === 200) {
        if (res.data.success) {
          console.log('res', res)
          _getCheckInventoryNote()
          notification.success({
            message: `C??n b???ng th??nh c??ng`,
          })
        } else
          notification.error({
            message: res.data.message || `C??n b???ng th???t b???i!`,
          })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const _getStockAdjustmentToExport = async () => {
    let dataExport = []
    try {
      dispatch({ type: 'LOADING', data: true })
      const res = await getCheckInventoryNote()
      console.log(res)
      if (res.status === 200) {
        dataExport = res.data.data.map((item, index) => ({
          STT: index + 1,
          'M?? phi???u': item.code || '',
          'Kho ki???m h??ng ': item?.branch?.name || '',
          'Tr???ng th??i': item.status || '',
          'Ng??y t???o': item.create_date || '',
          'Ng??y ki???m': item.last_update || '',
          // 'Ng??y ki???m': item.inventory_date || '',
          'Nh??n vi??n t???o': item.creator_info.name || '',
          'Ghi ch??': item.note || '',
        }))
      }
      dispatch({ type: 'LOADING', data: false })
      exportToCSV(dataExport, 'Phi???u ki???m h??ng')
    } catch (e) {
      console.log(e)
      dispatch({ type: 'LOADING', data: false })
    }
  }

  const _getProducts = async () => {
    try {
      const res = await getProducts({ get_all: true, branch_id: branchIdApp })
      if (res.status === 200) {
        const productsExport = []
        res.data.data.map((e) => {
          e.variants.map((variant) => {
            productsExport.push({
              'M?? s???n ph???m (*)': e.sku || '',
              'T??n s???n ph???m (*)': e.name || '',
              'M?? phi??n b???n (*)': variant.sku || '',
              'T??n Phi??n b???n (*)': variant.title || '',
              'S??? l?????ng th???c t???': 1,
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
    _getCheckInventoryNote()
    _getUserList()
  }, [paramsFilter])

  return (
    <div className="card">
      <Affix offsetTop={60}>
        <TitlePage title="Phi???u ki???m h??ng">
          <Space>
            <Button
              size="large"
              onClick={_onClearFilters}
              type="primary"
              danger
              style={{ display: Object.keys(paramsFilter).length <= 2 && 'none' }}
            >
              X??a b??? l???c
            </Button>
            <Button
              size="large"
              onClick={_getStockAdjustmentToExport}
              icon={<VerticalAlignTopOutlined />}
              style={{ backgroundColor: 'green', borderColor: 'green', color: 'white' }}
            >
              Xu???t excel
            </Button>
            <ImportCSV
              size="large"
              upload={importCheckInventoryNote}
              reload={_getCheckInventoryNote}
              title="Nh???p phi???u ki???m h??ng b???ng file excel"
              customFileTemplated={true}
              fileTemplated={products}
              fileName="Phi???u ki???m h??ng"
            />
            <SettingColumns
              columns={columns}
              setColumns={setColumns}
              columnsDefault={columnsStock}
              nameColumn="columnsStockAdjustments"
            />
            <Link to={ROUTES.STOCK_ADJUSTMENTS_CREATE}>
              <Button type="primary" size="large">
                T???o phi???u ki???m
              </Button>
            </Link>
          </Space>
        </TitlePage>
      </Affix>
      <Row
        gutter={[0, 16]}
        style={{
          marginLeft: 0,
          marginRight: 0,
          marginTop: 15,
          border: '1px solid #d9d9d9',
          borderRadius: 5,
        }}
      >
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Input
            allowClear
            onChange={_onSearch}
            prefix={<SearchOutlined />}
            placeholder="T??m ki???m theo m?? phi???u ki???m h??ng"
            bordered={false}
            value={valueSearch}
          />
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={6}
          xl={6}
          style={{ borderRight: '1px solid #d9d9d9', borderLeft: '1px solid #d9d9d9' }}
        >
          <FilterDate paramsFilter={paramsFilter} setParamsFilter={setParamsFilter} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} style={{ borderRight: '1px solid #d9d9d9' }}>
          <Select
            placeholder="L???c theo tr???ng th??i"
            allowClear
            showSearch
            bordered={false}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={paramsFilter.status}
            onChange={(value) => _onFilter('status', value)}
            style={{ width: '100%' }}
          >
            <Select.Option value="DRAFT">L??u nh??p</Select.Option>
            <Select.Option value="CHECKED">???? ki???m</Select.Option>
            <Select.Option value="BALANCED">???? c??n b???ng</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <Select
            onChange={onChangeUserFilter}
            value={valueUserFilter}
            style={{ width: '100%' }}
            placeholder="L???c theo nh??n vi??n t???o"
            allowClear
            showSearch
            optionFilterProp="children"
            bordered={false}
          >
            {userList.map((item, index) => {
              return (
                <Option value={item.user_id} key={index}>
                  {item.first_name} {item.last_name}
                </Option>
              )
            })}
          </Select>
        </Col>
      </Row>

      <Table
        size="small"
        scroll={{ y: 400 }}
        dataSource={inventoryNote}
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
                <Link to={{ pathname: ROUTES.STOCK_ADJUSTMENTS_UPDATE, state: record }}>
                  {record.code}
                </Link>
              ),
            }
          if (column.key === 'branch')
            return {
              ...column,
              render: (text, record) => record.branch && record.branch.name,
            }
          if (column.key === 'create_date')
            return {
              ...column,
              render: (text, record) => moment(record.create_date).format('DD/MM/YYYY, hh:mm'),
            }
          if (column.key === 'inventory_date')
            return {
              ...column,
              render: (text, record) =>
                record.last_update !== ''
                  ? moment(record.last_update).format('DD/MM/YYYY, hh:mm')
                  : // ? moment(record.inventory_date).format('DD/MM/YYYY, hh:mm')
                    'Ch??a ki???m',
            }
          if (column.key === 'note')
            return {
              ...column,
              render: (text, record) => {
                if (record.status !== 'BALANCED') {
                  return (
                    <Button type="primary" onClick={() => _balance(record)}>
                      C??n b???ng
                    </Button>
                  )
                }
              },
            }
          if (column.key === 'creator_info')
            return {
              ...column,
              render: (text, record) =>
                record.creator_info
                  ? record.creator_info.first_name + ' ' + record.creator_info.last_name
                  : '',
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
          total: countInventoryNote,
        }}
      />
    </div>
  )
}
