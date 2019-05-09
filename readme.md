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
2. 优雅的重新渲染组件
    在组件上绑定一个key,key的值更改时,组件便会重新渲染
    - 完整地触发组件的生命周期钩子
    - 触发过渡
    > key 的特殊属性主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试修复/再利用相同类型元素的算法。使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。
    