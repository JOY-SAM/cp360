# CP360 React Big Calendar

A brief description of your project.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/JOY-SAM/cp360.git
    cd cp360/react
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

### Development

To run the application in development mode:

```bash
npm run dev
```

This will start a development server, and you can usually access the application at `http://localhost:5173`.

### Build

To build the application for production:

```bash
npm run build
```

This will compile the TypeScript code and bundle the assets into the `dist` directory.

### Lint

To lint the codebase:

```bash
npm run lint
```

### Preview

To preview the production build locally:

```bash
npm run preview
```

## Technologies Used

*   React
*   TypeScript
*   Vite
*   Redux Toolkit
*   Tailwind CSS
*   date-fns
*   react-big-calendar
*   recharts

## Project Structure

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── BarGraph.tsx
│   ├── redux/
│   │   ├── hooks.ts
│   │   ├── slices/
│   │   │   └── calendarSlice.ts
│   │   └── store.ts
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .eslintrc.cjs
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
