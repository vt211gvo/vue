<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Array,
    default: [],
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
            type="checkbox"
            :value="option"
            :checked="modelValue.includes(option)"
            @change="
              modelValue.includes(option)
                ? emit(
                    'update:modelValue',
                    modelValue.filter((o) => o !== option)
                  )
                : emit('update:modelValue', [...modelValue, option])
            "
            :true-value="[]"
          />
          {{ option }}
        </label>
      </div>
    </div>
  </div>
</template>
