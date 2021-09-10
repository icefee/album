import { h, Transition, resolveDynamicComponent, defineComponent, ref, Ref } from "vue"
import { RouterView } from "vue-router"
import { NConfigProvider, darkTheme } from "naive-ui"
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

export default defineComponent({
  setup() {
    return {
      darkTheme,
      theme: ref<any>(null) as Ref<any>,
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
