import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

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

} from 'antd'


//api
import { uploadFiles, uploadFile } from 'apis/upload'
import { detailBusiness, updateBusiness } from 'apis/business'


export default function Update_business() {
  const { Meta } = Card
  const { Title } = Typography
  const { TabPane } = Tabs
  const { id } = useParams()

  const [business, setBusiness] = useState([])
  const [loading, setLoading] = useState(false)
  const [listImage, setList_image] = useState([])
  const [coverImage, setCoverImage] = useState('')
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(!visible)

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

  useEffect(() => {
    _getDetailBusinesses(id)
  }, [])

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

  const [form] = Form.useForm()
  const _editBusiness = async () => {
    try {
      await form.validateFields()
      const dataForm = form.getFieldsValue()

      setLoading(true)
      const body = {
        ...dataForm,
        business_name: dataForm.business_name || '',
        logo: dataForm.logo || '',
        business_desiption: dataForm.business_desiption || '',
        list_image: listImage || '',
      }

      if (coverImage) {
        body['business_cover_image'] = coverImage
      }

      let res = await updateBusiness(body, id)

      if (res.status === 200) {
        if (res.data.success) {
          toggle()
          notification.success({
            message: `Cập nhật chức năng thành công`,

          })
          _getDetailBusinesses(id);
        } else
          notification.error({
            message: res.data.message || `Cập nhật chức năng thất bại, vui lòng thử lại`,
          })
      } else
        notification.error({
          message: res.data.message || `Cập nhật chức năng thất bại, vui lòng thử lại`,
        })
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const log1 = () => {
    console.log(1111111111)
  }
  const _coverImage =()=>{
    let coverImage1 = business.business_cover_image;
    console.log(coverImage1);
    return coverImage1
      
  }
 
  return (
    <div>
      <div className={styles['header']}>
        <Title level={1} style={{ margin: 20 }}>
          Hồ Sơ Shop
        </Title>
        <h2 style={{ color: '#b3b3cc', marginLeft: 20 }}>
          Xem tình trạng Shop và cập nhật hồ sơ Shop của bạn
        </h2>

        <Tabs
          defaultActiveKey="1"
          // onChange={onChange}
          style={{ backgroundColor: 'white', marginLeft: 30 }}
        >
          <TabPane tab="Thông tin cơ bản" key="1"></TabPane>
        </Tabs>
      </div>

      <Form form={form} className={styles['form']}>
        <div className={styles['container']}>
          <div>
            <div className={styles['card']}  style={{backgroundImage: `url(${business.business_cover_image})`}}>
              <Meta
                avatar={
                  <Avatar
                    name="logo"
                    size={90}
                    style={{ border: '2px solid white' }}
                    src={business.logo}
                    onClick={_upload}
                  >
                    <div className={styles['edit_avatar']} onClick={log1}>
                      Sửa
                    </div>
                    {/* <Avatar size={100} src={business.logo}/> */}
                  </Avatar>
                }
                title={
                  <Title level={2} style={{ color: 'white' }}>
                    {business.business_name}
                  </Title>
                }
                description={
                  <div style={{ display: 'flex' }}>
                    <span style={{ color: 'white', fontSize: 15, float: 'left' }}>
                      Đã tham gia:
                    </span>
                    <span style={{ color: 'white', fontSize: 15, marginLeft: 3 }}>
                      {business.create_date}
                    </span>
                  </div>
                }
                style={{ marginTop: 20, marginLeft: 20, fontSize: 30 }}
              />
              <Upload
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                data={_uploadCoverImage}
              >
                <div className={styles['edit_cover_image']}>Sửa ảnh bìa</div>
              </Upload>
            </div>
            <List
              style={{ marginLeft: 50 }}
              dataSource={[
                {
                  id: 1,
                  name: 'Giao diện Shop trên máy tính',
                  src: 'https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-lcd-vector-icon-white-background-png-image_1870176.jpg',
                  a: 'Xem >',
                },
                {
                  id: 2,
                  name: 'Sản phẩm',
                  src: 'https://cdn1.vectorstock.com/i/1000x1000/96/40/magic-open-box-line-icon-box-with-stars-vector-24019640.jpg',
                  a: '784 >',
                },
                {
                  id: 3,
                  name: 'Tỉ lệ phản hồi',
                  src: 'https://cdn5.vectorstock.com/i/1000x1000/78/34/chat-icon-isolated-on-white-background-from-vector-27697834.jpg',
                  a: '97%',
                },
                {
                  id: 4,
                  name: 'Thời gian phản hồi',
                  src: 'https://www.iconpacks.net/icons/1/free-time-icon-968-thumb.png',
                  a: 'Trong vòng 10 tiếng',
                },
                {
                  id: 5,
                  name: 'Đánh giá Shop',
                  src: 'https://cdn3.vectorstock.com/i/1000x1000/09/42/star-icon-vector-22390942.jpg',
                  a: '0,0(000)',
                },
                {
                  id: 6,
                  name: 'Tỉ lệ đơn không thành công',
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
            <Title level={3}>Tên Shop</Title>
            <Form.Item name="business_name">
              <Input/>
            </Form.Item>
            <Title level={3}>Mô tả hình ảnh và video</Title>
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
              Hình ảnh và video
            </Upload>
            <Title level={3}>Mô tả Shop</Title>
            <Form.Item name="business_desiption">
              <Input.TextArea
                size="large"
                placeholder="Nhập mô tả hoặc thông tin về Shop của bạn"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        </div>

        <Button
          size="large"
          type="primary"
          style={{ minWidth: 200, marginLeft: '40%', marginTop: 120 }}
          onClick={_editBusiness}
        >
          Lưu
        </Button>
      </Form>
    </div>
  )
}
