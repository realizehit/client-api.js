# realizehit-client-api [![Build Status](https://travis-ci.org/realizehit/client-api.js.svg?branch=master)](https://travis-ci.org/realizehit/client-api.js)

realizehit API Client

Probably you might want to use [realizehit/realizehit](https://github.com/realizehit/realizehit) instead.

## Usage

#### Run as NPM module

```bash
npm i -g realizehit-client-api
```

```javascript
var APIClient = require( 'realizehit-client-api' )
var client = new APIClient( 'https://realizehit.example.com/' )

// Publish something cool
client.publish(
    // On
    {
        kind: 'news',
        channel: 'CNN'
    },
    {
        id: 'deeznuts',
        title: 'deez nuts went viral',
        body: 'this might seem crazy, but right now I am lazy to write some textzy'
    }
)

// Callbacks? I promise not!!
client
.publish({ foo: 'bar' }, 'amazing' )
.then(function () {
    console.log( 'I am a dummy message, just to warn everything went ok' )
})
.catch(function ( err ) {
    console.log( 'Dope!!1 Simpsons error here' )
})

```

#### Run from the command-line (WIP)

Not developed, just an idea, want to develop it?

## Contributing

### Running with node

```bash
npm install
npm start
```

### Running with docker

```bash
docker build -t realizehit/client-api:dev .
docker run -d -p 8080:8080 realizehit/client-api:dev
```
