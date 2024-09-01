<template>
  <span :class="mutateType" class="badge">{{ text }}</span>
</template>

<script>
import {computed} from "vue";

export default {
  name: "AppStatus",
  props: {
    status: {
      type: String,
      required: false,
      default: 'done',
      validator(val) {
        return ['active', 'done', 'cancelled', 'pending'].includes(val)
      }
    }
  },
  setup(props) {
    const text = computed(() => {
      if (props.status === 'active') {
        return 'Активный'
      }
      if (props.status === 'done') {

        return 'Выполнен'
      }
      if (props.status === 'cancelled') {
        return 'Отменен'
      }
      if (props.status === 'pending') {
        return 'Выполняется'
      }
      return text
    })
    const mutateType = computed(() => {
      if (props.status === 'active') {
        return 'primary'
      }
      if (props.status === 'done') {
        return 'primary'
      }
      if (props.status === 'cancelled') {
        return 'danger'
      }
      if (props.status === 'pending') {
        return 'warning'
      }
      return mutateType
    })
    return {
      text, mutateType
    }
  }
}
</script>

<style scoped>

</style>