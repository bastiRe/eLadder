import Knex from "knex";
import { Model } from "objection";
import pg from "pg";
import Moment from "moment";

// Use Moment for date types
const types = pg.types;

const TIMESTAMPTZ_OID = 1184;
const TIMESTAMP_OID = 1114;

const parseFn = val => {
  return val === null ? null : Moment(val).toISOString();
};

types.setTypeParser(TIMESTAMPTZ_OID, parseFn);
types.setTypeParser(TIMESTAMP_OID, parseFn);

// Use pg with knex
const knex = Knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  },
  debug: process.env.NODE_ENV === "development"
});

Model.knex(knex);
