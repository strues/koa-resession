import _debug from 'debug';
import _ from 'lodash';
const debug = _debug('ReSession:');

function ReSession(opts) {
  this.connection = opts.connection;
  this.dbName = opts.db || 'sessions';
  this.tableName = opts.table || 'sessions';
  this.clearInt = opts.clearInt || 60000;
  this.browserSessionsMaxAge = opts.browserSessionsMaxAge || 86400000;
}

ReSession.prototype.setup = async function() {
  const errors = [];
  try {
    await this.connection.dbCreate(this.dbName);
  } catch (error) {
    errors.push(error);
  }

  try {
    await this.connection.db(this.dbName).tableCreate(this.tableName);
  } catch (error) {
    errors.push(error);
  }

  try {
    await this.connection.db(this.dbName)
      .table(this.tableName)
      .indexCreate('sid')
      .indexCreate('expires')
      .then(() => {
        this.clearInterval = setInterval(function() {
          this.connection.db(this.dbName).table(this.tableName)
            .between(0, this.r.now(), {
              index: 'expires'
            })
            .delete()
            .run()
            .tap((result) => {
              debug('DELETED EXPIRED %j', result);
            });
        }, this.clearInt || 60000).unref();
      });
  } catch (error) {
    errors.push(error);
  }

  return errors;
};

ReSession.prototype.table = function() {
  return this.connection.db(this.dbName).table(this.tableName);
};

ReSession.prototype.get = async function(sid) {
  debug('get', sid);
  const res = await this.table().getAll(sid, {
    index: 'sid'
  });
  debug('got', res[0]);
  return res[0];
};

ReSession.prototype.set = async function(sid, session) {
  // check if there is a doc with that id
  debug('set', sid, session);
  let res = await this.table().getAll(sid, {
    index: 'sid'
  });

  const expiration = new Date(Date.now() +
  (session.cookie.originalMaxAge || this.browserSessionsMaxAge));

  if (res[0]) {
    res = res[0];
    const payload = _.extend({
      sid,
      id: res.id,
      expires: expiration
    }, session);

    return await this.table().get(res.id).replace(payload);
  } else {
    return await this.table().insert(_.extend({
      sid
    }, session));
  }
};

ReSession.prototype.destroy = async function(sid) {
  debug('destroy', sid);
  const res = await this.table().getAll(sid, {
    index: 'sid'
  });
  if (res[0]) {
    debug('found session to destroy', res[0]);
    return await this.table().get(res[0].id).delete();
  }
};

export default ReSession;
