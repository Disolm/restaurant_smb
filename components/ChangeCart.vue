<template>
    <div class="change-cart">
        <template v-if="createCompleted">
            <UiIcon
                icon="decrease"
                class="change-cart__icon"
                :class="{'change-cart__icon_disable': itemInCart[section.id][dish.id][0] === MIN_ITEM_IN_CART}"
                @click="changeItemInCart(section.id, dish.id, -1, itemInCart[section.id][dish.id][1])"
            />
            <div class="change-cart__input">
                {{ itemInCart[section.id][dish.id][0] }}
            </div>
            <UiIcon
                icon="increase"
                class="change-cart__icon"
                :class="{'change-cart__icon_disable': itemInCart[section.id][dish.id][0] === MAX_ITEM_IN_CART}"
                @click="changeItemInCart(section.id, dish.id, +1, itemInCart[section.id][dish.id][1])"
            />
        </template>
    </div>
</template>

<script setup>
const MAX_ITEM_IN_CART = 9
const MIN_ITEM_IN_CART = 0

const props = defineProps({
    section: {
        type: Object,
        required: true
    },
    dish: {
        type: Object,
        required: true
    },
    nameFileMenu: {
        type: String,
        required: true
    },
    menuList: {
        type: Array,
        required: true
    }
})
const itemInCart = ref({})
const createCompleted = ref(false)

const changeItemInCart = (section, dish, operator, choice) => {
    const quantityOld = itemInCart.value[section][dish][0]
    itemInCart.value[section][dish][1] = choice
    if (operator === 1 && quantityOld < MAX_ITEM_IN_CART) {
        itemInCart.value[section][dish][0] += 1
    } else if (operator === -1 && quantityOld > MIN_ITEM_IN_CART) {
        itemInCart.value[section][dish][0] -= 1
    } else {
        return
    }
    const quantityNew = itemInCart.value[section][dish][0]
    saveCats(props.nameFileMenu, section, dish, quantityNew, choice)
}

const createItemInCart = () => {
    props.menuList.forEach(item => {
        itemInCart.value[item.id] = {}
        item.set.forEach(lot => {
            const cartStorage = JSON.parse(localStorage.getItem('cart'));
            if (cartStorage?.[props.nameFileMenu]?.[item.id]?.[lot.id]) {
                const quantity = cartStorage[props.nameFileMenu][item.id][lot.id][0]
                const choice = cartStorage[props.nameFileMenu][item.id][lot.id][1]
                itemInCart.value[item.id][lot.id] = [quantity, choice]
            } else {
                itemInCart.value[item.id][lot.id] = [0, 0]
            }
        })
    })
    createCompleted.value = true

}
const saveCats = (namePage, section, dish, quantity, choice) => {
    let cartStorage = {}
    if (localStorage.getItem('cart')) {
        cartStorage = JSON.parse(localStorage.getItem('cart'))
    }
    if (cartStorage[namePage]) {
        if (cartStorage[namePage][section]) {
            cartStorage[namePage][section] = Object.assign(cartStorage[namePage][section], {
                [dish]: [quantity, choice]
            })
        } else {
            cartStorage[namePage] = Object.assign(cartStorage[namePage], {
                [section]: {
                    [dish]: [quantity, choice],
                }
            })
        }
    } else {
        cartStorage = Object.assign(cartStorage, {
            [namePage]: {
                [section]: {
                    [dish]: [quantity, choice],
                }
            }
        })
    }
    if (quantity === 0) {
        delete cartStorage[namePage][section][dish]
        const objSection = cartStorage[namePage][section]
        if (JSON.stringify(objSection) === '{}') {
            delete cartStorage[namePage][section]
        }
        const objNamePage = cartStorage[namePage]
        if (JSON.stringify(objNamePage) === '{}') {
            delete cartStorage[namePage]
        }
    }
    localStorage.removeItem('cart')
    const parsed = JSON.stringify(cartStorage);
    if (parsed !== '{}') {
        localStorage.setItem('cart', parsed);
    }
}
onMounted(async () => {
    await nextTick()
    createItemInCart()
});
</script>

<style scoped lang="scss">
.change-cart {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 8px;

    &__icon {
        width: 18px;
        height: 18px;

        &_disable {
            opacity: 0.3;
        }

        &:hover {
            cursor: pointer;
            border-radius: 9px;
            box-shadow: 0 0 0 1px rgba($black, 0.2);
        }
    }
    &__input {
        width: 16px;
        text-align: center;
        font-size: 16px;
        margin: 0 4px;
        border: solid 1px $brown;
        border-radius: 2px;
        background-color: $white;
    }
}
</style>
