<template>
  <div class="container mt-5">
    <h1>Hola mundo</h1>
    <hr>
    <button type="button" class="btn btn-primary m-2" @click="goToDaybook">Daybook</button>
    <button type="button" class="btn btn-secondary m-2">Secondary</button>
    <button type="button" class="btn btn-success m-2">Success</button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>
<style scoped>

</style>
