<template>
  <div class="new_article"> 
    <ul class="info_box">
      <li>
        <span>标题:</span>
        <input type="text" class="article_input" placeholder="文章标题" v-model="article.article_title">
      </li>
      <li>
        <span>标签:</span>
        <label role="checkbox" v-for=" item in tag_list" :key="item._id">
          <input type="checkbox" name="tags" :value=item._id v-model="article.article_tags">
          <span :title=item.tags_desc>{{item.tags_name}}</span>
        </label>
      </li>
      <li>
        <span>状态:</span>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="1" checked>
          <span>Published</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="0">
          <span>Draft</span>
        </label>
      </li>
      <li>
        <span>封面:</span>
        <input class="article_input" type="text" placeholder="图片地址" v-model="article.article_cover">
        <img :src="article.article_cover" class="article_cover" alt="封面图片">
      </li>
      <li>
        <span>描述:</span>
        <input class="article_input" type="text" placeholder="文章描述" v-model="article.article_desc">
      </li>
    </ul>
    <div class="article_content">
      <textarea id="article_content" v-initEdit v-model="article.article_content"></textarea>
    </div>
    <div class="tool">
      <input type="file" @change="getFile" id="uploadMD">
      <label for="uploadMD" >上传MD</label>
      <button @click="save">保存&发表</button>
    </div>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import '../assets/css/simplemde.min.css'
import '../assets/css/markdown.css'
export default {
  data() {
    return {
      article: {
        _id: '',
        article_content: '',
        article_cover: '',
        article_create_time: '',
        article_desc: '',
        article_state: '',
        article_tags: [],
        article_title: '',
        article_update_time: ''
      }
    }
  },
  directives: {
    initEdit:{
      inserted(el){
        simplemde = new SimpleMDE({ 
          element:el
       })
       document.getElementsByClassName('editor-preview-side')[0].classList.add('markdown-body')
      }
    }
  }
  // computed: {
  //   tag_list() {
  //     return this.$store.state.tag.data
  //   },
  //   select_tag() {
  //     return this.article.article_tags.map( item => {
  //       return item._id
  //     })
  //   }
  // },
}
</script>

<style lang="stylus">
@import '~asset/stylus/base.styl'
.new_article
  box-sizing border-box
  .info_box
    list-style none
    input[type=radio]
    input[type=checkbox]
      display none
      &:checked
        +span
          background-color bgColor
          color text-light
    li
      list-style none
      padding 5px 0
      font-size 18px
      width 100%
      height 50px
      line-height 50px
      border-bottom 2px dashed dashed-border
      label
        margin 0 5px
        font-size 16px
        span
          padding 5px
          transition background-color,color .6s
          cursor pointer
      .article_cover 
        vertical-align middle
        height 100%
    .article_input
        margin 0 5px
        padding 5px
        width 350px;
        line-height 150%
        outline none
        border none
        border-bottom 1px dashed dashed-border
        transition border-bottom-color .6s
        &::-webkit-input-placeholder 
          color bgColor
        &:focus 
          border-bottom-color bgColor
  .article_content .CodeMirror-scroll  
    max-height 500px
    overflow-y scroll
  .article_content .CodeMirror-fullscreen .CodeMirror-scroll
    max-height: 100%
  .tool 
    text-align right
    label 
      display inline-block
      text-align center
      box-sizing border-box
    button
    label 
      background-color bgColor
      font-size 14px
      color text-light
      width 80px
      height 30px
      line-height 30px
      border none
      outline none
      margin 0 10px
      cursor pointer
      &:active 
        opacity 0.8
    input
      opacity 0
      position relative
      z-index -1
</style>
