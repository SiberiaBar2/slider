// index

const timeLineKey = "timeline"
const othersTab = 'others'
const autoSearch = 'search'
const svg = 'svg'
const test = 'test'


// svg
const basicInfo = "basicinfo"
const word = 'words'
const param = 'params'
const graph = 'graphs'
const sign = 'signs'

const shopList = [
  "双皮奶", "狮子头", "擀面皮", "巧克力蛋糕", "热米皮", "牛肉面", "二细牛肉面", "三细牛肉面",
  "扬州炒饭", "蛋炒饭", "蛋炒土豆丝", "巧克力饼", "狮子头拌奶酪", "火腿擀面皮", "加量擀面皮",
  "热米皮拌青椒", "双皮奶加量", "海之言", "蓝色海之言", "紫色海之言", "橘黄海之言", "绿色海之言",
  "百吉猫锅巴", "三元锅巴", "酥锅巴", "AD钙", "乳酸菌AD钙", "草莓AD钙", "香辣火腿肠", "玉米火腿肠"
]


const renderGraph = {
  rectConfig: {
    type: 'graph',
    detailtype: 'rectConfig',
    attr: {
      x: 18,
      y: 18,
      width: 50,
      height: 50,
      fill: '#00FF00'
    }
  },

  circle: {
    type: 'graph',
    detailtype: 'circle',
    attr: {
      cx: 43,
      cy: 43,
      r: 25,
      fill: '#00FF00'
    }
  },

  polygon: {
    type: 'graph',
    detailtype: 'polygon',
    attr: {
      fill: '#00FF00',
      points: '43,15 68,65 18,65'
    }
  },

  line: {
    type: 'graph',
    detailtype: 'line',
    attr: {
      fill: '#00FF00',
      x1: 23,
      y1: 63,
      x2: 63,
      y2: 23,
      stroke: '#00FF00',
      strokeWidth: 2
    }
  },

  dashedline: {
    type: 'graph',
    detailtype: 'line',
    attr: {
      fill: '#00FF00',
      x1: 22,
      y1: 63,
      x2: 63,
      y2: 23,
      stroke: '#00FF00',
      strokeWidth: 2,
      strokeDasharray: "10 4"
    }
  }
}

const screenSize = [
  "300 * 200",
  "200 * 100"
]

const direction = {
  "1001": "北向南",
  "1002": "东向西",
  "1003": "东南"
}

const screenTags = {
  "rain": "雨雪天",
  "foggy": "大雾天",
  "muddy": "泥泞路段",
  "wetandslippery": "道路湿滑"
}

const screenId = {
  "10032": "10032",
  "31231": "31231",
  "bh789": "bh789"
}

const textConfig = {
  type: 'text',
  x: 0,
  y: 20,
  text: '',
  fontSize: 12,
  fill: 'red',
  rowAndColumn: 'pr'
}

const rectConfig = {
  type: 'graph',
  detailtype: 'rectConfig',
  x: 18,
  y: 18,
  width: 50,
  height: 50,
  fill: '#00FF00'
}

const orderList = [
  {
    date: '2021-09-13-12:00',
    type: '卡机订单',
    money: 0,
    backMoney: ''
  },
  {
    date: '2021-09-13-13:00',
    type: '牛恒订单',
    money: 10,
    backMoney: ''
  },
  {
    date: '2021-09-13-14:00',
    type: '浩哥订单',
    money: 20,
    backMoney: ''
  },
  {
    date: '2021-09-13-15:00',
    type: '巨哥订单',
    money: 50,
    backMoney: ''
  },
]
export {
  timeLineKey,
  othersTab,
  autoSearch,
  svg,
  test,
  shopList,
  renderGraph,
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
  rectConfig,
  orderList
}