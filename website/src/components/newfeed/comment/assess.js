/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'

//antd
import {Modal, Form, Row, Input, Button, Rate} from 'antd'
import styles from './assess.module.scss'

export default function AssessOders({children}) {
  const toggle = () => setVisible(!visible)
  const [visible, setVisible] = useState(false)

  return (
    <>
      <div onClick={toggle}>{children}</div>
      <Modal
        width="802px"
        height="628px"
        title={<h1 className={styles['title-page']}> Đánh giá đơn hàng</h1>}
        centered
        footer={null}
        visible={visible}
        okText="Lưu"
        cancelText="Đóng"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        className={styles['center']}
      >
        <Form layout="vertical">
          <div className={styles['display-flex']}>
            <p className={styles['title-input']}>Đánh giá</p>
            <Rate allowHalf defaultValue={2.5}/>

          </div>

          <Form.Item label={<p className={styles['title-input']}> Tiêu đề</p>}>
            <Input className={styles['input']} placeholder="Nhập tiêu đề"></Input>
          </Form.Item>
          <Form.Item label={<p className={styles['title-input']}> Đánh giá</p>}>
            <Input.TextArea className={styles['input-big']} placeholder="Nhập nội dung đánh giá"></Input.TextArea>
          </Form.Item>

          <Row justify="end">
            <Form.Item>
              <Button type="primary" className={styles['button']}>
                Đánh giá
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
