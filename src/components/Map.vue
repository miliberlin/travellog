<template>
  <div class="h-screen w-screen" id="map"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl';
import { onMounted } from 'vue';

const mapKey = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

onMounted (() => {
  mapboxgl.accessToken = mapKey

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
})
</script>