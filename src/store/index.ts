import { createStore } from 'vuex'
import { State } from './index.d'

export default createStore<State>({
    state() {
        return {
            auth: false,
        }
    },
    mutations: {
        setAuth(state: State, auth: boolean) {
            state.auth = auth;
        }
    }
})
