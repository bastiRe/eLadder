import BaseModel from "./BaseModel";

class Player extends BaseModel {
  static tableName = "players";

  static jsonSchema = {
    type: "object",
    required: ["name", "leagueId"],

    properties: {
      id: { type: "string", minLength: 1, maxLength: 255 },
      name: { type: "string", minLength: 1, maxLength: 255 },
      leagueId: { type: "string", minLength: 1, maxLength: 255 },
      createdAt: { type: "date" },
      updatedAt: { type: "date" }
    }
  };

  static relationMappings = {
    league: {
      relation: BaseModel.BelongsToOneRelation,
      modelClass: `${__dirname}/League`,
      join: {
        from: "players.league_id",
        to: "leagues.id"
      }
    },
    games: {
      relation: BaseModel.ManyToManyRelation,
      modelClass: `${__dirname}/Game`,
      join: {
        from: "players.id",
        through: {
          from: "teams.player_id",
          to: "teams.game_id"
        },
        to: "games.id"
      }
    }
  };

  static async create({ name, leagueId }) {
    return this.query()
      .insert({
        name: name.trim(),
        leagueId
      })
      .returning("*");
  }

  static async deleteById(id) {
    const player = await this.query().findById(id);
    if (!player) return false;

    try {
      await this.knex().transaction(async trx => {
        await player.$relatedQuery("games", trx).delete();
        return this.query(trx)
          .delete()
          .where("id", id);
      });
    } catch (e) {
      throw new Error("Player can not be deleted.");
    }

    return true;
  }
}

export default Player;
