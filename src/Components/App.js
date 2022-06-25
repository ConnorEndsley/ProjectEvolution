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
  const [gameList, setGameList] = useState([]);

  const getPlayerGames = (event) => {
    console.log('hitting here')
    axios.get("http://localhost:4000/past5games")
    .then(function(response){
      setGameList(response.data)
    }).catch(function(error) {
      console.log(error)
    })
  }

  console.log(gameList)
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
        <div>
          <h2> Wecloms to our proxy server</h2>;
          <input type="text" onChange={event => setSearchText(event.target.value)}></input>
          <button onClick={getPlayerGames}>Get the past 5 games from your player</button>

        </div>
      </div>



      </>
    </div>
    </BrowserRouter>
    

  );
}

export default App;
