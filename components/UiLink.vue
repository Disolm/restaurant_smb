<template>
    <component
        :is="tag"
        class="link"
    >
        <slot />
    </component>
</template>

<script setup>
const props = defineProps({
    tag: {
        type: String,
        required: false,
        default: 'router-link'
    }
})
</script>

<style scoped lang="scss">
.link {
    color: $black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
}
</style>