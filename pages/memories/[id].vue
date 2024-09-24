<template>
  <div class="memory-page">
    <main>
      <section class="memory-details">
        <div v-if="memory">
          <!-- Слайдер фотографий -->
          <div class="photo-slider mb-6">
            <UCarousel
              ref="carouselRef"
              v-slot="{ item }"
              :items="memory_photos_urls"
              :ui="{
                item: 'basis-full',
                container: 'rounded-lg',
              }"
              :prev-button="{
                color: 'gray',
                icon: 'i-heroicons-arrow-left-20-solid',
              }"
              :next-button="{
                color: 'gray',
                icon: 'i-heroicons-arrow-right-20-solid',
              }"
              indicators
              arrows
            >
              <img :src="item" class="w-full" draggable="false" />
            </UCarousel>
          </div>
          <h1 class="text-3xl font-bold mb-4">
            {{ memory.title }}
          </h1>
          <p class="text-lg mb-6">
            {{ memory.description }}
          </p>
          <!-- Дополнительная информация -->
          <div class="info">
            <p>
              <strong>Адреса:</strong> {{ memory.address || 'Адрес не указан' }}
            </p>
            <p v-if="memory.date_event">
              <strong>Дата події:</strong>
              {{ formatDate(memory.date_event) }}
            </p>
            <p>
              <strong>Створено:</strong> {{ formatDate(memory.created_at) }}
            </p>
            <p v-if="memory.updated_at !== memory.created_at">
              <strong>Оновлено:</strong>
              {{ formatDate(memory.updated_at) }}
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp, useRoute } from 'nuxt/app';

const { $api } = useNuxtApp();
const route = useRoute();
const carouselRef = ref();
const memory = ref(null);
const memory_photos = ref([]);
const memory_photos_urls = ref([]);

const formatDate = (dateString) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleString('ru-RU', options);
};

onMounted(async () => {
  const memoryId = route.params.id;
  try {
    const response = await $api.memories.getMemoryById(memoryId);
    if (!response.data) {
      throw new Error('Memory not found');
    }
    memory.value = response.data[0];
  } catch (error) {
    console.error('Error fetching memory data:', error);
  }
  memory_photos.value = memory.value.memory_photos;
  memory_photos_urls.value = memory_photos.value.map((photo) => photo.url);

  setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});
</script>

<style scoped>
.memory-page {
  padding: 2rem;
}
.photo-slider img {
  max-height: 400px;
  object-fit: cover;
}
.swiper-container {
  width: 100%;
  height: auto;
}
</style>
