<template>
  <div :class="{ 'home-page': isHomePage }" class="header-main bg-gray-100">
    <div class="container mx-auto px-2 pt-2">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="cursor-pointer logo" @click="hideMenu">
            <NuxtLink to="/">
              <img src="~/assets/favicon.ico" alt="logo" class="w-10 h-10" />
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-4 header-buttons text-white">
          <span сlass="cursor-pointer font-bold">Ua</span>
          <span>|</span>
          <span>En</span>
          <ColorMode />
          <button
            class="md:hidden p-2 rounded-full hover:bg-gray-200 focus:outline-none"
            @click="toggleMenu"
          >
            <UIcon
              v-if="!menuOpen"
              key="bars"
              name="i-heroicons-bars-3"
              class="icon w-10 h-10"
            />
            <UIcon v-else name="i-heroicons-x-mark" class="icon w-10 h-10" />
          </button>
          <template v-if="!isAuthed">
            <button
              class="hidden md:block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
              @click="openLoginModal"
            >
              Увійти
            </button>
          </template>
        </div>
      </div>

      <div class="mt-4">
        <LoginRegistration
          ref="loginRegistrationRef"
          @modal-closed="handleModalClosed"
        />
      </div>
      <p class="mt-6 text-center text-gray-200 header-text">
        <span class="font-bold">Мапа пам'яті:</span> збереження історії та
        відновлення справедливості
      </p>
    </div>
  </div>
  <!-- <ModalLoginRegistration ref="loginRegistrationRef" /> -->
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import LoginRegistration from '@/components/modal/LoginRegistration.vue';

const loginRegistrationRef = ref(null);
const authStore = useAuthStore();
const menuOpen = ref(false);
const route = useRoute();

const isHomePage = computed(() => route.path === '/');
const isAuthed = computed(() => authStore.isAuthed);

const openLoginModal = () => {
  if (loginRegistrationRef.value) {
    loginRegistrationRef.value.openModal();
  }
};

const hideMenu = () => {
  menuOpen.value = false;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    openLoginModal();
  }
};

const handleModalClosed = () => {
  menuOpen.value = false;
};
</script>

<style scoped>
.header-main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--header-bg);
  color: var(--white-color);
  position: relative;
}

.logo img {
  width: 50px;
  height: 30px;
}

.logo-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px;
}

.header-btn {
  margin-left: 24px;
  height: 30px;
  display: none;
  text-transform: capitalize;
}

.burger {
  margin-left: 15px;
  color: white;
  background-color: transparent;
  box-shadow: none;
}

.menu {
  position: relative;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--header-bg);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px 0 0 0;
}

.header-menu-btn {
  width: 100%;
  max-width: 343px;
  height: 46px;
  text-transform: capitalize;
}

.header-menu-btn:hover {
  color: var(--btn-border);
}
.header-menu-btn:active {
  border-radius: 4px;
  border: 1px solid var(--btn-border);
  background: var(--white-color);
}

.header-menu-btn:not(:last-child) {
  margin-bottom: 24px;
}

.header-buttons {
  height: 30px;
  display: flex;
  align-items: center;
}

.header-text {
  display: none;
}

.lang-active {
  font-weight: 700;
}

.bold {
  font-size: 2.25rem;
  font-weight: 900;
}
.is-user {
  margin-right: 20px;
  font-size: 16px;
}
.is-user span {
  margin-right: 5px;
}

@media (min-width: 768px) {
  .header-main.home-page {
    background-image: url('~/assets/header_bg.png');
    background-size: cover;
  }
  .header-main.home-page .header-text {
    display: block;
    text-align: center;
    font-size: 1.3rem;
    max-width: 1092px;
    margin: 0 auto;
  }

  .header-text {
    display: none;
  }

  .logo img {
    width: 84px;
    height: 50px;
  }

  .burger {
    display: none;
  }

  .header-btn {
    display: block;
    letter-spacing: normal;
    font-size: 16px;
    padding: 0 12px;
  }

  .header-btn:hover {
    background-color: var(--white-color);
    color: var(--btn-border) !important;
  }

  .header-buttons {
    display: flex;
    align-items: center;
  }
  .menu {
    display: none;
  }

  @media (min-width: 1024px) {
    .logo-container {
      padding: 32px 64px;
    }
  }
}
</style>
