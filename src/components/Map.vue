<template>
  <div class="h-[60vh] lg:h-[85vh] w-full" id="map"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl"
import { onMounted, computed, onBeforeUpdate} from "vue"
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

onBeforeUpdate (() => {
	// remove existing data
	map.removeLayer("places")
	map.removeSource("places")

	// load new data
	map.addSource("places", {
		"type": "geojson",
		"data": {
			"type": "FeatureCollection",
			"features": formattedPlaces.value,
		}
	})
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
})
</script>
