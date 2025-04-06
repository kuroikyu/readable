# ![readable](./src/assets/readable.png)
Your friendly neighborhood book reader.


## Pages
- [x] /login
- [x] /signup
- [x] / (just / but lists books)
- [x] /read?b=:id
- [x] /read/stats?b=:id


## Tools
- [Vite (React)](https://vite.dev/)
- [React Router](https://reactrouter.com/home)
- [json-server](https://www.npmjs.com/package/json-server)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [redux](https://react-redux.js.org/)
- [Lucide](https://lucide.dev/)


## How to run
From the root of the project install dependencies.
```sh
pnpm install
```

Build the frontend.
```sh
pnpm run build
```

Run the app. This should be available under `http://localhost:4173` but watch the terminal for more details.
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

