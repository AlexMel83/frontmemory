<template>
  <div class="menu">
    <button
      class="btn"
      :class="{ active: activeTab === 'profileActive' }"
      @click="goTo('/user')"
    >
      Профіль
    </button>
    <button
      class="btn"
      :class="{ active: activeTab === 'favoriteActive' }"
      @click="goTo('/user/favorite')"
    >
      Збережені
    </button>
    <button
      class="btn"
      :class="{ active: activeTab === 'historyActive' }"
      @click="goTo('/user/history')"
    >
      Історія
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user;
    },
    activeTab() {
      return this.$store.state.activeTabAuthUserMenu;
    },
  },
  methods: {
    goTo(to) {
      navigateTo(to);
      this.$store.state.menuOpen = !this.$store.state.menuOpen;
    },
  },
};
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.menu .btn {
  width: 200px;
  height: 48px;
  border: 1px solid var(--text-color);
  border-radius: 6px 0 0 6px;
  margin-bottom: 32px;
}

.menu .btn:hover,
.menu .btn:active {
  color: var(--white-color);
}

.active {
  background-color: var(--text-color);
  color: var(--white-color);
}

@media (min-width: 900px) {
  .menu .btn {
    width: 260px;
  }
}
</style>
