<template>
  <div class="container-user-auth-name">
    <div class="item main-user-auth-name">
      <span> {{ userName }}</span> &nbsp;<span>{{ userSurname }}</span>
    </div>
    <div class="item cabinet" :class="{ active: isInCabinet }">
      <a :href="setRout()">
        <span class="flex items-center" @click="menuOpen = false">
          <UIcon name="i-heroicons-user-solid" class="icon" />Кабінет</span
        >
      </a>
    </div>
    <div class="item exit">
      <nuxt-link href="/">
        <span class="flex items-center" @click="goOut">
          <UIcon
            name="i-heroicons-arrow-right-start-on-rectangle-solid"
            class="icon"
          />Вихід</span
        >
      </nuxt-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store.ts';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const store = useAuthStore();
const menuOpen = ref(false);
const route = useRoute();

const userName = ref('');
const userSurname = ref('');

const updateUserData = () => {
  userName.value = store.userData.user.name;
  userSurname.value = store.userData.user.surname;
};

watch(
  () => localStorage.getItem('userData'),
  (newVal) => {
    if (newVal) {
      updateUserData();
    }
  },
  { immediate: true },
);

const isInCabinet = computed(() => {
  const currentPath = route.path;
  return (
    currentPath.startsWith('/manager') ||
    currentPath.startsWith('/user') ||
    currentPath.startsWith('/admin')
  );
});

const setRout = () => {
  switch (store.userData.user.role) {
    case 'manager':
      return '/manager';
    case 'user':
      return '/user';
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
};

const goOut = () => {
  menuOpen.value = false;
  store.logOut();
  localStorage.removeItem('userData');
};
</script>

<style scoped>
.container-user-auth-name {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
}

.main-user-auth-name {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.icon {
  margin-right: 5px;
  width: 24px;
  height: 24px;
}

img {
  margin-right: 5px;
}

.cabinet:hover,
.exit:hover {
  transform: scale(1.1);
}

.item.active {
  display: none;
}

@media (min-width: 768px) {
  .container-user-auth-name {
    flex-direction: row;
    align-items: center;
  }
}
</style>
