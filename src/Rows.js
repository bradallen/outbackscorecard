import { sum, sortPlayersByScore, sortPlayersByName } from "./utils";

export default function Rows({
  games,
  highlight,
  setHighlight,
  setScores,
  scores
}) {
  const setPlayerScore = (player, game, value) => {
    const newScores = [...scores];
    for (let i = 0; i < newScores.length; i++) {
      if (newScores[i].player === player) {
        const score = parseInt(value, 10);
        if (!isNaN(score)) {
          newScores[i].games[game] = score;
        }
        if (value === "") {
          newScores[i].games[game] = null;
        }
      }
    }
    setScores(newScores);
  };

  const sortPlayersScores = () => {
    setTimeout(() => {
      const newScores = [...scores].sort(sortPlayersByScore);
      setScores(newScores);
    }, 500);
  };

  const sortPlayersNames = () => {
    setTimeout(() => {
      const newScores = [...scores].sort(sortPlayersByName);
      setScores(newScores);
    }, 500);
  };

  const applyHighlight = (i) => {
    if (highlight === i) {
      setHighlight(null);
    } else {
      setHighlight(i);
    }
  };

  const headers = [
    <th className="clickable" onClick={() => sortPlayersNames()}>
      Players
    </th>
  ];
  for (let i = 0; i < games; i++) {
    headers.push(
      <th className="clickable" onClick={() => applyHighlight(i)}>{`G${
        i + 1
      }`}</th>
    );
  }
  headers.push(
    <th className="clickable" onClick={() => sortPlayersScores()}>
      Total
    </th>
  );

  const rows = [];
  scores.forEach((score) => {
    const tempRow = [
      <td
        key="player"
        className="clickable"
        onClick={() => applyHighlight(score.player)}
      >
        {score.player}
      </td>
    ];
    score.games.forEach((game, index) => {
      tempRow.push(
        <td
          key={`${score.player}_${index}`}
          className={
            highlight !== null &&
            highlight !== index &&
            highlight !== score.player
              ? "fade"
              : undefined
          }
        >
          <input
            type="text"
            value={game}
            tabIndex={index + 1}
            id={`${score.player}_${index}`}
            onChange={(e) =>
              setPlayerScore(score.player, index, e.target.value)
            }
            onBlur={() => sortPlayersScores()}
          />
        </td>
      );
    });
    tempRow.push(<td key={`${score.player}_sum`}>{sum(score.games)}</td>);
    rows.push(<tr key={score.player}>{tempRow}</tr>);
  });
  return (
    <table key="table">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
