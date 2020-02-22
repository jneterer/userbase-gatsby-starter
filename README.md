# Gatsby Starter - Userbase, TailwindCSS, Sass, & Typescript

This [Gatsby](https://www.gatsbyjs.org/) starter project is for [Userbase](https://userbase.com/) web apps. It also uses [TailwindCSS](https://tailwindcss.com/) for the styling framework, the preprocessor [Sass](https://sass-lang.com/), and [Typescript](https://www.typescriptlang.org/).

## Getting Started

Assuming that you already have gatsby installed, install the Userbase Gatsby Starter:
> gatsby new userbase-gatsby https://github.com/jneterer/userbase-gatsby-tailwind-typescript

### Running in development

`npm run develop`

### Set up basic environment variables

Create a `.env` file in the root of your project. Add a new environment variable `GATSBY_REACT_APP_USERBASE_APP_ID={YOUR_USERBASE_APP_ID}` replacing `{YOUR_USERBASE_APP_ID}` with the app id listed in your userbase account.

Next, add this at the beginning of your `gatsby-config.js` file to allow for environment variable support:

```
require("dotenv").config({
  path: `.env`,
})
```
## Thanks!
Thank you for trying out my Userbase Gatsby Starter project! You can find me here: [My Site](https://jacobneterer.com), [Twitter](https://twitter.com/jacobneterer), and [LinkedIn](https://www.linkedin.com/in/jacobneterer).
