<template>
  <div class="input-wrapper">
    <label>Телефон*</label>
    <div>
      <input
        :class="['input', { error: isError }]"
        type="text"
        @input="onInput"
      />
      <p>{{ textPhoneError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneInput',
  props: {
    textPhoneError: {
      type: String,
      default: '',
    },
    isError: {
      default: false,
      type: Boolean,
    },
    clearForm: {
      default: false,
      type: Boolean,
    },
  },
  emits: ['givePhone'],
  data() {
    return {
      value: '',
    };
  },
  watch: {
    clearForm: 'handleClearForm',
  },
  methods: {
    onInput(event) {
      event.target.value = event.target.value
        .replace('+38 (0', '')
        .replace(/\D/g, '')
        .slice(0, 9);
      const phoneRegex = /^(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/;

      event.target.value = event.target.value.replace(
        phoneRegex,
        (_match, p1, p2, p3, p4) => {
          const formattedNumber = [];

          if (p1) {
            formattedNumber.push(`+38 (0${p1}`);
          }
          if (p2) {
            formattedNumber.push(`) ${p2}`);
          }
          if (p3) {
            formattedNumber.push(` ${p3}`);
          }
          if (p4) {
            formattedNumber.push(` ${p4}`);
          }

          return formattedNumber.join('');
        },
      );
      this.value = event.target.value;
      this.$emit('givePhone', this.value);
    },
    handleClearForm() {
      this.value = '';
    },
  },
};
</script>

<style>
.error {
  border: 1px solid red !important;
}
</style>
