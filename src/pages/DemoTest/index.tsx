import React, { useState, useEffect } from 'react';
import { orderList } from '../../constant/index'
import { Input, Button } from 'antd'
import cx from 'classnames'
import './index.css'

const DemoTest: React.Fc = () => {

  const [val, setVal] = useState('')
  const [chooseIndex, setChooseIndex] = useState(-1)
  const [flag, setFlag] = useState(false)
  const [list, setList] = useState(orderList)


  const valChange = (value) => {
    setVal(value)
  }

  const changeTab = (index) => {
    setChooseIndex(index)
    setFlag(true)
  }

  const btnclick = (num) => {
    if (num === 2) {
      setList((list) => {
        list[chooseIndex].backMoney = val
        return list
      })
    }
    setVal('')
    setFlag(false)
  }

  return (
    <div className={cx('wrap')}>
      <h1>test</h1>
      <div className={cx('listwrap')}>
        {
          list.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => changeTab(index)}
                className={cx('listem', { 'chooseIndex': chooseIndex === index })}
              >
                <div>{item.date}</div>
                <div>{item.type}</div>
                <div>{item.money}</div>
                {item
                  && item.backMoney
                  && <div> {item.backMoney}</div>
                }
              </div>
            )
          })
        }
      </div>
      {
        flag
          ? <div className={cx('modal')}>
            <div>真的要退款？</div>
            <div className={cx('inpwrap')}>
              <Input
                value={val}
                className={cx('inpstyle')}
                placeholder='请输入'
                onChange={(e) => valChange(e.target.value)}
              />
            </div>
            <div className={cx('btnwrap')}>
              <div className={cx('cancel')} onClick={() => btnclick(1)}>取消</div>
              <div className={cx('chooseok')} onClick={() => btnclick(2)}>确定</div>
            </div>
            {/* <Button></Button> */}
          </div>
          : null
      }
    </div >
  );
}

export default DemoTest;
