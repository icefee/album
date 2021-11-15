<template>
    <User v-slot:default="{ isLogin, setLoginState }">
        <p>状态: {{ isLogin ? '已登录' : '未登录' }}</p>
        <button @click="setLoginState(!isLogin)">切换</button>
    </User>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Consumer } from '../../mixins/auth'

export default defineComponent({
    components: {
        User: Consumer.slot
    }
})
</script>>
