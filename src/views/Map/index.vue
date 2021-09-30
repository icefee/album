<template>
  <div id="map" />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
// import { useRouter } from "vue-router";
import * as map from "../../tools/map/baidu";

// const router = useRouter();
onMounted(async function () {
  map.init("map", {
    lng: 116.413387,
    lat: 39.910924,
    zoom: 12,
  });
});
</script>
