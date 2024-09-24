<template>
  <div class="input-wrapper-date">
    <div class="input-wrapper-date-first">
      <span>Дата з</span>
      <input v-model="firstDate" class="time-date" type="date" />
    </div>
    <div class="input-wrapper-date-second">
      <span>до</span>
      <input v-model="secondDate" class="time-date" type="date" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['getDate'],
  data() {
    return {
      firstDate: '',
      secondDate: '',
    };
  },
  watch: {
    firstDate: 'passDate',
    secondDate: 'passDate',
  },
  mounted() {
    this.firstDate = this.getCurrentDate();
  },
  methods: {
    passDate() {
      if (this.secondDate === '') {
        this.secondDate = this.firstDate;
      }
      this.$emit('getDate', {
        firstDate: this.firstDate,
        secondDate: this.secondDate,
      });
    },
    getCurrentDate() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const year = now.getFullYear();
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
.input-wrapper-date {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 78px;
}

.input-wrapper-date .input-wrapper-date-first,
.input-wrapper-date .input-wrapper-date-second {
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

.input-wrapper-date input {
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
  .input-wrapper-date .input-wrapper-date-first,
  .input-wrapper-date .input-wrapper-date-second {
    width: 327px;
  }
  .input-wrapper-date input {
    width: 218px;
  }
}

@media (min-width: 768px) {
  .input-wrapper-date {
    flex-direction: row;
    width: 528px;
    height: 24px;
    margin: 6px 0 12px 0;
  }

  .input-wrapper-date .input-wrapper-date-first {
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

  .input-wrapper-date-first input,
  .input-wrapper-date-second input {
    width: 150px;
    height: 100%;
  }

  .input-wrapper-date .input-wrapper-date-second {
    width: 228px;
    height: 100%;
  }

  .input-wrapper-date-second span {
    width: 49px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
