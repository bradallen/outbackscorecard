import { useEffect, useState } from "react";

export default function Create({ setTempSeries }) {
  const [title, setTitle] = useState("New Series");
  const [games, setGames] = useState(4);
  const [players, setPlayers] = useState("");

  useEffect(() => {
    const parsedGames = parseInt(games, 10);
    const tempGames = isNaN(parsedGames) || parsedGames < 1 ? 4 : parsedGames;
    const tempTitle = !title ? "New Series" : title;
    const tempPlayers = players
      .split("\n")
      .map((player) => player.trim().toLocaleLowerCase())
      .filter((player) => !!player)
      .sort();

    setTempSeries({
      title: tempTitle,
      games: tempGames,
      players: tempPlayers
    });
  }, [title, games, players]);

  return (
    <form className="createForm">
      <fieldset>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label for="games">Games</label>
        <input
          type="number"
          id="games"
          name="games"
          value={games}
          onChange={(e) => setGames(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label for="players">Players</label>
        <textarea
          type="number"
          id="players"
          name="players"
          value={players}
          placeholder="One player per line"
          onChange={(e) => setPlayers(e.target.value)}
        />
      </fieldset>
    </form>
  );
}
