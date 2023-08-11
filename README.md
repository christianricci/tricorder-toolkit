# Welcome to the Tripcorder "Desktop Toolkit"

Called Tricorder in reference to the multi-purpose tool from the Star Trek TV series. This tool will help you perform tasks in your desktop much smarter.

## Features

* "Clipboard" to recall the content of your recent 100 clipboard. Use Left arrow key (refresh), Enter/Click (copy)
* "ToDo" to quickly store sticky notes and recall them later, so you don't forget the idea.
* "CTRL+R" to copy text or commands commonly used into clipboard (mimic famous and powerfull linux CTRL+R).
* "Timebox" to set a countdown and make sure you spend the right amount of time in a task. Once time is reached you will be notified.
* More stuff coming...

## Project components

The project is made of 2 main parts

```
tricorder-toolkit/
├── LICENSE
├── README.md
├── tricorder-api
│   ├── README.md
│   ├── app.js
│   ├── bin
│   ├── lib
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── routes
│   └── views
└── tricorder-user-interface
    ├── README.md
    ├── build
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    ├── playwright.config.ts
    ├── postcss.config.cjs
    ├── src
    ├── src-tauri
    ├── static
    ├── svelte.config.js
    ├── tailwind.config.cjs
    ├── tests
    ├── tsconfig.json
    └── vite.config.ts
```

`tricorder-api` is a NodeJs express server that manage the clipboard history. This API server needs to be started in order for the User interface to work.

`tricorder-user-interface` this is the UI that brings all the funcionality. It uses `svelte` and `tauri` that allow to create a rust executable and installer for different OS. 

# API Server

How to start the API server.
```
DEBUG=tricorder-api:* npm start
```

# User Interface Installation (Not needed)

## Create a project from Scratch 

Follow steps from https://tauri.app/v1/guides/getting-started/setup/sveltekit

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building executable 

Follow steps from https://tauri.app/v1/guides/building/

To create a production version of your app:

```bash
npm run tauri build
```

You will find the executable and installer in the output of the command. Example for MacOS
```
...
...
> Using @sveltejs/adapter-static
  Wrote site to "build"
  ✔ done
✓ built in 11.46s
   Compiling app v0.1.0 (/Users/riccic/Documents/gogs.lan/tricorder-toolkit/tricorder-user-interface/src-tauri)
    Finished release [optimized] target(s) in 29.18s
    Bundling tricorder-user-interface.app (/Users/riccic/Documents/gogs.lan/tricorder-toolkit/tricorder-user-interface/src-tauri/target/release/bundle/macos/tricorder-user-interface.app)
    Bundling tricorder-user-interface_0.1.0_x64.dmg (/Users/riccic/Documents/gogs.lan/tricorder-toolkit/tricorder-user-interface/src-tauri/target/release/bundle/dmg/tricorder-user-interface_0.1.0_x64.dmg)
     Running bundle_dmg.sh
    Finished 2 bundles at:
        /Users/riccic/Documents/gogs.lan/tricorder-toolkit/tricorder-user-interface/src-tauri/target/release/bundle/macos/tricorder-user-interface.app
        /Users/riccic/Documents/gogs.lan/tricorder-toolkit/tricorder-user-interface/src-tauri/target/release/bundle/dmg/tricorder-user-interface_0.1.0_x64.dmg
```
