import { useState, useEffect } from "react";

import "./App.css";
import GameCard from "./components/GameCard";

const API_URL =
  "https://api.rawg.io/api/games?key=745c23b12d1948678ffa74467d8343ab";

// const game1 = {
//   "id": 3328,
//   "name": "The Witcher 3: Wild Hunt",
//   "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
//   "rating": 4.66,
// }
const App = () => {
  const [games, setGames] = useState([]);
  const searchGame = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    setGames(data.results);
  };

  useEffect(() => {
    searchGame();
  }, []);

  return (
    <div>
      <h1>React Gamming App</h1>
      <div className="app">
        <h1>
          GA<span style={{ color: "red" }}>MME</span>RS
        </h1>
      </div>
      <div className="search_box">
        <input
          className="inputTag"
          placeholder="Search Game"
          // value="Candy Crush"
          onChange={() => {}}
        />
        <span className="search_icon material-symbols-outlined">search</span>
      </div>
      {games ? (
        <div className="container">
          {games.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      ) : (
        <h>No Games Found</h>
      )}
    </div>
  );
};

export default App;
