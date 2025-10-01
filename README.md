# Character Browser

A Vue.js application that displays characters with infinite scroll and detail views.

## Features

- Browse characters with infinite scroll
- Character detail view
- Responsive design
- State preservation when navigating between views

## Tech Stack

- Vue 3
- Vue Router
- Vite
- SCSS

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <repo-name>
```

2. Install dependencies:
```bash
npm install
```

## Running the Project

### Development Mode
```bash
npm run dev
```
The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CharacterList.vue    # Main list view with infinite scroll
│   ├── CharacterDetail.vue  # Character detail view
│   └── LoadingSpinner.vue   # Reusable loading component
├── services/
│   └── api.js              # API service with caching
├── App.vue                 # Root component
├── main.js                 # Application entry point
└── style.scss              # Global styles
```

## License

ISC

