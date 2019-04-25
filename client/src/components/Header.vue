<template>
  <nav class="navbar">
    <div class="header_page">
      <div class="logo">
        <img src="" alt="">
      </div>
      <div class="nav_list">
        <ul class="item_list">
          <li class="item"><router-link to="/article-list">首页</router-link></li>
          <li class="item"><router-link to="/works">作品</router-link></li>
          <li class="item"><router-link to="/archives">归档</router-link></li>
          <li class="item"><router-link to="/about">关于</router-link></li>
        </ul>
      </div>
    </div>  
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '~style/base.styl'
.navbar
  position fixed
  width 100%
  height 60px
  line-height 60px
  top 0
  left 0
  background-color transparent-bg
  transition background-color .3s
  z-index 1000
  .header_page
    position relative
    box-sizing border-box
    margin 0 35px
    padding 0 20px
    .logo
      height 60px
      width 60px
      line-height 60px
      padding 5px 0
      box-sizing border-box
      img 
        height 50px
    .nav_list
      display block
      position absolute
      top 0 
      right 0
      .item_list
        list-style none 
        color text-light
        .item 
          display inline-block
          font-size 16px
          a
            padding 0 15px
            transition color .4s
            height 60px
            line-height 60px
            display inline-block
            &:hover 
              color text-hover
          .router-link-exact-active 
            color text-hover
</style>
