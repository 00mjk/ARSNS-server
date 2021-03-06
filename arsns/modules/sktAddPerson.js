const request = require('request');

module.exports = {
    addPerson: (appid, groupid, subjectname)=>{
        // console.log('addPerson시작');
        return new Promise((resolve, reject)=>{
            let options = {
                'method' : 'POST',
                'uri' : `https://stg-va.sktnugu.com/api/v1/face/subject`, 
                'headers': {
                    // 'app-id' : "FHJEF7O455",
                    // 'group-id' : "SMB2NA4ND0",
                    // 'subject-name' : "phj"
                    'app-id' : `${appid}`,
                    'group-id' : `${groupid}`,
                    'subject-name' : `${subjectname}`,//카카오 uid로 저장
                },
                'body': {
                    'mode': "raw",
					'raw': ""
                },
                'json' : true
            };
            
            request(options, async (err, result)=>{
                if(err) {
                    console.log('request err : ' + err);
                    reject(err)
                }
                else{
                    // console.log(result.body.subject_name);
                    resolve(result.body.subject_id);
                } 
            })
        })
    }
};