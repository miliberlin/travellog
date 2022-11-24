<template>
  <div class="h-[75vh] w-screen" id="map"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl"
import { onMounted, computed } from "vue"
import { getDates } from "../helpers"

const props = defineProps({
	points: Array
})
const mapKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const formattedPlaces = computed (() => {
	const formattedList = []
	props.points.forEach(country =>
		country.visitedPlaces.forEach(place =>
			formattedList.push(
				{
					"type": "Feature",
					"properties": {
						"description": `<strong>${country.flag} ${place.name}, ${country.country}</strong><p>${getDates(place.dates)}</p>`
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

	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11",
		center: [7.734268335243472, 48.57632247789885],
		zoom: 3
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
				"circle-color": "#488286",
				"circle-radius": 6,
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
</script>
