<template>
  <div>
    <div>Home {{ count }} {{ double }}</div>
    <test-user />
    <div>
      <n-button type="info" @click="actions.increment()">increment</n-button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { mapState, mapActions } from "pinia";
import { useCounterStore } from "../../store/couter";
import { NButton } from "naive-ui";
import TestUser from './user.vue'

const state = mapState(useCounterStore, ["count", "double"]);
const count = computed(state.count);
const double = computed(state.double);
const actions = mapActions(useCounterStore, ["increment"]);
</script>
