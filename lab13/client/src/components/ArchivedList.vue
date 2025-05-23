<script setup>
import { inject, onMounted } from 'vue';
import TodoItem from './TodoItem.vue';

const { tasks, fetchTasks, removeTask, switchTaskStatus } = inject('todo');

onMounted(() => {
  fetchTasks({ status: true });
});
</script>

<template>
  <div>
    <div v-for="task in tasks" :key="task.id">
      <TodoItem :task="task" @toggle="switchTaskStatus" @delete="removeTask" />
    </div>
  </div>
</template>
