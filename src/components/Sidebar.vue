<template>
	<button
		@click="panelOpen = !panelOpen"
		class="hidden lg:flex absolute top-1/2 -translate-y-1/2 items-center justify-center w-7 h-7 bg-white border border-gray-300 rounded-full shadow-md hover:bg-gray-100 z-[1000] transition-all duration-300"
		:class="panelOpen ? 'right-[calc(33.333%+4px)]' : 'right-2'"
	>
		<span class="relative bottom-[1px]">
			{{ panelOpen ? '\u00AB' : '\u00BB' }}
		</span>
	</button>
	<div
		class="w-full flex flex-col lg:max-h-[80vh] transition-all duration-300 overflow-hidden"
		:class="panelOpen ? 'lg:w-1/3' : 'lg:w-0 lg:opacity-0'"
	>
		<div class="relative mt-3 mb-2 lg:mt-0">
			<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-gray" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
			<input
				v-model="searchQuery"
				type="text"
				placeholder="Search places..."
				class="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-steel-teal focus:ring-1 focus:ring-steel-teal"
			/>
		</div>
		<div class="lg:overflow-scroll">
			<List :points="points" :search="searchQuery" />
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import List from "./List.vue"

defineProps({
	points: Array
})

const panelOpen = ref(true)
const searchQuery = ref("")
</script>
