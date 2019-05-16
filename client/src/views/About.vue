<template>
  <div class="page_container">
    <div class="avatar">
      <img src="../assets/img/avatar.png" alt="avatar">
    </div>
    <div class="myInfo" v-html="page_html">
    </div>
     <CommentBox
    :direct="direct"></CommentBox>
  </div>
</template>

<script>
import CommentBox from '@/components/Comment_box'
import markdown from '@/plugins/marked'
export default {
  metaInfo() {
    return {
      title: '关于我 | Yang\'s blog', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'yangkeloff的博客'
      }]
    }
  },
  components:{CommentBox},
  async created() {
    this.$emit('pageChanged', this.$route.name)
    let res = await this.$store.dispatch('get_setting_api')
    this.about_me_page = res[0].myInfo.about_me_page
  },
  data(){
    return {
      about_me_page: '',
      direct: true,
    }
  },
  computed: {
    page_html(){
      return markdown(this.about_me_page, false, true).html
    },
  },
}
</script>

<style lang="stylus" scoped>
.page_container 
  font-size 16px
  padding 0 10px
  box-sizing border-box
.avatar 
  text-align center
  img 
    width 120px
    height 120px
    border-radius 50%
h1 
  position relative
  color #242f35
  padding 5px 0 5px 16px
  margin 10px 0
  font-weight 400
  height 20px
  line-height 20px
  font-size 18px
  &::before 
    content ''
    display block
    position absolute
    width 4px
    height 100%
    top 0
    left 0
    z-index -1
    background #1a1818
    background linear-gradient(to bottom,#1a1818 35%,#353030 100%) left center no-repeat
    background-size 100%
.myInfo p
  font-size 16px
  text-indent 2em
  line-height 30px
.myInfo 
  a 
    color red
    &:hover
      font-weight bold
</style>