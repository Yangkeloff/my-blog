<template>
  <div class="comment_box" id="commentBox">
    <p class="comment_title">留下点什么吧 . . .</p>
    <div id="gitalk_comment" v-initComment></div>
  </div>
</template>

<script>
import {md5} from "@/plugins/utils.js"
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'
let direct = false

export default {
  props: ['title','direct'],
  created(){
    direct = this.direct
  },
  directives:{
    initComment: {
      inserted(el){
        if(direct == true){
          let gitalk = new Gitalk({
            clientID: 'f6275a87dc1325248fd3',
            clientSecret: '7c64678be24ce54fe7943030f9c1eaf2e84bfcd1',
            repo: 'my-blog',
            owner: 'yangkeloff',
            admin: ['yangkeloff'],
            id: md5(window.location.href),
            distractionFreeMode: false,
            body: '文章地址：' + window.location.href
          })
          gitalk.render('gitalk_comment')
        }
      }
    }
  },
  watch: {
    'title':  function(newVal, oldVal){
      if(newVal != null){
        let gitalk = new Gitalk({
          clientID: 'f6275a87dc1325248fd3',
          clientSecret: '7c64678be24ce54fe7943030f9c1eaf2e84bfcd1',
          repo: 'my-blog',
          owner: 'yangkeloff',
          admin: ['yangkeloff'],
          id: md5(window.location.href),
          distractionFreeMode: false,
          body: '文章地址：' + window.location.href,
          title: newVal + " | PAWNs'blog"
        })
        gitalk.render('gitalk_comment')
      }
    }
  }
}
</script>


<style lang="stylus" scoped>
.comment_box 
  position relative
  z-index 999
  background-color #fff
  .comment_title 
    font-size 22px
    margin 40px 0 10px
    border-bottom 1px solid #ccc
    padding 5px 0
</style>
