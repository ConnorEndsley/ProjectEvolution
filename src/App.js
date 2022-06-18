import React, {useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState({});
  const [summonerMatchData, setSummonerMatchData] = useState('');

  const API_KEY = 'RGAPI-3b667102-11c0-42fc-9967-3cb381f6361f'


  function serachForPlayer(event) {
    // Set up the correct API call
  const apiCall = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + '?api_key=' + API_KEY; 

    // handle the API call
    axios.get(apiCall).then(function (response) {

      console.log(response.data);
      setPlayerData(response.data);
      console.log(playerData);
    }).catch(function(error){
      console.log(error)
    });
  }


  console.log('player data outside function', playerData);

  function getSummonerMatchHistory() {
    
    // Set up API call with 
    let summonerId = playerData.id;
    const summonerIdApiCall = `https://na1.api.riotgames.com//lol/league/v4/entries/by-summoner/${summonerId}?api_key=${API_KEY}`;

    // handle the API call
    axios.get(summonerIdApiCall).then(function(response) {
      console.log(response.data);
      setSummonerMatchData(response.data);
      console.log(summonerMatchData);
      
    }).catch(function(error){
      console.log(error);
    })
  }

  // console.log(getSummonerMatchHistory(playerData.id))

  console.log('playerData', playerData.summonerLevel);

  return (
    <div className="App">
      <div className='container'>
      <h1>
        League of Legends Player Search
      </h1>
      <input type="text" onChange={event => setSearchText(event.target.value)}></input>
      <button onClick={event => serachForPlayer(event)}> Search for summoner</button>

      </div>
      <div>
        {JSON.stringify(playerData) !== '{}' ?
        <><p>Summoner Name: {playerData.name}</p>
        <><p>Match History: {getSummonerMatchHistory(playerData.id)}</p></>
        <img width="100" height="100" src={'http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/' + playerData.profileIconId + '.png'}></img>
        <p>Summoner Level: {playerData.summonerLevel}</p>
        </> 
        :
        <><p>No Player Data</p></>
      }
      </div>
    </div>
  );
}

export default App;
