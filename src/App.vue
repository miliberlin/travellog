<template>
  <div class="text-center my-4">
    <h1 class="inline-block text-xl font-semibold mb-2 underlined">Giovanni & Michelle's TravelLog</h1>
    <p>We have visited <span class="font-bold">{{ stats.places }} places</span> in <span class="font-bold">{{ stats.countries }} countries</span> together.</p>
  </div>
	<Map :points="filterByCountry ? filterByCountry : log" />
	<div class="flex justify-end">
		<CountrySelect
			@select:country="selectedCountry = $event"
			:selected-country="selectedCountry"
			:log="log"
		/>
	</div>
	<div class="flex justify-center">
		<List :points="filterByCountry ? filterByCountry : log" />
	</div>
</template>

<script setup>
import Map from "./components/Map.vue"
import List from "./components/List.vue"
import CountrySelect from "./components/CountrySelect.vue"

import { log } from "./fixtures/log"
import { computed, ref } from "vue"

const selectedCountry = ref(null)

const filterByCountry = computed(() => {
	if (selectedCountry.value) {
		const country = log.find(item => item.country === selectedCountry.value)
		return [country]
	}
	return false
})

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