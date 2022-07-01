import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../matchHistory.css'

const MatchHistory = (props) => {
    const{searchText, setSearchText, gameList, setGameList} = props;
    const [mapData, setMapData] = useState([]);

    console.log('hitting here in component')

  //   useEffect(() => { (async () => {
  //     const allRoutines = await getPlayerGames();
  //     setGameList(allRoutines);
  // })();
  // });
    
    const getPlayerGames = (event) => {
        console.log('hitting here')
        axios.get("http://localhost:4000/past5games", { params: { username: searchText }})
        .then(function(response){
          console.log("inside function");
          console.log(response)
          setGameList(response.data)
        }).catch(function(error) {
          console.log(error)
        })
      }


      const getMaps = () => {
        console.log('in maps function');
        axios.get("https://static.developer.riotgames.com/docs/lol/maps.json")
        .then(function(response){
          console.log('MAPS RESPONSE', response)
          setMapData(response.data)
        }).catch(function(error) {
          console.log(error)
        })
      }
    

        console.log('MAPDATA', mapData)
    return (
        <div>

<div className="matchContainer">
          <h2> Enter summoner name to get match history</h2>
          <input type="text" onChange={event => setSearchText(event.target.value)}></input>
          <button onClick={getPlayerGames}>Get the past 5 games from your player</button>
          {gameList.length === 0 ? 
<p>Sorry, you have no match history!</p>
        :
        <> 
        <p>Here are your last 5 games!</p>
        {
          gameList.map((gameData, index) => 
          <>
            <h2>Game {index + 1}</h2>
              <h3>Game Mode: {gameData.info.gameMode} <img width="100" height="100" src={"http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map" + gameData.info.mapId + ".png"}></img> </h3>
            <div>
              {gameData.info.participants.map((data, participantIndex) => 

              <div className='summoner-match'>
              <p>Summoner: {participantIndex + 1}: {data.summonerName}, Role: {data.lane} / KDA {data.kills} / {data.deaths} / {data.assists} / Champion: <img width="50" height="50" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/" + data.championName + ".png"}></img></p>
              <p>Items:
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item0 + ".png"}></img> 
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item1 + ".png"}></img>
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item2 + ".png"}></img>
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item3 + ".png"}></img>
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item4 + ".png"}></img>
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item5 + ".png"}></img>
              <img width="30" height="30" src={"http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" + data.item6 + ".png"}></img>
              </p>

              <div>
                <p>Summoner Spells: </p>
              </div>

              </div>
              )}
            </div>
          </>
          )
        }
        </>
}
        </div>      
        </div>
    )
}

export default MatchHistory;