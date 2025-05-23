<script setup>
import { inject, onMounted } from 'vue';
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';

const { tasks, fetchTasks, addTask, removeTask, updateTask, switchTaskStatus } =
  inject('todo');

onMounted(() => {
  fetchTasks({ status: false });
});
</script>

<template>
  <div>
    <TodoForm @add="addTask" />
    <div v-for="task in tasks" :key="task.id">
      <TodoItem
        :task="task"
        @toggle="switchTaskStatus"
        @delete="removeTask"
        @update="updateTask"
      >
        <template #description="{ task }">
          <span>{{ task.text }}</span>
        </template>
      </TodoItem>
    </div>
  </div>
</template>
