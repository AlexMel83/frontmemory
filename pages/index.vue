<template>
  <div class="index-page">
    <main>
      <section class="search">
        <SearchInput />
      </section>
      <section class="memories-list" :class="{ blurred: authStore.isMenuOpen }">
        <Map
          :memories="filteredMemories || []"
          :panoramas="panoramasDataApi || []"
        />
        <div v-auto-animate class="memories-wrapper">
          <template v-if="panoramasDataApi && !isLoading">
            <div
              v-auto-animate
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div
                v-for="panorama in panoramasDataApi"
                :key="panorama.id"
                class="bg-white shadow-md rounded-lg"
              >
                <nuxt-link class="container" :to="'/panoramas/' + panorama.id">
                  <div class="photo">
                    <img
                      v-if="panorama.thumbnail_url"
                      :src="panorama.thumbnail_url"
                      loading="lazy"
                    />
                    <img v-else src="./../public/default-memory.png" />
                    <div class="title">
                      <h2 class="memory-title">
                        {{ panorama.title }}
                      </h2>
                    </div>
                  </div>
                  <div v-auto-animate class="info-card">
                    <div
                      v-if="panorama.description"
                      class="description-container"
                    >
                      <p class="description">
                        {{ panorama.description }}
                      </p>
                    </div>
                    <div v-if="panorama.address" class="map" @click.stop>
                      <a
                        :href="
                          'https://maps.google.com/?q=' +
                          encodeURIComponent(panorama.address)
                        "
                        target="_blank"
                      >
                        <img
                          src="~assets/spaces_images/location-marker.png"
                          loading="lazy"
                          alt="local"
                        />
                        <span>{{ panorama.address }}</span>
                      </a>
                    </div>
                    <div class="icons-container up">
                      <div class="time">
                        <img
                          src="~assets/spaces_images/time.svg"
                          loading="lazy"
                          alt="time icon"
                        />
                        <div flex>
                          Створено:{{ formatDate(panorama.created_at) }}
                          <div
                            v-if="panorama.updated_at !== panorama.created_at"
                          >
                            Оновлено: {{ formatDate(panorama.updated_at) }}
                          </div>
                          <div v-if="panorama.shooting_date">
                            Дата зйомки:
                            {{ formatDate(panorama.shooting_date) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <nuxt-link :to="'/'" class="btn"> Переглянути </nuxt-link>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-if="filteredMemories?.length > 0 && !isLoading">
            <div
              v-auto-animate
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div
                v-for="memory in filteredMemories"
                :key="memory.memory_id"
                class="bg-white shadow-md rounded-lg"
              >
                <nuxt-link
                  class="container"
                  :to="'/memories/' + memory.memory_id"
                >
                  <div class="photo">
                    <img
                      v-if="memory.memory_photos.length"
                      :src="`${memory.memory_photos[0].url.includes('http') ? '' : baseURL}${memory.memory_photos[0].url}`"
                      loading="lazy"
                    />
                    <img
                      v-else
                      src="./../public/default-memory.png"
                      loading="lazy"
                    />
                    <div class="title">
                      <h2 class="memory-title">
                        {{ memory.title }}
                      </h2>
                    </div>
                  </div>
                  <div v-auto-animate class="info-card">
                    <div class="description-container">
                      <p class="description">
                        {{ memory.description }}
                      </p>
                    </div>
                    <div v-if="memory.address" class="map" @click.stop>
                      <a
                        :href="
                          'https://maps.google.com/?q=' +
                          encodeURIComponent(memory.address)
                        "
                        target="_blank"
                      >
                        <img
                          src="~assets/spaces_images/location-marker.png"
                          loading="lazy"
                          alt="local"
                        />
                        <span>{{ memory.address }}</span>
                      </a>
                    </div>
                    <div class="icons-container up">
                      <div class="time">
                        <img
                          src="~assets/spaces_images/time.svg"
                          loading="lazy"
                          alt="time icon"
                        />
                        <div flex>
                          Створено:{{ formatDate(memory.created_at) }}
                          <div v-if="memory.updated_at !== memory.created_at">
                            Оновлено: {{ formatDate(memory.updated_at) }}
                          </div>
                          <div v-if="memory.date_event">
                            Дата події: {{ formatDate(memory.date_event) }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <nuxt-link :to="'/'" class="btn"> Переглянути </nuxt-link>
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div class="flex justify-center pagination">
              <UPagination
                v-model="page"
                :total="Math.ceil(memoriesDataApi.length / perPage)"
                size="md"
                rounded
                class="custom-pagination"
              />
            </div>
          </template>
          <Loader v-if="isLoad" />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store.ts';
import SearchInput from '@/components/SearchInput.vue';

const isLoading = ref(false);
const isLoad = ref(false);
const { $api } = useNuxtApp();
const memoriesDataApi = ref([]);
const panoramasDataApi = ref([]);
const authStore = useAuthStore();
const config = useRuntimeConfig();
const baseURL = config.public.apiBase;
const searchTerm = inject('searchTerm', ref(''));
const page = ref(1);
const perPage = 12;
const bus = useNuxtApp().$bus;

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
  try {
    await fetchPanoramas();
    if (!searchTerm.value) {
      await fetchMemories();
    }

    bus.$on('searchTermUpdated', (newSearchTerm) => {
      searchTerm.value = newSearchTerm;
      fetchMemories(newSearchTerm);
    });
  } catch (error) {
    console.error('Error in onMounted:', error);
  }
});

const fetchMemories = async (searchQuery = null) => {
  isLoading.value = true;
  try {
    const response = await $api.memories.getMemories(searchQuery);
    const memories = response.data.filter(
      (memory) => memory.published === true,
    );
    memoriesDataApi.value = memories;
  } catch (error) {
    console.error('Error fetching memories data:', error);
  } finally {
    isLoading.value = false;
  }
};

const fetchPanoramas = async (searchQuery = null) => {
  isLoading.value = true;
  try {
    const response = await $api.panoramas.getPanoramas(searchQuery);

    panoramasDataApi.value = response.data;
  } catch (error) {
    console.error('Error fetching panoramas data:', error);
  } finally {
    isLoading.value = false;
  }
};

const filteredMemories = computed(() => {
  const lowerCaseSearchTerm = searchTerm.value?.toLowerCase() || '';
  const startIndex = (page.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return memoriesDataApi.value
    .filter((memory) =>
      memory.title.toLowerCase().includes(lowerCaseSearchTerm),
    )
    .slice(startIndex, endIndex);
});
</script>

<style scoped>
@import '../assets/src/styles.css';

.index-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

main {
  flex: 1;
}

.memories-wrapper {
  padding: 20px 25px 10px 25px;
  margin-top: 10px;
}

.description-container {
  padding: 0 5px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
  -webkit-line-clamp: 3; /* Показывает только 3 строки */
  text-overflow: ellipsis; /* Добавляет "..." в конце */
  max-height: calc(1.5em * 3); /* Высота для 3 строк текста */
}

.pagination {
  margin-top: 10px;
}
.blurred {
  filter: blur(5px);
  pointer-events: none;
}

.search {
  background-color: var(--header-bg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.memories-list {
  background-color: var(--space-bg-mob);
}

.spaces-wrapper {
  margin: 0 auto;
  min-height: 100vh;
}

.search-wrapper {
  padding: 0 16px;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 20px;
  background: var(--white-color);
  width: 95%;
  margin: 10px auto;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}

.photo {
  width: 100%;
  max-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grecaptcha-badge {
  display: none !important;
}

.memory-title {
  text-align: center;
  font-size: 20px;
}

.title {
  display: flex;
  max-width: 92%;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 0px 20px 20px 0px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  position: absolute;
  bottom: 15px;
}

.info-card {
  padding: 10px 3px 20px 3px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icons-container.up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(25px);
  color: var(--black-color);
}

.icons-container.up img {
  margin-right: 7px;
}

.time {
  display: flex;
  align-items: center;
}

.icons-container.down {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(25px);
  margin-bottom: 16px;
  padding: 4px 0;
  min-height: 32px;
}

.icons-container.down img {
  width: 27px;
  height: 26px;
  margin-right: 10px;
  border-radius: 4px;
  background-color: var(--header-bg);
}

.map {
  display: flex;
  margin-bottom: 5px;
}

.map img {
  width: 25px;
  height: 25px;
}

.map a {
  display: flex;
  align-items: center;
  column-gap: 7px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
}

.btn {
  opacity: 0;
  text-transform: capitalize;
  font-size: 18px;
  line-height: normal;
  border-radius: 4px;
  background-color: var(--header-bg);
  color: var(--white-color);
  display: flex;
  max-width: 182px;
  padding: 6px 14px;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, 0%);
}

.btn:hover {
  background-color: var(--btn-border);
}

.btn:active {
  border: 2px solid var(--icons-contact-bg);
  background-color: var(--header-bg);
}

a {
  text-decoration: none;
  color: var(--text-color);
}

.custom-search-input {
  margin-top: 40px;
}

.icons-container .down {
  position: relative;
}

.dots-icon::before {
  position: absolute;
  bottom: -30%;
  left: 50%;
  transform: translateX(-50%);
}

.container:hover .btn {
  opacity: 1;
}

@media (min-width: 768px) {
  .blurred {
    filter: none;
    pointer-events: auto;
  }
}

@media (min-width: 1024px) {
  .search {
    padding: 0 10px;
  }

  .search-wrapper {
    padding: 0 8px;
  }

  .btn {
    opacity: 0;
  }

  .photo {
    max-height: 274px;
  }

  .container {
    margin-bottom: 15px;
    width: 95%;
  }
  .icons-container.down img {
    width: 32px;
    height: 32px;
    border-radius: 6px;
  }
}

@media (min-width: 1440px) {
  .memories-wrapper {
    padding: 20px 25px;
  }
}
</style>
