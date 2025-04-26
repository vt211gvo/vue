<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import TextInput from './../form-elements/TextInput.vue';
import RadioSelect from './../form-elements/RadioSelect.vue';
import StyledButton from './../form-elements/StyledButton.vue';
import TextArea from '../form-elements/TextArea.vue';

const schema = yup.object({
  position: yup.string().required('Position is required'),
  company: yup.string().required('Company is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required'),
  responsibilities: yup.string().required('Responsibilities are required'),
  recommendations: yup.string().required('Recommendation status is required'),
  recommendationsContact: yup.string().when('recommendations', {
    is: 'yes',
    then: yup.string().required('Contact person for recommendations is required'),
  }),
});

const formData = reactive({
  position: '',
  company: '',
  startDate: '',
  endDate: '',
  responsibilities: '',
  recommendations: 'no',
  recommendationsContact: '',
});

const errors = reactive({
  position: '',
  company: '',
  startDate: '',
  endDate: '',
  responsibilities: '',
  recommendationsContact: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('JobExperience', JSON.stringify(formData));

    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('JobExperience'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>About your job experience</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <div>
      <TextInput label="Position" v-model="formData.position" />
      <p v-if="errors.position" class="text-red-600">{{ errors.position }}</p>
    </div>

    <div>
      <TextInput label="Company" v-model="formData.company" />
      <p v-if="errors.company" class="text-red-600">{{ errors.company }}</p>
    </div>

    <div>
      <TextInput type="date" label="Date of start of work" v-model="formData.startDate" />
      <p v-if="errors.startDate" class="text-red-600">{{ errors.startDate }}</p>
    </div>

    <div>
      <TextInput type="date" label="Date of end of work" v-model="formData.endDate" />
      <p v-if="errors.endDate" class="text-red-600">{{ errors.endDate }}</p>
    </div>

    <div>
      <TextArea label="Responsibilities" v-model="formData.responsibilities" />
      <p v-if="errors.responsibilities" class="text-red-600">{{ errors.responsibilities }}</p>
    </div>

    <div>
      <RadioSelect
        label="Got recommendations"
        :options="['yes', 'no']"
        v-model="formData.recommendations"
      />
    </div>

    <div v-if="formData.recommendations === 'yes'">
      <TextInput
        label="Contact person for recommendations"
        v-model="formData.recommendationsContact"
      />
      <p v-if="errors.recommendationsContact" class="text-red-600">
        {{ errors.recommendationsContact }}
      </p>
    </div>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>
