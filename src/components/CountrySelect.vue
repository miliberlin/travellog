<template>
  <div class="relative mt-3 mb-2 lg:mt-0 lg:w-full">
    <select
      data-testid="country-selector"
      class="w-full px-3 pr-8 border rounded border-[#488286]"
      @change="$emit('select:country', $event.target.value)"
    >
      <option
        v-for="option of options"
        :key="option"
        :value="option"
        :selected="option === selectedCountry"
      >
        {{ option }}
      </option>
    </select>
    <button
      v-if="selectedCountry !== 'Show all'"
      class="absolute right-6 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-800"
      @click="$emit('select:country', 'Show all')"
    >x</button>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
	selectedCountry: String,
	log: Array
})
defineEmits(["select:country"])

const options = computed(() => {
	let countries = props.log.map(item => item.country).sort()
	countries.unshift("Show all")
	return countries
})
</script>