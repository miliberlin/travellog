<template>
  <div class="text-center my-4">
    <h1 class="inline-block text-xl font-semibold mb-2 underlined">Giovanni & Michelle's TravelLog</h1>
    <p>We have visited <span class="font-bold">{{ stats.places }} places</span> in <span class="font-bold">{{ stats.countries }} countries</span> together.</p>
  </div>
	<div class="flex-wrap lg:flex-nowrap flex">
		<Map class="w-full lg:w-4/5" :points="filterByCountry ? filterByCountry : log" />
		<div class="w-full lg:w-1/5 flex flex-col lg:max-h-[85vh] mx-2">
			<CountrySelect
				@select:country="selectedCountry = $event"
				:selected-country="selectedCountry"
				:log="log"
			/>
			<div class="lg:overflow-scroll">
				<List :points="filterByCountry ? filterByCountry : log" />
			</div>
		</div>
	</div>
</template>

<script setup>
import Map from "./components/Map.vue"
import List from "./components/List.vue"
import CountrySelect from "./components/CountrySelect.vue"

import { log } from "./fixtures/log"
import { computed, ref } from "vue"

const selectedCountry = ref("Show all")

const filterByCountry = computed(() => {
	if (selectedCountry.value === "Show all") {
		return log
	}
	const country = log.find(item => item.country === selectedCountry.value)
	return [country]
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