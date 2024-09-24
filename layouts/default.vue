<template>
  <div class="page-container">
    <div class="content-wrap">
      <HeaderAuthUsers v-if="store?.userData?.user?.isactivated" />
      <HeaderMain v-else />
      <NuxtPage />
    </div>
    <FooterMain ref="footerRef" />
    <button
      id="scrollToTop"
      :class="{ 'in-footer': isScrollToTopInFooter, show: showScrollToTop }"
      @click="scrollToTop"
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="49"
          height="49"
          rx="24.5"
          :stroke="
            isScrollToTopInFooter ? 'var(--white-color)' : 'var(--footer-bg)'
          "
        />
        <rect
          x="3.5"
          y="3.5"
          width="43"
          height="43"
          rx="21.5"
          :stroke="
            isScrollToTopInFooter ? 'var(--white-color)' : 'var(--footer-bg)'
          "
        />
        <path
          d="M26.0607 18.9596C25.4749 18.3738 24.5251 18.3738 23.9393 18.9596L14.3934 28.5055C13.8076 29.0913 13.8076 30.0411 14.3934 30.6269C14.9792 31.2127 15.9289 31.2127 16.5147 30.6269L25 22.1416L33.4853 30.6269C34.0711 31.2127 35.0208 31.2127 35.6066 30.6269C36.1924 30.0411 36.1924 29.0913 35.6066 28.5055L26.0607 18.9596ZM26.5 21.0203L26.5 20.0203L23.5 20.0203L23.5 21.0203L26.5 21.0203Z"
          :fill="
            isScrollToTopInFooter ? 'var(--white-color)' : 'var(--footer-bg)'
          "
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.store.ts';
import FooterMain from './footers/FooterMain.vue';
import HeaderAuthUsers from '@/layouts/headers/HeaderAuthUsers.vue';
import HeaderMain from './headers/HeaderMain.vue';
import { nextTick } from 'vue';

const store = useAuthStore();
const isScrollToTopInFooter = ref(false);
const showScrollToTop = ref(false);
const footerRef = ref(null);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  if (footerRef.value) {
    const footerRect = footerRef.value;
    const isInFooter =
      footerRect.top <= window.innerHeight && footerRect.bottom >= 0;

    isScrollToTopInFooter.value = isInFooter;

    const scrollPosition = window.scrollY;
    const screenHeight = window.innerHeight;
    showScrollToTop.value = scrollPosition > screenHeight;
  }
};

const setUserData = async () => {
  await nextTick();
  if (localStorage.getItem('userData')) {
    store.userData = JSON.parse(localStorage.getItem('userData'));
    store.isAuthed = true;
  }
};
onMounted(async () => {
  await setUserData();
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
html {
  overflow-y: scroll;
}
/* Стилизация полосы прокрутки для WebKit браузеров (Chrome, Safari) */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Стилизация для Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Это обеспечит, что контейнер занимает как минимум всю высоту viewport */
}

.content-wrap {
  flex: 1; /* Это позволит контенту расширяться и занимать доступное пространство */
}

/* .other-page {
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
} */

.grecaptcha-badge {
  display: none !important;
}

#scrollToTop {
  position: fixed;
  bottom: 65px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s,
    visibility 0.3s;
  background-color: var(--space-bg);
  z-index: 1000;
}

#scrollToTop.in-footer {
  background-color: transparent;
  color: var(--white-color);
}

#scrollToTop.show {
  opacity: 0.8;
  visibility: visible;
}

@media (min-width: 768px) {
  #scrollToTop {
    bottom: 24px;
    right: 24px;
  }

  #scrollToTop:hover {
    background-color: var(--btn-border);
  }

  #scrollToTop:active {
    background-color: transparent;
  }

  #scrollToTop:hover rect {
    stroke: var(--white-color);
  }

  #scrollToTop:active rect {
    stroke: var(--btn-border);
  }

  #scrollToTop:hover path {
    fill: var(--white-color);
  }

  #scrollToTop:active path {
    fill: var(--btn-border);
  }
}

@media (min-width: 1440px) {
  #scrollToTop {
    background-color: transparent;
  }
}
</style>
