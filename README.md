# react-kandian

[![Build Status](https://travis-ci.org/yhlben/react-kandian.svg?branch=master)](https://travis-ci.org/yhlben/react-kandian)
[![codecov](https://codecov.io/gh/yhlben/react-kandian/branch/master/graph/badge.svg)](https://codecov.io/gh/yhlben/react-kandian)

[在线预览](http://47.107.177.146:8081/)

一个简易的新闻站点(切换分支可查看不同技术栈)

## react 技术相关

### 核心

- react
- react-dom

### 路由

- react-router

### 状态管理

- redux
- mobx

### 性能优化

- immutable (配合 shouldComponentUpdate,侵入性太强,可以使用 seamless-immutable,immer 解决)
- reselect (优化 react-redux)

### 处理异步

- redux-thunk
- redux-saga (抽离 sagas 文件,简化 reducer)
- redux-observable (抽离 epic 文件,简化 reducer,需引入 rxjs)

### 构建工具

- webpack (编译 jsx,css-in-js,压缩合并打包等)
- docker（发布到服务器）

### 优秀的脚手架

- create-react-app
- dva-cli

> 提示：切换分支查看不同版本
