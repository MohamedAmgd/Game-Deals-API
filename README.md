<h1 align="center">
	<img alt="Logo" src=".github/logo.png" width="200px" />
</h1>

<h3 align="center">
  Game Deals API
</h3>

<p align="center">REST API</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/MohamedAmgd/Game-Deals-API">

  <a href="https://www.linkedin.com/in/mohamedamgd/">
    <img alt="Made by" src="https://img.shields.io/badge/made_by-Mohamed_Amgd-green">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/MohamedAmgd/Game-Deals-API">

  <a href="https://github.com/MohamedAmgd/Game-Deals-API/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MohamedAmgd/Game-Deals-API">
  </a>

  <a href="https://github.com/MohamedAmgd/Game-Deals-API/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/MohamedAmgd/Game-Deals-API">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/MohamedAmgd/Game-Deals-API?cacheSeconds=0">
</p>

<p align="center">
  <a href="#-about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-license">License</a>
</p>

## 👨🏻‍💻 About the project

- <p style="color: red;">A REST API that serves most of the deals and discounts on PC games for <a href="https://github.com/MohamedAmgd/Game-Deals">Game Deals App</a>
- It serves the discounts in famous stores like:-
  <ul>
- Steam
- Origin
- Epic Games
- GOG
  </ul>

</p>

## 🚀 Technologies

Technologies that I used to develop this REST API

- [Node JS v16](https://nodejs.org/en/blog/release/v16.16.0)
- [Typescript v4](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html)
- [Express v4](https://expressjs.com/en/api.html)
- [Nest JS](https://docs.nestjs.com/)
- [Axios](https://axios-http.com/)
- [Rx JS](https://rxjs.dev/)
- [Cheerio](https://cheerio.js.org/)
- [Cache Manager](https://github.com/node-cache-manager/node-cache-manager)

## 💻 Getting started

### Requirements

- Make sure nodejs is installed, you could check using this command

```bash
$ node --version
# v16.16.0
```

## Installation

#### Using npm

```bash
$ npm install
```

#### Using yarn

```bash
$ yarn install
```

## Running the app

#### Using npm

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

#### Using yarn

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Deploying to Vercel

Vercel detects `src/main.ts` as the NestJS entry point and deploys the API as a
Node.js function. Import the repository into Vercel and deploy it with the
default build settings; no output directory or route rewrites are required.

The deployment uses Node.js 22. Use `GET /health` as a deployment health check.

`APP_URL` is optional on Vercel because generated image links use the automatic
`VERCEL_URL`. Set `APP_URL` in the Vercel project environment only when links
should always use a custom domain, for example `https://api.example.com`.

## 🤔 How to contribute

**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork MohamedAmgd/Game-Deals-API
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd Game-Deals-API

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch

## 📝 License

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details.

---

Made by Mohamed Amgd 👋 [See my linkedin](https://www.linkedin.com/in/mohamedamgd/)
