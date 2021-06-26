import React, { useEffect, useState } from 'react'
import { Slider } from 'antd';
import cxs from 'classnames'
import moment from 'moment'
import { getArray } from '../utils/getArray'
import './solider.css'

const timeCount = 1
const timePoint = 7
const timeInterval = "HH:mm"
function Soliders() {
  
  const [changeIndex, setChangeIndex] = useState(-1)

  useEffect(() => {
    // AAa()
  }, []);
  const sliderChange = (val) => {
    setChangeIndex(val)
  }

  const valMarks = () => {
    return getTimeArray()
  }


  const getTimeArray = () => {
    let startTime = moment()
    console.log(startTime)
    let marks = {}
    getArray(timePoint).map((v, ind) => {
      marks[ind] = startTime.clone().add(timeCount * ind, "hour").format(timeInterval)
      return marks
    })
    return marks
  }

  const inAfter = (val) => {
    console.log(val)
  }


  const indexEsMove = () => {
    if()
  }

  return (
    <div className={cxs("wrap")}>
      {console.log('value',changeIndex)}
      <Slider
        min={0}
        max={timePoint - 1}
        value={changeIndex}
        marks={valMarks()}
        tooltipVisible={true}
        onChange={(value) => sliderChange(value)}
        onAfterChange={inAfter}
      />
    </div>
  )
}

export default Soliders
