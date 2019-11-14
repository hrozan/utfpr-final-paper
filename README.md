# :computer: Computer Engineer Final Paper  

## :mortar_board: UTFPR - Universidade Tecnológica Federal do Paraná

This is repo contains all source code from my implementation

```bash
.
├── fp-api # Web API for authentication e log store
└── fp-client # React PWA

```

### :rocket: Getting Started

### Client and API

Install dependencies

```bash
npm i && cd fp-client && npm i && cd ../fp-api && npm i
```

Set Up __.env__

```bash
cp fp-api/.env.example fp-api/.env
```

Run project in developmet

```bash
npm run dev
```

Single project

```bash
npm run dev-client # run just client  
npm run dev-api # run just api
```

#### Smart Object

Create _credentials.json_

```
touch fp-rasp/credentials.json
```


```json
[
  {
    "username": "<username>",
    "password": "<password>"
  }
]

```

### :seedling: Seed

To seed the database:

Create _users.json_

```
touch fp-api/database/seed/users.json
```

Enter  users credential:
```json
// users.json
[
  {
    "username": "<username>",
    "email": "<email>",
    "password": "<password>"
  }
]

```

Run seed:

```bash
npm run seed
```

###  :page_facing_up: License

This project is licensed under the terms of the [MIT license](/LICENSE)

### References

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)

---
  __Author__: :busts_in_silhouette: [Higor Augusto Bassi Rozan](https://github.com/hrozan)
