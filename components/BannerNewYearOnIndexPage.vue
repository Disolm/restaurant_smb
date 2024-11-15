<template>
  <div class="banner-on-index-page">
    <client-only>
      <Transition name="fade">
        <div
            v-if="isShowBanner"
            :key="content.id"
            class="banner-on-index-page__wrapper"
        >
          <div
              :style="{backgroundImage: `url(${content.srcImg}`, backgroundPosition: '40% 50%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
              class="banner-on-index-page__image-block"
          >
            <UiButton @click.stop="clickBtn(true)">
              <div class="banner-on-index-page__header">{{ content.header }}</div>
            </UiButton>

          </div>
          <section class="banner-on-index-page__text-block">
            <div
                v-if="content.annotation"
                class="banner-on-index-page__annotation"
            >
              {{ content.annotation }}
            </div>
            <div
                v-if="content.eventTime"
                class="banner-on-index-page__eventTime"
            >
              {{ content.eventTime }}
            </div>
            <div
                v-if="content.foreword"
                class="banner-on-index-page__foreword"
            >
              {{ content.foreword }}
            </div>
            <div
                v-if="content.price"
                class="banner-on-index-page__price"
            >
              {{ content.price }}
            </div>

            <div
                v-if="content.bonus"
                class="banner-on-index-page__bonus"
            >
              {{ content.bonus }}
            </div>
            <div
                v-if="content.footer"
                class="banner-on-index-page__footer"
            >
              {{ content.footer }}: {{ content.phone }}, {{ content.address }}
            </div>
          </section>
        </div>
      </Transition>
      <ModalWindow
          v-if="isShowModalWindow"
          key="menu-table"
          :content="contentJson"
          :title="content.header"
          :scroll="true"
          @isShowReserveTable="clickBtn($event)"
      >
        <ul class="banner-on-index-page__descriptions category-list">
          <li
              v-for="description in content.descriptions"
              :key="description"
              class="banner-on-index-page__description">
            {{ description || ' ' }}
          </li>
        </ul>
      </ModalWindow>
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
    day: 15,
    month: 1,
    yearFull: 2025
  },
  id: 'contentBanner',
  header: 'НОВОГОДНЕЕ МЕНЮ',
  annotation: 'Новогоднее меню с Шоу программой, DJ.Ведущим и Грузинским Дедом Морозом',
  eventTime: 'С 13 по 31 декабря',
  foreword: 'Меню рассчитано на 5 человек',
  descriptions: [
    'Холодные блюда:',
    'Ассорти Пхали и Бадриджани– 160 гр',
    'Ассорти сыров– 170 гр',
    'Овощное ассорти– 200 гр',
    'Домашние соленья– 160 гр',
    'Рыбное ассорти холодное– 100 гр',
    '',
    'Салаты:',
    'Салат Кахетинский– 200 гр',
    'Салат по Тбилисски– 200 гр',
    '',
    'Выпечка:',
    'Хачапури по Имеретински– 550 гр',
    'Хлеб Шоти– 250 гр',
    '',
    'Горячие блюда:',
    'Долма -200 гр',
    'Кавказский хребет– 1500 гр',
    'Овощной шашлык – 200 гр',
    '',
    'Десерты:',
    'Фруктовая тарелка сезонная 250 гр',
    '',
    'Напитки:',
    'Вода(с газом/без газа) – 1000 мл',
    'Морс – 1500 мл',
    '',
    'Алкоголь:',
    'Шампанское – 1 бут. 750 мл',
    'Вино домашнее красное , белое (на выбор)- 2л',
    'Водка/коньяк– 0,5 л  1500 руб'
  ],
  price: 'Стоимость: с алкоголем – 5000 руб./человек // без алкоголя – 3900 руб./человек',
  bonus: 'Так же компании до 5 человек бронируют Новогодний банкет на Депозит  5000 руб./человек\n' +
      'В эту сумму входит: \n' +
      '- 1000 рублей – новогодняя программа\n' +
      '- меню + карта бара  на ваш выбор \n' +
      '( предзаказ составляем заранее)\n',
  footer: 'Бронируйте столик уже сейчас',
  phone: '311-04-24',
  address: ' Романова 39 ',
  srcImg: '/image/foto/index/bannerCorparat.avif'
}
const isShowModalWindow = ref(false)
const isShowBanner = computed(
    () => {
      const dateNow = new Date()
      const dateOff = new Date(content.dateOff.yearFull, content.dateOff.month - 1, content.dateOff.day + 1)
      return dateOff > dateNow
    }
)

function clickBtn(event) {
  isShowModalWindow.value = event;
  if (event) {
    document.body.style.overflow = 'hidden';
  }

}
</script>

<style lang="scss">
.banner-on-index-page {
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
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    border-radius: 16px;
    min-height: 400px;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 1 / 3 / 2;
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
    grid-area: 2 / 1 / 3 / 2;
    @media screen and (min-width: $width-desktop) {
      grid-area: 1 / 2 / 3 / 3;
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
