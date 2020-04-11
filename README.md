[![Netlify Status](https://api.netlify.com/api/v1/badges/8eaa9732-24b9-454c-b1f1-6289ef7d7840/deploy-status)](https://app.netlify.com/sites/gtsport-stats/deploys)


# GT Sport Ratings

### Stack:

- Preact (current bundle = 38kb vs React version of 140kb)
- Typescript
- Rollup for bundling
- tailwindcss through postcss + purgecss
- zustand for state management (hooks only!)
- Netlify functions (for server side post request to gran-turismo API)
- Service workers
- Mobile first. Progressive Web App makes it feel like a native app crossplatform + no update-by-user required

install locally:

- VSCode Tailwind CSS IntelliSense extension for auto complete class names
- Netlify CLI for local development environment incl lambda functions