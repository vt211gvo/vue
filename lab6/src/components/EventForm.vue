<script setup>
import { useTemplateRef, onMounted } from 'vue';
import { useForm, useField } from 'vee-validate';
import { object, string, date } from 'yup';

const emit = defineEmits(['save-event']);

const schema = object({
  task: string().required('Task is required'),
  dateOn: date().required('Date is required'),
  details: string().required('Details are required'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: task, errorMessage: taskError } = useField('task');
const { value: dateOn, errorMessage: dateError } = useField('dateOn');
const { value: details, errorMessage: detailsError } = useField('details');

const onSubmit = handleSubmit((values) => {
  emit('save-event', { ...values });
  resetForm();
  inputRef.value?.focus();
});

const inputRef = useTemplateRef('event-input');

onMounted(() => {
  inputRef.value?.focus();
});
</script>

<template>
  <div class="p-5 max-w-lg mx-auto">
    <form @submit="onSubmit" class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <label for="task" class="font-medium">Task:</label>
        <input id="task" v-model="task" ref="event-input" class="border rounded px-3 py-2" />
        <span v-if="taskError" class="text-red-500 text-sm">{{ taskError }}</span>
      </div>

      <div class="flex flex-col gap-1">
        <label for="dateOn" class="font-medium">Date:</label>
        <input id="dateOn" type="date" v-model="dateOn" class="border rounded px-3 py-2" />
        <span v-if="dateError" class="text-red-500 text-sm">{{ dateError }}</span>
      </div>

      <div class="flex flex-col gap-1">
        <label for="details" class="font-medium">Details:</label>
        <textarea
          id="details"
          v-model="details"
          class="border rounded px-3 py-2"
          rows="3"
        ></textarea>
        <span v-if="detailsError" class="text-red-500 text-sm">{{ detailsError }}</span>
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Add New
      </button>
    </form>
  </div>
</template>
