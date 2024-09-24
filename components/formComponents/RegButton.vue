<template>
  <button>Забронювати</button>
</template>

<style scoped>
button {
  width: 189px;
  height: 35px;
  background-color: #f95c65;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  font-family: Verdana;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}

button:hover {
  background-color: #fa414c;
}

button:active {
  background-color: #fe303c;
}

@media (min-width: 768px) {
  button {
    width: 204px;
    height: 38px;
    font-size: 18px;
    margin-top: 6px;
  }
}
</style>
