# Admin Dashboard (Frontend Only)

A React + TypeScript + Tailwind CSS recreation of the admin dashboard overview screen —
sidebar navigation, stat cards, applications line chart, country distribution, and a
statistics area chart. Static/mock data only, no backend.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Recharts (charts)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    charts/
      ApplicationsChart.tsx     Line chart: student applications per month
      CountryDistribution.tsx   Country-wise distribution bars
      StatisticsChart.tsx       Area chart: eligibility checks vs appointments
    Sidebar.tsx                 Left navigation with grouped sections
    StatCard.tsx                Small metric card used in the top grid
    Topbar.tsx                  Header bar with page title + user menu
  data.ts                       Mock data + nav config (edit this to change content)
  types.ts                      Shared TypeScript types
  App.tsx                       Page layout / composition
  index.css                     Tailwind entry + small global tweaks
  main.tsx                      React entry point
```

## Customizing

- Edit `src/data.ts` to change the sidebar links, stat card numbers, or chart data.
- The sidebar is clickable and just updates the page title in the topbar — wire up
  routing (e.g. react-router) if you want each item to load a real page.
- Colors live in `tailwind.config.js` under `theme.extend.colors.brand` / `surface`.
