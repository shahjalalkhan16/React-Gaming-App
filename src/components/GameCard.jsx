import React from "react";

const GameCard = ({ game }) => {
  return (
    <div>
      <div className="game">
        <img src={game.background_image} alt="game photo" width="50%" />
      </div>
      <div>
        <span>{game.rating}</span>
        <h3>{game.name}</h3>
      </div>
    </div>
  );
};

export default GameCard;
