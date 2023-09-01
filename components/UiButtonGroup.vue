<template>
    <div
        class="ui-button-group"
    >
        <slot/>
    </div>

</template>

<script setup>
const props = defineProps({
    direction: {
        type: String,
        required: false,
        default: 'row'
    },
})
const directionBine = computed(() => {
    return props.direction
})
</script>

<style scoped lang="scss">
.ui-button-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-direction: v-bind(directionBine);
}

</style>
