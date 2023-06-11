import React, { useEffect, useState } from "react";
import axios from "axios";
import "../matchHistory.css";

const MatchHistory = (props) => {
  const { searchText, setSearchText, gameList, setGameList } = props;
  const [mapData, setMapData] = useState([]);

  console.log("hitting here in component");

  //   useEffect(() => { (async () => {
  //     const allRoutines = await getPlayerGames();
  //     setGameList(allRoutines);
  // })();
  // });

  const getPlayerGames = (event) => {
    // event.preventDefault();
    console.log("hitting here");
    axios
      .get("http://localhost:4000/past5games", {
        params: { username: searchText },
      })
      .then(function (response) {
        console.log("inside function");
        console.log(response);
        setGameList(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="matchHistory">
      <div className="searchBar">
        <h2> Enter summoner name to get match history</h2>
        <input
          type="text"
          onChange={(event) => setSearchText(event.target.value)}
        ></input>
        <button onClick={getPlayerGames}>
          Get the past 5 games from your player
        </button>
        <h3> Match history for {searchText}</h3>
      </div>

      <div className="gameDisplay">
        {gameList.map((gameData, index) => (
          <div className="match-box">
            <h2>Game {index + 1}</h2>
            <h3>
              Game Mode: {gameData.info.gameMode}{" "}
              <img
                width="100"
                height="100"
                src={
                  "http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map" +
                  gameData.info.mapId +
                  ".png"
                }
                alt=""
              ></img>{" "}
            </h3>

            {gameData.info.participants.map((data, participantIndex) => (
              <div className="summoner-match">
                <div>
                  <p>
                    Summoner: {participantIndex + 1}: {data.summonerName}, Role:{" "}
                    {data.lane} / KDA: {data.kills} / {data.deaths} /{" "}
                    {data.assists}{" "}
                  </p>
                </div>

                <p>
                  {" "}
                  Champion:{" "}
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/champion/" +
                      data.championName +
                      ".png"
                    }
                    alt=""
                  ></img>
                </p>

                <p>
                  Items:
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item0 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item1 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item2 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item3 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item4 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item5 +
                      ".png"
                    }
                    alt=""
                  ></img>
                  <img
                    width="50"
                    height="50"
                    src={
                      "http://ddragon.leagueoflegends.com/cdn/12.12.1/img/item/" +
                      data.item6 +
                      ".png"
                    }
                    alt=""
                  ></img>
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
