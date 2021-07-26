<template>
  <n-config-provider :theme="theme">
    <router-view v-slot="{ Component, route }">
      <transition>
        <component
          :is="Component"
          :key="route.meta.usePathKey ? route.path : undefined"
        />
      </transition>
    </router-view>
  </n-config-provider>
</template>

<script lang="tsx">
import { defineComponent, ref, Ref } from "vue";
import { NConfigProvider, darkTheme } from "naive-ui";

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
  name: "App",
  components: {
    NConfigProvider,
  },
  setup() {
    return {
      darkTheme,
      theme: ref<any>(null) as Ref<any>,
    };
  },
});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app,
.n-config-provider {
  height: 100%;
}

#app {
  position: relative;
}

.view {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden auto;
}

.child-router {
  position: relative;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease-in-out;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
