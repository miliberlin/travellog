<template>
  <div class="text-center my-4">
    <h1 class="inline-block text-xl font-semibold mb-2 underlined">Giovanni & Michelle's TravelLog</h1>
    <p>We have visited <span class="font-bold">{{ stats.places }} places</span> in <span class="font-bold">{{ stats.countries }} countries</span> together.</p>
  </div>
	<div class="flex-wrap lg:flex-nowrap flex relative gap-6 mx-6">
		<Map class="w-full lg:flex-1 lg:min-w-0" :points="filterByCountry ? filterByCountry : log" />
		<button
			@click="panelOpen = !panelOpen"
			class="hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 z-[1000] transition-all duration-300"
			:class="panelOpen ? 'right-[calc(33.333%+4px)]' : 'right-2'"
		>
			<span class="relative bottom-[1px]">
				{{ panelOpen ? '\u00AB' : '\u00BB' }}
			</span>
		</button>
		<div
			class="w-full flex flex-col lg:max-h-[85vh] transition-all duration-300 overflow-hidden"
			:class="panelOpen ? 'lg:w-1/3' : 'lg:w-0 lg:opacity-0'"
		>
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
const panelOpen = ref(true)

const filterByCountry = computed(() => {
	if (selectedCountry.value === "Show all") {
		return log
	}
	const country = log.find(item => item.country === selectedCountry.value)
	return country ? [country] : []
})

const stats = computed(() => ({
	countries: log.length,
	places: log.reduce((sum, country) => sum + country.visitedPlaces.length, 0)
}))

</script>