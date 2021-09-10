import { h, defineComponent, Ref, ref } from 'vue'
import { NCard, NSpin, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { mapActions } from 'vuex'
import './login.css'

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
  render() {
    return (
      <div class="view login">
        <div class="login-panel">
          <NSpin show={this.loading}>
            {
              () => (
                <NCard title="登录" style={{ boxShadow: 'var(--box-shadow)' }}>
                  {
                    () => (
                      <NForm
                        model={this.model}
                        rules={this.rules}
                        ref="formRef"
                        label-placement="left"
                        label-width={80}
                        size="medium"
                      >
                        {
                          () => [
                            <NFormItem label="用户名" path="username">
                              {
                                () => (
                                  <NInput
                                    placeholder="输入用户名"
                                    value={this.model.username}
                                    on-input={
                                      (text: string) => {
                                        this.model.username = text
                                      }
                                    }
                                  />
                                )
                              }
                            </NFormItem>,
                            <NFormItem label="密码" path="password">
                              {
                                () => (
                                  <NInput
                                    placeholder="输入密码"
                                    type="password"
                                    value={this.model.password}
                                    on-input={
                                      (text: string) => {
                                        this.model.password = text
                                      }
                                    }
                                  />
                                )
                              }
                            </NFormItem>,
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <NButton type="primary" on-click={this.handleLogin}>
                                {
                                  () => '登录'
                                }
                              </NButton>
                            </div>
                          ]
                        }
                      </NForm>
                    )
                  }
                </NCard>
              )
            }
          </NSpin>
        </div>
      </div>
    )
  },
  methods: {
    ...mapActions(['login']),
    handleLogin(e: Event) {
      e.preventDefault();
      ///
      this.formRef?.validate(async (errors: any) => {
        if (!errors) {
          this.loading = true;
          await this.login({
            isAuth: true,
            username: this.model.username
          });
          // console.log(this.$store);
          this.$router.push('/home');
          // this.requestLogin()
        }
      });
    },
    // requestLogin() {
    //   this.loading = true;
    //   this.$store.commit('setAuth', {isAuth: true, username: this.model.username})
    //   this.$router.push('/home');
    // },
  },
})
