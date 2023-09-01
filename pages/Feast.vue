<template>
    <div class="feast">
        <div class="feast__wrapper">
            <div class="feast__grid">
                <client-only>
                    <TransitionGroup name="slide-fade" tag="div" class="feast__titles">
                        <template v-if="isLoadingFeast">
                            <UiTitle
                                class="feast__title"
                                tone="light"
                                key="titleKey"
                            >
                                {{ content.title }}
                            </UiTitle>
                            <UiTitle
                                v-for="title in content.descriptions"
                                tone="light"
                                :key="title"
                                class="feast__description"
                            >
                                {{ title }}
                            </UiTitle>
                        </template>
                    </TransitionGroup>
                </client-only>
                <Transition name="slide-fade">
                    <div
                        v-if="isLoadingFeast"
                        class="feast__buttons"
                    >
                        <UiLink
                            tag="a"
                            v-for="button in content.buttons"
                            :key="button.id"
                            :href="button.href"
                        >
                            <UiButton>
                                {{ button.title }}
                            </UiButton>
                        </UiLink>
                    </div>
                </Transition>
            </div>
            <div class="feast__void"/>
        </div>
    </div>
</template>

<script setup>
import content from '/src/api/json/content-feast.json'
// const baseUrl = process.dev ? 'http://192.168.242.10:3000/' : 'https://samegobro.ru/'
const isLoadingFeast = ref(false)
// const {data: content} = await useAsyncData('content-feast',
//     () => $fetch(`${baseUrl}api/json/content-feast.json`))
// const title = content.value.titleMain
// useHead({
//     title: content.value.titleMain,
// })
onMounted(async () => {
    await nextTick()
    isLoadingFeast.value = true
});
</script>

<style lang="scss">
.feast {
    margin-top: 0;
    width: 100%;
    height: auto;
    background: linear-gradient(rgba(166, 113, 69, 0.3), rgba(0, 0, 0, 0.6)), url("/image/background/background-feast.jpg") no-repeat center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;

    &__wrapper {
        width: 100%;
        padding: 22px 12px $height-footer 12px;
        flex: 1 0 auto;
        background-color: rgba($black, 0.4);
        @media screen and (min-width: $width-tablet) {
            padding: 42px 12px $height-footer 12px;
        }
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(1, auto);
        grid-template-rows: repeat(2, auto);
        @media screen and (min-width: $width-tablet) {
            grid-template-columns: 0.5fr 1fr;
            padding: 42px 12px 0 12px;
        }
    }

    &__titles {
        grid-area: 1 / 2 / 2 / 3;
    }

    &__title {
        margin-bottom: 32px;
    }
    &__description {
        text-indent: 1.5em;
        margin-bottom: 2px;
    }

    &__buttons {
        width: 100%;
        height: 100%;
        margin: 16px auto;
        grid-area: 2 / 2 / 3 / 3;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-evenly;
    }

    &__void {
        grid-area: 1 / 1 / 3 / 2;
    }
}

</style>
