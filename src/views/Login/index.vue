<template>
  <div class="view login">
    <div class="login-panel">
      <NSpin :show="loading">
        <NCard
          title="登录"
          :style="
             {
              boxshadow: 'var(--box-shadow)'
            }
          "
        >
          <NForm
            model="model"
            rules="rules"
            ref="formRef"
            label-placement="left"
            :label-width="80"
            size="medium"
          >
            <NFormItem label="用户名" path="username">
              <NInput placeholder="输入用户名" v-model:value="model.username" />
            </NFormItem>
            <NFormItem label="密码" path="password">
              <NInput
                placeholder="输入密码"
                type="password"
                v-model:value="model.password"
              />
            </NFormItem>
            <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
              <NButton type="primary" @click="handleLogin">登录</NButton>
            </div>
          </NForm>
        </NCard>
      </NSpin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NSpin, NForm, NFormItem, NInput, NButton } from "naive-ui";
import { useStore } from "vuex";
import "./login.css";

const loading = ref(false);
const formRef = ref(null);
const model = ref({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入密码",
  },
};

// const actions = mapActions(["login"]);

const router = useRouter();
const store = useStore();

function handleLogin(e: Event) {
  e.preventDefault();
  ///
  // @ts-ignore
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      loading.value = true;
      await store.dispatch('login', {
        isAuth: true,
        username: model.value.username,
      });
      router.push("/home");
    }
  });
}
</script>
