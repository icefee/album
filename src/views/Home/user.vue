<template>
    <User v-slot:default="{ isLogin }">{{ isLogin ? '已登录' : '未登录' }}</User>
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
