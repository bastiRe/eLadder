import { UserInputError } from "apollo-server";
import League from "../models/League";
import Game from "../models/Game";
import Player from "../models/Player";

export default {
  Query: {
    league: async (_, args, ctx) => {
      return League.query()
        .eager("players")
        .findById(args.id);
    },
    leagues: async (_, args, ctx) => {
      return League.query()
        .eager("players")
        .findByIds(args.ids);
    }
  },
  Mutation: {
    createLeague: async (_, args) => {
      const league = await League.create(args);
      return { league };
    },
    createPlayer: async (_, args, ctx) => {
      try {
        const player = await Player.create(args);
        return { player };
      } catch (error) {
        if (error.constraint !== "players_name_league_id_unique") throw error;

        throw new UserInputError(
          "This player name is already taken in this league."
        );
      }
    },
    deletePlayer: async (_, args) => {
      const success = Player.deleteById(args.id);
      return { success };
    },
    createGame: async (_, args) => {
      const game = await Game.create(args);
      return { game };
    },
    deleteGame: async (_, args) => {
      const success = Game.deleteById(args.id);
      return { success };
    }
  },
  League: {
    games: async (league, args, ctx) => {
      const games = await Game.query()
        .eager("players")
        .where("league_id", league.id)
        .orderBy("date", "asc");

      return games;
    }
  },
  Game: {
    teams: async (game, args, ctx) => {
      return game.getTeams();
    },
    league: async (game, args, ctx) => {
      return League.query().findById(game.leagueId);
    }
  },
  Player: {
    league: async (player, args, ctx) => {
      return League.query().findById(player.leagueId);
    }
  }
};
