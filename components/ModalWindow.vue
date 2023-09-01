<template>
    <div class="modal-window">
        <div class="modal-window__overlay">

            <div
                class="modal-window__content-wrapper"
                v-clickOutside="closedReserveTable"
            >
                <div
                    class="modal-window__close"
                    @click="closedReserveTable"
                >
                    <UiIcon
                        icon="close"
                    />
                </div>
                <div
                    class="modal-window__content"
                >
                    <UiTitle>
                        <h3 class="modal-window__title">
                            {{ content.index.reserveTable.title }}
                        </h3>
                    </UiTitle>
                    <UiTitle>
                        <h5 class="modal-window__description">
                            {{ content.index.reserveTable.content }}
                        </h5>
                    </UiTitle>
                    <UiLink
                        tag="a"
                        :href="content.index.phoneHref"
                    >
                        <UiButton>
                            {{ content.index.phone }}
                        </UiButton>
                    </UiLink>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    content: {
        type: Object
    }
})
const emits = defineEmits([
    'isShowReserveTable'
])
const closedReserveTable = () => {
    emits('isShowReserveTable', false)
}
</script>

<style lang="scss" scoped>
.modal-window {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5000;
    user-select: none;
    touch-action: pan-y;

    &__close {
        position: relative;
        top: 0;
        right: 0;
        display: inline;
        float: right;
        padding: 4px;
        //margin: -22px -32px 0 auto;
        border: 1px solid rgba(0, 0, 0, 0);

        &:hover, &:active {
            cursor: pointer;
            border-radius: 4px;
            border: 1px solid $turquoise;
        }

        img {
            filter: invert(100%);
            width: 38px;
            height: 38px;
            padding: 0;
            &:active {
                width: 36px;
                height: 36px;
                padding: 1px;
                margin: 1px;
            }
        }
    }
    &__title{
        border-bottom: 2px solid $turquoise;
    }
    &__description {
        text-indent: 1em;
        text-align: center;
    }
    &__overlay {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba($black, 0.8);
        &:active {
            background: rgba($black, 0.9);
        }
    }
    &__content-wrapper {
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        background: rgba(166, 113, 69, 0.5);
        color: $turquoise;
        letter-spacing: 0.8px;
        border: 1px solid $turquoise;
        max-width: 100vw;
        margin: $height-header-mobile auto;
        @media screen and (min-width: $width-tablet) {
            max-width: 530px;
            margin: $height-header-desktop auto;
        }
    }
    &__content {
        position: static;
        padding: 0 16px 22px;
        @media screen and (min-width: $width-tablet) {
            padding: 0 32px 42px;
        }

        display: inline-flex;
        flex-wrap: nowrap;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        grid-gap: 16px;
    }

}
</style>