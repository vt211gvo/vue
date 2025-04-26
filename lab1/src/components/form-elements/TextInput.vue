<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
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
    <label v-if="label.length > 0"> {{ label }}: </label>
    <input
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="border-2 rounded-md border-white w-full px-[5px] focus:outline-none focus:border-green-700"
      :required="required"
    />
  </div>
</template>
