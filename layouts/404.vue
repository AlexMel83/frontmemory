<template>
  <div class="box-fail">
    <p class="text-whoops">Упс</p>
    <img class="fail-404" src="~/public/404.png" alt="404" />
    <p>Сторінка, яку ви шукали, не існує.</p>
    <nuxt-link to="/" class="btn"> На головну </nuxt-link>
  </div>
</template>

<style scoped>
.fail-404 {
  width: 80%;
}

p {
  text-align: center;
  color: var(--1, #09273b);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.box-fail {
  min-height: calc(100vh - 303px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 32px 0 32px 0px;
}

.btn {
  background-color: var(--header-bg);
  color: white;
  padding: 12px 24px;
  border-radius: 5px;
  text-transform: uppercase;
  margin: 0 auto;
  display: block;
  width: fit-content;
}

@media (min-width: 768px) {
  .fail-404 {
    width: 80%;
    max-width: 700px;
  }

  p {
    font-size: 26px;
    line-height: 140%;
  }
}
</style>
