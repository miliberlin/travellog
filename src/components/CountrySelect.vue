<template>
  <div class="relative mt-3 mb-2 lg:mt-0 lg:w-full">
    <select
      data-testid="country-selector"
      class="w-full px-3 pr-8 border rounded border-steel-teal"
      v-model="selectedCountry"
    >
      <option
        v-for="option of options"
        :key="option"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <button
      v-if="selectedCountry !== 'Show all'"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
      @click="selectedCountry = 'Show all'"
    >x</button>
  </div>
</template>

<script setup>
import { computed } from "vue"

const selectedCountry = defineModel("selectedCountry", { type: String, required: true })

const props = defineProps({
	log: Array
})

const options = computed(() => {
	let countries = props.log.map(item => item.country).sort()
	countries.unshift("Show all")
	return countries
})
</script>