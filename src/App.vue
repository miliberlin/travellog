<template>
  <Header :stats="stats" />
	<div class="flex-wrap lg:flex-nowrap flex relative gap-6 mx-6">
		<Map ref="mapRef" class="w-full lg:flex-1 lg:min-w-0" :points="log" />
		<Sidebar :points="log" />
	</div>
  <Footer />
</template>

<script setup>
import Map from "./components/Map.vue"
import Sidebar from "./components/Sidebar.vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { log } from "./fixtures/log"
import { computed, ref, provide } from "vue"

const mapRef = ref(null)

provide("flyTo", (coords) => {
	mapRef.value?.flyTo(coords)
})

const stats = computed(() => {
	const allDates = []
	let places = 0
	for (const country of log) {
		for (const place of country.visitedPlaces) {
			places++
			for (const d of place.dates) {
				allDates.push(parseInt(d))
			}
		}
	}
	const minYear = Math.min(...allDates)
	const maxYear = Math.max(...allDates)
	return {
		countries: log.length,
		places,
		yearRange: minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`
	}
})
</script>
