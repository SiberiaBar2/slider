
'use-strict'

import React, { Children, Component} from 'react';
import { observer, inject } from 'mobx-react'
import { autorun, toJS } from 'mobx'
import { Button, Table, Input, Select, Popover } from 'antd'
// import Icon from 'antd';
import propTypes from 'prop-types';
import {
  RestFilled,
  PlusOutlined
} from '@ant-design/icons';
import { GithubPicker } from 'react-color'
import cx from 'classnames'
import './index.css'
import {
  renderGraph
} from '../../constant/index';
import {
  basicInfo,
  word,
  param,
  graph,
  sign
} from '../../constant/index'
import SvgDraw from '../../component/SvgDraw/SvgDraw';


const { Option } = Select
@inject('SvgEditor')
@observer
class SvgEditor extends Component {

  componentDidMount() {
    const { initRenderSvgEdit } = this.props.SvgEditor
    initRenderSvgEdit()
  }

  getScrollHeight = () => {
    const getTabody = document.querySelector('.common-table')
    const getHeight = getTabody
      && (getTabody.offsetHeight < 280
        ? getTabody.offsetHeight
        : getTabody.offsetHeight - 40)
    return getHeight
  }

  getAttrs = () => {
    return {
      trigger: 'click',
      placement: 'top'
    }
  }

  getColor = fill => {
    const { hex } = fill
    return hex
  }

  renderSvgDraw = () => {
    const {
      textContainer
    } = this.props.SvgEditor
    // console.log('textContainer',toJS(textContainer))
    const data = [
      ...toJS(textContainer)
    ]
    return <div className={cx('svg-draw')}>
      <SvgDraw data={data} />
    </div>
  }

  renderTabs = () => {
    const {
      svgCurrentKey,
      svgTablist,
      svgTabChange
    } = this.props.SvgEditor
    return <div
      className={cx('svg-tablist')}
    >{
        svgTablist.map(({ key, label }) => {
          return <div
            key={key}
            onClick={() => svgTabChange(key)}
            className={cx('tablist-item', { 'activetab': svgCurrentKey === key })}
          >
            {label}
          </div>
        })}
    </div>
  }

  renderBasicInfo = () => {
    const {
      getName,
      basicSize,
      getSize,
      basicDirection,
      getDirection,
      basicTags,
      getScreenTags,
      basicId,
      getScreenId,
      screenNameChange,
      screenSizeChange,
      screenDirectionChange,
      screenTagChange,
      screenIdChange
    } = this.props.SvgEditor
    // console.log('getDirection', getDirection)
    return <div className={cx('form-basic')}>
      {/* <div className={cx('form-info')}></div> */}
      <div className="formitem-list">
        <div className="form-item">
          <Input
            value={getName}
            placeholder="请输入名称"
            className="common-input"
            onChange={e => screenNameChange(e.target.value)}
          />
        </div>
        <div className="form-item">
          <Select
            value={getSize}
            className="common-select"
            placeholder="请输入尺寸"
            onChange={value => screenSizeChange(value)}
          >
            {basicSize.map((v, index) => {
              return <Option key={index} value={v}>{v}</Option>
            })}
          </Select>
        </div>
        <div className="form-item">
          <Select
            value={getDirection}
            className="common-select"
            placeholder="请输入朝向"
            onChange={value => screenDirectionChange(value)}
          >
            {Object.values(basicDirection).map((v, index) => {
              return <Option key={index} value={v}>{v}</Option>
            })}
          </Select>
        </div>
        <div className="form-item">
          <Select
            value={toJS(getScreenTags)}
            mode="multiple"
            className="more-choose"
            placeholder="添加标签"
            onChange={(value) => screenTagChange(value)}
            filterOption={(inputValue, option) => {
              if (option.children.inputValue) return true
            }}
          >
            {/* mobx 怎么能直接遍历或遍历时的回调函数能够解构呢？ */}
            {Object.values(basicTags).map((v, index) => {
              return <Option key={index} value={v}>{v}</Option>
            })}
          </Select>
        </div>
        <div className="form-item">
          <Select
            value={toJS(getScreenId)}
            mode="multiple"
            className="more-choose"
            placeholder="关联"
            onChange={value => screenIdChange(value)}
            filterOption={(inputValue, option) => {
              if (option.children.inputValue) return true
            }}
          >
            {Object.values(basicId).map((v, index) => {
              return <Option key={index} value={v}>{v}</Option>
            })}
          </Select>
        </div>
      </div>
      <div className={cx('opera')}>
        <div className={cx('operatwo')}>
          <Button type="primary" >保存</Button >
          <Button >返回</Button >
        </div>
        <Button >预览</Button >
      </div>
    </div>
  }

  // popoverContent = () => {
  //   return 
  // }
  renderWord = () => {
    const {
      textContainer,
      addtext,
      textValueChange,
      deleteText
    } = this.props.SvgEditor
    return <div className={cx('form-common')}>
      <Table
        className="common-table"
        scroll={{ y: this.getScrollHeight() }}
        dataSource={toJS(textContainer)}
        pagination={false}
        columns={[{
          title: '基本信息',
          dataIndex: 'dataindex',
          width: '30%',
          render: (text, record, index) => (
            <Input
              value={record.text}
              placeholder="请输入文字"
              className="form-wordinput"
              onChange={(e) => textValueChange('text', index, e.target.value)}
            />
          )
        },
        {
          title: '字号',
          dataIndex: 'size',
          width: '20%',
          render: (text, record, index) => (
            <Input
              value={record.fontSize}
              placeholder="请输入字号"
              className="form-size"
              onChange={(e) => textValueChange('fontSize', index, e.target.value)}
            />
          )
        },
        {
          title: '颜色',
          dataIndex: 'size',
          width: '20%',
          render: (text, record, index) => {
            return <Popover
              {...this.getAttrs()}
              content={<GithubPicker
                color={record.fill}
                onChange={fill => textValueChange('fill', index, this.getColor(fill))}
              />}
            >
              <div className={cx('color-wrap')}>
                <div className={cx('color-center')} style={{ background: record.fill || 'green' }}></div>
              </div>
            </Popover>
          }
        },
        {
          title: '排列',
          dataIndex: 'lineup',
          width: '20%',
          render: (text, record, index) => (
            <Select
              value={record.rowAndColumn}
              onChange={value => textValueChange('rowAndColumn', index, value)}
            >
              <Option value="pr">横排</Option>
              <Option value="vr">竖排</Option>
            </Select>
          )
        },
        {
          title: '',
          dataIndex: 'size',
          width: '10%',
          render: (text, record, index) => (
            <RestFilled
              className={cx('icon-delete')}
              onClick={() => deleteText(index)}
            />
          )
        }
        ]}
      />
      <Button
        onClick={() => addtext()}
        type="dashed" className={cx('addopera')} >
        <PlusOutlined />
        添加文字
      </Button>
    </div>
  }

  renderParam = () => {
    return <div className={cx('form-common')}>param</div>
  }

  renderGraph = () => {
    return <div className={cx('form-common')}>
      <h1>graph</h1>
      <div className={cx('graph-list')}>
        {/* keys 会返回一个数组， 其中元素为字符串，全部为对象的键名 */}
        {/* entries 会返回一个二维数组 ，其中的元素以数组形式呈现，数组中包含两个元素，键名和值*/}
        {/* values 会返回一个数组，数组中的每一项为键名所对应的值 */}
        {console.log('2222222',Object.entries(renderGraph))}
        {/* {Object.values(renderGraph).map((v, index) => {
          const { detailtype, attr } = v
          const Tagtype = detailtype
          return <div className={cx('graph-item')} key={index}>
            <svg><Tagtype  {...attr} /></svg>
          </div>
        })} */}
      </div>
    </div>
  }

  renderSign = () => {
    return <div className={cx('form-common')}>sign</div>
  }

  renderBasicAndImage = () => {
    const {
      svgCurrentKey
    } = this.props.SvgEditor
    if (svgCurrentKey === basicInfo) return this.renderBasicInfo()
    if (svgCurrentKey === word) return this.renderWord()
    if (svgCurrentKey === param) return this.renderParam()
    if (svgCurrentKey === graph) return this.renderGraph()
    if (svgCurrentKey === sign) return this.renderSign()
  }




  render() {
    const {
      name,
      changeName
    } = this.props.SvgEditor
    return (
      <div className={cx('svgwarp')}>
        <div className={cx('tips')}>
          <p>{name}And{this.props.height}</p>
          <Button type="primary" onClick={changeName}>点击改名</Button>
        </div>
        <div className={cx('svg-edit')}>
          {this.renderSvgDraw()}
          <div className={cx('svg-main')}>
            {this.renderTabs()}
            {this.renderBasicAndImage()}
          </div>
        </div>
      </div>
    );
  }
}

SvgEditor.defaultProps = {
  height: 200
}

SvgEditor.propTypes = {
  width: propTypes.string
}


export default SvgEditor;
