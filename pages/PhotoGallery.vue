<template>
    <div class="photo-gallery">
        <div class="photo-gallery__wrapper">
            <Transition name="slide-fade">
                <div
                    v-if="isLoadingButtons"
                    class="photo-gallery__photo-menu"
                    key="keyPhotoMenu"
                >
                    <div class="photo-gallery__title">
                        {{ content.photoGallery.title.toUpperCase() }}
                    </div>
                    <div class="photo-gallery__buttons">
                        <UiButton
                            v-for="btn in content.photoGallery.buttons"
                            :key="btn.id"
                            tone="dark"
                            @click="getPictures(btn.type, 'click')"
                        >
                            {{ btn.title }}
                        </UiButton>
                    </div>
                </div>
            </Transition>
            <div
                class="photo-gallery__pictures"
                v-if="showItems"
            >
                <UiPicture
                    v-for="picture in images"
                    :key="picture.id"
                    :picture="picture"
                    :cropSize="true"
                    @click="openModalImage(picture.id)"
                    v-show="picture.isShow"
                    class="photo-gallery__picture"
                />
            </div>
        </div>
            <ModalImage
                :array-src-images="images"
                v-model:isActiveModal = "isActiveModal"
                v-model:indexImageActive="indexImageActive"
            />
    </div>
</template>

<script setup>
import {klona} from 'klona/json'
import content from '/src/api/json/content.json'
import UiPicture from '~/components/UiPicture.vue';

const ARRAY_LENGTH_GALLERY_FOOD = 33
const ARRAY_LENGTH_GALLERY_ROOM = 24
const ARRAY_LENGTH_GALLERY_SHOW = 20

const isLoadingButtons = ref(false)
const isActiveModal = ref(false)
const showItems = ref(false)
const indexImageActive = ref(0)
const images = ref([])
const getPictures = async (typeImg, typeLoading) => {
    if (process.server) {
        return
    }
    images.value = []
    if (typeImg === 'show' || typeImg === 'all') {
        addedInArray('show', ARRAY_LENGTH_GALLERY_SHOW)
    }
    if (typeImg === 'room' || typeImg === 'all') {
        addedInArray('room', ARRAY_LENGTH_GALLERY_ROOM)
    }
    if (typeImg === 'food' || typeImg === 'all') {
        addedInArray('food', ARRAY_LENGTH_GALLERY_FOOD)
    }
    shuffleArr(images.value)
    idInOrder(images.value)

    if (typeLoading === 'click') {
        await nextTick()
        showItems.value = true
    }
}
const addedInArray = (type, length) => {
    images.value = images.value.concat([...Array(length).keys()].map((pic, i) => {
        return {
            src: `/image/gallery-${type}/${i}.jpg`,
            srcAvif: `/image/gallery-${type}/${i}.avif`,
            srcMini: `/image/gallery-${type}/${i}-mini.jpg`,
            srcMiniAvif: `/image/gallery-${type}/${i}-mini.avif`,
            id: type + i,
            isShow: false
        }
    }))
}
const openModalImage = (indexImg) => {
    indexImageActive.value = indexImg
    isActiveModal.value = true
}

const shuffleArr = (array) => {
    array.forEach((_,i) =>{
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [klona(array[j]), klona(array[i])];
    })
}
const idInOrder = (array) => {
    array.forEach((item, idx) => {
        item.id = idx
        setTimeout(() => {
            item.isShow = true
        }, 100 * idx)
    })
}

onMounted(async () => {
    await nextTick()
    showItems.value = true
    isLoadingButtons.value = true
});
getPictures('all', 'server')
</script>

<style lang="scss" scoped>

.photo-gallery {

    margin-top: 0;
    width: 100%;
    height: auto;
    background: linear-gradient(rgba(125, 125, 0, 0.1), rgba(0, 0, 0, 0.2)), url("/image/background/background-gallery.png"), rgba(226, 223, 214, 1);
    background-size: 25%;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;

    &__wrapper {
        width: calc(100% - 24px);
        margin: 42px 0;
        padding: 0 12px;
        @media screen and (min-width: $width-desktop) {
            width: calc(100% - 60px);
            padding: 0 30px;
        }
    }

    &__title {
        margin-bottom: 26px;
        font-size: 20px;
        letter-spacing: 2px;
        font-weight: 600;
    }

    &__photo-menu {
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        flex-wrap: nowrap;
        margin-bottom: 42px;
    }

    &__buttons {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        grid-gap: 12px;
    }


    &__pictures {
        width: 100%;
        display: grid;
        grid-auto-flow: dense;
        grid-gap: 6px;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-auto-rows: minmax(var(--min-size-img), auto);
        @media screen and (min-width: $width-mobile) {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-auto-rows: minmax(var(--max-size-img), auto);
            grid-gap: 18px;
        }
    }
    //&__picture {
    //    width: 80vw;
    //    height: 80vw;
    //    @media screen and (min-width: $width-mobile) {
    //        width: 38vw;
    //        height: 38vw;
    //    }
    //    @media screen and (min-width: $width-tablet) {
    //        width: 28vw;
    //        height: 28vw;
    //    }
    //    &_inactive:hover {
    //        cursor: default;
    //    }
    //}
}
</style>
