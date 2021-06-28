import React, { useState, useEffect } from 'react'
import Soliders from './Soliders/Soliders'
import Autosearch from './Autosearch/Autosearch'

import cx from 'classnames'
import './index.css'
import {
  timeLineKey,
  othersTab,
  autoSearch
} from '../constant/index'

const tabKeys = [
  {
    key: timeLineKey,
    label: '时间轴'
  },
  {
    key: othersTab,
    label: '其他'
  },
  {
    key: autoSearch,
    label: 'antd自动完成'
  }
]

function Index() {

  const [currentTabKey, setCurrentTabKey] = useState(timeLineKey)

  const renderTimeLine = () => {
    return (
      <div className={cx('content-center')}>
        <div className={cx('content-center-item')}><Soliders /></div>
      </div>
    )
  }

  const renderOthers = () => {
    return (
      <div className={cx('content-center')}>
        <h1>others</h1>
      </div>
    )
  }

  const renderAutoSearch = () => {
    return (
      <div className={cx('content-center')}>
        <Autosearch />
      </div>
    )
  }

  const renderRightMain = () => {
    if (currentTabKey === timeLineKey) return renderTimeLine()
    if (currentTabKey === othersTab) return renderOthers()
    if (currentTabKey === autoSearch) return renderAutoSearch()
  }

  const changeTab = (v) => {
    setCurrentTabKey(v.key)
  }




  return (
    <div>
      <div className={cx('header')}>欢迎来到Demo练习平台</div>
      <div className={cx('content')}>
        <div className={cx('left-list')}>
          {tabKeys.map((v, ind) => {
            return <div
              key={ind}
              onClick={() => changeTab(v, ind)}
              className={cx('list-item', { "activeIndex": currentTabKey === v.key })}>
              {v.label}
            </div>
          })}
        </div>
        <div className={cx('content-right')}>
          {renderRightMain()}
        </div>
      </div>
    </div>
  )
}

export default Index
