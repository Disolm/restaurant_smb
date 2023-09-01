<template>
    <component
        :is="tag"
        class="ui-button"
        :class="[classForButton, {'ui-button_block': block}]"
        :[type]="'button'"
    >
        <slot/>
    </component>
</template>

<script setup>
const props = defineProps({
    tag: {
        type: String,
        required: false,
        default: 'button'
    },
    tone: {
        type: String,
        required: false,
        validator(value) {
            return ['light', 'dark'].includes(value)
        },
        default: 'light'
    },
    block: {
        type: Boolean,
        required: false,
        default: false
    }
})
const classForButton = computed(() => {
    return `ui-button_${props.tone}`
})
const type = computed(() => {
    return props.tag === 'button' ? 'type' : null
})
</script>

<style scoped lang="scss">
.ui-button {
    min-height: 0;
    white-space: nowrap;
    border-radius: 8px;
    padding: 10px;
    letter-spacing: 0.8px;
    font-size: 12px;
    @media screen and (min-width: $width-mobile) {
        font-size: 14px;
    }

    &:active {
        -webkit-animation: flash 1.5s;
        animation: flash 1.5s;
    }

    &_light {
        border: 1px solid $turquoise;
        color: $turquoise;
        background-color: rgba($brown, 0.2);

        &:hover {
            border: 1px solid $brown;
        }

        &:active {
            color: $brown;
        }
    }

    &_dark {
        border: 1px solid $brown;
        color: $brown;
        background-color: rgba($turquoise, 0.2);

        &:hover {
            border: 1px solid $turquoise;
        }

        &:active {
            color: $turquoise;
        }
    }
}
</style>