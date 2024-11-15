<template>
  <div class="banner-birthday-on-index-page">
    <client-only>
      <Transition name="fade">
        <div
            v-if="isShowBanner"
            :key="content.id"
            class="banner-birthday-on-index-page__wrapper"
        >
          <div
              :style="{backgroundImage: `url(${content.srcImg}`, backgroundPosition: '40% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
              class="banner-birthday-on-index-page__image-block"
          >
              <div class="banner-birthday-on-index-page__header">{{ content.header }}</div>

          </div>
          <section class="banner-birthday-on-index-page__text-block">
            <div
                v-if="content.annotation"
                class="banner-birthday-on-index-page__annotation"
            >
              {{ content.annotation }}
            </div>
            <div
                v-if="content.eventTime"
                class="banner-birthday-on-index-page__eventTime"
            >
              {{ content.eventTime }}
            </div>
            <div
                v-if="content.foreword"
                class="banner-birthday-on-index-page__foreword"
            >
              {{ content.foreword }}
            </div>
            <div
                v-if="content.price"
                class="banner-birthday-on-index-page__price"
            >
              {{ content.price }}
            </div>

            <div
                v-if="content.bonus"
                class="banner-birthday-on-index-page__bonus"
            >
              {{ content.bonus }}
            </div>
            <div
                v-if="content.footer"
                class="banner-birthday-on-index-page__footer"
            >
              {{ content.footer }}: {{ content.phone }}, {{ content.address }}
            </div>
          </section>
        </div>
      </Transition>
    </client-only>
  </div>
</template>

<script setup>
import ModalWindow from "~/components/ModalWindow.vue";
import contentJson from '~/src/api/json/content.json'

const props = defineProps({
  content: {
    type: Object
  }
})
const content = {
  dateOff: {
    day: 10,
    month: 12,
    yearFull: 2024
  },
  id: 'contentBannerNY',
  header: 'У нас ЮБИЛЕЙ! Нам 5 лет!',
  annotation: 'Как и каждый наш день Рождения мы устраиваем праздник!',
  eventTime: '8 декабря отмечаем наш ДЕНЬ РОЖДЕНИЯ!',
  foreword: 'Сбор гостей с 18:00 до 19:00',
  descriptions: [
    'В праздничной программе:',
    'Фуршет с грузинскими угощениями и напитками с 18:00 до 19:00',
    '',
    'Шоу-программа с 19:00:',
    'грузинские танцы, живая музыка, мастер-класс по лезгинке',
    'Розыгрыш трех сертификатов в наш ресторан на сумму 2000, 3000 и 5000 рублей',
    '',
    '-Дискотека',
    '-Праздничное оформление шарами, фотозона',
    '-Фотограф И скидка всем гостям ресторана в этот день - 5%',
  ],
  price: '',
  bonus: '',
  footer: 'Бронируйте столик уже сейчас',
  phone: '311-04-24',
  address: ' Романова 39 ',
  srcImg: '/image/foto/index/bannerCorparatBd.avif'
}
const isShowBanner = computed(
    () => {
      const dateNow = new Date()
      const dateOff = new Date(content.dateOff.yearFull, content.dateOff.month - 1, content.dateOff.day + 1)
      return dateOff > dateNow
    }
)
</script>

<style lang="scss">
.banner-birthday-on-index-page {
  width: 100%;
  white-space: pre-wrap;

  &__wrapper {
    padding: 12px;
    background-color: rgba($brown, 0.5);
    display: grid;
    grid-column-gap: 40px;
    grid-row-gap: 10px;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    @media screen and (min-width: $width-tablet) {
      padding: 22px;
    }
    @media screen and (min-width: $width-desktop) {
      padding: 42px;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
    }

  }

  &__image-block {
    grid-area: 2 / 1 / 3 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-radius: 16px;
    min-height: 400px;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 2 / 3 / 3;
    }
  }

  &__header {
    font-size: 16px;
    color: $white;
    background-color: rgba($brown, .4);
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    @media screen and (min-width: $width-desktop) {
      font-size: 24px;
    }
  }

  &__text-block {
    color: $white;
    font-size: 14px;
    white-space: wrap;
    grid-area: 1 / 1 / 2 / 2;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 1 / 3 / 2;
      font-size: 18px;
    }
  }

  &__annotation, &__price, &__footer, &__bonus {
    margin: 16px 0;
    font-weight: revert;
  }

  &__eventTime {
    margin-bottom: 16px;
    font-weight: lighter;
  }
}

.category-list * {
  transition: .4s linear;
}

.category-list {
  list-style: circle inside;
  padding: 0 10px;
  margin: 0;
}

.category-list li {
  padding: 2px 0;
}

.category-list li:hover, .category-list li:active {
  color: $red;
}
</style>
