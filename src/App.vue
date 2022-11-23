<template>
  <div class="text-center my-2">
    <h1 class="text-xl font-semibold mb-2 text-[#373e40]">Giovanni & Michelle's TravelLog</h1>
    <p>We have visited {{ stats.countries }} countries and {{ stats.places }} places together.</p>
  </div>
  <Map :points="log" />
</template>

<script setup>
import Map from "./components/Map.vue"
import { log } from "./fixtures/log"
import { computed } from "vue"

const stats = computed(() => {
	const numbers = {
		countries: 0,
		places: 0
	}

	log.forEach(country => {
		numbers.countries++
		numbers.places += country.visitedPlaces.length
	})

	return numbers
})

</script>