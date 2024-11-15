<script setup>
import {useRouter} from '#app';

const ARRAY_LENGTH_GALLERY = 9
import MapIframe from '@/components/MapIframe'
import ModalImage from '@/components/ModalImage'
import content from '~/src/api/json/content.json'
import ModalWindow from '~/components/ModalWindow.vue';

const fade = ref('fade')
const isShowReserveTable = ref(false)
const isActiveModal = ref(false)
const indexImageActive = ref(0)
const router = useRouter()
const {scroll} = useNuxtApp()

const clickButtons = (event) => {
    if (event === content.index.buttons[0].title) {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })

        setTimeout(() => {
            document.body.style.overflow = 'hidden';
            isShowReserveTable.value = true
        }, 150)
    }
    if (event === content.index.buttons[1].title) {
        router.push({path: '/delivery'})
    }
}

const getPictures = () => {
    const pictures = [...Array(ARRAY_LENGTH_GALLERY).keys()]
    pictures.forEach((pic, i) => {
        pictures[i] = Object.assign({}, {
            src: `/image/gallery-index/${i}.jpg`,
            srcAvif: `/image/gallery-index/${i}.avif`,
            srcMini: `/image/gallery-index/${i}-mini.jpg`,
            srcMiniAvif: `/image/gallery-index/${i}-mini.avif`,
            id: i,
        })
    })
    return pictures
}
const openModalImage = (indexImg) => {
    indexImageActive.value = indexImg
    isActiveModal.value = true
}
const handleScroll = (evt, el, type) => {
    const HEIGHT_UP_ON = el.offsetTop - window.innerHeight * 0.8
    const HEIGHT_UP_OFF = el.offsetTop - window.innerHeight * 0.7
    const HEIGHT_DOWN_ON = el.offsetTop
    const HEIGHT_DOWN_OFF = el.offsetTop - window.innerHeight * 0.1
    if (window.scrollY > HEIGHT_UP_ON && window.scrollY < HEIGHT_DOWN_ON) {
        if (type === 'fade') {
            el.setAttribute(
                'style',
                // 'opacity: 1; transform: translate3d(0, -10px, 0);'
                'opacity: 1;'
            )
        }
        if (type === 'slide-fade') {
            el.setAttribute(
                'style',
                'opacity: 1; transform: translateX(0);'
            )
        }
    }
    return window.scrollY > HEIGHT_UP_OFF && window.scrollY < HEIGHT_DOWN_OFF
}
</script>
<template>
    <div class="index" :class="{'index_blockScroll': isShowReserveTable}">
        <div class="index__top">
            <div
                class="index__info"
                :class="{'index__info_active': !isShowReserveTable}"
                key="info"
            >
                <UiTitle tone="light">
                    <h1 class="index__title">
                        {{ content.index.title }}
                    </h1>
                </UiTitle>
                <UiTitle tone="light">
                    <h2 class="index__description">
                        {{ content.index.description }}
                    </h2>
                </UiTitle>

                <div class="index__buttons">
                    <UiButton
                        v-for="button in content.index.buttons"
                        :key="button.id"
                        @click="clickButtons(button.title)"
                    >
                        {{ button.title }}
                    </UiButton>
                </div>
            </div>
            <Transition name="fade" mode="out-in">
                <ModalWindow
                    v-if="isShowReserveTable"
                    key="reserve-table"
                    @isShowReserveTable="isShowReserveTable = $event"
                    :content="content"
                    :title="content.index.reserveTable.title"
                    :description="content.index.reserveTable.content"
                />
            </Transition>
        </div>
        <div class="index__welcome-slogan">
            <UiTitle tone="dark" :decor="false">
                <h3
                    v-scroll="{handleScroll, type:'slide-fade'}"
                    class="index__title animation-slide"
                >
                    {{ content.index.headline.toUpperCase() }}
                </h3>
            </UiTitle>
            <UiTitle tone="dark" :decor="false">
                <h5
                    v-scroll="{handleScroll, type:'slide-fade'}"
                    class="index__description animation-slide"
                >
                    {{ content.index.welcomeSlogan }}
                </h5>
            </UiTitle>
        </div>
        <BannerBirthdayOnIndexPage :content="content"/>
        <BannerNewYearOnIndexPage :content="content"/>
        <div class="index__gallery-container">
            <UiPicture
                v-for="picture in getPictures()"
                :key="picture.id"
                :picture="picture"
                class="index__picture"
                @click="openModalImage(picture.id)"
            />
        </div>
        <ModalImage
            :array-src-images="getPictures()"
            v-model:isActiveModal="isActiveModal"
            v-model:indexImageActive="indexImageActive"
        />
        <div class="index__translations-container">
            <div
                v-scroll="{handleScroll, type:'fade'}"
                class="animation-fade"
            >
                <UiTitle tone="dark" :decor="false">
                    <h2 class="index__title">
                        {{ content.index.translations.title }}
                    </h2>
                </UiTitle>
                <UiTitle tone="dark" :decor="false">
                    <h4
                        v-for="(title, idx) in content.index.translations.content"
                        :key="idx"
                        class="index__description"
                    >
                        {{ title }}
                    </h4>
                </UiTitle>
            </div>
        </div>
        <div class="index__menu-list-container">
            <div
                v-scroll="{handleScroll, type:'slide-fade'}"
                class="index__menu-list-buttons animation-slide"
            >
                <UiTitle tone="light" :decor="false">
                    <h3 class="index__title index__title_color-light">
                        {{ content.index.menuInfo.title.toUpperCase() }}
                    </h3>
                </UiTitle>
                <UiTitle tone="light" :decor="false">
                    <h5 class="index__description index__description_color-light">
                        {{ content.index.menuInfo.description }}
                    </h5>
                </UiTitle>
                <div class="index__buttons">
                    <UiLink
                        v-for="button in content.index.menuInfo.buttonsMenu"
                        :key="button.id"
                        tag="router-link"
                        :to="button.url"
                    >
                        <UiButton>
                            {{ button.title }}
                        </UiButton>
                    </UiLink>
                </div>
            </div>
        </div>
        <div class="index__sale-container">
            <UiTitle tone="dark" :decor="false">
                <h3 class="index__title">
                    {{ content.index.sale.title.toUpperCase() }}
                </h3>
            </UiTitle>
            <div class="index__sale-wrapper">
                <client-only>
                    <div
                        v-for="sale in content.index.sale.descriptionsForImg"
                        :key="sale.id"
                        class="index__sale-block"
                        :style="{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sale.url}`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}"
                    >
                        <UiTitle tone="light" :decor="true">
                            <h5
                                v-for="(title, idx) in sale.titles"
                                :key="idx"
                                class="index__description"
                            >
                                {{ title.toUpperCase() }}
                            </h5>
                        </UiTitle>
                    </div>
                </client-only>
            </div>
        </div>
        <div class="index__show-program">
            <div
                v-scroll="{handleScroll, type:'slide-fade'}"
                class="index__left-block animation-slide"
            >
                <UiTitle tone="light" :decor="true">
                    <h4 class="index__title">
                        {{ content.index.showProgram.title }}
                    </h4>
                </UiTitle>
                <UiTitle tone="light" :decor="true">
                    <h6 class="index__description">
                        {{ content.index.showProgram.description }}
                    </h6>
                </UiTitle>
                <div class="index__buttons">
                    <UiLink
                        tag="router-link"
                        :to="content.index.showProgram.url"
                    >
                        <UiButton>
                            {{ content.index.showProgram.more }}
                        </UiButton>
                    </UiLink>
                </div>
            </div>
            <div class="index__right-block">
                <div
                    v-scroll="{handleScroll, type:'fade'}"
                    class="index__picture index__picture_inactive index__show-program-img-block index__show-program-img-block_one animation-fade"
                />
                <div
                    v-scroll="{handleScroll, type:'fade'}"
                    class="index__picture index__picture_inactive index__show-program-img-block index__show-program-img-block_two animation-fade"
                />
            </div>
        </div>
        <div class="index__address">
            <UiTitle tone="dark" :decor="false">
                <h4
                    v-scroll="{handleScroll, type:'slide-fade'}"
                    class="index__title animation-slide"
                >
                    {{ content.index.address.title }}
                </h4>
            </UiTitle>
            <UiTitle tone="dark" :decor="false">
                <h6 class="index__description index__buttons">
                    <span>
                      {{ content.index.address.adds }}
                    </span>
                    <UiLink tag="a" :href="content.index.phoneHref">
                        {{ content.index.phone }}
                    </UiLink>
                </h6>
            </UiTitle>
            <client-only>
                <MapIframe
                    class="index__map animation-slide"
                    v-scroll="{handleScroll, type:'slide-fade'}"
                />
            </client-only>

        </div>
    </div>
</template>
<style lang="scss">
.index {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    &_blockScroll {
        postiton: fixed;
        overflow: hidden;
        height: 100%;
    }

    &__top {

        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("/image/background/background-index-small.jpg") no-repeat center;
        background-size: cover;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: flex-start;
        position: relative;
        min-height: calc(100vh - $height-header-mobile);
        @include padding-top-main;
        @media screen and (min-width: $width-mobile) {
            min-height: calc(100vh - $height-header-desktop);
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url("/image/background/background-index-big.jpg") no-repeat center;
            background-size: cover;
        }
    }

    &__info {
        padding: 22px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all .1s ease-in;

        &_active {
            opacity: 1;
        }
    }

    &__title {
        display: block;
        font-weight: 600;
        line-height: 46px;
        font-size: 32px;
        margin: 16px;
        text-align: center;
    }

    &__description {
        line-height: 16px;
        font-weight: 200;
        font-size: 12px;
        margin: 0;
        text-align: center;

        @media screen and (min-width: $width-mobile) {
            font-size: 14px;
            line-height: 26px;
            margin: 0;

        }
        @media screen and (min-width: $width-tablet) {
            font-size: 20px;
            margin: 12px;
            line-height: 26px;
        }
    }

    &__welcome-slogan, &__address, &__sale-container, &__translations-container {
        width: 100%;
        min-height: 200px;
        background: $white;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 38px 0;
    }

    &__sale-wrapper {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    &__sale-block {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 16px;
        width: 90vw;
        height: 60vw;

        @media screen and (min-width: $width-mobile) {
            width: 40vw;
            height: 45vw;
        }
        @media screen and (min-width: $width-tablet) {
            width: 40vw;
            height: 40vw;
        }
        @media screen and (min-width: $width-desktop) {
            width: 40vw;
            height: 20vw;
        }
        &:hover {
            -webkit-filter: sepia(100%);
            filter: sepia(100%);
        }
    }

    &__gallery-container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        padding: 44px 0;
        grid-gap: 16px;
    }


    &__picture {
        &:hover {
            cursor: pointer;
            -webkit-filter: sepia(100%);
            filter: sepia(100%);
        }

        width: 80vw;
        height: 75vw;
        @media screen and (min-width: $width-mobile) {
            width: 38vw;
            height: 35vw;
        }
        @media screen and (min-width: $width-tablet) {
            width: 28vw;
            height: 25vw;
        }

        &_inactive:hover {
            cursor: default;
        }
    }

    &__show-program {
        width: 100%;
        padding: 44px 22px;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/image/foto/index/bg-show-program.jpg") no-repeat center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        @media screen and (min-width: $width-tablet) {
            flex-direction: row;
            max-height: 70vh;
        }
    }

    &__left-block {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    &__right-block {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
        margin-top: 22px;
        grid-gap: 10px;
        @media screen and (min-width: $width-tablet) {
            flex-direction: column;
            margin-top: 0;
        }
    }

    &__show-program-img-block {
        border: solid 4px $white;
        border-radius: 2px;

        &_one {
            background: url("/image/foto/index/photo_one.jpg") no-repeat center;
            background-size: cover;
        }

        &_two {
            background: url("/image/foto/index/photo_two.jpg") no-repeat center;
            background-size: cover;
        }
    }

    &__menu-list-container {
        width: 100%;
        height: 80vh;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/image/foto/index/foto-menu.jpg") no-repeat fixed left bottom;
        background-size: cover;
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
    }

    &__buttons {
        margin-top: 36px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        grid-gap: 16px;
    }

    &__menu-list-buttons {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
