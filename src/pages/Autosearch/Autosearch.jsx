import React, { useEffect, useState } from 'react'
import { AutoComplete } from 'antd';
import {
  shopList
} from '../../constant/index'

import cx from 'classnames'
import './index.css'

import propTypes from 'prop-types'
const { Option } = AutoComplete
function Autosearch(props) {

  const [originData, setOriginData] = useState(shopList)
  const [renderData, setRenderData] = useState(shopList)


  const searchShopData = (val) => {
    let newResult = originData.filter(item => {
      if (item.includes(val)) return true
    })

    setRenderData(newResult)
  }

  /**
   * renderData 不为 undefined 、 null, '', false , 0
   * 更严格的写法 ： renderData && Array.isArray(renderData) renderData.map
   * 不能使用splice方法，会改变原数组，数组可能会越截取越少！！！至于为什么，以后再谈。
   */




  return (
    <div className={cx('auto-wrap')}>
      <AutoComplete
        placeholder="请输入"
        onSearch={searchShopData}
      >
        {(renderData
          ? renderData.length >= 100
            ? renderData.slice(0, 100)
            : renderData
          : []
        ).map((v, index) => {
          return <Option
            value={v}
            key={index}
          >{v}</Option>
        })}
      </AutoComplete>
    </div>
  )
}

Autosearch.propTypes = {
  data:propTypes.number
}

export default Autosearch
