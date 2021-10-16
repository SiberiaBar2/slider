import React, { useEffect, useState } from 'react'
import { Slider, Button } from 'antd';
import cxs from 'classnames'
import * as moment from 'moment'
import { getArray } from '../utils/getArray'
import './solider.css'

const timeCount = 1
const timePoints = 7
const timeInterval = "HH:mm"
const speed = 2000

/***
 * 在写组件时，实现交互效果的同时，还要保证代码的美观，变量命名合理;
 * 不只是通过不断的测试实现效果就完了，还要保证链路的严密性和必要性！
 * 通过不断调试实现效果而后的不深思是技术不断提升的根源！
 * 理清链路，比什么都重要，链路清晰没有废话，是一个真正工程师的标准！
 */

/**
 * 1.
 * 定义一个下标初始值， 给slider的value;
 * 在初始化生命周期中初次调用 改变下标值的函数，并监听这个函数；
 * 在外部定义一个js函数，使之能够传入参数获得数组；
 * 
 */

const Soliders = () => {
  let timer = null
  const [moveIndex, setChangeMoveIndex] = useState(0)
  const [switchOpen, setSwitchOpen] = useState(false)

  // 初始化和变化时调用
  useEffect(() => {
    currentIndexAutoMove()
    return () => {
      clearTimer(timer)
    }
  }, [moveIndex]);

  useEffect(() => {
    if (moveIndex === timePoints - 1) {
      setSwitchOpen(true)
    }
  }, [moveIndex]);

  /**
   * 2.
   * 在函数的嵌套调用中，循环外部js文件 获得数组的函数，
   * 在此函数内部定义空对象，以数组的每一项作为key值，保存每一项的时间
   * 最后return，给与slidermarks属性。
   */
  const getTimeArray = () => {
    let startTime = moment()
    console.log('每次都打印',startTime)
    let marks = {}
    getArray(timePoints).map((ind) => {
      marks[ind] = startTime.clone().add(timeCount * ind, "hour").format(timeInterval)
      return marks
    })
    return marks
  }

  const mark = () => {
    return getTimeArray()
  }

  const currentIndexAutoMove = () => {
    if (moveIndex !== timePoints - 1) {
      timer = setTimeout(() => {
        setChangeMoveIndex(index => {
          return index + 1
        })
        // currentIndexAutoMove() ?? 为什么不行？
      }, speed)
    } else {
      clearTimer()
    }
  }

  const clearTimer = () => {
    timer && clearTimeout(timer)
    timer = null
  }

  const sliderChange = (val) => {
    setChangeMoveIndex(val)
  }

  // 保存后的值是异步的，打印不会立即改变
  // 而标签能马上判断出最新的值？
  /**
   * 3.
   * 暂停时切换到开始按钮；
   * 同时清除定时器，但并未清除slider value值，因此下次点击开始按钮会接着上次的value值走。
   */
  const susPendButton = () => {
    setSwitchOpen(true)
    clearTimer()
  }
  /**
   * 4.
   * 点开始时 切换到暂停按钮；
   * 同时判断当前slider的value值，若此时value值等于目标值，就重置slider的value ,重新开始一轮运行。
   * 
   */
  const startButton = () => {
    setSwitchOpen(false)
    if (moveIndex === timePoints - 1) {
      setChangeMoveIndex(0)
    } else {
      currentIndexAutoMove()
    }
  }

  return (
    <div className={cxs("wrap")}>
      <Slider
        min={0}
        max={timePoints - 1}
        tipFormatter={value => value}
        value={moveIndex}
        // defaultValue={0}
        marks={mark()}
        tooltipVisible={true}
        onChange={(value) => sliderChange(value)}
        onAfterChange={(value) => sliderChange(value)}
      />
      {!switchOpen
        ? (<Button type="dashed"
          onClick={susPendButton} >暂停</Button>)
        : (<Button
          style={{ background: 'green', color: 'red' }}
          onClick={startButton} >开始</Button>)}
    </div>
  )
}

export default Soliders
