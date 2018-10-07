exports.up = function(knex, Promise) {
  return knex.schema.alterTable("players", function(table) {
    table.unique(["name", "league_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("players", function(table) {
    table.dropUnique(["name", "league_id"]);
  });
};
