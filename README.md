
## JavaVue后台敏捷开发框架

### 介绍
极简的Java后端+Vue前端的后台开发框架

### 后端仓库

https://gitee.com/daenmax/quick-java-vue-admin

### 开始

```bash
# 克隆项目
git clone https://gitee.com/daenmax/quick-java-vue-admin-ui

# 进入项目目录
cd quick-java-vue-admin-ui

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

### 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
