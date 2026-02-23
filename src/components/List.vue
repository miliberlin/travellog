<template>
  <table class="text-sm table-auto w-full">
    <thead>
      <tr class="text-left border-b border-gray-200">
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
      <tr
        v-for="(row, i) in sortedRows"
        :key="`${row.country}-${row.name}`"
        class="transition-colors duration-150 cursor-pointer"
        :class="[
          i % 2 === 0 ? 'bg-white' : 'bg-gray-50',
          '',
          'hover:bg-powder-blue/30'
        ]"
        @click="handleRowClick(row)"
      >
        <td class="py-2 px-3"><span @mouseenter="row.flag === '🇮🇹' && startPizzaRain()" @mouseleave="row.flag === '🇮🇹' && stopPizzaRain()">{{ row.flag }}</span> {{ row.country }}</td>
        <td class="py-2 px-3">{{ row.name }}<span v-if="row.haveLivedHere" title="We lived here!"> 🏡</span></td>
        <td class="py-2 px-3">{{ getDates(row.dates) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, computed, inject, onUnmounted } from "vue"
import { getDates } from "../helpers"

const props = defineProps({
	points: Array,
	search: { type: String, default: "" }
})

const flyTo = inject("flyTo", null)

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

function getLatestYear(dates) {
	return dates.reduce((latest, d) => {
		const year = parseInt(d)
		return year > latest ? year : latest
	}, 0)
}

let pizzaContainer = null
let pizzaInterval = null

function startPizzaRain() {
	if (pizzaContainer) return
	pizzaContainer = document.createElement("div")
	Object.assign(pizzaContainer.style, {
		position: "fixed", inset: "0", pointerEvents: "none", zIndex: "9999", overflow: "hidden"
	})
	document.body.appendChild(pizzaContainer)
	pizzaInterval = setInterval(() => {
		const pizza = document.createElement("div")
		pizza.textContent = "🍕"
		const left = Math.random() * 100
		const size = 20 + Math.random() * 30
		const duration = 1 + Math.random() * 2
		Object.assign(pizza.style, {
			position: "absolute",
			left: `${left}%`,
			top: "-40px",
			fontSize: `${size}px`,
			animation: `pizza-fall ${duration}s linear forwards`,
		})
		pizzaContainer.appendChild(pizza)
		setTimeout(() => pizza.remove(), duration * 1000)
	}, 50)

	if (!document.getElementById("pizza-style")) {
		const style = document.createElement("style")
		style.id = "pizza-style"
		style.textContent = `@keyframes pizza-fall { from { transform: translateY(0) rotate(0deg); } to { transform: translateY(100vh) rotate(360deg); } }`
		document.head.appendChild(style)
	}
}

function stopPizzaRain() {
	if (pizzaInterval) { clearInterval(pizzaInterval); pizzaInterval = null }
	if (pizzaContainer) { pizzaContainer.remove(); pizzaContainer = null }
}

onUnmounted(stopPizzaRain)

function handleRowClick(row) {
	if (flyTo && row.coordinates) {
		flyTo(row.coordinates)
	}
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
				haveLivedHere: place.haveLivedHere || false,
				coordinates: place.coordinates,
			})
		}
	}
	return rows
})

const filteredRows = computed(() => {
	if (!props.search) return flatRows.value
	const q = props.search.toLowerCase()
	return flatRows.value.filter(row =>
		row.name.toLowerCase().includes(q) || row.country.toLowerCase().includes(q)
	)
})

const sortedRows = computed(() => {
	const rows = [...filteredRows.value]
	const dir = sortAsc.value ? 1 : -1

	rows.sort((a, b) => {
		if (sortKey.value === "place") {
			return dir * a.name.localeCompare(b.name)
		}
		if (sortKey.value === "country") {
			return dir * a.country.localeCompare(b.country)
		}
		// date
		return dir * (getLatestYear(a.dates) - getLatestYear(b.dates))
	})

	return rows
})
</script>
