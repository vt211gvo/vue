<script setup>
import { ref, defineAsyncComponent } from 'vue';
const TodoForm = defineAsyncComponent(() => import('./TodoForm.vue'));

const props = defineProps(['task']);
const emit = defineEmits(['delete', 'update', 'toggle']);

const isEditing = ref(false);
const todoFormRef = ref(null);

function startEditing() {
  isEditing.value = true;
  todoFormRef.value?.focus();
}

function cancelEditing() {
  isEditing.value = false;
}

function updateThis(updatedTask) {
  emit('update', updatedTask);
  cancelEditing();
}
</script>

<template>
  <transition name="fade" mode="out-in">
    <div v-if="!isEditing" key="view">

        <div>
          <slot name="title" :task="task">
            <button @click="$emit('toggle', task.id)">
              {{ task.title }}
            </button>
          </slot>
        </div>
        <div>
          <slot name="description" :task="task">
            <span> description: </span>
            {{ task.description }}
          </slot>
        </div>
        <div>
          <slot name="priority" :task="task">
            <span> priority: </span>
            {{ task.priority }}
          </slot>
        </div>
        <div>
          <slot name="deadline" :task="task">
            <div v-if="task.deadline">
              <span> deadline: </span>
              {{ task.deadline?.toLocaleString() }}
            </div>
          </slot>
        </div>
        <div>
          <slot name="createdAt" :task="task">
            <div v-if="task.createdAt">
              <span> created at: </span>
              {{ task.createdAt?.toLocaleString() }}
            </div>
          </slot>
        </div>
        <div>
          <slot name="completedAt" :task="task">
            <div v-if="task.completedAt">
              <span> completed at: </span>
              {{ task.completedAt?.toLocaleString() }}
            </div>
          </slot>
        </div>
        <div>
          <button v-if="task.isActive" @click="startEditing">Edit</button>
          <button @click="$emit('delete', task.id)">Delete</button>
        </div>

    </div>

    <div v-else key="edit">
      <component
        :is="TodoForm"
        :initialTask="task"
        :isEditing="true"
        @update="updateThis"
        @cancel="cancelEditing"
        ref="todoFormRef"
      />
    </div>
  </transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
