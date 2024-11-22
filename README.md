
## JavaVue后台敏捷开发框架-UI

### 介绍
极简的Java后端+Vue前端的后台开发框架-UI

### 后端仓库

[JavaVue后台敏捷开发框架](https://gitee.com/daenmax/quick-java-vue-admin)

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

一般有3种方式部署，我一般使用第1种

#### 第1种：通过nginx进行代理

通过nginx进行代理

打包命令`npm run build:prod`
在`.env.production`中

```
# 接口根地址
# 配置nginx代理
VUE_APP_BASE_API='/prod-api/my'
```

nginx配置（仅供参考）

```nginx
server{
        listen 80;
        server_name myadmin;
        # 代理前端
        location / {
            root /www/wwwroot/galaxy_dist;
            try_files $uri $uri/ /index.html;
            index index.html index.htm;
            error_page 405=200$request_uri;
        }
        # 代理后端
        location /prod-api/ {
            proxy_pass http://127.0.0.1:8033/;
            proxy_set_header Host $http_host;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header REMOTE-HOST $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
}
```

对于使用宝塔的用户来说，创建一个网站，把打包的`dist`文件夹放进去，

然后点击网站后面的设置，点击`配置文件`，
将以下内容放进去，保存即可

```nginx
# 代理后端
location /prod-api/ {
    proxy_pass http://127.0.0.1:8033/;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
# 解决刷新就404路由问题
location / {
   try_files $uri $uri/ /index.html;
}
```

#### 第2种：不代理，直接访问后端地址方式

直接写后端真实地址，这样会暴露后端地址，容易被攻击

打包命令`npm run build:prod`
在`.env.production`中

```
# 接口根地址
# 不配置nginx代理，会暴露后端真实地址
# VUE_APP_BASE_API='http://192.168.213.130:8033/my'
```
#### 第3种：将前端打包到后端的resources/static下

这种方式可以实现启动后端，即可访问前端

打包命令`npm run build:spring`
在`.env.spring`中

1. 修改`.env.spring`中的`VUE_APP_BASE_API`和`VUE_APP_CONTEXT_PATH`
2. 修改`router/index.js`中，mode改为`hash`
```
export default new Router({
  base: process.env.VUE_APP_CONTEXT_PATH,
  // history可以去掉url中的#，nginx部署请选择此项
  // hash，将前端打包到后端springboot的static文件夹中时请选择此项
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
```
3. 打包dist
```bash
# 构建生产环境
npm run build:spring
```
4. 将dist文件夹里的内容放到后端的`src/main/resources/static`
5. 设置后端，在`check-login.ignores`中添加以下内容
```yml
    # 前端静态资源
    - /index.html
    - /favicon.ico
    - /static/**
    - /error
```
6. 启动后端测试，例如后端设置的端口和根路径如下
```yml
# 测试环境
server:
    port: 8033
    servlet:
      context-path: /my
```
那么后端跑起来之后，前端访问地址为`http://127.0.0.1:8033/my`
