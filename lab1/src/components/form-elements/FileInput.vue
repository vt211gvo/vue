<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Array],
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});

const handleFileInput = (e) => {
  const files = e.target.files;

  if (props.multiple) {
    const fileNames = Array.from(files).map((file) => file.name);
    emit('update:modelValue', fileNames);
  } else {
    emit('update:modelValue', files[0].name);
  }
};

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="w-full flex flex-col my-2">
    <label v-if="label.length > 0"> {{ label }}: </label>
    <p v-if="modelValue && modelValue.length > 0" class="max-w-96 text-wrap text-xs">
      Selected: {{ multiple ? modelValue.join(', ') : modelValue }}
    </p>
    <label class="px-3 py-1 rounded-md my-1 bg-green-700 text-center">
      Select file
      <input
        :multiple="multiple"
        hidden
        type="file"
        @input="handleFileInput"
        v-bind="$attrs"
        class="border-b-2 p-1 border-white w-full px-[5px] focus:outline-none focus:border-green-700"
      />
    </label>
  </div>
</template>
