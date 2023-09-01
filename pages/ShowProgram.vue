<template>
    <div class="show-program">
        <div class="show-program__wrapper">
            <div class="show-program__left-top-block"/>
            <client-only>
                <TransitionGroup name="slide-fade">
                    <div v-if="isLoading" class="show-program__right-top-block">
                       <UiTitle key="keyTitle" tone="light">
                           {{ content.title }}
                       </UiTitle>
                        <UiTitle
                            class="show-program__description"
                            v-for="(text, idx) in content.description"
                            :key="idx"
                            tone="light"
                        >
                            {{ text }}
                        </UiTitle>
                    </div>
                </TransitionGroup>
            </client-only>
            <div class="show-program__bottom-block">
                <Transition name="slide-fade">
                    <div
                        class="show-program__container-wrapper"
                        v-if="isLoading"
                    >
                        <div
                            v-for="picture in images"
                            :key="picture.id"
                            class="show-program__picture-container"
                        >
                            <UiPicture
                                :picture="picture"
                                :cropSize="true"
                                @click="openModalImage(picture.id)"
                            />
                        </div>
                    </div>

                </Transition>
            </div>
            <ModalImage
                :array-src-images="images"
                v-model:isActiveModal="isActiveModal"
                v-model:indexImageActive="indexImageActive"
            />
        </div>
    </div>
</template>

<script setup>
import content from '/src/api/json/content-showProgram.json';

const ARRAY_LENGTH_GALLERY = 20;
const isActiveModal = ref(false);
const isLoading = ref(false);
const indexImageActive = ref(0);
const images = ref([...Array(ARRAY_LENGTH_GALLERY).keys()]);
(() => {
    images.value = images.value.map(i => {
        return {
            ...i,
            src: `/image/gallery-show/${i}.jpg`,
            srcAvif: `/image/gallery-show/${i}.avif`,
            srcMini: `/image/gallery-show/${i}-mini.jpg`,
            srcMiniAvif: `/image/gallery-show/${i}-mini.avif`,
            id: i,
        }
    })

})();
const openModalImage = (indexImg) => {
    indexImageActive.value = indexImg
    isActiveModal.value = true
};
onMounted(async () => {
    await nextTick()
    isLoading.value = true
});
</script>

<style lang="scss">
.show-program {
    margin-top: 0;
    width: 100%;
    height: auto;
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url("/image/background/background-show-program.jpg") 20% 20%;
    background-size: cover;
    transition: height 0.75s ease-in;
    @media screen and (min-width: $width-mobile) {
        background-position: 35% 20%;
    }

    &__wrapper {
        height: 100%;
        padding: 22px;
        display: grid;
        grid-template-columns: 0 1fr;
        grid-template-rows: repeat(2, auto);
        grid-column-gap: 0;
        grid-row-gap: 0;
        @media screen and (min-width: $width-tablet) {
            padding: 44px;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, auto);
        }
    }

    &__left-top-block {
        grid-area: 1 / 1 / 2 / 2;
    }

    &__right-top-block {
        grid-area: 1 / 2 / 2 / 3;
    }

    &__bottom-block {
        grid-area: 2 / 1 / 3 / 3;
        width: 100%;
        height: auto;
        padding: 44px 0;
    }

    &__description {
        margin-top: 6px;

    }

    &__container-wrapper {
        width: 100%;
        height: auto;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    }

    &__picture-container {
        display: flex;
        justify-content: center;
        margin: 12px 0;
        width: 25vw;
        height: 20vw;
        @media screen and (min-width: $width-mobile) {
            width: 40vw;
            height: 25vw;
        }
        @media screen and (min-width: $width-tablet) {
            width: 20vw;
            height: 10vw;
        }

    }

}
</style>
