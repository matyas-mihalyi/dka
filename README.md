# DKA viewer
##### A SvelteKit project built around Digitális Képarchívum's record of pictures

This project aims to bring you the fascinating collection of the National Széchényi Library in a more accessible, responsive format. You can view images and read additonal information provided by the library.

## How does it work?

Using SvelteKit endpoints, random records from the [public database](https://dka.oszk.hu/export/xml_/) are fetched.
Unfortunately every post is stored in its own XML record. This makes it difficult to add search functionality or listing records by topics without too many requests.
However, at a later point I would like to scrape the database and build my own API, which would solve these problems.

The fethced records are converted from XML to javascript objects with the [xml-js](https://www.npmjs.com/package/xml-js) npm package and some of their keys are exposed to the components.

Posts can be saved to the bowser's local storage.

## Future plans for the project

Additional features I would like to add:
* unit and E2E tests
* dark mode
* image viewer with pinch zoom on mobile

## Running the project locally

1. fork the project
2. run `npm install`
3. run `npm run dev`