# Books

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Book journal with spaced repetitions.

![printscreen](/printscreen.png)

## requirements

- `node`
- `ruby`
- `yarn` for managing JS dependencies

## installing

```shell
bundle
yarn
```

## developing

first time:

```shell
rails db:migrate RAILS_ENV=development
rails db:seed
```

then:

```shell
npm start
```

This project uses [commitizen](https://commitizen.github.io/cz-cli/), commit with `npm run commit`

## testing

```shell
npm test
```

## running on production

first, build the necessary images: `docker-compose build`

to launch on production, run `docker-compose up -d`, and then:

start from scratch | restore backup
--- | ---
`bash ./scripts/migrate.sh` | `bash ./scripts/restore.sh`

to backup the DB (while the container is running), run:
```
bash ./scripts/backup.sh
```
