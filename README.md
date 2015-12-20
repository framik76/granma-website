# immobiliaregranma.it

## Development environment setup

After cloning the repository, run `npm install` to install all dependencies and
`npm run dev` to start the development server.

## Configuration

The application can be configured via environment variables: any environment
variable `__CONFIG__${VARIABLE_NAME}` will end up in the app as
`process.env.${VARIABLE_NAME}`. (WARNING: injection done via webpack's
DefinePlugin, which uses string replacement. `process.env.${VARIABLE_NAME}` does
not therefore behave as a regular JavaScript variable)

Configuration options:

* `API_URL`: the thrift server url. Example `http://127.0.0.1:9999/api   `
