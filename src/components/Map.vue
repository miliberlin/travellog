<template>
  <div class="h-[90vh] w-screen" id="map"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl"
import { onMounted } from "vue"

const props = defineProps({
	points: Array
})
const mapKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

onMounted (() => {
	mapboxgl.accessToken = mapKey

	const map = new mapboxgl.Map({
		container: "map",
		style: "mapbox://styles/mapbox/light-v11",
		center: [7.734268335243472, 48.57632247789885],
		zoom: 3
	})

	const marker = props.points.forEach(country => 
		country.visitedPlaces.forEach(place => new mapboxgl.Marker({
			color: "#488286",
		}).setLngLat(place.coordinates)
			.addTo(map)))
})
</script>