import React, { useState } from 'react';
import './styles/App.css';

const GolfScorecard = () => {
  const [players, setPlayers] = useState([]);
  const [currentHole, setCurrentHole] = useState(0);
  const [scores, setScores] = useState({});
  const [newPlayer, setNewPlayer] = useState('');

  const handlePlayerNameChange = (e) => {
    setNewPlayer(e.target.value);
  };

  const handleAddPlayer = () => {
    if (newPlayer.trim() !== '') {
      setPlayers([...players, newPlayer.trim()]);
      setNewPlayer('');
    }
  };

  const handleFinalSubmit = () => {
    setCurrentHole(1);
  };

  const handleScoreChange = (playerIndex, score) => {
    const updatedScores = { ...scores };
    updatedScores[currentHole] = updatedScores[currentHole] || {};
    updatedScores[currentHole][playerIndex] = score;
    setScores(updatedScores);
  };

  const goToNextHole = () => {
    if (currentHole < 18) {
      setCurrentHole(currentHole + 1);
    }
  };

  const goToPreviousHole = () => {
    if (currentHole > 0) {
      setCurrentHole(currentHole - 1);
    }
  };

  return (
    <div className="container">
     
      {/* Top Div */}
      <div className="top-div">
        {/* Player Name Input Section */}
        {currentHole === 0 && (
          <div>
            <input
              type="text"
              value={newPlayer}
              onChange={handlePlayerNameChange}
              placeholder="Enter player name"
            />
            <button onClick={handleAddPlayer}>Add Player</button>
          </div>
        )}

        {/* Display Player Names */}
        {players.length > 0 && currentHole === 0 && (
          <div>
            <h3>Player Names:</h3>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player}</li>
              ))}
            </ul>
            <button onClick={handleFinalSubmit}>Submit Names</button>
          </div>
        )}

        {/* Score Input Section */}
        {currentHole > 0 && (
          <div className='score-input-section'>
            <h3>Enter Scores for Hole {currentHole}</h3>
            {players.map((player, playerIndex) => (
              <div className='player-input-container' key={playerIndex}>
                <span>{player}</span>
                <input
                  type="number"
                  value={(scores[currentHole] && scores[currentHole][playerIndex]) || ''}
                  onChange={(e) => handleScoreChange(playerIndex, e.target.value)}
                />
              </div>
            ))}
            <button onClick={goToPreviousHole}>Previous Hole</button>
            {currentHole < 18 && <button onClick={goToNextHole}>Next Hole</button>}
          </div>
        )}
      </div>
      
      {/* Bottom Div - Scorecard Display */}
      {/* {currentHole > 0 && (
        <div className="bottom-div">
          <h2>Scorecard</h2>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                {[...Array(18)].map((_, i) => (
                  <th key={i}>Hole {i + 1}</th>
                ))}
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, playerIndex) => (
                <tr key={playerIndex}>
                  <td>{player}</td>
                  {[...Array(18)].map((_, holeIndex) => (
                    <td key={holeIndex}>
                      {scores[holeIndex + 1] && scores[holeIndex + 1][playerIndex]}
                    </td>
                  ))}
                  <td>
                    {Object.values(scores).reduce(
                      (total, holeScores) => total + parseFloat(holeScores[playerIndex] || 0),
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}


      {currentHole > 0 && (
        <div className="bottom-div">
          <h2>Scorecard</h2>

          {/* Table for Holes 1-9 */}
          <table className='top-table'>
            <thead>
              <tr>
                <th>Player</th>
                {[...Array(9)].map((_, i) => (
                  <th key={i}>{i + 1}</th>
                ))}
                <th>F9</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, playerIndex) => (
                <tr key={playerIndex}>
                  <td>{player}</td>
                  {[...Array(9)].map((_, holeIndex) => (
                    <td key={holeIndex}>
                      {scores[holeIndex + 1] && scores[holeIndex + 1][playerIndex]}
                    </td>
                  ))}
                  <td>
                    {Object.values(scores).slice(0, 9).reduce(
                      (total, holeScores) => total + parseFloat(holeScores[playerIndex] || 0),
                      0
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Table for Holes 10-18 */}
          <table className='bottom-table'>
            <thead>
              <tr>
                <th>Player</th>
                {[...Array(9)].map((_, i) => (
                  <th key={i}>{i + 10}</th>
                ))}
                <th>B9</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, playerIndex) => (
                <tr key={playerIndex}>
                  <td>{player}</td>
                  {[...Array(9)].map((_, holeIndex) => (
                    <td key={holeIndex}>
                      {scores[holeIndex + 10] && scores[holeIndex + 10][playerIndex]}
                    </td>
                  ))}
                  <td>
                    {Object.values(scores).slice(9).reduce(
                      (total, holeScores) => total + parseFloat(holeScores[playerIndex] || 0),
                      0
                    )}
                  </td>
                  <td>
                      {Object.values(scores).reduce(
                        (total, holeScores) => total + parseFloat(holeScores[playerIndex] || 0),
                        0
                      )}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div> //end of container div
  ); //end of return
}; //end of scorecard function

export default GolfScorecard;