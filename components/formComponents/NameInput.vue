<template>
  <div class="input-wrapper">
    <label>Ім'я*</label>
    <div>
      <input
        v-model="value"
        :class="['input', { error: isError }]"
        type="text"
        maxlength="30"
        @input="onInput"
      />
      <p>{{ textNameError }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NameInput',
  props: {
    textNameError: {
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
  emits: ['giveName'],
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
      this.value = event.target.value.replace(/[^a-zA-Zа-яА-ЯїЇєЄіІґҐ'-]/g, '');
      this.$emit('giveName', this.value);
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
