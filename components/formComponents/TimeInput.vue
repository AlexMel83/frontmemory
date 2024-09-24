<template>
  <div class="input-wrapper-time">
    <div class="input-wrapper-time-first">
      <span>Час з</span>
      <input v-model="firstTime" class="time-date" type="time" />
    </div>
    <div class="input-wrapper-time-second">
      <span>до</span>
      <input v-model="secondTime" class="time-date" type="time" />
    </div>
  </div>
</template>
<script>
export default {
  emits: ['getTime'],
  data() {
    return {
      firstTime: '',
      secondTime: '',
    };
  },
  watch: {
    firstTime: 'passTime',
    secondTime: 'passTime',
  },
  mounted() {
    this.firstTime = this.getCurrentTime();
  },
  methods: {
    passTime() {
      this.$emit('getTime', {
        firstTime: this.firstTime,
        secondTime: this.secondTime,
      });
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
};
</script>
<style scoped>
.input-wrapper-time {
  margin: 16px 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 78px;
}

.input-wrapper-time .input-wrapper-time-first,
.input-wrapper-time .input-wrapper-time-second {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 284px;
  height: 31px;
  margin: 0 auto 16px auto;
  color: #062539;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.input-wrapper-time input {
  width: 166px;
  height: 19px;
  background-color: #d4d4d4;
  border-radius: 6px;
  border: none;
  font-family: Verdana;
  font-size: 14px;
  padding: 6px 12px;
}

@media (min-width: 375px) {
  .input-wrapper-time .input-wrapper-time-first,
  .input-wrapper-time .input-wrapper-time-second {
    width: 327px;
  }

  .input-wrapper-time input {
    width: 218px;
  }
}

@media (min-width: 768px) {
  .input-wrapper-time {
    flex-direction: row;
    width: 528px;
    height: 24px;
  }

  .input-wrapper-time .input-wrapper-time-first {
    width: 300px;
    height: 24px;
    margin: 0 auto 16px auto;
    color: #062539;
    font-family: Verdana;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  .input-wrapper-time-first input,
  .input-wrapper-time-second input {
    width: 150px;
    height: 100%;
  }

  .input-wrapper-time .input-wrapper-time-second {
    width: 228px;
    height: 100%;
  }

  .input-wrapper-time-second span {
    width: 49px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
