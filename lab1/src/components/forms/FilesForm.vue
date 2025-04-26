<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import FileInput from '../form-elements/FileInput.vue';
import StyledButton from '../form-elements/StyledButton.vue';

const schema = yup.object({
  photo: yup
    .mixed()
    .required('Photo is required')
    .test('fileType', 'Only image files are allowed (JPEG, PNG)', (value) => {
      return !value || (value && ['image/jpeg', 'image/png'].includes(value.type));
    }),
  resume: yup
    .mixed()
    .required('Resume is required')
    .test('fileType', 'Only PDF files are allowed', (value) => {
      return !value || (value && value.type === 'application/pdf');
    }),
  motivationLetter: yup
    .mixed()
    .test('fileType', 'Only PDF files are allowed for motivation letter', (value) => {
      return !value || (value && value.type === 'application/pdf');
    }),
  certificates: yup.array().of(
    yup.mixed().test('fileType', 'Certificates must be PDF files', (value) => {
      return !value || (value && value.type === 'application/pdf');
    })
  ),
  portfolio: yup.mixed().test('fileType', 'Portfolio must be a PDF', (value) => {
    return !value || (value && value.type === 'application/pdf');
  }),
});

const formData = reactive({
  photo: '',
  resume: '',
  motivationLetter: '',
  certificates: [],
  portfolio: '',
});

const errors = reactive({
  photo: '',
  resume: '',
  motivationLetter: '',
  certificates: '',
  portfolio: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Files', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Files'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Some files to upload</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form
    @submit.prevent="submitForm"
    class="flex-col justify-center w-max min-w-96"
    enctype="multipart/form-data"
  >
    <div>
      <FileInput label="Your photo" v-model="formData.photo" />
      <p v-if="errors.photo" class="text-red-600">{{ errors.photo }}</p>
    </div>

    <div>
      <FileInput label="Your resume" v-model="formData.resume" />
      <p v-if="errors.resume" class="text-red-600">{{ errors.resume }}</p>
    </div>

    <div>
      <FileInput label="Motivation letter" v-model="formData.motivationLetter" />
      <p v-if="errors.motivationLetter" class="text-red-600">{{ errors.motivationLetter }}</p>
    </div>

    <div>
      <FileInput label="Certificates" v-model="formData.certificates" :multiple="true" />
      <p v-if="errors.certificates" class="text-red-600">{{ errors.certificates }}</p>
    </div>

    <div>
      <FileInput label="Portfolio" v-model="formData.portfolio" />
      <p v-if="errors.portfolio" class="text-red-600">{{ errors.portfolio }}</p>
    </div>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>
