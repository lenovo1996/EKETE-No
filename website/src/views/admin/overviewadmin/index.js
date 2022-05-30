/* eslint-disable jsx-a11y/anchor-is-valid */

// import { PAGE_SIZE } from 'consts'
import React, { useState, useEffect } from 'react'
import styles from './overview.module.scss'
import { Avatar, Button, Table } from 'antd'
import { Row, Col, Timeline, Modal } from 'antd'
import jwt_decode from 'jwt-decode'
// import ModalUpdateUser from './modal-user'
import { getuserAdmin } from 'apis/admin'

// import data from 'views/import-report-file/datatest'

function App() {
  const [user, setUser] = useState([])


  const dataUser = localStorage.getItem('accessToken')
    ? jwt_decode(localStorage.getItem('accessToken'))
    : {}

  const getInfoUser = async (params) => {
    try {
      const res = await getuserAdmin(params)
      console.log("usser admin",res);

      if (res.status === 200) {
        if (res.data.data.length) setUser({ ...res.data.data[0] })
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getInfoUser({ user_id: dataUser.data.user_id })
  }, [dataUser.data.user_id])




  return (
    <div className={styles['container-layout']}>
      helo ae admin
    </div>
  )
}

export default App
