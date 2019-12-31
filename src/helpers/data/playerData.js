import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayersObj = result.data;
      const players = [];
      if (allPlayersObj != null) {
        Object.keys(allPlayersObj).forEach((playerId) => {
          const newPlayer = allPlayersObj[playerId];
          newPlayer.id = playerId;
          playerId.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => {
      reject(err);
    });
});

const getSinglePlayer = (playerId) => axios.get(`${baseURL}/players/${playerId}.json`);

const savePlayer = (playerInfo) => axios.post(`${baseURL}/players.json`, playerInfo);

const updatePlayer = (playerId, newPlayerInfo) => axios.put(`${baseURL}/boards/${playerId}.json`, newPlayerInfo);

export default {
  getPlayersByUid,
  getSinglePlayer,
  savePlayer,
  updatePlayer,
};
