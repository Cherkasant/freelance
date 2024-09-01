<template>
  <div class="card" v-if="task">
    <h2>{{ task.name }}</h2>
    <p><strong>Статус</strong>:
      <AppStatus :status="task.status"/>
    </p>
    <p><strong>Дэдлайн</strong>: {{ task.date }}</p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="changeStatus('active')">Взять в работу</button>
      <button class="btn primary" @click="changeStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
  </h3>

</template>

<script>
import AppStatus from '../components/AppStatus'
import {computed, onMounted} from "vue";
import {useRoute} from "vue-router";

import {useStore} from "vuex";


export default {
  components: {AppStatus},
  setup() {
    const store = useStore()
    const route = useRoute()

    const task = computed(() => {
      return store.getters.getSingleTask
    })

    onMounted(() => {
          store.dispatch('fetchSingleTask', route.params.id)
        }
    )

    function changeStatus(status) {
      store.dispatch('updateTask', {id: route.params.id, status: status})
    }

    return {
      task, changeStatus
    }
  }
}
</script>

<style scoped>

</style>