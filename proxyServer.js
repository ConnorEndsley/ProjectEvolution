const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const API_KEY = 'RGAPI-7ba766d6-0fd2-4d86-9d49-5204b1896a9f';

function getPlayerPUUID(playerName){
    return axios.get('https://na1.api.riotgames.com' + "/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key" + API_KEY)
    .then(response => {
        console.log(response.data);
        return response.data.puuId;
    }).catch(err => err) 
}

// GET past 5 games from user
// localhost:4000/past5games
app.get('/past5games', async (req, res) => {
    const playerName = 'a schmelly goat';
    //PUUID
    const PUUID = await getPlayerPUUID(playerName);
    const API_CALL = 
});

app.listen(4000, function() {
    console.log('Server is up on localhost 4000')
});