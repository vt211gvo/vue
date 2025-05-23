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
  options: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full flex flex-col my-2">
    <label> {{ label }}: </label>

    <select
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="border-2 rounded-md border-white w-full py-[1px]"
    >
      <option v-for="option in options" :value="option.replace(' ', '-')">
        {{ option }}
      </option>
    </select>
  </div>
</template>
