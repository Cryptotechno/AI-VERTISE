# AI-VERTISE

AI-powered media mix optimization calculator built with React, TypeScript, and Tailwind CSS.

## Features

- AI-driven media channel allocation
- Real-time budget optimization
- Interactive visualization with Chart.js
- Animated UI with Framer Motion
- Responsive design with Tailwind CSS
- Export to Excel functionality

## Live Demo

Visit the live demo at [https://nataliiamakota.github.io/AI-VERTISE/](https://nataliiamakota.github.io/AI-VERTISE/)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nataliiamakota/AI-VERTISE.git
cd AI-VERTISE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` directory.

### Deployment

The project is configured for GitHub Pages deployment. To deploy:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Update the `base` field in `vite.config.ts` with your repository name
3. Run the deploy command:
```bash
npm run deploy
```

Or push to the main branch to trigger automatic deployment via GitHub Actions.

## Technology Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Chart.js
- React Icons
- XLSX

## Project Structure

```
AI-VERTISE/
├── src/
│   ├── components/
│   │   └── sections/
│   │       ├── About.tsx
│   │       ├── Calculator.tsx
│   │       └── Contact.tsx
│   ├── assets/
│   └── App.tsx
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
