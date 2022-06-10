import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION, ROUTES_USER, ROUTES_ADMIN } from './consts'
import { clearBrowserCache } from 'utils'
import jwt_decode from 'jwt-decode'
import { socket } from 'socket'
import { useHistory } from 'react-router-dom'

//components
import Views from 'views'
import Loading from 'components/loading/Loading'
import LoadingCheckDomain from 'views/user/loading'

//apis
// import { checkDomain } from 'apis/app'
import { getBusinesses } from 'apis/business'
import { refresh } from 'apis/auth'

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const dataUser = useSelector((state) => state.login.dataUser)
  const domain = window.location.href
  let subDomain = domain.split(`.${process.env.REACT_APP_HOST}`)
  const token = localStorage.getItem('accessToken')
  const refreshToken = localStorage.getItem('refreshToken')
  const [loadingCheckDomain, setLoadingCheckDomain] = useState(false)

  // const getBusiness = async () => {
  //   try {
  //     const res = await getBusinesses({ _business: true })
  //     if (res.status === 200)
  //       if (res.data.data)
  //         if (localStorage.getItem('accessToken')) {
  //           const dataUser = jwt_decode(localStorage.getItem('accessToken'))
  //           if (dataUser && dataUser.data) {
  //             const business = res.data.data.find(
  //               (e) =>
  //                 e._business && e._business.business_name === dataUser.data._business.business_name
  //             )

  //             if (business) {
  //               document.querySelector("link[rel*='icon']").href = business._business
  //                 ? business._business.company_logo
  //                 : ''
  //               dispatch({ type: 'GET_SETTING_APP', data: business._business || {} })
  //             }
  //           }
  //         }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  if (
    (domain === `${process.env.REACT_APP_HOST}${process.env.REACT_APP_HOST}/` ||
      domain === `${process.env.REACT_APP_HOST}${process.env.REACT_APP_HOST}` ||
      domain === `${process.env.REACT_APP_HOST}/` ||
      domain === process.env.REACT_APP_HOST) &&
    subDomain &&
    subDomain.length === 1
  )
    window.location.href = `${process.env.SCHEMA}${process.env.REACT_APP_HOST}${ROUTES_USER.LOGIN}`

  // const checkSubdomain = async () => {
  //   let router = ''

  //   if (domain.includes(`${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`))
  //     router = ROUTES.CHECK_SUBDOMAIN
  //   if (domain.includes(`${process.env.REACT_APP_HOST}${ROUTES.REGISTER}`)) router = ROUTES.REGISTER
  //   if (domain.includes(`${process.env.REACT_APP_HOST}${ROUTES.LOGIN}`)) router = ROUTES.LOGIN

  //   if (router === ROUTES.LOGIN) {
  //     setLoadingCheckDomain(true)

  //     if (subDomain && subDomain.length === 2) {
  //       subDomain = subDomain[0].split('//')

  //       const res = await checkDomain(subDomain[1])
  //       if (res.status === 200) {
  //         if (!res.data.success) {
  //           window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.REGISTER}`
  //           return
  //         }
  //       } else {
  //         window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.REGISTER}`
  //         return
  //       }
  //     } else {
  //       window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.REGISTER}`
  //       return
  //     }
  //   }

  //   if (router === ROUTES.REGISTER)
  //     if (subDomain && subDomain.length === 2)
  //       window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.REGISTER}`

  //   if (router === ROUTES.CHECK_SUBDOMAIN)
  //     if (subDomain && subDomain.length === 2)
  //       window.location.href = `http://${process.env.REACT_APP_HOST}${ROUTES.CHECK_SUBDOMAIN}`

  //   setLoadingCheckDomain(false)
  // }

  const checkToken = async () => {
    if (token) {
      const res = await refresh({ refreshToken: refreshToken })
      if (res.status === 404) {
        dispatch({ type: ACTION.LOGOUT })
        history.push(ROUTES_ADMIN.LOGINADMIN)
      } else {
        if (res.data.success) {
          dispatch({ type: ACTION.LOGIN, data: res.data })
          const dataUser = jwt_decode(token)
          if (dataUser) dispatch({ type: 'SET_BRANCH_ID', data: dataUser.data.store_id })
        }
      }
    }
  }

  useEffect(() => {
    if (token) socket.on(`delete_staff`, (data) => checkToken())
  }, [dataUser])

  // useEffect(() => {
  //   getBusiness()
  // }, [dataUser])

  useEffect(() => {
    checkToken()
    // checkSubdomain()
    // clearBrowserCache()
  }, [])

  return loadingCheckDomain ? (
    <LoadingCheckDomain />
  ) : (
    <>
      <Loading />
      <Views />
    </>
  )
}

export default App



// docker run --name zimbra-ekata2 -it -p 25:25 -p 80:80 -p 465:465 -p 587:587 -p 110:110 -p 143:143 -p 993:993 -p 995:995 -p 443:443 -p 3443:3443 -p 9071:9071 -h mail.ekata.vn --net=zimbranet --dns 0.0.0.0 -v zimbra-ekata:/opt/zimbra -e PASSWORD=Zimbra2021 iwayvietnam/zimbra_all