const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const config = require('./firebase-config.json');
const cors = require('cors')({origin: true});

firebase.initializeApp({
    credential: firebase.credential.cert(config),
    databaseURL: "https://users-a5b92.firebaseio.com"
});

exports.api = functions.https.onRequest((req, res) => {
     cors(req, res, () => {
        res.header('Conten-Type', 'aplication/json');
        res.header('Acces-Control-Allow-Origin', '*');
        res.header('Acces-Control-Allow-Header', 'Content-Type');

        if(req.method === 'GET') {
            const data = firebase.database().ref('/data');
            data.on('value', (snapshot) => {
                    res.json(snapshot.val());
            });
        }
     });
    
});