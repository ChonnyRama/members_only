#! /usr/bin/env node

const { Client } = require("pg")
require('dotenv').config();

const CREATE_MEMBERS = `
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ) UNIQUE NOT NULL,
  email VARCHAR ( 255 ),
  first_name TEXT,
  last_name TEXT,
  password VARCHAR ( 255 ),
  membership TEXT
);
`;

const CREATE_MESSAGES = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message TEXT,
  title VARCHAR ( 255 ),
  timestamp TIMESTAMP,
  user_id INTEGER REFERENCES members(id)
);
`;

const CREATE_SESSIONS = `
CREATE TABLE IF  NOT EXISTS sessions (
  session_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  sid VARCHAR NOT NULL UNIQUE,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
)
`

async function main() {
  console.log("seeding");
  const client = new Client()
  await client.connect()
  await client.query(CREATE_MEMBERS)
  await client.query(CREATE_MESSAGES)
  await client.query(CREATE_SESSIONS)
  await client.end();
  console.log("done")
}

main()