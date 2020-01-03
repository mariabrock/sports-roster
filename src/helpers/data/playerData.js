import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseURL = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayers = result.data;
      const players = [];
      if (allPlayers != null) {
        Object.keys(allPlayers).forEach((fbId) => {
          const newPlayer = allPlayers[fbId];
          newPlayer.id = fbId;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((error) => reject(error));
});

const deletePlayerById = (playerId) => axios.delete(`${baseURL}/players/${playerId}.json`);

const savePlayer = (newPlayer) => axios.post(`${baseURL}/players.json`, newPlayer);

const updatePlayer = (playerId, playerObj) => axios.put(`${baseURL}/players/${playerId}.json`, playerObj);

export default {
  getPlayersByUid,
  deletePlayerById,
  savePlayer,
  updatePlayer,
};
