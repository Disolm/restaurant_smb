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
                        <div class="banner-on-index-page__header">{{ content.header }}</div>
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
                        <ul class="banner-on-index-page__descriptions category-list">
                            <li
                                v-for="description in content.descriptions"
                                :key="description"
                                class="banner-on-index-page__description">
                                {{ description }}
                            </li>
                        </ul>
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
        </client-only>
    </div>
</template>

<script setup>
const content = {
    dateOff: {
        day: 15,
        month: 1,
        yearFull: 2024
    },
    id: 'contentBanner',
    header: 'НОВОГОДНИЕ КОРПОРАТИВЫ!',
    annotation: 'С 15 декабря наша программа становится Новогодней.',
    eventTime: '',
    foreword: 'И это значит, что Вас ждут:',
    descriptions: [
        'Ведущий',
        'Грузинские танцы',
        'Живая музыка',
        'Дед Мороз из Грузии',
        'Дискотека',
        'Конкурсы',
        'И много-много весёлого настроения'
    ],
    price: 'Стоимость: 3600р на персону без алкоголя // 4900р на персону с алкоголем',
    bonus: 'Стоимость шоу-программы 900р за персону',
    footer: 'Бронируйте столик уже сейчас',
    phone: '311-04-24',
    address: ' Романова 39 ',
    srcImg: '/image/foto/index/bannerCorparat.jpg'
}
const isShow = ref(false)
const isShowBanner = computed(
    () => {
        const dateNow = new Date()
        const dateOff = new Date(content.dateOff.yearFull, content.dateOff.month - 1, content.dateOff.day + 1)
        return dateOff > dateNow
    }
)
</script>

<style lang="scss">
.banner-on-index-page {
    width: 100%;

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
        @media screen and (min-width: $width-desktop) {
            grid-area: 1 / 1 / 3 / 2;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        border-radius: 16px;
        min-height: 400px;
    }

    &__header {
        font-size: 32px;
        color: $white;
        background-color: rgba($brown, .4);
        padding: 16px 32px;
        border-radius: 8px;
        margin-bottom: 8px;
        text-align: center;

    }

    &__text-block {
        color: $white;
        font-size: 14px;
        grid-area: 2 / 1 / 3 / 2;
        @media screen and (min-width: $width-desktop) {
            grid-area: 1 / 2 / 3 / 3;
            font-size: 18px;
        }
    }

    &__annotation, &__price, &__footer {
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
