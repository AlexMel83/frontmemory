<script setup>
import LogosGoogleIcon from './LogosGoogleIcon.vue';
import LogosFacebook from './LogosFacebook.vue';

const { $api, $load } = useNuxtApp();

const errors = reactive({
  textError: '',
});

const handleSocialLogin = async (provider) => {
  try {
    const res = await $load(async () => $api.auth.socAuth(provider), errors);
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  } catch (error) {
    if (error) {
      errors.textError = 'Помилка при авторизації через соціальну мережу';
    }
  }
};
</script>

<template>
  <div class="wrapper-login-using">
    <div class="login-using m-2">
      <div class="login-using-item" @click="handleSocialLogin('google')">
        <LogosGoogleIcon class="social-icon" />
        <span class="login-text">За допомогою<br />Google</span>
      </div>
      <div class="login-using-item" @click="handleSocialLogin('facebook')">
        <LogosFacebook class="social-icon" />
        <span class="login-text">За допомогою<br />Facebook</span>
      </div>
    </div>
    <UNotifications v-if="errors.textError" color="red" :timeout="3000">
      {{ errors.textError }}
    </UNotifications>
  </div>
</template>

<style scoped>
.wrapper-login-using {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-using {
  display: flex;
  gap: 15px;
}

.login-using .login-using-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #f1f1f1;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.login-using .login-using-item:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.social-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px; /* отступ между иконкой и текстом */
}

.login-text {
  font-size: 14px;
  color: #333;
}
</style>
