<template>
  <div class="panorama-page">
    <div v-if="panorama" class="panorama-container">
      <h1>{{ panorama.title }}</h1>
      <div ref="streetViewContainer" class="street-view" />
    </div>
    <div v-else class="loading">Загрузка панорамы...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const panorama = ref(null);
const streetViewContainer = ref(null);
const { $api } = useNuxtApp();

onMounted(async () => {
  try {
    // Получаем данные панорамы
    const response = await $api.panoramas.getPanoramaById(route.params.id);
    panorama.value = response.data[0];

    // Дожидаемся следующего такта, чтобы DOM был готов
    await nextTick();

    // Инициализация панорамы
    initStreetView();
  } catch (error) {
    console.error('Ошибка загрузки панорамы:', error);
  }
});

const initStreetView = () => {
  if (panorama.value && streetViewContainer.value) {
    const location = {
      lat: parseFloat(panorama.value.latitude),
      lng: parseFloat(panorama.value.longitude),
    };

    // Инициализация Google Street View
    new google.maps.StreetViewPanorama(streetViewContainer.value, {
      position: location,
      pov: {
        heading: parseFloat(panorama.value.heading) || 0,
        pitch: parseFloat(panorama.value.tilt) - 90 || 0,
      },
      zoom: 1,
    });
  } else {
    console.warn(
      'Контейнер для панорамы не готов или данные панорамы отсутствуют.',
    );
  }
};
</script>

<style scoped>
.panorama-container {
  display: flex;
  flex-direction: column;
}

.street-view {
  width: 100%;
  height: 500px;
}

.loading {
  text-align: center;
  font-size: 1.5em;
}
</style>
