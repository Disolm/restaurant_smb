<template>
    <div
        class="ui-picture"
        :class="{'ui-picture_loaded': loading}"
    >
        <picture>
            <source
                v-if="picture.srcAvif"
                media="(min-width:768px)"
                :srcset="picture.srcAvif"
                type="image/avif"
            >
            <source
                v-if="picture.src"
                media="(min-width:768px)"
                :srcset="picture.src"
                type="image/jpg"
            >
            <source
                v-if="picture.srcMiniAvif"
                :srcset="picture.srcMiniAvif"
                type="image/avif"
            >
            <source
                v-if="picture.srcMini"
                :srcset="picture.srcMini"
                type="image/jpg"
            >
            <img
                :src="picture.src"
                alt="Sa'MegoBro"
                class="ui-picture__img"
                :class="{'ui-picture__img_crop-size': cropSize}"
                @load="onImgLoad"
            >
        </picture>
    </div>
</template>

<script setup>
const props = defineProps({
    picture: {
        type: Object,
        required: true,
    },
    cropSize: {
        type: Boolean,
        required: false,
        default: false
    }
})
const loading = ref(false);
const onImgLoad = () => {
    return loading.value = false
}

</script>

<style scoped lang="scss">
.ui-picture {
    --border-radius: 6px;
    border-radius: var(--border-radius);
    -webkit-filter: sepia(0);
    filter: sepia(0);
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
    overflow: hidden;

    opacity: 0;
    animation: ani 2.5s forwards;
    @keyframes ani {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    &:hover {
        cursor: pointer;
        -webkit-filter: sepia(100%);
        filter: sepia(100%);
    }

    &__img {
        border-radius: var(--border-radius);
        display: block;
        object-fit: cover;
        width: 100%;
        &_crop-size {
            height: var(--min-size-img);
            @media screen and (min-width: $width-mobile) {
                height: var(--max-size-img);
            }
        }

    }
    &_loaded {
        height: 50px;
        width: 50px;
        background: linear-gradient(rgba($turquoise, 0.1), rgba($turquoise, 0.5)), url("/image/loading-gif.gif") no-repeat center;
        background-size: 15%;
    }
}


</style>