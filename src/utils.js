export function buildInitialScores(games, players) {
  const table = [];
  players.forEach((player) => {
    table.push({
      player,
      games: new Array(games).fill(0)
    });
  });

  return table;
}

export function sum(array) {
  return array.reduce((a, b) => a + b, 0);
}

export function sortPlayersByScore(a, b) {
  if (sum(a.games) > sum(b.games)) {
    return -1;
  } else if (sum(a.games) < sum(b.games)) {
    return 1;
  }
  return 0;
}

export function sortPlayersByName(a, b) {
  if (a.player < b.player) {
    return -1;
  } else if (a.player > b.player) {
    return 1;
  }
  return 0;
}
