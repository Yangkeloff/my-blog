<template>
  <div>
    <Header></Header>
    <main class="home">
      <BgImg :page="page" :key="bgKey"></BgImg>
      <router-view class="content" @pageChanged="pageChanged"></router-view>
    </main>
    <Footer></Footer>
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
      ++this.bgKey
    }
  },
}
</script>

<style lang="stylus" scoped>
.home
  font-size 0.4rem
  .page_container 
    width 100%
    margin 0 auto 
    @media screen and (min-width: 1250px)
      width 1250px
</style>