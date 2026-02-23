<template>
  <div class="text-center my-4">
    <h1 class="inline-block text-xl font-semibold mb-3 underlined">Giovanni & Michelle's TravelLog</h1>
    <div class="flex justify-center gap-3 flex-wrap">
      <span class="inline-flex items-center gap-1.5 bg-steel-teal/10 text-steel-teal text-sm font-medium px-3 py-1 rounded-full">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/></svg>
        {{ stats.countries }} countries
      </span>
      <span class="inline-flex items-center gap-1.5 bg-steel-teal/10 text-steel-teal text-sm font-medium px-3 py-1 rounded-full">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {{ stats.places }} places
      </span>
      <span class="inline-flex items-center gap-1.5 bg-steel-teal/10 text-steel-teal text-sm font-medium px-3 py-1 rounded-full">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        {{ stats.yearRange }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
	stats: Object
})
</script>
