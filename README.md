# Gatsby Starter - Userbase, TailwindCSS, Sass, & Typescript [![Netlify Status](https://api.netlify.com/api/v1/badges/1a5f926a-5ec4-4180-a217-d8b99b9ecd48/deploy-status)](https://app.netlify.com/sites/userbase-gatsby-starter/deploys)

This [Gatsby](https://www.gatsbyjs.org/) starter project is for [Userbase](https://userbase.com/) web apps. It ships with all user and data APIs! The app uses [TailwindCSS](https://tailwindcss.com/) for the styling framework, the preprocessor [Sass](https://sass-lang.com/), and [Typescript](https://www.typescriptlang.org/).

## Demo Site

The demo site for this project can be found [here](https://userbase-gatsby-starter.jacobneterer.com/).

## Getting Started

Assuming that you already have gatsby installed, install the Userbase Gatsby Starter:
```
gatsby new userbase-gatsby https://github.com/jneterer/userbase-gatsby-starter
```

### Running in development

`gatsby develop`

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
