<template>
    <img class="icon" :alt="icon" :src="iconSrc"/>
</template>

<script setup>
import ArrowLeft from '@/src/image/icon/arrow-left.svg';
import Decrease from '@/src/image/icon/decrease.svg';
import Increase from '@/src/image/icon/increase.svg';
import Close from '@/src/image/icon/close.svg';

const icons = {
    'arrow-left': ArrowLeft,
    'decrease': Decrease,
    'increase': Increase,
    'close': Close,
};

const props = defineProps({
    icon: {
        type: String,
        required: true,
        // validator: (key) => Object.keys(icons).includes(key)
    },
})
const iconSrc = computed(() => {
    return icons[props.icon]
})
</script>

<style scoped>
.icon {
    display: block;
}
</style>
