<template>
  <div class="admin_page">
    <Sidebar class="side"></Sidebar>
    <router-view class="view"></router-view>
  </div>  
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="stylus" scoped>
.admin_page
  display flex
  height 100vh
  overflow hidden
  .side
    width 200px
  .view
    flex 1
</style>
