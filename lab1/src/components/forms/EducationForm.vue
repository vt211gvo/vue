<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import TextInput from './../form-elements/TextInput.vue';
import Checkbox from './../form-elements/Checkbox.vue';
import Select from './../form-elements/Select.vue';
import StyledButton from './../form-elements/StyledButton.vue';

const schema = yup.object({
  degree: yup.string().required('Please provide your degree.'),
  specialization: yup.string().required('Please provide your specialization.'),
  institution: yup.string().required('Please provide your institution.'),
  graduationYear: yup
    .number()
    .required('Please enter the yaer of graduation.')
    .min(1900, 'Graduation year must be greater than 1900'),
  otherEducation: yup.array(),
});

const formData = reactive({
  degree: 'bachelor',
  specialization: '',
  institution: '',
  graduationYear: '2000',
  otherEducation: [],
});

const errors = reactive({
  degree: '',
  specialization: '',
  institution: '',
  graduationYear: '',
  otherEducation: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Education', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Education'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>About your education</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <div>
      <Select
        label="Education degree"
        :options="['none', 'bachelor', 'master', 'doctor']"
        v-model="formData.degree"
      />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.degree }}</p>
    </div>

    <div>
      <TextInput label="Specialization" v-model="formData.specialization" />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.specialization }}</p>
    </div>

    <div>
      <TextInput label="Educational institution" v-model="formData.institution" />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.institution }}</p>
    </div>

    <div>
      <TextInput type="number" min="0" label="Graduation year" v-model="formData.graduationYear" />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.graduationYear }}</p>
    </div>

    <div>
      <Checkbox
        label="Got other types of education"
        :options="['courses', 'interships', 'conferences']"
        v-model="formData.otherEducation"
      />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.otherEducation }}</p>
    </div>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>
