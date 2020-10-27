const admin = require('firebase-admin');
let serviceAccount = require('../clave.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


module.exports = db;