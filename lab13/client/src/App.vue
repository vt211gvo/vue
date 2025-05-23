<script setup>
import { ref, defineAsyncComponent } from 'vue';
const ArchivedList = defineAsyncComponent(() =>
  import('./components/ArchivedList.vue')
);
const TodoList = defineAsyncComponent(() =>
  import('./components/TodoList.vue')
);

const showActive = ref(true);
</script>

<template>
  <main>
    <button @click="showActive = !showActive">
      {{ showActive ? 'Show Archived' : 'Show Active' }}
    </button>
  </main>

  <component :is="showActive ? TodoList : ArchivedList" />
</template>
