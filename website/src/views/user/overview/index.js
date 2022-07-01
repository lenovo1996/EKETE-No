import React from 'react'
import styles from './styles/overview.module.scss'

import {Tabs} from 'antd'
import {Row} from 'antd'

// Components
import TopBusiness from 'components/newfeed/top-business'
import ShoppingHistory from 'components/newfeed/shopping-history'
import NewFeeds from 'components/newfeed/feeds'

import {
  DiffOutlined,
  HistoryOutlined,
} from '@ant-design/icons'

function App() {
  return (
    <div className={styles['container-layout']}>
      <div className={styles['container-content']}>
        <div className={styles['card-overview']}>
          <div style={{width: '100%', marginLeft: 'auto', marginRight: 'auto', padding: '0'}}>
            <Tabs defaultActiveKey="2" className={styles['container-tabs']}>
              <Tabs.TabPane
                key="1"
                tab={
                  <span className={styles['tabpane']}>
                      <DiffOutlined/>
                      Bảng tin
                    </span>
                }
              >
                <NewFeeds/>
              </Tabs.TabPane>
              <Tabs.TabPane
                key="2"
                tab={
                  <span className={styles['tabpane']}>
                      <HistoryOutlined/>
                      Lịch sử mua hàng
                    </span>
                }
              >
                <ShoppingHistory/>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </div>
        <TopBusiness/>
      </div>
    </div>
  )
}

export default App
