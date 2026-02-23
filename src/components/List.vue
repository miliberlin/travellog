<template>
  <table class="text-sm table-auto w-full">
    <thead>
      <tr class="text-left">
        <th class="py-2 px-3 cursor-pointer select-none" @click="toggleSort('country')">
          Country <span v-if="sortKey === 'country'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
        <th class="py-2 px-3 cursor-pointer select-none" @click="toggleSort('place')">
          Place <span v-if="sortKey === 'place'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
        <th class="py-2 px-3 cursor-pointer select-none" @click="toggleSort('date')">
          Dates <span v-if="sortKey === 'date'">{{ sortAsc ? '▲' : '▼' }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedRows" :key="`${row.country}-${row.name}`">
        <td class="py-2 px-3">{{ row.flag }} {{ row.country }}</td>
        <td class="py-2 px-3">{{ row.name }}</td>
        <td class="py-2 px-3">{{ getDates(row.dates) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed } from "vue"
import { getDates } from "../helpers"

const props = defineProps({
	points: Array
})

const sortKey = ref("country")
const sortAsc = ref(true)

function toggleSort(key) {
	if (sortKey.value === key) {
		sortAsc.value = !sortAsc.value
	} else {
		sortKey.value = key
		sortAsc.value = key !== "date"
	}
}

function parseDate(dateStr) {
	const [month, year] = dateStr.split("/")
	return new Date(parseInt(year), parseInt(month) - 1)
}

function getLatestDate(dates) {
	return dates.reduce((latest, d) => {
		const parsed = parseDate(d)
		return parsed > latest ? parsed : latest
	}, new Date(0))
}

const flatRows = computed(() => {
	const rows = []
	for (const country of props.points) {
		for (const place of country.visitedPlaces) {
			rows.push({
				name: place.name,
				country: country.country,
				flag: country.flag,
				dates: place.dates,
			})
		}
	}
	return rows
})

const sortedRows = computed(() => {
	const rows = [...flatRows.value]
	const dir = sortAsc.value ? 1 : -1

	rows.sort((a, b) => {
		if (sortKey.value === "place") {
			return dir * a.name.localeCompare(b.name)
		}
		if (sortKey.value === "country") {
			return dir * a.country.localeCompare(b.country)
		}
		// date
		return dir * (getLatestDate(a.dates) - getLatestDate(b.dates))
	})

	return rows
})
</script>
