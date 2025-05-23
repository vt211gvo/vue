<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow container mx-auto px-4 py-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>