const calcAverage = team => {
  const pointsSum = team.reduce(function(memo, points) {
    return memo + points;
  }, 0);
  return pointsSum / team.length;
};

const calcModifier = score => {
  let modifier;
  const scoreDifference = Math.abs(score[0] - score[1]);
  switch (scoreDifference) {
    case 0:
    case 1:
      modifier = 1;
      break;
    case 2:
      modifier = 1.5;
      break;
    default:
      modifier = 1.75 + (scoreDifference - 3) / 8;
  }
  return modifier;
};

const calcResultType = score => {
  if (score[0] > score[1]) {
    return 1;
  }
  if (score[0] === score[1]) {
    return 0.5;
  }
  return 0;
};
const calcWinExpectancy = points => {
  const pointsDiff = points[1] - points[0];
  return 1 / (Math.pow(10, pointsDiff / 400) + 1);
};

const calcEloChange = (teams, score) => {
  const modifier = calcModifier(score);
  const resultType = calcResultType(score);
  const points = teams.map(function(t) {
    return calcAverage(t);
  });
  const winExpectancy = calcWinExpectancy(points);
  const weight = 20;
  return Math.round(weight * modifier * (resultType - winExpectancy));
};

export default calcEloChange;
