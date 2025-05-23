<script setup>
import { inject } from 'vue';
import TodoForm from './TodoForm.vue';
import TodoItem from './TodoItem.vue';

const { addTask, removeTask, updateTask, switchTaskStatus, activeTasks } =
  inject('todo');
</script>

<template>
  <div>
    <TodoForm @add="addTask" />
    <div v-for="task in activeTasks" :key="task.id">
      <TodoItem
        :task="task"
        @toggle="switchTaskStatus"
        @delete="removeTask"
        @update="updateTask"
      >
        <template #description="{ task }">
          <span>{{ task.description }}</span>
        </template>
      </TodoItem>
    </div>
  </div>
</template>
