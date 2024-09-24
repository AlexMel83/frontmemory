<template>
  <div class="input-wrapper-person">
    <label>
      <span>Кількість осіб</span>
    </label>
    <div :class="['input-wrapper-icon', { error: isError }]">
      <input v-model="value" type="text" maxlength="3" @input="onInput" />
      <img src="~assets/icon_amount.png" alt="icon" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PersonInput',
  props: {
    isError: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['givePerson'],
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    onInput(event) {
      event.target.value = event.target.value.replace(/\D/g, '');
      this.$emit('givePerson', event.target.value);
    },
  },
};
</script>
<style scoped>
.input-wrapper-person {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 284px;
  height: 19px;
  margin: 0 auto 16px auto;
  color: #062539;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 4px 0 20px 0;
}
.input-wrapper-icon {
  display: flex;
  flex-direction: row;
  width: 143px;
  background-color: var(--bg-input);
  border-radius: 6px;
}

.input-wrapper-icon img {
  width: 17px;
  height: 17px;
  margin: auto 12px;
}

input {
  width: 100%;
  height: 100%;
  padding: 6px 12px;
  border: none;
  font-family: Verdana;
  font-size: 16px;
}

input:focus {
  outline: none;
}

.error {
  border: 1px solid red !important;
}

@media (min-width: 375px) {
  .input-wrapper-person {
    width: 327px;
  }
}

@media (min-width: 768px) {
  .input-wrapper-person {
    width: 431px;
    height: 24px;
    margin: 14px auto 16px 16px;
    font-size: 18px;
  }
  .input-wrapper-icon {
    width: 223px;
  }
  input {
    font-size: 18px;
  }
}
</style>
