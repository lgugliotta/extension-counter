<h1 align="center">Welcome to github-extension-counter 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Get all files extensions from GitHub repo

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run develop

```sh
npm run dev
```

## Run tests

```sh
npm run test
```

## Endpoint

```sh
POST /repo/extension-count HTTP/1.1
Host: localhost:3000
Content-Type: application/json

Body:
{
    "repoURL": "https://github.com/argoproj/argo-site"
}

Example Response:
{
    "md": 194,
    "svg": 216,
    "gif": 1,
    "png": 11,
    "mdx": 4,
    "js": 34,
    "json": 1,
    "scss": 3,
    "woff": 2,
    "woff2": 2,
    "lock": 1
}
```

## Author

👤 **Leandro Gugliotta**

* Github: [@lgugliotta](https://github.com/lgugliotta)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
