import { Teams, Players, Leagues, Games } from "../graphql/generated";
import { ComputedGame, ComputedLeague, ComputedPlayer } from "../types/computed";
import calcEloChange from "./calcEloChange";

const startingPoints = 1000;


const initPoints = (teams: Teams[], league: ComputedLeague): number[][] => {
  const findPlayer = (player: Players): ComputedPlayer =>
    league.players.find(p => p.id === player.id)
  const points: number[][] = [[], []]

  teams.forEach(teamPlayer => {
    const player = findPlayer(teamPlayer.player)
    points[teamPlayer.team_id].push(player.points)
  })
  return points
};


const updatePlayer = (player: ComputedPlayer, game: ComputedGame, teamId: number) => {
  const opposingTeamId = teamId === 0 ? 1 : 0
  const updatedPlayer = Object.assign({}, player);
  updatedPlayer.points += !teamId ? game.points : -game.points;
  updatedPlayer.goalsShot += game.scores[teamId];
  updatedPlayer.goalsConceded += game.scores[opposingTeamId]
  if (game.scores[teamId] > game.scores[opposingTeamId]) {
    updatedPlayer.wins += 1;
    game.teams.forEach(opponent => {
      if (opponent.team_id !== teamId) {
        if (!updatedPlayer.opponentHistory[opponent.player.name]) {
          updatedPlayer.opponentHistory[opponent.player.name] = { wins: 1, losses: 0 };
        } else {
          updatedPlayer.opponentHistory[opponent.player.name].wins += 1;
        }
      }
    });
  } else if (game.scores[0] === game.scores[1]) {
    updatedPlayer.draws += 1;
  } else {
    updatedPlayer.losses += 1;
    game.teams.forEach(opponent => {
      if (opponent.team_id !== teamId) {
        if (!updatedPlayer.opponentHistory[opponent.player.name]) {
          updatedPlayer.opponentHistory[opponent.player.name] = { wins: 0, losses: 1 };
        } else {
          updatedPlayer.opponentHistory[opponent.player.name].losses += 1;
        }
      }
    });
  }

  updatedPlayer.pointsHistory.push(updatedPlayer.points);
  return updatedPlayer;
};

const updatePlayers = (players: ComputedPlayer[], game: ComputedGame): ComputedPlayer[] => {
  const findTeam = (player: ComputedPlayer, team: Teams[]) => {
    return team.find(teamPlayer => player.id === teamPlayer.player.id)
  };

  return players.map(player => {
    let updatedPlayer;
    const team = findTeam(player, game.teams)
    if (team) {
      updatedPlayer = updatePlayer(player, game, team.team_id);
    }

    return updatedPlayer || player;
  });
};

const computeGame = (league: ComputedLeague, game: Games, index: number): Leagues => {
  const points = initPoints(game.teams, league)
  const eloChange = calcEloChange(points, game.scores);
  const modifiedGame: ComputedGame = Object.assign({ points: eloChange }, game);
  league.games = league.games.map((g, i) => {
    return index === i ? modifiedGame : g;
  });
  league.players = updatePlayers(league.players, modifiedGame);

  return league;
};

const initPlayers = (players: Players[]): ComputedPlayer[] => {
  return players.map(player =>
    Object.assign(
      {
        points: startingPoints,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsConceded: 0,
        goalsShot: 0,
        pointsHistory: [startingPoints],
        opponentHistory: {}
      },
      player
    )
  );
};

const computeStandings = (league: Leagues) => {
  const players = initPlayers(league.players);
  const mutableLeague: ComputedLeague = Object.assign({}, league, { players });
  return league.games.reduce(computeGame, mutableLeague);
};

export default computeStandings;
