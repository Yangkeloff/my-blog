<template>
  <div class="sidebar">
    <div class="user">
      <div class="avatar">
        <img src="../assets/img/avatar.png" alt="admin avatar">
      </div>
      <div class="name">
        {{this.$store.state.adminInfo.admin_name}}
      </div>
    </div>
    <ul class="nav">
      <li><router-link to="/admin/article">文章管理</router-link></li>
      <li><router-link to="/admin/tags">标签管理</router-link></li>
      <li><router-link to="/admin/works">作品管理</router-link></li>
      <li><router-link to="/admin/setting">设置</router-link></li>
      <li><router-link to="/admin/new">写文章</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '~asset/stylus/base.styl'
.sidebar
  background bgColor
  width 200px
  .user
    height 220px
    border-bottom 3px solid #DCDFE6
    text-align center
    .avatar
      box-sizing border-box
      padding-top 40px
      height 150px
      img 
        width 100px
        height 100px
        border-radius 50%
    .name
      box-sizing border-box
      height 70px
      padding-top 15px
      font-size 20px
      color text-light
  .nav
    list-style none
    padding 0
    padding-top 50%
    margin 0
    height 100%
    li
      list-style none
      a 
        text-align center
        display block
        margin 30px 0
        color text-light
        text-decoration none 
        font-size 18px
        transition color .4s
        &:hover
          color text-hover
      .router-link-exact-active
        color text-active
</style>
