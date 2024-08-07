<template>
    <div
        class="navbar"
    >
        <div
            v-if="isShowPageup"
            class="navbar__panel navbar__panel_copy"
        />
        <div
            :class="{'navbar__scroll-down': isShowPageup}"
            class="navbar__panel"
        >
            <div
                ref="buttonsNavbar"
                class="navbar__buttons"
            >
                <div
                    v-for="button in buttonsDataNavbar"
                    ref="setButtonsRef"
                    :key="button.id"
                    class="navbar__wrapper-button"
                >
                    <nuxt-link
                        class="navbar__link navbar__link_indent"
                        :to="button.page"
                        exact-active-class="navbar__link_active-page"
                    >
                        {{ button.name }}
                    </nuxt-link>
                </div>
                <div
                    ref="cartInNavbar"
                    class="navbar__wrapper-button"
                    v-if="isShowCart"
                >
                    <nuxt-link
                        to="/cart"
                        class="navbar__link navbar__link_indent navbar__link_cart"
                        exact-active-class="navbar__link_active-page navbar__link_cart-active"
                    >
                        <div class="navbar__link-title-cart">
                            Корзина
                        </div>
                    </nuxt-link>
                </div>

                <Dropdown
                    v-if="isShowDropdownMenu"
                    ref="dropdownMenu"
                    key="dropdown"
                    class="navbar__dropdown"
                    :buttons="buttonsDataDropdown"
                    :scroll-down="isShowPageup"
                />
            </div>
        </div>
        <div
            class="navbar__pageup"
            :class="{'navbar__pageup_inactive': !isShowPageup}"
            @click="pageup(0)"
        >
            <img
                src="/image/icon/pageup.svg"
                alt="Вверх"
                title="Вверх"
            >
        </div>
    </div>
</template>

<script>
import buttonsData from '~/src/api/json/buttons-menu.json'
import Dropdown from '@/components/Dropdown';
import {useCartStore} from '~/stores/cart'

const RESERVE_MARGIN = 8
export default {
    name: 'TheNavbar',
    Components: {Dropdown},
    data() {
        return {
            store: useCartStore(),
            widthNavbar: 0,
            buttonsDataNavbar: [],
            buttonsDataDropdown: [],
            widthButtons: [],
            isShowDropdownMenu: true,
            isShowPageup: false,
        }
    },
    computed: {
        isShowCart() {
            return this.store.isShowCart
        }
    },
    mounted() {
        this.addButtonsInArrForNavbar()
        this.$nextTick(() => {
            this.capacityCheck()
            window.addEventListener('resize', this.capacityCheck)
            window.addEventListener('scroll', this.addButtonPageUp)
        })
    },
    methods: {
        addButtonsInArrForNavbar() {
            this.buttonsDataNavbar = [...buttonsData]
            this.buttonsDataDropdown = []
        },
        capacityCheck() {
            this.addButtonsInArrForNavbar()
            this.widthNavbar = this.$refs.buttonsNavbar?.offsetWidth || 0
            if (!this.widthNavbar) {
                return
            }
            let sumWidthButtons = RESERVE_MARGIN + (this.$refs.cartInNavbar?.offsetWidth || 0) + (Math.ceil(this.$refs.dropdownMenu?.$el.clientWidth) || 0)
            this.buttonsDataNavbar.forEach((button, i) => {
                if (this.$refs.setButtonsRef[i]) {
                    this.widthButtons[i] = this.$refs.setButtonsRef[i]?.offsetWidth || 0
                }
                sumWidthButtons += this.widthButtons[i]
            })
            const buttonsDataTemp = [...this.buttonsDataNavbar]
            buttonsDataTemp.reverse().forEach((button, i) => {
                if (this.widthNavbar < sumWidthButtons) {
                    sumWidthButtons -= this.widthButtons[i]
                    this.buttonsDataDropdown.push(button)
                    this.buttonsDataNavbar.pop()
                }
            })
            this.isShowDropdownMenu = !!this.buttonsDataDropdown.length
        },

        addButtonPageUp() {
            const HEIGHT = ((this.$parent.$refs.header?.clientHeight || 0) - (this.$refs.buttonsNavbar?.clientHeight || 0))
            this.isShowPageup = HEIGHT < window.scrollY
        },
        pageup(top) {
            window.scrollTo({
                top: top,
                behavior: "smooth",
            })
        },
    }
}
</script>

<style lang="scss">
.navbar {
    width: 100%;
    //min-width: $width-minimal;
    height: 100%;

    &__panel {
        height: $height-header-navbar-mobile;
        @media screen and (min-width: $width-mobile) {
            height: $height-header-navbar-desktop;
        }
    }

    &__wrapper-button {
        height: 90%;
    }

    &__buttons {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }

    &__link {
        display: flex;
        flex-direction: row;
        align-items: center;
        text-decoration: none;
        height: 100%;
        white-space: nowrap;
        color: $white;

        &_indent {
            padding: 0 12px;
            border-bottom: 2px solid rgba(255, 255, 255, 0);

            &:hover {
                color: $brown;
                border-bottom: 2px solid $brown;
                cursor: pointer;
            }
        }

        &_active-page {
            color: $brown;
        }

        &_cart {
            height: 100%;
            background-repeat: no-repeat;
            background-size: 36px 30px;
            background-position: center right;

            //background-image: url("/image/icon/food-cart.svg");
            //padding-right: 40px;
            &:hover, &-active {
                //background-image: url("/image/icon/food-cart-active.svg");
            }
        }
    }

    &__pageup {
        position: fixed;
        bottom: 50px;
        right: 40px;
        //animation: pageup 1s;
        opacity: 1;
        transition: opacity .3s ease-in-out;


        img {
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            border-radius: 18px;
            width: 32px;
            height: 32px;
            @media screen and (min-width: $width-tablet) {
                border-radius: 32px;
                width: 64px;
                height: 64px;
            }

        }

        &:hover {
            cursor: pointer;
            img {
                height: 36px;
                @media screen and (min-width: $width-tablet) {
                    height: 70px;
                }
            }
        }
        &_inactive {
            opacity: 0;
        }
    }

    &__scroll-down {
        position: fixed;
        margin: 0 auto;
        top: 0;
        width: 100%;
        transform: translateX(-50%);
        left: 50%;
        z-index: 1000;

        @media screen and (max-width: $width-minimal) {
            left: calc($width-minimal / 2);
            width: $width-minimal;
        }
        background-color: rgba($black, 1);
    }
}

@keyframes pageup {
    from {
        opacity: 0;
        visibility: visible;

    }
    to {
        opacity: 1;
        visibility: visible;

    }
}
</style>
