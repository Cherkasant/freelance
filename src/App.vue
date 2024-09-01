<template>
  <the-navbar></the-navbar>
  <div class="container with-nav">
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar'

export default {
  emits: ['addTask', 'singleTask'],
  components: {
    TheNavbar
  },
}
</script>

<style lang="scss">

</style>
