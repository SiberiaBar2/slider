
import { observable, makeAutoObservable, action } from 'mobx'
import {
  basicInfo,
  word,
  param,
  graph,
  sign,
  screenSize,
  direction,
  screenTags,
  screenId,
  textConfig,
  rectConfig
} from '../../constant/index'

const svgList = [
  {
    key: basicInfo,
    label: '基本信息'
  },
  {
    key: word,
    label: '文字'
  },
  {
    key: param,
    label: '参数'
  },
  {
    key: graph,
    label: '图形'
  },
  {
    key: sign,
    label: '标识'
  },
]

class SvgEditor {

  constructor() {
    makeAutoObservable(this)
  }

  @observable name = "牛恒"

  @action changeName = () => {
    this.name = "鸡儿恒"
  }

  @observable svgTablist = svgList
  @observable initSvgKey = basicInfo
  @observable svgCurrentKey = this.initSvgKey

  // 基础数据
  @observable basicSize = screenSize
  @observable basicDirection = direction
  @observable basicTags = screenTags
  @observable basicId = screenId

  // 模板信息
  @observable getName = ''
  @observable getSize = undefined
  @observable getDirection = undefined
  @observable getScreenTags = []
  @observable getScreenId = []

  // text and image
  @observable textContainer = []

  // @observable wordtext = ''
  @action svgTabChange = key => {
    this.svgCurrentKey = key
  }

  // basicInfo
  @action screenNameChange = name => {
    this.basicName = name
  }

  @action screenSizeChange = size => {
    this.getSize = size
  }

  @action screenDirectionChange = dir => {
    this.getDirection = dir
  }

  @action screenTagChange = tags => {
    this.getScreenTags = tags
  }

  @action screenIdChange = id => {
    this.getScreenId = id
  }


  // part 2
  @action addtext = () => {
    const text = Object.assign({}, textConfig, { key: Math.random() })
    this.textContainer.push(text)
  }

  @action textValueChange = (type, index, value) => {
    this.textContainer[index][type] = value
  }

  @action deleteText = index => {
    this.textContainer.splice(index, 1)
  }

  @action initRenderSvgEdit = () => {
    this.getScreenSizeList()
  }

  @action getScreenSizeList = () => {
    // const getscreenSize.split('*')
    // const {width , height} = 
  }
}

export default new (SvgEditor)