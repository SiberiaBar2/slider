import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'  // 必须引入antd样式文件
import morgan from 'morgan'  // 引入morgan 中间件
ReactDOM.render(
    <App />
  ,
  document.getElementById('root')
);

// 配置了环境变量 即可拿到  当前生产、开发环境
if (process.env.NODE_ENV == "development") {
  console.log('开发环境')
  console.log('dev', morgan("dev"))
  /**
   * morgan函数
   * 监听请求方式，响应，下一步
   * ƒ logger(req, res, next) {
    // request data
    req._startAt = undefined;
    req._startTime = undefined;
    req._remoteAddress = getip(req); // response data

    res._startAt = undefined;
    res…
   */
} else {
  console.log("生产环境")
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
