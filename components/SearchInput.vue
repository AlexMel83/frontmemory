<template>
  <div class="search-wrapper">
    <UInput
      v-model="searchTerm"
      name="searchTerm"
      placeholder="Пошук по назві"
      icon="i-heroicons-magnifying-glass-20-solid"
      autocomplete="off"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      class="custom-search-input"
    >
      <template #trailing>
        <UButton
          v-show="searchTerm !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="searchTerm = ''"
        />
      </template>
    </UInput>
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce';

const searchTerm = ref('');
provide('searchTerm', searchTerm);

const bus = useNuxtApp().$bus;

watch(
  searchTerm,
  debounce((newValue) => {
    bus.$emit('searchTermUpdated', newValue);
  }, 500),
);
</script>

<style scoped>
@import '../assets/src/styles.css';

.search-wrapper {
  padding: 0 16px;
  width: 100%;
}

.custom-search-input {
  margin: 10px 0;
}
</style>
