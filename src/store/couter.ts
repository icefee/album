import { defineStore } from 'pinia'

export interface Couter {
    count: number;
    double?: number;
}

export const useCounterStore = defineStore('counter', {
    state(): Couter {
        return { count: 0 }
    },
    getters: {
        double: (state: Couter) => state.count * 2,
    },
    actions: {
        increment() {
            this.count ++
        }
    }
})
