# Koa-ReSession

![Build Status](https://img.shields.io/travis/strues/resession.svg)
![Coverage](https://img.shields.io/coveralls/strues/resession.svg)
![Downloads](https://img.shields.io/npm/dm/resession.svg)
![Downloads](https://img.shields.io/npm/dt/resession.svg)
![npm version](https://img.shields.io/npm/v/resession.svg)
![dependencies](https://img.shields.io/david/strues/resession.svg)
![dev dependencies](https://img.shields.io/david/dev/strues/resession.svg)
![License](https://img.shields.io/npm/l/resession.svg)

RethinkDB session storage for Koa 2.

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

Koa-ReSession depends on rethinkdbdash or the default rethinkdb node.js driver. In addition,
it is built with koa-generic-session in mind, and based off of koa-generic-session-rethinkdb.

Session information is made available on ctx.session.

## License

MIT
