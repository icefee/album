import { h, Transition, resolveDynamicComponent, defineComponent, ref } from 'vue'
import { RouterView } from 'vue-router'
import { NConfigProvider, darkTheme, GlobalTheme } from 'naive-ui'
import './App.css'

/*
export interface ApiResponse {
  data: any,
  status: number
}

export interface Album {
  id: number,
  album: {
    name: string,
  },
  photo: Photo
}

export interface Photo {
  path: string
}
*/

export default defineComponent<{
  darkTheme: GlobalTheme,
  theme: GlobalTheme
}>({
  setup() {
    return {
      darkTheme,
      theme: ref<GlobalTheme>(),
    };
  },
  render() {
    return (
      <NConfigProvider theme={this.theme}>
        <RouterView class="view child-view">
          {
            ({ Component, route }: { Component?: any, route: any }) => (
              <Transition>
                {
                  () => resolveDynamicComponent(Component)
                }
              </Transition>
            )
          }
        </RouterView>
      </NConfigProvider>
    )
  }
})
