import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../summoner.css"

const Summoner = (props) => {
    const {searchText, setSearchText, playerData, setPlayerData} = props;
    const [champData, setChampData] = useState({});
    const API_KEY = 'RGAPI-79d88b4a-b61a-4669-849e-7645cd486c6c'


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

        console.log('hitting here')
        axios.get("http://localhost:4000/championMastery", { params: { username: searchText }})
        .then(function(response){
          console.log("inside function");
          console.log(response)
          setChampData(response.data)
        }).catch(function(error) {
          console.log(error)
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
      <div className='summoner-info'>
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
      <input type='text' onChange={event => setSearchText(event.target.value)}></input>
      <button onClick={event => getSummonerMasteryData(event)}>Click to get Champion Mastery</button>
      </div>

      <div>
        {JSON.stringify(champData) !== '{}'?
        <>
        {
          champData.map(champData => 
            <div className='championMastery' >
             <p>ChampionId {champData.championId}</p>
             <p>Mastery Level: {champData.championLevel}</p>
             <p>Mastery Points: {champData.championPoints}</p>
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