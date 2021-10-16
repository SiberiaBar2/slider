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

  
  /**
   * 
   * @param {*} val 
   * 自动完成搜索框，将从接口取得的数据保存两份，一份用于渲染，一份用于在数值 变化时从中查找新数据返回新数组。
   * 此处使用正则表达式或者es6新增includes方法均可做此操作。
   */
  const searchShopData = (val) => {
    console.log('valcval',val);
    
    let newResult
    newResult = originData.filter(item => {
      if (item.includes(val)) {
        return true
      } else {
        return false
      }
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

// 因为父组件传递过来的是一个数组，但这里定义的数据类型为Number，因此浏览器会报错
Autosearch.propTypes = {
  data: propTypes.number
}

export default Autosearch
