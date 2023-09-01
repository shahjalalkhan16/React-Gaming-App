import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import{useParams} from 'react-router-dom';
import "./App.css";
import axios from "axios";
import GameCard from "./components/GameCard";
//import GameDetails from "./components/GameDetails";

// const API_URL ="https://api.rawg.io/api/games?key=745c23b12d1948678ffa74467d8343ab";

// const game1 = {
//   "id": 3328,
//   "name": "The Witcher 3: Wild Hunt",
//   "background_image": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
//   "rating": 4.66,
// }
const BASE_API = import.meta.env.VITE_BASE_REACT_APP_URL;
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const API_URL = `${BASE_API}?key=${API_KEY}`;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </Router>
  );
};
function GameList() {
  const [games, setGames] = useState([]);
  const [queryTernm, setQueryTernm] = useState('');
  const searchGame = async (name) => {
    const response = await fetch(`${API_URL}&search=${name}`);
    const data = await response.json();
    setGames(data.results);
  };
  useEffect(() => {
    searchGame("");
  }, []);

  return (
    <div>
      <h1>React Gamming App</h1>
      <div className="app">
        <h1>
          GA<span style={{ color: "red" }}>MME</span>RS
        </h1>
      </div>
      <div className="search">
        <input
          placeholder="Search game"
           value= {queryTernm}
          onChange={(e) => setQueryTernm(e.target.value)}
        />
        <span className="search-icon material-symbols-outlined" alt= "search" onClick={() => searchGame(queryTernm)} >search</span>
      </div>
      {games?.length > 0 ? (
        <ul className="container">
          {games.map((game) => (
            <li className="'game" key={game.id}>
              <Link to={`/game/${game.id}`} key={game.id}>
                <div>
                  <img src={game.background_image} alt={game.name} />
                </div>
                <div>
                  {game?.genres.length > 0 ? (
                    <span>
                      {game.genres[0].name} ({game.rating})
                    </span>
                  ) : (
                    <span>No genres ({games.rating})</span>
                  )}
                  <h4>{game.name}</h4>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <h>No Games Found</h>
      )}
    </div>
  );
}

function GameDetails( {} ) {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  //promise
  useEffect(() => {
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((response) => {
        setGame(response.data);
      })
      .catch((error) => {
        console.error("Error fetching game details: ", error);
      });
  }, []);

  if (!game) {
    return <div>Loading...</div>;
  }
  const genres = game.genres;

  return (
    <>
      <h1>Game Details</h1>
      <div className="gameDetails">
        <div className="gameImage">
          <img src={game.background_image} alt={game.name} />
        </div>
        <div className="gameInfo">
          <h2>{game.name}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: game.description.substring(0, 150),
            }}
          />
          <p>Release Date: {game.released}</p>
          <p>Rating: {game.rating}</p>
          {genres.length > 0 ? (
            <p>
              Genres:
              {game.genres.map((genre) => (
                <span key={genre.id}>{genre.name} | </span>
              ))}
            </p>
          ) : (
            <p>No Available Genres</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
