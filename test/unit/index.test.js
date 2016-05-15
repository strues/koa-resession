import { assert } from 'chai';
import ReSession from '../../lib/index';
import rethinkdbdash from 'rethinkdbdash';

const dbConfig = {
  host: process.env.RDB_HOST || '10.211.55.7',
  port: process.env.RDB_PORT || 28015,
  db: 'resession_test'
};

describe('ReSession', () => {
  const connection = rethinkdbdash(dbConfig);
  const TEST_DB = 'resession_test';
  const TEST_TABLE = 'session';

  function makeReSession() {
    return new ReSession({
      connection,
      db: TEST_DB,
      table: TEST_TABLE
    });
  }
});
