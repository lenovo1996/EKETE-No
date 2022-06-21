import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './custom-antd.css'
import './views/user/business_user/business_user.module.css'
import 'chartkick/chart.js'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import 'antd/dist/antd.less'
import viVN from 'antd/lib/locale/vi_VN'
import i18n from './locales/i18n'
import { I18nextProvider } from 'react-i18next'
import { ConfigProvider } from 'antd'
const data = {
  "module_type": "menu",
  "title": "My Site",
  "menu": [{
      "link": "/home",
      "title": "Home"
    },
    {
      "link": "#",
      "title": "Fruit",
      "menu": [{
          "link": "/apples",
          "title": "Apples"
        },
        {
          "link": "/bananas",
          "title": "Bananas"
        },
        {
          "link": "/kiwi",
          "title": "Kiwi"
        },
        {
          "link": "/pears",
          "title": "Pears"
        }
      ]
    },
    {
      "link": "#",
      "title": "Vegetables",
      "menu": [{
          "link": "/carrots",
          "title": "Carrots"
        },
        {
          "link": "/celery",
          "title": "Celery"
        },
        {
          "link": "/potatoes",
          "title": "Potatoes"
        },
        {
          "link": "#",
          "title": "More",
          "menu": [{
              "link": "/thirdlevel1",
              "title": "3rd level menu"
            },
            {
              "link": "/thirdlevel2",
              "title": "3rd level two"
            }
          ]
        }
      ]
    },
    {
      "link": "/about",
      "title": "About"
    },
    {
      "link": "/contact",
      "title": "Contact"
    }
  ]
}




const renderMenu = items => {
  return <ul>
    { items.map(i => {
      return <li>
        <a href={i.link}>{ i.title }</a>
        { i.menu && renderMenu(i.menu) }
      </li>
    })}
  </ul>
}

const Menu = ({ data }) => {
  return <nav>
    <h2>{ data.title }</h2>
    { renderMenu(data.menu) }
  </nav>
}
ReactDOM.render(
 
  <ConfigProvider locale={viVN}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}> 
        <PersistGate loading={<div>loading ...</div>} persistor={persistor}> 
          <App />
         </PersistGate> 
      </Provider> 
    </I18nextProvider>
   </ConfigProvider>,
  // <Menu data={data} />,
  
  
  
  document.getElementById('root')
)



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
