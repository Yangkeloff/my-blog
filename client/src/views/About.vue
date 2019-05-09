<template>
  <div>
  
  </div>  
</template>

<script>
export default {
  created() {
    this.$emit('pageChanged', this.$route.name)
  }
}
</script>

<style lang="stylus" scoped>

</style>