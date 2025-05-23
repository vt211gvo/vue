<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import StyledButton from './../form-elements/StyledButton.vue';
import TextInput from '../form-elements/TextInput.vue';

const schema = yup.object().shape({
  linkedin: yup.string().url('LinkedIn must be a valid URL').nullable(),
  github: yup.string().url('GitHub must be a valid URL').nullable(),
  facebook: yup.string().url('Facebook must be a valid URL').nullable(),
  instagram: yup.string().url('Instagram must be a valid URL').nullable(),
});

const formData = reactive({
  linkedin: '',
  github: '',
  facebook: '',
  instagram: '',
});

const errors = reactive({
  linkedin: '',
  github: '',
  facebook: '',
  instagram: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Socials', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Socials'));
  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Your professional social media</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <div>
      <TextInput label="Link to your LinkedIn" v-model="formData.linkedin" />
      <p v-if="errors.linkedin" class="text-red-600">{{ errors.linkedin }}</p>
    </div>

    <div>
      <TextInput label="Link to your GitHub" v-model="formData.github" />
      <p v-if="errors.github" class="text-red-600">{{ errors.github }}</p>
    </div>

    <div>
      <TextInput label="Link to your Facebook" v-model="formData.facebook" />
      <p v-if="errors.facebook" class="text-red-600">{{ errors.facebook }}</p>
    </div>

    <div>
      <TextInput label="Link to your Instagram" v-model="formData.instagram" />
      <p v-if="errors.instagram" class="text-red-600">{{ errors.instagram }}</p>
    </div>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>
