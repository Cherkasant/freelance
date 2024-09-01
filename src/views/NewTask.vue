<template>
  <form class="card" @submit.prevent="submit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="name">
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" @input="onChange">
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="!isValid">Создать</button>
  </form>
</template>


<script>

import {ref, computed} from "vue";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";
import dayjs from "dayjs";


export default {
  emits: ['addTask'],
  setup() {
    const name = ref('')
    const date = ref('')
    const description = ref('')
    const router = useRouter()
    const store = useStore()

    function onChange(event) {
      const isBefore = dayjs(event.target.value).isBefore(dayjs())
      store.dispatch('isBefore', isBefore)
    }


    const isValid = computed(() => {
      return name.value !== '' && description.value !== ''
    })


    async function submit() {
      if (isValid.value) {
        await store.dispatch('saveTask', {
          name: name.value,
          date: date.value,
          description: description.value,
          status:!store.state.isBefore ? 'active' : 'cancelled'
        })
        router.push('/')
      }
    }


    return {
      name, date, description, submit, isValid, onChange
    }

  }


}

</script>