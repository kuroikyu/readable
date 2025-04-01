# Readable
Your friendly neighborhood book reader.


## Pages
- [ ] /login
- [ ] /signup
- [ ] /books
- [ ] /read?b=:id
- [ ] /me
- [ ] /me/stats


## Tools
- [Vite (React)](https://vite.dev/)
- [React Router](https://reactrouter.com/home)
- [json-server](https://www.npmjs.com/package/json-server)


## How to run
From the root of the project install dependencies.
```sh
pnpm install
```

Build the frontend.
```sh
pnpm run build
```

Run the app.
```sh
pnpm run preview
```

Want to deploy to a cloud provider? Check Vite's documentation [here to learn more](https://vite.dev/guide/static-deploy.html).


## How to develop
From the root of the project install dependencies.
```sh
pnpm install
```

Start the database. This should be available under `http://localhost:3000` but watch the terminal for more details. Keep running for the frontend to access it.
```sh
pnpm run server
```

Start the frontend. This should be available under `http://localhost:5173` but watch the terminal for more details.
```sh
pnpm run dev
```

