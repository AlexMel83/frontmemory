<template>
  <div class="input-wrapper">
    <label>Email*</label>
    <div>
      <input
        v-model="value"
        :class="['input', { error: isError }]"
        type="text"
        @input="onInput"
      />
      <p>{{ textEmailError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmailInput',
  props: {
    textEmailError: {
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
  emits: ['giveEmail'],
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
      this.$emit('giveEmail', event.target.value);
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
