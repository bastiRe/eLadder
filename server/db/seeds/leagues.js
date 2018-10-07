const shortid = require('shortid');

exports.seed = async function(knex, Promise) {
  await knex('teams').del();
  await knex('players').del();
  await knex('games').del();
  await knex('leagues').del();
  // Inserts seed entries
  await knex('leagues').insert([
    { id: shortid.generate(), title: 'Bundesliga' }
  ]);
  const league = await knex('leagues')
    .select()
    .first();

  await knex('players').insert([
    { id: shortid.generate(), name: 'Lewandowski', league_id: league.id },
    { id: shortid.generate(), name: 'Kimmich', league_id: league.id }
  ]);

  const players = await knex('players').select();

  await knex('games').insert([
    {
      id: shortid.generate(),
      scores: JSON.stringify([1, 2]),
      league_id: league.id,
      date: new Date()
    },
    {
      id: shortid.generate(),
      scores: JSON.stringify([2, 3]),
      league_id: league.id,
      date: new Date()
    }
  ]);

  const games = await knex('games').select();

  return knex('teams').insert([
    { player_id: players[0].id, game_id: games[0].id, team_id: 0 },
    { player_id: players[1].id, game_id: games[0].id, team_id: 1 },
    { player_id: players[1].id, game_id: games[1].id, team_id: 0 },
    { player_id: players[0].id, game_id: games[1].id, team_id: 1 }
  ]);
};
