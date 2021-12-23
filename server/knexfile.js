module.exports = {
  development: {
    client: 'pg',
    debug: true,
    connection: {
      host: 'localhost',
      port: 5431,
      user: 'eladderUser',
      password: 'eladderpwd',
      database: 'eladderdb'
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      directory: './db/migrations'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: true,
    migrations: {
      directory: './db/migrations'
    }
  }
};
