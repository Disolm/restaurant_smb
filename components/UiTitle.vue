<template>
    <div
        class="ui-title"
        :class="[classForButton, {'ui-title_decor': decor}]"
    >
        <slot/>
    </div>

</template>

<script setup>
const props = defineProps({
    tone: {
        type: String,
        required: false,
        validator(value) {
            return ['light', 'dark'].includes(value)
        },
        default: 'light'
    },
    decor: {
        type: Boolean,
        required: false,
        default: true
    },
})
const classForButton = computed(() => {
    return `ui-title_${props.tone}`
})
</script>

<style scoped lang="scss">
.ui-title {
    letter-spacing: 0.8px;
    font-weight: 400;
    padding: 0 16px;
    font-size: 14px;
    line-height: 18px;
    @media screen and (min-width: $width-mobile) {
        font-size: 16px;
        line-height: 24px;
        padding: 0 24px;
    }
    &_light {
        color: $white;
    }

    &_dark {
        color: $black
    }
    &_decor {
        background: rgba($black, 0.2);
        box-shadow: 0 0 50px rgba($black, 0.5);
        border-radius: 32px;
    }
}



</style>
