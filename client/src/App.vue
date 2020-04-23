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
    display flex
    flex-direction column
    .page_container 
      flex 1
      width 100%
      margin 0 auto
      padding 0 20px
      min-height 50%
      position relative
      @media screen and (min-width: 950px)
        width 950px 
      @media screen and (min-width: 1250px)
        width 1250px    
  a
    color inherit
    text-decoration none
</style>
