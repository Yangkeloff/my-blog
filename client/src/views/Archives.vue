<template>
  <div class="page_container">
    <ArchItem v-for="(item,key,index) in list"
    :key=index
    :title=key
    :list=item></ArchItem> 
  </div> 
</template>

<script>
import ArchItem from '@/components/Arch_item'
import {format_date} from '@/plugins/utils'
export default {
  metaInfo() {
    return {
      title: '归档 | Yang\'s blog', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'yangkeloff的博客'
      }]
    }
  },
  async created() {
    this.$emit('pageChanged', this.$route.name)
    let {article_list = [], work_list = []} = await this.$store.dispatch('get_archives_api')
    this.article_list = article_list.map( item => {
      return {
        _id: item._id,
        article_create_time: format_date(item.article_create_time),
        article_state: item.article_state,
        article_title: item.article_title,
        article_update_time: format_date(item.article_update_time)
      }
    })
  },
  components: {ArchItem},
  data(){
    return {
      article_list:[]
    }
  },
  computed: {
    list(){
      let json = {}
      this.article_list.forEach( item => {
        let time = item.article_create_time.substring(0,7)
        if(json[time] == null){
          json[time] = []
        }
        json[time].push(item)
      })
      return json
    },
    meta_description(){
      let str = ''
      this.article_list.forEach(item => {
        str += `${item.article_title} `
      })
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
.page_container 
  padding 0 10px
  box-sizing border-box
</style>