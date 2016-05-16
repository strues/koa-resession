# Koa-ReSession

![Build Status](https://img.shields.io/travis/strues/koa-resession.svg)
![Coverage](https://img.shields.io/coveralls/strues/koa-resession.svg)
![Downloads](https://img.shields.io/npm/dm/koa-resession.svg)
![Downloads](https://img.shields.io/npm/dt/koa-resession.svg)
![npm version](https://img.shields.io/npm/v/koa-resession.svg)
![dependencies](https://img.shields.io/david/strues/koa-resession.svg)
![dev dependencies](https://img.shields.io/david/dev/strues/koa-resession.svg)
![License](https://img.shields.io/npm/l/koa-resession.svg)

RethinkDB session storage for Koa 2. Uses async/await in favor of generator functions.

## Getting Started

Install it via npm:

```shell
npm install koa-resession
```

And include in your project:

```javascript
import ReSession from 'koa-resession';
import session from 'koa-generic-session';
import rethinkdbdash from 'rethinkdbdash';

const sessionStore = new ReSession({
  connection: rethinkdbdash({host: 'localhost', port: 28015, db: 'session'}),
  browserSessionsMaxAge: 5000,
  db: 'session',
  table: 'sessions'
});
sessionStore.setup();
export default convert(session({
  store: sessionStore
}));
```

`koa-resession` depends on [rethinkdbdash](https://github.com/neumino/rethinkdbdash) or the default rethinkdb node.js driver. In addition,
it is built for use with [koa-generic-session](https://github.com/koajs/generic-session). This project is based off of  
[koa-generic-session-rethinkdb](https://github.com/KualiCo/koa-generic-session-rethinkdb). Unfortunately that project seems unmaintained and has a dependency on co due to its usage of generators.

Session information is made available on ctx.session.

## License

MIT

## ToDo
- Finish writing tests
- Show a better example.
