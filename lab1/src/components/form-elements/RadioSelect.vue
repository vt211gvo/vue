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

    <div class="flex items-center gap-5 my-[2px]">
      <div v-for="option in options" class="flex items-center gap-1">
        <label>
          <input
            type="radio"
            :value="option"
            :checked="modelValue === option ? true : false"
            @input="emit('update:modelValue', $event.target.value)"
          />
          {{ option }}
        </label>
      </div>
    </div>
  </div>
</template>
