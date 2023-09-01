<template>
    <div
        class="delivery"
    >
        <div class="delivery__wrapper">
            <Transition name="slide-fade">
                <template v-if="isLoading">
                    <div class="delivery__title" key="keyTitle">
                        {{ content.title }}
                    </div>
                </template>
            </Transition>
            <div class="delivery__buttons">
                <UiLink
                    v-for="button in content.buttons"
                    :key="button.id"
                    :href="button.href"
                    :target="button.target"
                    tag="a"
                    v-show="button.isShow"
                >
                    <UiButton
                        tone="light"
                    >
                        {{ button.title }}
                    </UiButton>
                </UiLink>
            </div>
            <div class="delivery__void"/>
        </div>
    </div>
</template>

<script setup>
import content from '/src/api/json/content-delivery.json'

const isLoading = ref(false)
onMounted(async () => {
    await nextTick()
    isLoading.value = true
});
</script>

<style lang="scss">
.delivery {
    margin-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    position: relative;
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("/image/background/background-delivery.jpg") no-repeat center;
    background-size: cover;

    &__wrapper {
        height: 100%;
        padding: 22px;
        display: grid;
        flex: 1 0 auto;
        background-color: rgba($black, 0.4);
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 1fr);
        @media screen and (min-width: $width-tablet) {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
        }
    }

    &__title {
        background: rgba($black, 0.2);
        box-shadow: 0 0 50px rgba($black, 0.5);
        border-radius: 32px;
        color: $white;
        letter-spacing: 1px;
        font-weight: 400;
        grid-area: 1 / 2 / 2 / 3;
        padding: 16px;
        margin: auto 0;
        font-size: 16px;
        line-height: 22px;
        @media screen and (min-width: $width-mobile) {
            line-height: 32px;
            padding: 24px;
        }
    }

    &__buttons {
        width: 100%;
        margin: 16px auto;
        grid-area: 2 / 2 / 3 / 3;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-evenly;
        align-content: flex-start;
    }

    &__void {
        grid-area: 1 / 1 / 3 / 2;
    }
}
</style>
