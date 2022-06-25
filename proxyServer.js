const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = 'RGAPI-99aa462a-5db5-4a1e-8a38-9f5399f06dab';

function getPlayerPUUID(playerName){
    return axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuid;
    }).catch(err => err) 
}

// GET past 5 games from user
// localhost:4000/past5games
app.get('/past5games', async (req, res) => {
    console.log('hitting here first')
    const playerName = 'a schmelly goat';
    console.log(playerName)
    //PUUID
    const PUUID = await getPlayerPUUID(playerName);
    console.log('PUUID', PUUID)
    const API_CALL = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + API_KEY;
    console.log('hittingafter API call >>>>>>>>>>>>>>>>>>>>>')

    // get API call
    // its going to give us a list of game IDs
    const gameIds = await axios.get(API_CALL)
        .then(response => response.data)
        .catch(error => error)
    console.log('===============gameIds===========', gameIds)

    // loop through to give us a list of game IDs

    // loops through game IDs
    // at each loop, get the information based off the ID (API call)
    let matchDataArray = [];
    console.log('===========matchDataArray===========', matchDataArray)
    for(let i = 0; i < gameIds.length - 15; i++){
        const matchId = gameIds[i];
        console.log('matchId', matchId)
        const matchData = await axios.get("https://americas.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + API_KEY)
        .then(response => response.data)
        .catch(err => err);
        matchDataArray.push(matchData);
    }



    // save information in an array, give array as JSON response to user
    // [game1Object, game2Object,..]
    res.json(matchDataArray);
});

app.listen(4000, function() {
    console.log('Server is up on localhost 4000')
});