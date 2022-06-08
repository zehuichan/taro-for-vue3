# 简介

技术选型 `taro` + `vue3` + `pinia` + `nutui` + `less`

目前已集成 `eslint` + `stylelint` + `husky` + `prettier` + `lintstaged`

## CLI 工具安装

```bash
# 使用 npm 安装 CLI
npm install -g @tarojs/cli

# OR 使用 yarn 安装 CLI
yarn global add @tarojs/cli

# OR 安装了 cnpm，使用 cnpm 安装 CLI
npm install -g @tarojs/cli --registry=https://registry.npm.taobao.org
```

## 安装

```bash
# 推荐使用 yarn 安装依赖
yarn install
```

## iconfont

第一步：拷贝项目下面生成的 fontclass 代码：

```
//at.alicdn.com/t/font_8d5l8fzk5b87iudi.css
```

第二步：拷贝至以下目录：

```
src/assets/fonts/iconfont.less
```

第三步：挑选相应图标并获取类名，应用于页面：

```
<text class="iconfont icon-xxx"></text>
```

## 编译运行

### 微信小程序

#### 编译命令

```bash
yarn run dev:weapp # 开发环境 \dist\dev\weapp
yarn run build:weapp # 生产环境 (开启terser压缩) \dist\build\weapp
yarn run stage:weapp # 预发环境 (开启terser压缩) \dist\stage\weapp
```

#### 小程序开发者工具

下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，然后选择项目根目录下 `dist/weapp` 目录进行预览。

需要注意开发者工具的项目设置：

- 需要设置关闭 `ES6` 转 `ES5` 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

### 支付宝小程序

#### 编译命令

```bash
yarn run dev:alipay # 开发环境  \dist\dev\alipay
yarn run build:alipay # 生产环境 (开启terser压缩) \dist\build\alipay
yarn run stage:alipay # 预发环境 (开启terser压缩) \dist\stage\alipay
```

#### 小程序开发者工具

下载并打开[支付宝小程序开发者工具](https://opendocs.alipay.com/mini/ide/download)，然后选择项目根目录下 `dist/alipay` 进行预览。

需要注意开发者工具的项目设置：

- 需要设置关闭 `ES6` 转 `ES5` 功能，开启可能报错
- 需要设置关闭上传代码时样式自动补全，开启可能报错
- 需要设置关闭代码压缩上传，开启可能报错

## Lint

项目内集成了以下几种代码校验方式

- eslint 用于校验代码格式规范
- stylelint 用于校验 css/less 规范
- prettier 代码格式化

### ESLint

#### 手动校验代码

```bash
# 执行下面代码.能修复的会自动修复，不能修复的需要手动修改
yarn run lint:eslint
```

### 配置项

项目的 eslint 配置位于根目录下 **.eslintrc.js** 内，可以根据团队自行修改代码规范

### Stylelint

stylelint 用于校验项目内部 css 的风格,加上编辑器的自动修复，可以很好的统一项目内部 css 风格

### 配置

项目的 eslint 配置位于根目录下 **.stylelintrc.js** 内，可以根据团队自行修改代码规范

#### 手动校验代码

```bash
# 执行下面代码.能修复的会自动修复，不能修复的需要手动修改
yarn run lint:stylelint
```

### Prettier

prettier 可以用于统一项目代码风格，统一的缩进，单双引号，尾逗号等等风格

### 配置

prettier 配置文件位于项目根目录下 **.prettierrc.js**

#### 手动校验代码

```bash
# 执行下面代码.能修复的会自动修复，不能修复的需要手动修改
yarn run lint:prettier
```

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
    │  app.config.js # 小程序config
    │  app.js # 应用主入口
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
    │      useStorage
    │      watchPausable
    │      watchWithFilter
    │
    ├─components # 公共组件
    │      index.js
    │
    ├─dict # 前端字典
    │      index.js
    │
    ├─pages # 页面
    │  ├─about
    │  │      index.config.js
    │  │      index.vue
    │  │
    │  ├─account # 分包例子
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
    │      nutui/index.js # 本仓库启用全局引用 nutui UI库
    │
    ├─store # pinia
    │  │  index.js
    │  │
    │  └─modules
    │          app.js # 应用 store
    │          user.js # 用户 store
    │
    └─utils # 工具方法
            cache.js # 缓存
            index.js
            request.js # 请求
```

## 公共组件规范

```
// ToolBar 为例
root:.
    ├─components
    │  │  index.js # 统一入口
    │  │
    │  ├─ToolBar # 组件
    │  │      index.js # 必须
    │  │      index.less
    │  │      ToolBar.jsx or ToolBar.vue
    │  │
    │  └─utils # 公共组件的一些工具方法
    │          create.js
    │          format.js
    │          index.js
    │          is.js
    │          vue-util.js
    │          with-install.js
```

## GIT 相关

- main 主干
- develop 测试
- dev-xxx 对应到各个前端人员

## 常见问题

### 首先有任何报错，最简单的方法是把报错信息复制到浏览器里面搜索一下！！！

- [Google 点我](https://www.google.com/)
- [百度点我](https://www.baidu.com/)
