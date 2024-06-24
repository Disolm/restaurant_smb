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
  justifyContent: {
        type: String,
        required: false,
        default: 'space-evenly'
    },
})
const directionBine = computed(() => {
    return props.direction
})
const justifyContentBine = computed(() => {
    return props.justifyContent
})
</script>

<style scoped lang="scss">
.ui-button-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: v-bind(justifyContentBine);
    flex-direction: v-bind(directionBine);
}

</style>
