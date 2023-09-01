<template>
    <div class="menu-list">
        <div
            class="menu-list__content"
        >
            <div
                v-for="section in menuList"
                :key="section.id"
                class="menu-list__chapter"
            >
                <div
                    class="menu-list__section-name"
                    :style="{background: `url('${backgroundUrl}')`}"
                >
                    {{ section.type.toUpperCase() }}
                </div>
                <Transition name="fade">
                    <div
                        :key="'section' + section.id"
                    >
                        <div
                            v-for="dish in section.set"
                            :key="dish.id"
                            class="menu-list__dish"
                        >
                            <div
                                :key="keyItemCart"
                                class="menu-list__block"
                            >
                                <div class="menu-list__block-left">
                                    <div class="menu-list__block-top">
                                        <div class="menu-list__dish-title">
                                            {{ dish.title.toUpperCase() }}
                                        </div>
                                        <div
                                            v-if="!!dish.weight"
                                            class="menu-list__dish-weights"
                                        >
                                            <div
                                                v-for="(itemWeight, idxW) in dish.weight"
                                                :key="idxW"
                                                class="menu-list__dish-weight"
                                            >
                                                <div
                                                    class="menu-list__dish-weight-title"
                                                    :class="{'menu-list__dish-weight-title_active': (itemInCart[section.id]?.[dish.id]?.[0] > 0) && (itemInCart[section.id]?.[dish.id]?.[1] === idxW)}"
                                                >
                                                    {{ itemWeight }}{{ section.dimension }}
                                                </div>
                                                <span v-if="idxW + 1 < dish.weight.length">/</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="menu-list__block-bottom">
                                        <div
                                            v-if="!!dish.description"
                                            class="menu-list__dish-description"
                                        >
                                            {{ dish.description }}
                                        </div>
                                    </div>
                                </div>
                                <div class="menu-list__block-right">
                                    <div class="menu-list__dish-prices">
                                        <div
                                            v-for="(itemPrice, idxP) in dish.price"
                                            :key="idxP"
                                            class="menu-list__dish-price"
                                        >
                                            <div
                                                class="menu-list__dish-price-title"
                                                :class="{'menu-list__dish-price-title_active': (itemInCart[section.id]?.[dish.id]?.[0] > 0) && (itemInCart[section.id]?.[dish.id]?.[1] === idxP),
                        'menu-list__dish-price-title_cursor': (itemInCart[section.id]?.[dish.id]?.[0] > 0) && (itemInCart[section.id]?.[dish.id]?.[1] !== idxP)}"
                                                @click="changeItemInCart(section.id, dish.id, 0, idxP)"
                                            >
                                                {{ itemPrice }}{{ content.menu.currency }}
                                            </div>
                                            <span v-if="idxP + 1 < dish.weight.length">/</span>
                                        </div>
                                    </div>
                                    <Transition name="fade">
                                        <ChangeCart
                                            v-if="isShowChangeCart"
                                            :item-in-cart="itemInCart"
                                            :dish="dish"
                                            :section="section"
                                            :name-file-menu="nameFileMenu"
                                            :menu-list="menuList"
                                        />
                                        <!--                                        <div v-if="isShowChangeCart"-->
                                        <!--                                             class="menu-list__change-cart-wrapper"-->
                                        <!--                                        >-->
                                        <!--                                            <img-->
                                        <!--                                                class="menu-list__change-cart-img"-->
                                        <!--                                                :class="{'menu-list__change-cart-img_disable': itemInCart[section.id][dish.id][0] === MIN_ITEM_IN_CART}"-->
                                        <!--                                                src="/image/icon/decrease.svg"-->
                                        <!--                                                alt="-"-->
                                        <!--                                                title="-"-->
                                        <!--                                                @click="changeItemInCart(section.id, dish.id, -1, itemInCart[section.id][dish.id][1])"-->
                                        <!--                                            >-->
                                        <!--                                            <div class="menu-list__change-cart-input">-->
                                        <!--                                                {{ itemInCart[section.id][dish.id][0] }}-->
                                        <!--                                            </div>-->
                                        <!--                                            <img-->
                                        <!--                                                class="menu-list__change-cart-img"-->
                                        <!--                                                :class="{'menu-list__change-cart-img_disable': itemInCart[section.id][dish.id][0] === MAX_ITEM_IN_CART}"-->
                                        <!--                                                src="/image/icon/increase.svg"-->
                                        <!--                                                alt="+"-->
                                        <!--                                                title="+"-->
                                        <!--                                                @click="changeItemInCart(section.id, dish.id, +1, itemInCart[section.id][dish.id][1])"-->
                                        <!--                                            >-->
                                        <!--                                        </div>-->
                                    </Transition>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script>
import contentJson from '/src/api/json/content.json'
import {useCartStore} from '~/stores/cart'


export default defineNuxtComponent({
    name: 'MenuList',
    props: {
        menuList: {
            type: Array,
            required: true,
            default() {
                return []
            }
        },
        backgroundUrl: {
            type: String,
            required: true,
            default() {
                return ''
            }
        },
        nameFileMenu: {
            type: String,
            required: true,
            default() {
                return ''
            }
        },
    },
    data() {
        return {
            store: useCartStore(),
            content: contentJson,
            isShowChangeCart: true,
            itemInCart: {},
            keyItemCart: 5555,
            MAX_ITEM_IN_CART: 9,
            MIN_ITEM_IN_CART: 0,
        }
    },
    mounted() {
        this.isShowChangeCart = this.store.isShowCart
    }
})
</script>

<style lang="scss">
.menu-list {
    flex: 1 0 auto;
    height: 100%;

    &__content {
        min-height: 100%;
        margin: 0 10px 32px 10px;
        width: calc(100% - 20px);
    }

    &__chapter {
        padding-top: 10px;
    }

    &__chapter:last-child {
        padding-bottom: 10px;
    }

    &__section-name {
        padding: 6px 0;
        margin: 0 auto;
        position: sticky;
        top: calc($height-header-navbar-mobile - 1px);
        @media screen and (min-width: $width-mobile) {
            top: calc($height-header-navbar-desktop - 1px);
        }
        text-decoration: underline;
        font-weight: bold;
        letter-spacing: 0.05rem;
        text-align: center;
        z-index: 1;
    }

    &__dish {
        max-width: 660px;
        margin: 16px auto;
    }

    &__dish-title {
        color: $brown;
        font-size: 16px;
        font-weight: bold;
        margin-right: 6px;
    }

    &__dish-weights {
        display: flex;
        flex-direction: row;
    }

    &__dish-weight {
        display: flex;
        flex-direction: row;
        color: $black;
        font-size: 10px;
        font-weight: normal;
        white-space: nowrap;

        span {
            margin: 0 2px;
        }
    }

    &__dish-weight-title {
        border-bottom: solid 1px rgba($brown, 0);

        &_active {
            border-bottom: solid 1px rgba($brown, 1);
        }
    }

    &__block-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-wrap: nowrap;
        margin-left: auto;
        @media screen and (min-width: $width-tablet) {
            flex-direction: row;
            align-items: center;
        }
    }

    &__block-left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: nowrap;
    }

    &__dish-prices {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: 16px;
        margin-bottom: 2px;
        padding-right: 6px;
        @media screen and (min-width: $width-tablet) {
            padding-right: 0;
        }
    }

    &__dish-price {
        display: flex;
        flex-direction: row;
        white-space: nowrap;

        span {
            margin: 0 2px;
        }
    }

    &__dish-price-title {
        border-bottom: solid 1px rgba($brown, 0);

        &_active {
            border-bottom: solid 1px rgba($brown, 1);
        }

        &_cursor:hover {
            cursor: pointer;
        }
    }

    &__dish-description {
        font-size: 10px;
        letter-spacing: 0.05rem;
    }

    &__block {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-start;

    }

    &__block-top {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        flex-grow: 1;
        padding-right: 0;
        @media screen and (min-width: $width-mobile) {
            padding-right: 30px;
            flex-direction: row;
            align-items: flex-end;
        }
    }

    &__block-bottom {
        display: flex;
        flex-direction: row;
        justify-content: flex-start
    }
}
</style>
