<template>
  <div class="paginator">
    <ul>
      <li @click="jump(cur_page-1)"><i class="el-icon-arrow-left"></i></li>
      <li v-for="i in pages" :key="i"
      :class="i==cur_page?'active':''"
      @click="jump(i)">
      <span>{{i}}</span>
      </li>
      <li @click="jump(cur_page+1)"><i class="el-icon-arrow-right"></i></li>
      <label>共{{total_page}}页 {{total}}条数据</label>
    </ul>
  </div>
</template>

<script>
export default {
  props:{
    cur_page: Number,
    page_size: Number,
    total: Number
  },
  computed: {
    total_page() {
      return Math.ceil(this.total/this.page_size)
    },
    pages: function () {
      let ret = []
      let min = this.total_page>5?5:this.total_page
      if(this.cur_page <= min-2){
        for(let i=1; i <= min; i++){
          ret.push(i)
        } 
      }else {
        if(this.cur_page+2 < this.total_page){
          for(let i= (this.cur_page-2)>0?this.cur_page-2:1; i< this.cur_page+3; i++){
            ret.push(i)
          }
        }else {
          if(this.total_page >= 5){
            for(let i=this.total_page-4; i<= this.total_page; i++){
              ret.push(i)
            }
          }else {
            for(let i=1; i<= this.total_page && i>0; i++){
              ret.push(i)
            }
          }
        }
      }
      // 返回整个页码组
      return ret
    }
  },
  methods: {
    jump(num){
      if(num <= 0){
        this.$message("已经是第一页了")
        return
      }
      if(num > this.total_page){
        this.$message("已经是最后一页了")
        return
      }
      if(num == this.cur_page){
        return
      }
      this.$emit('jump', num)
    }
  }
}
</script>


<style lang="stylus">
@import '~asset/stylus/base.styl'
.paginator
  clear both
  position: relative
  top 20px
  font-size 16px
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  ul 
    text-align: center
  li
    display inline-block
    border 1px solid #1a1818cc
    width 30px
    height 30px
    cursor pointer
    text-align center
    line-height 30p
    margin 0 3px
    vertical-align bottom
    transition color,background .6s
    span 
      display inline-block
      margin-top 5px
    i 
      margin-top 7px
  .active 
    color #fff
    background #1a1818
</style>

