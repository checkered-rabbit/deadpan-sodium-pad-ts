Welcome to Glitch with typescript
=================

Click `Show` in the editor to see your app live. Updates to your code will deploy in about 3 seconds and update live.

Based on [hello-sqlite](https://glitch.com/edit/#!/hello-sqlite?path=README.md:1:0), converted to typescript.
Compilation fast enought for life show. Watching of *.ts for life show works. There is also a Config for vscode.

**Work in progress**

---

---

Play with this Project
------------

On the front-end,
- open show. Change the text in `public/other_mod.ts` and see the dreams in the webpage change.
- edit `public/client_real.ts`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server/server_real.ts`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)

This app has a database!
- this app uses sqlite but you can power your apps with [a number of other storage options](https://glitch.com/storage)
- `sqlite.db` is created and put into the `.data` folder, a hidden directory whose contents aren’t copied when a project is remixed. you can see the contents of `.data` in the console under "Logs"

Modifications to hello-sqlite
-----------------------------

- Glitch must watch typescript files. See `watch.json`.
- Launching is more complex because of compilation. Moved that to `start.sh`.
- There are multiple ways to compile (to es6,es3, packed or native modules; external watchers etc).
By default `npm run start` runs the glitch-friendly version. 
If `START` is set in `.env`, `npm run start` picks that choice in `start.sh`.
- Glitchs "show" reloads the page when the typescript file changes. 
`app.get('/' ...` contains a delay, because he watcher must compile first.
Default delay is in `server/debug.ts` and configurable with `DELAY` in `.env`.

Spam :-)
---------------

**Glitch** is the friendly community where you'll build the app of your dreams. Glitch lets you instantly create, remix, edit, and host an app, bot or site, and you can invite collaborators or helpers to simultaneously edit code with you.

Find out more [about Glitch](https://glitch.com/about).

Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
