<template>
  <div>
  
  </div>  
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  created() {
    this.$emit('pageChanged', this.$route.name)
  },
  methods: {
    
  },
}
</script>

<style lang="stylus" scoped>

</style>