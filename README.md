# Demo: Randomuser API

This project is built using the [Vite + React + TypeScript](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) template.

Random users are fetched from the [RandomUser API](https://randomuser.me/api) using [React Router 6.4](https://reactrouter.com/en/main/start/overview#data-loading) + the standard Web Fetch API.

Pressing the `Refresh` button in the page tells React Router to make another API call via the `loader` function. You may also save the randomly generated users into `localStorage` by pressing the `Save` button. This lets you edit the information for the saved users at a later time.

## Try it out!

The live demo is deployed at https://randomuser-fetch-demo.netlify.app.

You can also clone this repository into your own machine and run a local copy of the demo app:

```sh
# clone this repository
git clone https://github.com/Insidiae/randomuser-fetch-demo.git

# install dependencies
npm install

# run the app!
npm run dev
```
