# 简介

技术选型 taro + vue3 + pinia + nutui

## 安装

```bash
# 使用 yarn 安装依赖
yarn install

# OR 使用 npm 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
```

## 编译运行

### 微信小程序

#### 编译命令

```bash
npm run dev:weapp # 开发环境
npm run build:weapp # 生产环境 (开启terser压缩)
npm run stage:weapp # 预发环境 (开启terser压缩)
```

#### 小程序开发者工具

下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，然后选择项目根目录进行预览。

需要注意开发者工具的项目设置：

- 需要设置关闭 `ES6` 转 `ES5` 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

### 支付宝小程序

#### 编译命令

```bash
npm run dev:alipay # 开发环境
npm run build:alipay # 生产环境 (开启terser压缩)
npm run stage:alipay # 预发环境 (开启terser压缩)
```

#### 小程序开发者工具

下载并打开[支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)，然后选择项目根目录下 `dist` 目录（根目录 `config` 中的 `outputRoot` 设置的目录）进行预览。

需要注意开发者工具的项目设置：

- 需要设置关闭 `ES6` 转 `ES5` 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

## 目录结构

```
root:.
│  project.config.json # 微信小程序项目配置
│  project.private.config.json
│  project.tt.json
│  README.md
│          
├─config
│      dev.js # 开发环境配置
│      index.js
│      prod.js # 生产环境配置
│      stage.js # 预发环境配置
│      
└─src
    │  app.config.js
    │  app.js
    │  index.html
    │  
    ├─api # api 接口
    │      index.js
    │      
    ├─assets # 图片、视频、音频、字体等资源
    │  ├─fonts
    │  │      iconfont.less
    │  │      
    │  ├─less
    │  │      index.less
    │  │      tap.less
    │  │      unit.less
    │  │      var.less
    │  │      
    │  └─tabs
    │          tab-1-active.png
    │          tab-1.png
    │          tab-2-active.png
    │          tab-2.png
    │          tab-3-active.png
    │          tab-3.png
    │          
    ├─hooks # 一些vue3的钩子
    │      index.js
    │      useStorage.js
    │      
    ├─components # 公共组件
    │      index.js
    │      
    ├─pages # 页面
    │  ├─about
    │  │      index.config.js
    │  │      index.vue
    │  │      
    │  ├─account
    │  │  ├─center
    │  │  │      index.config.js
    │  │  │      index.vue
    │  │  │      
    │  │  └─settings
    │  │          index.config.js
    │  │          index.vue
    │  │          
    │  └─home
    │          index.config.js
    │          index.vue
    │          
    ├─plugins
    │      nutui.js
    │      
    ├─store # pinia
    │  │  index.js
    │  │  
    │  └─modules
    │          app.js
    │          user.js
    │          
    └─utils # 工具方法
            cache.js # 缓存
            index.js
            request.js # 请求
```