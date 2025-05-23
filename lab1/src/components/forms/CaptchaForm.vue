<script setup>
import { reactive, ref, onMounted } from 'vue';
import StyledButton from './../form-elements/StyledButton.vue';
import { VueRecaptcha } from 'vue-recaptcha';

const siteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;

const verifyCaptcha = (response) => {
  if (response) {
    formData.verified = true;
    formData.captchaResponse = response;
  }
};

const handleError = (response) => {
  if (response) {
    formData.verified = false;
    formData.captchaResponse = 'An error occurred';
  }
};

const formData = reactive({
  verified: '',
  captchaResponse: '',
});

const submitted = ref(false);

const submitForm = () => {
  submitted.value = true;
  localStorage.setItem('Captcha', JSON.stringify(formData));
};

onMounted(() => {
  const savedData = JSON.parse(localStorage.getItem('Captcha'));

  if (savedData) {
    Object.assign(formData, savedData);
  }
});
</script>

<template>
  <div class="f-full text-center text-xl flex items-center">
    <p>Prove your existence</p>
    <p v-if="submitted" class="text-green-600 font-semibold">✔</p>
  </div>

  <form @submit.prevent="submitForm" class="flex-col justify-center w-max min-w-96">
    <VueRecaptcha
      :sitekey="siteKey"
      :load-recaptcha-script="true"
      @verify="verifyCaptcha"
      @error="handleError"
    ></VueRecaptcha>

    <StyledButton @click="submitForm" class="mt-5" />
  </form>
</template>
