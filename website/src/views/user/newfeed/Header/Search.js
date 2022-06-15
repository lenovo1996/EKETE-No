import { useEffect, useState, useRef } from 'react'

import styles from './newfeed.module.scss'

import { SearchOutlined } from '@ant-design/icons'

function Searchnewfeed() {
    return (
        <div className={styles['search']}>
            <input
                placeholder="Tìm kiếm sản phẩm và cửa hàng"
                spellCheck={false}
            />

            <button className={styles['search-btn']} onMouseDown={(e) => e.preventDefault()}>
                <SearchOutlined />
            </button>
        </div>
    )
}

export default Searchnewfeed
