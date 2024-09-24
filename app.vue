<script setup>
const Hi = ref("");
Hi.value = await $fetch("/api/sayHi");
</script>
<template>
  <div>
    <h1>Memory</h1>
    <h2 style="color: green">{{ Hi }}</h2>
  </div>
</template>
