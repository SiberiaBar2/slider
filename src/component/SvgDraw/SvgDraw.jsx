import React, { Component } from 'react';
import PropTypes from 'prop-types';
import subjx from 'subjx'
import isEqual from 'lodash'
import cx from 'classnames'
import './index.css'
class SvgDraw extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drawData: []
    }
  }

  isNumber = (Number) => {
    return Object.prototype.toString.call(Number) === '[object Number]'
  }

  componentDidMount() {
    console.log('this.props', this.props)
    this.initData(this.props.data)
    let a = true
    // if(isEqual(true,a)) {
    //   console.log('相等')
    // }else{
    //   console.log('不等')
    // }
    console.log('isEqual(true,a)', isEqual(true, a))
  }

  componentWillReceiveProps(nextProps) {
    console.log('更新的数据', nextProps)
    console.log('this.props.data', this.props, nextProps)
    console.log('isequat', isEqual)
    console.log('sEqual(this.props.data, nextProps)', isEqual(this.props.data, nextProps))
    if (!Object.is(this.props.data, nextProps)) {
      console.log('走了没有')
      this.initData(nextProps.data)
    }
  }

  initData = (data) => {
    console.log('data', data)
    let newData = JSON.parse(JSON.stringify(data))

    // let newData = [
    //   {
    //     a: 'dasdas',
    //     // zIndex: 0
    //   },
    //   {
    //     b: 'qeqwe',
    //     // zIndex: 100
    //   }
    // ]

    let maxIndex = Array.isArray(newData) && Math.max(...newData.map(v => v.zIndex))
    maxIndex = maxIndex || maxIndex === 0 ? maxIndex : 0
    Array.isArray(newData) && newData.map((v, i) => {
      if (!this.isNumber(v.zIndex)) {
        v.zIndex = maxIndex + i
      }
    })

    // 总结点
    // 这里的sort加 {} 会出问题
    // 下面是正确写法 或者  arr.sort((a,b) => (a.num - b.num))
    console.log('newData', newData)
    let drawData = Array.isArray(newData) && newData.sort((a, b) => a.zIndex - b.zIndex)
    console.log('drawData', drawData)
    this.setState({ drawData: drawData }, () => {
      console.log('实时数据', this.state)
      this.moveEvent()
    })
  }

  moveEvent = () => {
    let subjxList = document.querySelectorAll('.drag')
    Array.from(subjxList).forEach((ele, index) => {
      let instance //subjx 实例对象
      let isClick = true
      let changeClick = () => { isClick = false }

      let hasEvent = ele.getAttribute('data-type')

      if (!hasEvent) {
        ele.setAttribute('data-type', true)
        ele.addEventListener('mousedown', e => {
          if (e.button === 0) {
            ele.addEventListener('mousemove', changeClick)
          }
        })

        // 包含sjx-drag 表示拖拽过了，鼠标已经抬起。
        ele.addEventListener('mouseup', e => {
          if (e.button === 0) {
            ele.addEventListener('mousemove', changeClick)
            if (isClick) {
              if (ele.classList.contains('sjx-drag')) {
                instance && instance.disable()
              } else {
                let type = ele.getAttribute('type')
                console.log('type---->', type)
                let getOption = this.options(type)
                instance = subjx(ele).drag(getOption)[0]
              }
            } else {
              isClick = true
            }
          }
        })
      }
    })
  }

  options = (type) => {
    switch (type) {
      case 'text':
      case 'param':
        return {
          onesized: false,
          onrotated: false
        }
      default:
        break;
    }
  }

  renderText = (v, index,) => {
    const { x, y, text, fontSize, fill, rowAndColumn, type } = v
    console.log('dddd', x, y, text, fontSize, fill, rowAndColumn)
    return <text
      x={x}
      y={y}
      fontSize={fontSize}
      fill={fill}
      className={`drag`}
      type={type}
    >
      {text}
    </text>
  }

  renderSvgData = () => {
    const { drawData } = this.state
    console.log('drawData------>', drawData)
    return drawData && drawData.map((v, index) => {
      const { type, detailtype } = v
      return <g key={index}>{this.renderDraw(v, index, type, detailtype)}</g>
    })
  }

  renderDraw = (v, index, type, detailtype) => {
    console.log('type', type)
    if (type === 'text') return this.renderText(v, index, type)
  }









  render() {
    return (
      <div className={cx('svg-content')}>
        <svg
          style={{ width: 300, height: 150, background: '#000' }}
        >
          {this.renderSvgData()}
        </svg>
      </div>
    );
  }
}


// SvgDraw.default

SvgDraw.propTypes = {

};


export default SvgDraw;
