# No-Code-Red-Flags

A web application to analyze and highlight potential red flags in no-code projects. Built with React, TypeScript, and Vite, and uses Upstash for database storage. Deployed on Netlify.

## Features
- Analyze no-code projects for common issues
- Cache and reuse analysis results
- Share analysis results via unique links
- Clean, modern UI with reusable components

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Backend/Serverless:** Netlify Functions
- **Database:** Upstash (Redis)
- **Deployment:** Netlify

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/cold-cofffeee/No-Code-Red-Flags.git
   cd No-Code-Red-Flags
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Environment Variables
Create a `.env` file in the root directory and add your Upstash credentials:
```
VITE_UPSTASH_REDIS_REST_URL=your_upstash_redis_url
VITE_UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

### Running Locally
To start the development server:
```sh
npm run dev
# or
yarn dev
```
Visit `http://localhost:5173` in your browser.

### Building for Production
To build the app for production:
```sh
npm run build
# or
yarn build
```
The output will be in the `dist/` folder.

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Set the build command to `npm run build` and the publish directory to `dist`.
3. Add your environment variables in Netlify dashboard.
4. Ensure a `_redirects` file exists in the root for SPA routing.

## Project Structure
```
├── App.tsx
├── components/
│   ├── AboutPage.tsx
│   ├── ...
│   └── icons/
├── services/
│   ├── analyzeWithCache.ts
│   ├── cacheService.ts
│   └── geminiService.ts
├── netlify/functions/
│   └── cache.js
├── public/
│   └── _redirects
├── types.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

## License
MIT

---

Feel free to contribute or open issues for suggestions and improvements!
