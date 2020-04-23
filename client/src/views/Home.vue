<template>
  <div>
    <Header></Header>
    <BgImg :page="page" :key="bgKey"></BgImg>
    <router-view @pageChanged="pageChanged"></router-view>
    <Footer ref="footer"></Footer>
  </div>  
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BgImg from '@/components/Bg_img'
export default {
  data() {
    return {
      page: 'home',
      bgKey: 1
    }
  },
  components: {
    Header,
    BgImg,
    Footer
  },
  methods: {
    pageChanged(name) {
      this.page = name
      this.bgKey = name
      // console.log(this.$refs.footer)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>