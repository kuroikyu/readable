# ![readable](./src/assets/readable.png)
Your friendly neighborhood book reader.


## Pages
- `/` (home) Lists all the books available for reading. 
- `/read?b=:id` - Book reader, here the book contents are navigable. Requires user athentication.
- `/read/stats?b=:id` - Statistics page that comes up after each reading session. Also accessible via direct link. Requires user authentication.
- `/login` - Allows the user to sign in. Will redirect the user back to where they came from if they were redirected in the first place. E.g.: Accessing `/read` annonymously.
- `/signup` - Premits the user to create an accont to use the site.

## Future improvement ideas
- [ ] Add buttons to increase or decrease the reading font
- [ ] Add an option to switch the reading font to Open Dyslexic or other choices
- [X] Navigate the reader with the keyboard: arrow keys, `H` & `L`, and exit with `Esc`
- [ ] Implement user pages `/profile` `/reading` and `/favorites`
- [ ] Open a book on the last page you read
- [ ] Recommend similar or related books after finishing a book


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

Create or update `.env` to include a reference to the url of your database.
```ini
VITE_API_BASE_URL=http://localhost:3000
```

Build the frontend.
```sh
pnpm run build
```

Start the database. This should be available under `http://localhost:3000` but watch the terminal for more details. Keep running for the frontend to access it.
```sh
pnpm run server
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

Create or update `.env` to include a reference to the url of your database.
```ini
VITE_API_BASE_URL=http://localhost:3000
```

Start the frontend. This should be available under `http://localhost:5173` but watch the terminal for more details.
```sh
pnpm run dev
```

