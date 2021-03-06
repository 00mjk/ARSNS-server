const pool = require('../modules/pool');

const historyData  = require('../modules/data/historyData');
const profileData  = require('../modules/data/profileData');

const main = {
    getPersonName : async(id) => {
        let query = `SELECT name FROM user WHERE id = ${id}`;
        try{
            let result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getPersonName err: ', err);
        }throw err;
    },

    isMyFriend : async(myId, friendId) => {
        let query = `SELECT COUNT(*) as cnt FROM friends WHERE myId = ${myId} and friendId = ${friendId}`;
        try{
            let result = await pool.queryParam(query);
            if(result[0].cnt === 0){
                return false;//내 지인이 아닌경우
            }
            else{
                return true;//내 지인인 경우
            }
        }catch(err){
            console.log('isMyFriend err: ', err);
        }throw err;
    },  

    updateRecommend : async(myId, friendId) =>{
        let query1 = `SELECT COUNT(*) as userCnt FROM user WHERE id = ${friendId}`;
        let query2 = `SELECT COUNT(*) as friendCnt FROM friends WHERE myId=${myId} and friendId=${friendId}`;
        let query3 = `SELECT COUNT(*) as recCnt FROM recommend WHERE userIdx=${myId} and recommendIdx=${friendId}`;
        try{
            let result1 = await pool.queryParam(query1);
            let result2 = await pool.queryParam(query2);
            let result3 = await pool.queryParam(query3);
            // console.log('친구id user목록에 있니?있으면 1: ', result1[0]);
            // console.log('나랑친구id friends에 있니?있으면 1: ', result2[0]);

            //SKT가입자이면서 친구목록에 없으면서 추천목록에 없으면 추천친구에 추가
            if(result1[0].userCnt > 0 && result2[0].friendCnt === 0 && result3[0].recCnt === 0){
                const fields = `userIdx, recommendIdx`;
                const question = `?,?`;
                const values = [myId, friendId];
        
                query = `INSERT INTO recommend(${fields}) VALUES(${question})`;
                result = await pool.queryParamArr(query, values);
                return true;
            }
            else{
                return false;
            }
        }catch(err){
            console.log('updateFriend err: ', err);
        }throw err;
    }
}

module.exports = main;