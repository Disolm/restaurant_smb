<template>
    <main>
        <div class="container">
            <TheHeader class="container__header"/>
            <NuxtPage class="container__nuxt"/>
            <TheFooter class="container__footer"/>
        </div>
    </main>
</template>
<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter'
import telegram_data from '/src/api/json/telegram-api.json'
const whoIs = async () => {
    const user = navigator
    const sms = user.userAgentData?.platform + ' ' + user.vendor + ' ' + user.userAgent
    const URL = `https://api.telegram.org/bot${telegram_data.token}/sendMessage?chat_id=${telegram_data['id-group-active']}&text=${sms}&parse_mode=html`
    await fetch(URL)
}

onMounted(async () => {
    await nextTick()
    // whoIs()
})
</script>
<style lang="scss">

main {
    height: calc(100% + $height-footer);
}
.container {
    display: flex;
    flex-direction: column;
    min-width: $width-minimal;
    min-height: 100%;
    font-family: Montserrat, Verdana, sans-serif;
    color: $black;
    background-color: $black;
    font-size: 14px;
    @media screen and (min-width: $width-mobile) {
        font-size: 16px;
    }
    a {
        text-decoration: none;
    }
    &__header{
        margin-bottom: calc($height-header-mobile * (-1));
        @media screen and (min-width: $width-mobile) {
            margin-bottom: calc($height-header-desktop * (-1));
        }
        z-index: 5;
    }
    &__nuxt {
        overflow-y: hidden;
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        padding-bottom: $height-footer;
        padding-top: $height-header-mobile;
        margin-top:  - $height-header-mobile;
        @media screen and (min-width: $width-mobile) {
            padding-top: $height-header-desktop;
            margin-top: - $height-header-desktop;
        }
    }
    &__footer {
        //z-index: 1;
        //flex-shrink: 0;
        margin-top: -$height-footer;
    }
}
.page-enter-active {
    transition: all .1s;
}
.page-leave-active {
    transition: all .4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1px);
}
</style>