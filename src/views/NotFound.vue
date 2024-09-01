<template>
  <h3 class="text-white center">
    Задачи с id = <strong>{{ id }}</strong> нет.
  </h3>
</template>

<script>
import {useRoute} from "vue-router";

export default {
  name: "NotFound",
  setup() {
    const route = useRoute()
    const id = route.params.id
    return {
      id
    }
  }
}
</script>

<style scoped>

</style>