<template>
  <div>
    <Header></Header>
    <router-view class="content"></router-view>
    <Footer></Footer>
  </div>  
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
.content
  margin-top 60px
</style>