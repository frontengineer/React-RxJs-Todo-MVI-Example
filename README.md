# Very Basic-Isomorphic-React-Boilerplate
Very basic demo. There are [nicer boilerplates](https://github.com/enaqx/awesome-react#boilerplates), but if you are newb like me and it helps to *see it to get it*, here is a very basic look at:
* Isomorphic JS - entry.js vs server.js;
* Webpack - setup, dev vs prod
* Building JS - npm scripts in package.json

* This demo is hardly inclusive, there is lots more to learn about: server/client sharing state, data-fetching, react content, webpack code splitting, and so on...

## Stack
* React
* React Router
* Babel
* Webpack with **dev** and **prod** configs
* Handlebars

## Installation
In the project directory run
```
$ npm install
```

## Fire it Up!
When the servers are started, visit [localhost:3000](http://localhost:3000) to see a page.

### Dev Mode
* Start the Webpack Dev Server using webpack.config.development for Hot Module reloading (like livereload)
* Start server.js w/NODE_ENV=development
```
$ npm run dev
```

### Production Build and Run
* Fire webpack -p using webpack.config.production
* Start server.js w/NODE_ENV=production
```
$ npm run build
$ npm start
```

## Newb Notes & Lessons Learned
Things I banged my head on.

#### Isomorphic React
1. Rendering server-side I could not get JSX style <Handler/> to work inside server.js, so I switched (valid) to React.renderToStaticMarkup.
2. ...React.createElement works too, but there can be "diffing" problems with the client side React routing...throwing a React checksum error...(sort of like a merge conflict)

#### Webpack
1. There is webpack and webpack-dev-server.
2. webpack
  1. Run with --flags or target config via --config
  2. When using a webpack.config
    1. Use a **dev** version without minify/uglify etc; that slows down hot module reloading.
    2. Use a **prod** version without things like "hot," or you will see unwanted socket.io 404s from your prod pages.
  3. Use via CLI at any time to quick-create a *[bundle].js* probably in some output **dist** folder
  4. Once prod-ready call *bundle.js* from your index.html
3. webpack-dev-server
  1. Working in Dev mode you have:
    1. Node process 1: expess app running ex: localhost:3000
    2. Node process 2: webpack-dev-server serving assets ex: localhost:8080
    3. Node process 1 is calling javascript-src=Node process 2 output/bundle.js
  2. Used while in Dev Mode where it is essentially running live in memory (building, rebuilding) the required() assets and live updating express app state.

#### Build
1. Can use "webpack" command from: npm, CLI, gulp, grunt to get your bundle where you want it.
2. Fire up prod express app targeting said bundle.
