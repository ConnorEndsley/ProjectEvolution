import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Champions = (props) => {
    const [championName, setChampionName] = useState('')
    const [champion, setChampion] = useState({});



    // const getAllChampions = async () => {
    //     const championApiCall = 'http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json?api_key=' + API_KEY;
    //     let response;
    //     try{
    //         response = await fetch(championApiCall);
    //         console.log("response champions", response)
    //         const data = await response.json();
    //         return data
    //     } catch(error){
    //         throw error;
    //     }
    // }

    
    function getChampionByName(event) {
        // Set up the correct API call
        const API_KEY = 'RGAPI-dbdca186-887d-4199-8965-2eb8eb062890'
        const championApiCall = 'http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json';
    
        // handle the API call
    axios.get(championApiCall).then(function (response) {
    
          console.log('response', response);
          const responseData = response.data
          setChampion(responseData.data);
          console.log('champion', champion);
        }).catch(function(error){
          throw (error)
        });
      }

    //   console.log(getAllChampions())
    return(
        <>
        <div>
            <p>Welcome to the Champions Page</p>
        </div> 
        <div>
        <input type="text" onChange={event=> setChampionName(event.target.value)}></input>
        <button onClick={event=> getChampionByName(event)}> Search for a champion</button> 
        {JSON.stringify(champion) !== '{}' ?
        <>
        <p>Champion Name: {champion}</p>
        </> 
        :
        <><p>No Player Data</p></>
      }

        </div>

        </>
    )
}

export default Champions;