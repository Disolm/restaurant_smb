// export const state = () => ({
//   isShowCart: false,
// })
//
// export const mutations = {
//   invertState(state, val) {
//     state.isShowCart = val
//   }
// }
//
// export const getters = {
//   getStatus(state) {
//     return state.isShowCart
//   }
// }

import {defineStore} from 'pinia'

export const useCartStore  = defineStore('forCart', {
    state: () => ({
            isShowCart: false,
    }),

    getters: {
        getStatus(state) {
            return state.isShowCart
        }
    },
    actions: {
        setStatus(state, value) {
            state.isShowCart = value
        }
    }
})