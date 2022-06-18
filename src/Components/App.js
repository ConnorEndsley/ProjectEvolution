import React, {useState} from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.svg';
import Champions from './Champions';

import '../App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState({});
  const [summonerMatchData, setSummonerMatchData] = useState('');
  const [championName, setChampionName] = useState('')

  const API_KEY = 'RGAPI-740b0bef-ae50-4bab-911c-3cafb28acace'


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

  

  // function getSummonerMatchHistory(summonerId) {
    
  //   // Set up API call with 
  //   // let summonerId = playerData.id;
  //   console.log('summoner id in function', summonerId)
  //   const summonerIdApiCall = 'https://na1.api.riotgames.com//lol/league/v4/entries/by-summoner/' +  summonerId + '?api_key=' + API_KEY;

  //   // handle the API call
  //   axios.get(summonerIdApiCall).then(function(response) {
  //     console.log(response.data);
  //     setSummonerMatchData(response.data);
  //     console.log(summonerMatchData);
      
  //   }).catch(function(error){
  //     console.log(error);
  //   })
  // }



  // console.log(getSummonerMatchHistory('xDmQDaeJLEJfKVEC11QUisl8d8NzKwjui1jURqEEgb2bDmA'))

  // console.log('playerData', playerData.summonerLevel);

  return (
    <BrowserRouter>
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
 ``         <img width="100" height="100" src={'http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/' + playerData.profileIconId + '.png'}></img>
        <p>Summoner Level: {playerData.summonerLevel}</p>
        </> 
        :
        <><p>No Player Data</p></>
      }
      </div>

      <>
      <div>
        <button className='championButton'><Link id="link" to="/Champions">Go to Champion Descriptions</Link></button>
      </div>



      </>
    </div>
    </BrowserRouter>
    

  );
}

export default App;
