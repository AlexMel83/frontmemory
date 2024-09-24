<template>
  <div class="menu">
    <button
      class="btn"
      :class="{ active: adminCoworkingActive }"
      @click="navigateTo('/admin')"
    >
      Coworking
    </button>
    <button
      class="btn"
      :class="{ active: adminUserActive }"
      @click="navigateTo('/admin/adminUser')"
    >
      User
    </button>
    <button
      class="btn"
      :class="{ active: adminConstructorActive }"
      @click="navigateTo('/admin/adminConstructor')"
    >
      Constructor
    </button>
  </div>
</template>

<script>
export default {
  props: {
    adminCoworkingActive: {
      default: false,
      type: Boolean,
    },
    adminUserActive: {
      default: false,
      type: Boolean,
    },
    adminConstructorActive: {
      default: false,
      type: Boolean,
    },
  },
  computed: {
    admin() {
      return this.$store.state.admi;
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
