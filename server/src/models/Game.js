import { ValidationError } from "objection";
import BaseModel from "./BaseModel";
import Player from "./Player";

class Game extends BaseModel {
  static tableName = "games";

  static jsonSchema = {
    type: "object",
    required: ["scores", "leagueId", "date"],

    properties: {
      id: { type: "string", minLength: 1, maxLength: 255 },
      scores: { type: "array" },
      leagueId: { type: "string", minLength: 1, maxLength: 255 },
      date: { type: "date" },
      createdAt: { type: "date" },
      updatedAt: { type: "date" }
    }
  };

  static relationMappings = {
    league: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/League`,
      join: {
        from: "games.league_id",
        to: "leagues.id"
      }
    },
    players: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Player`,
      join: {
        from: "games.id",
        through: {
          from: "teams.game_id",
          to: "teams.player_id",
          extra: ["team_id"]
        },
        to: "players.id"
      }
    }
  };

  async $beforeInsert(opt, queryContext) {
    await super.$beforeInsert(opt, queryContext);
    await this._validatePlayers();
  }

  async _validatePlayers() {
    const team0 = this.players.filter(player => player.team_id === 0);
    const team1 = this.players.filter(player => player.team_id === 1);
    if (team0.length < 1 || team1.length < 1) {
      throw new ValidationError({
        message: "A team has to consist of at least one player",
        type: "TeamError"
      });
    }
    if (team0.length !== team1.length) {
      throw new ValidationError({
        message: "Both teams need to have the same number of players",
        type: "TeamError"
      });
    }
    const playerIds = this.players.reduce(
      (memo, player) => memo.concat([player["#dbRef"]]),
      []
    );
    const leagueIds = await Player.query()
      .whereIn("id", playerIds)
      .pluck("leagueId");
    const allInLeague = leagueIds.every(leagueId => leagueId === this.leagueId);
    if (!allInLeague) {
      throw new ValidationError({
        message: "Player has to be in the league to be added to game",
        type: "TeamError"
      });
    }
  }

  static async create({ leagueId, date, teamIds }) {
    const scores = teamIds.map(team => team.score);
    const players = teamIds.reduce((memo, team, index) => {
      team.playerIds.forEach(playerId => {
        memo.push({ "#dbRef": playerId, team_id: index });
      });
      return memo;
    }, []);

    const game = await this.knex().transaction(async trx => {
      return this.query(trx).insertGraph({
        leagueId,
        scores,
        date: new Date(date),
        players
      });
    });

    return game;
  }

  static async deleteById(id) {
    const deletedRows = await Game.query()
      .delete()
      .where("id", id);
    return deletedRows > 0;
  }

  getTeams() {
    return this.scores.map((score, index) => {
      const teamPlayers = this.players.filter(p => p.teamId === index);
      return { players: teamPlayers, score };
    });
  }
}

export default Game;
