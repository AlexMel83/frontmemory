<template>
  <div>
    <TheHeaderMain />
    <NuxtLayout name="404">
      <div>
        <button class="button" @click="goBack">Повернутися на головну</button>
      </div>
    </NuxtLayout>
    <TheFooterMain />
  </div>
</template>

<script setup>
const router = useRouter();
const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.button {
  width: 306px;
  padding: 12px 24px;
  background: var(--1, #09273b);
  color: white;
  border-radius: 6px;
}
</style>
