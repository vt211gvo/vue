<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full flex flex-col my-2">
    <label> {{ label }}: </label>

    <textarea
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="border-2 rounded-md border-white w-full px-[5px] focus:outline-none focus:border-green-700"
      min-rows="3"
      :required="required"
    >
    {{ modelValue }}
    </textarea>
  </div>
</template>
