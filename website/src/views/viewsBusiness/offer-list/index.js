import React, { useEffect, useRef, useState } from 'react'
import { compare, formatCash, tableSum } from 'utils'

// style
import styles from './offer.module.scss'

// moment
import moment from 'moment'

// antd
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Button,
  Input,
  message,
  Modal,
  Select,
  Table,
  Popconfirm,
  InputNumber,
  DatePicker,
  Col,
  Row,
} from 'antd'
import { Link } from 'react-router-dom'
import { IMAGE_DEFAULT, PERMISSIONS, POSITION_TABLE, ROUTES } from 'consts'
import Permission from 'components/permission'

// api
import { deleteDeal, getDeals, updateDeal, updateDealsPrice } from 'apis/deal'

// html react parser
import parse from 'html-react-parser'
import { getEmployees } from 'apis/employee'

const { Option } = Select
const { RangePicker } = DatePicker

export default function OfferList() {
  const [selectKeys, setSelectKeys] = useState([])
  const [modalVisibleName, setModalVisibleName] = useState(false)
  const [modalVisiblePrice, setModalVisiblePrice] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)
  const [dealList, setDealList] = useState([])
  // const [name, setName] = useState('')
  const [price, setPrice] = useState([])
  const [idChange, setIdChange] = useState('')
  const [countPage, setCountPage] = useState('')
  const [paramsFilter, setParamsFilter] = useState({ page: 1, page_size: 5 })
  const [attributeDate, setAttributeDate] = useState(undefined)
  const [valueSearch, setValueSearch] = useState('')
  const [openSelect, setOpenSelect] = useState(false)
  const [valueDateSearch, setValueDateSearch] = useState(null)
  const [userList, setUserList] = useState([])
  const [valueUserFilter, setValueUserFilter] = useState(null)
  const typingTimeoutRef = useRef(null)

  // const toggleModalName = () => {
  //   setModalVisibleName(!modalVisibleName)
  // }

  const toggleModalPrice = () => {
    if (price.length === 1) {
      setPrice(price[0])
    } else {
      setPrice(0)
    }
    setModalVisiblePrice(!modalVisiblePrice)
  }

  const toggleOpenSelect = () => {
    setOpenSelect(!openSelect)
  }

  // const infoName = (record) => {
  //   setName(record.name)
  //   setIdChange(record.deal_id)
  //   setModalVisibleName(!modalVisibleName)
  // }

  const infoPrice = (record) => {
    setPrice(record.saleoff_value)
    setIdChange(record.deal_id)
    setModalVisiblePrice(!modalVisiblePrice)
  }

  const columns = [
    {
      title: 'H??nh ???nh',
      dataIndex: 'image',
      width: '15%',
      align: 'center',
      render: (text, record) => (
        <img src={text ? text[0] : IMAGE_DEFAULT} alt="" style={{ width: 80, height: 80 }} />
      ),
    },
    {
      title: 'T??n ??u ????i',
      dataIndex: 'name',
      width: '15%',
      align: 'center',
      sorter: (a, b) => compare(a, b, 'name'),
      render: (text, record, index) => (
        <Link to={{ pathname: ROUTES.OFFER_LIST_CREATE, state: record }}>{text}</Link>
      ),
    },
    {
      title: 'Lo???i ??u ????i',
      dataIndex: 'type',
      width: '15%',
      align: 'center',
      sorter: (a, b) => compare(a, b, 'type'),
      render: (text) => <b>{text}</b>,
    },
    {
      title: 'Gi???m gi??',
      dataIndex: 'saleoff_value',
      width: '15%',
      align: 'center',
      sorter: (a, b) => a.saleoff_value - b.saleoff_value,
      render: (text, record, index) => (text ? <p>{formatCash(text)}</p> : ''),
    },
    {
      title: 'Gi???m gi?? t???i ??a',
      dataIndex: 'max_saleoff_value',
      width: '15%',
      sorter: (a, b) => compare(a, b, 'max_saleoff_value'),

      align: 'center',
    },
    // {
    //   title: 'Danh m???c ??p d???ng',
    //   dataIndex: 'sub_type',
    //   width: '10%',
    //   align: 'center',
    // },
    {
      title: 'Ng?????i t???o',
      dataIndex: '_creator',
      width: '10%',
      align: 'center',
      sorter: (a, b) =>
        (a._creator && a._creator.first_name + ' ' + a._creator.last_name).length -
        (b._creator && b._creator.first_name + ' ' + b._creator.last_name).length,
      render: (text, record) => `${text.first_name} ${text.last_name}`,
    },
    {
      title: 'M?? t???',
      dataIndex: 'description',
      width: '30%',
      align: 'center',
      sorter: (a, b) => a.description.length - b.description.length,

      render: (text, record) => (!text ? '' : parse(text)),
    },
    {
      title: 'Ng??y t???o',
      dataIndex: 'create_date',
      width: '15%',
      align: 'center',
      sorter: (a, b) => moment(a.create_date).unix() - moment(b.create_date).unix(),
      render: (text) => moment(text).format('DD/MM/YYYY HH:mm:ss'),
    },
  ]

  const expandedRowRender = (record) => {
    // console.log(record)
    const columnsBanner = [
      {
        title: 'H??nh ???nh banner',
        align: 'center',
        dataIndex: '',
        render: (text, record, index) =>
          record ? <img src={record} alt="" style={{ width: '100px', height: '100px' }} /> : '',
      },
    ]

    const columnsCategory = [
      {
        title: 'T??n danh m???c',
        dataIndex: 'name',
        align: 'center',
        children: [],
      },
      {
        title: 'H??nh ???nh Category',
        align: 'center',
        dataIndex: 'image',
        render: (text, record, index) =>
          record ? (
            <img src={record.image} alt="" style={{ width: '100px', height: '100px' }} />
          ) : (
            ''
          ),
      },
      {
        title: 'M?? t???',
        dataIndex: 'description',
        align: 'center',
      },
      {
        title: '????? ??u ti??n',
        dataIndex: 'priority',
        align: 'center',
      },
      {
        title: 'Ng??y t???o',
        dataIndex: 'create_date',
        align: 'center',
        render: (text) => moment(text).format('DD/MM/YYYY h:mm:ss'),
      },
    ]
    const columnsProduct = [
      {
        title: 'H??nh ???nh',
        align: 'center',
        dataIndex: 'image',
        render: (text, record, index) =>
          record ? (
            <img
              src={text && text.length >= 1 ? text[0] : IMAGE_DEFAULT}
              alt=""
              style={{ width: '100px', height: '100px' }}
            />
          ) : (
            ''
          ),
      },
      {
        title: 'T??n s???n ph???m',
        dataIndex: 'title',
        align: 'center',
        children: [],
      },

      {
        title: 'SKU',
        dataIndex: 'sku',
        align: 'center',
      },
      {
        title: 'Danh m???c',
        dataIndex: 'category',
        align: 'center',
      },
      {
        title: 'G??a ??p d???ng',
        dataIndex: 'price',
        align: 'center',
      },
      {
        title: 'Nh?? cung c???p',
        dataIndex: 'supplier',
        align: 'center',
      },
      {
        title: 'Ng??y t???o',
        dataIndex: 'create_date',
        align: 'center',
        render: (text) => moment(text).format('DD/MM/YYYY h:mm:ss'),
      },
    ]
    const expandedRowRenderChild = (record) => {
      // console.log(record)
      const columnsChild = [
        {
          title: 'T??n s???n ph???m',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: 'H??nh ???nh',
          dataIndex: 'image',
          align: 'center',
          render: (text, record, index) =>
            text ? <img src={text} alt="" style={{ width: '100px', height: '100px' }} /> : '',
        },
        {
          title: 'M?? t???',
          dataIndex: 'description',
          align: 'center',
          render: (text) => (text ? <span>{text}</span> : <span>Ch??a c?? m?? t???</span>),
        },
        {
          title: '????? ??u ti??n',
          dataIndex: 'priority',
          align: 'center',
        },
        {
          title: 'Ng??y t???o',
          dataIndex: 'create_date',
          align: 'center',
          render: (text) => moment(text).format('DD/MM/YYYY h:mm:ss'),
        },
      ]
      return (
        <Table
          rowKey="category_id"
          columns={columnsChild}
          dataSource={record.children_category}
          pagination={false}
        />
      )
    }
    if (record.type === 'CATEGORY') {
      return (
        <Table
          rowKey="category_id"
          expandable={{
            expandedRowRender: expandedRowRenderChild,
            rowExpandable: (record) => (record.children_category.length ? true : false),
          }}
          columns={columnsCategory}
          dataSource={record._categories}
          pagination={false}
        />
      )
    }
    if (record.type === 'BANNER') {
      return <Table columns={columnsBanner} dataSource={record.image_list} pagination={false} />
    }
    if (record.type === 'PRODUCT') {
      const dataProductVariant = []
      record._products.map((product) =>
        product.variants.map((item) => dataProductVariant.push(item))
      )
      // console.log(dataProductVariant)
      return <Table columns={columnsProduct} dataSource={dataProductVariant} pagination={false} />
    }

    return ''
  }

  // const _changeDealName = async () => {
  //   const body = {
  //     name: name,
  //   }
  //   // console.log(body)
  //   try {
  //     const res = await updateDeal(body, idChange)
  //     console.log(res)
  //     if (res.data.success) {
  //       setModalVisibleName(!modalVisibleName)
  //       message.success('Thay ?????i t??n ??u ????i th??nh c??ng')
  //       _getDeal(paramsFilter)
  //     } else {
  //       message.success(res.data.message)
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const _changePrice = async () => {
    try {
      let body = {}
      let res
      if (selectKeys.length === 1) {
        body = {
          saleoff_value: price,
        }
        res = await updateDeal(body, selectKeys)
      } else {
        body = {
          saleoff_value: price,
          deal_id: selectKeys,
        }
        res = await updateDealsPrice(body)
      }
      // console.log(body)
      // console.log(res)
      if (res.data.success) {
        setModalVisiblePrice(!modalVisiblePrice)
        message.success('Thay ?????i gi?? ??u ????i th??nh c??ng')
        _getDeal(paramsFilter)
      } else {
        message.success(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const _getDeal = async () => {
    try {
      setLoadingTable(true)
      const res = await getDeals({ ...paramsFilter, _creator: true })
      setDealList(res.data.data)
      setCountPage(res.data.count)
      console.log(res)
      setLoadingTable(false)
    } catch (err) {
      console.log(err)
    }
  }

  const _getUserList = async () => {
    try {
      const res = await getEmployees({ page: 1, page_size: 1000 })
      console.log(res)
      if (res.status === 200) {
        if (res.data.success) {
          setUserList(res.data.data)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  const _delelteDeal = async () => {
    try {
      const res = await deleteDeal(selectKeys)
      // console.log(res)
      if (res.status === 200) {
        if (res.data.success) {
          message.success('X??a ??u ????i th??nh c??ng')
          _getDeal(paramsFilter)
          setSelectKeys([])
        } else {
          message.error(res.data.message || 'X??a ??u ????i kh??ng th??nh c??ng')
        }
      } else {
        message.error('X??a ??u ????i kh??ng th??nh c??ng')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeOptionSearchType = (value) => {
    if (value) paramsFilter.type = value
    else delete paramsFilter.type
    setParamsFilter({ ...paramsFilter })
  }

  const onChangeUserFilter = (value) => {
    setValueUserFilter(value)
    if (value) paramsFilter.creator_id = value
    else delete paramsFilter.creator_id
    setParamsFilter({ ...paramsFilter })
  }

  const onChangeOptionSearchDate = (value) => {
    delete paramsFilter[attributeDate]
    if (value) paramsFilter[value] = true
    else delete paramsFilter[value]
    setAttributeDate(value)
    setParamsFilter({ ...paramsFilter })
    if (openSelect) toggleOpenSelect()
  }

  const _search = (e) => {
    setValueSearch(e.target.value)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    typingTimeoutRef.current = setTimeout(async () => {
      const value = e.target.value

      //khi search hoac filter thi reset page ve 1
      paramsFilter.page = 1

      if (value) paramsFilter.name = value
      else delete paramsFilter.name

      setParamsFilter({ ...paramsFilter })
    }, 450)
  }

  const _resetFilter = () => {
    setAttributeDate(undefined)
    setValueDateSearch(null)
    setValueSearch('')
    setValueUserFilter(null)
    setParamsFilter({ page: 1, pageSize: 5 })
  }

  useEffect(() => {
    _getUserList()
  }, [])

  useEffect(() => {
    _getDeal(paramsFilter)
  }, [paramsFilter])

  return (
    <div className={styles['body_offer']}>
      {/* <Modal
        title="C???p nh???t t??n ??u ????i"
        visible={modalVisibleName}
        centered={true}
        onCancel={toggleModalName}
        footer={[
          <div style={{textAlign:"center"}}>
          <Button onClick={_changeDealName} style={{textAlign:"center"}} type="primary">
            C???p nh???t
          </Button>
          </div>
        ]}
      >
        <h3>T??n ??u ????i</h3>
        <Input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nh???p t??n ??u ????i"
        />
      </Modal> */}
      <Modal
        title="C???p nh???t gi?? ??u ????i"
        visible={modalVisiblePrice}
        centered={true}
        onCancel={toggleModalPrice}
        footer={[
          <div style={{ textAlign: 'center' }}>
            <Button onClick={_changePrice} style={{ textAlign: 'center' }} type="primary">
              C???p nh???t
            </Button>
          </div>,
        ]}
      >
        <h3>G??a ??u ????i</h3>
        <InputNumber
          style={{ width: '100%' }}
          onChange={(value) => setPrice(value)}
          value={price}
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          placeholder="Nh???p gi?? ??u ????i"
        />
      </Modal>

      <div className={styles['body_offer_header']}>
        <div className={styles['body_offer_header_title']}>
          <span className={styles['body_offer_header_list_text']}>Danh s??ch ??u ????i</span>
          <a>
            <InfoCircleOutlined />
          </a>
        </div>
        <Permission permissions={[PERMISSIONS.tao_uu_dai]}>
          <Link to={ROUTES.OFFER_LIST_CREATE}>
            <Button type="primary">T???o ??u ????i</Button>
          </Link>
        </Permission>
      </div>
      <hr />

      <div className={styles['body_offer_filter']}>
        <Row gutter={20}>
          <Col span={6}>
            <Input
              size="large"
              placeholder="T??m ki???m theo t??n"
              allowClear
              prefix={<SearchOutlined />}
              onChange={_search}
              value={valueSearch}
            />
          </Col>
          <Col span={6}>
            <Select
              size="large"
              onChange={onChangeOptionSearchType}
              value={paramsFilter.type}
              style={{ width: '100%' }}
              placeholder="T???t c??? lo???i ??u ????i"
              allowClear
            >
              <Option value="PRODUCT">S???n ph???m</Option>
              <Option value="category">Nh??m s???n ph???m</Option>
              <Option value="banner">Banner</Option>
            </Select>
          </Col>
          <Col span={6}>
            <Select
              size="large"
              onChange={onChangeUserFilter}
              value={valueUserFilter}
              style={{ width: '100%' }}
              placeholder="T??m ki???m theo ng?????i t???o"
              allowClear
              showSearch
            >
              {userList.map((item, index) => {
                return (
                  <Option value={item.user_id}>
                    {item.first_name} {item.last_name}
                  </Option>
                )
              })}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={attributeDate}
              onChange={onChangeOptionSearchDate}
              placeholder="Th???i gian"
              allowClear
              open={openSelect}
              onBlur={() => {
                if (openSelect) toggleOpenSelect()
              }}
              onClick={() => {
                if (!openSelect) toggleOpenSelect()
              }}
              dropdownRender={(menu) => (
                <>
                  <RangePicker
                    style={{ width: '100%' }}
                    onFocus={() => {
                      if (!openSelect) toggleOpenSelect()
                    }}
                    onBlur={() => {
                      if (openSelect) toggleOpenSelect()
                    }}
                    value={valueDateSearch}
                    onChange={(dates, dateStrings) => {
                      //khi search hoac filter thi reset page ve 1
                      paramsFilter.page = 1

                      if (openSelect) toggleOpenSelect()

                      //n???u search date th?? xo?? c??c params date
                      delete paramsFilter.to_day
                      delete paramsFilter.yesterday
                      delete paramsFilter.this_week
                      delete paramsFilter.last_week
                      delete paramsFilter.last_month
                      delete paramsFilter.this_month
                      delete paramsFilter.this_year
                      delete paramsFilter.last_year

                      //Ki???m tra xem date c?? ???????c ch???n ko
                      //N???u ko th?? tho??t kh???i h??m, tr??nh cash app
                      //v?? get danh s??ch order
                      if (!dateStrings[0] && !dateStrings[1]) {
                        delete paramsFilter.from_date
                        delete paramsFilter.to_date

                        setValueDateSearch(null)
                        setAttributeDate()
                      } else {
                        const dateFirst = dateStrings[0]
                        const dateLast = dateStrings[1]
                        setValueDateSearch(dates)
                        setAttributeDate(`${dateFirst} -> ${dateLast}`)

                        dateFirst.replace(/-/g, '/')
                        dateLast.replace(/-/g, '/')

                        paramsFilter.from_date = dateFirst
                        paramsFilter.to_date = dateLast
                      }

                      setParamsFilter({ ...paramsFilter })
                    }}
                  />
                  {menu}
                </>
              )}
            >
              <Option value="today">H??m nay</Option>
              <Option value="yesterday">H??m qua</Option>
              <Option value="this_week">Tu???n n??y</Option>
              <Option value="last_week">Tu???n tr?????c</Option>
              <Option value="this_month">Th??ng n??y</Option>
              <Option value="last_month">Th??ng tr?????c</Option>
              <Option value="this_year">N??m n??y</Option>
              <Option value="last_year">N??m tr?????c</Option>
            </Select>
          </Col>
        </Row>
      </div>
      <div className={styles['body_offer_delete_filter']}>
        <div>
          {selectKeys.length !== 0 ? (
            <>
              <Popconfirm
                placement="rightTop"
                onConfirm={_delelteDeal}
                title={'B???n c?? ch???c ch???n mu???n x??a ??u ????i n??y kh??ng ?'}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon={<DeleteOutlined />}>
                  X??a
                </Button>
              </Popconfirm>
              <Button
                onClick={toggleModalPrice}
                type="primary"
                style={{ margin: '0 15px', backgroundColor: '#83BC0B', border: 'none' }}
              >
                C???p nh???t gi?? ??u ????i
              </Button>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <Button onClick={_resetFilter} type="danger" icon={<FilterOutlined />}>
          X??a b??? l???c
        </Button>
      </div>
      <Table
        rowKey="deal_id"
        size="small"
        loading={loadingTable}
        columns={columns}
        dataSource={dealList}
        rowSelection={{
          selectedRowKeys: selectKeys,
          onChange: (keys, records) => {
            // console.log('records', records)
            // console.log(keys)
            const priceSelect = []
            records.map((item) => priceSelect.push(item.saleoff_value))
            setPrice(priceSelect)
            setSelectKeys(keys)
          },
        }}
        expandable={{
          expandedRowRender,
          expandedRowKeys: selectKeys,
          expandIconColumnIndex: -1,
        }}
        pagination={{
          position: POSITION_TABLE,
          total: countPage,
          current: paramsFilter.page,
          pageSize: paramsFilter.page_size,
          onChange(page, pageSize) {
            setParamsFilter({
              ...paramsFilter,
              page: page,
              page_size: pageSize,
            })
          },
        }}
        summary={(pageData) => (
          <Table.Summary.Row>
            <Table.Summary.Cell>
              <b>T???ng</b>
            </Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell></Table.Summary.Cell>
            <Table.Summary.Cell>
              <div style={{ textAlign: 'center' }}>
                {formatCash(tableSum(pageData, 'saleoff_value'))}
              </div>
            </Table.Summary.Cell>
            <Table.Summary.Cell>
              <div style={{ textAlign: 'center' }}>
                {formatCash(tableSum(pageData, 'max_saleoff_value'))}
              </div>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  )
}
