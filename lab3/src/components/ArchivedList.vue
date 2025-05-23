<script setup>
import { inject } from 'vue';
import TodoItem from './TodoItem.vue';

const { removeTask, switchTaskStatus, completedTasks } = inject('todo');
</script>

<template>
  <div>
    <div v-for="task in completedTasks" :key="task.id">
      <TodoItem :task="task" @toggle="switchTaskStatus" @delete="removeTask" />
    </div>
  </div>
</template>
