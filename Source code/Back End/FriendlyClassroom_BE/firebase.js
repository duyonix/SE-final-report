const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(
        './friendlyclassroombe-firebase-adminsdk-iawwe-31df08dce9.json'
    ),
    storageBucket: 'gs://friendlyclassroombe.appspot.com',
});
const bucket = admin.storage().bucket();

module.exports = {
    admin,
    bucket
}