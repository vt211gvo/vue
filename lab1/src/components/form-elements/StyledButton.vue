<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: 'Confirm',
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <button
    v-bind="$attrs"
    :type="type"
    class="px-3 py-1 rounded-md my-1"
    :class="[disabled ? 'bg-green-900' : 'bg-green-700']"
  >
    {{ label }}
  </button>
</template>
