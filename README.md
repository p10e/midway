# sanity-template-midway

_An opinionated starter template for Gatsby + Sanity + Shopify._

This template repo is used by Sanity.io to easily create deployed and configured projects through a web interface.

The template contains both a Sanity Studio with dynamic product imports from Shopify and a fresh Gatsby theme to show off your products. Both are deployed on Netlify.

Want to make a template for Sanity and your favourite front-end framework? We’re still maturing [sanity.io/create](https://sanity.io/create) and our APIs, but do tell us about it on [slack.sanity.io](https://slack.sanity.io).

![The Sanity and Gatsby powered front-end](https://github.com/p10e/sanity-template-midway/blob/master/assets/frontend.jpg?raw=true)

## Local development

You develop the templates in `/template`, and review your changes in `/build`.

1. **Install dependencies with `npm install` in the root folder.** This will install the template development tool that watches changes in the `/template` folder and output the template to `/build`.

2. **Run `npm run dev` in root folder.** This will build the template files to `/build`. This is how the code will look for those who install the project later.

3. **Run `npm install` in `./build/web` and `sanity install` in `/build/studio`** This will install the necessary dependencies for the Gatsby frontend and the Studio.

4. **Run `npm run dev` in `./build/web` and `sanity start` in `/build/studio`**. This will start the development servers for the Gatsby frontend and Sanity Studio.
