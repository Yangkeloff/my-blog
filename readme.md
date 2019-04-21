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

## 涉及到的mongodb使用 

### $in
>The $in operator selects the documents where the value of a field equals any value in the specified array. To specify an $in expression, use the following prototype

```
{ field: { $in: [<value1>, <value2>, ... <valueN> ] } }
```
If the field holds an array, then the $in operator selects the documents whose field holds an array that contains at least one element that matches a value in the specified array 
### $or
>The $or operator performs a logical OR operation on an array of two or more <expressions> and selects the documents that satisfy at least one of the <expressions>. The $or has the following syntax

Consider the following example:
```
db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
```
This query will select all documents in the inventory collection where either the quantity field value is less than 20 or the price field value equals 10
## 坑
1. vue组件中引入外部styl文件需要在路径前加`~`,否则会报错
    ```
    @import '~asset/base.styl'
    ```
    > stylus-loader can also take advantage of webpack's resolve options. With the default options it'll find files in web_modules as well as node_modules, make sure to prefix any lookup in node_modules with ~. For example if you have a styles package lookup files in it like @import '~styles/my-styles. 