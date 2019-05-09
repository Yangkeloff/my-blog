<template>
  <div class="bg_img" :style='"background-image:url("+bg_url+");"'>
      <div class="box">
        <p class="bg_img_title">Yang ' s Blog</p>
        <hr/>
        <p class="bg_img_desc">分享学习经历，学习前端知识</p>
      </div>
    </div>
</template>

<script>
export default {
  props: [
    'page'
  ],
  created() {
    this.$store.dispatch('get_setting_api')
  },
  computed: {
    bg_url(){
      let img_url = this.$store.state.setting.data[0]
      return img_url == null ? "": img_url.website_cover[this.page]
    }
  },
}
</script>

<style lang="stylus">
.bg_img
  display flex
  width 100%
  color #ffffff
  height 350px
  text-align center
  box-sizing border-box
  background-position center
  background-size 100% auto
  margin-bottom 40px
  .box
    flex 1
    position relative
    top 40%
    .bg_img_title
      font-size 2rem
      font-weight bold
    hr 
      width 120px
      margin 10px auto
    .bg_img_desc
      font-size 16px
</style>
