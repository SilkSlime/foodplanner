# Meal Planner (Vue 3 + Vite + localStorage)

This is a frontend-only weekly meal planning application. It allows users to view a list of dishes, plan meals for two weeks, and generate a shopping list for the active week. All data is stored in the browser's `localStorage`.

## Features

* View a list of all available dishes with details (name, picture, composition, KBZhU, recipe in Markdown).
* Plan meals for "Week 1" and "Next Week" and set which week is active.
* Generate a shopping list from dishes in the active week.
* Apple-inspired design with rounded corners, soft shapes and pleasant colors.
* Data persistence using `localStorage` only.

## Project Setup

### Prerequisites

* Node.js v18 or later
* npm

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at http://localhost:5173 by default.
3. To build for production:
   ```bash
   npm run build
   ```

Dish images are stored in `public/images`. Replace the placeholder JPG files with your own if desired.
