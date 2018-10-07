import BaseModel from "./BaseModel";

class League extends BaseModel {
  static tableName = "leagues";

  static jsonSchema = {
    type: "object",
    required: ["title"],

    properties: {
      id: { type: "string", minLength: 1, maxLength: 255 },
      title: { type: "string", minLength: 1, maxLength: 255 },
      createdAt: { type: "date" },
      updatedAt: { type: "date" }
    }
  };

  static relationMappings = {
    games: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Game`,
      join: {
        from: "leagues.id",
        to: "games.league_id"
      }
    },
    players: {
      relation: BaseModel.HasManyRelation,
      modelClass: `${__dirname}/Player`,
      join: {
        from: "leagues.id",
        to: "players.league_id"
      }
    }
  };

  static async create({ title }) {
    return League.query()
      .insert({ title: title.trim() })
      .returning("*");
  }
}

export default League;
