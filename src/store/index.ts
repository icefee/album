import { createStore } from 'vuex'

declare interface Auth {
    isAuth: boolean,
    username: String | null
}

declare interface State extends Auth {}

export default createStore({
    state() : State {
        return {
            isAuth: false,
            username: null
        }
    },
    mutations: {
        setAuth(state: State, auth: Auth) {
            state.isAuth = auth.isAuth;
            state.username = auth.username;
        }
    },
    actions: {
        async login({ commit }, auth: Auth) {
            return new Promise(
                resolve => {
                    setTimeout(() => {
                        commit('setAuth', auth)
                        resolve(0);
                    }, 2000);
                }
            )
        }
    }
})
