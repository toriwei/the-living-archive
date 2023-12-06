const admin = require('firebase-admin')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') })

// Initialize the app with a service account, granting admin privileges
const account = process.env.FIREBASE_SERVICE_ACCOUNT
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(account)),
})

// Initialize Firestore
const db = admin.firestore()
module.exports = db
