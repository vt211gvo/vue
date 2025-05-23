<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  initialTask: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      description: '',
      isActive: true,
      createdAt: new Date(),
      priority: 'medium',
      deadline: null,
    }),
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
});

const task = ref({ ...props.initialTask });
const titleInput = ref(null);
const emit = defineEmits(['add', 'update', 'cancel']);

onMounted(() => {
  titleInput.value?.focus();
});

function submit() {
  if (props.isEditing) emit('update', task.value);
  else {
    task.value.id = Date.now();
    emit('add', task.value);
    reset();
  }
}

function reset() {
  task.value = { ...props.initialTask };
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="title">Title</label>
      <input
        v-model="task.title"
        ref="titleInput"
        id="title"
        type="text"
        required
      />
    </div>

    <div>
      <label for="description">Description</label>
      <textarea v-model="task.description" id="description"></textarea>
    </div>

    <div>
      <label for="priority">Priority</label>
      <select v-model="task.priority" id="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div>
      <label for="deadline">Deadline</label>
      <input v-model="task.deadline" id="deadline" type="date" />
    </div>

    <button type="submit">
      {{ props.isEditing ? 'Update' : 'Add' }}
    </button>
  </form>
</template>
