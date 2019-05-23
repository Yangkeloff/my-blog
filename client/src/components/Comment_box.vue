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
  mounted() {
    let gitalk = new Gitalk({
      clientID: 'b7bcb4d28ab13ff8d743',
      clientSecret: '238a6d133df2a9c6dfddaf7b222400fee58ce88b',
      repo: 'my-blog',
      owner: 'yangkeloff',
      admin: ['yangkeloff'],
      id: md5(window.location.href),
      distractionFreeMode: false,
      body: '文章地址：' + window.location.href,
      title: this.title + " | yang's blog"
    })
    gitalk.render('gitalk_comment')
  },
  directives:{
    initComment: {
      inserted(el){
        if(direct == true){
          let gitalk = new Gitalk({
            clientID: 'b7bcb4d28ab13ff8d743',
            clientSecret: '238a6d133df2a9c6dfddaf7b222400fee58ce88b',
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
  // watch: {
  //   'title':  function(newVal, oldVal){
  //     if(newVal != null){
  //       let gitalk = new Gitalk({
  //         clientID: '565103516f4c64fdb1ca',
  //         clientSecret: '1ed11dc9ff2228e9d09804e890bd94d60ffd87c3',
  //         repo: 'my-blog',
  //         owner: 'yangkeloff',
  //         admin: ['yangkeloff'],
  //         id: md5(window.location.href),
  //         distractionFreeMode: false,
  //         body: '文章地址：' + window.location.href,
  //         title: newVal + " | yang's blog"
  //       })
  //       gitalk.render('gitalk_comment')
  //     }
  //   }
  // }
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
