<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  initialTask: {
    type: Object,
    default: () => ({
      id: null,
      title: '',
      text: '',
      status: false,
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
      <label for="text">Description</label>
      <textarea v-model="task.text" id="text"></textarea>
    </div>

    <button type="submit">
      {{ props.isEditing ? 'Update' : 'Add' }}
    </button>
  </form>
</template>
