# TravelLog

A personal travel journal app that tracks visited countries and places with an interactive map. Built with Vue 3, Mapbox GL, and Tailwind CSS.

## Features

- **Interactive Map** — Mapbox GL map with color-coded markers (teal for visited, burnt sienna for lived-in). Circle size reflects number of visits. Click to fly to locations.
- **Sortable Table** — Browse all places sorted by country, place, or date.
- **Search** — Filter places by country or place name.
- **Statistics** — See total countries, places, and year range at a glance.
- **Collapsible Sidebar** — Toggle the sidebar on desktop for a full-screen map view.

## Tech Stack

- [Vue 3](https://vuejs.org/) with `<script setup>` SFCs
- [Vite](https://vitejs.dev/) for build tooling
- [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) for map rendering
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env` file with your Mapbox token:

```
VITE_MAPBOX_ACCESS_TOKEN=your_token_here
```

## Scripts

| Command             | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start dev server         |
| `npm run build`     | Build for production     |
| `npm run preview`   | Preview production build |

## Project Structure

```
src/
├── App.vue              # Root layout and stats calculation
├── components/
│   ├── Header.vue       # Title and statistics
│   ├── Map.vue          # Mapbox map with markers
│   ├── Sidebar.vue      # Collapsible sidebar with search
│   ├── List.vue         # Sortable, searchable table
│   └── Footer.vue       # Credit footer
├── fixtures/
│   └── log.js           # Travel data
└── helpers.js           # Utility functions
```
