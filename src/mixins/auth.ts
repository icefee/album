import { defineComponent, DefineComponent, computed, Ref } from 'vue'

export type Auth = {
    isLogin: boolean,
    setLoginState: (T: boolean) => void
}

export type InjectAuth = {
    isLogin: Ref<Auth['isLogin']>,
    setLoginState: Auth['setLoginState']
}

const Provider = defineComponent<Auth>({
    data: () => ({
        isLogin: false
    }),
    methods: {
        setLoginState(state: boolean) {
            this.isLogin = state;
        }
    },
    provide() {
        return {
            isLogin: computed(() => this.isLogin),
            setLoginState: this.setLoginState
        }
    },
})

const Consumer = defineComponent<InjectAuth>({
    inject: ['isLogin', 'setLoginState'],
})

Consumer.slot = defineComponent({
    extends: Consumer,
    render() {
        const { isLogin, setLoginState } = this;
        if (!this.$slots.default) {
            throw new Error('default slot must not be null')
        }
        return this.$slots.default({
            isLogin: isLogin?.value,
            setLoginState
        })
    }
})

function WithAuthMixin<T>(options: any): DefineComponent<T & Auth> {
    return defineComponent<T & Auth>({
        extends: Consumer,
        ...options
    })
}

export {
    Provider as default,
    Consumer,
    WithAuthMixin,
}

/*
type User = {
    name: string;
    address: string;
    age: number;
    sex: 'male' | 'female'
}

const user: User = {
    name: 'Tom',
    address: 'tc12',
    age: 23,
    sex: 'male'
}

function setUser(key: 'name' | 'address'): void {
    const newUser = { ...user };
    newUser[key] = '';
}
*/
