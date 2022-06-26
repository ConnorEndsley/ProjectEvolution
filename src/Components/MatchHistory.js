import React, {useState} from 'react';
import axios from 'axios';

const MatchHistory = (props) => {
    const {searchText, setSearchText, gameList, setGameList} = props;
    
    const getPlayerGames = (event) => {
        console.log('hitting here')
        axios.get("http://localhost:4000/past5games", { params: { username: searchText }})
        .then(function(response){
          setGameList(response.data)
        }).catch(function(error) {
          console.log(error)
        })
      }
    
      console.log(gameList)
    return (
        <div>

<div>
          <h2> Wecloms to our proxy server</h2>;
          <input type="text" onChange={event => setSearchText(event.target.value)}></input>
          <button onClick={getPlayerGames}>Get the past 5 games from your player</button>
          {gameList.length !== 0 ? 
          <>
          <p>Here are your last 5 games!</p>
          {
            gameList.map((gmaeData, index) => 
            <>
              <h2>Game {index + 1}</h2>
              <div>
                {gmaeData.info.participants.map((data, participantIndex) => 
                <p>Summoner: {participantIndex + 1}: {data.summonerName}, KDA {data.kills} / {data.deaths} / {data.assists}  </p>
                )}
              </div>
            </>)
          }
          </>
          
        :
        <>
        </>}
        </div>      
        </div>
    )
}

export default MatchHistory;