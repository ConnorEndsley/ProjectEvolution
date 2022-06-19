import React, {useState} from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.svg';
import Champions from './Champions';
import Summoner from './Summoner';

import '../App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState({});
  const [summonerMatchData, setSummonerMatchData] = useState('');



  

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
      <>

      <div>
        <Summoner searchText={searchText} setSearchText={setSearchText} playerData={playerData} setPlayerData={setPlayerData}></Summoner>
      </div>
      <div className='routes'>
        <button className='championButton'><Link id="link" to="/Champions">Go to Champion Descriptions</Link></button>
        <Routes>
        <Route path="/Champions" element={<Champions></Champions>}/>
        </Routes>
      </div>



      </>
    </div>
    </BrowserRouter>
    

  );
}

export default App;
