const {google} = require('googleapis');
const keys = require('./keys.json')

const client = new google.auth.JWT(
    keys.client_email, 
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/documents.readonly']

);

client.authorize(function(error, tokens){
    if(error){
        console.log(error);
        return;
    } else{
        console.log('Connected');
        docrun(client);
    }
});

async function docrun (cl){
    try{
        const docApi = google.docs({version:'v1', auth: cl});
        const opt = {
            documentId:'1QJ7MFffX3ziUxkj6z3CAIXIU2RaxaQZOaKMMmjaMccI',
        }
        let data = await docApi.documents.get(opt);
        // console.log(data.data.body.content[1].paragraph.elements[0].textRun.content);
        for(let ele of data.data.body.content){
            if(!ele.paragraph) continue;
            if(!ele.paragraph.elements[0].textRun) continue;
            console.log(ele.paragraph.elements[0].textRun.content);
        }
        
    }catch(err){
        console.log(err);
    }

}


