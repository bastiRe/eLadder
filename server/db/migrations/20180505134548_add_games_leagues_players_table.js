exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('leagues', function(table) {
      table
        .string('id')
        .notNullable()
        .primary();
      table.string('title').notNullable();
      table.timestamps(true, true);
    })
    .createTable('players', function(table) {
      table
        .string('id')
        .notNullable()
        .primary();
      table.string('name').notNullable();
      table
        .string('league_id')
        .references('id')
        .inTable('leagues')
        .notNullable()
        .onDelete('CASCADE')
        .index();
      table.timestamps(true, true);
    })
    .createTable('games', function(table) {
      table
        .string('id')
        .notNullable()
        .primary();
      table.jsonb('scores').notNullable();
      table
        .string('league_id')
        .references('id')
        .inTable('leagues')
        .notNullable()
        .onDelete('CASCADE')
        .index();
      table.dateTime('date').notNullable();
      table.timestamps(true, true);
    })
    .createTable('teams', function(table) {
      table
        .increments('id')
        .notNullable()
        .primary();
      table
        .string('player_id')
        .references('id')
        .inTable('players')
        .notNullable();
      table
        .string('game_id')
        .references('id')
        .inTable('games')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('team_id').notNullable();
      table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('teams')
    .dropTableIfExists('games')
    .dropTableIfExists('players')
    .dropTableIfExists('leagues');
};
