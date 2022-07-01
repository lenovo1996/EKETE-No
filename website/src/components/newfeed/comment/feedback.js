/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'

//antd
import {Modal, Form, Row, Input, Button} from 'antd'
import styles from './assess.module.scss'

export default function Feedback({children}) {
  const toggle = () => setVisible(!visible)
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div onClick={toggle}>{children}</div>
      <Modal
        width="802px"
        height="628px"
        title={<h1 className={styles['title-page']}> Phản hồi riêng</h1>}
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
          <Form.Item label={<p className={styles['title-input']}> Nội dung phản hồi</p>}>
            <Input.TextArea className={styles['input-big']} placeholder="Nhập nội dung phản hồi"></Input.TextArea>
          </Form.Item>

          <Row justify="end">
            <Form.Item>
              <Button type="primary" className={styles['button-feedback']}>
                Phản hồi
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
