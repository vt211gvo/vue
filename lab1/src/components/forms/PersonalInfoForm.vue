<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import TextInput from './../form-elements/TextInput.vue';
import RadioSelect from './../form-elements/RadioSelect.vue';
import Select from './../form-elements/Select.vue';
import StyledButton from './../form-elements/StyledButton.vue';

const schema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters')
    .required('Please provide your first name'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Please provide your last name'),
  birthDate: yup.date().required('Please provide your date of birth'),
  email: yup.string().email('Invalid email').required('Please provide your email'),
  phone: yup.string().required('Please provide your phone number'),
  address: yup.string().required('Please provide your address'),
  gender: yup.string().oneOf(['male', 'female', 'other'], 'Invalid gender'),
  maritalStatus: yup
    .string()
    .oneOf(['secret', 'married', 'not married', 'divorced', 'widowed'], 'Invalid marital status'),
  nationality: yup
    .string()
    .oneOf(['ukrainian', 'polish', 'moldovian', 'czech', 'hungarian'], 'Invalid nationality'),
});

const formData = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  address: '',
  gender: 'other',
  maritalStatus: 'secret',
  nationality: 'ukrainian',
});

const errors = reactive({
  firstName: '',
  lastName: '',
  birthDate: '',
  email: '',
  phone: '',
  address: '',
  gender: '',
  maritalStatus: '',
  nationality: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('PersonalInfo', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('PersonalInfo'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Your personal info</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex flex-col md:gap-3">
    <div class="flex-col justify-center w-max min-w-96">
      <div>
        <TextInput label="First name" v-model="formData.firstName" />
        <p v-if="errors.firstName" class="text-red-600">{{ errors.firstName }}</p>
      </div>

      <div>
        <TextInput label="Last name" v-model="formData.lastName" />
        <p v-if="errors.lastName" class="text-red-600">{{ errors.lastName }}</p>
      </div>

      <div>
        <TextInput type="date" label="Date of birth" v-model="formData.birthDate" />
        <p v-if="errors.birthDate" class="text-red-600">{{ errors.birthDate }}</p>
      </div>

      <div>
        <TextInput type="email" label="Email" v-model="formData.email" />
        <p v-if="errors.email" class="text-red-600">{{ errors.email }}</p>
      </div>

      <div>
        <TextInput label="Phone number" v-model="formData.phone" />
        <p v-if="errors.phone" class="text-red-600">{{ errors.phone }}</p>
      </div>
    </div>

    <div class="flex-col justify-center w-max min-w-96">
      <div>
        <TextInput label="Address" v-model="formData.address" />
        <p v-if="errors.address" class="text-red-600">{{ errors.address }}</p>
      </div>

      <div>
        <RadioSelect
          label="Gender"
          :options="['male', 'female', 'other']"
          v-model="formData.gender"
        />
        <p v-if="errors.gender" class="text-red-600">{{ errors.gender }}</p>
      </div>

      <div>
        <Select
          label="Marital status"
          :options="['secret', 'married', 'not married', 'divorced', 'widowed']"
          v-model="formData.maritalStatus"
        />
        <p v-if="errors.maritalStatus" class="text-red-600">{{ errors.maritalStatus }}</p>
      </div>

      <div>
        <Select
          label="Nationality"
          :options="['ukrainian', 'polish', 'moldovian', 'czech', 'hungarian']"
          v-model="formData.nationality"
        />
        <p v-if="errors.nationality" class="text-red-600">{{ errors.nationality }}</p>
      </div>

      <StyledButton @click="submitForm" class="mt-5" type="submit" />
    </div>
  </form>
</template>
