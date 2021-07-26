<template>
  <div class="view login">
    <div class="login-panel">
      <n-spin :show="loading">
        <n-card title="登录" :style="{ boxShadow: 'var(--box-shadow)' }">
          <n-form
            :model="model"
            :rules="rules"
            ref="formRef"
            label-placement="left"
            :label-width="80"
            size="medium"
          >
            <n-form-item label="用户名" path="username">
              <n-input
                placeholder="输入用户名"
                v-model:value="model.username"
              />
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input
                placeholder="输入密码"
                type="password"
                v-model:value="model.password"
              />
            </n-form-item>
            <div :style="{ display: 'flex', justifyContent: 'flex-end' }">
              <n-button type="primary" @click="handleLogin">登录</n-button>
            </div>
          </n-form>
        </n-card>
      </n-spin>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, Ref, ref } from "vue";
import { NCard, NSpin, NForm, NFormItem, NInput, NButton } from "naive-ui";

export default defineComponent({
  components: {
    NCard,
    NSpin,
    NForm,
    NFormItem,
    NInput,
    NButton,
  },
  data: () => ({
    loading: false,
  }),
  setup() {
    const formRef: Ref<any> = ref(null);
    return {
      formRef,
      model: ref({
        username: "",
        password: "",
      }),
      rules: {
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
      },
    };
  },
  methods: {
    handleLogin(e: Event) {
      e.preventDefault();
      ///
      this.formRef?.validate((errors: any) => {
        if (!errors) {
          this.requestLogin()
        }
      });
    },
    requestLogin() {
      this.loading = true;
      this.$router.push('/home');
    }
  },
});
</script>

<style scoped>
.login {
  background-color: #eee;
}

.login-panel {
  position: absolute;
  width: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
