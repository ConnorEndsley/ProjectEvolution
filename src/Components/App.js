import React, {useState} from 'react';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';
import axios from 'axios';
import logo from '../logo.svg';
import Champions from './Champions';
import Summoner from './Summoner';
import MatchHistory from './MatchHistory';

import '../App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [playerData, setPlayerData] = useState({});
  const [summonerMatchData, setSummonerMatchData] = useState('');
  const [gameList, setGameList] = useState([]);


  return (
    <BrowserRouter>

    <div className="App">
      <>
      <div>
        <Summoner searchText={searchText} setSearchText={setSearchText} playerData={playerData} setPlayerData={setPlayerData}></Summoner>
      </div>
      <div className='routes'>
        <button className='championButton'><Link id="link" to="/Champions">Go to Champion Descriptions</Link></button>
        <button className='matchHistoryButton'><Link id="link" to="/MatchHistory">Go to Match History</Link></button>
        <Routes>
        <Route path="/Champions" element={<Champions></Champions>}/>
        <Route path="/" element={<MatchHistory></MatchHistory>}/>
        </Routes>
      </div>
  <div>
    <MatchHistory searchText={searchText} setSearchText={setSearchText} gameList={gameList} setGameList={setGameList}></MatchHistory>
  </div>
      </>
    </div>
    </BrowserRouter>
  );
}

export default App;
