<template>
  <div id="app">
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
*
  padding 0
  margin 0
body
  font-size 0.4rem  
  font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
  .view 
    min-height 100vh
  a
    color inherit
    text-decoration none 
</style>
