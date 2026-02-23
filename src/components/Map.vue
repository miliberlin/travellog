<template>
  <div class="relative">
    <div class="h-[60vh] lg:h-[80vh] w-full" id="map"></div>
    <div class="absolute bottom-6 left-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-md px-3 py-2 text-xs z-[1000] space-y-1">
      <div class="flex items-center gap-2">
        <span class="inline-block w-3 h-3 rounded-full bg-steel-teal border-2 border-white shadow-sm"></span>
        <span>Visited</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-block w-3 h-3 rounded-full bg-burnt-sienna border-2 border-white shadow-sm"></span>
        <span>Lived here</span>
      </div>
      <div class="text-slate-gray mt-1 text-[10px]">Circle size = number of visits</div>
    </div>
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl"
import { onMounted, onUnmounted, computed, watch } from "vue"
import { getDates } from "../helpers"

const props = defineProps({
	points: Array
})
const mapKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

let map = null

const formattedPlaces = computed (() => {
	const formattedList = []
	props.points.forEach(country =>
		country.visitedPlaces.forEach(place =>
			formattedList.push(
				{
					"type": "Feature",
					"properties": {
						"description": `<h3><strong>${country.flag} ${place.name}, ${country.country}</strong></h3><p>${getDates(place.dates)}</p>${place.haveLivedHere ? "<p>🏡 We lived here</p>" : ""}`,
						"size": place.dates.length > 1 ? 6 + (place.dates.length * 2) : 6,
						"colour": place.haveLivedHere ? "#cd5334" : "#488286"
					},
					"geometry": {
						"type": "Point",
						"coordinates": place.coordinates
					}
				}
			)
		)
	)
	return formattedList
})

onMounted (() => {
	mapboxgl.accessToken = mapKey

	map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11",
		center: [66.70945817090065, 47.67731622731609],
		zoom: 2
	})

	map.on("load", () => {
		map.addSource("places", {
			"type": "geojson",
			"data": {
				"type": "FeatureCollection",
				"features": formattedPlaces.value,
			}
		})
		// Add a layer showing the places.
		map.addLayer({
			"id": "places",
			"type": "circle",
			"source": "places",
			"paint": {
				"circle-color": ["get", "colour"],
				"circle-radius": ["get", "size"],
				"circle-stroke-width": 2,
				"circle-stroke-color": "#ffffff"
			}
		})

		// Create a popup, but don't add it to the map yet.
		const popup = new mapboxgl.Popup({
			closeButton: false,
			closeOnClick: false
		})

		map.on("mouseenter", "places", (e) => {
			// Change the cursor style as a UI indicator.
			map.getCanvas().style.cursor = "pointer"

			// Copy coordinates array.
			const coordinates = e.features[0].geometry.coordinates.slice()
			const description = e.features[0].properties.description

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
			}

			// Populate the popup and set its coordinates
			// based on the feature found.
			popup.setLngLat(coordinates).setHTML(description).addTo(map)
		})

		map.on("mouseleave", "places", () => {
			map.getCanvas().style.cursor = ""
			popup.remove()
		})
	})
})

let resizeObserver = null

onMounted(() => {
	const container = document.getElementById("map")
	if (container) {
		resizeObserver = new ResizeObserver(() => {
			if (map) map.resize()
		})
		resizeObserver.observe(container)
	}
})

onUnmounted(() => {
	if (resizeObserver) resizeObserver.disconnect()
})

function flyTo(coords) {
	if (map) {
		map.flyTo({ center: coords, zoom: 8, duration: 1500 })
	}
}

defineExpose({ flyTo })

watch(() => props.points, () => {
	if (!map) return
	const source = map.getSource("places")
	if (source) {
		source.setData({
			"type": "FeatureCollection",
			"features": formattedPlaces.value,
		})
	}
})
</script>
