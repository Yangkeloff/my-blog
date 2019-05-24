## node
1. 登录到服务器，更新yum  
    ```
    yum update -y
    ```
2. 安装node  
    wget下载node安装包
    ```
    wget https://nodejs.org/dist/v10.15.3/node-v10.15.3.tar.gz
    ```
    解压
    ```
    tar xvf node-v10.15.3.tar.gz
    ```
    创建软链接，使node和npm命令全局有效。通过创建软链接的方法，使得在任意目录下都可以直接使用node和npm命令
    ```
    ln -s /root/node-v10.15.3-linux-x64/bin/node /usr/local/bin/node
    ln -s /root/node-v10.15.3-linux-x64/bin/npm /usr/local/bin/npm
    ```
    查看node、npm版本
    ```
    node -v
    npm -v
    ```
3. 安装pm2
    npm全局安装
    ```
    npm install pm2@latest -g
    ```
    创建软链接，使pm2命令全局有效、
    ```
    ln -s /root/node-v10.15.3-linux-x64/bin/pm2 /usr/local/bin/pm2
    ```
    pm2的项目结构
    ```
    $HOME/.pm2 will contain all PM2 related files  
    $HOME/.pm2/logs will contain all applications logs，日志文件夹，你会看到app-error-0.log app-out-0.log等日志，以你起的应用名称开头，输出和报错  
    $HOME/.pm2/pids will contain all applications pids  
    $HOME/.pm2/pm2.log PM2 logs  
    $HOME/.pm2/pm2.pid PM2 pid  
    $HOME/.pm2/rpc.sock Socket file for remote commands  
    $HOME/.pm2/pub.sock Socket file for publishable events  
    $HOME/.pm2/conf.js PM2 Configuration  
    ```
4. pm2启动node
    **Generate**
      进入server(node,express,koa)文件夹
      ```
      pm2 ecosystem //将生成一个简单配置文件 ecosystem.config.js
      ```
    **Config**
      ```
      module.exports = {
        /**
        * Application configuration section
        */
        apps : [
          // First application
          {
            name      : 'app_1',
            script    : '/root/project_1/app.js',
            // script为node文件入口,如koa2中为./bin/www
            env: {
              NODE_ENV: 'development'
            },
            env_production : {
              NODE_ENV: 'production'
            }
          },
          // Second application
          {
            name      : 'app_2',
            script    : '/root/project_2/app.js',
            instances : 4,
            exec_mode : 'cluster',
            env: {
              NODE_ENV: 'production'
            },
            env_production : {
              NODE_ENV: 'production'
            }
          },
          // Third application
          {
            name      : 'app_3',
            script    : '/root/project_3/master.js',
            env: {
              NODE_ENV: 'production'
            },
            env_production : {
              NODE_ENV: 'production'
            },
            node_args: "--nouse-idle-notification --gc_global --max-old-space-size=2048"
          }
        ]
      };
      ```
    **CLI**
      ```
      pm2 start ecosystem.config.js //启动所有的应用
      pm2 start ecosystem.config.js --only app_1 //启动app_1
      pm2 stop ecosystem.config.js [--only app_1] //停止
      pm2 restart ecosystem.config.js [--only app_1] //重启
      pm2 reload ecosystem.config.js [--only app_1] //重载
      pm2 delete ecosystem.config.js [--only app_1] //移除
      ```

## mongodb
1. 下载并解压
    ```
    cd /data/
    curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.4.tgz
    tar zxvf mongodb-linux-x86_64-4.0.4.tgz
    ```
2. 创建相关目录
    ```
    mv mongodb-linux-x86_64-4.0.4 mongodb
    mkdir -p mongodb/{data/db,log}
    mkdir -p /etc/mongodb
    ```
3. 创建配置文件
    ```
    vim /etc/mongodb/mgdb.conf
    ```
    ```
    dbpath=/data/mongodb/data/db  #数据文件存放目录
    logpath=/data/mongodb/log/mongodb.log  #日志文件存放目录
    port=37485  #端口，默认27017，可以自定义
    logappend=true  #开启日志追加添加日志
    fork=true  #以守护程序的方式启用，即在后台运行
    bind_ip=0.0.0.0  #本地监听IP，0.0.0.0表示本地所有IP
    auth=true  #是否需要验证权限登录(用户名和密码)
    ```
4. 添加环境变量
    ```
    vim /etc/profile
    ```
    ```
    export MONGODB_HOME=/data/mongodb
    export PATH=$PATH:$MONGODB_HOME/bin
    ```
    使环境变量立即生效
    ```
    source /etc/profile
    ```
5. 创建mongodb启动配置文件
    ```
    vim /usr/lib/systemd/system/mongodb.service
    ```
    ```
    [Unit]
    Description=mongodb
    After=network.target remote-fs.target nss-lookup.target

    [Service]
    Type=forking
    RuntimeDirectory=mongodb
    PIDFile=/data/mongodb/data/db/mongod.lock
    ExecStart=/data/mongodb/bin/mongod --config /etc/mongodb/mgdb.conf
    ExecStop=/data/mongodb/bin/mongod --shutdown --config /etc/mongodb/mgdb.conf
    PrivateTmp=true

    [Install]  
    WantedBy=multi-user.target
    ```
6. 启动mongodb并加入开机启动
    ```
    systemctl daemon-reload
    systemctl start mongodb
    systemctl enable mongodb
    ```
7. 配置firewalld防火墙策略
    ```
    firewall-cmd --permanent --add-port=37485/tcp
    firewall-cmd --reload
    ```
8. 测试
    创建管理用户
    ```
    mongo --port 37485
    ```
    ```
    mongo
    > use admin
    > db.createUser({user:"admin",pwd:"123456",roles:[{role:"userAdminAnyDatabase",db: "admin"}]})
    > db.auth('admin','123456')
    ```
    创建测试用户
    ```
    > use test
    > db.createUser({user:"yang",pwd:"123456",roles:[{role:"readWrite",db:"securitydata"}]})
    > db.auth('yang','123456')
    > exit
    ```
    用测试用户登陆
    ```
    mongo --port 37485 -u yang -p 123456
    ```
    
## 静态文件
1. 安装并配置nginx
    安装nginx
    ```
    yum install nginx
    ```
    配置nginx
    ```
    cd /
    cd etc/nginx
    vim nginx.conf
    ```
    vim编辑器的简单使用
    ```
    i    编辑
    Esc  退出编辑
    :q   退出vim编辑器
    :wq  保存并退出vim编辑器
    ```
    nginx.conf配置
    ```
    server {
      listen       80 default_server;
      listen       [::]:80 default_server;
      server_name  _;
      root         /var/www/my-blog/client/dist/; # 静态文件目录
      index        index.html;

      # Load configuration files for the default server block.
      include /etc/nginx/default.d/*.conf;

      location /api/ {
          # 把 /api 路径下的请求转发给真正的后端服务器
          proxy_pass http://172.21.0.13:3000/;
      }

      error_page 404 /404.html;
          location = /40x.html {
      }

      error_page 500 502 503 504 /50x.html;
          location = /50x.html {
      }
    }
    ```
2. 启动nginx
    CentOS7.0+ nginx实现停止、启动、重启
    ```
    systemctl stop nginx.service  
    systemctl start nginx.service
    systemctl restart nginx.service
    systemctl status nginx.service
    ```
    开机自启
    ```
    systemctl enable nginx.service
    ```
    取消开机自启
    ```
    systemctl disable nginx.servicex
    ```
3. 坑
    #### 项目上线后的跨域问题
    在本地项目中,vue-cli解决跨域的方法是在vue.config.js中更改webpack.devServer的设置
    ```
    devServer: {
      proxy: {
        '/api':{  // 只代理 /api url下的请求
          target: "http://localhost:3000/", // 后台服务器的地址
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': '' 
            /* 如果接口中是没有api的，那就直接置空，
            如果接口中有api，那就得写成{‘^/api’:‘/api’}
            */
          }
        }
      }
    }
    ```
    而在服务端中,nginx使用的是webpack build出的静态文件,并不包含devServer的内容,所以需要对nginx的配置文件进行修改
    ```
    location /api/ {
      # 把 /api 路径下的请求转发给真正的后端服务器
      proxy_pass http://xx.xx.xx.xx:5568;

      # 把host头传过去，后端服务程序将收到your.domain.name, 否则收到的是localhost:8080
      proxy_set_header Host $http_host;
      # 把cookie中的path部分从/api替换成/service
      proxy_cookie_path /api /;
      # 把cookie的path部分从localhost:8080替换成your.domain.name
      proxy_cookie_domain localhost:80 http://xx.xx.xx.xx:5568;
    }
    ```

    #### 解决vue-cli3 build包太大导致首屏过长
    1. 路由懒加载
    2. 通过CompressionWebpackPlugin插件build提供压缩
        ```
        // 安装插件
        cnpm i --save-dev compression-webpack-plugin

        // 在vue-config.js 中加入
        const CompressionWebpackPlugin = require('compression-webpack-plugin');
        const productionGzipExtensions = ['js', 'css'];
        const isProduction = process.env.NODE_ENV === 'production';

        .....
        module.exports = {
        ....
          configureWebpack: config => {
            if (isProduction) {
              config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
              }))
            }
          }
        }
        ```
    3. 启用CDN加速
        用Gzip已把文件的大小减少了三分之二了,还可以把那些不太可能改动的代码或者库分离出来,继续减小单个chunk-vendors,然后通过CDN加载进行加速加载资源
        ```
        // 修改vue.config.js 分离不常用代码库
        module.exports = {
          configureWebpack: config => {
            if (isProduction) {
              config.externals = {
                'vue': 'Vue',
                'vue-router': 'VueRouter'
              }
            }
          }
        }
        // 在public文件夹的index.html 加载
        <!-- CDN -->
        <script src="https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js"></script>
        <script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
        ```