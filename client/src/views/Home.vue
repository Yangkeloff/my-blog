<template>
  <div>
    <Header></Header>
    <main class="home">
      <BgImg></BgImg>
      <router-view class="content"></router-view>
    </main>
    <Footer></Footer>
  </div>  
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BgImg from '@/components/Bg_img'
export default {
  components: {
    Header,
    BgImg,
    Footer
  }
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