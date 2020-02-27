# FinancesApp Backend
Backend

## Requeriments
> You need to install this requirements to run this project
- Node.js (Yarn or npm)
- Docker

## Development setup
> Follow the steps below to run this project

1. Clone this repository

```sh
# ssh
git clone git@github.com:leobittencourt/finances-backend.git

# or https
git clone https://github.com/leobittencourt/finances-backend.git
```

2. Install all node dependencies of the project

```sh
cd finances-backend

yarn # or npm install
```

3. Copy the `.env.example` and create a new env file named `.env`

```sh
cp .env.example > .env
```

4. Update the database credentials in the `.env` file

```sh
DB_CONNECTION=pg
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=
```

5. Run the database of project

```sh
docker-compose up -d finances_database
```

6. Run server

```sh
yarn dev
```

7. Ready! Now, you can access the project's API.

```ssh
curl 'http://localhost:3333/' -H 'accept: application/json'
```

## Release History

* 0.0.1
    * Work in progress

## Meta

Leonardo Brito Bittencourt – leonardobritobittencourt@gmail.com
