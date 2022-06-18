import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Link} from 'react-router-dom';


const Summoner = (props) => {
    const {searchText, setSearchText, playerData, setPlayerData} = props;
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

    return(
    <div>
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
        </div>
    )
}

export default Summoner;