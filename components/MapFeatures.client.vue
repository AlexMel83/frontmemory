<template>
  <div
    class="w-auto absolute top-[15px] left-[30px] md:left-[60px] z-[2] flex gap-4 px-6 pb-8 md:px-0 md:py-0 bg-transparent"
  >
    <!--Search-->
    <div class="relative flex-1 md:min-w-[350px]">
      <UInput
        v-model="searchQuery"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        type="text"
        placeholder="Пошук"
        icon="i-heroicons-magnifying-glass-20-solid"
        autocomplete="off"
        @input="search"
        @focus="$emit('toggleSearchResults')"
      >
        <template #trailing>
          <UButton
            v-show="searchQuery !== ''"
            color="gray"
            variant="link"
            icon="i-heroicons-x-mark-20-solid"
            :padded="false"
            @click="searchQuery = ''"
          />
        </template>
      </UInput>
      <!--Search result-->
      <div class="absolute mt-2 w-full">
        <!--Results-->
        <div
          v-if="searchQuery && searchResults"
          class="max-h-[200px] overflow-y-auto overflow-x-hidden bg-white rounded-md"
        >
          <!--Loading-->
          <LoadingSpinner v-if="!searchData" />
          <div v-else>
            <div
              v-for="(result, index) in searchData"
              :key="index"
              class="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-slate-600 hover:text-white"
              @click="selectResult(result)"
            >
              <UIcon
                name="i-heroicons-map-pin-solid"
                style="
                  width: 1rem;
                  height: 1rem;
                  min-width: 1rem;
                  min-height: 1rem;
                "
              />
              <p class="text-xs">
                {{ result.place_name_uk }}
              </p>
            </div>
          </div>
        </div>
        <!--Selected Search Result-->
        <div
          v-if="selectedResult"
          class="mt-2 px-3 py-3 bg-white rounded-md relative"
        >
          <UIcon
            class="absolute top-2 right-2 cursor-pointer"
            name="i-heroicons-x-mark-20-solid"
            @click="removeResult"
          />
          <h1 class="text-lg">
            {{ selectedResult.text }}
          </h1>
          <p class="text-xs mb-1">{{ selectedResult.place_name }},</p>
          <p class="text-xs">
            {{ selectedResult.properties.category }}
          </p>
        </div>
      </div>
    </div>
    <!--Geolocation-->
    <div
      class="py-1 px-1 flex items-center shadow-md rounded-md min-h-[32px]"
      :class="{ 'bg-slate-600': coords, 'bg-white': !coords }"
      @click="$emit('getGeoLocation')"
    >
      <UIcon
        name="i-heroicons-map-pin-solid"
        class="text-state-600 text-[25px]"
        :class="{
          'bg-white': coords,
          'animate-pulse': fetchCoords,
        }"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { useRuntimeConfig } from '#app';

export default {
  components: { LoadingSpinner },
  props: {
    coords: {
      type: Object,
      required: true,
    },
    fetchCoords: {
      type: Boolean,
      required: true,
    },
    searchResults: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'toggleSearchResults',
    'getGeoLocation',
    'plotResult',
    'removeResult',
  ],
  setup(props, { emit }) {
    const searchQuery = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);
    const selectedResult = ref(null);
    const config = useRuntimeConfig();
    let apiBase;
    if (process.client) {
      if (window.location.hostname === 'memory.pp.ua') {
        apiBase = 'https://api.' + window.location.hostname;
      } else {
        apiBase = config.public.apiBase || 'http://localhost:4040';
      }
    } else {
      apiBase = config.public.apiBase || 'http://localhost:4040';
    }
    const search = () => {
      clearTimeout(queryTimeout.value);
      searchData.value = null;
      queryTimeout.value = setTimeout(async () => {
        if (searchQuery.value !== '') {
          const params = new URLSearchParams({
            fuzzyMatch: true,
            language: 'uk',
            limit: 10,
            proximity: props.coords
              ? `${props.coords.lng},${props.coords.lat}`
              : '0,0',
          });
          const getData = await axios.get(
            `${apiBase}/geosearch/${searchQuery.value}?${params}`,
          );
          searchData.value = getData.data.features;
        }
      }, 750);
    };

    const selectResult = (result) => {
      selectedResult.value = result;
      emit('plotResult', result.geometry);
    };

    const removeResult = () => {
      selectedResult.value = null;
      emit('removeResult');
    };
    return {
      searchQuery,
      searchData,
      queryTimeout,
      search,
      selectResult,
      selectedResult,
      removeResult,
    };
  },
};
</script>
