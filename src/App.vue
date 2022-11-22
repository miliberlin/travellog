<template>
  <h1 class="text-center text-xl font-semibold m-2 text-[#373e40]">Giovanni & Michelle's TravelLog</h1>
  <Map :points="log" />
</template>

<script setup>
import Map from "./components/Map.vue"
import { log } from "./fixtures/log"
</script>