<template>
  <div class="error-page">
    <div class="error-page__title">
      <h1>Status code: {{ error.statusCode }}</h1>
      <h2>Message: {{ error.message }}</h2>
      <h3>Это всего лишь ошибка на сайте, ресторан по прежнему работаем.</h3>
    </div>
    <nuxt-link
        class="error-page__link"
        to="/"
    >
      Вернуться на главную страницу
    </nuxt-link>
  </div>
</template>

<script setup>
defineProps(['error'])
</script>

<style lang="scss">
.error-page {
  height: 100%;
  width: 100%;
  text-align: center;
  //padding-top: 100px;
  background-color: #FFF2E7;
  //margin-top: 0;

  &__title {
    //margin: 42px;
    padding-bottom: 32px;
    @include padding-top-main;

  }

  &__link {
    color: $black;
    text-decoration: none;
    font-size: 20px;
    padding: 12px;
    border-radius: 8px;
    border: 2px solid rgba($black, 1);

    &:hover {
      border: 2px solid rgba($brown, 1);
      cursor: pointer;
      color: $brown;
    }
  }
}
</style>