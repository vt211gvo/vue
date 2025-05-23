<script setup>
import { reactive, ref, onMounted } from 'vue';
import * as yup from 'yup';
import RadioSelect from './../form-elements/RadioSelect.vue';
import StyledButton from './../form-elements/StyledButton.vue';
import TextArea from '../form-elements/TextArea.vue';
import TextInput from '../form-elements/TextInput.vue';

const schema = yup.object({
  businessTrips: yup.string().required('Please select readiness for business trips.'),
  ownTransport: yup.string().required('Please select if you own a car.'),
  salaryExpentations: yup
    .number()
    .required('Please enter salary expectations.')
    .min(0, 'Salary expectations must be greater than 0'),
  overtimePossibisity: yup.string().required('Please select the possibility of working overtime.'),
  addSkills: yup.string(),
});

const formData = reactive({
  businessTrips: 'yes',
  ownTransport: 'yes',
  salaryExpentations: '',
  overtimePossibisity: 'no',
  addSkills: '',
});

const errors = reactive({
  businessTrips: '',
  ownTransport: '',
  salaryExpentations: '',
  overtimePossibisity: '',
  addSkills: '',
});

const submitted = ref(false);

const submitForm = async () => {
  try {
    Object.keys(errors).forEach((key) => (errors[key] = ''));
    await schema.validate(formData, { abortEarly: false });

    localStorage.setItem('Adds', JSON.stringify(formData));
    submitted.value = true;
  } catch (validationErrors) {
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    submitted.value = false;
  }
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Adds'));
  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Addition info about you</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <div>
      <RadioSelect
        label="Readiness for business trips"
        :options="['yes', 'no']"
        v-model="formData.businessTrips"
      />
      <p v-if="errors.businessTrips" class="text-red-600">{{ errors.businessTrips }}</p>
    </div>

    <div>
      <RadioSelect label="Own car" :options="['yes', 'no']" v-model="formData.ownTransport" />
      <p v-if="errors.ownTransport" class="text-red-600">{{ errors.ownTransport }}</p>
    </div>

    <div>
      <TextInput
        type="number"
        label="Salary expectations (in dollars)"
        v-model="formData.salaryExpentations"
      />
      <p v-if="errors.salaryExpentations" class="text-red-600">{{ errors.salaryExpentations }}</p>
    </div>

    <div>
      <RadioSelect
        label="Possibility working overtime"
        :options="['yes', 'no']"
        v-model="formData.overtimePossibisity"
      />
      <p v-if="errors.overtimePossibisity" class="text-red-600">{{ errors.overtimePossibisity }}</p>
    </div>

    <div>
      <TextArea label="Additional skills" v-model="formData.addSkills" :required="false" />
      <p v-if="errors.addSkills" class="text-red-600">{{ errors.addSkills }}</p>
    </div>

    <StyledButton type="submit" class="mt-5" label="Submit" />
  </form>
</template>
