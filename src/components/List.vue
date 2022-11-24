<template>
  <table class="table-auto m-5">
    <thead>
      <tr class="text-left">
        <th class="py-2 px-3">Place</th>
        <th class="py-2 px-3">Country</th>
        <th class="py-2 px-3">Dates</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="country in points">
        <template v-for="(place, index) in country.visitedPlaces" :key="`${country}-${index}`">
          <tr>
            <td class="py-2 px-3">{{ place.name }}</td>
            <td class="py-2 px-3">{{ country.flag }} {{ country.country}}</td>
            <td class="py-2 px-3">{{ getDates(place.dates) }}</td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script setup>
import { getDates } from "../helpers"
defineProps({
	points: Array
})
</script>