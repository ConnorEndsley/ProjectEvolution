const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { response } = require('express');

const app = express();

app.use(cors());

const API_KEY = 'RGAPI-80cba2fd-c4b9-4e58-b43a-20d5a56964d1';

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
    const playerName = req.query.username;
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

    function getAllChampions (championName) {
        return axios.get("http://ddragon.leagueoflegends.com/cdn/12.12.1/data/en_US/" + championName)
        .then(response => {
            console.log('champion response', response.data)
            return response.data.id;
        }).catch(error => error);
    }

    app.get('/allChampions', async (req, res) => {
        console.log('hitting this champion route')
        const championName = req.query.id;
        console.log(championName);
        // get champion name
        const champion = await getAllChampions(championName);
        console.log("====CHAMPION====", champion)
    })

app.listen(4000, function() {
    console.log('Server is up on localhost 4000')
});