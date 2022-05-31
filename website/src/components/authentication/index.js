import React, { cloneElement, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { ROUTES } from 'consts'
import jwt_decode from 'jwt-decode'
//api
import {getuserEKT} from '../../apis/user-ekt'

/**
 *
 * @param {Object} props
 * @param {Array<String>} props.permissions
 * @param {React.ReactChildren} props.children
 */
const Authentication = ({ permissions, title, children, ...props }) => {



  
  const payload =
    localStorage.getItem('accessToken') && jwt_decode(localStorage.getItem('accessToken'))== null ? false : true

  //modify title
  document.title = title

  //check đã đăng nhập chưa hoặc token còn hạn -> vào trang home hú
  if (payload) return cloneElement(children, props)
  

  //check login ?
  if (!payload) return <Redirect to={ROUTES.LOGIN} />

  return <div />
}

export default Authentication
