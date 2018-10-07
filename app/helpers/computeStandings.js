import calcEloChange from "./calcEloChange";
const startingPoints = 1000;

const getPoints = (team, league) => {
  return team.map(
    player => league.players.find(p => p.id === player.id).points
  );
};

const findPlayerInTeam = (player, team) => {
  return team.find(teamPlayer => player.id === teamPlayer.id);
};

const updatePlayer = (player, points, teams) => {
  const updatedPlayer = Object.assign({}, player);
  updatedPlayer.points += points;
  updatedPlayer.goalsShot += teams[0].score;
  updatedPlayer.goalsConceded += teams[1].score;
  if (teams[0].score > teams[1].score) {
    updatedPlayer.wins += 1;
    teams[1].players.forEach(opponent => {
      if (!updatedPlayer.opponentHistory[opponent.name]) {
        updatedPlayer.opponentHistory[opponent.name] = { wins: 1, losses: 0 };
      } else {
        updatedPlayer.opponentHistory[opponent.name].wins += 1;
      }
    });
  } else if (teams[0].score === teams[1].score) {
    updatedPlayer.draws += 1;
  } else {
    updatedPlayer.losses += 1;
    teams[1].players.forEach(opponent => {
      if (!updatedPlayer.opponentHistory[opponent.name]) {
        updatedPlayer.opponentHistory[opponent.name] = { wins: 0, losses: 1 };
      } else {
        updatedPlayer.opponentHistory[opponent.name].losses += 1;
      }
    });
  }

  updatedPlayer.pointsHistory.push(updatedPlayer.points);
  return updatedPlayer;
};

const updatePlayers = (players, game) => {
  return players.map(player => {
    let updatedPlayer;
    if (findPlayerInTeam(player, game.teams[0].players)) {
      updatedPlayer = updatePlayer(player, game.points, game.teams);
    } else if (findPlayerInTeam(player, game.teams[1].players)) {
      updatedPlayer = updatePlayer(
        player,
        -game.points,
        game.teams.slice().reverse()
      );
    }

    return updatedPlayer || player;
  });
};

const computeGame = (league, game, index) => {
  const points = [
    getPoints(game.teams[0].players, league),
    getPoints(game.teams[1].players, league)
  ];
  const score = [game.teams[0].score, game.teams[1].score];
  const eloChange = calcEloChange(points, score);
  const modifiedGame = Object.assign({ points: eloChange }, game);
  league.games = league.games.map((g, i) => {
    return index === i ? modifiedGame : g;
  });
  league.players = updatePlayers(league.players, modifiedGame);

  return league;
};

const initPlayers = players => {
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

const computeStandings = league => {
  const mutableLeague = Object.assign({}, league);
  mutableLeague.players = initPlayers(league.players);
  return league.games.reduce(computeGame, mutableLeague);
};

export default computeStandings;
