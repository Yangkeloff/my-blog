<template>
  <div class="page_container">
    <PrduItem v-for="(item,index) in work_list" :key="index"
    :item=item></PrduItem>
  </div>
</template>

<script>
import PrduItem from '@/components/Prod_item'
export default {
  components: {PrduItem},
  metaInfo() {
    return {
      title: '作品 | Yang\'s blog', // set a title
      meta: [{                 // set meta
        name: 'keyWords',
        content: 'yangkeloff的博客'
      }]
    }
  },
  data() {
    return {
      work_list: []
    }
  },
  async created() {
    this.$emit('pageChanged', this.$route.name)
    let res = await this.$store.dispatch("get_work_api")
    this.work_list = res
  },
  methods: {
    
  },
}
</script>

<style lang="stylus" scoped>
.page_container 
  overflow hidden
  .prod_item
    @media screen and (min-width: 736px)
      width 50%
    @media screen and (min-width: 950px)
      width 33%
    @media screen and (min-width: 1250px)
      width 25%
    
</style>