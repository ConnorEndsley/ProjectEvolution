import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Summoner = (props) => {
    const {searchText, setSearchText, playerData, setPlayerData} = props;
    const [champData, setChampData] = useState({});
    const API_KEY = 'RGAPI-dbdca186-887d-4199-8965-2eb8eb062890'


    function serachForPlayer(event) {
      // Set up the correct API call
    const apiCall = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + searchText + '?api_key=' + API_KEY; 
  
      // handle the API call
      axios.get(apiCall).then(function (response) {
  
        console.log(response.data);
        setPlayerData(response.data);
        console.log(playerData);
        localStorage.setItem('summonerId', playerData.id);
      }).catch(function(error){
        console.log(error)
      });
    }

    const getSummonerMasteryData =  async (event) => {
      // grab the summmonersId from localStorage
      const id = localStorage.getItem('summonerId')
      console.log('summonerId', id)
      //set up the API call
      const apiCall = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + id + '?api_key=' + API_KEY; 

       // handle the API callad
      axios.get(apiCall).then(function (response) {
        console.log('summoner champion mastery response', response);
        console.log(response.data)
        setChampData(response.data)
        console.log('championData', champData);
      }).catch(function(error){
        console.log(error);
      })
    }

    // create helper function to map through the champions

    // create a helper function to handle clicking on a chapion

    // create a helper function to display the champions Icons using the dataDragon links.

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
        <>
        <p>Summoner Name: {playerData.name}</p>
         <img width="100" height="100" src={'http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/' + playerData.profileIconId + '.png'}></img>
        <p>Summoner Level: {playerData.summonerLevel}</p>
        </> 
        :
        <><p>No Player Data</p></>
      }
      </div>

      <div className='summoner-champ-data'>
      <h2>
        Click to search your Champion Mastery
      </h2>
      <button onClick={event => getSummonerMasteryData(event)}>Click to get Champion Mastery</button>
      </div>

      <div>
        {JSON.stringify(champData) !== '{}'?
        <>
        {
          champData.map(champData => 
            <div >
             <p>ChampionData {champData.championId}</p>
            </div>)
        }
        </>
        :
        <p>Please Press the button to view champion mastery</p>}
      </div>
        </div>
    )
}

export default Summoner;