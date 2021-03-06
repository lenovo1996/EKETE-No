import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment'
import styles from './update_business.module.scss'
import {
  Card,
  Avatar,
  Typography,
  Button,
  Form,
  Input,
  Upload,
  Tabs,
  List,
  notification,
  Modal,
  Row
} from 'antd'

//api
import { uploadFile } from 'apis/upload'
import { detailBusiness, updateBusiness } from 'apis/business'


export default function Update_business({children}) {
  const { Meta } = Card
  const { Title } = Typography
  const { TabPane } = Tabs
  const { id } = useParams()

  const [business, setBusiness] = useState([])
  const [loading, setLoading] = useState(false)
  const [listImage, setList_image] = useState([])
  const [coverImage, setCoverImage] = useState('')
  const [avatar, setAvatar] = useState('')
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)
  const dispatch = useDispatch()

  const _getDetailBusinesses = async (id) => {
    try {
      const res = await detailBusiness(id)
      if (res.status === 200) {
        setBusiness(res.data.data)
        form.setFieldsValue({ ...res.data.data })
      }
    } catch (e) {
      console.log(e)
    }
  }
  const _upload = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      listImage.push(url)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const _uploadCoverImage = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      setCoverImage(url)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const _uploadAvatar = async (file) => {
    try {
      setLoading(true)
      const url = await uploadFile(file)
      setAvatar(url)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  const [form] = Form.useForm()
  const _editBusiness = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()

      setLoading(true)
      const body = {
        ...dataForm,
        business_name: dataForm.business_name || '',
        business_desiption: dataForm.business_desiption || '',
        list_image: listImage || '',
      }

      if (coverImage) {
        body['business_cover_image'] = coverImage
      }
      if (avatar) {
        body['logo'] = avatar
      }

      let res = await updateBusiness(body, id)

      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          dispatch({ type: 'UPDATE_BUSINESS', data: {
            business_id: id, 
            ...body
          } })
          notification.success({
            message: `C???p nh???t ch???c n??ng th??nh c??ng`,
          })
        } else
          notification.error({
            message: res.data.message || `C???p nh???t ch???c n??ng th???t b???i, vui l??ng th??? l???i`,
          })
      } else
        notification.error({
          message: res.data.message || `C???p nh???t ch???c n??ng th???t b???i, vui l??ng th??? l???i`,
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    _getDetailBusinesses(id)
  }, [id])

  return (
    <>
      <div onClick={toggle}>{children}</div>
      <Modal
        width="60%"
        style={{ height: '70%', marginTop: '-100px' }}
        title="C???p nh???t c???a h??ng c???a b???n"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        centered
        visible={visible}
        footer={
          <Row justify="end" style={{ height: 78, paddingTop: 24 }}>
            <Button
              onClick={_editBusiness}
              loading={loading}
              size="large"
              type="primary"
              style={{ width: 230, background: '#1e4db7' }}
            >
              C???p nh???t c???a h??ng
            </Button>
          </Row>
        }
      >
        {/* <div className={styles['header']}>
        <Title level={1} style={{ margin: 20 }}>
          H??? S?? Shop
        </Title>
        <h2 style={{ color: '#b3b3cc', marginLeft: 20 }}>
          Xem t??nh tr???ng Shop v?? c???p nh???t h??? s?? Shop c???a b???n
        </h2>

        <Tabs
          defaultActiveKey="1"
          // onChange={onChange}
          style={{ backgroundColor: 'white', marginLeft: 30 }}
        >
          <TabPane tab="Th??ng tin c?? b???n" key="1"></TabPane>
        </Tabs>
      </div> */}

        <Form form={form} className={styles['form']}>
          <div className={styles['container']}>
            <div id="update">
              <div
                className={styles['card']}
                style={{ backgroundImage: `url(${business.business_cover_image})` }}
              >
                <Meta
                  avatar={
                    <div
                      className={styles['avatar']}
                      style={{ backgroundImage: `url(${business.logo})` }}
                    >
                      <Upload
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        data={_uploadAvatar}
                      >
                        <div className={styles['edit_avatar']}>S???a</div>
                      </Upload>
                    </div>
                  }
                  title={
                    <Title level={2} style={{ color: 'white' }}>
                      {business.business_name}
                    </Title>
                  }
                  description={
                    <div style={{ display: 'flex' }}>
                      <span style={{ color: 'white', fontSize: 15, float: 'left' }}>
                        ???? tham gia:
                      </span>
                      <span style={{ color: 'white', fontSize: 15, marginLeft: 3 }}>
                        {business.create_date &&
                          moment(business.create_date).format('DD-MM-YYYY HH:mm')}
                      </span>
                    </div>
                  }
                  style={{ marginTop: 20, marginLeft: 10, fontSize: 30 }}
                />
                <Upload
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  data={_uploadCoverImage}
                >
                  <div className={styles['edit_cover_image']}>S???a ???nh b??a</div>
                </Upload>
              </div>
              <List
                //  className={styles['list']}
                dataSource={[
                  {
                    id: 1,
                    name: 'Giao di???n Shop tr??n m??y t??nh',
                    src: 'https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-lcd-vector-icon-white-background-png-image_1870176.jpg',
                    a: 'Xem >',
                  },
                  {
                    id: 2,
                    name: 'S???n ph???m',
                    src: 'https://cdn1.vectorstock.com/i/1000x1000/96/40/magic-open-box-line-icon-box-with-stars-vector-24019640.jpg',
                    a: '784 >',
                  },
                  {
                    id: 3,
                    name: 'T??? l??? ph???n h???i',
                    src: 'https://cdn5.vectorstock.com/i/1000x1000/78/34/chat-icon-isolated-on-white-background-from-vector-27697834.jpg',
                    a: '97%',
                  },
                  {
                    id: 4,
                    name: 'Th???i gian ph???n h???i',
                    src: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
                    a: 'V??i ti???ng',
                  },
                  {
                    id: 5,
                    name: '????nh gi?? Shop',
                    src: 'https://cdn3.vectorstock.com/i/1000x1000/09/42/star-icon-vector-22390942.jpg',
                    a: '0,0(000)',
                  },
                  {
                    id: 6,
                    name: 'T??? l??? ????n kh??ng th??nh c??ng',
                    src: 'https://media.istockphoto.com/vectors/bill-icon-vector-design-trendy-vector-id1284067597?k=20&m=1284067597&s=612x612&w=0&h=7rHw18-AHc771dObKJZY3s5_ifMjd4cfs6e93MkZ61s=',
                    a: '0,00%',
                  },
                ]}
                bordered
                renderItem={(item) => (
                  <List.Item key={item.id} actions={[<a>{item.a}</a>]}>
                    <List.Item.Meta avatar={<Avatar src={item.src} />} title={item.name} />
                  </List.Item>
                )}
              />
            </div>
            <div className={styles['container_right']}>
              <Title level={3}>T??n Shop</Title>
              <Form.Item name="business_name">
                <Input />
              </Form.Item>
              <Title level={3}>M?? t??? h??nh ???nh v?? video</Title>
              {business.list_image ? (
                <>
                  {business.list_image.map((e) => (
                    <>
                      <img style={{ width: 100, height: 100, margin: 5 }} src={e}></img>
                    </>
                  ))}
                </>
              ) : null}
              <Upload
                name="image2"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                data={_upload}
                // beforeUpload={beforeUpload}
              >
                H??nh ???nh v?? video
              </Upload>
              <Title level={3}>M?? t??? Shop</Title>
              <Form.Item name="business_desiption">
                <Input.TextArea
                  size="large"
                  placeholder="Nh???p m?? t??? ho???c th??ng tin v??? Shop c???a b???n"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  )
}
