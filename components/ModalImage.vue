<template>
    <div id="modal-image" class="modal-image">
        <div
            class="modal-image__overlay"
            :class="classActiveModalOverlay"
        >
            <div
                class="modal-image__window"
                :class="classActiveModalWindow"
            >
                <div
                    @click="changeActiveIndexImg('back', 5)"
                    :class="{'modal-image__back_disable': disableButton}"
                    class="modal-image__back"
                >
                    <img src="/image/icon/arrow-left.svg" alt="back">
                </div>
                <div
                    class="modal-image__slider"
                    @pointerdown="disableButton = true"
                    @pointerup="disableButton = false"
                >
                    <client-only>
                        <div
                            ref="sliderRef"
                            @scroll="watchScrollAndChangeIndex($event)"
                            class="modal-image__slider-list"
                        >
                            <div
                                class="modal-image__track"
                                v-for="img in images"
                                :key="img.id"
                            >
                                <img
                                    class="modal-image__img"
                                    :src="img.src"
                                    :data-id="img.id"
                                    ref="images"
                                    alt=""
                                >
                            </div>
                        </div>
                    </client-only>
                </div>
                <div
                    @click="changeActiveIndexImg('next', 5)"
                    class="modal-image__next"
                    :class="{'modal-image__next_disable': disableButton}"

                >
                    <img src="/image/icon/arrow-right.svg" alt="next">
                </div>
            </div>
            <div
                class="modal-image__close"
                @click="$emit('update:isActiveModal', false)"
            >
                <img src="/image/icon/close.svg" alt="close">
            </div>
        </div>
    </div>
</template>

<script>
const mSTimeSlider = 0.5
const ways = {
    next: 'next',
    back: 'back'
}
export default {
    name: "ModalImage",
    props: {
        isActiveModal: {
            type: Boolean,
            default: false,
            required: true,
        },
        indexImageActive: {
            type: Number,
            default: 0,
            required: true,
        },
        arraySrcImages: {
            type: Array,
            default: [],
            required: true,
        },
    },
    data() {
        return {
            disableButton: false
        }
    },
    methods: {
        changeActiveIndexImg(way, delay) {
            this.disableButton = true
            let newIndex = this.indexImageActive
            if (way === ways.next) {
                newIndex = (newIndex === this.arraySrcImages.length - 1) ? 0 : this.indexImageActive + 1
                this.$refs.sliderRef.scrollTo({
                    left: window.outerWidth * 2,
                    behavior: "smooth",
                })
            }
            if (way === ways.back) {
                newIndex = newIndex === 0 ? this.arraySrcImages.length - 1 : this.indexImageActive - 1
                this.$refs.sliderRef.scrollTo({
                    left: 0,
                    behavior: "smooth",
                })
            }
            setTimeout(async () => {
                this.$emit('update:indexImageActive', newIndex)
                await this.centerSliderPositioning()
                this.disableButton = false

            }, mSTimeSlider * 100  + delay * 100)
        },
        watchScrollAndChangeIndex(event) {
            if (!process.server && this.$refs.sliderRef) {
                if (event.target.scrollLeft === 0) {
                    this.changeActiveIndexImg(ways.back, 0)
                }
                if (Math.ceil(event.target.scrollLeft) >= (window?.innerWidth * 2)) {
                    this.changeActiveIndexImg(ways.next, 0)
                }
            }
        },
        async centerSliderPositioning() {
            if (!process.server && this.$refs?.sliderRef) {
                await this.$nextTick(() => {
                    this.$refs.sliderRef.scrollLeft = window?.innerWidth
                })
            }
        }
    },
    computed: {
        images() {
            const indexBack = this.indexImageActive === 0 ? this.arraySrcImages.length - 1 : this.indexImageActive - 1
            const indexNext = this.indexImageActive === this.arraySrcImages.length - 1 ? 0 : this.indexImageActive + 1

            return [
                this.arraySrcImages[indexBack],
                this.arraySrcImages[this.indexImageActive],
                this.arraySrcImages[indexNext]
            ]
        },
        classActiveModalOverlay() {
            return {
                'modal-image__overlay_active': this.isActiveModal === true,
                'modal-image__overlay_inactive': this.isActiveModal === false,
            };

        },
        classActiveModalWindow() {
            return {
                'modal-image__window_active': this.isActiveModal === true,
                'modal-image__window_inactive': this.isActiveModal === false,
            };
        },
        timeSlider() {
            return mSTimeSlider + 's'
        }

    },
    watch: {
        isActiveModal() {
            this.centerSliderPositioning()
        }
    },
}
</script>

<style lang="scss">
.modal-image {
    --mSTimeSlider: v-bind(timeSlider);

    &__overlay {
        width: 100%;
        height: 100%;
        margin: auto;
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;

        &_active {
            opacity: 1;
            z-index: 500;
            background: rgba($black, 1);
            transition: background .4s ease-in;
        }

        &_inactive {
            opacity: 0;
            z-index: -10;
            background: rgba($black, 0);
            transition: all .2s ease-out;
        }
    }

    &__window {
        position: static;

        height: 100%;
        width: 100%;
        z-index: 600;

        &_active {
            //transform: translateY(0);
            opacity: 1;
            transition: all .6s ease-in;
        }

        &_inactive {
            //transform: translateY(-500px);
            opacity: 0;
            transition: all .4s ease-out;
        }
    }

    &__slider {
        width: 100vw;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        touch-action: pan-y;
        overflow-x: scroll;

    }

    &__slider-list {
        //width: 300vw;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 1fr;
        overflow: scroll;
        scroll-snap-type: x mandatory;

        //margin-left: -100vw;
        & img {
            poiner-events: none;
        }

        &_transition {
            transition: all var(--mSTimeSlider) ease;
        }

        &::-webkit-scrollbar {
            display: none;
        }

    }

    &__track {
        //cursor: grab;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        scroll-snap-align: start;

        //&:active {
        //    cursor: grabbing;
        //}

    }

    &__img {
        display: block;
        max-width: 98%;
        min-height: 0;
        max-height: 80vh;
        pointer-events: none
    }

    &__close {
        position: fixed;
        top: 10px;
        right: 10px;
        border: 1px solid rgba($turquoise, 0);
        border-radius: 4px;

        img {
            filter: invert(100%);
            width: 40px;
            height: 40px;
        }
    }

    &__close:hover {
        cursor: pointer;
        border: 1px solid rgba($turquoise, 0.5);

    }

    &__close:active {
        cursor: pointer;
        border: 1px solid rgba($turquoise, 1);

        img {
            opacity: 1;
            -webkit-animation: flash 1.5s;
            animation: flash 1.5s;
        }
    }

    &__back {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
        left: 0;
    }

    &__next {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
        right: 0;
    }

    &__next, &__back {
        position: fixed;
        top: calc(50% - 100px);
        height: 200px;
        width: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        z-index: 10;

        &:hover {
            cursor: pointer;
        }

        &:active {
            cursor: pointer;
            background-color: rgba($white, 0.2);

            img {
                opacity: 1;
                -webkit-animation: flash 1.5s;
                animation: flash 1.5s;
            }
        }

        &_disable {
            opacity: 0.5;
        }
    }
}
</style>
