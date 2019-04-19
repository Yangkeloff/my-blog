## 运行
### server
`mongod`  
``` 
cd ./server
npm i & cnpm i
npm run dev
```

### client & admin
```
cd ./admin & cd ./client
npm i & cnpm i
npm run dev
```

## 坑
1. vue组件中引入外部styl文件需要在路径前加`~`,否则会报错
    ```
    @import '~asset/base.styl'
    ```
    > stylus-loader can also take advantage of webpack's resolve options. With the default options it'll find files in web_modules as well as node_modules, make sure to prefix any lookup in node_modules with ~. For example if you have a styles package lookup files in it like @import '~styles/my-styles. 