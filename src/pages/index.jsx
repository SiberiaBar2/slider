import React, { useState, useEffect } from 'react'
import Soliders from './Soliders/index'
import Autosearch from './Autosearch/Autosearch'
import SvgEditor from './SvgEditor/index'
import DemoTest from './DemoTest/index'
import cx from 'classnames'
import './index.css'
import {
  timeLineKey,
  othersTab,
  autoSearch,
  svg,
  test,
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
  },
  {
    key: svg,
    label: 'svg编辑器'
  },
  {
    key: test,
    label: 'test'
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
        <div className={cx('content-center-item')}>
          <Autosearch data={[]} />
        </div>
      </div>
    )
  }

  const renderSvgEditor = () => {
    return (
      <div className={cx('content-center')}>
        {/* <div className={cx('content-center-item')}> */}
        <SvgEditor width={'200'} />
        {/* </div> */}
      </div>
    )
  }

  const renderTest = () => {
    return (
      <div className={cx('content-center')}>
      {/* <div className={cx('content-center-item')}> */}
      <DemoTest/>
      {/* </div> */}
    </div>
    )
  }

  const renderRightMain = () => {
    if (currentTabKey === timeLineKey) return renderTimeLine()
    if (currentTabKey === othersTab) return renderOthers()
    if (currentTabKey === autoSearch) return renderAutoSearch()
    if (currentTabKey === svg) return renderSvgEditor()
    if(currentTabKey === test) return renderTest()
  }

  const changeTab = (v) => {
    setCurrentTabKey(v.key)
  }

  // when ever , no never giveup ,because the life only  have challenge can make me happy , do not ？


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
