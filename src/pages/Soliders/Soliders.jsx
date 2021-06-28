import React, { useEffect, useState } from 'react'
import { Slider, Button  } from 'antd';
import cxs from 'classnames'
import moment from 'moment'
import { getArray } from '../utils/getArray'
import './solider.css'

const timeCount = 1
const timePoints = 7
const timeInterval = "HH:mm"
const speed = 2000

/***
 * 在写组件时，实现交互效果的同时，还要保证代码的美观，变量命名合理;
 * 不只是通过不断的测试实现效果就完了，还要保证链路的严密性和必要性！
 * 通过不断调试实现效果而后的不深思是技术部提升的根源！
 * 理清链路，比什么都重要，链路清晰没有废话，是一个真正工程师的标准！
 */

function Soliders() {
  let timer = null
  const [moveIndex, setChangeMoveIndex] = useState(0)
  const [switchOpen, setSwitchOpen] = useState(false)

  useEffect(() => {
    currentIndexAutoMove()
    return () => {
      clearTimer()
    }
  }, [moveIndex]);

  useEffect(() => {
    if(moveIndex === timePoints - 1){
      setSwitchOpen(true)
    }
  }, [moveIndex]);

  const mark = () => {
    return getTimeArray()
  }

  const getTimeArray = () => {
    let startTime = moment()
    // 为什么每次值变化这里都会打印？
    console.log(startTime)
    let marks = {}
    getArray(timePoints).map((v, ind) => {
      marks[ind] = startTime.clone().add(timeCount * ind, "hour").format(timeInterval)
      return marks
    })
    return marks
  }

  const currentIndexAutoMove = () => {
    if (moveIndex !== timePoints - 1) {
      timer = setTimeout(() => {
        setChangeMoveIndex(moveIndex + 1)
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
  const susPendButton = () => {
    setSwitchOpen(true)
    clearTimer()
  }

  const startButton = () => {
    setSwitchOpen(false)
    console.log("moveIndex === timePoints",moveIndex ,timePoints)
    if (moveIndex === timePoints - 1) {
      console.log('afafafafafsaafa')
      setChangeMoveIndex(0)
      // currentIndexAutoMove()
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
        ? <Button type="dashed"
          onClick={susPendButton} >
          暂停
        </Button>
        : <Button
          style={{ background: 'green', color: 'red' }}
          onClick={startButton} >
          开始
        </Button>}

    </div>
  )
}

export default Soliders
