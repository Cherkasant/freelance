<template>
  <template v-if="tasks.length">
    <h3 class="text-white">Всего активных задач: {{ activeTasks }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.name }}
        <AppStatus :type="'primary'" :status="task.status"/>
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date().toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="onTaskClick(task.id)">Посмотреть</button>
    </div>
  </template>
  <h1 class="text-white center" v-else>Задач пока нет</h1>
</template>

<script>
import AppStatus from '../components/AppStatus'

import {computed, onMounted} from "vue";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  emits: ['singleTask'],
  components: {AppStatus},
  setup(props, context) {
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => {
      return store.getters.getTasks
    })

    const activeTasks = computed(() => {
      return store.state.tasks.filter(el => el.status === 'active').length
    })

    function onTaskClick(id) {
      context.emit('singleTask', id)
      router.push('/task/' + id)
    }

    onMounted(() => {
          store.dispatch('fetchTasks')
        }
    )

    return {
      tasks,
      onTaskClick,
      activeTasks
    }
  }
}
</script>