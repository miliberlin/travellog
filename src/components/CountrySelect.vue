<template>
  <select
    class="mt-2 mr-2 py-1 px-3 border rounded border-[#488286]"
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
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
	selectedCountry: String,
	log: Array
})
defineEmits(["select:country"])

const options = computed(() => {
	let countries = props.log.map(item => item.country)
	countries.unshift("Show all")
	return countries
})
</script>