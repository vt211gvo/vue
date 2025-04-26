<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import TextInput from './../form-elements/TextInput.vue';
import StyledButton from './../form-elements/StyledButton.vue';
import Select from '../form-elements/Select.vue';

const schema = yup.object({
  motherLang: yup.string().required('Mother language is required'),
  otherLanguages: yup.array(),
});

const formData = reactive({
  motherLang: 'Ukrainian',
  otherLanguages: [
    {
      name: 'English',
      level: 'B1',
    },
  ],
});

const errors = reactive({
  motherLang: '',
  otherLanguages: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Langs', JSON.stringify( formData))
    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Langs'));
  if (savedData) {
    Object.assign(formData, savedData);
  }
});

const addLang = () => {
  formData.otherLanguages.push({
    name: '',
    level: 'A1',
  });
};

const deleteLang = (index) => {
  formData.otherLanguages.splice(index, 1);
};
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Your language knowledge</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <div>
      <TextInput label="Mother language" v-model="formData.motherLang" />
      <p v-if="errors.motherLang" class="text-red-600">{{ errors.motherLang }}</p>
    </div>

    <p>Other languages:</p>
    <div v-for="(lang, i) in formData.otherLanguages" :key="i" class="border-t-2 border-white mt-1">
      <TextInput label="Language" v-model="lang.name" />

      <div class="w-full flex gap-3">
        <Select
          label="Level of knowledge"
          v-model="lang.level"
          :options="['A1', 'A2', 'B1', 'B2', 'C1', 'C2']"
        />
        <StyledButton @click="deleteLang(i)" class="mt-5" label="Delete" />
      </div>
    </div>

    <StyledButton @click="addLang" class="mr-5" label="Add one more language" />

    <StyledButton @click="submitForm" class="mt-5" type="submit" />
  </form>
</template>
